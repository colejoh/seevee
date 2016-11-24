var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    facebook: {
      id        : String,
      token     : String,
      name      : String,
      email     : String
    },
    google: {
      id        : String,
      token     : String,
      email     : String
    },
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    phoneNumber: String,
    website: String,
    github: String,
    linkedIn: String,
}, {collection: 'user'});

module.exports = mongoose.model('User', UserSchema);
