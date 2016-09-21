// Setting up dependencies
var mongoose = require('mongoose');

// Creating Accomplishment Schema
var AccomplishmentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    // startDate: {
    //     type: Date,
    //     required: false
    // },
    // endDate: {
    //     type: Date,
    //     required: false
    // },
    description: {
        type: String,
        required: true
    }
});

// Export the model Schema
module.exports = AccomplishmentSchema;
