'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
  name: {type: String},
  creator: {type: Schema.Types.ObjectId, ref: 'User' },
  members: [{type: String }],
  createdAt: {type: Date, default: Date.now}   
});

schema.statics.findGroupsWithUser = function(username) {
  return this.find({members: {$in: [username]}}).exec().then(function(groups) {
    return groups.map(function(group) {
      return group._id;
    });
  });
}

mongoose.model('Group', schema);