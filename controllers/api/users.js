'use strict';

var self = this,
    _ = require('lodash'),
    db = require('../../modules/db');

self.getUsers = function (req, res) {
    db.getCollection('Accounts', function (err, data) {
        if (err) {
            var msg = {
                status: 'fail',
                message: 'Error Retrieving Users',
                error: err
            };
            res.send(JSON.stringify(msg));
        } else {
            // Sort the data by Username.
            data = _.sortBy(data, 'Username');
            res.send(data);
        }
    });
};

self.getUserByUsername = function (req, res) {
    var username = req.params.username;
    db.getItem('Accounts', { "users.username": username }, function (err, data) {
        if (err) {
            var msg = {
                status: 'fail',
                message: 'Error Retrieving User',
                error: err
            };
            res.send(JSON.stringify(msg));
        } else {
            res.send(data);
        }
    });
};
