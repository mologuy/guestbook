const express = require('express');
const ejs = require('ejs');
const {Entry} = require('./db');

app = express();

app.set('view engine', 'ejs');
app.get('/', function(req, res){
    res.render('index', {test: 'This is a test'});
})

//serve the rest of the files, located in public
app.use(express.static('public'));

//exposing the app
module.exports = app;