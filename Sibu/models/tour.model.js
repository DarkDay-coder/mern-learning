const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
   },
   description: {
      type: String,
      trim: true,
   },
   summary: {
      type: String,
      required: [true, 'A tour must have a summary'],
      trim: true, //removes all the whitespaces of beginning and ending
   },
   startDates: [Date],
   duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
   },
   maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a group size'],
   },
   difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
   },
   ratingsAverage: {
      type: Number,
      default: 4.5,
   },
   ratingsQuantity: {
      type: Number,
      default: 0,
   },
   price: {
      type: Number,
      required: [true, 'A tour must have a price'],
   },
   priceDiscount: Number,
   imageCover: {
      type: String,
      required: [true, 'A tour must have a cover image'],
   },
   images: [String],
   createdAt: {
      type: Date,
      default: Date.now(),
   },
   updatedAt: {
      type: Date,
      default: Date.now(),
   },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
