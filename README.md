# March 2018 MonogoDB Introduction Demos

3 separate server files to test,

2 and 3 need a mongodb online account with username and password, set in the relevant server file.

see 101 mongodb_examples.pdf


server.js is one of the following, which may only make sense on localhost due to the server outputs via command window:

1. server1.js
2. server2.js
3. server3.js



Key features Server Side:
1. Express.js
2. Platform detection for server/port configuration
3. Use of test SSL Certs for localhost usage on port 3443 (or user specified)
4. mongodb proof of concept cases.
 
Platform requirements to install this application locally:

1. [Installing git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)  
2. [Installing node.js with npm](https://nodejs.org/en/download/) 
3. [Installing yarn](https://yarnpkg.com/en/)				
4. [optional, installing nodemon](https://www.npmjs.com/package/nodemon/) 

To install locally, assuming platform requirements prepared:

1. use git to clone or manually extract the zip file, 
2. open a command window in the application folder and type the following commands to start on localhost:3443. You may specify a different port number by supplying is as an argument.
    1. yarn install
    2. node server.js [port]    (or nodemon server.js  [port]if nodemon installed)
	

	
	