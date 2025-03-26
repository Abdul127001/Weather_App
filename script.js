const InputValue = document.querySelector('#search'),
CurrWeather  = document.querySelector('.current-weather'),
LocationBTN = document.querySelector('.location-group'),
WeatherList = document.querySelector('.hourly-weather .weather-list');
const API_KEY = "2ce08207c8d945bbbc463740251403";
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
    const currentTime = new Date().setMinutes(0, 0, 0);
    const next24Hours = currentTime + 24 * 60 * 60 * 1000;

    const next24HoursData = h_data.filter(({time})=> {
        const forcastTime = new Date(time).getTime();
        return forcastTime >= currentTime && forcastTime <= next24Hours;
    })
    // console.log(next24HoursData)

    WeatherList.innerHTML = next24HoursData.map(item => {
    const temp =  Math.floor(item?.temp_c);
    const time = item?.time.split(" ")[1].substring(0,5);
    const weatherIMG = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(item?.condition?.code));
    
        return `<li>
                            <p class="time">${time}</p>
                            <img src="images/animated/${weatherIMG}.svg" alt="weather-img">
                            <p class="temprature">${temp}<span>°</span></p>
                        </li>`

    }).join("");

    console.log(next24HoursData);

    
}

InputValue.addEventListener('keyup',(e)=>{
    // console.log(e.key)

getWeatherDetails = async (API_LINK) => {
// console.log(c_name)

try {
    const response = await fetch(API_LINK);
    const data = await response.json();
    // console.log(data)
    const temp = Math.floor(data?.current?.temp_c);
    const desc = data?.current?.condition?.text;
    const weatherIMG = Object.keys(weatherCodes).find(icon => weatherCodes[icon].includes(data?.current?.condition?.code));
    const combinedDays = [...data?.forecast?.forecastday[0]?.hour, ...data?.forecast?.forecastday[1]?.hour];
    // console.log(combinedDays)
    displayHourlyForecast(combinedDays);
    CurrWeather.querySelector('.weather-img').src = `images/animated/${weatherIMG}.svg`;
    CurrWeather.querySelector('.temprature').innerHTML = `${temp}<span>℃</span>`;
    CurrWeather.querySelector('.description').innerText = `${desc}`;

} catch(error) {
console.log(error);
}

}

    const getWeatherDetailsByCity = (CityName) => {
        API_LINK = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${CityName}&days=2`;
        getWeatherDetails(API_LINK);
    }

    const CityName = InputValue.value.trim();
    if(e.key == "Enter" && CityName) {
        getWeatherDetailsByCity(CityName);
    }
})


LocationBTN.addEventListener('click', () => {
    navigator.geolocation.getCurrentPosition(position => {
        console.log(position);
        const {latitude, longitude} = position.coords;
        // console.log(latitude, longitude);
        API_LINK = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${latitude},${longitude}&days=2`;
        getWeatherDetails(API_LINK);


    }, error => {
        alert("Your browser disabling the location, Please enbale the location.")
    })
})