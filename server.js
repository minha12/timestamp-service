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
/*
2.A date string is valid if can be successfully parsed by new 
Date(date_string) (JS) . Note that the unix timestamp needs 
to be an integer (not a string) specifying milliseconds. In 
our test we will use date strings compliant with ISO-8601 
(e.g. "2016-11-20") because this will ensure an UTC timestamp.
*/
app.get('/api/timestamp/:date_string', function(req, res){
  
  String.prototype.isNumber = function(){
    return /^\d+$/.test(this)
  }
  /*
  4.If the date string is valid the api returns a JSON having the 
  structure {"unix": <date.getTime()>, "utc" : <date.toUTCString()> } 
  e.g. {"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}.
  */
  
  var dateString = req.params.date_string
  var dateObject = new Date(dateString)
  
  if(dateString.isNumber() ){
    let dateInt = parseInt(dateString)
    res.json({
      'unix': new Date(dateInt).getTime(),
      'utc': new Date(dateInt).toUTCString()
    })  
  }else if(dateObject.toString() === 'Invalid Date'){
    res.json({"unix": null, "utc" : "Invalid Date" })
  } else {
    res.json({
      'unix': dateObject.valueOf(),
      'utc': dateObject.toUTCString()
    })
  } 
  
  
    /*
    5.If the date string is invalid the api returns a JSON 
    having the structure {"unix": null, "utc" : "Invalid Date" }. 
    It is what you get from the date manipulation functions used above.
    */
    
  
})
/*
3. If the date string is empty it should be equivalent to 
trigger new Date(), i.e. the service uses the current timestamp.
*/
app.get('/api/timestamp', function(req, res){
  res.json({ unix: Date.now(), utc: Date() });
})

///////////// END OF MY APP ///////////////////////////


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});