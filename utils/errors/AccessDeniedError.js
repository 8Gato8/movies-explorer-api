class AccessDeniedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AccessDeniedError';
    this.statusCode = 403;
  }
}

const accessDeniedErrorMessage = 'Недостаточно прав для выполнения операции';

module.exports = {
  AccessDeniedError,
  accessDeniedErrorMessage,
};
