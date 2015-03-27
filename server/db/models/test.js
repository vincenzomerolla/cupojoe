'use strict';
var mongoose = require('mongoose');
var File = mongoose.model('File');
var Schema = mongoose.Schema;
var Promise = require('bluebird');

var github = require('../../app/routes/github/githubObj');

var schema = new Schema({
  name: {type: String},
  instructions: {type: String},
  status: {type: String, enum: ['Pending', 'Available', 'Closed'] },
  deadline: {type: Date},
  shellCommands: {type: String},
  testCommands: {type: String},
  owner: {type: Schema.Types.ObjectId, ref: 'User' },
  privateFiles: [File.schema],
  publicFiles: [File.schema],
  repo: {type: String},
  dockerId: {type: String},
  testType: {type: String, enum: ['jasmine', 'mocha', 'testem']},
  groups: [{ type: Schema.Types.ObjectId, ref: 'Group' }],
  results: [{ type: Schema.Types.ObjectId, ref: 'Result' }],
  createdAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});

var splitRepoURL = function(repo) {
  return repo.split('/');
};

var getRepoName = function(repo) {
  var repoName = splitRepoURL(repo)[4];
  return repoName.substr(0, repoName.length - 4);
};

var getRepoUser = function(repo) {
  return splitRepoURL(repo)[3];
};

schema.methods.populateFiles = function() {
  var repo = getRepoName(this.repo);
  var username = getRepoUser(this.repo);
  var count = 0;
  var self = this;

  var rec_populateTree = function(sha, path) {
    count++;
    var promises = [];
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
        Promise.all(promises).then(resolve);
      });
    });
  };

  var rec_populateBlobs = function(sha, path, fileName) {
    count++;
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
        resolve();
      });
    });
  };

  return new Promise(function(resolve, reject) {
    rec_populateTree('master', '/').then(function() {
      console.log(count, 'calls made to Github');
      self.save(function(err, test) {
        if (err) return reject(err);
        resolve(test);
      });
    }).catch(function(err) {
      reject(err);
    });
  });
};


mongoose.model('Test', schema);