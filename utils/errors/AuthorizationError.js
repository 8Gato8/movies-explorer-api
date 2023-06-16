class AuthorizationError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AuthorizationError';
    this.statusCode = 401;
  }
}

const authorizationErrorGeneralMessage = 'Необходима авторизация';
const authorizationErrorIncorrectInputMessage = 'Неправильные почта или пароль';

module.exports = {
  AuthorizationError,
  authorizationErrorGeneralMessage,
  authorizationErrorIncorrectInputMessage,
};
