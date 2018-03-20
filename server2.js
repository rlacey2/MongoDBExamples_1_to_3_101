// http://doduck.com/node-js-mongodb-hello-world-example/
console.log("This is not a server with an api for aysnch behaviour yet!");
console.log("connects to mlab.com")

var http = require('http');
var https = require('https'); 
var fs = require('fs');  // for loading localhost test certs
var express = require('express');
var platform = require('./node_server/platform.js').configure();
var MongoClient = require('mongodb').MongoClient;
var app = express();
 
// mongodb://<dbuser>:<dbpassword>@ds053858.mlab.com:53858/testing01
//var portNo = process.env.port || 8021;

if (platform.isLocalHost) { //was cfCore.isLocal
// openssl genrsa -out test-key.pem 1024 
// openssl req -new -key test-key.pem -out certrequest.csr
// openssl x509 -req -in certrequest.csr -signkey test-key.pem -out test-cert.pem	
	console.log("*** Using temp SSL keys on the nodejs server");
	var privateKey   = fs.readFileSync('ssl/test-key.pem');
	var certificate  = fs.readFileSync('ssl/test-cert.pem'); 

    var localCertOptions = {  // use local self-signed cert
        key: privateKey, 
        cert: certificate, 
        requestCert: false, 
        rejectUnauthorized: false 
    }; 		
		
    https.createServer (localCertOptions, app).listen (platform.port, function () { 
	   console.log(new Date().toISOString());
	  // console.log(__dirname + '/_ngClient');
    }); 
 	
} else { // not local, its in the cloud somewhere, assuming cloud provides ssl certs

    if (platform.architecture === "bluemix") // could refactor next 2, leaving separate incase needed in future
	{
		app.listen(platform.port, function() {
		    console.log (platform.architecture + ' server startup port: ' + platform.port); 
		}); 
	}
	else 
		if (platform.architecture === "heroku")
	{ 
		app.listen(platform.port, function() {
		    console.log (platform.architecture + ' server startup port: ' + platform.port); 
		}); 			
	}		
}    
 

var stdCollection;   // this will be the eventual access to a collection with mongoDB

 

var connectURL = "mongodb://nodejs:nodejs@ds053858.mlab.com:53858/testing01";

MongoClient.connect(connectURL)
		.then(client => {
				console.log("connected to the mongoDB using ^3.0.4");
				stdCollection = client.db('testing01').collection('students');
				stdCollection.insert({name: "bloggs, joe", course: "ssd", year : 4})
				    .then ( stdCollection => {
								console.log("student entry saved");	
						})
					.catch( error => {
								console.log("error saving student");	
								console.log(error);	
						});
		})
		.catch( error => {		 
				console.log(error);				 
			})
