# Homework Week 6- Weather Dashboard

This project is to create a workday scheduler using jquery and moment APIs that saves data to the local storage and features dynamically updated HTML and CSS.

## User Story

```
AS someone planning to travel
I want to be able to get the weather forecast of the places I'm travelling to
SO THAT I can organise my trip effectively
```

## Acceptance Criteria

GIVEN a weather dashboard with form inputs
WHEN I search for a city
THEN I am presented with current and future conditions for that city and that city is added to the search history
WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
WHEN I view the UV index
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, and the humidity
WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city
WHEN I open the weather dashboard
THEN I am presented with the last searched city forecast
```

The following image demonstrates the what I was trying to replicate:

![weather dashboard demo](./Assets/06-server-side-apis-homework-demo.png)

## Steps

Firstly I created the template using CSS and Google Fonts. Used bootstrap for the columns and rows, but also decided to create a sidecar seperately outside the container.

I used Open Weather API to search current weather data by city name. As I could find a way to get the UV Index and Forecast without the latitude and longitude, I used the latitude and longitude data sourced from the current weather data to search for these responses. I used Moment.js to display the current date/ dates for the respective forecast.

I used jquery to append the data to the page to prevent the script from being too complicated (or more complicated then it already is). The cities input into the main search box are saved into the local storage of the browser, and displayed under the search box. CSS and an event function is used to ensure if the user clicks an existing city the weather data displays.

A for loop is used to grab the forecast data over the next 5 days. I used an array for different id's to attribute to the div containers that contain each day's data.

## Next Steps/ Improvements/ Bugs

My next step is to create a function that looks up the value input into the city field and looks to see if it has already been input before. The function would then display the city weather data but wouldn't add it to the list or stored data, so that the city does not appear twice.

I'd like to go further and then ensure that if a city input doesn't return a result from Open Weather, it won't add the city to the list of searched cities.

I'd also like to include a small clear button next to each item on the list of cities so they can be individually removed.

I'd like to spend some time refactoring the code and learning more about Open Weather API to make it simpler. Due to my limited knowledge of the API I believe I didn't simplify the script as much as it could have been. I've already noticed that I could probably remove one of my Ajax functions (the first one), if I had more time.

## Deployment

The repository can be found here: https://github.com/chages16/Weather-Dashboard

The application, can be found here: https://chages16.github.io/Weather-Dashboard/

## Built With

* [Visual Studio Code](https://code.visualstudio.com/)
* [Bootstrap](https://getbootstrap.com/)
* [J Query](https://jquery.com/)
* [Moment.js](https://momentjs.com/)
* [Google Fonts](https://developers.google.com/fonts)
* [Open Weather API](https://openweathermap.org/)

## Versioning

1.0.0 

## Application View
![Screenshot](./Assets/wdscreenshot.png)

## Authors

* **Chris Hage** - *Weather Dashboard* - [Chages16](https://github.com/chages16/)

## Acknowledgments

* Uni SA Coding Bootcamp
