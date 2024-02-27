const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERROR:
      res.json({
        title: "Validatin failed",
        message: err.message,
        stackTrace: err.stack,
      });

      break;

    case constants.NOT_FOUND:
      res.json({
        title: "not found",
        message: err.message,
        stackTrace: err.stack,
      });

    case constants.UNAUTORIZED:
      res.json({
        title: "Unautrized access",
        message: err.message,
        stackTrace: err.stack,
      });

    case constants.FORBIDDEN:
      res.json({
        title: "its forbidden",
        message: err.message,
        stackTrace: err.stack,
      });

    default:
      console.log("No Error");
      break;
  }
};

module.exports = errorHandler;
