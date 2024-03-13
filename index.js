// index.js --DIMITIR
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

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


app.get("/api/:date?", function (req, res) {

  let parsedDate=null;
  const errorMsg = {error: "Invalid Date"}

  if (req.params.date == null) {
    console.log("01");
    parsedDate = new Date();
  } 

  else if (req.params.date.length > 10) {
    console.log("03");
    parsedDate = new Date(parseInt(req.params.date)).getTime()
  } else {
    console.log("04");
     parsedDate = new Date(req.params.date).getTime();
  }

  console.log(parsedDate);
  console.log(typeof parsedDate);

 const options = {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: false, // Use 24-hour format
    timeZone: 'UTC'  // Format in UTC
  };


  const utcDate = new Date(parsedDate).toLocaleDateString('en-ZA', options) + ' GMT';
  const dateObject = {unix:parsedDate, utc:utcDate};
  res.json(dateObject);
} );



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});