console.log("Hello world!")
console.log("Hello birds!")
console.log("Goodnight yall!")

var inputFormEl = document.querySelector("#input-form");
var inputFieldEl = document.querySelector("#input-country");

var formModalEl = document.querySelector("#form-modal");
var fetchModalEl = document.querySelector("#form-error-fetch");
var serverModalEl = document.querySelector("#form-error-server");

var countryList = document.querySelector("#country-list")

var countryNameTitleEl = document.querySelector("#country-name-title")
// create variables for placeholder elements
var displayCovidInfoEl = document.querySelector("#covid-info-display")
var countryStorage = [];

// form handler
var formSubmitHandler = function (event) {
    event.preventDefault();
    displayCovidInfoEl.innerHTML = ""
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
    searchHistory(countryInput);

    getCovidInfo(countryInput);
    countryInfo(countryInput);
};

var loadCountries = function () {
    var savedCountries = localStorage.getItem("countries");
    // if there are no countries, set countries to empty array and return out of function
    if (!savedCountries) {
        return false;
    }
    // parse into array of objects
    countryStorage = JSON.parse(savedCountries);

    for (var i = 0; i < countryStorage.length; i++) {
        var countryInput = countryStorage[i];
        searchHistory(countryInput)
    }
}

// view previously searched countries
var searchHistory = function (countryInput) {
    var countryListElement = document.createElement("li")
    var countryAnchor = document.createElement("a")
    countryAnchor.className = "has-text-light"
    countryAnchor.textContent = countryInput;
    countryListElement.appendChild(countryAnchor);
    countryList.appendChild(countryListElement);

    countryAnchor.addEventListener("click", eventHandler);
}

var eventHandler = function (event) {
    displayCovidInfoEl.innerHTML = ""
    getCovidInfo(event.target.textContent);
}

// test api server fetch
var getCovidInfo = function (countryName) {

    var apiUrl = "https://disease.sh/v3/covid-19/countries/" + countryName;
    fetch(apiUrl).then(function (response) {

        response.json().then(function (data) {
            console.log(data);
            displayCovidInfo(data);
        });
    });
};

var displayCovidInfo = function (data) {
    var countryName = data.country;
    countryNameTitleEl.textContent = countryName;

    // update textContent of elements with data
    var activeCases = data.active;
    var displayActiveCases = document.createElement("li");
    displayActiveCases.textContent = activeCases;
    displayCovidInfoEl.appendChild(displayActiveCases);

    var criticalCondition = data.critical;
    var displayCriticalCondition = document.createElement("li");
    displayCriticalCondition.textContent = criticalCondition;
    displayCovidInfoEl.appendChild(displayCriticalCondition);


    var totalDeath = data.deaths;
    var displayTotalDeath = document.createElement("li");
    displayTotalDeath.textContent = totalDeath;
    displayCovidInfoEl.appendChild(displayTotalDeath);

    var totalRecovered = data.recovered;
    var displayTotalRecovered = document.createElement("li");
    displayTotalRecovered.textContent = totalRecovered
    displayCovidInfoEl.appendChild(displayTotalRecovered);


    var testing = data.tests;
    var displayTesting = document.createElement("li");
    displayTesting.textContent = testing
    displayCovidInfoEl.appendChild(displayTesting);

    var todayCases = data.todayCases;
    var displayTodayCases = document.createElement("li");
    displayTodayCases.textContent = todayCases
    displayCovidInfoEl.appendChild(displayTodayCases);


    var todayDeaths = data.todayDeaths;
    var displayDeaths = document.createElement("li");
    displayDeaths.textContent = todayDeaths
    displayCovidInfoEl.appendChild(displayDeaths);

    var todayRecovered = data.todayRecovered;
    var displayTodayRecovered = document.createElement("li");
    displayTodayRecovered.textContent = todayRecovered
    displayCovidInfoEl.appendChild(displayTodayRecovered);

    var totalCases = data.cases;
    var displayTotalCases = document.createElement("li");
    displayTotalCases.textContent = totalCases
    displayCovidInfoEl.appendChild(displayTotalCases);
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
    var displayContinent = document.createElement("li");
    displayContinent.textContent = continent;
    displayCovidInfoEl.appendChild(displayContinent);

    var capital = data[0].capital[0];
    var displayCapital =document.createElement("li");
    displayCapital.textContent = capital;
    displayCovidInfoEl.appendChild(displayCapital);

    var population = data[0].population;
    var displayPopulation = document.createElement("li");
    displayPopulation.textContent = population;
    displayCovidInfoEl.appendChild(displayPopulation);

    var languages = data[0].languages;
    var languageObject = Object.values(languages);
    var languageName = languageObject[0];
    var displayLanguageName = document.createElement("li");
    displayLanguageName.textContent = languageName;
    displayCovidInfoEl.appendChild(displayLanguageName);


    var flag = data[0].flag;
    console.log(flag);

    var currency = data[0].currencies;
    var currencyObject = Object.values(currency);
    var currencyName = currencyObject[0].name;
    var displayCurrency = document.createElement("li");
    displayCurrency.textContent = currencyName;
    displayCovidInfoEl.appendChild(displayCurrency)

    var subregion = data[0].subregion;
    var displaySubregion = document.createElement("li");
    displaySubregion.textContent = subregion;
    displayCovidInfoEl.appendChild(displaySubregion);
    
}

inputFormEl.addEventListener("submit", formSubmitHandler);

loadCountries();