import chai from 'chai';
import db from '../../models';

const expect = chai.expect;

const user1 = {
  email: 'mayowa@yahoo.com',
  password: 'amala',
  fullName: 'mayowa makinde'
};

const user2 = {
  email: 'NoMail@mail.com',
  password: 'amala',
  fullName: 'amala olounje',
  roleId: 1
};


let testId;
describe('User model', () => {
  it('CREATE a new user mayowa', (done) => {
    db.User.create(user1).then((newUser, err) => {
      if (!err) {
        expect(user1.email).to.equal(newUser.email);
        expect(user1.fullName).to.equal(newUser.fullName);
      }
      testId = newUser.id;
      done();
    });
  });

  it('ENCRYPT users password', (done) => {
    db.User.create(user2).then((newUser, err) => {
      if (!err) {
        expect(user2.password).to.not.equal(newUser.password);
      }
      done();
    });
  });

  it('should fail if password is null', (done) => {
    user1.email = 'test@mail.com';
    user1.password = null;
    db.User.create(user1).then().catch((error) => {
      expect(error.errors[0].message).to.equal('password cannot be null');
      done();
    });
  });

  describe('DELETE Created User', () => {
    it('should delete a user from the database', (done) => {
      db.User.destroy({ where: { id: testId } }).then(() => {
        db.User.findById(testId).then((res) => {
          expect(res).to.equal(null);
          done();
        });
      });
    });
  });
});
