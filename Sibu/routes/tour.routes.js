const router = require('express').Router();
const TourController = require('./../controllers/tour.controller');
const tour_cont = new TourController();
const authMiddleware = require('./../middleware/auth.middleware');
const auth_mid = new authMiddleware();

// CRUD operation

router
   .route('/top-5-cheap')
   .get(tour_cont.aliasTopTours, tour_cont.getAllTours);

router.route('/tour-stats').get(tour_cont.getTourStats);

router.route('/monthly-plan/:year').get(tour_cont.getMonthlyPlan);

router
   .route('/')
   .get(tour_cont.getAllTours)
   .post(
      auth_mid.authorize,
      auth_mid.restrictTo(['admin', 'guide']),
      tour_cont.createTour
   );

router
   .route('/:id')
   .get(tour_cont.getTourById)
   .patch(auth_mid.authorize, auth_mid.restrictTo, tour_cont.updateTourById)
   .delete(auth_mid.authorize, auth_mid.restrictTo, tour_cont.deleteTourById);

module.exports = router;
