const app = require('./app');

const port = 5000;
app.listen(port, 'localhost', () => {
   console.log('Server is running using port number: ' + port);
   console.log(`app listening on endpoint ${port}`);
});