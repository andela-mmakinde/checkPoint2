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
    ownerId: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    classMethods: {
      associate: (models) => {
        Document.belongsTo(models.User, {
          as: 'owner',
          foreignKey: {
            allowNull: false,
          },
          onDelete: 'cascade',
        });
      }
    }
  });
  return Document;
};
