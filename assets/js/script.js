//"https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={159cf61f058039de880f7db60a1b8540}";

var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");


// Get the modal
var modal = document.getElementById("searchErrorModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
// End of the modal


// city search form
var formSubmitHandler = function (event) {
    event.preventDefault();

    var citySearch = cityInputEl.value.trim();

    if (citySearch) {
        saveCities(citySearch);

        var locA = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&APPID=159cf61f058039de880f7db60a1b8540&units=imperial";

        getByCity(locA);

        // loadCities();
        cityInputEl.value = "";
    } else {
        modal.style.display = "block";
    }

    console.log(event);
};



var getByCity = function (loc) {

    console.log(loc);

    // make a get request to url
    fetch(loc).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                //display data
                debugger
                console.log(data);
                var t = document.querySelector("#txtWTestA");

                var lat = document.querySelector("#lat");
                var lon = document.querySelector("#lon");

                //parst te info of data
                var dt = unixToLocal(data.dt);

                t.textContent =
                    "Loc: " + data.name + " " + dt + "\r\n" +
                    "Temp: " + data.main.temp + "\r\n" +
                    "Wind: " + data.wind.speed + " MPH" + "\r\n" +
                    "Humidity: " + data.main.humidity + "\r\n" +
                    "UV Index: " + "??"
                    ;

                lat.textContent = data.coord.lat;
                lon.textContent = data.coord.lon;

                icon = data.weather[0].icon;
                console.log(icon);

            });
        } else {
            // if not successful, redirect to homepage
            // document.location.replace("./index.html");
            console.log("not Succ A");
        }
    });

};


var getByCoords = function () {

    var lat = document.querySelector("#lat");
    var lon = document.querySelector("#lon");

    var loc = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat.textContent + "&lon=" + lon.textContent + "&appid=159cf61f058039de880f7db60a1b8540&units=imperial";

    console.log(loc);
    // make a get request to url
    fetch(loc).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                //display data
                debugger
                console.log(data);

                var t = document.querySelector("#txtWTestB");

                var dt = unixToLocal(data.current.dt);

                t.textContent =
                    "Loc: " + data.timezone + " " + dt + "\r\n" +
                    "Lat: " + data.lat + "\r\n" +
                    "Lon: " + data.lon + "\r\n" +
                    "Temp: " + data.current.temp + "\r\n" +
                    "Wind: " + data.current.wind_speed + " MPH" + "\r\n" +
                    "Humidity: " + data.current.humidity + "\r\n" +
                    "UV Index: " + data.current.uvi
                    ;

                debugger
                // var futureDays = getAllTagMatches(/^da/i);

                for (var i = 0; i < 5; i++) {


                    let fiveDayEl = document.createElement("div");
                    fiveDayEl.setAttribute("id", 'day' + i);
                    fiveDayEl.classList.add("flex-container");

                    let dateTxtEl = document.createElement("p");
                    dateTxtEl.innerHTML = unixToLocal(data.daily[i].dt);
                    fiveDayEl.appendChild(dateTxtEl);

                    let imageEl = document.createElement("img");
                    imageEl.setAttribute("src", "http://openweathermap.org/img/wn/"
                        + data.daily[i].weather[0].icon + ".png");
                    fiveDayEl.appendChild(imageEl);

                    let tempTxtEl = document.createElement("p");
                    tempTxtEl.innerHTML = "Temp: " + data.daily[i].temp.day;
                    fiveDayEl.appendChild(tempTxtEl);

                    let windTxtEl = document.createElement("p");
                    windTxtEl.innerHTML = "Wind: " + data.daily[i].wind_speed;
                    fiveDayEl.appendChild(windTxtEl);

                    let humidityTxtEl = document.createElement("p");
                    humidityTxtEl.innerHTML = "Humidity: " + data.daily[i].humidity;
                    fiveDayEl.appendChild(humidityTxtEl);

                    document.body.appendChild(fiveDayEl);

                }

            });
        } else {
            // if not successful, redirect to homepage
            // document.location.replace("./index.html");
            console.log("not successful B");
        }
    });
};

// get all the future forcast data
function getAllTagMatches(regEx) {
    return Array.prototype.slice.call(document.querySelectorAll('*')).filter(function (el) {
        return el.id.match(regEx);
    });
};

// unix dateTime to local
function unixToLocal(stamp) {
    var ret = new Date(stamp * 1000).toLocaleString();
    return ret;
};

var citiesArry = [];
var citiesItem = {};

var loadCities = function () {
    debugger
    citiesArry = JSON.parse(localStorage.getItem("citiesList"));

    if (!citiesArry) {
        return;
    }
    // else {
    // make buttons
    // };

};

// does not check if city is valid city and country
var saveCities = function (city) {
    // debugger
    if (citiesArry) {
        if (citiesArry.includes(city)) {
            console.log("city already exists " + city);
            return;
        } else {
            pushCity(city);
        }
    }
    else {
        citiesArry = new Array(0);
        pushCity(city);
    }
};

var pushCity = function (city) {
    console.log(city);
    citiesArry.push(city);

    localStorage.setItem("citiesList", JSON.stringify(citiesArry));
    console.log(citiesArry);
};

loadCities();

searchFormEl.addEventListener("submit", formSubmitHandler);

