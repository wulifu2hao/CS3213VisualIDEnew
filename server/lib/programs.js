var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var programSchema = new Schema({
    program                  : ObjectId
    , googleId            : Number
    , name                : String
});

var conn = mongoose.createConnection('mongodb://localhost/sit');
var programModel = conn.model('Program', programSchema);

this.getByName = function(req, res) {
	if (req.user) {
		programModel.find({ name: req.params.name, googleId: req.user.googleId}, function(err, programs) {
	        if (err) {
	            res.json({message: 'error with database.'});
	        } else {
	            if (programs.length > 0) {
	            	res.json({message:'success', program:programs[0]});
	            } else {
	            	res.json({message: 'program not found'});
	            }
	        }
	    });
	}else{
		res.json({message: 'user has not logged in.'});
	}    
}

this.deleteByName = function(req, res) {
	if (req.user) {
		programModel.find({ name: req.params.name, googleId: req.user.googleId}, function(err, programs) {
	        if (err) {
	            res.json({message: 'error with database.'});
	        } else {
	            if (programs.length > 0) {
	            	var program = programs[0];
	            	program.remove();
	            	res.json({message:'success'});
	            } else {
	            	res.json({message: 'program not found'});
	            }
	        }
	    });
	}else{
		res.json({message: 'user has not logged in.'});
	}    
}

this.addProgram = function(req, res) {
	if (req.user && req.body) {
		if (req.user.googleId !== req.body.googleId) {
			res.json({message: 'user id of program is not consistent with the current user logged in'});
		};

		programModel.find({name: req.body.name, googleId: req.body.googleId}, function(err, programs) {
	        if (err) {
	            res.json({message: 'error with database.'});
	        } else {
	            if (programs.length > 0) {
	            	res.json({message: 'program with the same name already exist.'});
	            } else {
	            	var newProgram = new programModel(req.body);
	            	newProgram.save(function(err) {
				         if (err) {
				         	res.json({message: "error while saving to database"});
				         } else {
				         	res.json({message: 'success', program:newProgram});
				         }
				    })
	            }
	        }
	    });
	}else{
		res.json({message: 'user has not logged in.'});
	}    
}