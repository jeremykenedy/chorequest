'use strict';

var self = this,
    _ = require('lodash'),
    email = require('../../modules/email');

self.send = function (req, res) {
    var to = req.query.to;
    var message = {
        text: 'This is a generic message',
        subject: 'Test Email',
        to: [{
            email: to
        }],
        tags: ['test']
    };
    email.send(message, function (err, data) {
        if(err || !data) {
            res.status(404);
        }
        if (err) {
            return res.json(err);
        }
        var results = {
            results: data
        };
        return res.json(results);
    });
};
