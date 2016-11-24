'use strict';

var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var app = express();

app.set('view engine', 'ejs')

app.use(ejsLayouts);
app.use(express.static(__dirname + "/public"));

var homeCtrl = require('./controllers/home');

app.use("/", homeCtrl);

app.listen(3000);
