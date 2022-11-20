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

const port = 5000;
app.listen(port, 'localhost', () => {
   console.log('listening on port ' + port);
   console.log(`app listening on port ${port}`);
});
