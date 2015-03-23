'use strict';
var mongoose = require('mongoose');
var File = mongoose.model('File');
var Schema = mongoose.Schema;
var Promise = require('bluebird');

var github = require('../../app/routes/github/githubObj');

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

schema.methods.populateFiles = function() {
  var repoArr = this.repo.split('/');
  var repo = repoArr[4].substr(0, repoArr[4].length - 4);
  var username = repoArr[3];
  var count = 0;
  var self = this;
  var promises = [];

  var rec_populateTree = function(sha, path) {
    count++;
    console.log('a')
    return new Promise(function(resolve, reject) {
      github.gitdata.getTree({
        user: username,
        repo: repo,
        sha: sha
      }, function(err, res) {
        if (err) return reject(err);
        res.tree.forEach(function(obj) {
          if (obj.type === 'blob') {
            promises.push(rec_populateBlobs(obj.sha, path, obj.path));
          } else if (obj.type === 'tree') {
            promises.push(rec_populateTree(obj.sha, path + obj.path + '/'));
          }
        });
        resolve('done'); //ASK ABOUT THIS TOMORROW
      });
    });
  };

  var rec_populateBlobs = function(sha, path, fileName) {
    count++;
    console.log('b')
    return new Promise(function(resolve, reject) {
      github.gitdata.getBlob({
        user: username,
        repo: repo,
        sha: sha
      }, function(err, res) {
        if (err) return reject(err);
        var file = new File({
          name: fileName,
          path: path,
          body: new Buffer(res.content, res.encoding).toString(),
        });
        self.privateFiles.push(file);
        resolve('done');
      });
    });
  };

  promises.push(rec_populateTree('master', '/'));
  console.log('bo')

  Promise.all(promises).then(function() {
    console.log(count, 'calls made to Github');
    console.log(self.privateFiles.length)
  }).catch(function(err) {
    console.log('errror:', err);
  });
};


mongoose.model('Test', schema);