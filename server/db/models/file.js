'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
  name: {type: String, required: true},
  path: {type: String, required: true},
  body: {type: String},
  isReadOnly: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});


schema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// schema.virtual('isFile').get(function() {
//   return !this.children.length;
// });


schema.set('toJSON', { virtuals: true });


mongoose.model('File', schema);
