const app = require('./app/app.js');

//Get Environment PORT, if there's not one default to 3000
const port = process.env.PORT || 3000;

app.listen(port, function(){
    console.log(`listening on port ${port}`);
});