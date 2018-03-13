'use strict'

let ss = require('slideshow');
let slideshow = new ss("powerpoint");

let pptfilename = 'sample.pptx';

slideshow.boot()
.then(function () { slideshow.open(pptfilename) })

const http = require('http')  
const port = 3000

const requestHandler = (request, response) => {  
  console.log(request.url)
  
  if(request.url.indexOf("next") !== -1){
    console.log("next slide");
	slideshow.boot()
	.then(function () { slideshow.start() })
    .then(function () { slideshow.next() })
  }
  
  if(request.url.indexOf("previous") !== -1){
    console.log("previous slide");
	slideshow.boot()
    .then(function () { slideshow.start() })
    .then(function () { slideshow.prev() })
  }
  
  if(request.url.indexOf("slide") !== -1){
	let slideno = request.url.split('=')[1];
    console.log("go to slide: " + slideno);
	slideshow.boot()
    .then(function () { slideshow.start() })
    .then(function () { slideshow.goto(slideno) })
	
  }

  response.end('Alexa PowerPoint Controller')
}

const server = http.createServer(requestHandler)

server.listen(port, (err) => {  
  if (err) {
    return console.log('Error: something bad happened', err)
  }

  console.log('Alexa PowerPoint Controller is listening on port ' + port);
})
