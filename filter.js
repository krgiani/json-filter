// This function iterates through the JSON request and 
// grabs objects with properties drm:true and episodeCount > 0
// returns error if JSON request is invalid
module.exports = function(jsonObj) {
    var jsonResult = {};
    var key = 'response';
    jsonResult[key] = [];
    
    return new Promise( function(resolve, reject) {
        if (jsonObj.hasOwnProperty('payload')) {
            jsonObj.payload.forEach( function(obj) {
                if (obj.drm && obj.episodeCount > 0) {
                    var filteredObj = {
                        image: obj.image.showImage,
                        slug: obj.slug,
                        title: obj.title
                    };
                    jsonResult[key].push(filteredObj);
                }
            });
            resolve(jsonResult);
        } else {
            reject(new Error());
        }
    });
}