module.exports = (sequelize, DataTypes) => {
  const Party = sequelize.define('Party', {
    partyId: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    startTime: {
      type: DataTypes.DATE,
      allowNull: false,
      notEmpty: true,
      validate: { isAfter: `${Date.now()}` },
    },
    endTime: {
      type: DataTypes.DATE,
      allowNull: false,
      notEmpty: true,
      validate: { isAfter: `${Date.now()}` },
    },
  });

  return Party;
};
