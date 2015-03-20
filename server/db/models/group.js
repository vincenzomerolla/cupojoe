'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String},
  creator: {type: Schema.Types.ObjectId, ref: 'User' },
  members: [{type: String }],
  createdAt: {type: Date, default: Date.now}   
});

mongoose.model('Group', schema);