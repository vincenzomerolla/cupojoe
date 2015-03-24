'use strict';
var crypto = require('crypto');
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: {
        type: String
    },
    password: {
        type: String
    },
    salt: {
        type: String
    },
    github: {
        id: String
    },
    displayName: {
        type: String
    },
    username: {
        type: String,
        unique: true
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group'
    }],
    testIds: [{ // These are tests the user created
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }],
    takenTests: [{  // these are tests the user took
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Result'
    }]
});

// generateSalt, encryptPassword and the pre 'save' and 'correctPassword' operations
// are all used for local authentication security.
var generateSalt = function () {
    return crypto.randomBytes(16).toString('base64');
};

var encryptPassword = function (plainText, salt) {
    var hash = crypto.createHash('sha1');
    hash.update(plainText);
    hash.update(salt);
    return hash.digest('hex');
};


var findByIdAndAddTest = function(id, test) {
  return this.findByIdAndUpdate(id, {$push: {testIds: test._id}});
};

schema.pre('save', function (next) {

    if (this.isModified('password')) {
        this.salt = this.constructor.generateSalt();
        this.password = this.constructor.encryptPassword(this.password, this.salt);
    }

    next();

});

schema.statics.generateSalt = generateSalt;
schema.statics.encryptPassword = encryptPassword;
schema.statics.findByIdAndAddTest = findByIdAndAddTest; 

schema.method('correctPassword', function (candidatePassword) {
    return encryptPassword(candidatePassword, this.salt) === this.password;
});



mongoose.model('User', schema);