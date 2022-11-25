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
      res.status(err.statusCode).json({
         status: err.status,
         message: err.message,
      });
   }
   // Programming or other unknown error: don't leak error details
   else {
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
      sendErrProd(err, res);
   }
};
