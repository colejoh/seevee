// Setting up dependencies
var mongoose = require('mongoose');

// Creating Accomplishment Schema
var AccomplishmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
});

// Export the model Schema
module.exports = AccomplishmentSchema;
