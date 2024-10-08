// Defining API
const apiKey = 'c3f13c3fcad9acd7fe6a584d058075f4';
const apiURL = 'http://api.openweathermap.org/data/2.5/weather?lat=51.3781&lon=2.3597&appid=c3f13c3fcad9acd7fe6a584d058075f4&units=metric';

const temperatureHTML = document.getElementById('temperatureNumberBox');
const humidityHTML = document.getElementById('humidityNumberBox');
const feelsLikeHTML = document.getElementById('feelsLikeNumberBox');
const visibiltyHTML = document.getElementById('visibilityNumberBox');

fetch(apiURL)
    .then(response =>{
        if(!response.ok) {
            throw new Error('Response not ok.')
        }
        return response.json();
    })
    .then(data =>{
        const temperature = data.main.temp;
        const humidity = data.main.humidity;
        const feelsLike = data.main.feels_like;
        const visibilityKm = data.visibility/1000;


        temperatureHTML.innerHTML += '\n' + temperature + '&#xb0;c';
        humidityHTML.innerHTML += '\n' + humidity + '%';
        feelsLikeHTML.innerHTML += '\n' + feelsLike + '&#xb0;c';
        visibiltyHTML.innerHTML += '\n' + visibilityKm +'km';

        

        let sunriseUNIX = data.sys.sunrise;
        
        const sunriseHTML = document.getElementById("sunriseTime");
      
        var sunrise = new Date(sunriseUNIX * 1000);
        var hours = sunrise.getHours().toString().padStart(2, "0");
        var minutes = sunrise.getMinutes().toString().padStart(2, "0");
        var seconds = sunrise.getSeconds().toString().padStart(2, "0");

        var sunriseFormatted = hours + ":" + minutes + ":" + seconds;
        sunriseHTML.innerHTML = sunriseFormatted;


        let sunsetUNIX = data.sys.sunset;

        const sunsetHTML = document.getElementById("sunsetTime");
      
        var sunset = new Date(sunsetUNIX * 1000);
        var hours = sunset.getHours().toString().padStart(2, "0");
        var minutes = sunset.getMinutes().toString().padStart(2, "0");
        var seconds = sunset.getSeconds().toString().padStart(2, "0");

        var sunsetFormatted = hours + ":" + minutes + ":" + seconds;
        sunsetHTML.innerHTML = sunsetFormatted;
        
    })


//percentage of the day calculation

var currentTime = new Date();
let currentHours = currentTime.getHours();
let currentMinutes = currentTime.getMinutes();
let currentSeconds = currentTime.getSeconds();

let currentHoursInSeconds = currentHours*60*60;
let currentMinutesInSeconds = currentMinutes*60;

let currentTimeInSeconds = currentHoursInSeconds + currentMinutesInSeconds + currentSeconds;

console.log(currentTimeInSeconds);
let startAnimation = -(86400-currentTimeInSeconds);

let dayPercentage = (currentTimeInSeconds/86400)*100
console.log(startAnimation)

root = document.documentElement;
root.style.setProperty("--negative-delay", startAnimation + "s");