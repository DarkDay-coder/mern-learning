const express = require('express');
const app = express();

app.get('/', (req, res) => {
   res.status(200).json({
      message: 'Hello from the server side!',
      app: 'Sibu',
   });
});
app.post('/', (req, res) => {
   res.send('you can now post something')
})
const port = 5000;
app.listen(port, 'localhost', () => {
   console.log('listening on port ' + port);
   console.log(`app listening on port ${port}`);
});
