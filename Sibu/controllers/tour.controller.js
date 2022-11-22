const TourModel = require('./../models/tour.model');
const fs = require('fs');

class TourController {
   checkBody = (req, res, next) => {
      if (!req.body.name || !req.body.price) {
         return res.status(400).json({
            status: 'failed',
            message: 'Missing Name or Price',
         });
      }
      next();
   };

   getAllTours = (req, res) => {};

   getTourById = (req, res) => {
      console.log(req.params);
      console.log(req.requestTime);
      const id = req.params.id * 1;

      res.status(200).json({
         // status: 'success',
         // result: tour.length,
         // requestedAt: req.requestTime,
         // data: {
         //    tour,
         // },
      });
   };

   createTour = (req, res) => {
      res.status(201).json({
         status: 'success',
         data: {
            newTour,
         },
      });
   };

   updateTourById = (req, res) => {
      res.status(200).json({
         status: 'success',
         data: {
            tour: '<updated tour here>',
         },
      });
   };

   deleteTourById = (req, res) => {
      res.status(204).json({
         status: 'success',
         data: null,
      });
   };
}
module.exports = TourController;
