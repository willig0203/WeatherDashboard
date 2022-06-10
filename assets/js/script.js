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
                var unixDt = data.dt;
                var dt = new Date(unixDt * 1000).toLocaleString();

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
    var loc = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat.textContent + "&lon=" + lon.textContent + "&appid=159cf61f058039de880f7db60a1b8540";
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

                var unixDt = data.current.dt;
                var dt = new Date(unixDt * 1000).toLocaleString();

                t.textContent =
                    "Loc: " + data.timezone + " " + dt + "\r\n" +
                    "Lon: " + data.lon + "\r\n" +
                    "Lat: " + data.lat + "\r\n" +
                    "Temp: " + data.current.temp + "\r\n" +
                    "Wind: " + data.current.wind_speed + " MPH" + "\r\n" +
                    "Humidity: " + data.current.humidity + "\r\n" +
                    "UV Index: " + data.current.uvi
                    ;

                    var txtWTest1 = document.querySelector("#txtWTest1");
                    var txtWTest2 = document.querySelector("#txtWTest2");
                    var txtWTest3 = document.querySelector("#txtWTest3");
                    var txtWTest4 = document.querySelector("#txtWTest4");
                    var txtWTest5 = document.querySelector("#txtWTest5");
                    var txtWTest6 = document.querySelector("#txtWTest6");
                    var txtWTest7 = document.querySelector("#txtWTest7");
                    var txtWTest8 = document.querySelector("#txtWTest8");

                    txtWTest1.textContent = data.daily[0].dt;
                    txtWTest2.textContent = data.daily[1].dt;
                    txtWTest3.textContent = data.daily[2].dt;
                    txtWTest4.textContent = data.daily[3].dt;
                    txtWTest5.textContent = data.daily[4].dt;
                    txtWTest6.textContent = data.daily[5].dt;
                    txtWTest7.textContent = data.daily[6].dt;
                    txtWTest8.textContent = data.daily[7].dt;

                    // for (var i = 0; i < data.daily.length; i++){

                    //     txtWTest1.textContent = txtWTest1.dt;
                    // }
               

            });
        } else {
            // if not successful, redirect to homepage
            // document.location.replace("./index.html");
            console.log("not Succ B");
        }
    });
};


var locA = "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=159cf61f058039de880f7db60a1b8540";
testA(locA);
