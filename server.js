// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

///////////// START OF MY APP /////////////////////////
?8
app.get('api/timestamp/:date_string', function(req, res){
  
})
/*
3. If the date string is empty it should be equivalent to 
trigger new Date(), i.e. the service uses the current timestamp.
*/
app.get('/api/timestamp', function(req, res){
  res.json({'Date': new Date()} )
})

///////////// END OF MY APP ///////////////////////////


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});