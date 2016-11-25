'use strict';

var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var app = express();

app.set('view engine', 'ejs')

app.use(ejsLayouts);
app.use(express.static(__dirname + "/public"));

var homeCtrl = require('./controllers/home');
var authCtrl = require('./controllers/auth');

app.use("/", homeCtrl);
app.use("/auth", authCtrl);

app.listen(3000);
