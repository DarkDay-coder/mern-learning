const express = require('express');
const morgan = require('morgan');
const app = express();

const tourRouter = require('./routes/tour.routes');
const userRouter = require('./routes/user.routes');

// 1) MIDDLEWARE

app.use(morgan('dev'));
// app.use(morgan('tiny'));
// app.use(morgan('combined'));
// app.use(morgan('common'));
// app.use(morgan('short'));

// Data Parser middleware
app.use(express.json());

// Custom middle
app.use((req, res, next) => {
   console.log('Hello from my own middleware 👋');
   next();
});
app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   next();
});

// route mounting.
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

module.exports = app;
