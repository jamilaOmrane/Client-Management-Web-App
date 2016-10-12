'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var TaskSchema = new Schema({
  name: String,
  description: String,
  info: String,
  status: String,
  startDatePrevision: Date,
  endDatePrevision: Date,
  project: {type: mongoose.Schema.Types.ObjectId, ref: 'Project'}
});

module.exports = mongoose.model('Task', TaskSchema);