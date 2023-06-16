const { isCelebrateError } = require('celebrate');
const { BAD_REQUEST_CODE } = require('../utils/httpStatusCodes/httpStatusCodes');
const { INTERNAL_SERVER_ERROR_CODE, internalServerErrorMessage } = require('../utils/errors/generalErrorMessage');

module.exports = (err, req, res, next) => {
  let statusCode;
  let message;

  if (isCelebrateError(err)) {
    const error = err.details.get('body') ?? err.details.get('params');
    const { details } = error;
    const { message: errorMessage } = details[0];
    statusCode = BAD_REQUEST_CODE;
    message = errorMessage;
  } else {
    statusCode = err.statusCode ?? INTERNAL_SERVER_ERROR_CODE;
    message = (statusCode === INTERNAL_SERVER_ERROR_CODE)
      ? internalServerErrorMessage
      : err.message;
  }
  res.status(statusCode).send({ message });
  next();
};
