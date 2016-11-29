'use strict';

var express = require('express');
var router = express.Router();
var db = require("../models");
var passport = require('../config/ppConfig');

router.get("/signup", function(req, res){
    res.render('auth/signup')
});

router.post("/signup", function(req, res){
    db.user.findOrCreate({
        where: { email: req.body.email },
        defaults: {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password
        }
    }).spread(function(user, created){
        if(created){
            // if created, success and redirect home
            passport.authenticate('local', {
                successRedirect: '/',
                sussessFlash: 'Accounted created and signed in'
            })(req, res)
        } else {
            // if not created, the email already exisits
            req.flash('error', 'Email already exisits');
            res.redirect("/auth/signup");
        }
    }).catch(function(error){
        req.flash('error', error.message);
        res.redirect("/auth/signup");
    });
});

router.get("/login", function(req, res){
    res.render('auth/login');
});

router.post("/login", passport.authenticate("local", {
    susscessRedirect: "/",
    failureRedirect: "/auth/login",
    failureFlash: 'Invalid username and/or password',
    successFlash: 'You have logged in'
}));

router.get('/logout', function(req, res){
    req.logout();
    console.log('logged out');
    res.redirect('/');
});

module.exports = router;