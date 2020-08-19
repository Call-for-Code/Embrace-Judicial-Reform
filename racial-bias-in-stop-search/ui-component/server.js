// === HTTP service ===
var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const path = require('path');
var util = require('util');
var fs = require('fs');
var LINQ = require('linqjs').LINQ;

const _table_01 = require('./public/json/table-01.json');
const _table_02 = require('./public/json/table-02.json');
const _table_03 = require('./public/json/table-03.json');

var _chart_01 = "";
var _chart_02 = "";

fs.readFile('./public/json/chart-01.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  _chart_01 = data;
});

fs.readFile('./public/json/chart-02.json', 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  _chart_02 = data;
});

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// "/json/" used only fo json response
app.get('/json/chart-table-01', function (req, res) {
  res.status(200);
  res.json(_table_01);
});
app.get('/json/chart-table-02', function (req, res) {
  res.status(200);
  res.json(_table_02);
});
app.get('/json/chart-table-03', function (req, res) {
  res.status(200);
  res.json(_table_03);
});


app.get('/json/chart-01', function (req, res) {
  res.status(200);
  res.json(_chart_01);
});
app.get('/json/chart-02', function (req, res) {
  res.status(200);
  res.json(_chart_02);
});





app.get('/json/stateFilter', function (req, res) {
  const state = req.query.state;
  const rate=req.query.rate;

  let jsonObj = JSON.parse(_chart_01);

  let results = [];
  let map = new Map();
  let thresoldlist=[];

  jsonObj.forEach(function (value) {

    let rateVal;
    

    
    if(rate=="hit_rate"){
      rateVal=parseFloat(value.hit_rate);

    }else if(rate=="search_rate"){
      rateVal=parseFloat(value.search_rate);

    }else{
      rateVal=value.stop_rate;

    }

    if(!rateVal || rateVal=="NA"){
      rateVal=0;
    }



    if(state==value.state){
      if(value.inferred_threshold && value.inferred_threshold!='NA')
       thresoldlist.push(parseFloat(value.inferred_threshold));
       else
       thresoldlist.push(0);


      console.log('rateVal ---->'+rateVal);

    let val = map.get(value.subject_race);
    if (!val) {
      map.set(value.subject_race, [rateVal]);

    }else{
      //val=[];
      val.push(rateVal);
      map.set(value.subject_race, val);

    }


  }


  });

  var thresold=thresoldlist.reduce(function(a, b) { return a + b; }, 0)/thresoldlist.length;
  console.log('threshold value is ---->'+thresold)


  map.forEach((value, key) => {
    var sum = value.reduce(function(a, b) { return a + b; }, 0);
    if(thresold==0){
      results.push([key,sum/value.length, "#05EBBA",]);

    }
    else if(sum/value.length > thresold){
    results.push([key,sum/value.length, "#FF0000",]);
    }else{
      results.push([key,sum/value.length, "#05EBBA",]);

    }
  });

  
  console.log('queryResult stateFilter---> ' + JSON.stringify(results));

  res.status(200);
  res.json(JSON.stringify(results));
});








app.get('/json/stateResults', function (req, res) {
  const state = req.query.state;
  const rate=req.query.rate;

  let jsonObj = JSON.parse(_chart_01);

  let results = [];
  let map = new Map();
  let thresholdMap = new Map();

  jsonObj.forEach(function (value) {


    let rateVal;

    if(rate=="hit_rate"){
      rateVal=parseFloat(value.hit_rate);

    }else if(rate=="search_rate"){
      rateVal=parseFloat(value.search_rate);

    }else{
      rateVal=value.stop_rate;

    }
    if(!rateVal || rateVal=="NA"){
      rateVal=0;
    }



    let val = map.get(value.state);
    if (!val) {
      map.set(value.state, [ rateVal]);

    }else{
    
      val.push(rateVal);
      map.set(value.state, val);

    }




    let val1 = thresholdMap.get(value.state);
    if (!val1) {
      if(value.inferred_threshold!='NA')
      thresholdMap.set(value.state, [ parseFloat(value.inferred_threshold)]);
      else
      thresholdMap.set(value.state, [ 0]);

    }else{
    
      if(value.inferred_threshold!='NA'){
        val1.push(parseFloat(value.inferred_threshold));
        
      }else{
        val1.push(0);

      }

      thresholdMap.set(value.state, val1);

    }


  });

  map.forEach((value, key) => {
    var sum = value.reduce(function(a, b) { return a + b; }, 0);
    var threshold;
    if(thresholdMap.get(key)){
       threshold=thresholdMap.get(key).reduce(function(a, b) { return a + b; }, 0);
       threshold=threshold/thresholdMap.get(key).length;
       console.log('threshold----------->'+threshold);
    }

    if(threshold && sum/value.length > threshold){
      results.push([key,sum/value.length, "#FF0000",]);
      }else{
        results.push([key,sum/value.length, "#05EBBA",]);
  
      }

  });

  
  console.log('queryResult ddata ' + JSON.stringify(results));

  res.status(200);
  res.json(JSON.stringify(results));
});




app.get('/json/formattedResults', function (req, res) {
  const state = req.query.state;
  const city = req.query.city;
  const rate=req.query.rate;

  let jsonObj = JSON.parse(_chart_01);

  let results = [];

  jsonObj.forEach(function (value) {

    let rateVal;

   
    if(rate=="hit_rate"){
      rateVal=parseFloat(value.hit_rate);

    }else if(rate=="search_rate"){
      rateVal=parseFloat(value.search_rate);

    }else{
      rateVal=value.stop_rate;

    }
    if(!rateVal || rateVal=="NA"){
      rateVal=0;
    }


    if (value.state == state.trim() && value.subgeography == city.trim()) {
      results.push([value.subject_race, rateVal, "#05EBBA", value.inferred_threshold]);
    }


  });

  console.log('queryResult formattedResults---> ' + JSON.stringify(results));

  res.status(200);
  res.json(JSON.stringify(results));
});


app.get('/getStateDropDown', function (req, res) {
  let data = new Map();

  let jsonObj = JSON.parse(_chart_01);

  jsonObj.forEach(function (value) {
    let valData = data.get(value.state);
    if (valData) {

      if (!valData.includes(value.subgeography)) {
        valData.push(value.subgeography);
        data.set(value.state, valData);
      }
    } else {

      data.set(value.state, [value.subgeography]);
    }

  });
  console.log('state ddata ' + JSON.stringify(data));
  let jsonObject = {};
  data.forEach((value, key) => {
    jsonObject[key] = value
  });



  res.status(200);
  res.json(JSON.stringify(jsonObject));
});


app.listen(3000, () => {
  console.log('App is running');
});

