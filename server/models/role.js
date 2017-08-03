module.exports = function(sequelize, DataTypes) {
  const Role = sequelize.define('Role', {
    title: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    }
  }, {
    classMethods: {
      associate: (models) => {
        Role.hasMany(models.User, {
          foreignKey: 'roleId',
          as: 'roles',
        });
      }
    }
  });
  return Role;
};
