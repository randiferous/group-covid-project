console.log("Hello world!")
console.log("Hello birds!")
console.log("Goodnight yall!")

var inputFormEl = document.querySelector("#input-form");
var inputFieldEl = document.querySelector("#input-country");
var formModalEl = document.querySelector("#form-modal");

var countryStorage = [];

// test local storage
var formSubmitHandler = function (event) {
    event.preventDefault();
    var countryInput = inputFieldEl.value.trim();
    console.log(countryInput);
    saveCountry(countryInput);

    if (countryInput) {
        inputFieldEl.value = "";
    } else {
        formModalEl.style.display = "flex";
        window.onclick = function (event) {
            formModalEl.style.display = "none";
        }
    }
};

// var saveCountry

// test api server fetch
var getCovidInfo = function (countryName) {
    var apiUrl = "https://disease.sh/v3/covid-19/countries/" + countryName;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
                displayCovidInfo(data);
            });
        }
    });
};

var displayCovidInfo = function (data) {
    var countryName = data.country;
    console.log(countryName);

    var activeCases = data.active;
    console.log(activeCases);

    var criticalCondition = data.critical;
    console.log(criticalCondition);

    var totalDeath = data.deaths;
    console.log(totalDeath);

    var totalRecovered = data.recovered;
    console.log(totalRecovered);

    var testing = data.tests;
    console.log(testing);
    
    var todayCases = data.todayCases;
    console.log(todayCases);

    var todayDeaths = data.todayDeaths;
    console.log(todayDeaths);

    var todayRecovered = data.todayRecovered;
    console.log(todayRecovered);

    var totalCases = data.cases;
    console.log(totalCases);
};

// getCovidInfo("Denmark");

inputFormEl.addEventListener("submit", formSubmitHandler);