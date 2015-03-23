'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var schema = new Schema({
  name: {type: String, required: true},
  path: {type: String, required: true},
  body: {type: String},
  isReadOnly: {type: Boolean, default: true},
  // createdAt: {type: Date, default: Date.now},
  // updatedAt: {type: Date, default: Date.now}
});


schema.pre('save', function (next) {
  var pathArr = this.fullPath.split('/');
  this.name = pathArr.pop();
  pathArr.push('');
  this.path = pathArr.join('/');
  next();
});

// schema.virtual('isFile').get(function() {
//   return !this.children.length;
// });

schema.virtual('fullPath').get(function() {
  return this.path + this.name;
});

schema.set('toJSON', { virtuals: true });


mongoose.model('File', schema);
