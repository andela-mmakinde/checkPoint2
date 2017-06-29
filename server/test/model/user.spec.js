import chai from 'chai';
import db from '../../models';

const expect = chai.expect;

const user1 = {
  email: 'ama@la.com',
  password: 'amala',
  confirmPassword: 'amala'
};

const user2 = {
  email: 'NoMail',
  password: 'amala',
  confirmPassword: 'amala',
  roleId: 1
};


const role = { title: 'user' };

before((done) => {
  db.Role.create(role).then((newRole) => {
    user1.roleId = newRole.id;
    done();
  });
});

describe('User model', () => {
  it('create a new user amala', (done) => {
    db.User.create(user1).then((newUser, err) => {
      if (!err) {
        expect(user1.email).to.equal(newUser.email);
        expect(user1.roleId).to.equal(newUser.roleId);
      }
      done();
    });
  });

  it('encrypts users password', (done) => {
    db.User.create(user2).then((newUser, err) => {
      if (!err) {
        expect(user2.password).to.not.equal(newUser.password);
      }
      done();
    });
  });
});

