import chai, { should } from 'chai';
import chaiHttp from 'chai-http';
import mockData from '../mockData';
import app from '../../app';

should();
chai.use(chaiHttp);

describe('Role', () => {
  let adminToken;
  let userToken;

  before((done) => {
    chai.request(app).post('/api/v1/users/login')
    .send(mockData.adminDetails).end((err, res) => {
      res.should.have.status(200);
      adminToken = res.body.jsonToken;
    });
    chai.request(app).post('/api/v1/users/login')
    .send(mockData.userDetails).end((err, res) => {
      res.should.have.status(200);
      userToken = res.body.jsonToken;
      done();
    });
  });

  describe('/POST /api/v1/role', () => {
    it('should fail without title field', (done) => {
      chai.request(app)
        .post('/api/v1/role')
        .send(mockData.incompleteRole)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.be.a('string').eql('This field is required');
          done();
        });
    });
    it('should save role info', (done) => {
      chai.request(app)
        .post('/api/v1/role')
        .send(mockData.roleOne)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.should.have.property('role');
          res.body.role.should.be.a('object');
          res.body.role.should.have.property('title');
          res.body.message.should.be.a('string')
          .eql('Role created succesfully');
          done();
        });
    });
    it('should fail if title already exists', (done) => {
      chai.request(app)
        .post('/api/v1/role')
        .send(mockData.roleOne)
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message')
          .eql('Error creating new role');
          done();
        });
    });
    it('should fail if the user is not an admin', (done) => {
      chai.request(app)
        .post('/api/v1/role')
        .send(mockData.roleOne)
        .set('x-access-token', userToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message')
          .eql('Unauthorised access');
          done();
        });
    });
  });

  describe('/GET /api/v1/roles', () => {
    it('should get list of roles', (done) => {
      chai.request(app)
        .get('/api/v1/roles')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.length.should.eql(3);
          done();
        });
    });
  });

  describe('/PUT /api/v1/roles/:id', () => {
    it('should update role', (done) => {
      chai.request(app)
        .put('/api/v1/roles/3')
        .send({ title: 'superUser' })
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property(
            'message').eql('Role updated successfully');
          res.body.role.title.should.eql('superUser');
          done();
        });
    });
    it('should fail if role does not exist', (done) => {
      chai.request(app)
        .put('/api/v1/roles/45')
        .send({ title: 'ababio' })
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property(
            'message').eql('Role not found');
          done();
        });
    });
  });

  describe('/GET /api/v1/roles/:id', () => {
    it('should get role by the id provided', (done) => {
      chai.request(app)
      .get('/api/v1/roles/3')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
    });
    it('should fail if role does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/roles/12')
        .send({ title: 'gbagaun' })
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property(
            'message').eql('Role not found');
          done();
        });
    });
  });

  describe('/DELETE /api/v1/roles/:id', () => {
    it('should delete role based on the id provided', (done) => {
      chai.request(app)
      .delete('/api/v1/roles/3')
      .set('x-access-token', adminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message')
        .eql('Role has been deleted successfully');
        done();
      });
    });
    it('should fail if role does not exist', (done) => {
      chai.request(app)
        .delete('/api/v1/roles/12')
        .send({ title: 'gbagaun' })
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property(
            'message').eql('Role not found');
          done();
        });
    });
  });
});
