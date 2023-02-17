const crypto = require("crypto");
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

//defined User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please tell us your name!"],
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Please provide your Email"],
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  password: {
    type: String,
    required: [true, "Please provide a password"],
    minlength: 8,
    select: false, //makes sure password is not accessible by default
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      //only works on user.save or user.create - keep in mind when doing update password function/not findOneAndUpdate
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
});

//prehook middleware specified on the schema
userSchema.pre("save", async function (next) {
  //runs only if password was modified
  if (!this.isModified("password")) return next();

  //set current password to encrypted password by hashing it
  this.password = await bcrypt.hash(this.password, 12);

  //set to undefined so its not persisted to database - deletes the field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

//instance(available in all files) method to compare password to see if they match
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

//checks if user changed password after token was issued
userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    //password changed means time stamp of JWT issued is less than changed timestamp of password
    return JWTTimestamp < changedTimestamp;
  }

  // False means password was not changed
  return false;
};

//method to reset token
userSchema.methods.createPasswordResetToken = function () {
  //create token to send to user after encrypting it
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.passwordResetToken);

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

//creates model for schema
const User = mongoose.model("User", userSchema);

module.exports = User;
