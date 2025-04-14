document.addEventListener('DOMContentLoaded', ()=>{
    const cityInput = document.getElementById("city-input");
    const getWeatherBtn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById("weather-info");
    const cityNameDisplay = document.getElementById("city-name");
    const temperatureDisplay = document.getElementById("temperature");
    const descriptionDisplay= document.getElementById("description");
    const errorMessage= document.getElementById("error-message");
    const API_KEY = "4735e7914ca9bbe85e9e21a1c2bc4e95";

    getWeatherBtn.addEventListener('click', async ()=>{
        const city = cityInput.value.trim()
        if(!city) return;


        try{
            const data= await fetchWeatherData(city);
            displayWeatherData(data);
        }
        catch(error){
            showError()
        }
    })

    async function fetchWeatherData(city){
        const url =`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
       
        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE", response);
        if(!response.ok){
            throw new Error("City not found");
        }
        // we are converting the data of the response into a JSON which will be then read by the displayweather data funciton
        const data= await response.json()
         return data;

    }
     
    function displayWeatherData (data){
        // console.log(data);
        const {name, main, weather}= data;
        cityNameDisplay.textContent= name;
        temperatureDisplay.textContent = ` Temperature : ${main.temp}`
        descriptionDisplay.textContent = ` Weather: ${weather[0].description}`

        //unlock the display
        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden')
    }

    function showError(){
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }
});