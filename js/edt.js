function getTime () {
    let nDate = (new Date).toLocaleDateString('fr-FR', { 
        weekday: 'short',
        month: 'short',
        day: 'numeric' }
    );
    
    let date = nDate.slice(0,3)  + ', ' + nDate.slice(5,6) + ' ' + nDate.slice(7,11);

    document.getElementById('date').innerHTML = date;
}