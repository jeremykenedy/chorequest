'use strict';	

// Dependencies
var express = require('express'),
    fs = require('fs'),
    bodyParser = require('body-parser'),
    multer = require('multer'),
    path = require('path'),
    moment = require('moment'),
    jwt = require('jwt-simple'),
    c = require('nconf');

c.env().file({ file: 'config.json'});

if (c.get('ENV') === 'production') {
	require('newrelic');
}

var TOKEN_SECRET = c.get('TOKEN_SECRET');

// Controllers
var api = require('./controllers/api');

// Application
var app = module.exports.app = exports.app = express(),
    port = process.env.PORT || 3000;

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(multer());

// Login required middleware
function auth (req, res, next) {
	if (!req.headers.authorization) {
		return res.status(401).send({ message: 'Please make sure your request has an Authorization header' });
	}
	var token = req.headers.authorization.split(' ')[1];
	var payload = jwt.decode(token, TOKEN_SECRET);
	if (payload.exp <= moment().unix()) {
		return res.status(401).send({ message: 'Token has expired' });
	}
	req.user = payload.sub;
	next();
}

// API Routes
app.get('/accounts', auth, api.accounts.getAccounts);
app.get('/accounts/:id', auth, api.accounts.getAccountByID);
app.get('/accounts/:id/users', auth, api.accounts.getAccountUsers);
app.get('/accounts/user/:username', auth, api.accounts.getAccountByUsername);
app.get('/users', auth, api.users.getUsers);
app.get('/users/current', auth, api.users.getCurrentUser);
app.get('/users/:username', auth, api.users.getUser);
app.post('/auth', api.users.authenticateUser);

// Static Routes
app.use("/js", express.static(__dirname + '/public/js'));
app.use("/images", express.static(__dirname + '/public/images'));
app.use("/css", express.static(__dirname + '/public/css'));
app.use("/fonts", express.static(__dirname + '/public/fonts'));

// Angular Routes
app.use("/", express.static(__dirname + '/public/index.html'));
app.use("/*", express.static(__dirname + '/public/index.html'));

// Start server
app.listen(port);
console.log('Express server listening on port ' + port);
