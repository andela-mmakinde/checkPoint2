import bcrypt from 'bcryptjs';

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
    roleId: {
      type: DataTypes.INTEGER,
      defaultValue: 2,
      references: {
        model: 'Role',
        key: 'id',
        as: 'roleId',
      },
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
          foreignkey: 'roleId',
          onDelete: 'CASCADE'
        });
      }
    },
    hooks: {
      beforeCreate: (user) => {
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
      }
    },
  });
  User.prototype.verifyPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;

};
