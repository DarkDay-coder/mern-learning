const apiError = require('../middleware/apiError.middleware');
const catchAsync = require('../middleware/catchAsync');
const userModel = require('./../models/user.model');

const filterObj = (obj, ...allowedFields) => {
   const newObj = {};
   Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
   });
   return newObj;
};
class UserController {
   getAllUsers = catchAsync(async (req, res, next) => {
      const users = await userModel.find();
      res.status(200).json({
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

   updateUser = catchAsync(async (req, res, next) => {
      // 1) create erro if user posts password
      if (req.body.password || req.body.confirmPassword) {
         return next(
            new apiError(
               'You are not allowed to change password from this route',
               400
            )
         );
      }

      // 2) Filtered out unwanted fields
      const filteredBody = filterObj(req.body, 'name', 'email');

      // 3) update user document
      const updatedUser = await userModel.findByIdAndUpdate(
         req.user.id,
         filteredBody,
         {
            new: true,
            runValidators: true,
         }
      );
      res.status(200).json({
         status: 'success',
         data: updatedUser,
      });
   });
}
module.exports = UserController;
