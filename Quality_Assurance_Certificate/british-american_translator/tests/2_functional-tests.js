'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  
  test('Translation with text and locale fields: POST request to /api/translate', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Hello', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'translation');
        assert.include(res.body.translation, 'Hello');
        done();
      });
  });

  test('Translation with text and invalid locale field: POST request to /api/translate', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Hello', locale: 'invalid-locale' })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Invalid locale');
        done();
      });
  });

  test('Translation with missing text field: POST request to /api/translate', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Missing text field');
        done();
      });
  });

  test('Translation with missing locale field: POST request to /api/translate', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Hello' })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Missing locale field');
        done();
      });
  });

  test('Translation with empty text: POST request to /api/translate', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: '', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.property(res.body, 'error');
        assert.equal(res.body.error, 'Empty text field');
        done();
      });
  });

  test('Translation with text that needs no translation: POST request to /api/translate', done => {
    chai.request(server)
      .post('/api/translate')
      .send({ text: 'Color', locale: 'american-to-british' })
      .end((err, res) => {
        assert.equal(res.status, 200);
        assert.property(res.body, 'translation');
        assert.equal(res.body.translation, 'Color'); // Assuming no translation needed
        done();
      });
  });

});
