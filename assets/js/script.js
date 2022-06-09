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
                     "UV Index: " + data.main.humidity
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
     var loc = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat.textContent+ "&lon=" + lon.textContent + "&appid=159cf61f058039de880f7db60a1b8540";
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
 
                 
                 //parst te info of data
                 // t.textContent =
                 //     // "Loc: " + data.name + "\r\n" +
                 //     // "Temp: " + data.main.temp + "\r\n" +
                 //     // "Wind: " + data.wind.speed + " MPH" + "\r\n" +
                 //     // "Humidity: " + data.main.humidity + "\r\n" +
                 //     // "UV Index: " + data.main.humidity
                 //     ;
 
                 // lat = data.coord.lat;
                 // lon = data.coord.lon;
                 // console.log(lat);
                 // console.log(lon);
                 // icon=data.weather[0].icon;
                 // console.log(icon);
 
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
 