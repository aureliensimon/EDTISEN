let listeCours = {};
let targetDate = getCurrentDate();
let mondayDate, relativeMonday;

/**
 * get the current date
 * @return {date} current date (format : MMM DD YYYY).
 */
function getCurrentDate () {
    let nDate = (new Date).toLocaleDateString('en-GB', { 
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    return(formatDate(nDate));
}

/**
 * Add / sub a number of days from a date.
 * @param {date} pdate the initial date.
 * @param {number} number number of day to increase / decrease.
 * @return {date} new date (format : MMM DD YYYY).
 */
function incrDate(pDate, number) {
    let date = new Date(pDate);
    date.setDate(date.getDate() + number);
    date = date.toLocaleDateString('en-GB', { 
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });

    return(formatDate(date));
}

/**
 * Add the current date to HTML.
 */
function getTime () {
    let nDate = new Date(targetDate).toLocaleDateString('fr-FR', { 
        weekday: 'short',
        month: 'short',
        day: '2-digit'
    });
    
    let date = nDate.slice(0,3)  + ', ' + nDate.slice(5,7) + ' ' + nDate.slice(7,11);
    document.getElementById('date').innerHTML = date;
}

/**
 * Give the day tag from a date (format : Ddd).
 * @param {date} date The initial date.
 * @return {string} day tag (Mon, Thu, ..., Sun).
 */
function getDayTag (date) {
    let cDate = new Date(date);
    return (cDate.toString().slice(0,3));
}

/**
 * format a date.
 * @param {date} date The date to format.
 * @return {date} formated date (format : MMM DD YYYY).
 */
function formatDate (date) {
    let formatedDate = date.split(" ");

    return formatedDate[1].substring(0,3) + " " + formatedDate[0] + " " + formatedDate[2];
}

/**
 * Add a bottom border to selected item in menu.
 * @param {HTML} div The div the user clicked.
 */
function changeCSS (div) {
    let alldiv = Array.from(div.parentNode.children);

    alldiv.forEach(element => {
        if(element.id != div.id){
            document.getElementById(element.id).style.color = '#8f919c';
            document.getElementById(element.id).style.borderBottom = '0px';
        }        
    });
    
    div.style.color = 'white';
    div.style.borderBottom = '3px solid #0478EB';
}

/**
 * Load all day items.
 * @param {date} date The day selected.
 */
function loadDayItems (date) {

    let date1 = new Date(listeCours[0].date);
    let date2 = new Date(listeCours[listeCours.length - 1].date);

    let datediff = date2.getTime() - date1.getTime();
    let daydiff = datediff / (1000 * 3600 * 24);

    // Création de daydiff swipe
    // Mettre chaque infos si info.date = date
    // Se mettre au jour
    // ez

    swiper.slideTo(0, 1, false);
    let model = document.getElementById('edt-item-day');
    let weekItems = document.getElementById('list-item');
    while(weekItems.firstChild) weekItems.removeChild(weekItems.firstChild);
    document.getElementById('swiper').style.display = 'block';

    for (let i = 0; i < 7; i++) {
        let contenu = document.getElementById('day' + i);

        while(contenu.firstChild) contenu.removeChild(contenu.firstChild);

        let coursToday = [];

        listeCours.forEach(function(element){
            if(element.date == incrDate(date, i)){
                coursToday.push(element);
            }
        });
        
        coursToday.sort((a, b) => a['dateDebut'] > b['dateDebut']);

        coursToday.forEach(function(element) {
            let modelClone = model.cloneNode(true);

            if (element.matiere.trim() === "DEVOIRS") {
                modelClone.getElementsByClassName('lesson-notes-devoir')[0].style.display = 'block';
            }

            if (element.notes) {
                modelClone.getElementsByClassName('lesson-notes-img')[0].style.display = 'block';
                modelClone.getElementsByClassName('lesson-notes-text')[0].innerHTML = element.notes;
            }

            modelClone.getElementsByClassName('lesson-Name')[0].innerHTML = (element.matiere2 === ' Evénement sans titre') ? element.matiere : element.matiere2;
            modelClone.getElementsByClassName('lesson-Name')[0].style.borderLeft = '3.5px solid ' + localStorage.getItem(element.matiere2.replace(/\s/, ''));
            modelClone.getElementsByClassName('lesson-Professor')[0].innerHTML = element.prof;
            modelClone.getElementsByClassName('lesson-Date-Start')[0].innerText = element.dateDebut;
            modelClone.getElementsByClassName('lesson-Date-End')[0].innerText = element.dateFin;
            modelClone.getElementsByClassName('lesson-Location-Number')[0].innerText = element.lieu.replace(/\s/, '');
            modelClone.getElementsByClassName('lesson-Location-Number')[0].style.color = localStorage.getItem(element.matiere2.replace(/\s/, ''));
            modelClone.style.display = 'block';

            contenu.appendChild(modelClone);
        });
    
        if (!contenu.firstChild) {
            var node = document.createElement("P");
            node.id = 'no-lesson-emoji';
            var textnode = document.createTextNode("(ノ^o^)ノ");
            node.appendChild(textnode);
            contenu.appendChild(node);
    
            node = document.createElement("P");
            node.id = 'no-lesson-text';
            textnode = document.createTextNode("Aucun cours de prévu !");
            node.appendChild(textnode);
            contenu.appendChild(node);
        }
    }
}

/**
 * Load all week tags.
 * @param {date} targetWeek The week selected.
 */
function loadWeekItems (targetWeek) {
    let dayTags = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
    let dayTagsEN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    let targetDay = targetWeek;
    
    let model = document.getElementById('edt-item-week');
    let contenu = document.getElementById('list-item');
    document.getElementById('swiper').style.display = 'none';
    
    while(contenu.firstChild) contenu.removeChild(contenu.firstChild);

    for (let i = 0; i < dayTags.length; i++) {
        let modelClone = model.cloneNode(true);

        let dayDate = incrDate(targetDay, -(dayTagsEN.indexOf(targetDay) - i + 1));

        modelClone.getElementsByClassName('daytag')[0].innerHTML = dayTags[i] + ' ' + dayDate.slice(4,6) + ' ' + dayDate.slice(0,3);
        modelClone.style.display = 'block';
        modelClone.style.border = '1px solid #0478EB';
        
        // if day is selected day, set border
        if (targetDate == dayDate) {
            modelClone.style.border = '1px solid #DDDDDD';
        }

        modelClone.onclick = function () {
            targetDate = incrDate(targetDay, -(dayTagsEN.indexOf(targetDay) - i + 1) + swiper.activeIndex);
            loadDayItems(incrDate(targetDay, -(dayTagsEN.indexOf(targetDay) - i + 1)));
            changeCSS(document.getElementById('daily'));
            getTime();
        };
        contenu.appendChild(modelClone);
    }
}

/**
 * Load all months tags.
 */
function loadMonthItems () {
    let model = document.getElementById('edt-item-week');
    let contenu = document.getElementById('list-item');
    let nextMonday = mondayDate;

    let months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
    let shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    while(contenu.firstChild) contenu.removeChild(contenu.firstChild);
    
    for (let i = 0; i < 52; i++) {
        nextMonday = incrDate(nextMonday, 6);

        let modelClone = model.cloneNode(true);
        modelClone.style.display = 'block';
        modelClone.style.border = '1px solid #0478EB';

        let weekMonday = incrDate(nextMonday, -6).slice(4,6);
        let weekSunday = nextMonday.slice(4,6);

        if (incrDate(nextMonday, -6) == relativeMonday) {
            modelClone.style.border = '1px solid #DDDDDD';
        }
        modelClone.getElementsByClassName('daytag')[0].innerText = weekMonday + ' ' + months[shortMonths.indexOf(incrDate(nextMonday, -6).slice(0,3))] + '\n' + weekSunday + ' ' + months[shortMonths.indexOf(nextMonday.slice(0,3))];
        nextMonday = incrDate(nextMonday, 1);

        modelClone.onclick = function () {
            targetWeek = incrDate(mondayDate, i * 7);
            relativeMonday = targetWeek;
            loadWeekItems(targetWeek);
            changeCSS(document.getElementById('weekly'));
            getTime();
        };

        contenu.appendChild(modelClone);

        if (nextMonday.slice(0, 3) === 'Jul') {
            break;
        }
    }
}

/**
 * Get monday date from the targetDate's week.
 */
function getMondayDate () {
    let dayTagsEN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    mondayDate = incrDate(targetDate, -(dayTagsEN.indexOf(getDayTag(targetDate))));
    relativeMonday = mondayDate;
}
getMondayDate();

/**
 * Fill listeCours with all item from tab.
 * @param {array} tab The lesson array.
 */
function fillListeCours (tab) {
    listeCours = tab;
}

function showHideNotes (div) {
    let e = div.getElementsByClassName('lesson-notes-text')[0];
    let display = getComputedStyle(e).display;

    if (display === 'none') {
        e.style.display = 'block';
    } else if (display === 'block') {
        e.style.display = 'none';
    }
}