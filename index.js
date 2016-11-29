'use strict';

var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var passport = require('./config/ppConfig');
var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');
var app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(session({
//   secret: process.env.SESSION_SECRET,
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.alerts = req.flash();
  next();
});

var homeCtrl = require('./controllers/home');
var authCtrl = require('./controllers/auth');

app.use("/", homeCtrl);
app.use("/auth", authCtrl);

app.get('/profile', isLoggedIn, function(req, res){
    res.render('profile');
})

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
