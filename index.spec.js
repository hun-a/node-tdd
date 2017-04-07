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
