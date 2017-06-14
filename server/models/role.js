'use strict';
module.exports = function(sequelize, DataTypes) {
  const Role = sequelize.define('Role', {
    title: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        Role.belongsTo(models.User, {
          foreignKey: 'userId'
        })
      }
    }
  });
  return Role;
};