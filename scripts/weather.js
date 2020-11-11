//Set Date variables
var startDate = moment().format('M/DD/YYYY');  // Current Date
var day1 = moment().add(1, 'days').format('M/DD/YYYY');
var day2 = moment().add(2, 'days').format('M/DD/YYYY');
var day3 = moment().add(3, 'days').format('M/DD/YYYY');
var day4 = moment().add(4, 'days').format('M/DD/YYYY');
var day5 = moment().add(5, 'days').format('M/DD/YYYY');

$(document).ready(function() {
console.log("ready!");

  // On-click of Search button when user enters city name
  $("#basic-text1").on("click", function(event) {
    event.preventDefault();
    var cityInput = $("#input").val(); //save city name that has been entered
    var allCities = []; // Array to hold searched cities

    allCities = JSON.parse(localStorage.getItem("allCities")) || []; // Get cities
    allCities.push(cityInput); // push new city entered into the array 
    localStorage.setItem("allCities", JSON.stringify(allCities)); //save city input to local storage 

    showWeather(cityInput); 
  }); 

  function showWeather(cityInput) {

    // Empty any previously displayed data 
    $("#dailyWeather").empty();
    $("#fiveDay").empty();
    $("#day1").empty();
    $("#day2").empty();
    $("#day3").empty();
    $("#day4").empty();
    $("#day5").empty();

    // QueryURL to get Weather for Current Day 
    var currentDay ="https://api.openweathermap.org/data/2.5/weather?q=" 
    + cityInput + "&units=metric" + "&appid=d83e6d89df982d60b019ed0d58ed57a4";
    console.log("currentDay", currentDay);  

    //Fetch for Curent Day Weather
    fetch (currentDay)
      .then(function(response) {
        return response.json();
      })  
      .then(function (data) {
        // Variables 
        var iconUrl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png"; //icon url 
        var lat = data.coord.lat; // Latitude 
        var lon = data.coord.lon; // Longitude 
    
        // Append current day weather details to the site 
        $("#dailyWeather").append(
        "<div class='col s12 m6'>"
        +  "<h2 class='daily'>" + data.name + " (" + startDate + ")" + "&nbsp" + "<img src='" + iconUrl  + "'>" + "</h2>"
        +  "<ul class='daily'>" + "Temperature: " +  data.main.temp + " °C" + "</ul>"
        +  "<ul class='daily'>" + "Humidity: " + data.main.humidity + "%" + "</ul>"
        +  "<ul class='daily'>" + "Wind Speed: " +  data.wind.speed + " meter/sec" + "</ul>"
        + "</div>"
        ); // End of current day append
    
        // QueryURL for 5 day Weather forecast
        var fiveDay = "https://api.openweathermap.org/data/2.5/onecall?" 
        + "lat=" + lat + "&lon=" + lon + "&units=metric" + "&appid=d83e6d89df982d60b019ed0d58ed57a4";  
        console.log("fiveDay", fiveDay);

        //Fetch call for Five Day Forecast and UV
        fetch (fiveDay)
          .then(function(response) {
            return response.json();
          })  
          .then(function (data) {
      
            //icon urls
            var iconUrl1 = "http://openweathermap.org/img/w/" + data.daily[0].weather[0].icon + ".png";
            var iconUrl2 = "http://openweathermap.org/img/w/" + data.daily[1].weather[0].icon + ".png";
            var iconUrl3 = "http://openweathermap.org/img/w/" + data.daily[2].weather[0].icon + ".png";
            var iconUrl4 = "http://openweathermap.org/img/w/" + data.daily[3].weather[0].icon + ".png";
            var iconUrl5 = "http://openweathermap.org/img/w/" + data.daily[4].weather[0].icon + ".png";
        
            // Adding in UV Index to daily weather 
            $("#dailyWeather").append(
              "<div class='col s12 m6'>"
            + "<button class='w3-button' id='uvIndex' class='daily'>" + "UV Index: " + data.current.uvi + "</button>"
            + "</div>"
            ); // End of UV append 

            // UV Index colors 
            if (data.current.uvi <= 2) {
              $("#uvIndex").addClass("green");
            } else if (data.current.uvi <= 5) {
              $("#uvIndex").addClass("yellow");
            } else if (data.current.uvi <= 7) {
                $("#uvIndex").addClass("orange");
            } else if (data.current.uvi <= 10) {
                $("#uvIndex").addClass("red");
            } else if (data.current.uvi <= 40) {
                $("#uvIndex").addClass("purple");
            };

            // Header
            $("#fiveDay").append(
              "<div class='col-md-12'>"
            + "<h2 id='fiveDay'>" + "5-Day Forecast:" + "</h2>" 
            ); // End of append 

            // Day One Forecast
            $("#day1").append(
            "<div class='fiveDayCard card col s12 m6'>"
            +  "<div class='card-body'>"
            +  "<div class='card-header'>" + day1 +"</div>"
            +  "<div class='card-text'>" + "<img src='" + iconUrl1 + "'>" +"</div>"
            +  "<div class='card-text'>" + "Temp: " + data.daily[0].temp.day + " °C" + "</div>"
            +  "<div class='card-text'>" + "Humidity: " + data.daily[0].humidity + "%" + "</div>" 
            + "</div>" 
            ); // End of append 

            //Day Two Forecast
            $("#day2").append(
              "<div class='fiveDayCard card col s12 m6'>"
              +  "<div class='card-body'>"
              +  "<div class='card-header'>" + day2 +"</div>"
              +  "<div class='card-text'>" + "<img src='" + iconUrl2 + "'>" +"</div>"
              +  "<div class='card-text'>" + "Temp: " + data.daily[1].temp.day + " °C" + "</div>"
              +  "<div class='card-text'>" + "Humidity: " + data.daily[1].humidity + "%" + "</div>" 
              + "</div>" 
            ); // End of append 

            //Day Three Forecast
            $("#day3").append(
              "<div class='fiveDayCard card col s12 m6'>"
              +  "<div class='card-body'>"
              +  "<div class='card-header'>" + day3 +"</div>"
              +  "<div class='card-text'>" + "<img src='" + iconUrl3 + "'>" +"</div>"
              +  "<div class='card-text'>" + "Temp: " + data.daily[2].temp.day + " °C" + "</div>"
              +  "<div class='card-text'>" + "Humidity: " + data.daily[2].humidity + "%" + "</div>" 
              + "</div>" 
            ); // End of append 

            //Day Four Forecast
            $("#day4").append(
              "<div class='fiveDayCard card col s12 m6'>"
              +  "<div class='card-body'>"
              +  "<div class='card-header'>" + day4 +"</div>"
              +  "<div class='card-text'>" + "<img src='" + iconUrl4 + "'>" +"</div>"
              +  "<div class='card-text'>" + "Temp: " + data.daily[3].temp.day + " °C" + "</div>"
              +  "<div class='card-text'>" + "Humidity: " + data.daily[3].humidity + "%" + "</div>" 
              + "</div>" 
            ); // End of append 

            //Day Five Forecast
            $("#day5").append(
              "<div class='fiveDayCard card col s12 m6'>"
              +  "<div class='card-body'>"
              +  "<div class='card-header'>" + day5 +"</div>"
              +  "<div class='card-text'>" + "<img src='" + iconUrl5 + "'>" +"</div>"
              +  "<div class='card-text'>" + "Temp: " + data.daily[4].temp.day + " °C" + "</div>"
              +  "<div class='card-text'>" + "Humidity: " + data.daily[4].humidity + "%" + "</div>" 
              + "</div>" 
            ); // End of append 
          
          showCities(); // calls function to append cities
        }); // End of Fetch response  
      }); // End of Fetch response 
  } // end of Show Weather function 

    //  Function to retrieve the stored input that was saved in each input 
    function showCities() {
      $("#cityButtons").empty(); // empty previous array 
      var arrayFromStorage = JSON.parse(localStorage.getItem("allCities")) || []; // Make all searched cities a string
      var arrayLength = arrayFromStorage.length; // limits length of array

      for (var i = 0; i < arrayLength; i++) { // Loop so it prepends all cities within the length of the array
        var cityNameFromArray = arrayFromStorage[i]; //
        $("#cityButtons").append (
          "<div class='list-group'>"
          + "<button class='list-group-item'>" + cityNameFromArray 
          + "</button>")
          + "</div>" 
      } // end of loop 
    } // end of showCities function 

    showCities (); // calls function to append cities upon page load 
    // show cities on click 
    $("#cityButtons").on("click", ".list-group-item", function(event) {
      event.preventDefault();
      var cityInput = ($(this).text());
      showWeather(cityInput); 
    }) // end of city buttons on click

}); // end of document ready function

