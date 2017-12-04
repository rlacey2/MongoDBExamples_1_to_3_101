// http://doduck.com/node-js-mongodb-hello-world-example/
console.log("This is not a server with an api for aysnch behaviour yet!");
console.log("connects to mlab.com")
 
var http = require('http');
var https = require('https'); 
var fs = require('fs');  // for loading localhost test certs
var express = require('express');
var platform = require('./node_server/platform.js').configure();

var app = express();
 
// mongodb://<dbuser>:<dbpassword>@ds053858.mlab.com:53858/testing01
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
	   console.log(__dirname + '/_ngClient');
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
 




var MongoClient = require('mongodb').MongoClient;
 
var myCollection;

var db = MongoClient.connect('mongodb://XXXXXX:YYYYYY@ds053858.mlab.com:53858/testing01', function(err, db) {
    if(err)
        throw err;
    console.log("connected to the mongoDB !");
	
	console.log("use the browser or postman to get:    server:portno/api/v1/students");
	
    myCollection = db.collection('students'); // creates the collection if it does not exist
});

var getStudents = function(findOptions, cb) {
        myCollection.find(findOptions).toArray(cb);
    }
 
app.get('/api/v1/students', function(req, res) {
  
    console.log('/api/v1/students');
	 
	var findOptions = {};
	
	getStudents( findOptions,  function(err, results) {
	 
	if(err)
		{// throw err;
			console.log("error:");
			console.log(err.message);
			res.status(404);
			res.json({"error": err.message});
		} 
	res.status(200);
	console.log(results);
	res.json(results);	
	});
});


app.get('/', function(req, res) { // requires express to handle requests, hence will not work yet
  
     
	 res.send('use: /api/v1/students');
});
 
 