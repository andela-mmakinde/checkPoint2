module.exports = {
  up: queryInterface =>
    queryInterface.bulkInsert('Documents', [
      {
        title: 'sequelize CLI',
        content: 'Install this globally and y sequelize command anywhere',
        access: 'Public',
        roleId: 2,
        ownerId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }, {
        title: 'Just do this',
        content: 'sequelize init:seeders --seeders-path=... fndbfdjgnfjnfjfngf',
        access: 'Private',
        roleId: 2,
        ownerId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {}),

  down: queryInterface =>
    queryInterface.bulkDelete('Documents', null, {})
};
