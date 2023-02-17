const AppError = require("./../utils/appError");

//handle mongoose errors
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

//handles duplicate fields
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};
//handles validation errors
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

//handles JWT Errors for Invalid and Expired tokens
const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

//errors for development mode
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

//errors for production mode
const sendErrorProd = (err, res) => {
  //only send Operational Error, trusted error: send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });

    //programming or other unknown errors - don't leak error details to clients
  } else {
    //Log error
    console.error("ERROR", err);

    //otherwise if not operational errors, send generic message - security measure
    res.status(500).json({
      status: "error",
      message: "Something went wrong!",
    });
  }
};

//global error handling middleware
module.exports = (err, req, res, next) => {
  // console.log(err.stack);

  //if statusCode is defined, set it OR Internal Server Error
  //if status is defined, if not set to error
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  //send different errors for dev & prod, in prod only sends status and message
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = Object.create(err);

    if (error.name === "CastError") error = handleCastErrorDB(error);
    if (error.code === 11000) error = handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleJWTError();
    if (error.name === "TokenExpiredError") error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
