var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var audioSchema = new Schema({
    audio                  : ObjectId
    , googleId            : Number
    , name                : String
});

var audioModel = mongoose.model('Audio', audioSchema);

this.addAudio = function(filename, userId, res) {
	audioModel.find({ name: filename, googleId: userId}, function(err, audios) {
        if (err) {
        	console.log(err);
            res.json({message: 'error with database.'});
        } else {
            if (audios.length == 0) {
            	var data = {googleId:userId, name:filename};
            	var newAudio = new audioModel(data);
            	newAudio.save(function(err) {
			         if (err) {
			         	res.json({message: "error while saving record to database"});
			         } else {
			         	res.json({message: 'success', name:filename});
			         }
			    })	
            } else {
            	// didn't handle overwrite issue...
            	res.json({message: 'success', name:filename});
            }
        }
    });
}

this.getAudios = function(req, res){
    if (req.user) {
        audioModel.find({googleId: req.user.googleId}, function(err, audios) {
            if (err) {
                console.log(err);
                res.json({message: 'error with database.'});
            } else {
                res.json({message: 'success', audios:audios});
            }
        });
    } else {
        res.json({message: 'Please log in first'});
    }
}