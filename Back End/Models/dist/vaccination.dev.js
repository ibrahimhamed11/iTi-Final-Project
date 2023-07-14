"use strict";

var mongoose = require('mongoose');

var vaccinationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  max: {
    type: Number,
    required: true
  },
  min: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    "default": Date.now
  },
  status: {
    type: Boolean,
    "default": false
  },
  delete_time: {
    type: Number
  }
});
var Vaccination = mongoose.model('Vaccination', vaccinationSchema);
module.exports = Vaccination;