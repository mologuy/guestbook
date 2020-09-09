const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const { Entry } = require('./db');

app = express();

//serve dynamic frontpage with all the entries (max: 255)
app.set('view engine', 'ejs');
app.get('/', function (req, res) {
    Entry.find().sort({ date: 'desc' }).limit(255)
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
        
        newentry.save()
            .then(function (entry) {
                console.log(entry);
                res.redirect('/');
            })
            .catch(function (err) {
                throw err;
            });
    }
    catch(err) {
        console.log(err);
        res.status(500).send(`<h1>HTTP Error 500</h1>`);
    }
});

//serve the rest of the files, located in public
app.use(express.static('public'));

//exposing the app
module.exports = app;