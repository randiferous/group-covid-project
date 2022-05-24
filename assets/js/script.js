console.log("Hello world!")
console.log("Hello birds!")
console.log("Goodnight yall!")

var inputFormEl = document.querySelector("#input-form");
var inputFieldEl = document.querySelector("#input-country");
var formModalEl = document.querySelector("#form-modal");

var countryStorage = [];

// form handler
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

// test local storage
var saveCountry = function (countryInput) {
    countryStorage.push(countryInput)
    localStorage.setItem("countries", JSON.stringify(countryStorage))
};

<<<<<<< HEAD
 }
<<<<<<< HEAD

 var loadCountries = function() {
     var savedCountries = localStorage.getItem("countryStorage");
     // if there are no countries, set countries to empty array and return out of function
     if (!savedCountries) {
         return false;
     }

     // parse into array of objects
     countryStorage = JSON.parse(savedCountries);

     console.log(countryStorage);
 }



=======
>>>>>>> 1324f315a2ad2710cab9aa973b1746b32f190620
=======
var loadCountries = function () {
    var savedCountries = localStorage.getItem("countries");
    // if there are no countries, set countries to empty array and return out of function
    if (!savedCountries) {
        return false;
    }
    // parse into array of objects
    countryStorage = JSON.parse(savedCountries);
    console.log(countryStorage);
}
>>>>>>> ca09b5582a6be78d438182c0fbcba30f5fd8fed7

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

// testing second api fetch
var countryInfo = function (countryName){
    var apiUrl ="https://restcountries.com/v3.1/name/" + countryName;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            });
        }
    });
};

// make data variables to display in function as follows; Continents, Capitals, Populations, Language, timezones, flag, currency, sub-region

inputFormEl.addEventListener("submit", formSubmitHandler);

<<<<<<< HEAD
inputFormEl.addEventListener("submit", formSubmitHandler);

loadCountries();
=======
loadCountries();
countryInfo("France");
>>>>>>> ca09b5582a6be78d438182c0fbcba30f5fd8fed7
