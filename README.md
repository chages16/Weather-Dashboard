# Homework Week 5- Work Day Scheduler

This project is to create a workday scheduler using jquery and moment APIs that saves data to the local storage and features dynamically updated HTML and CSS.

## User Story

```
AS A coding bootcamp student
I WANT to add important events to a daily planner
SO THAT I can manage my time effectively
```

## Acceptance Criteria

```
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
THEN the current day is displayed at the top of the calendar
WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist
```

## Steps

Using Javascript and JQueryand the skills from class, I used arrays, If functions and loops, and the Moment.js APIs to create a dailr workday scheduler.

The first step was to learn moment.js functions in order to both generate the current day and output it in the header, and to generate the current hour.

My second step was to analyse the CSS provided code to determine what classes were required to change the colour scheme based on the time during the day. Using JQuery I created a function that added the class to the row based on whether or not the corresponding time was in the past/ present or future, by comparing it to the current hour.

Finally, after the template was corrected, I assigned a variable to an array that collected all the information typed into a text field when the corresponding save button was clickes. This array then pushed the data to the local storage.

Whenever the page is opened, I created a function that would check for any existing local storage, and transfer it back to the array and into the corresponding text boxes, ensuring that all saved data would remain on screen.

To make the project my mine, I made a few additions:

1. A clear function activated by a button that would erase all the data within the table.
2. A function that stores the current date every time the application is run in the morning, and compares it with the date that is already there (if one exists). If the dates do not match, it sends an alert to the user letting them know the day has change and asks if the user wants to clear all the data.
3. A save all function so you can save all the inputs.

I ran the functions a few times and manually altered the system time to ensure it met all acceptance criteria.

## Next Steps/ Improvements

My next steps would be to improve the CSS to make the application work better on phones rather than just laptop screens. I managed to manually alter the widths with media queries but would like to improve them.

I'd also like to be able to schedule future days, choose between days and have the content change depending what day was selected.

## Deployment

The repository can be found here: https://github.com/chages16/WorkDayScheduler

The website, can be found here: https://chages16.github.io/WorkDayScheduler/

## Built With

* [Visual Studio Code](https://code.visualstudio.com/)
* [Bootstrap](https://getbootstrap.com/)
* [J Query](https://jquery.com/)
* [Moment.js](https://momentjs.com/)


## Versioning

1.0.0 

## Authors

* **Chris Hage** - *Work Day Generator* - [Chages16](https://github.com/chages16/)

## Acknowledgments

* Bootstrap
* Uni SA Coding Bootcamp
