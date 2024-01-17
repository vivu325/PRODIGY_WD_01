function getWeather() {
    const locationInput = document.getElementById('location');
    const location = locationInput.value;

    if (location === '') {
        alert('Please enter a location.');
        return;
    }

    const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            alert('Error fetching weather data. Please try again.');
        });
}

function displayWeather(data) {
    const weatherInfoContainer = document.getElementById('weather-info');
    weatherInfoContainer.innerHTML = '';

    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;

    const weatherInfo = document.createElement('div');
    weatherInfo.innerHTML = `
        <h2>${cityName}</h2>
        <p>Temperature: ${temperature} &#8451;</p>
        <p>Condition: ${description}</p>
    `;

    weatherInfoContainer.appendChild(weatherInfo);
}