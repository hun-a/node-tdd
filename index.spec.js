const request = require('supertest');
const should = require('should');
const app = require('./index');

describe('GET /users is', () => {
  describe('success', () => {
    it('respond users value as array', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });

    it(`it returns maximum limit`, (done) => {
      request(app)
        .get('/users?limit=2')
        .end((err, res) => {
          res.body.should.have.lengthOf(2);
          done();
        });
    });
  });

  describe('fail', () => {
    it('should returns 400 if limit was not a number', (done) => {
      request(app)
        .get('/users?limit=two')
        .expect(400)
        .end(done);
    });
  });
});

describe('GET /users/1 is', () => {
  describe('success', () => {
    it('should returns object of users which id is 1', (done) => {
      request(app)
        .get('/users/1')
        .end((err, res) => {
          res.body.should.have.property('id', 1);
          done();
        });
    });
  });

  describe('fail', () => {
    it('should returns 400 if id was not a number', (done) => {
      request(app)
        .get('/users/one')
        .expect(400)
        .end(done);
    });

    it(`should returns 404 if there are no users matched id`, (done) => {
      request(app)
        .get('/users/999')
        .expect(404)
        .end(done);
    });
  });
});
