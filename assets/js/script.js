//"https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={159cf61f058039de880f7db60a1b8540}";

var searchFormEl = document.querySelector("#search-form");
var cityInputEl = document.querySelector("#city");
var cityBottonsEl = document.querySelector("#cityButtons");
var cityReportEl = document.querySelector("#cityReport");
var fiveDayEl = document.querySelector("#fiveDay");
var eachDayEl = document.querySelector("#eachDayInfo");

// Get the modal
var modal = document.getElementById("searchErrorModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
// window.onclick = function (event) {
//     if (event.target == modal) {
//         modal.style.display = "none";
//     }
// };
// End of the modal


// city search form
var formSubmitHandler = function (event) {

    if (event) {
        event.preventDefault();
    };

    var citySearch = cityInputEl.value.trim();

    if (citySearch) {
        var locA = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&APPID=159cf61f058039de880f7db60a1b8540&units=imperial";

        getByCity(locA);
        saveCities(citySearch);
        removeCityBtns();
        createCityBtns();
        
        // else {
        //     modal.style.display = "block";
        // };

        cityInputEl.value = "";
    } else {
        modal.style.display = "block";
    }

    console.log(event);
};

// click button to search
var btnSearch = function (event) {
    // debugger
    console.log(event);
    cityInputEl.value = event.innerHTML;
    formSubmitHandler();
};

// create search buttons from local storage
var createCityBtns = function () {
    for (var i = 0; i < citiesArry.length; i++) {
        let btn = document.createElement("button");
        btn.setAttribute("id", "cityBtn");
        btn.setAttribute("onclick", "btnSearch(this)");
        btn.style.fontSize ="10px";
        btn.textContent = citiesArry[i];
        cityBottonsEl.appendChild(btn);
    }
};

var removeCityBtns = function () {
    // debugger
    var btns = getAllTagMatches(/^cityBtn/i);
    for (var b = 0; b < btns.length; b++) {
        btns[b].remove();
    }
};


// search weather by city
var getByCity = function (loc) {
    cityResult = false;
    console.log(loc);

    // make a get request to url
    fetch(loc).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                //display data
                // debugger
                console.log(data);
                var t = document.querySelector("#cityReport");

                var lat = document.querySelector("#lat");
                var lon = document.querySelector("#lon");

                //parst the info of data
                var dt = unixToLocal(data.dt);

                t.innerHTML =
                    data.name + " " + dt + "\r\n" +
                    "Temp: " + data.main.temp + "\r\n" +
                    "Wind: " + data.wind.speed + " MPH" + "\r\n" +
                    "Humidity: " + data.main.humidity + "\r\n" 
                    ;

                lat.textContent = data.coord.lat;
                lon.textContent = data.coord.lon;

                getByCoords();
                console.log(response);
  
            });
        } else {
            // if not successful, redirect to homepage
            // document.location.replace("./index.html");
            console.log("not Succ A");

        }
    
    });

};

// search by latitude and longitude
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
                // debugger
                console.log(data);

                var t = document.querySelector("#coordReport");

                var dt = unixToLocal(data.current.dt);

                t.innerHTML =  
                    "UV Index: " + data.current.uvi
                    ;

              
// debugger
                var matches = getAllTagMatches(/^day/i);
                for (var i = 0; i < matches.length; i++) {
                    matches[i].remove();
                } 

                for (var i = 0; i < 5; i++) {
                     
                    let dateTxtEl = document.createElement("li");
                    dateTxtEl.classList.add("daily");
                    dateTxtEl.setAttribute("id", 'day');                    
                    dateTxtEl.innerHTML = unixToLocal(data.daily[i].dt);
                    eachDayEl.appendChild(dateTxtEl);

                    let imageEl = document.createElement("img");
                    imageEl.classList.add("daily");
                    imageEl.setAttribute("id", 'day');
                    imageEl.setAttribute("src", "http://openweathermap.org/img/wn/"
                        + data.daily[i].weather[0].icon + ".png");                
                        eachDayEl.appendChild(imageEl);

                    let tempTxtEl = document.createElement("li");
                    tempTxtEl.classList.add("daily");
                    tempTxtEl.setAttribute("id", 'day');
                    tempTxtEl.innerHTML = " Temp: " + data.daily[i].temp.day;
                    eachDayEl.appendChild(tempTxtEl);

                    let windTxtEl = document.createElement("li");
                    windTxtEl.classList.add("daily");   
                    windTxtEl.setAttribute("id", 'day');
                    windTxtEl.innerHTML = " Wind: " + data.daily[i].wind_speed;
                    eachDayEl.appendChild(windTxtEl);

                    let humidityTxtEl = document.createElement("li");
                    humidityTxtEl.classList.add("daily");
                    humidityTxtEl.setAttribute("id", 'day');
                    humidityTxtEl.innerHTML = " Humidity: " + data.daily[i].humidity;
                    eachDayEl.appendChild(humidityTxtEl);

                    document.body.appendChild(fiveDayEl);

                }
                console.log(response);

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
    var ret = new Date(stamp * 1000).toLocaleDateString("en-US");
    return ret;
};

var citiesArry = [];
var citiesItem = {};

// get city list from local storage
var loadCities = function () {
    // debugger
    citiesArry = JSON.parse(localStorage.getItem("citiesList"));

    if (!citiesArry) {
        return;
    }
    else {
        // make buttons
        createCityBtns();
    };
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

// update city list in local storage
var pushCity = function (city) {
    console.log(city);
    citiesArry.push(city);

    localStorage.setItem("citiesList", JSON.stringify(citiesArry));
    console.log(citiesArry);
};

removeCityBtns();
loadCities();

searchFormEl.addEventListener("submit", formSubmitHandler);

