'use strict';	

// Dependencies
var express = require('express'),
    fs = require('fs'),
    path = require('path'),
    c = require('nconf');

c.env().file({ file: 'config.json'});

if (c.get('ENV') === 'production') {
	require('newrelic');
}

// Controllers
var api = require('./controllers/api');

// Application
var app = module.exports.app = exports.app = express(),
    port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.get('/accounts', api.accounts.getAccounts);
app.get('/accounts/:id', api.accounts.getAccountByID);
app.get('/accounts/:id/users', api.accounts.getAccountUsers);
app.get('/accounts/user/:username', api.accounts.getAccountByUsername);
app.get('/users', api.users.getUsers);
app.get('/users/:username', api.users.getUser);

// Static Routes
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/images", express.static(__dirname + '/public/images'));
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/fonts", express.static(__dirname + '/public/fonts'));

// Angular Routes
app.use('/*', function(req, res){
  res.sendfile(__dirname + '/public/index.html');
});

// Start server
app.listen(port);
console.log('Express server listening on port ' + port);
