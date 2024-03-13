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

  console.log(".get Start");
  const dateEntered= req.params.date;
  let parsedDate=null;
  let stdDate=null;
  const errorMsg = {error: "Invalid Date"}

  if (req.params.date == null) {
    console.log("01 - null value");
    parsedDate = new Date().getTime();
    stdDate = new Date();
  } 

  else if (req.params.date.length > 10) {
    console.log("03 - unix date entered");
    parsedDate = new Date(parseInt(req.params.date)).getTime();
    stdDate = new Date(parseInt(req.params.date));
    console.log("03.5 p:"+parsedDate+" std: "+stdDate);
  } else {
    console.log("04 - std date entered");
     parsedDate = new Date(req.params.date).getTime();
     stdDate = new Date(req.params.date);
     if (!isNaN(parsedDate)) { 
     console.log("04.5 date ok " + parsedDate) } else {
     console.log("04.5 date kak " + parsedDate)
     return res.json(errorMsg);};
    
  }

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const utcDate = `${days[stdDate.getUTCDay()]}, ${stdDate.getUTCDate()} ${months[stdDate.getUTCMonth()]} ${stdDate.getUTCFullYear()} ${('0' + stdDate.getUTCHours()).slice(-2)}:${('0' + stdDate.getUTCMinutes()).slice(-2)}:${('0' + stdDate.getUTCSeconds()).slice(-2)} GMT`;

  // 

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


  // const utcDate = new Date(parsedDate).toLocaleDateString('en-ZA', options) + ' GMT';
  const dateObject = {unix:parsedDate, utc:utcDate};
  res.json(dateObject);
} );



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});