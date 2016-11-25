'use strict';

var express = require('express');
var router = express.Router();

router.get("/signup", function(req, res){
    res.render('signup')
});

router.post("/signup", function(req, res){

});

router.get("/login", function(req, res){
    res.render('login');
});

router.post("/login", function(req, res){

});

module.exports = router;