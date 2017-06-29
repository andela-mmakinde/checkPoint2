module.exports = {
  up: (queryInterface) => {
    queryInterface.bulkInsert('User', [
      {
        email: 'mayowa@andela.com',
        password: 'andela',
        RoleId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'ama@la.com',
        password: 'amala',
        RoleId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface) => {
    queryInterface.bulkDelete('User', null, {});
  }
};
