const fs = require('fs');
const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
);
class TourController {
   getAllTours = (req, res) => {
      console.log(
         'currently there are ' + tours[tours.length - 1].id + ' tour list'
      );
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
      if (tour) {
         res.status(200).json({
            status: 'success',
            result: tour.length,
            requestedAt: req.requestTime,
            data: {
               tour,
            },
         });
      } else {
         res.status(400).json({
            status: 'failure',
            message: 'No tour found with that id',
         });
      }
   };

   createTour = (req, res) => {
      console.log(req.body);
      const newID = tours[tours.length - 1].id + 1;
      const newTour = Object.assign({ ID: newID }, req.body);
      tours.push(newTour);

      fs.writeFile(
         `${__dirname}/dev-data/data/tours-simple.json`,
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
      if (req.params.id * 1 > tours.length) {
         return res.status(404).json({
            status: 'failed',
            message: 'Invalid id provided',
         });
      }
      res.status(200).json({
         status: 'success',
         data: {
            tour: '<updated tour here>',
         },
      });
   };

   deleteTourById = (req, res) => {
      if (req.params.id * 1 > tours.length) {
         return res.status(404).json({
            status: 'failed',
            message: 'Invalid id provided',
         });
      }
      res.status(204).json({
         status: 'success',
         data: null,
      });
   };
}

module.exports = TourController;
