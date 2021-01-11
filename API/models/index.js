const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({ path: '../config.env' });

const sequelize = new Sequelize(`${process.env.DB_CONNECTION_STR}`, {
  logging: false,
  dialectOptions: {
    useUTC: false, // for reading from database
    dateStrings: true,
    typeCast: function (field, next) {
      // for reading from database
      if (field.type === 'DATETIME') {
        return field.string();
      }
      return next();
    },
  },
  timezone: '+03:00',
});
console.log('Connected to DB.');

const Location = require('./location')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);
const Party = require('./party')(sequelize, DataTypes);
const Favorite = require('./favorite')(sequelize, DataTypes);
const Attendee = require('./attendee')(sequelize, DataTypes);

Party.belongsTo(User, {
  foreignKey: { name: 'creatorId', allowNull: false },
  foreignKeyConstraint: true,
});
Party.belongsTo(Location, {
  foreignKey: { name: 'locationId', allowNull: false },
});
Favorite.belongsTo(User, {
  foreignKey: { name: 'userId', allowNull: false },
});
Favorite.belongsTo(Location, {
  foreignKey: { name: 'locationId', allowNull: false },
});
Attendee.belongsTo(Party, {
  foreignKey: { name: 'partyId', allowNull: false },
});
Attendee.belongsTo(User, {
  foreignKey: { name: 'attendeeId', allowNull: false },
});
/*
(async () => {
  [User, Location, Favorite, Party, Attendee].forEach(async (model) => {
    await model.sync({ forece: true });
  });
})();
*/
module.exports = { User, Location, Party, Favorite, Attendee };
