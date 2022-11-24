const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

console.log(app.get('env'));
// const DB = 'mongodb://localhost:27017/Tour-project'
const DB =
   'mongodb+srv://sibu:rdsibu@cluster0.muj4e4t.mongodb.net/Tour-project';
dotenv.config({ path: './config.env' });
mongoose.connect(DB, (err) => {
   if (err) {
      console.error('Error during mongoDB connection');
   } else {
      // console.log(mongoose.connections);
      console.log('MongoDB connected successfully');
   }
});

const port = process.env.PORT || 5000;
app.listen(port, 'localhost', () => {
   console.log(`Server is running using port number: ${port}`);
   console.log(`app listening on endpoint ${port}`);
});

//testing from ndb debugging   