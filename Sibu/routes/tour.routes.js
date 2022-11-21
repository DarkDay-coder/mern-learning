const express = require('express');
const router = express.Router();
const TourController = require('./../controllers/tour.controller');
const tour_cont = new TourController();

//param middleware
router.param('id', tour_cont.checkId);

// create a check body middleware
// check if the body contains the name and price properties
// if not send 400(bad request) as response
// add it to post handler stack



router
   .route('/')
   .get(tour_cont.getAllTours)
   .post( tour_cont.createTour);
router
   .route('/:id')
   .get(tour_cont.getTourById)
   .patch(tour_cont.updateTourById)
   .delete(tour_cont.deleteTourById);

module.exports = router;
