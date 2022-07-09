// Set global variables, including Open Weather Maps API Key
var apiKey = "015dfb7f23707146caf5c855b7d20c55";
var curCity = "";
var preCity = "";

// Error  for fetch
var handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

// Function to get and display the current conditions
var getCurConditions = (event)=>{
    //get city name
    let city = $('#city').val();
    curCity = $('#city').val();
    //fetch for getting info from weatherAPI 
    let qURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial" + "&APPID=" + apiKey;
    fetch(qURL)
    .then(handleErrors)
    .then((response)=>{
        return response.json();
    })
    .then((response)=>{
        //save cit to local storage
        saveCity(city);
        $('error').text('');
        //current weather icon
        let curWeather="https://openweathermap.org/img/w/" + response.weather[0].icon + ".png";  
        //get current time
        let curTimeZone = response.timezone;
        let curTimeZoneHours = curTimeZone / 60 / 60;
        let curMoment = moment.unix(curTime).utc().utcOffset(curTimeZOneHours);
        //render list of cities
        renderCities();
        //get 5 day forecast
        getFiveDay(event);
        //change header text to selected city
        $('header-t').text(response.name);
        //create HTML for the search results
        letcurWeatherHTML = `
        <h3>${response.name} ${curmoment.format('(MM/DD/YY')}<img src='${curWeather}'></h3>
        <ul class='list'>
            <li>Temperature: ${response.main.temp}&#8457;</li>
            <li>Humidity: ${response.main.humidity}%</li>
            <li>Wind Speed: ${response.wind.speed}mph</li>
            <li> id='uv'>UV Index:</li>
            </ul>`;
    })
}