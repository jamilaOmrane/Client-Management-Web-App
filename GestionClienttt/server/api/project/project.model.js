'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var ProjectSchema = new Schema({
  title: String,
  description: String,
  date: {type : Date ,default:Date.now},
  status:{type: String, default:'notYet'} ,
  deadline :Date,
  client: {type: mongoose.Schema.Types.ObjectId, ref: 'Client'}	
});

module.exports = mongoose.model('Project', ProjectSchema);