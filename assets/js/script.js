console.log("Hello world!")
console.log("Hello birds!")
console.log("Goodnight yall!")

// element variables
var inputFormEl = document.querySelector("#input-form");
var inputFieldEl = document.querySelector("#input-country");

var formModalEl = document.querySelector("#form-modal");
var fetchModalEl = document.querySelector("#form-error-fetch");
var serverModalEl = document.querySelector("#form-error-server");
var repeatModalEl = document.querySelector("#repeat-modal");

var countryList = document.querySelector("#country-list")

var countryNameTitleEl = document.querySelector("#country-name-title")
var displayCovidInfoEl = document.querySelector("#covid-info-display")
var displayCovidInfoEl2 = document.querySelector("#covid-info-display2")
var displayCountryFlag = document.querySelector("#country-flag")
var countryInfoDisplay = document.querySelector("#country-info-display")
var countryInfoDisplay2 = document.querySelector("#country-info-display2")
var clearHistoryButton = document.querySelector("#clear-history")

var countryStorage = [];

// form handler
var formSubmitHandler = function (event) {
    event.preventDefault();
    displayCovidInfoEl.innerHTML = "";
    countryInfoDisplay.innerHTML= "";
    displayCovidInfoEl2.innerHTML= "";
    countryInfoDisplay2.innerHTML= "";
    countryNameTitleEl.innerHTML = "";
    displayCountryFlag.setAttribute("src", "");

    var countryInput = inputFieldEl.value.trim();
    console.log(countryInput);
    

    if (countryInput) {
        inputFieldEl.value = "";
        confirmCountryName(countryInput);
    } else {
        formModalEl.style.display = "flex";
        window.onclick = function (event) {
            formModalEl.style.display = "none";
        }
    }
};

