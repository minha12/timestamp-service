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
app.get('api/timestamp/:date', function(req, res){
  String.prototype.isNumber = function(){
    return /^d+$/.test(this)
  }
  /*
  4.If the date string is valid the api returns a JSON having the 
  structure {"unix": <date.getTime()>, "utc" : <date.toUTCString()> } 
  e.g. {"unix": 1479663089000 ,"utc": "Sun, 20 Nov 2016 17:31:29 GMT"}.
  */
  console.log(req.params.date)
  if(req.params.date.includes("-")){
    res.json({
      'unix': new Date(req.params.date).getTime(),
      'utc': new Date(req.params.date).toUTCString()
    })
  }else if(req.params.date.isNumber){
    res.json({
      'unix': new Date(parseInt(req.params.date)).getTime(),
      'utc': new Date(parseInt(req.params.date)).toUTCString()
    })  
  }else{
    /*
    5.If the date string is invalid the api returns a JSON 
    having the structure {"unix": null, "utc" : "Invalid Date" }. 
    It is what you get from the date manipulation functions used above.
    */
    res.json({
      'unix': null,
      'utc': 'Invalid Date'
    })
  }
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