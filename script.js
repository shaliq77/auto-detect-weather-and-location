const apiKey = 'fbfd367afb21a6fac171863f6931e58f';
const weatherInfo = document.getElementById('weather-info');
const cityInput = document.getElementById('city-input');


function getUserLocation() {
    fetch('https://ipapi.co/json/')
        .then(response => response.json())
        .then(data => {
            const city = data.city;
            cityInput.value = city; 
            getWeather();
        })
        .catch(error => {
            console.error('Error fetching user location:', error);
            alert('Error fetching user location. Please enter a city manually.');
        });
}


function getWeather() {
    const city = cityInput.value;

    if (!city) {
        alert('Please enter a city.');
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            
            if (data.cod !== 200) {
                alert(`Error: ${data.message}`);
                return;
            }

            
            const weatherDescription = data.weather[0].description;
            const temperature = (data.main.temp - 273.15).toFixed(2); 
            const cityName = data.name;

            weatherInfo.innerHTML = `
                <p>City: ${cityName}</p>
                <p>Temperature: ${temperature} °C</p>
                <p>Description: ${weatherDescription}</p>
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}


window.onload = getUserLocation;
