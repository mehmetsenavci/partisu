const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({ path: '../config.env' });

const sequelize = new Sequelize(`${process.env.DB_CONNECTION_STR}`, {
  logging: console.log,
});
console.log('Connected to DB.');

const Location = require('./location')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);
const Party = require('./party')(sequelize, DataTypes);
const Favorite = require('./favorite')(sequelize, DataTypes);

/*
User.hasMany(Location, {
  as: 'favorites',
  foreignKey: { name: 'locationId', allowNull: true },
  foreignKeyConstraint: true,
  constraint: false,
}); // NOT SURE
*/

Party.belongsTo(User, {
  foreignKey: { name: 'userId' },
  foreignKeyConstraint: true,
});
Party.belongsTo(Location, {
  foreignKey: { name: 'locationId', allowNull: true },
});
User.belongsToMany(Location, {
  foreignKey: 'userId',
  through: Favorite,
});
Location.belongsToMany(User, {
  foreignKey: 'locationId',
  through: Favorite,
});

// Party.hasMany(User);
// Location.belongsTo(User, {foreignKey:'locationId', foreignKeyConstraint: true});

/*
 */
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
      userId: 'e85558e3-ed84-417e-85de-426929eda18e',
      locationId: '819978f8-4a1d-4b4a-a799-deaf7b2096f5',
    });

    console.log(p);
  } catch (err) {
    console.log(err.message);
  }
})();

module.exports = { User, Location, Party };
