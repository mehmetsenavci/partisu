const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config({ path: '../config.env' });

const sequelize = new Sequelize(`${process.env.DB_CONNECTION_STR}`, {
  logging: console.log,
});
console.log('Connected to DB.');

const Location = require('./location')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);
const Party = require('./party')(sequelize, DataTypes);

User.hasMany(Location, {
  as: 'favorites',
  foreignKey: { name: 'locationId', allowNull: true },
  foreignKeyConstraint: true,
  constraint: false,
}); // NOT SURE

Party.belongsTo(User, {
  as: 'creator',
  foreignKey: { name: 'userId' },
  foreignKeyConstraint: true,
});
Party.belongsTo(Location, {
  foreignKey: { name: 'locationId', allowNull: true },
});
Party.hasMany(User);
// Location.belongsTo(User, {foreignKey:'locationId', foreignKeyConstraint: true});

/*
(async () => {
    await User.sync({foce: true});
})();

(async () => {
    await Location.sync({foce: true});
})();

(async () => {
    await Party.sync({foce: true});
})();
*/

module.exports = { User, Location, Party };
