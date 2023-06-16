const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const { AuthorizationError, authorizationErrorIncorrectInputMessage } = require('../utils/errors/AuthorizationError');

const { requiredEmailSetting } = require('../utils/validationSettings');

const userSchema = new mongoose.Schema({
  email: requiredEmailSetting,
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  password: {
    type: String,
    select: false,
    required: true,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = async function (email, password) {
  const user = await this.findOne({ email }).select('+password');

  if (!user) {
    throw new AuthorizationError(authorizationErrorIncorrectInputMessage);
  }

  const isMatched = await bcrypt.compare(password, user.password);

  if (!isMatched) {
    throw new AuthorizationError(authorizationErrorIncorrectInputMessage);
  }

  return user;
};

module.exports = mongoose.model('user', userSchema);
