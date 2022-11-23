const mongoose = require('mongoose');
const fs = require('fs');
const TourModel = require('./../../models/tour.model');
// const DB = 'mongodb://localhost:27017/Tour-project'
const DB =
   'mongodb+srv://sibu:rdsibu@cluster0.muj4e4t.mongodb.net/Tour-project';
mongoose.connect(DB, (err) => {
   if (err) {
      console.error('Error during mongoDB connection');
   } else {
      // console.log(mongoose.connections);
      console.log('MongoDB connected successfully');
   }
});

// READ JSON FILE
const tours = JSON.parse(fs.readFileSync(`${__dirname}/tours-simple.json`));

// IMPORT DATA INTO DB
const importData = async () => {
   console.log('data insertion is in process');
   try {
      await TourModel.create(tours);
      console.log('data imported on database successfully 😎🤷‍♂️🤷‍♂️🙌🙌');
   } catch (error) {
      console.log('Error during data Importing 🤷‍♀️🤷‍♂️🤷‍♀️🤷‍♂️🤷‍♀️🤷‍♂️ ' + error);
   }
};

// DELETE ALL PREVIOUS DATA FROM OUR DATABASE
const deleteData = async () => {
   console.log('data deletion is in process');
   try {
      await TourModel.deleteMany();
      console.log('data deleted from database successfully 😎🤷‍♂️🤷‍♂️🙌🙌');
   } catch (error) {
      console.log('Error during data deletion 🤷‍♀️🤷‍♂️🤷‍♀️🤷‍♂️🤷‍♀️🤷‍♂️ ' + error);
   }
};

console.log(process.argv);

// node dev-data/data/import-dev-data.js --delete
// node dev-data/data/import-dev-data.js --import
if (process.argv[2] === '--import') {
   console.log("I'm on import call ");
   importData();
} else if (process.argv[2] === '--delete') {
   console.log("I'm on delete call");
   deleteData();
}
