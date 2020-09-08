const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const {Entry} = require('./db');

app = express();

app.set('view engine', 'ejs');
app.get('/', function(req, res){
    res.render('index', {test1: 'This is a test'});
})

//Add new entries by POST, using an html form
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/submit', function(req, res){
    var newentry = new Entry({
        name: req.body.name,
        body: req.body.body
    });
    newentry.save()
    .then(function(entry){
        console.log(entry);
    })
    .catch(function(err){
        console.log(err);
    });
    res.send(JSON.stringify(newentry));
});

//serve the rest of the files, located in public
app.use(express.static('public'));

//exposing the app
module.exports = app;