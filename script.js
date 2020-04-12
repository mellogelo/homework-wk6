var date = new Date();
var currentMonth = date.getMonth() + 1;
var currentDay = date.getDate();
var currentHour = date.getHours();
var currentMinute = date.getMinutes();
var currentSecond = date.getSeconds()

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
        cityTempRes = $("<p>").text("Temperature (F): " + tempF.toFixed(2))
        cityHumidRes = $("<p>").text("Humidity: " + humid + "%")
        cityWindSpdRes = $("<p>").text("Wind Speed: " + windSpd + " MPH")
        // cityUv = $("<div>").addClass("UV-Index").text()  UV INDEX
          
        $(".result-div").append(cityNameDate, cityTempRes, cityHumidRes, cityWindSpdRes)
      })

    }

    // click event for input value
    $("#select-city").on("click", function(event) {
    event.preventDefault();
    var inputCity = $("#city-input").val().trim();
    searchCity(inputCity);
  });