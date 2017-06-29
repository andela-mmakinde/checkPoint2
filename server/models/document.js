module.exports = (sequelize, DataTypes) => {
  const Document = sequelize.define('Document', {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    access: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ownerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id',
        as: 'ownerId',
      },
    },
  }, {
    classMethods: {
      associate: (models) => {
        Document.belongsTo(models.User, {
          as: 'owner',
          foreignKey: 'ownerId',
          onDelete: 'cascade',
        });
      }
    }
  });
  return Document;
};
