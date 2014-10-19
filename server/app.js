'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');
var baucis = require('baucis');
var socketIO = require('socket.io');
var mongoose = require('mongoose');

var everyauth = require("everyauth"),
 	util = require ('util'),
 	Promise = everyauth.Promise,
 	users = require('./lib/users');

 var programs = require("./lib/programs");


everyauth.google
  .appId('94957522892-s68i21cjon2huqvl3ereort22eghbnkt.apps.googleusercontent.com')
  .appSecret('yTWW6kvc0CY2ieEz44-GxwOv')
  .scope('https://www.googleapis.com/auth/userinfo.email') // What you want access to
  .handleAuthCallbackError( function (req, res) {

  })
  .findOrCreateUser( function (session, accessToken, accessTokenExtra, googleUserMetadata) {
    var promise = this.Promise();
    console.log("before logging");
    // promise.fulfill('test');
  	users.findOrCreateUserbyGoogleData(googleUserMetadata, accessToken, accessTokenExtra, promise);
  	return promise;
    // console.log(session);
    // console.log(accessToken);
    // console.log(accessTokenExtra);
    // console.log(googleUserMetadata);
  })
  .redirectPath('/');

everyauth.everymodule.findUserById(function (userId, callback) {
	// console.log("getting user with id:");
	// console.log(userId);

      users.findById(userId, callback);
});


// start mongoose
// mongoose.connect('mongodb://localhost/sit');
mongoose.connect('mongodb://cs3213:1234@linus.mongohq.com:10040/app30827622');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {

	/* test schema */
    var testSchema = new mongoose.Schema({
        test: String
    });

    var Test = mongoose.model( 'test', testSchema );

    /* set Baucis */
    baucis.rest({
        singular: 'test'
    });

	var app = express();
	everyauth.helpExpress(app);


	app.configure(function(){
	    app.set('port', process.env.PORT || 9000);
	    
	    app.set('views', __dirname + '../app/scripts/views');
	    app.set('view engine', 'handlebars');
	    app.use(express.bodyParser());
	  	app.use(express.methodOverride());
	  	app.use(express.cookieParser());
	  	app.use(express.session({secret: "yTWW6kvc0CY2ieEz44"}));
	  	app.use(everyauth.middleware());
	  	// app.use(app.router);
	});


    app.use('/api/v1', baucis());

	// simple log
	app.use(function(req, res, next){
	  console.log('%s %s', req.method, req.url);
	  next();
	});

	// mount static
	app.use(express.static( path.join( __dirname, '../app') ));
	app.use(express.static( path.join( __dirname, '../.tmp') ));


	// route index.html
	app.get('/', function(req, res){
	  console.log(req.user);
	  res.sendfile( path.join( __dirname, '../app/index.html' ) );
	});

	app.get('/test', function(req, res){
	  console.log(req.user);
	  // res.json(req.user);
	  res.json({'test':"test"});
	  res.json(req.user);
	});	

	app.get('/api/programs/:name', programs.getByName);	
	app.put('/api/programs', programs.updateProgram);
	app.post('/api/programs', programs.addProgram);
	app.delete('/api/programs/:name', programs.deleteByName);	

	// start server
	http.createServer(app).listen(app.get('port'), function(){
	    console.log('Express App started!');
	});
});


