'use strict';

var self = this,
    _ = require('lodash'),
    db = require('../../modules/db'),
    jwt = require('jwt-simple'),
    moment = require('moment'),
    c = require('nconf');

c.env().file({ file: 'config.json'});

var TOKEN_SECRET = c.get('TOKEN_SECRET');

self.getCurrentUser = function (req, res) {
    db.getItem('Accounts', { "users.username": req.user }, function(err, data) {
        var user = getSingleUser(data, req.user);
        var users = {
            users: [user]
        };
        return res.json(users);
    });
};

self.getUser = function (req, res) {
    var username = req.params.username;
    db.getItem('Accounts', { "users.username": getUserExp(username) }, function (err, data) {
        if (err) {
            var msg = {
                status: 'fail',
                message: 'Error Retrieving User',
                error: err
            };
            return res.json(msg);
        }
        var user = data ? getSingleUser(data, username) : null;
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

self.authenticateUser = function (req, res) {
    var username = req.body.username,
        password = req.body.password;
    db.getItem('Accounts', { "users.username": getUserExp(username) }, function (err, data) {
        if (err || !data) {
            var msg = {
                status: 'fail',
                message: 'Error Retrieving User',
                error: err,
                req: req.params
            };
            return res.json(msg);
        }
        var user = getSingleUser(data, username);
        user.comparePassword(password, function(err, isMatch) {
            if (!isMatch) {
                return res.status(401).send({ message: 'Wrong username and/or password' });
            }
            res.send({ token: createToken(user) });
        });
    });
};

function getUserExp (username) {
    return new RegExp('^' + username + '$', 'i');
}

function getSingleUser (data, username) {
    return _.findWhere(data.users, function (user) {
        return user.username.toLowerCase() === username.toLowerCase();
    });
}

function createToken (user) {
    var payload = {
        sub: user.username,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, TOKEN_SECRET);
}