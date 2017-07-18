import chai from 'chai';
import chaiHttp from 'chai-http';

import app from '../../app';

chai.use(chaiHttp);

const user5 = {
  fullName: 'Bamidele Daniel',
  email: 'daniel@andela.com',
  password: 'andela',
  confirmPassword: 'andela',
  roleId: 1
};

const user6 = {
  fullName: 'Efeguono Efekemo',
  email: 'eguono@andela.com',
  password: 'andela',
  confirmPassword: 'andela',
  roleId: 2
};

const document1 = {
  title: 'Number One',
  content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  access: 'Public'
};
const document2 = {
  title: 'Number Two',
  content: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)',
  access: 'Private'
};
const document3 = {
  title: 'Number Three',
  content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
  access: 'Role'
};
const document4 = {
  title: 'Number Four',
  content: 'Passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
  access: 'Role'
};
const incompleteDocument = {
  content: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn\'t anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.',
  access: 'Role'
};

describe('DOCUMENT controller', () => {
  let publicDocumentData;
  let adminRoleDocumentData;
  let privateRoleDocumentData;
  let testUserToken;
  let testUserData;
  let testAdminToken;

  before((done) => {
    chai.request(app)
      .post('/api/users')
      .send(user5)
      .end((err, res) => {
        testAdminToken = res.body.jsonToken;
        res.should.have.status(201);
      });
    chai.request(app)
      .post('/api/users')
      .send(user6)
      .end((err, res) => {
        testUserToken = res.body.jsonToken;
        res.should.have.status(201);
        done();
      });
  });

  before((done) => {
    chai.request(app)
      .post('/api/documents')
      .send(document1)
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        publicDocumentData = res.body.document;
        res.should.have.status(201);
      });
    chai.request(app)
      .post('/api/documents')
      .send(document3)
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        adminRoleDocumentData = res.body.document;
        res.should.have.status(201);
      });
    chai.request(app)
      .post('/api/documents')
      .send(document2)
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
        .post('/api/documents')
        .set('x-access-token', testUserToken)
        .send(document4)
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
        .post('/api/documents')
        .set('x-access-token', testUserToken)
        .send(incompleteDocument)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.have.property('message').eql('Enter all required field');
          done();
        });
    });
    it('should fail if the document title already exists', (done) => {
      chai.request(app)
        .post('/api/documents')
        .set('x-access-token', testUserToken)
        .send(document3)
        .end((err, res) => {
          res.should.have.status(409);
          res.body.should.have.property('message').eql('A document with this title already exists!');
          done();
        });
    });
  });

  describe('/GET documents', () => {
    it('for a user, should list all documents he has access to', (done) => {
      chai.request(app)
      .get('/api/documents')
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('document');
        res.body.should.have.property('pagination');
        res.body.pagination.should.have.property('limit');
        done();
      });
    });
    it('should limit list of documents', (done) => {
      chai.request(app)
        .get('/api/documents/?limit=2')
        .set('x-access-token', testUserToken)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('document');
          res.body.should.have.property('pagination');
          res.body.document.length.should.be.eql(2);
          done();
        });
    });
    it('for an admin, should list all documents in the database except private documents', (done) => {
      chai.request(app)
      .get('/api/documents')
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('document');
        res.body.should.have.property('pagination');
        res.body.pagination.should.have.property('limit');
        done();
      });
    });
  });

  describe('/GET documents/:id', () => {
    it('should search for documents based on the id provided', (done) => {
      chai.request(app)
      .get(`/api/documents/${publicDocumentData.id}`)
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('content');
        res.body.should.have.property('title');
        done();
      });
    });
    it('should return an error if document wasn\'t found', (done) => {
      chai.request(app)
      .get('/api/documents/39')
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Document not found');
        done();
      });
    });
    it('should not return role level documents for users with lower role level', (done) => {
      chai.request(app)
      .get(`/api/documents/${adminRoleDocumentData.id}`)
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Unauthorized Access');
        done();
      });
    });
    it('should return ROLE level documents for users with the same role level', (done) => {
      chai.request(app)
      .get(`/api/documents/${adminRoleDocumentData.id}`)
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
      .get(`/api/documents/${privateRoleDocumentData.id}`)
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
      .put('/api/documents/39')
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('document Not Found');
        done();
      });
    });
    it('should allow user only user who created the document to update document', (done) => {
      chai.request(app)
      .put(`/api/documents/${privateRoleDocumentData.id}`)
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
      .put(`/api/documents/${privateRoleDocumentData.id}`)
      .send({
        content: 'It is a new document'
      })
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.have.property('message').eql('You cannot edit this document');
        done();
      });
    });
  });

  describe('/DELETE documents/:id', () => {
    it('should return an error if document wasn\'t found', (done) => {
      chai.request(app)
      .delete('/api/documents/39')
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('document Not Found');
        done();
      });
    });
    it('should not allow other users to delete document', (done) => {
      chai.request(app)
      .delete(`/api/documents/${privateRoleDocumentData.id}`)
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.have.property('message').eql('Unauthorized Access');
        done();
      });
    });
    it('should allow user only user who created the document to delete document', (done) => {
      chai.request(app)
      .delete(`/api/documents/${privateRoleDocumentData.id}`)
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.have.property('message').eql('document deleted successfully');
        done();
      });
    });
  });

  describe('/GET search/documents', () => {
    it('should return an error if document wasn\'t found', (done) => {
      chai.request(app)
      .get('/api/search/documents/?q=impossible')
      .set('x-access-token', testUserToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('Sorry, No document found');
        done();
      });
    });
    it('should allow admin to search for all documents', (done) => {
      chai.request(app)
      .get('/api/search/documents/?q=numb')
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.pagination.should.have.property('total').eql(3);
        done();
      });
    });
    it('should allow users to search for documents they have access to', (done) => {
      chai.request(app)
      .get('/api/search/documents/?q=numb')
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
      .get('/api/users/1/documents')
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.pagination.should.have.property('total').eql(1);
        done();
      });
    });
    it('should return an error if the user is not found', (done) => {
      chai.request(app)
      .get('/api/users/200/documents')
      .set('x-access-token', testAdminToken)
      .end((err, res) => {
        res.should.have.status(404);
        res.body.should.have.property('message').eql('User not found');
        done();
      });
    });
  });
});

