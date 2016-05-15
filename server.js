var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var moment = require('moment');
moment().format();

app.set('view engine', 'pug');
//built in middleware in express
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/:time', function(req,res){
  var date = req.params.time;
  // var unix = moment(date, "MMMM D, YYYY").format("X");
  var unix = null;
  // var nat = moment.unix(unix).format("MMMM D, YYYY");
  var nat = null;
  // console.log(parseInt(date))

  // var isValid = moment(date, "MMMM D, YYYY").isValid();
  if (moment(date, "MMMM D, YYYY").isValid()){
    nat = moment.unix(unix).format("MMMM D, YYYY");
    if (isNaN(parseInt(date))){
      unix = moment(date, "MMMM D, YYYY").format("X");
    } else {
      unix = date;
    }
    console.log('date valid');

    res.send({"unix":unix, "natural": nat});
  // } else if (moment.unix(unix).isValid()){
    // console.log('unix date');
    // res.send({"unix":unix, "natural": nat});
  } else {
    console.log('date not valid');
    res.send({"unix": unix, "natural": nat});
  }

  // console.log(date >= 0);
  //
  // console.log(unix);
  // console.log(nat);
  //
  // if (unix){
  //   res.send({"unix":unix, "natural": nat});
  // } else {
  //   res.send({"unix": null, "natural": null});
  // }
  //if req.params is a unix time stamp, return json with dates
  //else return json with null
  // res.send(req.params);
});

app.get('*', function(req,res){
  res.render('index', { title: 'TimeStampService' })
});

var port = process.env.PORT || 8080;

app.listen(port);
console.log("Express listening on port...")
