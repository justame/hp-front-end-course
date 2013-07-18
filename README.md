HP Front End Course
====================

Overview
--------
In this course you will have to develop Youtube playlist, the course is divided to 3 steps,

####Step 1 
- Build a basic layout, use [Twitter Bootstrap](http://twitter.github.io/bootstrap/)
- Build static playlist and embed Youtube video with no javascript or data fetched from the server

 The page should look like the [step1.png](https://github.com/justame/hp-front-end-course/blob/master/printscreens/step1.png) in the "printscreens" directory

####Step 2
- Add [jQuery](http://jquery.com/) to the static page 
- Use the static data file to emulates the server data **(app/js/StaticData.js)**
- Build the Youtube list (left column) that fetched from the static data ,using jQuery
- Build the Youtube playlist using jQuery
- Add the functionality to add video from the list to the playlist -  “Add to playlist” button, the playlist will be stored in the [**localStorage**](http://www.w3schools.com/html/html5_webstorage.asp) and after refreshing the page it the playlist should populate itself from the [**localStorage**]localStorage(http://www.w3schools.com/html/html5_webstorage.asp) 
- Add the functionality to remove a video from the playlist
- Add the functionality to watch a video when the user clicks on it

The page should look like the [step2.png](https://github.com/justame/hp-front-end-course/blob/master/printscreens/step2.png) in the "printscreens" directory

####Step 3
- Add Search box above the filter on the left column
- Click on the search button will make AJAX request to the running web server(NodeJs) server that will pull the data and will update the video list

The page should look like the [step3.png](https://github.com/justame/hp-front-end-course/blob/master/printscreens/step3.png) in the "printscreens" directory


Setup Environment
-----------------

1. Download the zip of the repository

2. Extract the zip file in the folder C:\Development\

3. Download the latest version of Node.js and Install - [Download Node.js](http://nodejs.org/download/)

4. If you are using windows add the Path of Node.js with **"set PATH=%PATH%;{{NodeJs installtion directory path}}"** for example: **"set PATH=%PATH%;C:\Program Files\nodejs"**

5. To setup NPM to work via proxy we need to run the command **"npm config set proxy http://proxy.company.com:8080"** or if the proxy is https use this command **"npm config set https-proxy http://proxy.company.com:8080"** 

6. Go to the path **"C:\Development\hp-front-end-course-master\app"** and run the commands
 - **"npm install express"**
 - **"npm install request"**
7. Run the Nodejs server - **"node app.js"** and you are ready to go... the server will run on localhost port **8080**
8. To check if the server is returning data go to the **http://localhost:8080/youtube/videos** via the browser you can try send a query too like this - **http://localhost:8080/youtube/videos?q="hp company"**


