'use strict';

var express = require('express');
var router = express.Router();
var db = require("../models");

router.get("/signup", function(req, res){
    res.render('signup')
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
            console.log('User created!');
            res.redirect("/");
        } else {
            // if not created, the email already exisits
            console.log("Email already exisits");
            res.redirect("/auth/signup");
        }
    }).catch(function(error){
        console.log("An error occurred: " + error.message);
        res.redirect("/auth/signup");
    });
});

router.get("/login", function(req, res){
    res.render('login');
});

router.post("/login", function(req, res){

});

module.exports = router;