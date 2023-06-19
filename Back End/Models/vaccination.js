const mongoose = require('mongoose');



const vaccinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  max: {
    type: Number,
    required: true,
  },
  min: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: Boolean,
    default: false
  },
  delete_time:
  {
    type: Number,
  }

});

const Vaccination = mongoose.model('Vaccination', vaccinationSchema);

module.exports = Vaccination;
