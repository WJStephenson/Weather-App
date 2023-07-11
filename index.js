import { API_KEY } from "./api.js";
import { setWeatherCardHeader, setWeatherCardDays } from "./cards.js";

const button = document.getElementById("button");
button.addEventListener("click", latLon);


function latLon() {
    const input = document.getElementById("search");
    fetch("https://geocode.maps.co/search?q=" + input.value)
        .then(response => response.json())
        .then(data => {
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            getWeather(longitude, latitude)
        })
        .catch(err => console.log(err));
}

function getWeather(longitude, latitude) {
    fetch("https://api.weatherbit.io/v2.0/forecast/daily?lat=" + latitude + "&lon=" + longitude + "&key=" + API_KEY + "&days=7")
        .then(response => response.json())
        .then(data => {
            setWeatherCardHeader(data, latitude, longitude);
            setWeatherCardDays(data, 100);
        })
        .catch(err => console.log(err));
}