'use strict';

var ejsLayouts = require('express-ejs-layouts');
var session = require('express-session');
var passport = require('./config/ppConfig');
var flash = require('connect-flash');
var express = require('express');
var app = express();

app.set('view engine', 'ejs')

app.use(ejsLayouts);
app.use(express.static(__dirname + "/public"));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(function(req, res, next){
    res.locals.alerts = req.flash();
    res.locals.currentUser = req.user;
    next();
});

var homeCtrl = require('./controllers/home');
var authCtrl = require('./controllers/auth');

app.use("/", homeCtrl);
app.use("/auth", authCtrl);

app.listen(3000);
