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
const sendErrProd = (err, res) => {
   // Operational error, trusted error: send message to client
   if (err.isOperation) {
      console.log('im on production err - if block');
      res.status(err.statusCode).json({
         status: err.status,
         message: err.message,
      });
   }
   // Programming or other unknown error: don't leak error details
   else {
      console.log('im on production err - else block');

      // 1. LOG ERROR
      console.error('ERROR 👀', err);

      // 2. SEND GENERIC MESSAGE

      res.status(500).json({
         status: 'error',
         message: 'something went wrong',
      });
   }
};

module.exports = (err, req, res, next) => {
   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'error';

   if (process.env.NODE_ENV === 'development') {
      sendErrDev(err, res);
   } else if (process.env.NODE_ENV === 'production') {
      console.log('error log enter production handler');

      console.log(err.name);

      if (err.name === 'CastError') {
         console.log('error handling process is now on handleCastErrorDB');
         const message = `Invalid ${err.path}: ${err.value}`;
         res.status(404).json({
            status: 'failed',
            message: message,
         });
      }
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
