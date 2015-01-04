'use strict';

var self = this,
    mongoose = require('mongoose'),
    c = require('nconf'),
    _ = require('lodash');

c.env().file({ file: 'config.json'});

var uristring = c.get('MONGOLAB_URI');

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Succeeded connected to: ' + uristring);
    }
});

var accountSchema = new mongoose.Schema({
    accountid: { type: Number }
});

var userSchema = new mongoose.Schema({
    userid: { type: Number },
    username: { type: String },
    password: { type: String },
    accountid: { type: Number },
    roleid: { type: Number }
});

var roleSchema = new mongoose.Schema({
    roleid: { type: Number },
    name: { type: String },
    permissions: { type: Number }
});

self.models = {
    Accounts: mongoose.model('Accounts', accountSchema),
    Users: mongoose.model('Users', userSchema),
    Roles: mongoose.model('Roles', roleSchema)
};

var newUser = new self.models.Users({userid: 1, username: 'admin', password: 'password', accountid: 0, roleid: 1});
newUser.save(function (err) {
    if (err) {
        // Consider silencing this.
        console.error('Error saving user. / ' + err);
    }
});

self.getCollection = function (entity, callback) {
    var model = self.models[entity];
    model.find(function (err, response) {
        if(err) {
            callback(err);
        } else if (response !== null) {
            callback(null, response);
        } else {
            callback(new Error('Error retrieving data.'));
        }
    });
};

self.getItem = function (entity, search, callback) {
    var model = self.models[entity];
    model.findOne(search, function(err, response) {
        if(err) {
            callback(err);
        } else if (response !== null) {
            callback(null, response);
        } else {
            callback(new Error('Error retrieving data.'));
        }
    });
};
