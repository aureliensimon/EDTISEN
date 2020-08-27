/**
 * Open the pop-up color picker.
 * @param {HTML} id the item the user click on.
 */
function colorPicker (id) {
    new KellyColorPicker({place : 'picker', input : 'color', size : 200});
    let colorp = document.getElementById('color-picker');
    document.getElementById('matiere-name').innerText = id;
    colorp.style.display = 'block';
    colorp.setAttribute('matiere', id.replace(/\s/, ''));
}

/**
 * Close the pop-up color picker.
 */
function closeColorPicker () {
    let colorp = document.getElementById('color-picker');
    colorp.style.display = 'none';
}

/**
 * Get selected color and store it in the localStorage
 * @param {HTML} pdate the initial date.
 */
function selectColor (div) {
    let matiere = document.getElementById('color-picker').getAttribute('matiere');
    document.getElementById(matiere).style.backgroundColor = div.style.backgroundColor;
    localStorage.setItem(matiere, div.style.backgroundColor);
    closeColorPicker();
}

/**
 * Put the login in the input when the user click on the input.
 */
function putPlaceholder (div) {
    div.value = localStorage.getItem('login');
}

/**
 * Store the new login in the localStorage.
 * @param {HTML} l the login input.
 */
function changeLogin (l) {
    let login = l.value;
    if (checkLogin(login)) {
        localStorage.setItem('login', login);
    }
}

/**
 * Check if a login is valid (Start with at least 3 char and end with al least 2 int).
 * @param {string} login the initial date.
 * @return {Boolean} whether the login is valid or not.
 */
function checkLogin (login) {
    return(/^[a-z]{3,}[0-9]{2,}$/.test(login));
}

/**
 * Load login in the HTML login input.
 */
function loadLogin () {
    document.getElementById("userlogin").placeholder = localStorage.getItem('login');
}
loadLogin();