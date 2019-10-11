var ical = require('ical');
var login = 'asimon23';
var url = 'https://cors-anywhere.herokuapp.com/' + 'http://web.isen-bretagne.fr/EDT/' + login + '.ics';

ical.fromURL(url, {}, function (err, data) {
    let tab = [];
    for (var i in data) {
        if (data.hasOwnProperty(i)) {
            var ev = data[i];
            if (data[i].type == 'VEVENT') {
                var cours = splitMaker("" + ev.description, "" + ev.start, "" + ev.end);
                tab.push(cours);
            }
        }
    }
    
    let model = document.getElementById('edt-item');
    let contenu = document.getElementById('list-item');
    
    while(contenu.firstChild) contenu.removeChild(contenu.firstChild);

    tab.forEach(function(element){
        let modelClone = model.cloneNode(true);
        
        modelClone.childNodes[1].innerHTML = element.matiere2;
        modelClone.childNodes[5].innerHTML = element.prof;
        modelClone.childNodes[7].firstElementChild.innerText = element.dateDebut;
        modelClone.childNodes[7].lastElementChild.innerText = element.dateFin;
        modelClone.childNodes[9].innerHTML = element.lieu;
        contenu.appendChild(modelClone);
    });
});
function getFullDate(date){
    return date.substr(4,11);
}
function getDate(date) {
    return date.substr(16, 5);
}
function createJson(array) {
    return ({
        date: array[0],
        dateDebut: array[1],
        dateFin: array[2],
        matiere: array[3],
        matiere2: array[4],
        prof: array[5],
        lieu: array[6],
        notes: array[7]
    });
}
function splitMaker(activity, start, end) {
    var payload = [];
    var array = activity.split('\n');
    payload.push(getFullDate(start));
    payload.push(getDate(start), getDate(end));
    for (var i = 0; i < array.length; i++) {
        if (!i || i == array.length)
            continue;
        payload.push(array[i].split('-')[1]);
    }
    var payloadJSON = createJson(payload);
    return payloadJSON;
}
