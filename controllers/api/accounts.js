'use strict';

var self = this,
    _ = require('lodash'),
    db = require('../../modules/db');

self.getAccounts = function (req, res) {
    db.getCollection('Accounts', function (err, data) {
        if(err || !data) {
            res.status(404);
        }
        if (err) {
            return res.json(err);
        }
        // Sort the data by account_id.
        data = _.sortBy(data, 'account_id');
        var accounts = {
            accounts: data
        };
        return res.json(accounts);
    });
};

self.getAccountByID = function (req, res) {
    var id = req.params.id;
    db.getItem('Accounts', { "account_id": id }, function (err, data) {
        if(err || !data) {
            res.status(404);
        }
        if (err) {
            return res.json(err);
        } else {
            var accounts = {
                accounts: [data]
            };
            res.json(accounts);
        }
    });
};

self.getAccountByUsername = function (req, res) {
    var username = req.params.username,
        userExp = new RegExp('^' + username + '$', 'i');
    db.getItem('Accounts', { "users.username": userExp }, function (err, data) {
        if(err || !data) {
            res.status(404);
        }
        if (err) {
            return res.json(err);
        } else {
            var accounts = {
                accounts: [data]
            };
            res.json(accounts);
        }
    });
};

self.getAccountUsers = function (req, res) {
    var id = req.params.id;
    db.getItem('Accounts', { "account_id": id }, function (err, data) {
        if(err || !data || (data && !data.users)) {
            res.status(404);
        }
        if (err) {
            return res.json(err);
        } else {
            var users = data && data.users ? data.users : [null];
            var users = {
                users: users
            };
            res.json(users);
        }
    });
};
