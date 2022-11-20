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
   res.status(200).json({
      status: 'success',
      results: tours.length,
      data: {
         tours,
      },
   });
});


const port = 5000;
app.listen(port, 'localhost', () => {
   console.log('listening on port ' + port);
   console.log(`app listening on port ${port}`);
});
