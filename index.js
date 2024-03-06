


const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "34b85c75e5b1e5845e4fd93d412ff953";





weatherForm.addEventListener("submit", async Event => {

    Event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);


        }
        catch(error){
            console.error(error);
            displayError(error);


        }


    }
    else{
        displayError("Por favor, digite uma cidade.")
    }

});

async function getWeatherData(city){

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt&appid=${apiKey}`;

    const response = await fetch(apiUrl);
    console.log(response)

    if(!response.ok){
        throw new Error("Could not fetch weather data");

    }

    return await response.json();



}

function displayWeatherInfo(data){

    const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.visibility = "visible";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Umidade: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);
    
    
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji")

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji)

}

function getWeatherEmoji(weatherId){

    switch(true){
        case (weatherId >= 200 && weatherId < 300):
            return "⛈️🌩️";
        case (weatherId >= 300 && weatherId < 400):
            return "☔🌂"
        case (weatherId >= 500 && weatherId < 600):
            return "☔🌧️"
        case (weatherId >= 600 && weatherId < 700):
            return "🥶❄️"
        case (weatherId >= 700 && weatherId < 771):
            return "🌫️🌫️"
        case (weatherId >= 771 && weatherId < 800):
            return "🌪️🌪️"
        case (weatherId === 800):
            return "🌞😎"
        case (weatherId >= 801 && weatherId < 803):
            return "🌤️🌤️"
        case (weatherId >= 803 && weatherId <= 804):
            return "🌥️☁️"
        default:
            return "🤔❓"

    }


}

function displayError(message){

    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.visibility = "visible";
    card.appendChild(errorDisplay);

}