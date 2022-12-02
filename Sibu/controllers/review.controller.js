//
const catchAsync = require('../middleware/catchAsync');
const ReviewModel = require('./../models/review.model');
const handler = require('./../controllers/handlerFactory');

class reviewController {
   createReview = catchAsync(async (req, res, next) => {
      if (!req.body.tour) req.body.tour = req.params.tourId;
      if (!req.body.user) req.body.user = req.user.id;
      const newReview = await ReviewModel.create(req.body);
      res.status(201).json({
         status: 'success',
         data: newReview,
      });
   });
   getAllReviews = catchAsync(async (req, res, next) => {
      let filter = {};
      if (req.params.tourId) filter = { tour: req.params.tourId };
      const reviews = await ReviewModel.find();
      res.status(200).json({
         status: 'success',
         reviews,
      });
   });
   getReviewById = catchAsync(async (req, res, next) => {
      console.log('requested review is having id: ' + req.params.id);
      const review = await ReviewModel.findById(req.params.id); // TourModel.findOne({_id : req.params.id})
      if (!review) {
         return next(new apiError('No review found with that ID', 404));
      }
      res.status(200).json({
         status: 'succeed!',
         data: review,
      });
   });
   updateReviewById = handler.updateOne(ReviewModel);
   deleteReviewById = handler.deleteOne(ReviewModel);
}
module.exports = reviewController;
