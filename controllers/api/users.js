'use strict';

var self = this,
    _ = require('lodash'),
    db = require('../../modules/db');

self.getUser = function (req, res) {
    var username = req.params.username;
    db.getItem('Accounts', { "users.username": username }, function (err, data) {
        if (err || !data.users.length) {
            var msg = {
                status: 'fail',
                message: 'Error Retrieving User',
                error: err
            };
            res.send(JSON.stringify(msg));
        } else {
            var user = _.findWhere(data.users, { username: username });
            res.send(user);
        }
    });
};
