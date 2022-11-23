const TourModel = require('./../models/tour.model');
const fs = require('fs');
const Tour = require('./../models/tour.model');

class TourController {
   createTour = async (req, res) => {
      // const newTour = new TourModel({});
      // newTour.save();

      try {
         const newTour = await TourModel.create(req.body);
         res.status(201).json({
            status: 'success',
            data: {
               newTour,
            },
         });
      } catch (error) {
         res.status(400).json({
            status: 'failed',
            message: 'Invalid data sent!!',
         });
      }
   };

   getAllTours = async (req, res) => {
      try {
         const tours = await TourModel.find();
         res.status(200).json({
            status: 'succeed!',
            result: tours.length,
            data: tours,
         });
      } catch (error) {
         res.status(404).json({
            status: 'failed',
            message: error,
         });
      }
   };

   getTourById = async (req, res) => {
      try {
         console.log('requested data is having id: ' + req.params.id);
         const tour = await TourModel.findById(req.params.id); // TourModel.findOne({_id : req.params.id})
         res.status(200).json({
            status: 'succeed!',
            data: tour,
         });
      } catch (error) {
         res.status(404).json({
            status: 'failed',
            message: error + 'error',
         });
      }
   };

   updateTourById = async (req, res) => {
      console.log('the update request is for id: ' + req.params.id);
      try {
         const tour = await TourModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
               upsert: true,
               new: true,
               runValidators: true,
            }
         );
         res.status(200).json({
            status: 'success',
            data: tour,
         });
      } catch (error) {
         res.status(404).json({
            status: 'failed',
            message: error + 'error',
         });
      }
   };

   deleteTourById = async (req, res) => {
      console.log('the delete request is for id: ' + req.params.id);
      try {
         const tour = await TourModel.findByIdAndDelete(req.params.id);
         res.status(204).json({
            status: 'success',
            data: null,
         });
      } catch (error) {
         res.status(404).json({
            status: 'failed',
            message: error + 'error',
         });
      }
   };
}
module.exports = TourController;
