# country-info-project

Covid Tracker by Country

## Description

This project's goal was to work as a team to pull information from two separate APIs and displayed specific elements from these databases on a webpage.  The collaborators on this project were [Samantha Haberman](https://github.com/Samantha-Ruth), [Daniel Lee](https://github.com/randiferous), and [Daryl Parrett]. 

When the user enters a country, the application should show the country's flag, capital city, population, the language, and currency of that country as well as the COVID-19 data, including active cases, the number of people in crital condition, total cases and deaths, and cases and deaths that have occurred this day.  The application was built using two API fetches while integrating javaScript event listeners, functions, and HTML styling with Bulma.  Local storage was used to list previously searched countries on the sidebar. 

![App with Country displayed](https://user-images.githubusercontent.com/64170123/171307462-5df3cd3d-3039-49b6-8940-c78743756b16.jpg)


This project helped us work together as a group, manage our time effectively, and solve problems together.  We also learned a new .css framework by reviewing documentation and implemented it in our application.   We solidified our understand of API fetches and promises, as well as dynamic styling and events in javaScript.  Future developments may include making the returned number elements more legible (adding commas), introducing maps, making data more interactive, and including cities. 


The link to the deployed project is here: https://randiferous.github.io/group-covid-project/

The url of the Git repository is here: https://github.com/randiferous/group-covid-project











(Just to keep track of our progress)

5/21 meeting:
- settled on our project idea
- sucessfully established our GitHub workflow by creating remote repository to local repos and testing pushes and pulls

5/22 meeting:
- settled on our CSS framework, Bulma
- started using Discord to host group meetings
- began building HTML skeleton, including header & form

5/23 meeting:
- tested both API server-side pulls
- set up the javascript for form submission
- test local storage getting and setting

5/24 meeting:
- completed country info API pull
- error handle using modals
- finalized user story (grilled by instructor)
- HTML search history
- test connection between form and country display

5/26 meeting:
- tested display of covid information
- made sure country list buttons display info
- addressed potential major bug where information stacked over each other

5/27 meeting:
- completed display of information
- began style of webpage

5/30 meeting:
- added clear button
- addressed duplicate country name bug
- made significant progress on styling

USER STORY:

As a inquisitive traveller, I want to know general country 
information and pertinent COVID-19 data from that country 
so I can stay informed on the pandemic status of a country 
I may visit. 

As a user, when I enter a country into the form, I am presented 
with pertinent country information (population, flag, language, 
currency). 

As a user, when I enter a country into the form, I am presented 
with past and current COVID-19 data. 

I want the list of countries I have previously searched to display on the page. 
