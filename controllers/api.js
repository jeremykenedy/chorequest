'use strict';

var info = require('./api/info.js'),
    accounts = require('./api/accounts.js'),
    users = require('./api/users.js'),
    mail = require('./api/mail.js');

module.exports.info = info;
module.exports.accounts = accounts;
module.exports.users = users;
module.exports.mail = mail;
