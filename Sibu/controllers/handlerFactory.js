const apiError = require('../middleware/apiError.middleware');
const catchAsync = require('../middleware/catchAsync');

//
exports.deleteOne = (Model) =>
   catchAsync(async (req, res, next) => {
      const docs = await Model.findByIdAndDelete(req.params.id);
      if (!docs) {
         return next(new apiError('No documents found with that ID', 404));
      }
      res.status(204).json({
         status: 'success',
         data: null,
      });
   });

exports.updateOne = (Model) =>
   catchAsync(async (req, res, next) => {
      console.log('the update request is for id: ' + req.params.id);
      const docs = await Model.findByIdAndUpdate(req.params.id, req.body, {
         new: true,
         runValidators: true,
      });
      if (!docs) {
         return next(
            new apiError(
               'No documents found with that ID: ' + req.params.id,
               404
            )
         );
      }
      res.status(200).json({
         status: 'success',
         data: docs,
      });
   });
