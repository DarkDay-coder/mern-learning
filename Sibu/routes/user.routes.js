const express = require('express');
const router = express.Router();
const UserController = require('./../controllers/user.controller');
const user_cont = new UserController();
const AuthController = require('./../controllers/auth.controller');
const auth_cont = new AuthController();

router.post('/signup', auth_cont.signup);

router.route('/').get(user_cont.getAllUsers).post(user_cont.createUser);
router
   .route('/:id')
   .get(user_cont.getUserById)
   .patch(user_cont.updateUserById)
   .delete(user_cont.deleteUserById);

module.exports = router;
