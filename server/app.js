'use strict';

var express = require('express');
var http = require('http');
var path = require('path');
var async = require('async');
var hbs = require('express-hbs');
var baucis = require('baucis');
var socketIO = require('socket.io');
var mongoose = require('mongoose');	
var mkdirp = require('mkdirp');
var fs = require('fs');

var everyauth = require("everyauth"),
 	util = require ('util'),
 	Promise = everyauth.Promise,
 	users = require('./lib/users');

 var programs = require("./lib/programs");
 var audios = require("./lib/audios");


everyauth.google
  // .appId('94957522892-s68i21cjon2huqvl3ereort22eghbnkt.apps.googleusercontent.com')
  // .appSecret('yTWW6kvc0CY2ieEz44-GxwOv')
  .appId('833362114023-7ut2penvgf12fa23bb66knr3gf27rt9g.apps.googleusercontent.com')
  .appSecret('rirG8Z310rHRtLLAnTW5kSvf')
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
		console.log("enter main page");
		if (req.user) {
			console.log("haven't logged in ");
			res.sendfile( path.join( __dirname, '../app/index.html' ) );
		} else {
			console.log("logged in ");
			res.redirect('http://localhost:9000/auth/google');
		}
	  // console.log(req.user);
	});

	app.get('/api/user', function(req, res){
		if (req.user) {
			res.json({message:"success"});
		} else {
			res.json({message:"fail"});
		}
	});



	app.get('/test', function(req, res){
	  console.log(req.user);
	  // res.json(req.user);
	  res.json({'test':"test"});
	  res.json(req.user);
	});	

	app.get('/api/programs/:name', programs.getByName);	
	app.get('/api/programs', programs.getNamesOfPrograms);
	app.put('/api/programs', programs.updateProgram);
	app.post('/api/programs', programs.addProgram);
	app.delete('/api/programs/:name', programs.deleteByName);

	// app.get('/api/programs/all/delete', programs.deleteAll);

	app.get('/api/audios', audios.getAudios);
	app.delete('/api/audios/:name', function(req,res){
		console.log("delete request");
		if (req.user) {
			console.log("deleting..")
			var path = __dirname + '/../app/audioUploaded/' + req.user.googleId + '/' +  req.params.name;
			console.log(path);
			fs.unlink(path, function (err) {
			  if (err) {
			  	console.log(err);
			  	res.json({message: err});
			  } else {
			  	console.log("deleted form file system")
			  	audios.deleteAudio(req.user.googleId, req.params.name, res);
			  }
			});
	    } else {
	        res.json({message: 'Please log in first'});
	    }
	});


	app.post('/api/uploadAudio', function(req,res){
		if (req.user) {
			var dir = __dirname + '/../app/audioUploaded/' + req.user.googleId;
			mkdirp(dir, function(err) { 
				if (err) {
					console.log(err);
					res.json({message: err});
				} else {
					var file = req.files.fileUploaded;
			        var serverPath = dir + "/"+file.name;
			        console.log("dirname");
			        console.log(__dirname);

				    require('fs').rename(
						file.path,
						serverPath,
						function(error) {
							if(error) {
								console.log(error);
								res.send({error: 'error when storing into file system'});
						    }  else {
						    	audios.addAudio(file.name, req.user.googleId, res);
						    }      
						}
				    );
				}

			});


		}else{
			res.json({message: 'Please log in before you upload a sound.'});
		}  
	});

	app.post('/api/costume', function(req,res){
		if (req.user) {
			var dir = __dirname + '/../app/costumeUploaded/' + req.user.googleId;
			mkdirp(dir, function(err) { 
				if (err) {
					console.log(err);
					res.json({message: err});
				} else {
					var file = req.files.fileUploaded;
			        var serverPath = dir + "/"+file.name;
			        var link = '../costumeUploaded/'+ req.user.googleId + "/"+file.name;

				    require('fs').rename(
						file.path,
						serverPath,
						function(error) {
							if(error) {
								console.log(error);
								res.send({error: 'error when storing into file system'});
						    }  else {
						    	res.send({message:"success", link:link});

						    	// audios.addAudio(file.name, req.user.googleId, res);
						    }      
						}
				    );
				}

			});
		}else{
			res.json({message: 'Please log in before you upload a costume.'});
		}  
	});


	// start server
	http.createServer(app).listen(app.get('port'), function(){
	    console.log('Express App started!');
	});
});


