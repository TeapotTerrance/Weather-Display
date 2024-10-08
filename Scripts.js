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

        //Defining the variables for the display

        function generalDisplayData(){
            const temperature = data.main.temp;
            const humidity = data.main.humidity;
            const feelsLike = data.main.feels_like;
            const visibilityKm = data.visibility/1000;


            temperatureHTML.innerHTML += '\n' + temperature + '&#xb0;c';
            humidityHTML.innerHTML += '\n' + humidity + '%';
            feelsLikeHTML.innerHTML += '\n' + feelsLike + '&#xb0;c';
            visibiltyHTML.innerHTML += '\n' + visibilityKm +'km';
        };
        generalDisplayData();
        

        function sunriseTime(){
            let sunriseUNIX = data.sys.sunrise;
        
            const sunriseHTML = document.getElementById("sunriseTime");
        
            var sunrise = new Date(sunriseUNIX * 1000);
            var hours = sunrise.getHours().toString().padStart(2, "0");
            var minutes = sunrise.getMinutes().toString().padStart(2, "0");
            var seconds = sunrise.getSeconds().toString().padStart(2, "0");

            var sunriseFormatted = hours + ":" + minutes + ":" + seconds;
            sunriseHTML.innerHTML = sunriseFormatted;
        };
        sunriseTime();
        
        function sunsetTime(){
            let sunsetUNIX = data.sys.sunset;

            const sunsetHTML = document.getElementById("sunsetTime");
        
            var sunset = new Date(sunsetUNIX * 1000);
            var hours = sunset.getHours().toString().padStart(2, "0");
            var minutes = sunset.getMinutes().toString().padStart(2, "0");
            var seconds = sunset.getSeconds().toString().padStart(2, "0");

            var sunsetFormatted = hours + ":" + minutes + ":" + seconds;
            sunsetHTML.innerHTML = sunsetFormatted;
        };
        sunsetTime();
        
        
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

let dayPercentage = (currentTimeInSeconds/86400)*100;
console.log(dayPercentage);

root = document.documentElement;
root.style.setProperty("--negative-delay", startAnimation + "s");


//Animating the display
document.addEventListener("DOMContentLoaded",domLoaded,false);
function domLoaded(){

    

    const canvas = document.getElementById("canvasSunMoon");
    const ctx = canvas.getContext("2d");
    ctx.translate(canvas.width/2,canvas.height/2);


    function ellipsePath(){
        ctx.save();
        ctx.beginPath();
        ctx.ellipse(0, 0, 340, 50, Math.PI / 1, 0, 2 * Math.PI);
        ctx.setLineDash([5,5]);
        ctx.strokeStyle = "white";
    
        ctx.stroke();
        ctx.restore();
    };
    ellipsePath();

    function drawSun(){
        ctx.save();
        ctx.beginPath();
        ctx.translate(0,0);
        
        ctx.fillStyle = "orange";
        ctx.arc(0, 0, 40, 0, 2*Math.PI, false);
        ctx.fill();
        ctx.restore();
        
    };
    drawSun();

    function drawMoon(){

    }
}

