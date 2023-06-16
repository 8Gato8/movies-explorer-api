const mongoose = require('mongoose');

const {
  requiredStringSetting,
  requiredNumberSetting,
  requiredUrlSetting,
} = require('../utils/validationSettings');

const movieSchema = new mongoose.Schema({
  country: requiredStringSetting,
  director: requiredStringSetting,
  duration: {
    type: Number,
    required: true,
  },
  year: requiredStringSetting,
  description: requiredStringSetting,
  image: requiredUrlSetting,
  trailerLink: requiredUrlSetting,
  thumbnail: requiredUrlSetting,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: requiredNumberSetting,
  nameRU: requiredStringSetting,
  nameEN: requiredStringSetting,
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
