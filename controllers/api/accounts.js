'use strict';

var self = this,
    _ = require('lodash'),
    db = require('../../modules/db');

self.getAccounts = function (req, res) {
    db.getCollection('Accounts', function (err, data) {
        if (err) {
            var msg = {
                status: 'fail',
                message: 'Error Retrieving Accounts',
                error: err
            };
            res.send(JSON.stringify(msg));
        } else {
            // Sort the data by account_id.
            data = _.sortBy(data, 'account_id');
            res.send(data);
        }
    });
};

self.getAccountByID = function (req, res) {
    var id = req.params.id;
    db.getItem('Accounts', { "account_id": id }, function (err, data) {
        if (err) {
            var msg = {
                status: 'fail',
                message: 'Error Retrieving Account',
                error: err
            };
            res.send(JSON.stringify(msg));
        } else {
            res.send(data);
        }
    });
};

self.getAccountByUsername = function (req, res) {
    var username = req.params.username;
    db.getItem('Accounts', { "users.username": username }, function (err, data) {
        if (err) {
            var msg = {
                status: 'fail',
                message: 'Error Retrieving Account',
                error: err
            };
            res.send(JSON.stringify(msg));
        } else {
            res.send(data);
        }
    });
};

self.getAccountUsers = function (req, res) {
    var id = req.params.id;
    db.getItem('Accounts', { "account_id": id }, function (err, data) {
        if (err || !data.users.length) {
            var msg = {
                status: 'fail',
                message: 'Error Retrieving Account',
                error: err
            };
            res.send(JSON.stringify(msg));
        } else {
            res.send(data.users);
        }
    });
};
