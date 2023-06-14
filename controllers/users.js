const User = require('../models/user');
const NotFoundError = require('../errorClasses/NotFoundError');
const updateUserData = require('../middlewares/updateUserData');

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError('Пользователь с указанным id не найден');
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res) => {
  updateUserData(req, res);
};

module.exports = {
  getUserInfo,
  updateProfile,
};
