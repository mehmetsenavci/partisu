module.exports = (sequelize, DataTypes) => {
  const Location = sequelize.define('Location', {
    locationId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    locationName: {
      type: DataTypes.STRING,
      allowNull: false,
      notEmpty: true,
      unique: true,
    },
    latitude: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
    longitude: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: null,
    },
  });

  return Location;
};
