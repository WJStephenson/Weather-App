const lightColors = [
    `#f2f2f2`, `#fff`, `#f2f2f2`, `#333`, `#2ecc71`
];
const darkColors = [
    `#2e2e2e`, `#0b0524`, `#38344c`, `#f8fef6`, `#8e93f0`
];
const colorVariables = [
    `--background-color`, `--body-background-color`, `--main-card-bg`, `--text-color`, `--button-color`
];
const button = document.getElementById('theme-button');
const lightModeIcon = `<i class="fa-regular fa-sun"></i>`;
const darkModeIcon = `<i class="fa-regular fa-moon"></i>`;

button.addEventListener('click', () => {
    setTheme();
});

window.addEventListener('load', () => {  
    let mode = sessionStorage.getItem('mode');
    if (mode === null) {
        mode = 'dark';
        setDarkMode();
    } else if (mode === 'dark') {
        setDarkMode();
    } else {
        setLightMode();
    }
});

function setTheme() {
    let mode = sessionStorage.getItem('mode');
    if (mode === 'dark') {
        setLightMode();
    } else {
        setDarkMode();
    }
}

function setDarkMode() {
    sessionStorage.setItem('mode', 'dark');
    button.innerHTML = darkModeIcon;
    for(let i = 0; i < darkColors.length; i++) {
        setStyleProperty(colorVariables[i], darkColors[i]);
    };
}


function setLightMode() {
    sessionStorage.setItem('mode', 'light');
    button.innerHTML = lightModeIcon;
    for(let i = 0; i < lightColors.length; i++) {
        setStyleProperty(colorVariables[i], lightColors[i]);
    };
}

function setStyleProperty(property, color) {
    document.documentElement.style.setProperty(property, color);
}