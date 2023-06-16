const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { NotFoundError, notFoundUserErrorMessage } = require('../utils/errors/NotFoundError');
const { BadRequestError, badRequestUserIncorrectInputMessage } = require('../utils/errors/BadRequestError');
const { ConflictError, conflictErrorMessage } = require('../utils/errors/ConflictError');
const updateUserData = require('../middlewares/updateUserData');

const { NODE_ENV, JWT_SECRET } = process.env;
const { CREATED_CODE } = require('../utils/httpStatusCodes/httpStatusCodes');

const getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      throw new NotFoundError(notFoundUserErrorMessage);
    }
    res.send(user);
  } catch (err) {
    next(err);
  }
};

const updateProfile = async (req, res) => {
  updateUserData(req, res);
};

const createUser = async (req, res, next) => {
  const {
    email,
    name,
    password,
  } = req.body;

  try {
    const hash = await bcrypt.hash(password, 10);
    await User.create({
      email,
      name,
      password: hash,
    });
    res.status(CREATED_CODE).send({
      email,
      name,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(badRequestUserIncorrectInputMessage));
    }
    if (err.code === 11000) {
      next(new ConflictError(conflictErrorMessage));
    }
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
      { expiresIn: '7d' },
    );

    res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getUserInfo,
  updateProfile,
  createUser,
  login,
};
