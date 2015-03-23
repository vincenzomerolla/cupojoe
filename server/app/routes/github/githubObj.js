var GithubApi = require('github');
var config = require('../../../env/').GITHUB;
var github = new GithubApi({  
  version: '3.0.0',  
});

github.authenticate({
  type: 'oauth',
  key: config.clientID,
  secret: config.clientSecret
});

module.exports = github;