const request = require('supertest');
const should = require('should');
const app = require('./index');

describe('GET /users is', () => {
  describe('success', () => {
    it('respons users value as array', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });
  });
});
