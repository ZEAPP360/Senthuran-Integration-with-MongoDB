//contains all the handlers for authentication
const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");

const signToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangeAt: req.body.passwordChangeAt,
  });

  //create JSON token - pass in payload, jwt secret, jwt expiraiton
  const token = signToken(newUser._id);

  res.status(201).json({
    status: "success",
    token,
    data: {
      user: newUser,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  //1)Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  //2)Check if user exits and password is correct
  const user = await User.findOne({ email: email }).select("+password");

  //give vague message so potential attacker doesn't know which is wrong
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  //3)Send token to client if everything is ok
  const token = signToken(user._id);
  res.status(200).json({
    status: "success",
    token,
  });
});

//protects routes so only logged in users can access
exports.protect = catchAsync(async (req, res, next) => {
  // 1)Get token and check if it is there
  let token;
  //Check if there is Authorization Bearer Header
  // Split the bearer from token into array and get token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //if token does not exist
  if (!token) {
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );
  }

  // 2)Validate token - decoded is the decoded payload
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3)Check if user still exists- decodes id from payload
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }

  // 4)Check if user changed password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }

  //grant access to protected route
  req.user = currentUser;
  next();
});
