//
const TourModel = require('./../models/tour.model');
const catchAsync = require('./../middleware/catchAsync');

exports.getOverview = catchAsync(async (req, res, next) => {
   // 1) Get tour data from collection
   const tours = await TourModel.find();
   // 2) Build template

   // 3) render that template
   res.status(200).render('overview', {
      title: 'All Tours',
      tours,
   });
});
exports.getTour = (req, res) => {
   res.status(200).render('tour', {
      title: 'The Forest Hiker',
   });
};
