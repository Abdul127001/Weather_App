const InputValue = document.querySelector('#search');


InputValue.addEventListener('keyup',(e)=>{
    // console.log(e.key)
const API_KEY = "2ce08207c8d945bbbc463740251403";
getWeatherDetails = async (c_name) => {
// console.log(c_name)
API_LINK = `http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${c_name}`;

try {
    const response = await fetch(API_LINK);
    const data = await response.json();
    
    console.log(data)

} catch(error) {
console.log(error);
}

}


    
    const CityName = InputValue.value.trim();
    if(e.key == "Enter" && CityName) {
        getWeatherDetails(CityName);
    }
})
