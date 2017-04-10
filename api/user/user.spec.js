// test for user.ctrl.js
const request = require('supertest');
const should = require('should');
const app = require('../../');
const models = require('../../models');

describe('GET /users is', () => {
  const users = [
    {name: 'alice'}, {name: 'bek'}, {name: 'chris'}
  ];
  before(() => models.sequelize.sync({force: true}));
  before(() => models.User.bulkCreate(users));

  describe('success', () => {
    it('should respond users value as array', (done) => {
      request(app)
        .get('/users')
        .end((err, res) => {
          res.body.should.be.instanceOf(Array);
          done();
        });
    });

    it(`should returns maximum limit`, (done) => {
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

describe('GET /users/:id is', () => {
  const users = [
    {name: 'alice'}, {name: 'bek'}, {name: 'chris'}
  ];
  before(() => models.sequelize.sync({force: true}));
  before(() => models.User.bulkCreate(users));

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

describe('DELETE /users/:id', () => {
  const users = [
    {name: 'alice'}, {name: 'bek'}, {name: 'chris'}
  ];
  before(() => models.sequelize.sync({force: true}));
  before(() => models.User.bulkCreate(users));

  describe('success', () => {
    it('should returns 204', (done) => {
      request(app)
        .delete('/users/1')
        .expect(204)
        .end(done);
    });
  });

  describe('fail', () => {
    it('should returns 400 when id is not a number', (done) => {
      request(app)
        .delete('/users/one')
        .expect(400)
        .end(done);
    });
  });
});

describe('POST /users', () => {
  const users = [
    {name: 'alice'}, {name: 'bek'}, {name: 'chris'}
  ];
  before(() => models.sequelize.sync({force: true}));
  before(() => models.User.bulkCreate(users));

  describe('success', () => {
    let body, name = 'daniel';
    before(done => {
      request(app)
        .post('/users')
        .send({name})
        .expect(201)
        .end((err, res) => {
          body = res.body;
          done();
        });
    });

    it('should returns created object of user', () => {
      body.should.have.property('id');
    });
    it('should returns name which is your input', () => {
      body.should.have.property('name', name);
    })
  });
  describe('fail', () => {
    it('should returns 400 when name is not inputed', (done) => {
      request(app)
        .post('/users')
        .send({})
        .expect(400)
        .end(done);
    });
    it('should returns 409 when name is duplicated', (done) => {
      request(app)
        .post('/users')
        .send({name: 'daniel'})
        .expect(409)
        .end(done);
    })
  });
});

describe('PUT /users', () => {
  const users = [
    {name: 'alice'}, {name: 'bek'}, {name: 'chris'}
  ];
  before(() => models.sequelize.sync({force: true}));
  before(() => models.User.bulkCreate(users));

  describe('success', () => {
    it('should resturns value of renamed', (done) => {
      const name = 'chally';
      request(app)
        .put('/users/3')
        .send({name})
        .end((err, res) => {
          res.body.should.have.property('name', name);
          done();
        });
    });
  });
  describe('fail', () => {
    it('should returns 400 when id is not a number', (done) => {
      request(app)
        .put('/users/one')
        .expect(400)
        .end(done);
    });
    it('should returns 400 when name is not exists', (done) => {
      request(app)
        .put('/users/1')
        .send({})
        .expect(400)
        .end(done);
    });
    it('should returns 404 when user is not exists', (done) => {
      request(app)
        .put('/users/999')
        .send({name: 'foo'})  // dummy data
        .expect(404)
        .end(done);
    });
    it('should returns 409 when id is duplicated', (done) => {
      request(app)
        .put('/users/3')
        .send({name: 'bek'})
        .expect(409)
        .end(done);
    });
  });
});