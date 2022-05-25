console.log("Hello world!")
console.log("Hello birds!")
console.log("Goodnight yall!")

var inputFormEl = document.querySelector("#input-form");
var inputFieldEl = document.querySelector("#input-country");

var formModalEl = document.querySelector("#form-modal");
var fetchModalEl = document.querySelector("#form-error-fetch");
var serverModalEl = document.querySelector("#form-error-server");

var countryNameTitleEl = document.querySelector("#country-name-title")

var countryStorage = [];

// form handler
var formSubmitHandler = function (event) {
    event.preventDefault();
    var countryInput = inputFieldEl.value.trim();
    console.log(countryInput);
    confirmCountryName(countryInput);

    if (countryInput) {
        inputFieldEl.value = "";
    } else {
        formModalEl.style.display = "flex";
        window.onclick = function (event) {
            formModalEl.style.display = "none";
        }
    }
};

var confirmCountryName = function (countryInput) {
    var apiUrl = "https://disease.sh/v3/covid-19/countries/" + countryInput;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            saveCountry(countryInput);
        } else {
            fetchModalEl.style.display = "flex";
            window.onclick = function (event) {
                fetchModalEl.style.display = "none";
            }
        }
    })
        .catch(function (error) {
            serverModalEl.style.display = "flex";
            window.onclick = function (event) {
                serverModalEl.style.display = "none";
            }
        })
}

// test local storage
var saveCountry = function (countryInput) {
    countryStorage.push(countryInput)
    localStorage.setItem("countries", JSON.stringify(countryStorage))

    getCovidInfo(countryInput);
};

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
    countryNameTitleEl.textContent = countryName;

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
var countryInfo = function (countryName) {
    var apiUrl = "https://restcountries.com/v3.1/name/" + countryName;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                displayCountryInfo(data);
            });
        }
    });
};

// make data variables to display in function as follows; Continents, Capitals, Populations, Language, timezones, flag, currency, sub-region
var displayCountryInfo = function (data) {
    var continent = data[0].continents[0];
    console.log(continent);

    var capital = data[0].capital[0];
    console.log(capital);

    var population = data[0].population;
    console.log(population);

    var languages = data[0].languages;
    var languageObject = Object.values(languages);
    var languageName = languageObject[0];
    console.log(languageName);

    var timezones = data[0].timezones[6];
    console.log(timezones);

    var flag = data[0].flag;
    console.log(flag);

    var currency = data[0].currencies;
    var currencyObject = Object.values(currency);
    var currencyName = currencyObject[0].name;
    console.log(currencyName);

    var subregion = data[0].subregion;
    console.log(subregion);
}

inputFormEl.addEventListener("submit", formSubmitHandler);

loadCountries();
// countryInfo();