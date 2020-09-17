const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { Entry } = require('./db');

app = express();

//serve dynamic frontpage with the latest 20 entries
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    Entry.find().sort({ date: 'desc' }).limit(20)
        .then(function (results) {
            res.render('index', { entries: results, error: false });
        })
        .catch((err) => {
            console.error.bind(console, err);
            res.render('index', { entries: [], error: true });
        });
})

//Add new entries by POST, using an html form
//expects name and body fields
app.use(bodyParser.urlencoded({ extended: false }));
app.post('/submit', function (req, res) {
    try {
        //trimming fields
        req.body.body = req.body.body.trim();
        req.body.name = req.body.name.trim();
        //checking if name exists
        if(req.body.name == '')
            throw new Error('name is empty');
        var newentry = new Entry({
            name: req.body.name,
            body: req.body.body,
            date: new Date().now
        });
        //if body empty, make it null
        if (req.body.body == '')
            newentry.body = null;
        //saving entry and redirecting to success page
        newentry.save()
            .then(function (entry) {
                console.log(entry);
                res.redirect('/success');
            })
            .catch(function (err) {
                throw err;
            });
    }
    catch(err) {
        //if there was an error, redirect to an error page
        console.log(err);
        res.redirect('/error');
    }
});

app.get('/success', function(req, res){
    res.render('success', {});
});

app.get('/error', function(req, res){
    res.status(500);
    res.render('error');
});

//serve the rest of the files, located in public
app.use(express.static('public'));

//exposing the app
module.exports = app;