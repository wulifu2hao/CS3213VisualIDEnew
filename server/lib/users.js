// var twitter = require(__dirname + "/twitter");
var mongoose = require('mongoose');
var Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var userSchema = new Schema({
    user                  : ObjectId
    , googleId            : Number
    , email               : String
    , profileImageUrl     : String
    , name                : String
    , dateCreated         : Date
    , session             : String
    , accessToken         : String
    , accessTokenExtra   : String
});

var conn = mongoose.createConnection('mongodb://localhost/sit');
var userModel = conn.model('User', userSchema);

this.findOrCreateUserbyGoogleData = function(googleData, accessToken, accessTokenExtra, promise) {
  userModel.find({'googleId' : googleData.id}, function(err, users) {
     if(err) throw err;
     if(users.length > 0) {
      console.log("user already exist");
       promise.fulfill(users[0]);
     } else {
       var user = new userModel();
       user.googleId = googleData.id
       user.email = googleData.email
       user.profileImageUrl = googleData.picture
       user.name = googleData.name
       user.accessToken = accessToken
       user.accessTokenExtra = accessTokenExtra
       user.save(function(err) {
         if (err) throw err;
         console.log("new user created");
         // twitter.follow(accessToken, accessTokenSecret);
         promise.fulfill(user);
       });
     }
   });
}

this.findById = function(userId, callback) {
  console.log("inside findById");
  userModel.findOne({'_id' : userId}, function(err, user) {
    if(err) {
      if (callback) {
        callback(err, null);
      } else {
        return err;
      }
    } else {
      if (callback) {
        callback(null, user);
      }else {
        return user;
      }
    }
  }); 
}



// this.deleteById = function(userId) {
//   console.log("deleting");
//   userModel.findOne({'_id' : userId}, function(err, user) {
//     if(err) throw err;
//     user.remove();
//   }); 
// }