console.log("Hello world!")
console.log("Hello birds!")
console.log("Goodnight yall!")

var inputFormEl = document.querySelector("#input-form");
var formModalEl = document.querySelector("#form-modal");

var countryStorage = [];

// test local storage

// test api server fetch

getCovidInfo = function (countryName) {
    var apiUrl = "https://disease.sh/v3/covid-19/countries/" + countryName;
    fetch(apiUrl).then(function (response) {
        if (response.ok) {
            response.json().then(function (data) {
                console.log(data);
            });
        }
    });
};

var displayCovidInfo = function (data) {

};

// getCovidInfo();

inputFormEl.addEventListener("submit", formSubmitHandler);