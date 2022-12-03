const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');
//testing from ndb debugging
// UNHANDLED REJECTION
process.on('unhandledRejection', (err) => {
   console.log(err.name, err.message);
});
console.log(app.get('env'));
// const DB = 'mongodb://localhost:27017/Tour-project'
const DB =
   'mongodb+srv://sibu:rdsibu@cluster0.muj4e4t.mongodb.net/Tour-project';
mongoose.connect(DB, (err) => {
   if (err) {
      console.log(err.name, err.message); // display the cause of error for database conenction
      console.error('Error during mongoDB connection');
      console.log('UNHANDLED REJECTION!! 🤦‍♂️🤦‍♂️ ');
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

// UNCAUGHT EXCEPTION HANDLING
process.on('uncaughtException', (err) => {
   console.log('uncaught exception occur 🤦‍♂️🤦‍♂️');
   console.log(err.name, err.message);
   process.exit(1);
});

// console.log(x);
