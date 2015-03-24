'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var File = mongoose.model('File');

var schema = new Schema({
  score: { type: Number },
  output: { type: String },
  publicFiles: [File.schema],
  status: { type: String, enum: ['Available', 'Submitted', 'Overdue'] },
  test: { type: Schema.Types.ObjectId, ref: 'Test' },
  user: { type: Schema.Types.ObjectId, ref: 'User' }  
});

mongoose.model('Result', schema);