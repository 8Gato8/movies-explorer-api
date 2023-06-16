const Movie = require('../models/movie');
const { NotFoundError, notFoundMovieErrorMessage } = require('../utils/errors/NotFoundError');
const { AccessDeniedError, accessDeniedErrorMessage } = require('../utils/errors/AccessDeniedError');

const {
  CREATED_CODE,
} = require('../utils/httpStatusCodes/httpStatusCodes');

const {
  BadRequestError,
  badRequestMovieNotFoundMessage,
  badRequestMovieIncorrectInputMessage,
} = require('../utils/errors/BadRequestError');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

const deleteMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id);
    if (!movie) {
      throw new NotFoundError(notFoundMovieErrorMessage);
    }

    if (req.user._id !== `${movie.owner.toString()}`) {
      throw new AccessDeniedError(accessDeniedErrorMessage);
    }
    await Movie.findByIdAndRemove(req.params._id);

    res.send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError(badRequestMovieNotFoundMessage));
      return;
    }

    next(err);
  }
};

const createMovie = async (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  try {
    const movie = await Movie.create(
      {
        country,
        director,
        duration,
        year,
        description,
        image,
        trailerLink,
        nameRU,
        nameEN,
        thumbnail,
        owner: req.user._id,
        movieId,
      },
    );

    res.status(CREATED_CODE).send(movie);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequestError(badRequestMovieIncorrectInputMessage));
      return;
    }
    next(err);
  }
};

module.exports = {
  getMovies,
  deleteMovieById,
  createMovie,
};
