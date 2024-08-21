const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');
chai.use(chaiHttp);

suite('Functional Tests', function() {

  test('Convert a valid input such as 10L', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '10L' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.property(res.body, 'initNum');
        assert.property(res.body, 'initUnit');
        assert.property(res.body, 'returnNum');
        assert.property(res.body, 'returnUnit');
        assert.property(res.body, 'string');
        assert.equal(res.body.initNum, 10);
        assert.equal(res.body.initUnit, 'L');
        assert.isNumber(res.body.returnNum);
        assert.equal(res.body.returnUnit, 'gal');
        assert.include(res.body.string, 'liters');
        assert.include(res.body.string, 'gallons');
        done();
      });
  });

  test('Convert an invalid input such as 32g', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '32g' })
      .end(function(err, res) {
        assert.equal(res.text, 'invalid unit')
        done();
      });
  });
  
  test('Convert an invalid number such as 3/7.2/4kg', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kg' })
      .end(function(err, res) {
        assert.equal(res.text, 'invalid number')
        done();
      });
  });
  
  test('Convert an invalid number AND unit such as 3/7.2/4kilomegagram', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: '3/7.2/4kilomegagram' })
      .end(function(err, res) {
        assert.equal(res.text, 'invalid number and unit')
        done();
      });
  });

  test('Convert with no number such as kg', function(done) {
    chai.request(server)
      .get('/api/convert')
      .query({ input: 'kg' })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.initNum, 1);
        assert.equal(res.body.initUnit, 'kg');
        assert.isNumber(res.body.returnNum);
        assert.equal(res.body.returnUnit, 'lbs');
        assert.include(res.body.string, 'kilograms');
        assert.include(res.body.string, 'pounds');
        done();
      });
  });

});
