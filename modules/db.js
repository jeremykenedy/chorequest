'use strict';

var self = this,
    mongoose = require('mongoose'),
    s = require('./db_schemas'),
    c = require('nconf'),
    _ = require('lodash');

c.env().file({ file: 'config.json'});

var uristring = c.get('MONGOLAB_URI'),
    schema_version = 1;

// Models
self.models = {
    Accounts: mongoose.model('Accounts', s.accountSchema),
    Roles: mongoose.model('Roles', s.roleSchema)
};

// Connect
mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        seedDB();
        console.log ('Successfully connected to: ' + uristring);
    }
});

// Get
self.getCollection = function (entity, callback) {
    var model = self.models[entity];
    model.find(function (err, response) {
        if(err) {
            callback(err);
        } else {
            callback(null, response);
        }
    });
};

self.getDistinct = function (entity, key, callback) {
    var model = self.models[entity];
    model.find().distinct(key, function (err, response) {
        if(err) {
            callback(err);
        } else {
            callback(null, response);
        }
    });
};

self.getItem = function (entity, search, callback) {
    var model = self.models[entity];
    model.findOne(search, function(err, response) {
        if(err) {
            callback(err);
        } else {
            callback(null, response);
        }
    });
};

var seeded = false;
function seedDB () {
    if(!seeded) {
        seeded = true;
        self.getItem('Roles', { "role_id": 1 }, function (err, response) {
            if(err) {
                var seedRole = new self.models.Roles({
                    role_id: 1,
                    name: 'admin',
                    permissions: -1,
                    schema_version: schema_version
                });

                var seedAccount = new self.models.Accounts({
                    account_id: 1,
                    createDate: new Date(),
                    active: true,
                    users: [
                        {
                            user_id: 1,
                            username: 'admin',
                            password: 'password',
                            role_id: 1
                        }
                    ],
                    schema_version: schema_version
                });
                seedRole.save(function (err) {
                    if(!err) {
                        seedAccount.save(function (err) {
                            if(!err) {
                                console.log('user created');
                            } else {
                                console.log('error creating account');
                            }
                        });
                    } else {
                        console.log('error creating role');
                    }
                });
            } else {
                console.log('seed data exists')
            }
        });
    }
}
