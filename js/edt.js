function matchDate () {
    let nDate = (new Date).toLocaleDateString('fr-FR', { 
        day: 'numeric',
        month: 'short',
        year: 'numeric' }
    );

    return(
        nDate.slice(3,6).charAt(0).toUpperCase() + nDate.slice(3,6).slice(1)
        + ' '
        + nDate.slice(0,2)
        + ' '
        + nDate.slice(8,12)
    );
}

function getTime () {
    let nDate = (new Date).toLocaleDateString('fr-FR', { 
        weekday: 'short',
        month: 'short',
        day: 'numeric' }
    );
    
    let date = nDate.slice(0,3)  + ', ' + nDate.slice(5,7) + ' ' + nDate.slice(7,11);

    document.getElementById('date').innerHTML = date;
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