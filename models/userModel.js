const mongoose = require("mongoose");
const validator = require("validator");

//defined User Schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username is taken"],
    required: [true, "Please provide a Username!"],
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
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please confirm your password"],
    validate: {
      validator: function (el) {
        return el === this.password;
      },
      message: "Passwords do not match",
    },
  },
});

//creates model for schema
const User = mongoose.model("User", userSchema);

module.exports = User;
