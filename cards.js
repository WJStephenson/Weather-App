import { returnDay, returnMonth, returnWeekday } from './date.js';
const tempArr = [];
const timer = ms => new Promise(res => setTimeout(res, ms))
const radioButtons = document.querySelectorAll("input[type=radio]");
let cardsLoaded = false;

for (const radioButton of radioButtons) {
    radioButton.addEventListener('change', updateTempUnit);
}

function setWeatherCardHeader(data, latitude, longitude, weatherCard) {
    const city = data.city_name;
    const country = data.country_code;
    weatherCard.innerHTML = `
            <div class="card-head-info fade-in">
                <p class="city">${city}, ${country}</p>
                <p class="lat-lon" id="lat-lon">Lat: ${latitude}, Lon: ${longitude}</p>
            </div>`;

    const weatherHeader = document.querySelector(".card-head-info");

    void weatherCard.offsetWidth;

    weatherHeader.classList.add("show");
}

async function setWeatherCardDays(data, weatherCard) {
    tempArr.length = 0;
    for (let i = 0; i < data.data.length; i++) {
        const weatherIcon = data.data[i].weather.icon;
        const icon = findIcon(weatherIcon);
        const lowTemp = data.data[i].low_temp;
        const highTemp = data.data[i].high_temp;
        const date = data.data[i].valid_date;
        const dayText = returnDay(date);
        const monthText = returnMonth(date);
        const weekdayText = returnWeekday(date);
        console.log(weekdayText);

        const newCard = document.createElement("div");
        newCard.className = "card fade-in";
        newCard.innerHTML = `
        <div class="card-date">
            <p class="date">${weekdayText}</p>
            <p class="day">${dayText}</p>
            <p class="date">${monthText}</p>
        </div>
        <img src="${icon}" alt="weather icon">
        <div class="card-info">
            <p class="temp" id="low-temp">Low: ${lowTemp}</p>
            <p class="temp" id="hight-temp">High: ${highTemp}°C</p>
        </div>
      `;

        weatherCard.appendChild(newCard);

        void newCard.offsetWidth;

        newCard.classList.add("show");

        await timer(100);
    }
    cardsLoaded = true;
}

function findIcon(weatherIcon) {
    const iconURL = `https://cdn.weatherbit.io/static/img/icons/${weatherIcon}.png`
    return iconURL;
}

function updateTempUnit() {
    if (cardsLoaded === false) return;

    const lowTemp = document.getElementById("low-temp");
    const highTemp = document.getElementById("high-temp");

    if (this.value === "C") {
        console.log("C");
    } else {
        console.log("F");
    }
}

export { setWeatherCardHeader, setWeatherCardDays };

