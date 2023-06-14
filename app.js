const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const limiter = require('./middlewares/limiter');
const router = require('./routes/index');
const generalErrorHandler = require('./middlewares/generalErrorHandler');
const nonexistentPathErrorHandler = require('./middlewares/nonexistentPathErrorHandler');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/bitfilmsdb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(limiter);

app.use('/', router);

app.use('*', nonexistentPathErrorHandler);

app.use(errors());

app.use(generalErrorHandler);

app.listen(PORT);
