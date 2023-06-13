const validator = require('validator');

const { isURL, isEmail } = validator;

module.exports = {
  requiredStringSetting: {
    type: String,
    required: true,
  },
  requiredNumberSetting: {
    type: Number,
    required: true,
  },
  requiredUrlSetting: {
    type: String,
    required: true,
    validate: {
      validator(url) {
        return isURL(url);
      },
      message: 'Указанное значение не соответствует формату url',
    },
  },
  requiredEmailSetting: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator(email) {
        return isEmail(email);
      },
      message: 'Указанное значение не соответствует формату email',
    },
  },
};
