'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var File = mongoose.model('File');

var schema = new Schema({
  score: { type: Number },
  output: { type: String },
  publicFiles: [File.schema],
  dockerId: {type: String},
  testCommands: {type: String},
  testType: {type: String, enum: ['jasmine', 'mocha', 'testem']},
  status: { type: String, enum: ['Started', 'Submitted', 'Overdue'] },
  test: { type: Schema.Types.ObjectId, ref: 'Test' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }  
});

schema.statics.populateUser = function(results) {
  return this.populate(results, {path: 'user', select: 'username'});
};

mongoose.model('Result', schema);