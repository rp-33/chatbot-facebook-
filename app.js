var express = require('express');
var bodyParser = require('body-parser');
var app = express();


var Router = require('./route.js');

app.use(bodyParser.json());

app.use('/', Router);



app.listen(3000,()=>{
    console.log('environment 3000')
})