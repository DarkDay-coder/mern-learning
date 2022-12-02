const catchAsync = require('../middleware/catchAsync');
const userModel = require('./../models/user.model');
const jwt = require('jsonwebtoken');
const apiError = require('../middleware/apiError.middleware');

class authMiddleware {
   authorize = catchAsync(async (req, res, next) => {
      // 1) Getting token and check if it exist or not
      let token = '';
      if (
         req.headers.authorization &&
         req.headers.authorization.startsWith('Bearer')
      ) {
         token = req.headers.authorization.split(' ')[1];
      }
      if (!token) {
         return next(
            new apiError('You are not logged in!! Please login First', 401)
         );
      }

      // 2) Verification of token
      let verification = jwt.verify(token, process.env.JWT_SECRET);

      // 3) Check if user still exist or not
      const isUser = await userModel.findById(verification.id);
      // console.log(isUser);
      if (!isUser) {
         return next(
            new apiError('The user with this token is no longer our user', 401)
         );
      }

      // 4) Check if user changed password after JWT was issued
      if (!(isUser.createdAt === isUser.updatedAt)) {
         // if(token.iat)
      }

      req.user = isUser;
      // console.log(req.user);
      console.log('authorization completed');
      next();
   });

   restrictTo = (...roles) => {
      return (req, res, next) => {
         console.log('we now enter return block');
         console.log(req.user.role);
         // roles ['admin', 'lead-guide']. role='user'
         const bool = roles.includes(req.user.role);
         if (!bool) {
            console.log('we now enter boolean block ');
            return next(
               new apiError(
                  'You do not have permission to perform this action',
                  403
               )
            );
         }
         console.log('you passed restriction');
         next();
      };
   };

   // restrictTo = catchAsync(async (req, res, next) => {
   //    // roles ['admin', 'lead-guide']  role = 'user'
   //    console.log(req.user.role);
   //    if (!(req.user.role === 'admin')) {
   //       // || !req.user.role === 'lead-guide'
   //       console.log('restriction failed');
   //       return next(
   //          new apiError(
   //             'You do not have permission to perform this action',
   //             403
   //          )
   //       );
   //    }
   //    console.log('restriction passed');
   //    next();
   // });
}

module.exports = authMiddleware;
