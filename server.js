var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');


app.set('view engine', 'pug');
//built in middleware in express
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/:time', function(req,res){
  console.log(req.params.time);
  // 
  if (valid){
    res.send({"unix":req.params.time, "natural": "..."});
  } else {
    res.send({"unix": null, "natural": null});
  }
  //if req.params is a unix time stamp, return json with dates
  //else return json with null
  // res.send(req.params);
});

app.get('*', function(req,res){
  res.render('index', { title: 'TimeStampService' })
});

app.listen('3000');
console.log("Express listening on port 3000.")
