const mongoose = require('mongoose');



const vaccinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  maxAge: {
    type: Number,
    required: true,
  },
  minAge: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

const Vaccination = mongoose.model('Vaccination', vaccinationSchema);

module.exports = Vaccination;
