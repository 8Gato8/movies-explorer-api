const { BadRequestError, badRequestGeneralIncorrectInputMessage } = require('../utils/errors/BadRequestError');
const { NotFoundError, notFoundUserErrorMessage } = require('../utils/errors/NotFoundError');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  const userData = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user._id,
      userData,
      {
        new: true,
        runValidators: true,
      },
    );
    if (!user) {
      throw new NotFoundError(notFoundUserErrorMessage);
    }

    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationName') {
      next(new BadRequestError(badRequestGeneralIncorrectInputMessage));
    }
    next(err);
  }
};
