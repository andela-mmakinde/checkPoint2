import faker from 'faker';
import chai from 'chai';
import db from '../../models';

const expect = chai.expect;

let updateDocId;

const sampleDocument = {
  title: 'my number 1',
  content: faker.lorem.paragraph(),
  access: 2,
  roleId: 1,
  ownerId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
};

const sampleDocument2 = {
  content: faker.lorem.paragraph(),
  access: 2,
  roleId: 1,
  ownerId: 1,
  createdAt: new Date(),
  updatedAt: new Date()
};

describe('Document Model', () => {
  describe('CREATE Document', () => {
    it('should create a document', (done) => {
      db.Document.create(sampleDocument).then((document) => {
        expect(document.dataValues.title).to.equal(sampleDocument.title);
        expect(document.dataValues.content).to.equal(sampleDocument.content);
        updateDocId = document.dataValues.id;
        done();
      });
    });

    it('should fail if title already exist', (done) => {
      db.Document.create(sampleDocument).then().catch((error) => {
        expect(error.errors[0].message).to.equal('title must be unique');
        expect(error.errors[0].type).to.equal('unique violation');
        done();
      });
    });

    it('should fail if title was not provided', (done) => {
      db.Document.create(sampleDocument2).then().catch((error) => {
        expect(error.errors[0].message).to.equal('title cannot be null');
        done();
      });
    });
  });

  describe('UPDATE Document', () => {
    it('should update a document', (done) => {
      db.Document.findById(updateDocId).then((document) => {
        document
          .update({ title: 'Another 1' })
          .then((updatedDocument) => {
            expect(updatedDocument.dataValues.id).to.equal(updateDocId);
            expect(document.dataValues.title).to.equal('Another 1');
            done();
          });
      });
    });
  });

  describe('DELETE Document', () => {
    it('should delete a document', (done) => {
      db.Document.destroy({ where: { id: updateDocId } }).then(() => {
        db.Document.findById(updateDocId).then((res) => {
          expect(res).to.equal(null);
          done();
        });
      });
    });
  });
});
