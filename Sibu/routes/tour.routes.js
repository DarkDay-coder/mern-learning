const express = require('express');
const router = express.Router();
const TourController = require('./../controllers/tour.controller');
const tour_cont = new TourController();

router.route('/').get(tour_cont.getAllTours).post(tour_cont.createTour);
router
   .route('/:id')
   .get(tour_cont.getTourById)
   .patch(tour_cont.updateTourById)
   .delete(tour_cont.deleteTourById);

module.exports = router;
