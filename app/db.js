const mongoose = require('mongoose');
const fs = require('fs');

//getting database uri from secret,dburis.json file
//must be a json file containing an array of strings
dburi = JSON.parse(fs.readFileSync('secret.dburis.json'))[0];

//connecting to database
mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

//displaying connection error, if any
db.on('error', console.error.bind(console, 'Database connection error:'));
//displaying succesful connection message
db.once('open', function() {
  console.log('Connected to database');
});

module.exports = db;