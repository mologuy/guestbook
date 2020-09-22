const mongoose = require('mongoose');
const fs = require('fs');

//getting database uri from secret.dburis.json file
//must be a json file containing an array of strings
dburi = JSON.parse(fs.readFileSync('secret.dburis.json'))[0];

//connecting to database
mongoose.connect(dburi, {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;

//displaying connection error, if any occur
db.on('error', console.error.bind(console, 'Database connection error:'));
//displaying succesful connection message
db.once('open', function() {
  console.log('Connected to database');
});

//defining the 'Entry' model for the database
const entrySchema = new mongoose.Schema({
    name: {type: String, default: 'Anonymous'},
    body: {type: String, default: null},
    date: {type: Date, default: Date.now}
});
const Entry = mongoose.model('Entry', entrySchema);

//exposing the Entry model
module.exports = {Entry};