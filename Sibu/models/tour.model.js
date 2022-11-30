const mongoose = require('mongoose');
const slugify = require('slugify');
const userModel = require('./user.model');
const validator = require('validator');
const tourSchema = new mongoose.Schema(
   {
      name: {
         type: String,
         required: [true, 'A tour must have a name'], // data validator
         unique: true,
         trim: true,
         maxLength: [
            40,
            'A tour name must not have name longer than 40 character',
         ], //data validator
         minLength: [
            10,
            'A tour length must have name longer than 10 character',
         ], //data validator
         // validate: [
         //    validator.isAlpha,
         //    'Tour Name must only contains character',
         // ],
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
         required: [true, 'A tour must have a difficulty'], // built in validator
         // enum: {
         //    value: ['easy', 'medium', 'difficult'],
         //    message: 'Difficulty is either easy or medium or difficult',
         // }, // built in validator
      },
      secretTour: {
         type: Boolean,
         default: false,
      },
      ratingsAverage: {
         type: Number,
         default: 4.5,
         min: [1, 'Rating must be above 1.0'], // built in validator
         max: [5, 'Rating must be below 5.0'], // built in validator
      },
      ratingsQuantity: {
         type: Number,
         default: 0,
      },
      price: {
         type: Number,
         required: [true, 'A tour must have a price'],
      },
      priceDiscount: {
         type: Number,
         validate: {
            validator: function (val) {
               return val < this.price;
            },
            message: 'priceDiscount must be lower than the actual price',
         },
      },
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
      startLocation: {
         // GeoJSON
         type: {
            type: String,
            default: 'Point',
            enum: ['Point'],
         },
         coordinates: [Number],
         address: String,
         description: String,
      },
      locations: [
         {
            type: {
               type: String,
               default: 'Point',
               enum: ['Point'],
            },
            coordinates: [Number],
            address: String,
            description: String,
            day: Number,
         },
      ],
      // guides: Array,  // embedding
      guides: [{ type: mongoose.Schema.ObjectId, ref: 'user' }],
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
tourSchema.pre('save', async function (next) {
   const guidesPromise = this.guides.map(
      async (id) => await userModel.findById(id)
   );
   this.guides = await Promise.all(guidesPromise);
   next();
});

tourSchema.post('save', function (doc, next) {
   console.log(doc);
   next();
});

// QUERY MIDDLEWARE
// tourSchema.pre('find', function (next) {  //this works for find() method
tourSchema.pre(/^find/, function (next) {
   //this is for findOne() or findById() method
   this.find({ secretTour: { $ne: true } });
   this.start = Date.now();
   next();
});
tourSchema.post(/^find/, function (docs, next) {
   // console.log(docs);
   console.log(`Query took ${Date.now() - this.start} milliseconds`);
   next();
});

// AGGREGATION MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
   this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
   console.log(this);
   next();
});
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
