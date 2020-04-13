var date = new Date();
var currentMonth = date.getMonth() + 1;
var currentDay = date.getDate();
var currentHour = date.getHours();
var currentMinute = date.getMinutes();
var currentSecond = date.getSeconds()
var cityHistory = [];


function clickHistory() {
    thisCity = $(this).attr("city-name");
    searchCity(thisCity);
}

function searchCity(cityName) {
    
    var APIKey = "e1b693a3f9fca26b298ba8ab0db6b5ec";
     // Here we are building the URL we need to query the database
    var queryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // We store all of the retrieved data inside of an object called "response"
      .then(function(response) {
        console.log(response);

        tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;
        humid = response.list[0].main.humidity;
        windSpd = response.list[0].wind.speed;

        cityNameDate = $("<h1>").text(response.city.name);
        cityTempRes = $("<p>").text("Temperature (F): " + tempF.toFixed(2) + "°F")
        cityHumidRes = $("<p>").text("Humidity: " + humid + "%")
        cityWindSpdRes = $("<p>").text("Wind Speed: " + windSpd + " MPH")
        // cityUv = $("<div>").addClass("UV-Index").text()  UV INDEX

        $(".result-div").empty();
        $(".forecast-div").empty()
        $(".result-div").append(cityNameDate, cityTempRes, cityHumidRes, cityWindSpdRes)

        forecast = response.list;
        for (var i = 0; i < forecast.length; i++) {
            if (i === 5) { break; }
            temp5 = (forecast[i].main.temp - 273.15) * 1.80 + 32
            forecastDiv = $("<div>");
            forecastDiv.addClass("forecast")
            forecastTemp = $("<p>").text("Temp " + temp5.toFixed(2) + "°F")
            forecastHumid = $("<p>").text("Humid " + forecast[i].main.humidity + "%")
            forecastDiv.append(forecastTemp)
            forecastDiv.append(forecastHumid)
            $(".forecast-div").append(forecastDiv)
        }

        long = response.city.coord.lon;
        lat = response.city.coord.lat;
        console.log(long)
        searchUv(long, lat);
      })
    }

// UV Index
function searchUv(long, lat) {
    ApiKey = "e1b693a3f9fca26b298ba8ab0db6b5ec";
    var queryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + ApiKey + "&lat=" + lat + "&lon=" + long;
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    .then(function(response) {
        UvIndex = response.value;
        UvIndexText = $("<p>").html("UV Index: " + UvIndex)
        $(".result-div").append(UvIndexText)

    });
}

// adds to history result div - creates a div
function searchHistory() {
    $(".search-history").empty();
    for (var i = 0; i < cityHistory.length; i++) {
        var historyEl = $("<div>");
        historyEl.addClass("history")
        historyEl.attr("city-name", cityHistory[i])
        historyEl.text(cityHistory[i]);
        $(".search-history").append(historyEl);
    }
}
    
// click event for input value
$("#select-city").on("click", function(event) {
    event.preventDefault();
    var inputCity = $("#city-input").val().trim();
    cityHistory.push(inputCity);
    searchCity(inputCity);
    searchHistory();
    });
    
// click event to only classes with history > apply function
$(document).on("click", ".history", clickHistory);

searchHistory();

