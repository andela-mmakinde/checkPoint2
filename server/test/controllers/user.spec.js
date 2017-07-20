import chai from 'chai';
import chaiHttp from 'chai-http';
import mockData from '../mockData';
import app from '../../app';

const should = chai.should();

chai.use(chaiHttp);

describe('USER controller', () => {
  let userToken;
  let adminToken;
  // const userId = 6;
  // const adminId = 5;
  before((done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(mockData.admin)
      .end((err, res) => {
        adminToken = res.body.jsonToken;
        res.status.should.eql(201);
      });
    chai.request(app)
      .post('/api/v1/users')
      .send(mockData.user)
      .end((err, res) => {
        userToken = res.body.jsonToken;
        res.status.should.eql(201);
        done();
      });
  });

  describe('/POST users', () => {
    it('should fail without email field', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(mockData.incompleteUserData)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.message.should.eql('Enter all required field');
          done();
        });
    });
    it('should save user info', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(mockData.user3)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.jsonToken.should.be.a('string');
          res.body.message.should.be.a('string').eql('User created');
          done();
        });
    });
    it('should return a token', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(mockData.user4)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('jsonToken');
          res.body.jsonToken.should.be.a('string');
          done();
        });
    });
    it('should fail if email already exists', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(mockData.user4)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('message').eql('A user with this email already exists!');
          done();
        });
    });
    it('should fail if the email entered is invalid ', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(mockData.invalidEmail)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').eql('Email is not rightly formatted');
          done();
        });
    });
    it('should fail if the passwords do not match ', (done) => {
      chai.request(app)
        .post('/api/v1/users')
        .send(mockData.passwordMismatch)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message').eql('Password doesn\'t match');
          done();
        });
    });
  });

  describe('/GET users', () => {
    it('should get list of users', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('user');
          res.body.should.have.property('pagination');
          res.body.user.length.should.be.eql(4);
          done();
        });
    });
    it('should limit list of users', (done) => {
      chai.request(app)
        .get('/api/v1/users/?limit=2')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('user');
          res.body.should.have.property('pagination');
          res.body.user.length.should.be.eql(2);
          done();
        });
    });
    it('should limit users based on offset', (done) => {
      chai.request(app)
        .get('/api/v1/users/?offset=2')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('user');
          res.body.should.have.property('pagination');
          res.body.pagination.should.be.a('object');
          res.body.user.length.should.be.eql(2);
          done();
        });
    });
    it('should return an error if the token supplied is not Admin', (done) => {
      chai.request(app)
        .get('/api/v1/users')
        .set('x-access-token', userToken)
        .end((err, res) => {
          res.should.have.status(401);
          done();
        });
    });
  });

  describe('/POST users/login', () => {
    it('should log in user', (done) => {
      chai.request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'fibbo@gmail.com',
          password: 'andela'
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('message');
          res.body.jsonToken.should.be.a('string');
          res.body.message.should.be.a('string').eql('Logged in!');
          done();
        });
    });
    it('should return a token', (done) => {
      chai.request(app)
        .post('/api/v1/users/login')
        .send(mockData.userDetails)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('jsonToken');
          res.body.jsonToken.should.be.a('string');
          done();
        });
    });
    it('should fail without email in the request', (done) => {
      chai.request(app)
        .post('/api/v1/users/login')
        .send({ password: 'andela' })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql(
            'Enter all required field');
          done();
        });
    });
    it('should fail without correct password', (done) => {
      chai.request(app)
        .post('/api/v1/users/login')
        .send({
          email: 'fibbo@gmail.com',
          password: 'wrongPassword'
        })
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql('Invalid Password!');
          done();
        });
    });
  });

  describe('/PUT user:id', () => {
    it('should allow user to update his/her password', (done) => {
      chai.request(app)
        .put('/api/v1/users/5')
        .send({
          email: 'fibbonacci1@gmail.com',
          password: 'stillAndela',
        })
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('jsonToken');
          res.body.jsonToken.should.be.a('string');
          done();
        });
    });
    it('should return an error if the user is not found', (done) => {
      chai.request(app)
        .put('/api/v1/users/600')
        .send({
          password: 'nowAndela',
        })
        .set('x-access-token', userToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string').eql('user Not Found');
          done();
        });
    });
  });

  describe('/GET user:id', () => {
    it('should allow admin to view user', (done) => {
      chai.request(app)
        .get('/api/v1/users/2')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('email');
          res.body.should.be.a('object');
          done();
        });
    });
    it('should return an error message if user does not exist', (done) => {
      chai.request(app)
        .get('/api/v1/users/100')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql('User not found!');
          done();
        });
    });
  });

  describe('/GET search/users', () => {
    it('only admin should search all users based on email', (done) => {
      chai.request(app)
        .get('/api/v1/search/users?q=ma')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('pagination');
          res.body.pagination.should.be.a('object');
          done();
        });
    });

    it('user should not be able to search for other users', (done) => {
      chai.request(app)
        .get('/api/v1/search/users?q=ma')
        .set('x-access-token', userToken)
        .end((err, res) => {
          res.should.have.status(401);
          res.body.should.have.property('message');
          res.body.message.should.be.a('string').eql('Unauthorised access');          
          done();
        });
    });
  });

  describe('/POST /users/logout', () => {
    it('successfully logs a user out', (done) => {
      chai.request(app).post('/api/v1/users/logout')
      .end((err, res) => {
        res.should.have.status(200);
        res.body.message.should.be.a('string').eql('Logout successful');
        done();
      });
    });
  });

  describe('/DELETE user:id', () => {
    it('admin should be able to delete user account', (done) => {
      chai.request(app)
        .delete('/api/v1/users/2')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('message').eql(
            'User details deleted successfully');
          done();
        });
    });

    it('request should fail if user not found', (done) => {
      chai.request(app)
        .delete('/api/v1/users/2')
        .set('x-access-token', adminToken)
        .end((err, res) => {
          res.should.have.status(404);
          res.body.should.have.property('message').eql(
            'User Not Found');
          done();
        });
    });
  });
});
