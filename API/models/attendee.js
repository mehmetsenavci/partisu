module.exports = (sequelize, DataTypes) => {
  const Attendee = sequelize.define('Attendee', {}, { timestamps: false });

  return Attendee;
};
