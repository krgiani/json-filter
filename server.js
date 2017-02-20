var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var fs = require('fs');
var jsonObj;
fs.readFile('./json-example.json', 'utf8', function(error, data) {
    if (error) {
        throw error;
    }
    jsonObj = JSON.parse(data);
});

app.get('/', function(req, res) {
    
    jsonObj = jsonObj.payload.filter( function(obj) {
        return (obj.drm && obj.episodeCount > 0);
    });
    
    res.send({response: jsonObj});
});

app.listen(PORT, function() {
    console.log('Express listening on port: ' + PORT);
});