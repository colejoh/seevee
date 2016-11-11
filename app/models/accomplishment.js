var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccomplishmentSchema = new Schema({
    title: String,         // Job Title
    description: String,   // About
    dateStart: String,       // Date Started
    dateEnd: String,         // Date Ended
    origin: String,        // Could be workplace or university etc.
    type: String,
    importance: Number,
    facebookId: String,
    googleId: String
}, {collection: 'accomplishment'});

module.exports = mongoose.model('Accomplishment', AccomplishmentSchema);
