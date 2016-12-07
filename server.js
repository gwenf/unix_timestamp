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
  var unix = null;
  var nat = null;

  if (moment(date, "MMMM D, YYYY").isValid()){
    if (isNaN(parseInt(date))){
      unix = moment(date, "MMMM D, YYYY").format("X");
    } else {
      unix = date;
    }
    nat = moment.unix(unix).format("MMMM D, YYYY");

    res.send({"unix":unix, "natural": nat});

  } else {
    console.log('date not valid');
    res.send({"unix": unix, "natural": nat});
  }
});

app.get('*', function(req,res){
  res.render('index', { title: 'TimeStampService' })
});

var port = process.env.PORT || 8080;

app.listen(port);
console.log("Express listening on port...")
