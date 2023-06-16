class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = 400;
  }
}

const badRequestMovieNotFoundMessage = 'Фильм с указанным id не найден';
const badRequestGeneralIncorrectInputMessage = 'Переданы некорректные данные';
const badRequestMovieIncorrectInputMessage = 'Переданы некорректные данные фильма';
const badRequestUserIncorrectInputMessage = 'Переданы некорректные данные пользователя';

module.exports = {
  BadRequestError,
  badRequestMovieNotFoundMessage,
  badRequestGeneralIncorrectInputMessage,
  badRequestMovieIncorrectInputMessage,
  badRequestUserIncorrectInputMessage,
};
