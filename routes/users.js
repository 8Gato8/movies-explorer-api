const userRouter = require('express').Router();
const updateProfileValidator = require('../middlewares/validators/userValidators/updateProfileValidator');

const {
  getUserInfo,
  updateProfile,
} = require('../controllers/users');

userRouter.get('/me', getUserInfo);
userRouter.patch('/me', updateProfileValidator(), updateProfile);

module.exports = userRouter;
