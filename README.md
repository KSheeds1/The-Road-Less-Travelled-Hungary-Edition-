# The Road Less Travelled - Hungary Edition
*The Road Less Travelled* is an interactive front-end site that aims to help users find their perfect Hungarian holiday destination. *We've done the leg work so you don't have to!* Browse the site to discover our top four destinations around Hungary to find your dream holiday destination. Our site provides you with up-to-date information on accommodation, amenities, and the best bars and restaurants in the area! We've provided all the information that you'll need in one place to research holiday destinations around Hungary to help you choose your perfect destination.  

# Demo
Access the live site [here]()
  

# UX
## User Stories
>*As the head of my family, I want to research possible holiday destinations that suit all my needs and budget so that I can holiday in Europe with my family, but without the exorbitant price tag.*

>*As an experienced traveller, I like to research my trips in advance so that I can find a travel destination that isn’t overrun with tourists.*

>*As a couple, we love going on weekend city breaks! We want to explore different city break locations so that we can find a destination that is off the beaten track but still offers all the amenities.*

>*I have been exploring the site and have a query, the answer doesn’t seem to be available on the website, I would like to find out more about it, is this possible?*

## Strategies:

* The objective of the site is to provide a well-structured platform where users can explore a variety of holiday destinations around Hungary. The Road Less Travelled not only showcases top holiday destinations but has all the practical information needed to choose the location best suited to the user. 

* To provide practical information regarding local amenities available through interactive maps, which display information and options for accommodation, restaurants, attractions, and shopping for each of our featured destinations. 
  

* The owner goal is to establish a well-structured, interactive site that is both aesthetically pleasing and user friendly in design. Which aids users to research potential holiday or travel destinations across Hungary and find all the necessary information needed to make an informed decision in one place. 


## Scope:

The functional requirements put in place help aid the user to access the content they are looking for quickly and easily.

The required content for the website is: 
* Interactive maps which provide detailed information about each location
* Location images
* General content on each location 
* Contact form 

## Structure: 

* The site is designed to foster intuitive learning; the aim is to provide an intuitive interaction between the user and the website. 
* Content is structured logically and grouped categorically.
* Users can quickly identify and access the information they are looking for.

## Skeleton: 
### Landing page wireframes:
[Landing Page desktop]()

[Landing Page mobile]()

### Budapest page wireframes:
[Budapest Page desktop]()

[Budapest Page mobile]()

### Pecs page wireframes:
[Pecs Page desktop]()

[Pecs Page mobile]()


### Siofok page wireframes:
[Siofok Page desktop]()

[Siofok Page mobile]()

### Keszthely page wireframes:
[Keszthely Page desktop]()

[Keszthely Page mobile]()

### Contact page wireframes:
[Contact Page desktop]()

[Contact Page mobile]()

## Surface:


# Features
## Existing Features:

**Google Maps API**

**Bootstrap Carousel API**

**Contact form via EmailJS API** 


## Features left to implement
**Find your dream location quiz:** 

Users can answer a series of questions that provide multiple choice answers. Depending on the answers selected by the user, the quiz will generate their ideal holiday destination and redirect them to the locations page.  

**Sky Scanner API:**

The integration of the Sky Scanner API into the site is contingent on the reopening of international borders and the decrease of travel bans globally. Given the prevalence of COVID-19 globally and it's effects on international travel, the site owner has decided to delay the integration of the Sky Scanner API, until such a time, that international travel is less restricted and that the inclusion of the API will provide additional value for the user. Until then, it's integration has been tabled for a future release.

# Technologies Used 

# Testing

## Bugs discovered and resolved during development
**Markers as links** 

In an effort to create a more interactive website, the developer aimed to create a map where the markers could be used to redirect the user to other pages of the site, about different locations in Hungary, depending on which marker was clicked.
The developer created an array "markerLocations" containing several keys of information on each location, including the URL for each location page. 
The URL was passed in the for loop within the initialisation of initMap to call and create the markers located on the map found on index.html. 
To achieve the desired functionality, an event listener was added to the markers, listening for a click event, triggering window.location.href property which created a pathway to redirect the user to the HTML page of the markers location. 


**Multiple maps and creating markers**

The developer chose to initialise the maps separately, creating an initialise function for each maP. However, upon creating of the fifth and final map a bug was found. 
Four of the location maps were initialised and set up to display the request of restaurant to trial the functionality of the maps. Each map was initialised one at a time and checked to make sure that each map was displaying markers as another map was added. 
Following the initialisation of the final map, all markers from all maps bar the final map had disappeared. The error being thrown in the console referencing the final map initialised. 
Upon further inspection, the bug was narrowed down to the "createMarker" functions, as the developer chose to initialise the maps separately, each contained their own "createMarker" function which effectively led to the function being redefined each time. 
This clarified why the markers were only displaying on the last map initialised. In order to correct this, the developer chose to declare a global variable "currentMap" and assign each map to it within the initialisation functions. 
Each callback function was moved inside the initialisation functions, where the createMarker function was called, passing the results as a parameter.
While this resolved the issue and the markers were displaying on each map, a new error was thrown, indicating there was an issue with the order in which elements were being loaded. Further inspection led to the removal of the "onload=initMaps" attribute from the body tag of index.html. 
This attribute attempted to load the map div, which had not been created at the time.     


**EmailJS**

The developer initially set up the EmailJS API using the steps outlined in the walkthrough video for the EmailJS lesson from the interactive frontend module and gained functionality. 
However, this functionality was short lived and began throwing errors in the console, surrounding a HTTP status code 400 - bad request, which translated to an issue with the user ID, necessary for the initialisation of the API. 
Although the user ID was previously initialised during the init method, the developer added it to the function in an attempt to resolve the bug, but this was not successful. In an effort to resolve this, the function put in place was replaced, in line with the documentation outlined on the dashboard of EmailJS for such status codes. 
The addition of an error/success console.log provided more information. Throwing a HTTP status code 200, this clarified that the account was indeed linked to the site however it still threw a status code 400 for a bad request, requiring the user ID. 
While attempting to debug the issue, it was noticed that parts pf the HTML for the form was set up in line with the older version of EmailJS, this was altered inline with the documentation, as well as the javascript file "sendEmail.js" being altered using the newer version of "email.sendForm" method to collect the values of the form and pass them to the specified template, with the method returning the promise. 
This finally cleared the status code 400 and functionality was established.




# Deployment

# Credits
## Content

## Media 

## Acknowledgements 
