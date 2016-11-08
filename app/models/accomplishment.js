var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccomplishmentSchema = new Schema({
    title: String,         // Job Title
    description: String,   // About
    dateStart: Date,       // Date Started
    dateEnd: Date,         // Date Ended
    origin: String         // Could be workplace or university etc.
}, {collection: 'accomplishment'});

module.exports = mongoose.model('Accomplishment', AccomplishmentSchema);
