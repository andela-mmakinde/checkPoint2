module.exports = {
  up: (queryInterface) => {
    queryInterface.bulkInsert('Role', [
      {
        title: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'user',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ], {});
  },

  down: (queryInterface) => {
    queryInterface.bulkDelete('Role', null, {});
  }
};

