function printName(key, value) {
    switch(key) {
        case "gender":
            return value;
        case "name":
            return value.title + '. ' + value.first + ' ' + value.last;
        case "location":
            return value.street.number + ' ' + value.street.name + '<br />' + 
                value.city + ', ' + value.state + ' ' + value.country + ' ' + value.postcode;
        case "email":
            return value;
        case "login":
            return value.username + ' ' + value.password;
        case "dob":
            return moment(value.date).format('MMMM DD, YYYY');
        case "phone":
            return value;
        case "cell":
            return value;
    }

    
}
document.getElementById("buttonSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    let userData;
    const url = 'https://randomuser.me/api/';
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(json) {
        let user = json.results[0];
        let result = "";
        // set image
        let img = json.results[0].picture.large;
        result += '<img id="userImage" src="' + img + '"></img>';
        // set name
        result += '<h2> New User </h2>';
        let userKeys = Object.keys(user);
        console.log("keys", userKeys);
        console.log("user", user);
        for (let i = 0; i != userKeys.length; i++) {
            //printName(user[userKeys[i]])
            if (userKeys[i] != 'registered' && userKeys[i] != 'id' &&
                userKeys[i] != 'picture' && userKeys[i] != 'nat') { 
                result += '<p> <span id="key">' + userKeys[i].toLocaleUpperCase() + ": </span> <span id='value'>" + printName(userKeys[i], user[userKeys[i]]) + '</span> </p>';
            }
        }
        let fullName = json.results[0].name;
        // modify user div
        document.getElementById('userResult').innerHTML = result;

        document.getElementById('userResult').style.backgroundColor = "white";
        document.getElementById("userResult").style.boxShadow = "inset 2px 4px 6px gray";
        document.getElementById("userResult").style.borderBottom = "1px solid lightgray";
        
    }).catch(function(e) {
        console.log(e)
    });

    
    //console.log(value);


    // const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial&APPID=0d07b5933fb7a39949c5629c90c67885";
    // fetch(url).then(function(response) {
    //     return response.json();
    // }).then(function(json) {
    //     //console.log("current: ", json);
    //     let results = "";
    //     results += '<h2>Weather in ' + json.name + '</h2>';
    //     results += '<h2>' + Math.round(json.main.temp) + ' &deg;F</h2>';
    //     for (let i = 0; i < json.weather.length; i++) {
    //         results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
    //     }
    //     results += '<p>';
    //     for (let i=0; i < json.weather.length; i++) {
    //         let id = json.weather[i].id;
    //         //console.log(id);
    //         results += json.weather[i].description;
    //         if (i !== json.weather.length - 1) {
    //           results += ", ";
    //         }
    //         if (id > 800) {
    //             // cloud
    //             document.body.style.backgroundImage = "url(images/cloudy.jpg)";
    //         } else if (id == 800) {
    //             // clear
    //             document.body.style.backgroundImage = "url(images/clear.jpg)";
    //         } else if (id >= 700) {
    //             // mist ? 
    //             document.body.style.backgroundImage = "url(images/misty.jpg)";
    //         } else if (id >= 600) {
    //             //snow
    //             document.body.style.backgroundImage = "url(images/snow.jpg)";
    //         } else if (id >= 300) {
    //             //rain
    //             document.body.style.backgroundImage = "url(images/rainy.jpg)";
    //         } else if (id >= 200) {
    //             //thunder
    //             document.body.style.backgroundImage = "url(images/thunderstorm.jpg)";
    //         }
    //     }
    //     results += "</p>";
    //     document.getElementById("weatherResults").innerHTML = results;
    // }).catch(function(e) {
    //     //console.log(e);
    // });


    // const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ",US&units=imperial&APPID=0d07b5933fb7a39949c5629c90c67885";
    // fetch(url2).then(function(response) {
    //     return response.json();
    // }).then(function(json) {
    //     //console.log("forecast: ", json);
    //     let forecast = "";
    //     let oldDay;
    //     for (let i=0; i < json.list.length; i++) {
    //         let newDay = moment(json.list[i].dt_txt).format("dddd");
    //         let nextDay;
    //         let isNextDay;
    //         if (i < json.list.length - 1) {
    //             nextDay = moment(json.list[i + 1].dt_txt).format("dddd");
    //             isNextDay = !(nextDay == newDay);
    //         } else {
    //             isNextDay = true;
    //         }
    //         if (newDay != oldDay) {
    //             forecast += "<h2>" + newDay + "</h2>";
    //             if (i == 0) {
    //                 forecast += "<div class='results first-flexbox-item'>";
    //             } else {
    //                 forecast += "<div class='results'>";
    //             }
    //         }
    //         forecast += "<div class='flexbox-item'>"
    //         //forecast += "<h2>" + moment(json.list[i].dt_txt).format("MMM D, YYYY h:mm a") + "</h2>";
    //         forecast += "<h2>" + moment(json.list[i].dt_txt).format("h:mm a") + "</h2>";
    //         forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
    //         forecast += "<p>Temperature: " + Math.round(json.list[i].main.temp) + "&deg;F</p>";
    //         forecast += "<p>Feels like: " + Math.round(json.list[i].main.feels_like) + "&deg;F</p>";
    //         forecast += "<p>Humidity: " + json.list[i].main.humidity +  "%</p>";
    //         forecast += "</div>"
    //         if (isNextDay) {
    //             forecast += "</div>";
    //         }
    //         oldDay = newDay;
    //     }
    //     document.getElementById("forecastResults").innerHTML = forecast;
    //     document.getElementById("forecastResults").lastChild.className = "results last-flexbox-item";
    // });

});



// document.getElementById("weatherInput").value = "logan";
// document.getElementById("weatherSubmit").click();