var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// POST /
app.post('/', function(req, res) {
    var jsonObj = req.body;
    var json = {};
    var key = 'response';
    json[key] = [];
    
    // Iterate through JSON and take objects which have properties:
    // drm:true and episodeCount>0
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