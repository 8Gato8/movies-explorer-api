const express = require('express');
const helmet = require('helmet');
require('dotenv').config();
const cors = require('cors');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const limiter = require('./middlewares/limiter');
const router = require('./routes/index');
const generalErrorHandler = require('./middlewares/generalErrorHandler');
const nonexistentPathErrorHandler = require('./middlewares/nonexistentPathErrorHandler');
const dbAdress = require('./utils/dbConfig');

const { PORT = 3000, DATA_BASE_ADRESS = dbAdress } = process.env;

const app = express();

mongoose.connect(`${DATA_BASE_ADRESS}`);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(limiter);

app.use(helmet());

app.use(cors());

app.use('/', router);

app.use('*', nonexistentPathErrorHandler);

app.use(errorLogger);

app.use(generalErrorHandler);

app.listen(PORT);
