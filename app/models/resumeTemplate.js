var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ResumeTemplateSchema = new Schema({
    title: String,         // Job Title
    description: String,   // About
    html: String,       // Date Started
}, {collection: 'resumeTemplate'});

module.exports = mongoose.model('ResumeTemplate', ResumeTemplateSchema);
