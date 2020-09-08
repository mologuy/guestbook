const express = require('express');
const db = require('./db')
const ejs = require('ejs');

app = express();

app.set('view engine', 'ejs');
app.get('/', function(req, res){
    res.render('index', {test: 'This is a test'});
})

//serve the rest of the files, located in public
app.use(express.static('public'));

module.exports = app;