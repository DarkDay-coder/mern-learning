const fs = require('fs');
const express = require('express');
const app = express();
// const tours = require('./dev-data/data/tours-simple.json');

app.use(express.json());
// app.get('/', (req, res) => {
//    res.status(200).json({
//       message: 'Hello from the server side!',
//       app: 'Sibu',
//    });
// });
// app.post('/', (req, res) => {
//    res.send('you can now post something')
// })

const tours = JSON.parse(
   fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
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
});

app.get('/api/v1/tours/:id', (req, res) => {
   console.log(req.params);
   const id = req.params.id * 1;
   // if(id > tours.length){
   //    return res.status(404).json({
   //       status: 'failed',
   //       message: 'Invalid id provided'
   //    });
   // };
   const tour = tours.find((el) => el.id === id);
   if (tour) {
      res.status(200).json({
         status: 'success',
         result: tour.length,
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.patch('/api/v1/tours/:id', (req, res) => {
   if(req.params.id *1 > tours.length){
      return res.status(404).json({
         status: 'failed',
         message: 'Invalid id provided',
   });
};
   res.status(200).json({
      status: 'success',
      data:{
         tour: '<updated tour here>',
      }
   })
})

const port = 5000;
app.listen(port, 'localhost', () => {
   console.log('listening on port ' + port);
   console.log(`app listening on port ${port}`);
});
