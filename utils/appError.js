//extends Error class so can make use of its methods
class AppError extends Error {
  constructor(message, statusCode) {
    //calls the parent class(Error) so need to set message as it will take incoming message
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
