const movieRouter = require('express').Router();

const createMovieValidator = require('../middlewares/validators/movieValidators/createMovieValidator');
const deleteMovieByIdValidator = require('../middlewares/validators/movieValidators/deleteMovieByIdValidator');

const {
  getMovies,
  createMovie,
  deleteMovieById,
} = require('../controllers/movies');

movieRouter.get('/', getMovies);
movieRouter.post('/', createMovieValidator(), createMovie);
movieRouter.delete('/:_id', deleteMovieByIdValidator(), deleteMovieById);

module.exports = movieRouter;
