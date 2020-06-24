//List of global varials
var queryURL = "";
var city = "";
var icons = "http://openweathermap.org/img/wn/"
var citySave = [];
var listOfIds = ["Day1", "Day2", "Day3", "Day4", "Day5"]
var listOfIds2 = ["#Day1", "#Day2", "#Day3", "#Day4", "#Day5"]

//Function to reduce temperatures to 2 decimal points
function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

//click function for list items
$(".cityList").on("click", function (event) {
    city = event.target.textContent;
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=393019def5a41c16a42cb577477e0a0d";
    getData();
})

//click function for button, saves input data to list and stored data
$(".add-city").on("click", function (event) {
    event.preventDefault();
    city = $("#city-input").val().trim();
    if (city == "") {
        alert("Please input a value")
        return
    }
    $("#city-input").val("");
    var listItem = $("<li>");
    listItem.text(city)
    $(".cityList").prepend(listItem);
    citySave.push(city);
    localStorage.setItem("citySave", JSON.stringify(citySave));
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=393019def5a41c16a42cb577477e0a0d"
    getData();
})

//Get Data function
function getData() {
    //Ajax function to get current weather data and longtitude and latitude
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        // Variables for collected data
        var cityName = response.name;
        var cityTemp = round(response.main.temp - 273.15, 2);
        var cityHumidity = response.main.humidity;
        var cityWindSpeed = response.wind.speed;
        var cityLat = response.coord.lat;
        var cityLon = response.coord.lon;
        var cityIcon = response.weather[0].icon;
        var cityCountry = response.sys.country;
        var queryUV = "https://api.openweathermap.org/data/2.5/uvi?appid=393019def5a41c16a42cb577477e0a0d&lat=" + cityLat + "&lon=" + cityLon;
        //Ajax function to get current UV Index with longtitude and latitude
        $.ajax({
            url: queryUV,
            method: "GET"
        }).then(function (response2) {
            var cityUV = response2.value;
            //Show all data on page
            $(".weather-points").empty();
            $(".weather-forecast").empty();
            var h1One = $("<h2>").text(cityName + ", " + cityCountry + ", " + moment().format("DD/MM/YYYY"));
            var imgicon = $("<img>").attr("src", icons + cityIcon + "@2x.png").css("float", "right").css("clear", "left");
            var h4One = $("<h4>").text("Temperature: " + cityTemp + " °C");
            var h4Two = $("<h4>").text("Humidity: " + cityHumidity + "%");
            var h4Three = $("<h4>").text("Wind Speed: " + cityWindSpeed + " MPH");
            var h4Four = $("<h5>").text("UV Index: " + cityUV).attr("class", "uvindex");
            $(".weather-points").append(imgicon, h1One, h4One, h4Two, h4Three, h4Four);
            if (cityUV > 5.9999) {
                $(".uvindex").attr("class", "uvindexsev");
            }
            else if (cityUV > 2.9999) {
                $(".uvindex").attr("class", "uvindexmod");
            }
            else {
                $(".uvindex").attr("class", "uvindexfav");
            }
            //Using Ajax and latitude and longtitude to get forecast
            var queryForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=metric&exclude=hourly,current,minutely&appid=393019def5a41c16a42cb577477e0a0d";
            $.ajax({
                url: queryForecast,
                method: "GET"
            }).then(function (response3) {
                //display 5 day forecast on screen
                for (var i = 1; i < 6; i++) {
                    var forecastTemp = (response3.daily[i].temp.max);
                    var forecastHumidity = (response3.daily[i].humidity);
                    var forecastIcon = response3.daily[i].weather[0].icon;
                    var newimgicon = $("<img>").attr("src", icons + forecastIcon + ".png");
                    var newDiv = $("<div>").attr("class", "forecast").attr("id", listOfIds[i - 1]).css("float", "left");
                    var pOne = $("<p>").text("Temp: " + forecastTemp + " °C");
                    var pTwo = $("<p>").text("Humidity: " + forecastHumidity + "%");
                    var pThree = $("<p>").text(moment().add(i, "days").format("DD/MM/YYYY")).css("font-weight", "bold");
                    $(".bottom").append(newDiv);
                    $(listOfIds2[i - 1]).append(pThree, newimgicon, pOne, pTwo);
                }
            })
        })
    })
}

//Clear list function
$(".cleary").on("click", function (event) {
    event.preventDefault();
    var confirmClear = confirm("Are you sure you want to clear all the data?")
    if (confirmClear) {
        $(".cityList").empty();
        $(".weather-points").empty();
        $(".weather-forecast").empty();
        citySave = [];
        localStorage.setItem("citySave", JSON.stringify(citySave));
    }
})

//Load Page Function, gets all the currently stored data

loadPage();

function loadPage() {
    var storedList = JSON.parse(localStorage.getItem("citySave"));
    if (storedList !== null) {
        citySave = storedList
        for (var i = 0; i < citySave.length; i++) {
            var listItem = $("<li>");
            listItem.text(citySave[i]);
            $(".cityList").prepend(listItem);
        }
    }
}