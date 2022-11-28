const catchAsync = require('../middleware/catchAsync');
const userModel = require('./../models/user.model');
const jwt = require('jsonwebtoken');
const apiError = require('../middleware/apiError.middleware');
const bcrypt = require('bcryptjs');

// JWT TOKEN GENERATION
const signToken = (id) => {
   return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
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
      const token = signToken(newUser._id);
      res.status(201).json({
         status: 'success',
         token,
         user: newUser,
      });
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
      const token = signToken(user._id);
      res.status(200).json({
         status: 'success login',
         token,
      });
   });
}

module.exports = authController;
