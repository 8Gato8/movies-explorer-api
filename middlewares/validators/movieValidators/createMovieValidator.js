const { celebrate, Joi } = require('celebrate');
const regex = require('../../regExpForLinkValidation');

module.exports = function () {
  return celebrate({
    body: Joi.object().keys({
      country: Joi.string().required(),
      director: Joi.string().required(),
      duration: Joi.number().required(),
      year: Joi.string().required(),
      description: Joi.string().required(),
      image: Joi.string().pattern(regex).required(),
      trailerLink: Joi.string().pattern(regex).required(),
      thumbnail: Joi.string().pattern(regex).required(),
      nameRU: Joi.string().required(),
      nameEN: Joi.string().required(),
      movieId: Joi.number().required(),
    }),
  });
};
