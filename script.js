document.getElementById("weatherSubmit").addEventListener("click", function(event) {
    event.preventDefault();
    const value = document.getElementById("weatherInput").value;
    if (value === "") {
        return;
    }
    //console.log(value);


    const url = "http://api.openweathermap.org/data/2.5/weather?q=" + value + ",US&units=imperial&APPID=0d07b5933fb7a39949c5629c90c67885";
    fetch(url).then(function(response) {
        return response.json();
    }).then(function(json) {
        //console.log("current: ", json);
        let results = "";
        results += '<h2>Weather in ' + json.name + '</h2>';
        results += '<h2>' + Math.round(json.main.temp) + ' &deg;F</h2>';
        for (let i = 0; i < json.weather.length; i++) {
            results += '<img src="http://openweathermap.org/img/w/' + json.weather[i].icon + '.png"/>';
        }
        results += '<p>';
        for (let i=0; i < json.weather.length; i++) {
            let id = json.weather[i].id;
            //console.log(id);
            results += json.weather[i].description;
            if (i !== json.weather.length - 1) {
              results += ", ";
            }
            if (id > 800) {
                // cloud
                document.body.style.backgroundImage = "url(images/cloudy.jpg)";
            } else if (id == 800) {
                // clear
                document.body.style.backgroundImage = "url(images/clear.jpg)";
            } else if (id >= 700) {
                // mist ? 
                document.body.style.backgroundImage = "url(images/misty.jpg)";
            } else if (id >= 600) {
                //snow
                document.body.style.backgroundImage = "url(images/snow.jpg)";
            } else if (id >= 300) {
                //rain
                document.body.style.backgroundImage = "url(images/rainy.jpg)";
            } else if (id >= 200) {
                //thunder
                document.body.style.backgroundImage = "url(images/thunderstorm.jpg)";
            }
        }
        results += "</p>";
        document.getElementById("weatherResults").innerHTML = results;
    }).catch(function(e) {
        //console.log(e);
    });


    const url2 = "http://api.openweathermap.org/data/2.5/forecast?q=" + value + ",US&units=imperial&APPID=0d07b5933fb7a39949c5629c90c67885";
    fetch(url2).then(function(response) {
        return response.json();
    }).then(function(json) {
        //console.log("forecast: ", json);
        let forecast = "";
        let oldDay;
        for (let i=0; i < json.list.length; i++) {
            let newDay = moment(json.list[i].dt_txt).format("dddd");
            let nextDay;
            let isNextDay;
            if (i < json.list.length - 1) {
                nextDay = moment(json.list[i + 1].dt_txt).format("dddd");
                isNextDay = !(nextDay == newDay);
            } else {
                isNextDay = true;
            }
            if (newDay != oldDay) {
                forecast += "<h2>" + newDay + "</h2>";
                if (i == 0) {
                    forecast += "<div class='results first-flexbox-item'>";
                } else {
                    forecast += "<div class='results'>";
                }
            }
            forecast += "<div class='flexbox-item'>"
            //forecast += "<h2>" + moment(json.list[i].dt_txt).format("MMM D, YYYY h:mm a") + "</h2>";
            forecast += "<h2>" + moment(json.list[i].dt_txt).format("h:mm a") + "</h2>";
            forecast += '<img src="http://openweathermap.org/img/w/' + json.list[i].weather[0].icon + '.png"/>';
            forecast += "<p>Temperature: " + Math.round(json.list[i].main.temp) + "&deg;F</p>";
            forecast += "<p>Feels like: " + Math.round(json.list[i].main.feels_like) + "&deg;F</p>";
            forecast += "<p>Humidity: " + json.list[i].main.humidity +  "%</p>";
            forecast += "</div>"
            if (isNextDay) {
                forecast += "</div>";
            }
            oldDay = newDay;
        }
        document.getElementById("forecastResults").innerHTML = forecast;
        document.getElementById("forecastResults").lastChild.className = "results last-flexbox-item";
    });

});



// document.getElementById("weatherInput").value = "logan";
// document.getElementById("weatherSubmit").click();