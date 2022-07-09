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
            //apend results in DOM
            $('#current').html(curWeatherHTML);
            //lat lon for UV from Open Weather
            let lat = response.coord.lat;
            let lon = response.coord.lon;
            let uvQURL = "api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + lon + "&APPID=" + apiKey;
            //fetch for UV
            fetch(uvQURL)
            .then(handleErrors)
            .then((response) =>{
                return response.json();
            })
            .then((response)=>{
                index = response.value;
                $('#index').html(`UV Index: <span id = '#UV'> ${index}</span`);
                if (index>=0 && index<3){
                    $('#UV').attr('class', 'uv-favorable');

                }else if (index>=3 && index<8){
                    $('#UV').attr('class', 'uv-modarate');

                }else if (index>=8){
                    $('#UV').attr('class', 'uv-severe');
                }
            });
        })
}
            //function to get 5day forecast and render to HTML
            var getFiveDay = (event)=>{
                let city = $('#city').val();
                //API search
                let qURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial" + "&APPID=" + apiKey;
                // initiate fetch from API
                fetch(qURL)
                .then(handleErrors)
                .then((response) =>{
                    returnresponse.json()
                })
                .then ((response) =>{
                    //create HTMl element with 5 day forecast
                    let fiveDayHTML =`
                    <h2>5 Day Forecast:</h2>
                    <div id= 'five day' class = 'd-inline-flex flex-wrap'>`;
                    //loop for 5 day forecast and display to html
                    for ( let i = 0; i < responselist.length; i++){
                        let day = response.list[i];
                        let dayTime = day.dt;
                        let timeZone = response.city.timezone;
                        let timeZoneHours = timeZone / 60 / 60;
                        let nowMoment = moment.unix(dayTime).utc().utcOffset(timeZoneHours);
                        let picURL = "https://openweathermap.org/img/w/" + day.weather[0].icon + ".png";
                        // forecast set only for mid day
                        if (nowMoment.format('HH:mm:ss') === '11:00:00' || nowMoment.format('HH:mm:ss') === '12:00:00' || nowMoment.format('HH:mm:ss') === '13:00:00') {
                            fiveDayHTML += `
                            <div class= 'weather-card card m-2 p0'>
                            <ul class = 'list p-3'>
                            <li>${nowMoment.format('MM/DD/YY')}</li>
                            <li class= 'weather'><img src='${picURL}'></li>
                            <li>Temp: ${day.main.temp}&#8457;</li>
                            <br>
                            <li>Humidity: ${day.mai.humidity}%</li>
                            </ul>
                            </div>`;
                        }
                    }
                    //HTMl template
                    fiveDayHTML += `</div>`;
                    //five day append
                    $('#five-day').html(fiveDayHTML);
                })
            }
            //function for save into local storage
            var sCity = (nCity)=>{
                let cityOld = false;
                //if already in storage
                for (let i = 0; i< localStorage.length; i++) {
                    if (localstorage['cities' + i] === nCity) {
                        cityOld = true;
                        break;
                    }
                }
                //save new city
                if (cityOld === false){
                    localStorage.setItem('cities' + localStorage.length, nCity);
                }
            }
            