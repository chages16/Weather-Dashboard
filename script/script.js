var queryURL = "";
var city = "";
var icons = "http://openweathermap.org/img/wn/"
var citySave = [];



function round(value, decimals) {
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}

$(".cityList").on("click", function (event) {
    console.log("nkrnfrkjnnj");
    city = event.target.textContent;
    console.log(city)
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=393019def5a41c16a42cb577477e0a0d";
    getData();

})

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
    console.log(listItem);
    $(".cityList").prepend(listItem);
    citySave.push(city);
    localStorage.setItem("citySave", JSON.stringify(citySave));
    console.log("hi");
    queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=393019def5a41c16a42cb577477e0a0d"
    console.log(queryURL);
    getData();
})

function getData() {
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        console.log(response.name)
        // Storing the rating data
        var cityName = response.name;
        var cityTemp = round(response.main.temp - 273.15, 2);
        var cityHumidity = response.main.humidity;
        var cityWindSpeed = response.wind.speed;
        var cityLat = response.coord.lat;
        var cityLon = response.coord.lon;
        var cityIcon = response.weather[0].icon;
        var cityCountry = response.sys.country;
        console.log(cityCountry)
        console.log(cityIcon);
        console.log(cityName);
        console.log(cityTemp);
        console.log(cityHumidity);
        console.log(cityWindSpeed);
        console.log(cityLat);
        console.log(cityLon);
        var queryUV = "https://api.openweathermap.org/data/2.5/uvi?appid=393019def5a41c16a42cb577477e0a0d&lat=" + cityLat + "&lon=" + cityLon;
        $.ajax({
            url: queryUV,
            method: "GET"
        }).then(function (response2) {
            console.log(response2);
            console.log(queryUV)
            var cityUV = response2.value;
            console.log(cityUV);
            $(".weather-points").empty();
            var h1One = $("<h2>").text(cityName + ", " + cityCountry + ", " + moment().format("DD/MM/YYYY"));
            var imgicon = $("<img>").attr("src", icons + cityIcon + "@2x.png").css("float", "right").css("clear", "left");
            console.log(imgicon);
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
            var queryForecast = "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&units=metric&exclude=hourly,current,minutely&appid=393019def5a41c16a42cb577477e0a0d";
            $.ajax({
                url: queryForecast,
                method: "GET"
            }).then(function (response3) {
                console.log(response3);
                console.log(queryForecast);
                console.log(response3.daily[1].temp.max);
                console.log(response3.daily[1].humidity);
                console.log(response3.daily[1].weather[0].icon);
                var forecastIcon = response3.daily[1].weather[0].icon;
                console.log(queryForecast);
                var newimgicon = $("<img>").attr("src", icons + forecastIcon + ".png").css("float", "right").css("clear", "left");
                console.log(newimgicon);
            })
        })
    })
}

$(".cleary").on("click", function (event) {
    event.preventDefault();
    var confirmClear = confirm("Are you sure you want to clear all the data?")
    if (confirmClear) {
        $(".cityList").empty();
        citySave = [];
        localStorage.setItem("citySave", JSON.stringify(citySave));
    }
})



/*
    // Displaying the rating
    movieDiv.append(pOne);

    // Storing the release year
    var released = response.Released;

    // Creating an element to hold the release year
    var pTwo = $("<p>").text("Released: " + released);

    // Displaying the release year
    movieDiv.append(pTwo);

    // Storing the plot
    var plot = response.Plot;

    // Creating an element to hold the plot
    var pThree = $("<p>").text("Plot: " + plot);

    // Appending the plot
    movieDiv.append(pThree);

    // Retrieving the URL for the image
    var imgURL = response.Poster;

    // Creating an element to hold the image
    var image = $("<img>").attr("src", imgURL);

    // Appending the image
    movieDiv.append(image);

    // Putting the entire movie above the previous movies
    $("#movies-view").prepend(movieDiv);
    */

loadPage();

function loadPage() {
    var storedList = JSON.parse(localStorage.getItem("citySave"));
    if (storedList !== null) {
        citySave = storedList
        for (var i = 0; i < citySave.length; i++) {
            console.log("000");
            var listItem = $("<li>");
            listItem.text(citySave[i]);
            $(".cityList").prepend(listItem);
        }
    }
}

