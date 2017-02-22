var supertest = require('supertest');
var chai = require('chai');
var chaiFiles = require('chai-files');
var fs = require('fs');

chai.use(chaiFiles);

var expect = chai.expect;
var file = chaiFiles.file;
var server = supertest.agent('http://localhost:3000');
var errorResponse = file('test/test-results/error-respond.json');

// POST method tests
describe('POST /', function() {
    it('should return shows which have drm=true and episodeCount>0', function(done) {
        var jsonObj = JSON.parse(fs.readFileSync('test/test-cases/proper-request.json', 'utf8'));
        var expectedResult = file('test/test-results/proper-respond.json');
        
        server
        .post('/')
        .send(jsonObj)
        .expect('Content-Type', /json/)
        .expect(200)
        .end(function(err, res){
            if (err) {
                done(err);
            } else {
                expect(JSON.stringify(res.body)).to.equal(expectedResult);
                done();
            }
        });
    });
    
    it('should return error given empty body', function(done) {
        server
        .post('/')
        .send()
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function(err, res) {
            if (err) {
                done(err);
            } else {
                expect(JSON.stringify(res.body)).to.equal(errorResponse);
                done();
            }
        });
    });
    
    it('should return error if payload key does not exist', function(done) {
        var jsonObj = JSON.parse(fs.readFileSync('test/test-cases/no-payload-request.json', 'utf8'));
        
        server
        .post('/')
        .send(jsonObj)
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function(err, res) {
            if (err) {
                done(err);
            } else {
                expect(JSON.stringify(res.body)).to.equal(errorResponse);
                done();
            }
        });
    });
    
    it('should return error given non-json request', function(done) {
        var jsonObj = fs.readFileSync('test/test-cases/non-json-request.txt', 'utf8');
        
        server
        .post('/')
        .send(jsonObj)
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function(err, res) {
            if (err) {
                done(err);
            } else {
                expect(JSON.stringify(res.body)).to.equal(errorResponse);
                done();
            }
        });
    });
    
    it('should return error given bad request', function(done) {
        var jsonObj = JSON.parse(fs.readFileSync('test/test-cases/proper-request.json', 'utf8'));
        
        server
        .post('/badrequest')
        .send(jsonObj)
        .expect('Content-Type', /json/)
        .expect(404)
        .end(function(err, res) {
            if (err) {
                done(err);
            } else {
                expect(JSON.stringify(res.body)).to.equal(errorResponse);
                done();
            }
        });
    });
});