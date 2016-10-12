'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ClientSchema = new Schema({
  firstName: String,
  lastName: String,
  email: String,
  phoneNumber: Number
});

module.exports = mongoose.model('Client', ClientSchema);