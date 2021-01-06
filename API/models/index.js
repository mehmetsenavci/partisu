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
  await User.sync({ foce: true });
})();

(async () => {
  await Location.sync({ foce: true });
})();

(async () => {
  await Party.sync({ foce: true });
})();

(async () => {
  await Favorite.sync({ foce: true });
})();

(async () => {
  await Attendee.sync({ foce: true });
})();

(async () => {
  try {
    const p = await Favorite.create({
      userId: '99524861-bef7-47a3-a60d-74df10d391b1',
      locationId: '819978f8-4a1d-4b4a-a799-deaf7b2096f5',
    });

    console.log(p);
  } catch (err) {
    console.log(err.message);
  }
})();

(async () => {
  try {
    const p = await Party.create({
      creatorId: 'e85558e3-ed84-417e-85de-426929eda18e',
      locationId: '819978f8-4a1d-4b4a-a799-deaf7b2096f5',
    });
    
    console.log(p);
  } catch (err) {
    console.log(err.message);
  }
})();

(async () => {
  try {
    console.log(User.prototype);
    
    const p = await User.findByPk('99524861-bef7-47a3-a60d-74df10d391b1', {
      include: Location,
    });
    const favs = await p.getLocations();
    
    console.log(p);
    console.log(favs);
  } catch (err) {
    console.log(err.message);
  }
})();
*/

module.exports = { User, Location, Party, Favorite, Attendee };
