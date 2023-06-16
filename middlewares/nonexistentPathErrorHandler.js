const { NotFoundError, notFoundPathErrorMessage } = require('../utils/errors/NotFoundError');

module.exports = (req, res, next) => {
  try {
    throw new NotFoundError(notFoundPathErrorMessage);
  } catch (err) {
    next(err);
  }
};
