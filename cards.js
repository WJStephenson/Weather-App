import { returnDay, returnMonth, returnWeekday } from "./date.js";
const timer = (ms) => new Promise((res) => setTimeout(res, ms));
const radioButtons = document.querySelectorAll("input[type=radio]");
const weatherCard = document.getElementById("weather-card");
let cardsLoaded = false;
let tempUnit = "°C";
let lastSearch = "";

radioButtons.forEach((radioButton) => {
  radioButton.addEventListener("change", updateTempUnit);
});

function setWeatherCardHeader(data, latitude, longitude) {
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

async function setWeatherCardDays(data, delay) {
  weatherCard.removechildren;
    for (let i = 0; i < 7; i++) {
      const weatherIcon = data.data[i].weather.icon;
      const icon = findIcon(weatherIcon);
      let lowTemp = data.data[i].low_temp;
      let highTemp = data.data[i].high_temp;
      const date = data.data[i].valid_date;
      const dayText = returnDay(date);
      const monthText = returnMonth(date);
      const weekdayText = returnWeekday(date);

      if (tempUnit === "°F") {
        lowTemp = Math.round((lowTemp * 9) / 5 + 32);
        highTemp = Math.round((highTemp * 9) / 5 + 32);
      }

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
            <p class="temp" id="low-temp">Low: ${lowTemp}${tempUnit} </p>
            <p class="temp" id="hight-temp">High: ${highTemp}${tempUnit}</p>
        </div>
      `;

      weatherCard.appendChild(newCard);

      void newCard.offsetWidth;

      newCard.classList.add("show");

      await timer(delay);
  } 
  cardsLoaded = true;
  lastSearch = data;
}

function findIcon(weatherIcon) {
  const iconURL = `https://cdn.weatherbit.io/static/img/icons/${weatherIcon}.png`;
  return iconURL;
}

function updateTempUnit() {
  if (cardsLoaded === false) {
    return;
  }

  if (radioButtons[0].checked === true) {
    tempUnit = "°C";
  } else {
    tempUnit = "°F";
  }

  removeWeatherCards().then(() => setWeatherCardDays(lastSearch, 100));
}

async function removeWeatherCards() {
  const cards = document.querySelectorAll(".card");

  for (let i = 0; i < cards.length; i++) {
    cards[i].classList.remove("show");
    await timer(100);
  };

  await timer(100);

  cards.forEach((card) => card.remove());

}

export { setWeatherCardHeader, setWeatherCardDays };
