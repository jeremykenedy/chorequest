'use strict';

// Dependencies
var express = require('express'),
    fs = require('fs');

// Controllers
var api = require('./controllers/api');

// Application
var app = module.exports.app = exports.app = express(),
    port = 3000;

// Middleware
app.set('views', __dirname + '/templates');
app.set('view engine', 'jade');

// Routes
app.get('/', api.info.getAppDetails);

// Start server
app.listen(process.env.PORT || port);
console.log('Express server listening on port ' + port);
