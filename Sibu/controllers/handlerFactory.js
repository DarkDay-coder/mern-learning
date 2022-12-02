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
