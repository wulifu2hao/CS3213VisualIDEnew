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

