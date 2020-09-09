const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const {Entry} = require('./db');

app = express();

//serve dynamic frontpage with all the entries (max: 255)
app.set('view engine', 'ejs');
app.get('/', function(req, res){
    Entry.find().sort({date: 'desc'}).limit(255)
    .then(function(results){
        res.render('index', {entries: results, error: false});
    })
    .catch((err)=>{
        console.error.bind(console, err);
        res.render('index', {entries: [], error: true});
    });
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