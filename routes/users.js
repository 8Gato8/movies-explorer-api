const userRouter = require('express').Router();
const updateProfileValidator = require('../middlewares/validators/userValidators/updateProfileValidator');

const {
  getCurrentUserInfo,
  updateProfile,
} = require('../controllers/users');

userRouter.get('/me', getCurrentUserInfo);
userRouter.patch('/me', updateProfileValidator(), updateProfile);

module.exports = userRouter;
