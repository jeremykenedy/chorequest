'use strict';

var self = this,
    mongoose = require('mongoose'),
    s = require('./db_schemas'),
    c = require('nconf'),
    _ = require('lodash');

var seeded = false;

c.env().file({ file: 'config.json'});

var uristring = c.get('MONGOLAB_URI');

mongoose.connect(uristring, function (err, res) {
    if (err) {
        console.log ('ERROR connecting to: ' + uristring + '. ' + err);
    } else {
        console.log ('Successfully connected to: ' + uristring);
    }
});

self.models = {
    Accounts: mongoose.model('Accounts', s.accountSchema),
    Roles: mongoose.model('Roles', s.roleSchema)
};

self.getCollection = function (entity, callback) {
    seedDB();

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
    seedDB();

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

function seedDB () {
    if (!seeded) {
        var seedRole = new self.models.Roles({
            role_id: 1,
            name: 'admin',
            permissions: -1
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
            ]
        });
        seedRole.save(function (err) {
            if(!err) {
                seeded = true;
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
    }
}
