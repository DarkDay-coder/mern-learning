const express = require('express');
const app = express();
const morgan = require('morgan');
const apiError = require('./middleware/apiError.middleware');
const globalErrorHandler = require('./controllers/apierror.controller');

/// ROUTE IMPORTING
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

// DATA PARSER MIDDLEWARE
app.use(express.json());
app.use(
   express.urlencoded({
      extended: false,
   })
);

// PUBLISHING PUBLIC ASSETS
app.use(express.static(`${__dirname}/public`));

// 2) CUSTOM MIDDLEWARE
app.use((req, res, next) => {
   console.log('1. Hello from my own middleware 👋');
   next();
});
app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   console.log('This request is initiated at: ' + req.requestTime);
   next();
});

// ROUTE MOUNTING
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// HANDLING UNDEFINED ROUTES
app.all('*', (req, res, next) => {
   next(new apiError(`Can't find ${req.originalUrl} on this server!!`, 404));
});

// ERROR HANDLING MIDDLEWARE
// HANDLING DIFFERENT UNHANDLED ERRORS THAT ARE CAUSED OUT OF EXPRESS
app.use(globalErrorHandler);

module.exports = app;
