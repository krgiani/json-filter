var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;

var fs = require('fs');
var jsonObj;

// Parse JSON Asynchrounously
fs.readFile('./json-example.json', 'utf8', function(error, data) {
    if (error) {
        throw error;
    }
    jsonObj = JSON.parse(data);
});

app.get('/', function(req, res) {
    
    var json = {};
    var key = 'response';
    json[key] = [];
    
    jsonObj.payload.forEach( function(obj) {
        if (obj.drm && obj.episodeCount > 0) {
            var result = {
                image: obj.image.showImage,
                slug: obj.slug,
                title: obj.title
            };
            json[key].push(result);
        }
    });
    
    res.send(json);
});

app.listen(PORT, function() {
    console.log('Express listening on port: ' + PORT);
});