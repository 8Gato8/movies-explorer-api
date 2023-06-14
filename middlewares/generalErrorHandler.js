const { isCelebrateError } = require('celebrate');
const { INTERNAL_SERVER_ERROR_CODE } = require('../httpStatusCodes/httpStatusCodes');

module.exports = (err, req, res, next) => {
  let statusCode;
  let message;

  if (isCelebrateError(err)) {
    const error = err.details.get('body') ?? err.details.get('params');
    const { details } = error;
    const { message: errorMessage } = details[0];
    statusCode = 400;
    message = errorMessage;
  } else {
    statusCode = err.statusCode ?? INTERNAL_SERVER_ERROR_CODE;
    message = (statusCode === INTERNAL_SERVER_ERROR_CODE)
      ? 'Произошла ошибка сервера'
      : err.message;
  }
  res.status(statusCode).send({ message });
  next();
};
