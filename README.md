HP Front End Course
====================

Overview
--------


Setup Environment
-----------------

1. Download the zip of the repository
2. Extract the zip file in the folder C:\Development\
3. Download the latest version of Node.js and Install - [Download Node.js](http://nodejs.org/download/)
4. If you are using windows add the Path of Node.js with **"set PATH=%PATH%;{{NodeJs installtion directory path}}"** for example: **"set PATH=%PATH%;C:\Program Files\nodejs"**
4. To setup NPM to work via proxy we need to run the command **npm config set proxy http://proxy.company.com:8080** or if the proxy is https use this command **npm config set https-proxy http://proxy.company.com:8080** 
5. Go to the path **"C:\Development\hp-front-end-course-master\app"** and run the commands
 - **"npm install express"**
 - **"npm install request"**
6. Run the Nodejs server - **"node app.js"** and you are ready to go...


