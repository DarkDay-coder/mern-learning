const TourModel = require('./../models/tour.model');
const fs = require('fs');
const Tour = require('./../models/tour.model');
const { query } = require('express');

class APIFeatures {
   constructor(query, queryStr) {
      this.query = query;
      this.queryStr = queryStr;
   }
   filter() {
      // 1) FILTERING
      const queryObj = { ...this.queryStr };
      const excludeField = ['page', 'sort', 'limit', 'fileds'];
      excludeField.forEach((el) => delete queryObj[el]);
      // 2) ADVANCE FILTERING
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(
         /\b(gte|gt|lte|lt)\b/g,
         (match) => `$${match}`
      );
      console.log(JSON.parse(queryStr));
      this.query = this.query.find(JSON.parse(queryStr));
      return this;
   }
   sort() {
      // 3) SORTING
      if (this.queryStr.sort) {
         const sortBy = this.queryStr.sort.split(',').join(' ');
         this.query = this.query.sort(sortBy);
      } else {
         this.query = this.query.sort('-createdAt');
      }
      return this;
   }
   limitFields() {
      // 4) FIELD LIMITING
      if (this.queryStr.fields) {
         const fields = this.queryStr.fields.split(', ').join(' ');
         this.query = this.query.select(fields);
      } else {
         this.query = this.query.select('-__v');
      }
      return this;
   }
   pagination() {
      // 5) PAGINATION
      const page = this.queryStr.page * 1 || 1;
      const limit = this.queryStr.limit * 1 || 100;
      const skip = (page - 1) * limit;
      this.query = this.query.skip(skip).limit(limit);

      // if (this.queryStr.page) {
      //    const numTours = await Tour.countDocuments();
      //    if (skip >= numTours) {
      //       throw new Error("This page doesn't exist");
      //    }
      // }
      return this;
   }
}
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
