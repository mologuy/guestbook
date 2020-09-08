const express = require('express');
const mongoose = require('mongoose');
const ejs = require('ejs');
const fs = require('fs');

app = express();

dburi = JSON.parse(fs.readFileSync('secret.dburis.json'))[0];
console.log(dburi);

app.set('view engine', 'ejs');
app.get('/', function(req, res){
    res.render('index', {test: 'This is a test'});
})

//serve the rest of the files, located in public
app.use(express.static('public'));

module.exports = app;