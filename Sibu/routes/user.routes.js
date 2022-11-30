const router = require('express').Router();
const UserController = require('./../controllers/user.controller');
const user_controller = new UserController();
const AuthController = require('./../controllers/auth.controller');
const auth_controller = new AuthController();
const authMiddleware = require('./../middleware/auth.middleware');
const auth_midddleware = new authMiddleware();
const reviewController = require('./../controllers/review.controller');
const review_controller = new reviewController();

router
   .post('/signup', auth_controller.signup)
   .post('/login', auth_controller.login)
   .post('/forgetPassword', auth_controller.forgetPassword)
   .patch('/resetPassword/:token', auth_controller.resetPassword)
   .patch(
      '/updateMyPassword',
      auth_midddleware.authorize,
      auth_controller.updatePassword
   )
   .patch('/updateUser', auth_midddleware.authorize, user_controller.updateUser)
   .delete(
      '/deleteUser',
      auth_midddleware.authorize,
      user_controller.deleteUser
   );

router
   .route('/')
   .get(user_controller.getAllUsers)
   .post(user_controller.createUser);

router
   .route('/:id')
   .get(user_controller.getUserById)
   .patch(user_controller.updateUserById)
   .delete(user_controller.deleteUserById);

module.exports = router;
