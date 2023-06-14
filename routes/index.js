const router = require('express').Router();

const auth = require('../middlewares/auth');
const userRouter = require('./users');
const movieRouter = require('./movies');

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);

module.exports = router;
