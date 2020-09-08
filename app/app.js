const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const fs = require('fs');

app = express();

app.set('view engine', 'ejs');
app.get('/', function(req, res){
    res.render('index', {test1: 'test'});
})

module.exports = app;