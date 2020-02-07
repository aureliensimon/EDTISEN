/*  TO COMPILE THIS FILE    
    browserify js/parser.js -o js/bundle.js
*/

var ical = require('ical');
var login = localStorage.getItem('login');
var url = 'https://xopenproxy.herokuapp.com/' + 'http://web.isen-ouest.fr/EDT/' + login + '.ics';
var matiereUniques = [];

/**
 * Parse ics file.
 */
function getCours () {
    let tab = [];
    let allMatieres = [];

    Array.from(document.getElementsByClassName('navbar-container-item')).forEach(item => {
        item.classList.add('loading');       
    });

    ical.fromURL(url, {}, function (err, data) {
        if (err != undefined) {
            alert(err);
        }
        for (var i in data) {
            if (data.hasOwnProperty(i)) {
                var ev = data[i];
                if (data[i].type == 'VEVENT') {
                    var cours = splitMaker("" + ev.description, "" + ev.start, "" + ev.end);
                    tab.push(cours);
                    allMatieres.push(cours.matiere2);
                }
            }
        }
        let currentPage = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);

        if(!tab.length && currentPage == 'edt.html') {
            alert('Il semble que votre login soit incorrect.\nSoit votre login (' + localStorage.getItem('login') + ') est incorrect, soit vous n\'avez pas activé votre agenda.\nPour l\'activer il faudra vous rendre sur l\'ENT, dans l\'onglet Mon compte puis Abonnement agenda et enfin cliquer sur activer mon abonnement');
            return -1;
        }
        matiereUniques = Array.from(new Set(allMatieres));
        storeMatieres(matiereUniques);

        
        switch(currentPage) {
            case 'edt.html':
                fillListeCours(tab);
                loadDayItems(targetDate);
                break;
            case 'settings.html':
                loadColors();
                break;
        }
    });

    Array.from(document.getElementsByClassName('navbar-container-item')).forEach(item => {
        item.classList.remove('loading');
    });
}
getCours();

/**
 * Load color button in settings.html.
 */
function loadColors () {
    let modelsetting = document.getElementById("couleurmatiere");
    let contenu = document.getElementById("liste-matieres");
    
    let learn = getMatieres();
    
    learn.forEach(function(element){
        let modelsettingclone = modelsetting.cloneNode(true);

        modelsettingclone.id = element;
        modelsettingclone.className = 'matiere';
        
        modelsettingclone.getElementsByClassName('colorpoint')[0].style.backgroundColor = localStorage.getItem(element.replace(/\s/, ''));
        modelsettingclone.getElementsByClassName('colorpoint')[0].id = element.replace(/\s/, '');
        modelsettingclone.getElementsByClassName('matiere-nom')[0].innerHTML = element;
        modelsettingclone.style.display = 'flex';
        modelsettingclone.setAttribute('onclick', 'colorPicker(this.id)');

        contenu.appendChild(modelsettingclone);
    });
}

/**
 * Liste de toutes les catégories de matières
 * @param {date} date date to extract.
 * @return {string} lesson's day.
 */
function getMatieres(){
    return matiereUniques;
}

/**
 * La date du jour
 * @param {date} date date to extract.
 * @return {string} lesson's day.
 */
function getFullDate(date){
    return date.substr(4,11);
}

/**
 * Avoir l'heure de la matière
 * @param {date} date date to extract.
 * @return {string} lesson's hour.
 */
function getDate(date) {
    return date.substr(16, 5);
}

/**
 * Créer le JSON en fonction du ical
 * @param {array} array lesson.
 * @return {JSON} structured lesson.
 */
function createJson(array) {
    return ({
        date: array[0],
        dateDebut: array[1],
        dateFin: array[2],
        type: array[3],
        matiere: array[4],
        matiere2: array[5],
        prof: array[6],
        lieu: array[7],
        notes: array[8]
    });
}

/**
 * Sépare toutes les différentes partie d'un cours
 * @param {string} activity a lesson (full informations).
 * @param {date} start start date of the activity.
 * @param {date} end end date of the activity.
 * @return {array} JSONify array of all lesson.
 */
function splitMaker(activity, start, end) {
    var payload = [];
    var array = activity.split('\n');
    payload.push(getFullDate(start));
    payload.push(getDate(start), getDate(end));
    
    for (var i = 0; i < array.length; i++) {
        payload.push(array[i].split(/-(.+)/)[1]);
    }
    
    var payloadJSON = createJson(payload);
    
    return payloadJSON;
}

/**
 * Add / sub a number of days from a date.
 * @param {array} list all uniques fields.
 */
function storeMatieres (list) {
    list.forEach(matiere => {
        matiere = matiere.replace(/\s/, '');
        if (localStorage.getItem(matiere) === null) {
            localStorage.setItem(matiere, 'rgb(255, 255, 255)');
        }
    });
}