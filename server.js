var express = require('express');
var bodyParser = require('body-parser');
var filterData = require('./filter.js');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST /
app.post('/', function(req, res, next) {
    var acceptsJSON = req.get('content-type');
    var jsonObj = req.body;

    if (acceptsJSON === 'application/json') {
        filterData(jsonObj).then( function(jsonResult) {
            res.send(jsonResult);    
        }).catch( function(error) {
            next(error);
        });
    } else {
        next(new Error());        
    }
});

// Use static page
app.use(express.static(__dirname + '/public'));

// Catch unrouted urls
app.all('*', function(req, res, next) {
    next(new Error());
})

// Handle errors
app.use(function(err, req, res, next) {
  res.status(404).send({error: 'Could not decode request: JSON parsing failed'});
});

app.listen(PORT, function() {
    console.log('Server started on port: ' + PORT);
});