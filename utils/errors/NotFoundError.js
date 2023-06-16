class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

const notFoundMovieErrorMessage = 'Фильм с указанным id не найден';
const notFoundUserErrorMessage = 'Пользователь с указанным id не найден';
const notFoundPathErrorMessage = 'Ошибка: Запрос к несуществующей странице';

module.exports = {
  NotFoundError,
  notFoundMovieErrorMessage,
  notFoundUserErrorMessage,
  notFoundPathErrorMessage,
};
