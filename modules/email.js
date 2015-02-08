'use strict';

var self = this,
    mandrill = require('mandrill-api/mandrill'),
    c = require('nconf'),
    _ = require('lodash');

c.env().file({ file: 'config.json'});

var API_KEY = c.get('MANDRILL_API_KEY'),
    FROM_ADDRESS = c.get('FROM_EMAIL_ADDRESS');

var mail = new mandrill.Mandrill(API_KEY);

self.send = function (msg, callback) {
    var message = {
        'from_email': FROM_ADDRESS
    };
    _.extend(message, msg);

    // Send the message
    mail.messages.send({'message': message}, function (res) {
        callback(null, res);
    }, function (err) {
        callback('A mandrill error occurred: ' + err.name + ' - ' + err.message, null);
    });
};
