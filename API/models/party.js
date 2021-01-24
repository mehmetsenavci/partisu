module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define('Party', {
    partyId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    startTime: {
      type: DataTypes.DATE,
      validate: { allowNull: false, notEmpty: true, isAfter: `${Date.now()}` },
    },
    endTime: {
      type: DataTypes.DATE,
      validate: { allowNull: false, notEmpty: true, isAfter: `${Date.now()}` },
    },
  });

  return Party;
};
