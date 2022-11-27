const catchAsync = require('../middleware/catchAsync');
const userModel = require('./../models/user.model');
class UserController {
   getAllUsers = catchAsync(async (req, res, next) => {
      const users = await userModel.find();
      res.status(500).json({
         status: 'success',
         results: users.length,
         users,
      });
   });

   getUserById = (req, res) => {
      res.status(500).json({
         status: 'error',
         message: 'This route is not defined yet',
      });
   };

   createUser = (req, res) => {
      res.status(500).json({
         status: 'error',
         message: 'This route is not defined yet',
      });
   };

   updateUserById = (req, res) => {
      res.status(500).json({
         status: 'error',
         message: 'This route is not defined yet',
      });
   };

   deleteUserById = (req, res) => {
      res.status(500).json({
         status: 'error',
         message: 'This route is not defined yet',
      });
   };
}
module.exports = UserController;
