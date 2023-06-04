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
  registrationDate: {
    type: Date,
    default: Date.now // Set the default value to the current date and time
  },
  password: {
    type: String,
    //required: true,
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

  // image: {
  //   type: String,
  //   //  required: true
  // },

  numOfBaby: {
    type: Number,
    // required: true,
    validate: {
      validator: function(numOfBaby) {
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

  pregnancyMonth: {
    type: Number
  },
  babyWeight: {
    type: Number
  },
  
  // profile: {
  //   babyInfo: [
  //     {
  //       weight: Number,
  //       height: Number,f
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


 const user= mongoose.model('users', userSchema);

 module.exports = user

//  {
//   "name": "John Doe",
//   "email": "johndddogge@example.com",
//   "password": "password123",
//   "username": "johnggdoe123",
//   "age": 30,
//   "numOfBaby": 1,
//   "isPregnant": false,
//   "pregnancyMonth": null,
//   "babyWeight": null,
//   "profile": {
//     "babyInfo": [
//       {
//         "weight": 3.2,
//         "height": 50,
//         "headSize": 35,
//         "age": 1,
//         "temperature": 37.5,
//         "vaccination": "DTaP",
//         "extraInfo": [
//           {
//             "foodTracker": "Monday",
//             "kindOfFood": "Vegetables"
//           },
//           {
//             "foodTracker": "Tuesday",
//             "kindOfFood": "Fruits"
//           }
//         ],
//         "reportFile": "baby_report.pdf"
//       }
//     ]
//   }
// }




