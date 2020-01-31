/**
 * Add the current date to HTML.
 */
function getTime () {
    let nDate = (new Date).toLocaleDateString('fr-FR', { 
        weekday: 'short',
        month: 'short',
        day: '2-digit'
    });
    
    let date = nDate.slice(0,3)  + ', ' + nDate.slice(5,7) + ' ' + nDate.slice(8,11);
    let time = (new Date).toString().substr(16,5);

    document.getElementById('date').innerHTML = date;
    document.getElementById('time').innerHTML = time;

}
setInterval(getTime, 1000);

/**
 * Load the login from the user from the LocalStorage.
 */
function loadLogin () {
    if (localStorage.getItem('login') === null) {
        let login = '';
        while (!(/^[a-z]{6}[1-2][0-9]$/.test(login))) {
            login = prompt('Votre Login ISEN', login);
        }
        localStorage.setItem('login', login);
    }
}
loadLogin();