'use strict';

// Dependencies
var express = require('express'),
    fs = require('fs');

// Controllers
var api = require('./controllers/api'),
    home = require('./controllers/home');

// Application
var app = module.exports.app = exports.app = express(),
    port = 3000;

// Middleware
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');

// Routes
app.get('/', home.index);
app.get('/accounts', api.accounts.getAccounts);
app.get('/accounts/:id', api.accounts.getAccountByID);
app.get('/accounts/:id/users', api.accounts.getAccountUsers);
app.get('/accounts/user/:username', api.accounts.getAccountByUsername);
app.get('/users/:username', api.users.getUser);

// Start server
app.listen(process.env.PORT || port);
console.log('Express server listening on port ' + port);