// confirm country name and avoid duplicates
var confirmCountryName = function (countryInput) {
    var apiUrl = "https://disease.sh/v3/covid-19/countries/" + countryInput;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            checkDuplicate(countryInput);
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

var checkDuplicate = function (countryInput) {
    if (countryStorage.includes(countryInput)) {
        repeatModalEl.style.display = "flex";

        window.onclick = function (event) {
            repeatModalEl.style.display = "none";
        }
    } else {
        saveCountry(countryInput);
    }
}

// local storage functions
var saveCountry = function (countryInput) {
    countryStorage.push(countryInput)
    localStorage.setItem("countries", JSON.stringify(countryStorage))

    searchHistory(countryInput);
    getCovidInfo(countryInput);
    countryInfo(countryInput);
};

var loadCountries = function () {
    var savedCountries = localStorage.getItem("countries");
    if (!savedCountries) {
        return false;
    }

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
    countryAnchor.textContent = countryInput;
    countryListElement.appendChild(countryAnchor);
    countryList.appendChild(countryListElement);

    countryAnchor.addEventListener("click", eventHandler);
}

var eventHandler = function (event) {
    displayCovidInfoEl.innerHTML = "";
    countryInfoDisplay.innerHTML = "";
    displayCovidInfoEl2.innerHTML = "";
    countryInfoDisplay2.innerHTML = "";

    getCovidInfo(event.target.textContent);
    countryInfo(event.target.textContent);
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

// display covid data
var displayCovidInfo = function (data) {
    var countryName = data.country;
    countryNameTitleEl.textContent = countryName;

    var activeCases = data.active;
    var displayActiveCases = document.createElement("li");
    displayActiveCases.textContent = "Active Cases: " + activeCases;
    displayActiveCases.className = ("active-cases");
    displayCovidInfoEl.appendChild(displayActiveCases);

    var todayCases = data.todayCases;
    var displayTodayCases = document.createElement("li");
    displayTodayCases.textContent = "Cases Today: " + todayCases
    displayTodayCases.className = ("covid-list today-cases");
    displayCovidInfoEl.appendChild(displayTodayCases);

    var todayDeaths = data.todayDeaths;
    var displayDeaths = document.createElement("li");
    displayDeaths.textContent = "Deaths Today: " + todayDeaths
    displayDeaths.className = ("covid-list deaths");
    displayCovidInfoEl.appendChild(displayDeaths);

    // var todayRecovered = data.todayRecovered;
    // var displayTodayRecovered = document.createElement("li");
    // displayTodayRecovered.textContent = "Recovered Today: " + todayRecovered
    // displayTodayRecovered.className = ("covid-list today-recovered");
    // displayCovidInfoEl.appendChild(displayTodayRecovered);

    var criticalCondition = data.critical;
    var displayCriticalCondition = document.createElement("li");
    displayCriticalCondition.textContent = "Critical Condition: " + criticalCondition;
    displayCriticalCondition.className = ("critical-condition-style");
    displayCovidInfoEl2.appendChild(displayCriticalCondition);

    var totalCases = data.cases;
    var displayTotalCases = document.createElement("li");
    displayTotalCases.textContent = "Total Cases: " + totalCases
    displayTotalCases.className = ("covid-list total-cases");
    displayCovidInfoEl2.appendChild(displayTotalCases);

    var totalDeath = data.deaths;
    var displayTotalDeath = document.createElement("li");
    displayTotalDeath.textContent = "Total Deaths: " + totalDeath;
    displayTotalDeath.className = ("covid-list total-death");
    displayCovidInfoEl2.appendChild(displayTotalDeath);

    // var totalRecovered = data.recovered;
    // var displayTotalRecovered = document.createElement("li");
    // displayTotalRecovered.textContent = "Total Recovered: " + totalRecovered
    // displayTotalRecovered.className = ("covid-list total-recovered");
    // displayCovidInfoEl2.appendChild(displayTotalRecovered);



    // var testing = data.tests;
    // var displayTesting = document.createElement("li");
    // displayTesting.textContent = "Total Tests: " + testing
    // displayTesting.className = ("covid-list total-testing column is-4");
    // displayCovidInfoEl.appendChild(displayTesting);
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

// display general country info
var displayCountryInfo = function (data) {
    // var continent = data[0].continents[0];
    // var displayContinent = document.createElement("li");
    // displayContinent.textContent = "Continent: " + continent;
    // displayContinent.className = ("critical-condition-style");
    // countryInfoDisplay.appendChild(displayContinent);

    var capital = data[0].capital[0];
    var displayCapital = document.createElement("li");
    displayCapital.textContent = "Capital City: " + capital;
    displayCapital.className = ("country-list capital-city");
    countryInfoDisplay.appendChild(displayCapital);

    var population = data[0].population;
    var displayPopulation = document.createElement("li");
    displayPopulation.textContent = "Population: " + population;
    displayPopulation.className = ("country-list");
    countryInfoDisplay2.appendChild(displayPopulation);

    var languages = data[0].languages;
    var languageObject = Object.values(languages);
    var languageName = languageObject[0];
    var displayLanguageName = document.createElement("li");
    displayLanguageName.textContent = "Language: " + languageName;
    displayLanguageName.className = ("country-list language-name");
    countryInfoDisplay.appendChild(displayLanguageName);

    var flag = data[0].flags.png;
    displayCountryFlag.setAttribute("src", flag);

    var currency = data[0].currencies;
    var currencyObject = Object.values(currency);
    var currencyName = currencyObject[0].name;
    var displayCurrency = document.createElement("li");
    displayCurrency.textContent = "Currency: " + currencyName;
    displayCurrency.className = ("country-list currency");
    countryInfoDisplay2.appendChild(displayCurrency)

    // var subregion = data[0].subregion;
    // var displaySubregion = document.createElement("li");
    // displaySubregion.textContent = "Subregion: " + subregion;
    // countryInfoDisplay.appendChild(displaySubregion);
}

// Clear history
var clearHistory = function (event){
    event.preventDefault();
    countryStorage =[];
    localStorage.removeItem("countries");
    document.location.reload()
}

// Event Listeners
inputFormEl.addEventListener("submit", formSubmitHandler);

clearHistoryButton.addEventListener("click", clearHistory)

loadCountries();