const catchAsync = require('../middleware/catchAsync');
const userModel = require('./../models/user.model');
const jwt = require('jsonwebtoken');
const apiError = require('../middleware/apiError.middleware');
const bcrypt = require('bcryptjs');
const sendEmail = require('../middleware/email.middleware');
const crypto = require('crypto');

// JWT TOKEN GENERATION
const signToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
   });
};
const createAndSendSignToken = (user, statusCode, res) => {
   const token = signToken(user._id);
   res.status(statusCode).json({
      status: 'success',
      token,
      data: user,
   });
};

class authController {
   signup = catchAsync(async (req, res, next) => {
      // const newUser = await userModel.create(req.body);
      const newUser = await userModel.create({
         name: req.body.name,
         email: req.body.email,
         password: req.body.password,
         confirmPassword: req.body.confirmPassword,
         role: req.body.role,
      });
      createAndSendSignToken(newUser, 201, res);
   });

   login = catchAsync(async (req, res, next) => {
      let body = req.body;
      // const {password} = req.body

      // 1) check whether email and password exist
      if (!body.email || !body.password) {
         return next(new apiError('Please provide email and Password', 400));
      }

      // 2) check if email and password match or not
      const user = await userModel
         .findOne({ email: body.email })
         .select('+password');
      if (!user) {
         return next(new apiError('Incorrect email or password', 401));
      }
      const pass = await bcrypt.compare(req.body.password, user.password);
      if (!user || !pass) {
         return next(new apiError('Incorrect email or password', 401));
      }

      // 3) if data match with the data on db send JWT in response
      createAndSendSignToken(user, 200, res);
   });

   forgetPassword = catchAsync(async (req, res, next) => {
      // 1) Get user based on posted email address
      const user = await userModel.findOne({ email: req.body.email });
      if (!user) {
         return next(new apiError('user does not exist', 404));
      }

      // 2) Generate random reset token
      const resetToken = user.createPasswordResetToken();
      await user.save({ validateBeforeSave: false });

      // 3) Send the token back to the user's email address

      const resetURL = `${req.protocol}://${req.get(
         'host'
      )}/api/v1/users/resetPassword/${resetToken}`;
      const message = `Forget Your Password? Submit a PATCH request with your new password and confirmPassword to: ${resetURL}.\nIf you didn't forget your password please ignore this message`;
      try {
         await sendEmail({
            email: user.email,
            subject: 'Your Password reset Token that valid for 10 mins',
            message,
         });
         res.status(200).json({
            status: 'success',
            message: 'Token send to email!',
         });
      } catch (error) {
         console.log(error);
         user.passwordResetToken = undefined;
         user.passwordResetExpires = undefined;
         await user.save({ validateBeforeSave: false });
         return next(new apiError('there was an error sending the email', 500));
      }
   });

   resetPassword = catchAsync(async (req, res, next) => {
      // 1) Get user based on the token
      const hashedToken = crypto
         .createHash('sha256')
         .update(req.params.token)
         .digest('hex');

      const user = await userModel.findOne({
         passwordResetToken: hashedToken,
         passwordResetExpires: { $gt: Date.now() },
      });

      // 2) Check whether the token is expired or not and the user exist or not
      if (!user) {
         return next(new apiError('Token is invalid or has expired', 400));
      }
      user.password = req.body.password;
      user.confirmPassword = req.body.confirmPassword;
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      // 3) log the user in and send new JWT
      createAndSendSignToken(user, 200, res);
   });

   updatePassword = catchAsync(async (req, res, next) => {
      // 1) Get user details from collection
      const user = await userModel.findById(req.user.id).select('+password');

      // 2) check current password is correct or not
      const pass = await bcrypt.compare(
         req.body.currentPassword,
         user.password
      );
      if (!pass) {
         return next(new apiError('Your current password is wrong', 401));
      }

      // 3) update password
      user.password = req.body.password;
      user.confirmPassword = req.body.confirmPassword;
      await user.save();

      // 4) logged user in and send JWT in response
      createAndSendSignToken(user, 200, res);
   });
}

module.exports = authController;
