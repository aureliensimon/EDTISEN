var ical = require('ical');
var login = 'asimon23';
var url = 'https://cors-anywhere.herokuapp.com/' + 'http://web.isen-bretagne.fr/EDT/' + login + '.ics';

ical.fromURL(url, {}, function (err, data) {
    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            var ev = data[i];
            if (data[i].type == 'VEVENT') {
                var cours = splitMaker("" + ev.description, "" + ev.start, "" + ev.end);
                console.log(cours);
            }
        }
    }
});
function getDate(date) {
    return date.substr(16, 5);
}
function createJson(array) {
    return ({
        dateDebut: array[0],
        dateFin: array[1],
        matiere: array[2],
        matiere2: array[3],
        profs: array[4],
        lieu: array[5],
        notes: array[6]
    });
}
function splitMaker(activity, start, end) {
    var payload = [];
    var array = activity.split('\n');
    payload.push(getDate(start), getDate(end));
    for (var i = 0; i < array.length; i++) {
        if (!i || i == array.length)
            continue;
        payload.push(array[i].split('-')[1]);
    }
    var payloadJSON = createJson(payload);
    return payloadJSON;
}