const router = require('express').Router();
const UserController = require('./../controllers/user.controller');
const user_cont = new UserController();
const AuthController = require('./../controllers/auth.controller');
const auth_cont = new AuthController();
const authMiddleware = require('./../middleware/auth.middleware');
const auth_mid = new authMiddleware();

router
   .post('/signup', auth_cont.signup)
   .post('/login', auth_cont.login)
   .post('/forgetPassword', auth_cont.forgetPassword)
   .patch('/resetPassword/:token', auth_cont.resetPassword)
   .patch('/updateMyPassword', auth_mid.authorize, auth_cont.updatePassword)
   .patch('/updateUser', auth_mid.authorize, user_cont.updateUser)
   .delete('/deleteUser', auth_mid.authorize, user_cont.deleteUser);

router.route('/').get(user_cont.getAllUsers).post(user_cont.createUser);

router
   .route('/:id')
   .get(user_cont.getUserById)
   .patch(user_cont.updateUserById)
   .delete(user_cont.deleteUserById);

module.exports = router;
