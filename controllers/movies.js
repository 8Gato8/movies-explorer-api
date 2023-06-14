const Movie = require('../models/movie');
const NotFoundError = require('../errorClasses/NotFoundError');
const AccessDeniedError = require('../errorClasses/AccessDeniedError');

const {
  CREATED_CODE,
} = require('../httpStatusCodes/httpStatusCodes');
const BadRequestError = require('../errorClasses/BadRequestError');

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
      throw new NotFoundError('Фильм с указанным id не найден');
    }

    if (req.user._id !== `${movie.owner.toString()}`) {
      throw new AccessDeniedError('Недостаточно прав для выполнения операции');
    }
    await Movie.findByIdAndRemove(req.params._id);

    res.send(movie);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequestError('Указан неккоректный id фильма'));
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
      next(new BadRequestError('Переданы некорректные данные фильма'));
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
