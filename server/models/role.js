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
        Role.hasMany(models.User, {
          foreignKey: 'roleId',
          // as: 'users',
        });
      }
    }
  });
  return Role;
};
