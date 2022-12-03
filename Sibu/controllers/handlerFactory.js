const apiError = require('../middleware/apiError.middleware');
const APIFeatures = require('../middleware/apiFeatures.middleware');
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

exports.createOne = (Model) =>
   catchAsync(async (req, res, next) => {
      const docs = await Model.create(req.body);
      res.status(201).json({
         status: 'success',
         data: docs,
      });
   });

exports.getOne = (Model, popOptions) => {
   return catchAsync(async (req, res, next) => {
      let query = Model.findById(req.params.id);
      if (popOptions) {
         query = query.populate(popOptions);
      }
      const docs = await query;
      if (!docs) {
         return next(
            new apiError('No documents found with ID: ' + req.params.id, 404)
         );
      }
      res.status(200).json({
         status: 'succeed!',
         data: docs,
      });
   });
};

exports.getAll = (Model) => {
   return catchAsync(async (req, res, next) => {
      const features = new APIFeatures(Model.find(), req.query)
         .filter()
         .sort()
         .limitFields()
         .pagination();
      const docs = await features.query;
      res.status(200).json({
         status: 'success',
         length: docs.length,
         data: docs,
      });
   });
};
