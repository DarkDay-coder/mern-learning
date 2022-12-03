const apiError = require('../middleware/apiError.middleware');

const handleCastErrorDB = (err) => {
   console.log('error handling process is now on handleCastErrorDB');
   const message = `Invalid ${err.path}: ${err.value}`;
   return new apiError(message, 400);
};

const sendErrDev = (err, res) => {
   res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
   });
};
// const sendErrProd = (err, res) => {
//    // Operational error, trusted error: send message to client
//    if (err.isOperation) {
//       console.log('im on production err - if block');
//       res.status(err.statusCode).json({
//          status: err.status,
//          message: err.message,
//       });
//    }
//    // Programming or other unknown error: don't leak error details
//    else {
//       console.log('im on production err - else block');

//       // 1. LOG ERROR
//       console.error('ERROR 👀', err);

//       // 2. SEND GENERIC MESSAGE

//       res.status(500).json({
//          status: 'error',
//          message: 'something went wrong',
//       });
//    }
// };

module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'error';

   if (process.env.NODE_ENV === 'development') {
      sendErrDev(err, res);
   } else if (process.env.NODE_ENV === 'production') {
      console.log('error log enter production handler');

      console.log(err.name);

      // OBJECT TO ID CAST ERROR
      if (err.name === 'CastError') {
         console.log('error handling process is now on Cast Error');
         const message = `Invalid ${err.path}: ${err.value}`;
         // return new apiError(message, 400)

         res.status(404).json({
            status: 'failed',
            message: message,
         });
      }

      // DUPLICATE FILED NAME ERROR
      if (err.code === 11000) {
         console.log('error handling process is now on Duplicate key Error');
         const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
         console.log(value);
         const message = `Duplicate filed value: ${value}. Please use another value!`;
         // return new apiError(message, 400)
         res.status(400).json({
            status: 'failed',
            message: message,
         });
      }

      // MONGOOSE VALIDATION ERROR
      if (err.name === 'ValidationError') {
         const message = 'Invalid Input Data';
         // return new apiError(message, 400);
         res.status(400).json({
            status: 'failed',
            message: message,
         });
      }

      // JWT VALIDATION ERROR
      if (err.name === 'JsonWebTokenError') {
         const message = 'Invalid token. Please log in again!';
         res.status(401).json({
            status: 'failed',
            message: message,
         });
      }

      if (err.name === 'TokenExpiredError') {
         const message = 'Your token has expired, Please login again!!';
         res.status(401).json({
            status: 'failed',
            message: message,
         });
      }

      res.status(500).json({
         status: 'failed',
         message: err.name,
      });
   }
};

// module.exports = (err, req, res, next) => {
//    err.statusCode = err.statusCode || 500;
//    err.status = err.status || 'error';
//    res.status(err.statusCode).json({
//       status: err.status,
//       message: err.message,
//    });
// };
