const { NODE_ENV } = process.env;

module.exports = NODE_ENV === 'production' ? undefined : 'mongodb://127.0.0.1:27017/bitfilmsdb';
