module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    favoriteId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
  });

  return Favorite;
};
