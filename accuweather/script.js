const city = document.getElementById('citySearch');
const button = document.getElementById('submitSearch');

const weather = document.querySelector('.current-weather');
const temperature = document.querySelector('.current-temperature');
const wIcon = document.querySelector('.current-weatherIcon');
const windSpd = document.querySelector('.wind-speed');
const pressureMBar = document.querySelector('.pressure');
const visibilityKm = document.querySelector('.visibility');

const ApiKey = 'VGxZwfuvc0gbIfaTUkmZRYbqGK3zu8Fd';

async function getCityId(city){
    try{
        var response = await fetch(`http://dataservice.accuweather.com/locations/v1/cities/search?apikey=${ApiKey}&q=${city}`);
        var data = await response.json();
        return data;
    }catch(err){
        console.error(err);
    }
}

async function getWeather(cityKey){
    try{
        var response = await fetch(`http://dataservice.accuweather.com/currentconditions/v1/${cityKey}?apikey=${ApiKey}&details=true`);
        var data = await response.json();
        return data;
    }catch(err){
        console.error(err);
    }
}

const weatherState = Object.freeze({
    1: "./weather-images/01-s.png",
    2: "./weather-images/02-s.png",
    3: "./weather-images/03-s.png",
    4: "./weather-images/04-s.png",
    5: "./weather-images/05-s.png",
    6: "./weather-images/06-s.png",
    7: "./weather-images/07-s.png",
    8: "./weather-images/08-s.png",
    11: "./weather-images/11-s.png",
    12: "./weather-images/12-s.png",
    13: "./weather-images/13-s.png",
    14: "./weather-images/14-s.png",
    15: "./weather-images/15-s.png",
    16: "./weather-images/16-s.png",
    17: "./weather-images/17-s.png",
    18: "./weather-images/18-s.png",
    19: "./weather-images/19-s.png",
    20: "./weather-images/20-s.png",
    21: "./weather-images/21-s.png",
    22: "./weather-images/22-s.png",
    23: "./weather-images/23-s.png",
    24: "./weather-images/24-s.png",
    25: "./weather-images/25-s.png",
    26: "./weather-images/26-s.png",
    29: "./weather-images/29-s.png",
    30: "./weather-images/30-s.png",
    31: "./weather-images/31-s.png",
    32: "./weather-images/32-s.png",
    33: "./weather-images/33-s.png",
    34: "./weather-images/34-s.png",
    35: "./weather-images/35-s.png",
    36: "./weather-images/36-s.png",
    37: "./weather-images/37-s.png",
    38: "./weather-images/38-s.png",
    39: "./weather-images/39-s.png",
    40: "./weather-images/40-s.png",
    41: "./weather-images/41-s.png",
    42: "./weather-images/42-s.png",
    43: "./weather-images/43-s.png",
    44: "./weather-images/44-s.png",

});

button.addEventListener('click', ()=>{
    var searchCity = city.value;

    getCityId(searchCity).then(cityKey =>{
        getWeather(cityKey[0].Key).then(cityData =>{
            console.log(cityData);
            const mapData = cityData.map((data)=>({
                temperatureC: data.Temperature.Metric.Value,
                weatherText: data.WeatherText,
                weatherIcons : data.WeatherIcon,
                windSpeed : data.Wind.Speed.Metric.Value,
                windDirection : data.Wind.Direction.English,
                pressure : data.Pressure.Metric.Value,
                visibility: data.Visibility.Metric.Value,
            }));

            console.log(mapData);

            weather.innerHTML = mapData[0].weatherText;
            temperature.innerHTML = mapData[0].temperatureC + "c";
            wIcon.src = weatherState[mapData[0].weatherIcons];
            windSpd.innerHTML = mapData[0].windSpeed + "km/h " + " Direction: " + mapData[0].windDirection;
            pressureMBar.innerHTML = mapData[0].pressure + " mBar";
            visibilityKm.innerHTML = mapData[0].visibility + " km";
            
            const icons = document.querySelectorAll('.fa-solid');
            icons.forEach(icon =>{
                icon.classList.remove('hidden');
            })
        })
    })
})