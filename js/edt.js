function getTime () {
    let nDate = (new Date).toLocaleDateString('fr-FR', { 
        weekday: 'short',
        month: 'short',
        day: 'numeric' }
    );
    
    let date = nDate.slice(0,3)  + ', ' + nDate.slice(5,6) + ' ' + nDate.slice(7,11);
    let time = (new Date).toString().substr(16,5);

    document.getElementById('date').innerHTML = date;
    document.getElementById('time').innerHTML = time;

}