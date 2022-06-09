
var loc = //"https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=-94.04&exclude=hourly,daily&appid={159cf61f058039de880f7db60a1b8540}";
    "https://api.openweathermap.org/data/2.5/weather?q=London,uk&APPID=159cf61f058039de880f7db60a1b8540";

// function test() {
//     fetch(loc).then(response => {
//         return response.json();
//     }).then(data => {
//         console.log(data);
//     })
// };



var test = function () {
    // format the github api url
    // var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

    // make a get request to url
    fetch(loc).then(function (response) {
        // request was successful
        if (response.ok) {
            response.json().then(function (data) {
                //display data
                console.log(data);
                var t = document.querySelector("#txtWTest");
                //parst te info of data
                t.textContent = data;

            });
        } else {
            // if not successful, redirect to homepage
            // document.location.replace("./index.html");
            console.log("not Succ");
        }
    });
};


debugger
test();