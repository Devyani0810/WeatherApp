const weather=document.querySelector(".weather");
const inputcity=document.querySelector(".inputcity");
const photo=document.querySelector(".photo");
const apikey="904da10ec8f850ed53eafa9962657bf1";

let useCelsius = true; // true = Celsius, false = Fahrenheit


weather.addEventListener("submit",async event => {

    event.preventDefault();

    const city = inputcity.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherinfo(weatherData);

        }
        catch(error){
            console.error(error);
            displayError(error);
        }

    }
    else{
        displayError("Please enter the city")
    }

}); 

async function getWeatherData(city){

    const apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`

    const response = await fetch(apiUrl);
    if(!response.ok){
        throw new Error("no weather data");
    }

    return await response.json();

}

function displayWeatherinfo(data){

    const{name:city,
        main:{temp,humidity},
        weather: [{description,id}]}=data;

    photo.textContent="";
    photo.style.display="flex";

    const cityw =document.createElement("h1");
    const tempw =document.createElement("p");
    const humidityw =document.createElement("p");
    const dataw =document.createElement("p");
    const emoji =document.createElement("p");
    const error =document.createElement("p");

    cityw.textContent=city;
    let tempC = temp - 273.15;
    let tempF = (tempC * 9/5) + 32;
    let displayedTemp;
    if (useCelsius) {
        displayedTemp = tempC.toFixed(1) + "°C";
    } else {
        displayedTemp = tempF.toFixed(1) + "°F";
    }
    
tempw.textContent = displayedTemp;

    humidityw.textContent=`Humidity: ${humidity}%`
    dataw.textContent=description;
    emoji.textContent=weatherEmoji(id);


    cityw.classList.add("cityw");
    tempw.classList.add("tempw");
    humidityw.classList.add("humidityw");
    dataw.classList.add("dataw");
    emoji.classList.add("emoji");


    photo.appendChild(cityw);
    photo.appendChild(tempw);
    photo.appendChild(humidityw);
    photo.appendChild(dataw);
    photo.appendChild(emoji);
}

function weatherEmoji(weatherId){

    switch(true){
        case(weatherId >=200 && weatherId < 300):
            return "⛈️";
        case(weatherId >=300 && weatherId < 400):
            return "🌧️";
        case(weatherId >=500 && weatherId < 600):
            return "🌧️";
        case(weatherId >=600 && weatherId < 700):
            return "❄️";
        case(weatherId >=700 && weatherId < 800):
            return "🌫️";
        case(weatherId==800):
            return "☀️";
        case(weatherId>=801 && weatherId<810):
            return "☁️";
        default:
            return "❓"

    }

}

function displayError(message){
    const error=document.createElement("p");
    error.textContent=message;
    error.classList.add("error");

    photo.textContent="";
    photo.style.display="flex";
    photo.appendChild(error);

}

const themeToggleBtn = document.getElementById("light-darktoggle");

themeToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        themeToggleBtn.textContent = "Switch to Light Mode";
    } else {
        themeToggleBtn.textContent = "Switch to Dark Mode";
    }
});

const unitToggleb = document.getElementById("unit-toggle");

unitToggleb.addEventListener("click", () => {
    useCelsius = !useCelsius;

    const city = inputcity.value;
    if (city) {
        getWeatherData(city)
            .then(data => displayWeatherinfo(data))
            .catch(error => displayError(error));
    }

    if (useCelsius) {
        unitToggleb.textContent = "Switch to °F";
    } 
        else {
        unitToggleb.textContent = "Switch to °C";
    }
});
