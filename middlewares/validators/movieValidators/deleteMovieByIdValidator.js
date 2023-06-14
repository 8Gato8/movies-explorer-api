const { celebrate, Joi } = require('celebrate');

module.exports = function () {
  return celebrate({
    params: Joi.object().keys({
      movieId: Joi.string().length(24).hex().required(),
    }),
  });
};
