const weatherIcons = {
    rain: `<i class="fa-solid fa-cloud-rain"></i>`,
    snow: `<i class="fa-solid fa-snowflake"></i>`,
    clear: `<i class="fa-solid fa-sun"></i>`,
    clouds: `<i class="fa-solid fa-cloud"></i>`,
    thunderstorm: `<i class="fa-solid fa-bolt"></i>`,
    fog: `<i class="fa-solid fa-cloud-fog"></i>`,
};

const API_KEY = "a19963b4d1ac49e697f12a5e8a6fea79";
const weatherCard = document.getElementById("weather-card");


function latLon() {
    console.log("button clicked");
    const input = document.getElementById("search");
    fetch("https://geocode.maps.co/search?q=" + input.value)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const latitude = data[0].lat;
            const longitude = data[0].lon;
            console.log(longitude, latitude);
            getWeather(longitude, latitude);
        });
}

function getWeather(longitude, latitude) {
    fetch("https://api.weatherbit.io/v2.0/forecast/daily?lat=" + latitude + "&lon=" + longitude + "&key=" + API_KEY + "&days=7")
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const city = data.city_name;
            const country = data.country_code;
            weatherCard.innerHTML = `
            <div class="card-head-info">
                <p class="city">${city}, ${country}</p>
                <p class="lat-lon" id="lat-lon">Lat: ${latitude}, Lon: ${longitude}</p>
            </div>`;
            for (let i = 0; i < data.data.length; i++) {
                const weather = data.data[i].weather.description;
                const weatherIcon = data.data[i].weather.icon;
                const icon = findIcon(weatherIcon);
                const lowTemp = data.data[i].low_temp;
                const highTemp = data.data[i].high_temp;
                const date = data.data[i].valid_date;
                const dayText = returnDay(date);
                const monthText = returnMonth(date);
                weatherCard.innerHTML += `
                <div class="card">
                    <div class="card-date">
                        <p class="day">${dayText}</p>
                        <p class="month">${monthText}</p>
                    </div>
                    <img src="${icon}" alt="weather icon">
                    <div class="card-info">
                        <p class="temp">Low: ${lowTemp}</p>
                        <p class="temp">High: ${highTemp}°C</p>
                    </div>
                </div>`;
            }
        })
    //.catch(err => alert("Location not found"));
}


function findIcon(weatherIcon) {
    const iconURL = `https://cdn.weatherbit.io/static/img/icons/${weatherIcon}.png`
    return iconURL;
}

function returnMonth(date) {
    const dateObj = new Date(date);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[dateObj.getMonth()];
    return month;
}

function returnDay(date) {
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, "0");
    return day;
}