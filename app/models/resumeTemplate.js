var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResumeTemplateSchema = new Schema({
    title: String,         // Resume Title
    description: String,   // Resume About
    html: String,          // HTML & CSS Code
}, {collection: 'resumeTemplate'});

module.exports = mongoose.model('ResumeTemplate', ResumeTemplateSchema);
