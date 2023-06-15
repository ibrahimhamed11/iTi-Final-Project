const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true
  },
  email: {
    type: String,
    // required: true,
    // unique: true,
    validate: {
      validator: validator.isEmail,
      message: 'Invalid email address'
    }
  },
  image: {
    type: String

  },
  registrationDate: {
    type: Date,
    default: Date.now // Set the default value to the current date and time
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  username: {
    type: String,
    // required: true
  },
  age: {
    type: Number,
    // required: true
  },
  phone: {
    type: Number
  },
  address: {
    type: String
  },
  numOfBaby: {
    type: Number,
    // required: true,
    validate: {
      validator: function (numOfBaby) {
        return numOfBaby >= 0;
      },
      message: 'Number of babies cannot be negative'
    }
  },
  role: {
    type: String,
    // required: true,
    // enum: ['pregnant', 'mother', 'seller'],
    // default: function() {
    //   return this.numOfBaby === 0 ? 'pregnant' : 'mother';
    // }
  },
  // pregnancyMonth: {
  //   type: Number
  // },
  // babyWeight: {
  //   type: Number
  // },
  // profile: {
  //   babyInfo: [
  //     {
  //       weight: Number,
  //       height: Number,
  //       headSize: Number,
  //       age: Number,
  //       temperature: Number,
  //       vaccination: String,
  //       extraInfo: [
  //         {
  //           foodTracker: String,
  //           kindOfFood: String
  //         }
  //       ],
  //       reportFile: String
  //     }
  //   ]
  // }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
