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
   .patch('/resetPassword/:token', auth_controller.resetPassword);

router
   // protect all routes after this middleware
   .use(auth_midddleware.authorize)
   .patch('/updateMyPassword', auth_controller.updatePassword)
   .patch('/updateUser', user_controller.updateUser)
   .delete('/deleteUser', user_controller.deleteUser)
   .get('/me', user_controller.findMe, user_controller.getUserById);

// restrict to admin only
router.use(auth_midddleware.restrictTo('admin'));
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
