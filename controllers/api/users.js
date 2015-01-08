'use strict';

var self = this,
    _ = require('lodash'),
    db = require('../../modules/db');

self.getUser = function (req, res) {
    var username = req.params.username,
        userExp = new RegExp('^' + username + '$', 'i');
    db.getItem('Accounts', { "users.username": userExp }, function (err, data) {
        if (err || !data.users.length) {
            var msg = {
                status: 'fail',
                message: 'Error Retrieving User',
                error: err
            };
            res.send(JSON.stringify(msg));
        } else {
            var user = _.findWhere(data.users, function (user) {
                return user.username.toLowerCase() === username.toLowerCase();
            });
            res.send(user);
        }
    });
};
