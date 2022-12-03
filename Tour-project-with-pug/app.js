const path = require('path');
const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const hpp = require('hpp');
const apiError = require('./middleware/apiError.middleware');
const globalErrorHandler = require('./controllers/apierror.controller');

/// ROUTE IMPORTING
const tourRouter = require('./routes/tour.routes');
const userRouter = require('./routes/user.routes');
const reviewRouter = require('./routes/review.route');

// VIEW ENGINE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// 1) GLOBAL MIDDLEWARE

// PUBLISHING STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));
// Security http headers
app.use(helmet());

// development logging
if (process.env.NODE_ENV !== 'production') {
   app.use(morgan('dev'));
   // app.use(morgan('tiny'));
   // app.use(morgan('combined'));
   // app.use(morgan('common'));
   // app.use(morgan('short'));
}

// Limit request from same IP
// const limiter = rateLimit({
//    max: 10,
//    windowMs: 3600000,
//    message: 'Too many request from this IP please try again in an hour',
// });
// app.use('/api', limiter);

// DATA PARSER MIDDLEWARE
app.use(express.json({ limit: '10kb' }));
app.use(
   express.urlencoded({
      extended: false,
   })
);

// DATA SANITIZATION AGAINST NoSQL QUERY INJECTION
app.use(mongoSanitize());

// DATA SANITIZATION AGAINST XSS
app.use(xss());

// PREVENT PARAMETER POLLUTION
app.use(
   hpp({
      whitelist: [
         'duration',
         'ratingQuantity',
         'ratingsAverage',
         'maxGroupSize',
         'difficulty',
         'price',
      ],
   })
);

// 2) CUSTOM MIDDLEWARE
// test middleware
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
app.get('/', (req, res) => {
   res.status(200).render('base');
});
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);

// HANDLING UNDEFINED ROUTES
app.all('*', (req, res, next) => {
   next(new apiError(`Can't find ${req.originalUrl} on this server!!`, 404));
});

// ERROR HANDLING MIDDLEWARE
// HANDLING DIFFERENT UNHANDLED ERRORS THAT ARE CAUSED OUT OF EXPRESS
app.use(globalErrorHandler);

module.exports = app;
