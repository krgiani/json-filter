module.exports = function(jsonObj) {
    var json = {};
    var key = 'response';
    json[key] = [];
    
    // Iterate through JSON and take objects which have properties:
    // drm:true and episodeCount>0
    return new Promise( function(resolve, reject) {
        if (jsonObj.hasOwnProperty('payload')) {
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
            resolve(json);
        } else {
            reject('Could not decode request: JSON parsing failed');
        }
    });
}