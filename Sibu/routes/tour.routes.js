const express = require('express');
const router = express.Router();
const reviewController = require('./../controllers/review.controller');
const review_controller = new reviewController();
const TourController = require('./../controllers/tour.controller');
const tour_controller = new TourController();
const authMiddleware = require('./../middleware/auth.middleware');
const auth_middleware = new authMiddleware();
const reviewRouter = require('./review.route');

// POST: /tour/tour-id/reviews
// GET: /tour/tour-id/reviews
// GET: /tour/tour-id/reviews/reviews-id
// router
//    .route('/:tourId/reviews')
//    .post(authorize, restrictTo('user'), review_controller.createReview);
router.use('/:tourId/reviews', reviewRouter);

// CRUD operation

router
   .route('/top-5-cheap')
   .get(tour_controller.aliasTopTours, tour_controller.getAllTours);

router.route('/tour-stats').get(tour_controller.getTourStats);

router.route('/monthly-plan/:year').get(tour_controller.getMonthlyPlan);
router
   .route('/')
   .get(tour_controller.getAllTours)
   .post(
      auth_middleware.authorize,
      auth_middleware.restrictTo('admin'),
      tour_controller.createTour
   );

router
   .route('/:id')
   .get(tour_controller.getTourById)
   .patch(
      auth_middleware.authorize,
      auth_middleware.restrictTo,
      tour_controller.updateTourById
   )
   .delete(
      auth_middleware.authorize,
      auth_middleware.restrictTo('admin'),
      tour_controller.deleteTourById
   );

module.exports = router;
