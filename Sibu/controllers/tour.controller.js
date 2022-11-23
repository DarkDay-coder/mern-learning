const TourModel = require('./../models/tour.model');
const fs = require('fs');
const Tour = require('./../models/tour.model');
const { query } = require('express');
const APIFeatures = require('./../middleware/apiFeatures.middleware');

class TourController {
   aliasTopTours = (req, res, next) => {
      console.log('Im on alias middleware');
      req.query.limit = '5';
      req.query.sort = '-ratingAverage, price';
      req.query.fields = 'name, price, ratingAverage, summary, difficulty';
      next();
   };

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
      console.log('now i reach get all tour function');
      try {
         // BUILD THE QUERY

         // EXECUTE THE QUERY
         const features = new APIFeatures(Tour.find(), req.query)
            .filter()
            .sort()
            .limitFields()
            .pagination();
         const tours = await features.query;
         // const tours = await TourModel.find();

         // SEND RESPONSE
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
