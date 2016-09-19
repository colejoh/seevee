// Setting up dependencies
var restful = require('node-restful');

module.exports = function(app, route) {

    // Sets up controller for REST
    var rest = restful.model(
        'accomplishment',
        app.models.accomplishment
    ).methods(['get', 'put', 'post', 'delete']);

    // Sets up endpoints
    rest.register(app, route);

    // Return middleware
    return function(req, res, next) {
        next();
    };
};
