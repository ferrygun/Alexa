'use strict'

let express = require("express");
let alexa = require("alexa-app");

let PORT = process.env.port || 5000;
let app = express();
let requestppt = require('request');

// ALWAYS setup the alexa app and attach it to express before anything else.
let alexaApp = new alexa.app("test");

alexaApp.express({
  expressApp: app,

  // verifies requests come from amazon alexa. Must be enabled for production.
  // You can disable this if you're running a dev environment and want to POST
  // things to test behavior. enabled by default.
  checkCert: false,

  // sets up a GET route when set to true. This is handy for testing in
  // development, but not recommended for production. disabled by default
  debug: false
});

// now POST calls to /test in express will be handled by the app.request() function

// from here on you can setup any other express routes or middlewares as normal
app.set("view engine", "ejs");

alexaApp.launch(function(request, response) {
  response.say("You launched the app!");
});


alexaApp.intent("PlanMyTrip", {
  },
  function(request, response) {
    response.say("Success!");
  }
);


alexaApp.intent("pptnextslide", {
  },
  function(request, response) {
	console.log('next slide');
	
	requestppt.get('http://localhost:3000/?next',function(err,res,body){
		if(err) {//TODO: handle err
		}
		if(res.statusCode !== 200 ) {//etc
			//TODO Do something with response
		}
	});

    response.say("next slide");
  }
);

alexaApp.intent("pptprevslide", {
  },
  function(request, response) {
	console.log('prev slide');

	requestppt.get('http://localhost:3000/?previous',function(err,res,body){
		if(err) {//TODO: handle err
		}
		if(res.statusCode !== 200 ) {//etc
			//TODO Do something with response
		}
	});

    response.say("previous slide");
  }
);

alexaApp.intent("ppttoslide", {
  },
  function(request, response) {
	console.log('to slide');

	let slidenumber = request.slot('slidenumber');
	console.log('slidenumber: ' + slidenumber);

	requestppt.get('http://localhost:3000/?slide=' + slidenumber,function(err,res,body){
		if(err) {//TODO: handle err
		}
		if(res.statusCode !== 200 ) {//etc
			//TODO Do something with response
		}
	});

    response.say("to slide");
  }
);
app.listen(PORT);
console.log("Alexa PowerPoint Listening on port " + PORT + ", try http://localhost:" + PORT + "/test");
