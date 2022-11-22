const fs = require('fs');
const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
class TourController {
   checkId = (req, res, next, val) => {
      console.log(`Tour id is ${val}`);
      if (req.params.id * 1 > tours.length) {
         return res.status(404).json({
            status: 'failed',
            message: 'Invalid ID',
         });
      }
      next();
   };
   checkBody = (req, res, next) => {
      if (!req.body.name || !req.body.price) {
         return res.status(400).json({
            status: 'failed',
            message: 'Missing Name or Price',
         });
      }
      next();
   };

   getAllTours = (req, res) => {
      console.log('currently there are ' + tours.length + ' tours available');
      res.status(200).json({
         status: 'success',
         results: tours.length,
         data: {
            tours,
         },
      });
   };

   getTourById = (req, res) => {
      console.log(req.params);
      console.log(req.requestTime);
      const id = req.params.id * 1;
      const tour = tours.find((el) => el.id === id);
      res.status(200).json({
         status: 'success',
         result: tour.length,
         requestedAt: req.requestTime,
         data: {
            tour,
         },
      });
   };

   createTour = (req, res) => {
      const newID = tours.length;
      const newTour = Object.assign({ ID: newID }, req.body);
      tours.push(newTour);

      fs.writeFile(
         `${__dirname}/../dev-data/data/tours-simple.json`,
         JSON.stringify(tours),
         (err) => {
            res.status(201).json({
               status: 'success',
               data: {
                  newTour,
               },
            });
         }
      );
   };

   updateTourById = (req, res) => {
      res.status(200).json({
         status: 'success',
         data: {
            tour: '<updated tour here>',
         },
      });
   };

   deleteTourById = (req, res) => {
      res.status(204).json({
         status: 'success',
         data: null,
      });
   };
}
module.exports = TourController;
