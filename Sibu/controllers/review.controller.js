//
const catchAsync = require('../middleware/catchAsync');
const reviewModel = require('./../models/review.model');
class reviewController {
   createReview = catchAsync(async (req, res, next) => {
      if (!req.body.tour) req.body.tour = req.params.tourId;
      if (!req.body.user) req.body.user = req.user.id;
      const newReview = await reviewModel.create(req.body);
      res.status(201).json({
         status: 'success',
         data: newReview,
      });
   });
   getAllReviews = catchAsync(async (req, res, next) => {
      const reviews = await reviewModel.find();
      res.status(200).json({
         status: 'success',
         reviews,
      });
   });
   getReviewById = catchAsync(async (req, res, next) => {
      console.log('requested review is having id: ' + req.params.id);
      const review = await reviewModel.findById(req.params.id); // TourModel.findOne({_id : req.params.id})
      if (!review) {
         return next(new apiError('No review found with that ID', 404));
      }
      res.status(200).json({
         status: 'succeed!',
         data: review,
      });
   });
}
module.exports = reviewController;
