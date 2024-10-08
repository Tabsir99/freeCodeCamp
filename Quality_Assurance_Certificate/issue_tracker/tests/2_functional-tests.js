const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
    test('Create an issue with every field', function (done) {
        chai.request(server)
            .post('/api/issues/test')
            .send({
                issue_title: 'Title',
                issue_text: 'text',
                created_by: 'Functional Test - Every field',
                assigned_to: 'Chai and Mocha',
                status_text: 'In QA'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.issue_title, 'Title');
                assert.equal(res.body.issue_text, 'text');
                assert.equal(res.body.created_by, 'Functional Test - Every field');
                assert.equal(res.body.assigned_to, 'Chai and Mocha');
                assert.equal(res.body.status_text, 'In QA');
                assert.isTrue(res.body.open);
                assert.isDefined(res.body._id);
                testId = res.body._id;
                done();
            });
    });

    test('Create an issue with only required fields', function (done) {
        chai.request(server)
            .post('/api/issues/test')
            .send({
                issue_title: 'Title',
                issue_text: 'text',
                created_by: 'Functional Test - Required fields'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.issue_title, 'Title');
                assert.equal(res.body.issue_text, 'text');
                assert.equal(res.body.created_by, 'Functional Test - Required fields');
                assert.equal(res.body.assigned_to, '');
                assert.equal(res.body.status_text, '');
                assert.isTrue(res.body.open);
                assert.isDefined(res.body._id);
                done();
            });
    });

    test('Create an issue with missing required fields', function (done) {
        chai.request(server)
            .post('/api/issues/test')
            .send({
                issue_title: 'Title',
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'required field(s) missing');
                done();
            });
    });

});

suite('GET /api/issues/{project} => Array of objects with issue data', function () {

    test('View issues on a project', function (done) {
        chai.request(server)
            .get('/api/issues/test')
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isArray(res.body);
                assert.property(res.body[0], 'issue_title');
                assert.property(res.body[0], 'issue_text');
                assert.property(res.body[0], 'created_by');
                assert.property(res.body[0], 'assigned_to');
                assert.property(res.body[0], 'status_text');
                assert.property(res.body[0], 'open');
                assert.property(res.body[0], 'created_on');
                assert.property(res.body[0], 'updated_on');
                assert.property(res.body[0], '_id');
                done();
            });
    });

    test('View issues on a project with one filter', function (done) {
        chai.request(server)
            .get('/api/issues/test')
            .query({ issue_title: 'Title' })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isArray(res.body);
                assert.property(res.body[0], 'issue_title');
                assert.equal(res.body[0].issue_title, 'Title');
                done();
            });
    });

    test('View issues on a project with multiple filters', function (done) {
        chai.request(server)
            .get('/api/issues/test')
            .query({ issue_title: 'Title', open: true })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.isArray(res.body);
                assert.property(res.body[0], 'issue_title');
                assert.equal(res.body[0].issue_title, 'Title');
                assert.equal(res.body[0].open, true);
                done();
            });
    });

});

suite('PUT /api/issues/{project} => text', function () {

    test('Update one field on an issue', function (done) {
        chai.request(server)
            .put('/api/issues/test')
            .send({
                _id: testId,
                issue_text: 'updated text'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.result, 'successfully updated');
                assert.equal(res.body._id, testId);
                done();
            });
    });

    test('Update multiple fields on an issue', function (done) {
        chai.request(server)
            .put('/api/issues/test')
            .send({
                _id: testId,
                issue_text: 'updated text',
                issue_title: 'updated title'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.result, 'successfully updated');
                assert.equal(res.body._id, testId);
                done();
            });
    });

    test('Update an issue with missing _id', function (done) {
        chai.request(server)
            .put('/api/issues/test')
            .send({
                issue_text: 'updated text'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'missing _id');
                done();
            });
    });

    test('Update an issue with no fields to update', function (done) {
        chai.request(server)
            .put('/api/issues/test')
            .send({
                _id: testId
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'no update field(s) sent');
                assert.equal(res.body._id, testId);
                done();
            });
    });

    test('Update an issue with an invalid _id', function (done) {
        chai.request(server)
            .put('/api/issues/test')
            .send({
                _id: 'invalidId',
                issue_text: 'updated text'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'could not update');
                assert.equal(res.body._id, 'invalidId');
                done();
            });
    });

});

suite('DELETE /api/issues/{project} => text', function () {

    test('Delete an issue', function (done) {
        chai.request(server)
            .delete('/api/issues/test')
            .send({
                _id: testId
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.result, 'successfully deleted');
                assert.equal(res.body._id, testId);
                done();
            });
    });

    test('Delete an issue with an invalid _id', function (done) {
        chai.request(server)
            .delete('/api/issues/test')
            .send({
                _id: 'invalidId'
            })
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'could not delete');
                assert.equal(res.body._id, 'invalidId');
                done();
            });
    });

    test('Delete an issue with missing _id', function (done) {
        chai.request(server)
            .delete('/api/issues/test')
            .send({})
            .end(function (err, res) {
                assert.equal(res.status, 200);
                assert.equal(res.body.error, 'missing _id');
                done();
            });
    });

});
