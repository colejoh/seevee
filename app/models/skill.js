var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SkillSchema = new Schema({
    title: String,
    userId: String
}, {collection: 'skill'});

module.exports = mongoose.model('Skill', SkillSchema);
