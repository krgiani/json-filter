var express = require('express');
var bodyParser = require('body-parser');
var filterData = require('./filter.js');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST /
app.post('/', function(req, res) {
    var jsonObj = req.body;

    filterData(jsonObj).then( function(jsonResult) {
        res.send(jsonResult);    
    }).catch( function(err) {
        res.send({error:  err});
    });
});

app.listen(PORT, function() {
    console.log('Express listening on port: ' + PORT);
});