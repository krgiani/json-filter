var filterData = require('../filter.js');
var chai = require('chai');
var chaiFiles = require('chai-files');
var fs = require('fs');

chai.use(chaiFiles);

var expect = chai.expect;
var file = chaiFiles.file;

describe('Filter function', function() {
    it('should return shows which have drm=true and episodeCount>0', function() {
        var jsonObj = JSON.parse(fs.readFileSync('test/test-cases/proper-request.json', 'utf8'));
        
        return filterData(jsonObj).then( function(json) {
            expect(JSON.stringify(json)).to.equal(file('test/test-results/proper-respond.json'));
        });
    });
    
    it('should return error given empty body', function() {
        var jsonObj = '';
        
        return filterData(jsonObj).catch( function(error) {
            expect(JSON.stringify(error)).to.equal(file('test/test-results/error-respond.json'));
        });
    });
    
    it('should return error if payload key does not exist', function() {
        var jsonObj = JSON.parse(fs.readFileSync('test/test-cases/no-payload-request.json', 'utf8'));
        
        return filterData(jsonObj).catch( function(error) {
            expect(JSON.stringify(error)).to.equal(file('test/test-results/error-respond.json'));
        });
    });
    
    it('should return error given non-json request', function() {
        var jsonObj = JSON.parse(fs.readFileSync('test/test-cases/non-json-request.txt', 'utf8'));
        
        return filterData(jsonObj).catch( function(error) {
            expect(JSON.stringify(error)).to.equal(file('test/test-results/error-respond.json'));
        });
    });
});
        