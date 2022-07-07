// Set global variables, including Open Weather Maps API Key
var apiKey = "015dfb7f23707146caf5c855b7d20c55";
var currentCity = "";
var lastCity = "";

// Error handler for fetch
var handleErrors = (response) => {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

