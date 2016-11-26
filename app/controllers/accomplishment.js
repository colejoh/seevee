var Accomplishment = require('../models/accomplishment');

/*
 * Set: Takes in data and returns an Accomplishment model
 *      with the specified data
 * params - acc: Accomplishment model object
 *          data: Data that is assigned to object
 *          user: Current user in session
 * returns - Accomplishment object with specified data
 */
exports.set = function(acc, data, user) {
    var a = acc || new Accomplishment();

    a.title = data.title || acc.title;
    a.description = data.description || acc.description;
    a.dateStart = setDate(data.date, data.type, 'start');
    a.dateEnd = setDate(data.date, data.type, 'end');
    a.origin = data.origin || acc.origin;
    a.type = data.type || acc.type;
    a.importance = data.importance || acc.importance;
    a.userId = user._id;

    return a;
};

/*
 * setDate: Parses what the user enters for their date
 * params - date: String of what user entered
 *          type: Accomplishment type
 *          time: Either start or end
 * returns - String parsed from user's input for specific time type
 */
function setDate(date, type, time) {
    if(date === null) return '';

    if(type === 'work' || type === 'project') {
        if(time === 'start') {
            var startDate = date.substring(0, date.indexOf('-'));
            startDate = startDate.trim();
            startDate = startDate.toLowerCase();
            return startDate.replace(/(^| )(\w)/g, function(x) {
                return x.toUpperCase();
            });
        } else {
            var endDate = date.substring(date.indexOf('-')+1, date.length);
            endDate = endDate.trim();
            endDate = endDate.toLowerCase();
            return endDate.replace(/(^| )(\w)/g, function(x) {
                return x.toUpperCase();
            });
        }
    } else {
        if(time === 'end') return date;
        else return '';
    }
}
