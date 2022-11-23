const express = require('express');
const router = express.Router();
const TourController = require('./../controllers/tour.controller');
const tour_cont = new TourController();

//param middleware
// router.param('id', tour_cont.checkId);

// CRUD operation

router
   .route('/top-5-cheap')
   .get(tour_cont.aliasTopTours, tour_cont.getAllTours);

router.route('/tour-stats').get(tour_cont.getTourStats);
router.route('/').get(tour_cont.getAllTours).post(tour_cont.createTour);
router
   .route('/:id')
   .get(tour_cont.getTourById)
   .patch(tour_cont.updateTourById)
   .delete(tour_cont.deleteTourById);

module.exports = router;
