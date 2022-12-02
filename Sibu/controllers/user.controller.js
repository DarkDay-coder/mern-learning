const apiError = require('../middleware/apiError.middleware');
const catchAsync = require('../middleware/catchAsync');
const UserModel = require('./../models/user.model');
const handler = require('./../controllers/handlerFactory');
const { findById } = require('../models/review.model');

const filterObj = (obj, ...allowedFields) => {
   const newObj = {};
   Object.keys(obj).forEach((el) => {
      if (allowedFields.includes(el)) newObj[el] = obj[el];
   });
   return newObj;
};
class UserController {
   findMe = (req, res, next) => {
      req.params.id = req.user.id;
      next();
   };
   getAllUsers = catchAsync(async (req, res, next) => {
      const users = await UserModel.find();
      res.status(200).json({
         status: 'success',
         results: users.length,
         users,
      });
   });

   getUserById = async (req, res, next) => {
      const docs = await UserModel.findById(req.params.id).select(
         '-createdAt -updatedAt -active -_id'
      );
      if (!docs) {
         return next(
            new apiError('doesnot find data about the requested id', 404)
         );
      }
      res.status(200).json({
         status: 'success',
         data: docs,
      });
   };

   createUser = handler.createOne(UserModel);
   updateUserById = handler.updateOne(UserModel);
   deleteUserById = handler.deleteOne(UserModel);

   updateUser = catchAsync(async (req, res, next) => {
      // 1) create error if user posts password
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
      const updatedUser = await UserModel.findByIdAndUpdate(
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

   deleteUser = catchAsync(async (req, res, next) => {
      await UserModel.findByIdAndDelete(req.user.id);
      res.status(204).json({
         status: 'success',
         data: null,
      });
   });
}
module.exports = UserController;
