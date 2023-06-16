const { celebrate, Joi } = require('celebrate');

module.exports = function () {
  return celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().min(2)
        .max(30),
      name: Joi.string().min(2).max(30),
    }),
  });
};
