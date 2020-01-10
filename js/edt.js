let listeCours = {};
let targetDate = 'Jan 06 2020';

function getCurrentDate () {
    let nDate = (new Date).toLocaleDateString('en-GB', { 
        day: 'numeric',
        month: 'short',
        year: 'numeric' }
    );
    return(formatDate(nDate));
}

function incrDate(pDate, number) {
    let date = new Date(pDate);
    date.setDate(date.getDate() + number);
    date = date.toLocaleDateString('en-GB', { 
        day: 'numeric',
        month: 'short',
        year: 'numeric' }
    );
    return(formatDate(date));
}

function getTime () {
    let nDate = new Date(targetDate).toLocaleDateString('fr-FR', { 
        weekday: 'short',
        month: 'short',
        day: 'numeric' }
    );
    
    let date = nDate.slice(0,3)  + ', ' + nDate.slice(5,7) + ' ' + nDate.slice(7,11);

    document.getElementById('date').innerHTML = date;
}

function getDayTag (date) {
    let cDate = new Date(date);
    return (cDate.toString().slice(0,3));
}

function formatDate (date) {
    let i = 0;
    let zero = ' ';
    
    if(parseInt(date.slice(0,2)) < 10) {
        i = 1;
        zero = ' 0';
    }

    return(
        date.slice(3-i,6-i).charAt(0).toUpperCase()
        + date.slice(3-i,6-i).charAt(1).normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        + date.slice(4-i,6-i).slice(1)
        + zero
        + date.slice(0,2-i)
        + ' '
        + date.slice(7-i,11-i)
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

function loadWeekItems () {
    let dayTags = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
    let dayTagsEN = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
    let targetDay = getDayTag(targetDate);
    
    let model = document.getElementById('edt-item-week');
    let contenu = document.getElementById('list-item');

    while(contenu.firstChild) contenu.removeChild(contenu.firstChild);

    for (let i = 0; i < 5; i++) {
        let modelClone = model.cloneNode(true);

        modelClone.childNodes[1].innerHTML = dayTags[i];
        modelClone.style.display = 'block';
        if (!(dayTagsEN.indexOf(targetDay) - i)) {
            modelClone.style.border = '1px solid white';
        }
        modelClone.onclick = function () {
            targetDate = incrDate(targetDate, -(dayTagsEN.indexOf(targetDay) - i));
            loadDayItems(targetDate);
            changeCSS(document.getElementById('daily'));
            getTime();
        };
        contenu.appendChild(modelClone);
    }
}

function loadDayItems (date) {
    let model = document.getElementById('edt-item-day');
    let contenu = document.getElementById('list-item');
    
    while(contenu.firstChild) contenu.removeChild(contenu.firstChild);

    listeCours.forEach(function(element){
        if(element.date == date){
            let modelClone = model.cloneNode(true);
            modelClone.childNodes[1].innerHTML = element.matiere2;
            modelClone.childNodes[1].style.borderLeft = '3.5px solid ' + localStorage.getItem(element.matiere2.replace(/\s/, ''));
            modelClone.childNodes[5].innerHTML = element.prof;
            modelClone.childNodes[7].firstElementChild.innerText = element.dateDebut;
            modelClone.childNodes[7].lastElementChild.innerText = element.dateFin;
            modelClone.childNodes[9].innerHTML = element.lieu;
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

function fillListeCours (tab) {
    listeCours = tab;
}