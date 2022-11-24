const mongoose = require('mongoose');
const slugify = require('slugify');
const tourSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'A tour must have a name'],
         unique: true,
         trim: true,
      },
      slug: String,
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
      secretTour: {
         type: Boolean,
         default: false,
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
         select: false,
      },
      updatedAt: {
         type: Date,
         default: Date.now(),
         select: false,
      },
   },
   {
      toJSON: { virtuals: true },
      toObject: { virtuals: true },
   }
);

tourSchema.virtual('durationWeeks').get(function () {
   return this.duration / 7;
});

// DOCUMENT MIDDLEWARE   runs before the .save() and .create()
tourSchema.pre('save', function (next) {
   // console.log(this);
   this.slug = slugify(this.name, { lower: true });
   next();
});

tourSchema.post('save', function (doc, next) {
   console.log(doc);
   next();
});

// QUERY MIDDLEWARE
tourSchema.pre('find', function (next) {
   this.find({ secretTour: { $ne: true } });
   next();
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
