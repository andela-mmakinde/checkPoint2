const bcrypt = require('bcrypt-nodejs');
require('dotenv').config();

const adminPassword = process.env.adminPassword;
const userPassword = process.env.userPassword;

module.exports = {
  up: queryInterface => queryInterface.bulkInsert('Users', [
    {
      email: 'mayowa@andela.com',
      fullName: 'Mayowa Makinde',
      password: bcrypt.hashSync(adminPassword, bcrypt.genSaltSync(10)),
      roleId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      email: 'amaa@la.com',
      fullName: 'Amala Lase',
      password: bcrypt.hashSync(userPassword, bcrypt.genSaltSync(10)),
      roleId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};

