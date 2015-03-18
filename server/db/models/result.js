'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  score: { type: Number },
  output: { type: String },
  test: { type: Schema.Types.ObjectId, ref: 'Test' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }  
});