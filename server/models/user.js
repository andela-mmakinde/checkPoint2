module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    classMethods: {
      associate: (models) => {
        // associations can be defined here
        User.hasMany(models.Document, {
          foreignKey: 'ownerId',
          as: 'documents',
        });
        User.belongsTo(models.Role, {
          onDelete: 'CASCADE',
          foreignkey: 'roleId'
        });
      }
    }
  });
  return User;
};
