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