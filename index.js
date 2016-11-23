var ejsLayouts = require('express-ejs-layouts');
var express = require('express');
var app = express();

app.set('view engine', 'ejs')

app.use('ejsLayouts');
