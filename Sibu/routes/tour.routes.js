const express = require('express');
const router = express.Router();
const TourController = require('./../controllers/tour.controller');
const tour_controller = new TourController();
const authMiddleware = require('./../middleware/auth.middleware');
const auth_middleware = new authMiddleware();
const reviewRouter = require('./review.route');

router.use('/:tourId/reviews', reviewRouter);

// CRUD operation
router
   .route('/top-5-cheap')
   .get(tour_controller.aliasTopTours, tour_controller.getAllTours);
router.route('/tour-stats').get(tour_controller.getTourStats);
router
   .route('/monthly-plan/:year')
   .get(
      auth_middleware.authorize,
      auth_middleware.restrictTo('admin', 'lead-guide', 'guide'),
      tour_controller.getMonthlyPlan
   );
router
   .route('/')
   .get(tour_controller.getAllTours)
   .post(
      auth_middleware.authorize,
      auth_middleware.restrictTo('lead-guide', 'admin'),
      tour_controller.createTour
   );
router
   .route('/:id')
   .get(tour_controller.getTourById)
   .patch(
      auth_middleware.authorize,
      auth_middleware.restrictTo('admin', 'lead-guide'),
      tour_controller.updateTourById
   )
   .delete(
      auth_middleware.authorize,
      auth_middleware.restrictTo('admin', 'lead-guide'),
      tour_controller.deleteTourById
   );
module.exports = router;
