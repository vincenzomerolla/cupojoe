var mongoose = require('mongoose');


require('./db/')


var User = mongoose.model('User');
var Test = mongoose.model('Test');
var Group = mongoose.model('Group');


var G = function (user){ 
  this.name = 'Group 1';
  this.creator = user._id;
  this.members = [];
};

var T = function(user) {
  this.name = 'Test 1';
  this.instructions = 'Get this test done';
  this.status = 'Available';
  this.owner = user._id;
  this.deadline = Date.now();
}

var user;

User.find().exec()
  .then(function(users) {
    user = users[0];
    return Group.create(new G(user));
  })
  .then(function() {
    return Test.create(new T(user));
  })
  .then(function() {
    console.log('Seed done');
    process.exit(0);
  })