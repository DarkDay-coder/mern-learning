const express = require('express');
const morgan = require('morgan');
const apiError = require('./middleware/error.middleware');
const globalErrorHandler = require('./controllers/apierror.controller');
const app = express();

const tourRouter = require('./routes/tour.routes');
const userRouter = require('./routes/user.routes');

// 1) MIDDLEWARE
if (process.env.NODE_ENV !== 'production') {
   app.use(morgan('dev'));
   // app.use(morgan('tiny'));
   // app.use(morgan('combined'));
   // app.use(morgan('common'));
   // app.use(morgan('short'));
}

// Data Parser middleware
app.use(express.json());
app.use(express.static(`${__dirname}/public`));

// Custom middle
// app.use((req, res, next) => {
//    console.log('Hello from my own middleware 👋');
//    next();
// });
app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   next();
});

// route mounting.
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// HANDLING UNDEFINED ROUTES
app.all('*', (req, res, next) => {
   // res.status(404).json({
   //    status: 'fail',
   //    message: `Can't find ${req.originalUrl} on this server!!`,
   // });

   // const err = new Error(`Can't find ${req.originalUrl} on this server!!`);
   // err.status = 'fail';
   // err.statusCode = 404;

   next(new apiError(`Can't find ${req.originalUrl} on this server!!`, 404));
});

// ERROR HANDLING MIDDLEWARE
app.use(globalErrorHandler);

module.exports = app;
