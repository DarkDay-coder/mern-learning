const mongoose = require('mongoose');
const crypto = require('crypto');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema(
   {
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
      role: {
         type: String,
         enum: ['user', 'guide', 'lead-guide', 'admin'],
         default: 'user',
      },
      password: {
         type: String,
         required: [true, 'Please provide password'],
         select: false,
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
         select: false,
      },
      passwordResetToken: String,
      passwordResetExpires: Date,
      active: {
         type: Boolean,
         default: true,
         // select: false,
      },
   },
   {
      timestamps: true,
   }
);

userSchema.pre('save', async function (next) {
   // Only run if statement if the password is modified
   if (!this.isModified('password')) return next();

   // hash the password using bcryptjs
   this.password = await bcrypt.hash(this.password, 12);

   // after password validation clear the confirmpassword field
   this.confirmPassword = undefined;
   next();
});

// userSchema.pre('/^find/', function (next) {
//    this.find({ active: { $ne: false } });
//    next();
// });

userSchema.methods.createPasswordResetToken = function () {
   const resetToken = crypto.randomBytes(32).toString('hex');

   this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');

   console.log({ resetToken }, this.passwordResetToken);

   this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

   return resetToken;
};

const User = mongoose.model('user', userSchema);

module.exports = User;
