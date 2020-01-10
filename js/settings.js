function colorPicker (id) {
    let colorp = document.getElementById('color-picker');
    document.getElementById('matiere-name').innerText = id;
    colorp.style.display = 'block';
    colorp.setAttribute('matiere', id.replace(/\s/, ''));
}

function closeColorPicker () {
    let colorp = document.getElementById('color-picker');
    colorp.style.display = 'none';
}

function selectColor (div) {
    let matiere = document.getElementById('color-picker').getAttribute('matiere');
    document.getElementById(matiere).style.backgroundColor = div.style.backgroundColor;
    localStorage.setItem(matiere, div.style.backgroundColor);
}

function changeLogin (l) {
    let login = l.value;
    if (checkLogin(login)) {
        localStorage.setItem('login', login);
    }
}

function checkLogin (login) {
    return(/^[a-z]{6}[1-2][0-9]$/.test(login));
}

function loadLogin () {
    document.getElementById("userlogin").placeholder = localStorage.getItem('login');
}
loadLogin();