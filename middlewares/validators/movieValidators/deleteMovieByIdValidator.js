const { celebrate, Joi } = require('celebrate');

module.exports = function () {
  return celebrate({
    params: Joi.object().keys({
      _id: Joi.string().length(24).hex().required(),
    }),
  });
};
