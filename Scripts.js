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


    const ellipseSpeed = 0.0001;
    let radiusX = 340;
    let radiusY = 50;

    function draw(){

        //sun
        ctx.beginPath();

        ctx.clearRect(-canvas.width/2, -canvas.height/2, canvas.width, canvas.height);

        ctx.shadowColor = "orange";
        ctx.shadowBlur = 20;
        ctx.fillStyle = "orange";

        const sunCurrentAngle = Date.now() * ellipseSpeed;
        const sunEllipseX = radiusX * Math.cos(-sunCurrentAngle);
        const sunEllipseY = radiusY * Math.sin(-sunCurrentAngle);

        ctx.arc(sunEllipseX, sunEllipseY, 40, 0, 2*Math.PI, false);

        ctx.fill()
        

       //moon
        ctx.beginPath()
        ctx.shadowColor = "white";
        ctx.shadowBlur = 10;
        ctx.fillStyle = "white";

        const moonCurrentAngle = Date.now() * ellipseSpeed;
        const moonEllipseX = -(radiusX * Math.cos(-moonCurrentAngle));
        const moonEllipseY = -(radiusY * Math.sin(-moonCurrentAngle));

        ctx.arc(moonEllipseX, moonEllipseY, 40, 0, 2*Math.PI, false);
        ctx.fill();

        requestAnimationFrame(draw)
        
    };
    draw();

}
    
