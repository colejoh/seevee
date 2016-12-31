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
    info: {
      displayName: String,
      phoneNumber: String,
      industry: String
    },
    online: {
      website: String,
      github: String,
      linkedIn: String
    },
    address: {
      addressLine1: String,
      addressLine2: String,
      city: String,
      state: String,
    },
    ageRange: {
        min: Number,
        max: Number
    },
    education: String,
    gender: String,
    location: String,
    facebookVerified: String,
    pageName: String,
}, {collection: 'user'});

module.exports = mongoose.model('User', UserSchema);
