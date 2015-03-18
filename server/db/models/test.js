'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String},
  instructions: {type: String},
  deadline: {type: Date},
  owner: {type: Schema.Types.ObjectId, ref: 'User' },
  privateFiles: [{type: Schema.Types.ObjectId, ref: 'File' }],
  publicFiles: [{type: Schema.Types.ObjectId, ref: 'File' }]
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});