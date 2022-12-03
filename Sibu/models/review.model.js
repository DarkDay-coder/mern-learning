// review / rating / createdAt / ref to tour / ref to user
const TourModel = require('./tour.model');
const mongoose = require('mongoose');
const reviewSchema = new mongoose.Schema(
   {
      review: {
         type: String,
         required: [true, 'Review can not be empty!'],
      },
      rating: {
         type: Number,
         min: 1,
         max: 5,
      },
      tour: {
         type: mongoose.Schema.ObjectId,
         ref: 'Tour',
         required: [true, 'Review must belong to a tour'],
      },
      user: {
         type: mongoose.Schema.ObjectId,
         ref: 'User',
         required: [true, 'Review must belong to a user'],
      },
   },
   {
      timestamps: true,
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
   }
);

reviewSchema.pre(/^find/, function (next) {
   // this.populate({
   //    path: 'tour',
   //    select: 'name',
   // }).populate({
   //    path: 'user',
   //    select: 'name photo -_id',
   // });
   this.populate({
      path: 'user',
      select: 'name photo -_id',
   });
   next();
});

reviewSchema.statics.calcAverageRating = async function (tourId) {
   const stats = await this.aggregate([
      {
         $match: { tour: tourId },
      },
      {
         $group: {
            _id: '$tour',
            nRating: { $sum: 1 },
            avgRating: { $avg: '$rating' },
         },
      },
   ]);
   console.log(stats);
   await TourModel.findByIdAndUpdate(tourId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating,
   });
};
reviewSchema.post('save', function () {
   this.constructor.calcAverageRating(this.tour);
});

reviewSchema.pre('/^findOneAnd', async function (next) {
   this.r = await this.findOne();
   console.log(this.r);
   next();
});

reviewSchema.post('/^findOneAnd', async function (next) {
   await this.r.constructor.calcAverageRating(this.r.tour);
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;
