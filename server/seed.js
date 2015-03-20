var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cupojoe');

require('./db/models/file.js');
require('./db/models/test.js');
require('./db/models/group.js');
require('./db/models/user.js');

var User = mongoose.model('User');
var Test = mongoose.model('Test');
var Group = mongoose.model('Group');
var File = mongoose.model('File');

var U = function() {
  this.username = 'user';
  this.displayName = 'user';
}

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


  this.privateFiles = makeFileArr(10, true);
  this.publicFiles = makeFileArr(10, false);
}

var F = function(isReadOnly) {
  this.name = Math.floor(Math.random() * 100) + 'test.js';
  this.path = '/test/';
  this.body = '' + Math.random();
  this.isReadOnly = isReadOnly;
}

var makeFileArr = function(len, bool) {
  var arr = [];
  for (var i = 0; i < len; i++) {
    arr.push(new F(bool));
  }
  return arr;
}


mongoose.connection.on('open', function() {
  mongoose.connection.db.dropDatabase(function() {
    var user
    User.create(new U())
      .then(function(createdUser) {
        user = createdUser;
        return Group.create(new G(user));
      })
      .then(function() {
        return Test.create(new T(user));
      })
      .then(function() {
        console.log('Seed done');
        process.exit(0);
      });
  });
});