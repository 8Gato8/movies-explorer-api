const router = require('express').Router();

const { createUser, login } = require('../controllers/users');
const createUserValidator = require('../middlewares/validators/userValidators/createUserValidator');
const loginValidator = require('../middlewares/validators/userValidators/loginValidator');

const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');

router.post('/signin', loginValidator(), login);
router.post('/signup', createUserValidator(), createUser);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

module.exports = router;
