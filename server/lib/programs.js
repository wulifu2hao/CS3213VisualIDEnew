var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var programSchema = new Schema({
    program                  : ObjectId
    , googleId            : Number
    , name                : String
    , data                : String
});

// var conn = mongoose.createConnection('mongodb://localhost/sit');
var programModel = mongoose.model('Program', programSchema);

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
		// console.log("both req user and req body exist");

		programModel.find({ name: req.body.name, googleId: req.user.googleId}, function(err, programs) {
	        if (err) {
	        	console.log(err);
	            res.json({message: 'error with database.'});
	        } else {
	            if (programs.length > 0) {
	            	// console.log("program exist");
	            	// res.json({message: 'program with the same name already exist.'});

	            	// need to fix it next time...
	            	var program = programs[0];
	            	program.remove();

	            	var data = req.body;
	            	data.googleId = req.user.googleId;
	            	var newProgram = new programModel(req.body);
	            	newProgram.save(function(err) {
				         if (err) {
				         	// console.log("error while saving to database");
				         	res.json({message: "error while saving to database"});
				         } else {
				         	// console.log("successfully updated");
				         	res.json({message: 'success', program:newProgram});
				         }
				    })
	            } else {
	            	// console.log("saving new program");
	            	var data = req.body;
	            	data.googleId = req.user.googleId;
	            	var newProgram = new programModel(req.body);
	            	newProgram.save(function(err) {
				         if (err) {
				         	// console.log("error while saving to database");
				         	res.json({message: "error while saving to database"});
				         } else {
				         	// console.log("successfully saved to database");
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


this.updateProgram = function(req, res) {
	if (req.user && req.body) {
		// console.log("both req user and req body exist");

		programModel.find({ name: req.body.name, googleId: req.user.googleId}, function(err, programs) {
	        if (err) {
	        	console.log(err);
	            res.json({message: 'error with database.'});
	        } else {
	            if (programs.length > 0) {
	            	var program = programs[0];
	            	program.remove();

	            	var data = req.body;
	            	data.googleId = req.user.googleId;
	            	var newProgram = new programModel(req.body);
	            	newProgram.save(function(err) {
				         if (err) {
				         	// console.log("error while saving to database");
				         	res.json({message: "error while saving to database"});
				         } else {
				         	// console.log("successfully updated");
				         	res.json({message: 'success', program:newProgram});
				         }
				    })

	            } else {
	            	// console.log("program not found");
	            	res.json({message: 'program not found'});
	            }
	        }
	    });
	}else{
		res.json({message: 'user has not logged in.'});
	}    
}

this.getNamesOfPrograms = function(req, res) {
	if (req.user) {
		programModel.find({googleId: req.user.googleId}, function(err, programs) {
	        if (err) {
	            res.json({message: 'error with database.'});
	        } else {
	        	var names = [];
	        	for (var i = 0; i < programs.length; i++) {
	        		names.push(programs[i].name)
	        	};
	        	res.json({message:'success', names:names})
	        }
	    });
	}else{
		res.json({message: 'user has not logged in.'});
	}    
}

this.deleteAll = function(req, res) {
	programModel.find({}, function(err, programs) {
        if (err) {
            res.json({message: 'error with database.'});
        } else {
        	for (var i = 0; i < programs.length; i++) {
        		programs[i].remove();
        	};
        	res.json({message:'success'});
        }
    });   
}


