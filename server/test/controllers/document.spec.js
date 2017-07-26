import chai from 'chai';
import chaiHttp from 'chai-http';
import mockData from '../mockData';
import app from '../../app';

chai.use(chaiHttp);
const should = chai.should();

describe('DOCUMENT controller', () => {
  let publicDocumentData;
  let adminRoleDocumentData;
  let privateRoleDocumentData;
  let testUserToken;
  let testAdminToken;

  before((done) => {
    chai.request(app)
      .post('/api/v1/users')
      .send(mockData.user5)
      .end((err, res) => {
        testAdminToken = res.body.jsonToken;
        res.should.have.status(201);
      });
    chai.request(app)
      .post('/api/v1/users')
      .send(mockData.user6)
      .end((err, res) => {
        testUserToken = res.body.jsonToken;
        res.should.have.status(201);
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post('/api/v1/documents')
      .send(mockData.document1)
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        publicDocumentData = res.body.document;
        res.should.have.status(201);
      });
    chai.request(app)
      .post('/api/v1/documents')
      .send(mockData.document3)
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        adminRoleDocumentData = res.body.document;
        res.should.have.status(201);
      });
    chai.request(app)
      .post('/api/v1/documents')
      .send(mockData.document2)
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        privateRoleDocumentData = res.body.document;
        res.should.have.status(201);
        done();
      });
  });

  describe('/POST documents', () => {
    it('should allow users to create a new document', (done) => {
      chai.request(app)
        .post('/api/v1/documents')
        .set('x-access-token', testUserToken)
        .send(mockData.document4)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.have.property('document');
          res.body.should.have.property('message').eql('Document created');
          res.body.document.should.have.property('ownerId');
          res.body.document.should.have.property('roleId');
          done();
        });
    });
    it('should fail if any field is left empty', (done) => {
      chai.request(app)
        .post('/api/v1/documents')
        .set('x-access-token', testUserToken)
        .send(mockData.incompleteDocument)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message')
          .eql('Please fill out all fields');
          done();
        });
    });
    it('should fail if the document title already exists', (done) => {
      chai.request(app)
        .post('/api/v1/documents')
        .set('x-access-token', testUserToken)
        .send(mockData.document3)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('message')
          .eql('A document with this title already exists!');
          done();
        });
    });
  });

  describe('/GET documents', () => {
    it('for a user, should list all documents he has access to', (done) => {
      chai.request(app)
      .get('/api/v1/documents')
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('document');
        res.body.should.have.property('pagination');
        done();
      });
    });
    it('should limit list of documents', (done) => {
      chai.request(app)
        .get('/api/v1/documents/?limit=2')
        .set('x-access-token', testUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('document');
          res.body.should.have.property('pagination');
          res.body.document.length.should.be.eql(2);
          done();
        });
    });
    it(`for an admin, should list all documents 
    in the database except private documents`, (done) => {
      chai.request(app)
      .get('/api/v1/documents')
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('document');
        res.body.should.have.property('pagination');
        done();
      });
    });
  });

  describe('/GET documents/:id', () => {
    it('should search for documents based on the id provided', (done) => {
      chai.request(app)
      .get(`/api/v1/documents/${publicDocumentData.id}`)
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('content');
        res.body.should.have.property('title');
        done();
      });
    });
    it(`should not return role level documents 
    for users with lower role level`, (done) => {
      chai.request(app)
      .get(`/api/v1/documents/${adminRoleDocumentData.id}`)
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Unauthorized Access');
        done();
      });
    });
    it(`should return ROLE level documents for 
    users with the same role level`, (done) => {
      chai.request(app)
      .get(`/api/v1/documents/${adminRoleDocumentData.id}`)
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('content');
        res.body.should.have.property('title');
        done();
      });
    });
    it('should return PRIVATE level documents to only the creator', (done) => {
      chai.request(app)
      .get(`/api/v1/documents/${privateRoleDocumentData.id}`)
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('content');
        res.body.should.have.property('title');
        done();
      });
    });
  });

  describe('/PUT documents/:id', () => {
    it('should return an error if document wasn\'t found', (done) => {
      chai.request(app)
      .put('/api/v1/documents/39')
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('document Not Found');
        done();
      });
    });
    it(`should allow user only user who 
    created the document to update document`, (done) => {
      chai.request(app)
      .put(`/api/v1/documents/${privateRoleDocumentData.id}`)
      .send({
        content: 'It is a new document'
      })
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('Update Successful');
        res.body.updatedDocument.content.should.eql('It is a new document');
        done();
      });
    });
    it('should not allow other users to update document', (done) => {
      chai.request(app)
      .put(`/api/v1/documents/${privateRoleDocumentData.id}`)
      .send({
        content: 'It is a new document'
      })
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message')
        .eql('You cannot edit this document');
        done();
      });
    });
  });

  describe('/DELETE documents/:id', () => {
    it('should return an error if document wasn\'t found', (done) => {
      chai.request(app)
      .delete('/api/v1/documents/39')
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('document Not Found');
        done();
      });
    });
    it('should not allow other users to delete document', (done) => {
      chai.request(app)
      .delete(`/api/v1/documents/${privateRoleDocumentData.id}`)
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Unauthorized Access');
        done();
      });
    });
    it(`should allow user only user who created 
    the document to delete document`, (done) => {
      chai.request(app)
      .delete(`/api/v1/documents/${privateRoleDocumentData.id}`)
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message')
        .eql('document deleted successfully');
        done();
      });
    });
  });

  describe('/GET search/documents', () => {
    it('should allow admin to search for all documents', (done) => {
      chai.request(app)
      .get('/api/v1/search/documents/?q=numb')
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.pagination.should.have.property('total').eql(3);
        done();
      });
    });
    it('should allow users to search for documents they have access to',
    (done) => {
      chai.request(app)
      .get('/api/v1/search/documents/?q=numb')
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.pagination.should.have.property('total').eql(2);
        done();
      });
    });
  });

  describe('/GET /users/:id/documents', () => {
    it('should return all documents belonging to a particular user', (done) => {
      chai.request(app)
      .get('/api/v1/users/1/documents')
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.pagination.should.have.property('total').eql(1);
        done();
      });
    });
    it('should return an error if the user is not found', (done) => {
      chai.request(app)
      .get('/api/v1/users/200/documents')
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('User not found');
        done();
      });
    });
  });
});

