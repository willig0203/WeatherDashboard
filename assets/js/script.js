//"https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={159cf61f058039de880f7db60a1b8540}";

var icon;

var testA = function (loc) {

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


var testB = function () {

    var lat = document.querySelector("#lat");
    var lon = document.querySelector("#lon");
    
    var loc = "https://api.openweathermap.org/data/2.5/onecall?lat=" + 
    lat.textContent + "&lon=" + lon.textContent + "&appid=159cf61f058039de880f7db60a1b8540&units=imperial";

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
                var futureDays = getAllTagMatches(/^da/i);

                for (var i = 0; i < 5; i++) {                
                        futureDays[i].textContent =
                        unixToLocal(data.daily[i].dt) + "\r\n" +
                        "Temp: " + data.daily[i].temp.day + "\r\n" +
                        "Wind: " + data.daily[i].wind_speed + "\r\n" +
                        "Humidity: " + data.daily[i].humidity
                        ;
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

var locA = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=159cf61f058039de880f7db60a1b8540&units=imperial";
testA(locA);
