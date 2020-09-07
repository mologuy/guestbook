const express = require('express');

app = express();

app.get('/', function(req, res){
    res.send('Express App');
})

module.exports = app;