'use strict';
var mongoose = require('mongoose');
var File = mongoose.model('File');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String},
  instructions: {type: String},
  status: {type: String},
  deadline: {type: Date},
  shellCommands: {type: String},
  owner: {type: Schema.Types.ObjectId, ref: 'User' },
  privateFiles: [File.schema],
  publicFiles: [File.schema],
  repo: {type: String},
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

mongoose.model('Test', schema);