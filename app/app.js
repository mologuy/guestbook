const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const fs = require('fs');

app = express();

//getting database uri from secret,dburis.json file
//must be a json file containing an array of strings
dburi = JSON.parse(fs.readFileSync('secret.dburis.json'))[0];

app.set('view engine', 'ejs');
app.get('/', function(req, res){
    res.render('index', {test: 'This is a test'});
})

//serve the rest of the files, located in public
app.use(express.static('public'));

module.exports = app;