const mongoose = require('mongoose');
const validator = require('validator');
const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: [true, 'Name is required'], // data validator
      // unique: true,
      trim: true,
   },
   email: {
      type: String,
      required: [true, 'you must provide your email address'], // data validator
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'please enter a valid email address'],
   },
   photo: {
      type: String,
   },
   password: {
      type: String,
      required: [true, 'Please provide password'],
   },
   confirmPassword: {
      type: String,
      required: [true, 'Please confirm your password'],
      minLength: 8,
      validate: {
         validator: function (el) {
            return el === this.password;
         },
         message: 'Password you entered are not same',
      },
   },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
