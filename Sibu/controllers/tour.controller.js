const TourModel = require('./../models/tour.model');
const APIFeatures = require('./../middleware/apiFeatures.middleware');
const catchAsync = require('../middleware/catchAsync');
const apiError = require('../middleware/apiError.middleware');

class TourController {
   aliasTopTours = (req, res, next) => {
      console.log('Im on alias middleware');
      req.query.limit = '5';
      req.query.sort = '-ratingAverage, price';
      req.query.fields = 'name, price, ratingAverage, summary, difficulty';
      next();
   };
   createTour = catchAsync(async (req, res, next) => {
      const newTour = await TourModel.create(req.body);
      res.status(201).json({
         status: 'success',
         data: newTour,
      });
   });

   getAllTours = catchAsync(async (req, res, next) => {
      console.log('Hello from getAllTours()');
      const features = new APIFeatures(TourModel.find(), req.query)
         .filter()
         .sort()
         .limitFields()
         .pagination();
      const tours = await features.query;
      res.status(200).json({
         status: 'succeed!',
         result: tours.length,
         data: tours,
      });
   });

   getTourById = catchAsync(async (req, res, next) => {
      console.log('requested data is having id: ' + req.params.id);
      const tour = await TourModel.findById(req.params.id); // TourModel.findOne({_id : req.params.id})
      console.log('here');
      if (!tour) {
         return next(new apiError('No tour found with that ID', 404));
      }
      console.log('next here');
      res.status(200).json({
         status: 'succeed!',
         data: tour,
      });
   });

   updateTourById = catchAsync(async (req, res, next) => {
      console.log('the update request is for id: ' + req.params.id);
      const tour = await TourModel.findByIdAndUpdate(req.params.id, req.body, {
         // upsert: true,
         new: true,
         runValidators: true,
      });
      if (!tour) {
         return next(new apiError('No tour found with that ID', 404));
      }
      res.status(200).json({
         status: 'success',
         data: tour,
      });
   });

   deleteTourById = catchAsync(async (req, res, next) => {
      console.log('the delete request is for id: ' + req.params.id);
      const tour = await TourModel.findByIdAndDelete(req.params.id);
      if (!tour) {
         return next(new apiError('No tour found with that ID', 404));
      }
      res.status(204).json({
         status: 'success',
         data: null,
      });
   });

   // AGGREGATION PIPELINE
   getTourStats = catchAsync(async (req, res, next) => {
      const stats = await TourModel.aggregate([
         {
            $match: { ratingsAverage: { $gte: 4.5 } },
         },
         {
            $group: {
               // _id: '$difficulty',
               _id: { $toUpper: '$difficulty' },
               numOfTours: { $sum: 1 },
               numRatings: { $sum: '$ratingsQuantity' },
               avgRating: { $avg: '$ratingsAverage' },
               avgPrice: { $avg: '$price' },
               minPrice: { $min: '$price' },
               maxPrice: { $max: '$price' },
            },
         },
         {
            $sort: {
               avgPrice: 1,
            },
         },
      ]);
      res.status(200).json({
         status: 'success',
         data: stats,
      });
   });

   getMonthlyPlan = catchAsync(async (req, res, next) => {
      const year = req.params.year * 1;
      const plan = await TourModel.aggregate([
         {
            $unwind: '$startDates',
         },
         {
            $match: {
               startDates: {
                  $gte: new Date(`${year}-01-01`),
                  $lte: new Date(`${year}-12-31`),
               },
            },
         },
         {
            $group: {
               _id: { $month: '$startDates' },
               numTourStarts: { $sum: 1 },
               tours: { $push: '$name' },
            },
         },
         {
            $addFields: {
               month: '$_id',
            },
         },
         {
            $project: {
               _id: 0,
            },
         },
         {
            $sort: {
               numTourStarts: 1,
            },
         },
         // {
         //    $limit: 6,
         // },
      ]);

      res.status(200).json({
         status: 'success',
         totalTours: plan.length,
         data: plan,
      });
   });
}
module.exports = TourController;
