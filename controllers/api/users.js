'use strict';

var self = this,
    _ = require('lodash'),
    db = require('../../modules/db');

self.getUser = function (req, res) {
    var username = req.params.username,
        userExp = new RegExp('^' + username + '$', 'i');
    db.getItem('Accounts', { "users.username": userExp }, function (err, data) {
        if (err) {
            var msg = {
                status: 'fail',
                message: 'Error Retrieving User',
                error: err
            };
            return res.json(msg);
        }
        var user = null;
        if (data) {
            user = _.findWhere(data.users, function (user) {
                return user.username.toLowerCase() === username.toLowerCase();
            });
        }
        var users = {
            users: [user]
        };
        return res.json(users);
    });
};

self.getUsers = function (req, res) {
    db.getDistinct('Accounts', 'users', function (err, data) {
        if (err) {
            return res.json(err);
        }
        var users = {
            users: data
        };
        return res.json(users);
    });
};
