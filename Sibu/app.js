const fs = require('fs');
const express = require('express');
const morgan = require('morgan');

const app = express();

// 1) MIDDLEWARE

app.use(morgan('dev'));
app.use(morgan('tiny'));
app.use(morgan('combined'));
app.use(morgan('common'));
app.use(morgan('short'));

// Data Parser middleware
app.use(express.json());

// Custom middle
app.use((req, res, next) => {
   console.log('Hello from my own middleware 🙌');
   next();
});
app.use((req, res, next) => {
   req.requestTime = new Date().toISOString();
   next();
});

const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// 2) ROUTE HANDLERS

// tours route handlers
const getAllTours = (req, res) => {
   console.log(
      'currently there are ' + tours[tours.length - 1].id + ' tour list'
   );
   res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
         tours,
      },
   });
};

const getTourById = (req, res) => {
   console.log(req.params);
   console.log(req.requestTime);
   const id = req.params.id * 1;
   const tour = tours.find((el) => el.id === id);
   if (tour) {
      res.status(200).json({
         status: 'success',
         result: tour.length,
         requestedAt: req.requestTime,
         data: {
            tour,
         },
      });
   } else {
      res.status(400).json({
         status: 'failure',
         message: 'No tour found with that id',
      });
   }
};

const createTour = (req, res) => {
   console.log(req.body);
   const newID = tours[tours.length - 1].id + 1;
   const newTour = Object.assign({ ID: newID }, req.body);
   tours.push(newTour);

   fs.writeFile(
      `${__dirname}/dev-data/data/tours-simple.json`,
      JSON.stringify(tours),
      (err) => {
         res.status(201).json({
            status: 'success',
            data: {
               newTour,
            },
         });
      }
   );
};

const updateTourById = (req, res) => {
   if (req.params.id * 1 > tours.length) {
      return res.status(404).json({
         status: 'failed',
         message: 'Invalid id provided',
      });
   }
   res.status(200).json({
      status: 'success',
      data: {
         tour: '<updated tour here>',
      },
   });
};

const deleteTourById = (req, res) => {
   if (req.params.id * 1 > tours.length) {
      return res.status(404).json({
         status: 'failed',
         message: 'Invalid id provided',
      });
   }
   res.status(204).json({
      status: 'success',
      data: null,
   });
};

// user route handlers
const getAllUsers = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not defined yet',
   });
};

const getUserById = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not defined yet',
   });
};

const createUser = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not defined yet',
   });
};

const updateUserById = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not defined yet',
   });
};

const deleteUserById = (req, res) => {
   res.status(500).json({
      status: 'error',
      message: 'This route is not defined yet',
   });
};

// 3) ROUTES

app.route('/api/v1/tours').get(getAllTours).post(createTour);
app.route('/api/v1/tours/:id')
   .get(getTourById)
   .patch(updateTourById)
   .delete(deleteTourById);

app.route('/api/v1/users').get(getAllUsers).post(createUser);
app.route('/api/v1/users/:id')
   .get(getUserById)
   .patch(updateUserById)
   .delete(deleteUserById);
// 4) STARTED OUR SERVER

const port = 5000;
app.listen(port, 'localhost', () => {
   console.log('listening on port ' + port);
   console.log(`app listening on port ${port}`);
});
