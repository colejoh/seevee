var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    facebookId: String,
    googleId: String,
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
