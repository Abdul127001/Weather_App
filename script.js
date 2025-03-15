const InputValue = document.querySelector('#search'),
CurrWeather  = document.querySelector('.current-weather');
const weatherCodes = {
    day:[1000],
    cloudy:[1003,1006,1009],
    weather:[1030,1135,1147],
    rainy: [1063,1150,1153,1168,1171,1180,1183,1198,1201,1240,1243,1246,1273,1276],
    rainy_7:[1186,1189,1192,1195,1243,1246],
    snow:[1066,1069,1072,1114,1117,1204,1207,1210,1213,1216,1219,1222,1225,1237,1249,1252,1255,1258,1261,1264,1279,1282],
    thunder:[1087,1279,1282],
    thunder_rain:[1273,1276]
}


const displayHourlyForecast = (h_data) => {

}

InputValue.addEventListener('keyup',(e)=>{
    // console.log(e.key)
const API_KEY = "2ce08207c8d945bbbc463740251403";
getWeatherDetails = async (c_name) => {
// console.log(c_name)
API_LINK = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${c_name}&days=2`;

try {
    const response = await fetch(API_LINK);
    const data = await response.json();
    console.log(data)
    const temp = Math.floor(data?.current?.temp_c);
    const desc = data?.current?.condition?.text;
    const weatherIMG = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data?.current?.condition?.code));
    const combinedDays = [...data?.forecast?.forecastday[0]?.hour, ...data?.forecast?.forecastday[1]?.hour]
    // console.log(combinedDays)
    displayHourlyForecast(combinedDays);
    CurrWeather.querySelector('.weather-img').src = `images/animated/${weatherIMG}.svg`;
    CurrWeather.querySelector('.temprature').innerHTML = `${temp}<span>℃</span>`;
    CurrWeather.querySelector('.description').innerText = `${desc}`;

} catch(error) {
console.log(error);
}

}


    
    const CityName = InputValue.value.trim();
    if(e.key == "Enter" && CityName) {
        getWeatherDetails(CityName);
    }
})
