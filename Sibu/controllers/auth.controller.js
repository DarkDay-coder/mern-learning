const catchAsync = require('../middleware/catchAsync');
const userModel = require('./../models/user.model');

class authController {
   signup = catchAsync(async (req, res, next) => {
      const newUser = await userModel.create(req.body);
      res.status(201).json({
         status: 'success',
         user: newUser,
      });
   });
}

module.exports = authController;
