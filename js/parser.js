/*  TO COMPILE THIS FILE    
    browserify js/parser.js -o js/bundle.js
*/

var ical = require('ical');
var login = 'asimon23';
var url = 'https://xopenproxy.herokuapp.com/' + 'http://web.isen-ouest.fr/EDT/' + login + '.ics';
var matiereUniques = [];

function getCours () {
    let tab = [];
    let allMatieres = [];
    ical.fromURL(url, {}, function (err, data) {
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                var ev = data[i];
                if (data[i].type == 'VEVENT') {
                    var cours = splitMaker("" + ev.description, "" + ev.start, "" + ev.end);
                    tab.push(cours);
                    allMatieres.push(cours.matiere);
                }
            }
        }
        matiereUniques = Array.from(new Set(allMatieres));
        storeMatieres(matiereUniques);

        let CurrentPage = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
        switch(CurrentPage) {
            case 'edt.html':
                fillListeCours(tab);
                loadDayItems(targetDate);
                break;
            case 'settings.html':
                loadColors();
                break;
        }
    });
}
getCours();

function loadColors () {
    let modelsetting = document.getElementById("couleurmatiere");
    let contenu = document.getElementById("liste-matieres");
   
    let learn = getMatieres();
    
    learn.forEach(function(element){
        let modelsettingclone = modelsetting.cloneNode(true);

        modelsettingclone.id = element;
        modelsettingclone.className = 'matiere';
        modelsettingclone.childNodes[3].childNodes[1].style.backgroundColor = localStorage.getItem(element.replace(/\s/, ''));
        modelsettingclone.childNodes[3].childNodes[1].id = element.replace(/\s/, '');
        modelsettingclone.childNodes[1].childNodes[1].innerHTML = element;
        modelsettingclone.style.display = 'flex';
        modelsettingclone.setAttribute('onclick', 'colorPicker(this.id)');

        contenu.appendChild(modelsettingclone);
    });
}

/*  Liste de toutes les catégories de matières  */ 
function getMatieres(){
    return matiereUniques;
}

/*  La date du jour    */
function getFullDate(date){
    return date.substr(4,11);
}

/*  L'heure de la matière   */
function getDate(date) {
    return date.substr(16, 5);
}

/*  Créer le JSON en partant du ical    */
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

/*  Sépare toutes les différentes partie d'un cours */
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

function storeMatieres (list) {
    list.forEach(matiere => {
        matiere = matiere.replace(/\s/, '');
        if (localStorage.getItem(matiere) === null) {
            localStorage.setItem(matiere, 'rgb(255, 255, 255)');
        }
    });
}