var express = require('express');
var bodyParser = require('body-parser');
var filterData = require('./filter.js');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// GET /
app.get('/', function(req, res) {
    res.send('Please send a JSON request.');
});

// POST /
app.post('/', function(req, res) {
    var acceptsJSON = req.get('content-type');
    var jsonObj = req.body;

    if (acceptsJSON === 'application/json') {
        filterData(jsonObj).then( function(jsonResult) {
            res.send(jsonResult);    
        }).catch( function(error) {
            res.status(404).send(error);
        });
    } else {
        res.status(404).send({error: 'Could not decode request: JSON parsing failed'});    
    }
});

app.listen(PORT, function() {
    console.log('Server started on port: ' + PORT);
});