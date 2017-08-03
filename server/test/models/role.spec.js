import chai from 'chai';
import db from '../../models';

const expect = chai.expect;

const role = { title: 'admin' };

let testRole;

describe('Role model', () => {
  it('CREATE a new user role', (done) => {
    db.Role.create(role).then((newRole, err) => {
      if (!err) {
        expect(role.title).to.equal(newRole.title);
      }
      testRole = newRole;
      done();
    });
  });

  it('should throw an error when role title already exist', (done) => {
    const newRole = { title: 'admin' };
    db.Role.create(newRole).then().catch((error) => {
      expect(error.errors[0].message).to.equal('title must be unique');
      expect(error.errors[0].type).to.equal('unique violation');
      expect(error.errors[0].path).to.equal('title');
      expect(error.errors[0].value).to.equal('admin');
      done();
    });
  });
});

describe('UPDATE Role', () => {
  let newRole;
  before((done) => {
    db.Role.findById(testRole.id).then((roleFromDb) => {
      roleFromDb.update({ title: 'superAdmin' }).then((updatedRole) => {
        newRole = updatedRole;
        done();
      });
    });
  });

  it('should update an existing role', (done) => {
    db.Role.findById(newRole.id).then((role2) => {
      expect(role2.dataValues.id).to.equal(testRole.id);
      expect(role2.dataValues.title).to.not.equal(testRole.title);
      expect(role2.dataValues.title).to.equal('superAdmin');
      done();
    });
  });
});

describe('DELETE created role', () => {
  it('should delete a role from the db', (done) => {
    db.Role.destroy({ where: { id: testRole.id } }).then(() => {
      db.Role.findById(testRole.id).then((res) => {
        expect(res).to.equal(null);
        done();
      });
    });
  });
});
