let listeCours = {};
let targetDate = getCurrentDate();
let mondayDate, relativeMonday;

function getCurrentDate () {
    let nDate = (new Date).toLocaleDateString('en-GB', { 
        day: '2-digit',
        month: 'short',
        year: 'numeric'
    });
    return(formatDate(nDate));
}

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

function getTime () {
    let nDate = new Date(targetDate).toLocaleDateString('fr-FR', { 
        weekday: 'short',
        month: 'short',
        day: '2-digit'
    });
    
    let date = nDate.slice(0,3)  + ', ' + nDate.slice(5,7) + ' ' + nDate.slice(7,11);

    document.getElementById('date').innerHTML = date;
}

function getDayTag (date) {
    let cDate = new Date(date);
    return (cDate.toString().slice(0,3));
}

function formatDate (date) {
    return(
        date.slice(3,6).charAt(0).toUpperCase()
        + date.slice(3,6).charAt(1).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        + date.slice(4,6).slice(1)
        + ' '
        + date.slice(0,2)
        + ' '
        + date.slice(7,11)
    );
}

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

function loadWeekItems (targetWeek) {
    let dayTags = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    let dayTagsEN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    let targetDay = targetWeek;
    
    let model = document.getElementById('edt-item-week');
    let contenu = document.getElementById('list-item');

    while(contenu.firstChild) contenu.removeChild(contenu.firstChild);

    for (let i = 0; i < dayTags.length; i++) {
        let modelClone = model.cloneNode(true);

        modelClone.getElementsByClassName('daytag')[0].innerHTML = dayTags[i];
        modelClone.style.display = 'block';
        if (!(dayTagsEN.indexOf(targetDay) - i)) {
            modelClone.style.border = '1px solid white';
        }
        modelClone.onclick = function () {
            targetDate = incrDate(targetDay, -(dayTagsEN.indexOf(targetDay) - i + 1));
            loadDayItems(incrDate(targetDay, -(dayTagsEN.indexOf(targetDay) - i + 1)));
            changeCSS(document.getElementById('daily'));
            getTime();
        };
        contenu.appendChild(modelClone);
    }
}

function getMondayDate () {
    let dayTagsEN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    mondayDate = incrDate(targetDate, -(dayTagsEN.indexOf(getDayTag(targetDate))));
    relativeMonday = mondayDate;
}
getMondayDate();

function loadDayItems (date) {
    let model = document.getElementById('edt-item-day');
    let contenu = document.getElementById('list-item');
    
    while(contenu.firstChild) contenu.removeChild(contenu.firstChild);

    listeCours.forEach(function(element){
        if(element.date == date){
            let modelClone = model.cloneNode(true);

            modelClone.getElementsByClassName('lesson-Name')[0].innerHTML = element.matiere2;
            modelClone.getElementsByClassName('lesson-Name')[0].style.borderLeft = '3.5px solid ' + localStorage.getItem(element.matiere2.replace(/\s/, ''));
            modelClone.getElementsByClassName('lesson-Professor')[0].innerHTML = element.prof;
            modelClone.getElementsByClassName('lesson-Date-Start')[0].innerText = element.dateDebut;
            modelClone.getElementsByClassName('lesson-Date-End')[0].innerText = element.dateFin;
            modelClone.getElementsByClassName('lesson-Location-Number')[0].innerText = element.lieu.replace(/\s/, '');
            modelClone.getElementsByClassName('lesson-Location-Number')[0].style.color = localStorage.getItem(element.matiere2.replace(/\s/, ''));
            modelClone.style.display = 'block';

            contenu.appendChild(modelClone);
        }
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

function loadMonthItems () {
    let model = document.getElementById('edt-item-week');
    let contenu = document.getElementById('list-item');
    let nextMonday = mondayDate;

    while(contenu.firstChild) contenu.removeChild(contenu.firstChild);
    
    for (let i = 0; i < 4; i++) {
        nextMonday = incrDate(nextMonday, 6);
        let modelClone = model.cloneNode(true);

        modelClone.style.display = 'block';
        modelClone.getElementsByClassName('daytag')[0].innerHTML = 'du ' + incrDate(nextMonday, -6).slice(4,6) + ' au ' + nextMonday.slice(4,6);
        nextMonday = incrDate(nextMonday, 1);

        modelClone.onclick = function () {
            targetWeek = incrDate(mondayDate, i * 7);
            relativeMonday = targetWeek;
            loadWeekItems(targetWeek);
            changeCSS(document.getElementById('weekly'));
            getTime();
        };

        contenu.appendChild(modelClone);
    }
}

function fillListeCours (tab) {
    listeCours = tab;
}