

// Return input info and element info so they can be queried and assigned to constants
const weatherForm = document.querySelector(".weatherForm");
const cityInput = document.querySelector(".cityInput");
const card = document.querySelector(".card");
const apiKey = "34b85c75e5b1e5845e4fd93d412ff953";






// async = "Asynchronous programming is a technique that enables your program 
// to start a potentially long-running task and still be able to be responsive to other events while that task runs, 
// rather than having to wait until that task has finished. 
// Once that task has finished, your program is presented with the result." 
// (https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Introducing)


// Adds EventListener to the submit button that initates all of the following weather functions
weatherForm.addEventListener("submit", async Event => {

    // preventDefault because the default event is to refresh the page
    Event.preventDefault();

    // const city will be appended to the api URL
    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city); 
            
            // The await operator is used to wait for a Promise 
            // and get its fulfillment value. It can only be used inside an async function 
            // or at the top level of a module. source cited above ^
            
            displayWeatherInfo(weatherData);


        }
        catch(error){
            console.error(error);
            displayError(error);
            // If there is a specific error display on console and on card

        }


    }
    else{ 
        displayError("Por favor, digite uma cidade.")
    }   // If there is any other error, assume form field was left blank

});

async function getWeatherData(city){

    // Appends the inputed city and our generated apiKey to the URL
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt&appid=${apiKey}`;

    // Print OpenWeather's response to console for info and debugging
    const response = await fetch(apiUrl);
    console.log(response)

    if(!response.ok){
        throw new Error("Could not fetch weather data");
        // throw statement commonly used to read the error instances from web APIs
    }

    return await response.json();



}

function displayWeatherInfo(data){

    
    // Assign weather data from OpenWeather API to const data
    
    const {name: city, 
        main: {temp, humidity}, 
        weather: [{description, id}]} = data;

    
    // Ensures the card is invisible and not displaying an error message
    card.textContent = "";
    card.style.visibility = "visible";

    
    // Assign const to match the elements that I have already styled and formatted and create elements to hold the data
    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("p");
    const humidityDisplay = document.createElement("p");
    const descDisplay = document.createElement("p");
    const weatherEmoji = document.createElement("p");

    
    // Assign the corresponding data to each const of the elements and display received text
    cityDisplay.textContent = city;
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Umidade: ${humidity}%`;
    descDisplay.textContent = description;
    weatherEmoji.textContent = getWeatherEmoji(id);
    
    // Add the consts to their corresponding class lists so they can manipulate the content of that class (classList.add)
    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descDisplay.classList.add("descDisplay");
    weatherEmoji.classList.add("weatherEmoji")

    // Now that the consts are corresponding to their intended classes nested under the card class, 
    // append the content onto the card class.
    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descDisplay);
    card.appendChild(weatherEmoji)

}




function getWeatherEmoji(weatherId){

    
    // Reads weatherId value sent by OpenWeather, boolean expressions to output the corresponding emojis to weatherId
    
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

    // Creates a p element and outputs the error message to the errorDisplay class
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = message;
    errorDisplay.classList.add("errorDisplay");

    // To make sure the card is blank and becomes visible before appending
    card.textContent = "";
    card.style.visibility = "visible";
    card.appendChild(errorDisplay);

}