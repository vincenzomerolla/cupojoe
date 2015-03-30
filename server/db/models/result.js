'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var File = mongoose.model('File');

var schema = new Schema({
  score: { type: Number },
  output: { type: String },
  publicFiles: [File.schema],
  dockerId: {type: String},
  testName: {type: String},
  testCommands: {type: String},
  testType: {type: String, enum: ['jasmine', 'mocha', 'testem']},
  status: { type: String, enum: ['Started', 'Submitted', 'Overdue', 'Outdated'] },
  test: { type: Schema.Types.ObjectId, ref: 'Test' },
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  submittedAt: { type: Date, default: Date.now } 
});

schema.statics.populateUser = function(results) {
  return this.populate(results, {path: 'user', select: 'username'});
};

var captureScore = function(regexp, output, ind) {
  var match = output.match(regexp);
  return match ? match[ind] : 0;
};

var getStrTimes = function(str, searchStr, startInd) {
  if (typeof str !== 'string') return 0;
  if (!startInd) startInd = 0;
  var ind = str.indexOf(searchStr, startInd);
  if (ind === -1) return 0;
  else return 1 + getStrTimes(str, searchStr, ind + 1);
};

var getScore = function(output, testType) {
  var pass, fail;
  if (testType === 'mocha') {
    pass = captureScore(/\[32m\s+(\d+)\s+passing/, output, 1) * 1;
    fail = captureScore(/\[31m\s+(\d+)\s+failing/, output, 1) * 1;
  } else if (testType === 'jasmine') {
    var str;
    if (output.match(/Test failed/)) {
      str = captureScore(/Started[\s\S]*Failures/, output, 0);
    } else str = captureScore(/Started[\s\S]*Finished/, output, 0);
    pass = getStrTimes(str, '[32m.');
    fail = getStrTimes(str, '[31mF');
  }
  return pass / (pass + fail) || 0;
};

schema.pre('save', function(next) {
  if (!this.output) return next();
  this.score = getScore(this.output, this.testType);
  next();
});

mongoose.model('Result', schema);