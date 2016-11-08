var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AccomplishmentSchema = new Schema({
    title: String,
    description: String
});

module.exports = mongoose.model('Accomplishment', AccomplishmentSchema);
