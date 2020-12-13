const { Sequelize, DataTypes } = require('sequelize');

require('dotenv').config({ path: '../config.env' });
const sequelize = new Sequelize(`${process.env.DB_CONNECTION_STR}`);


const Location = require('./location')(sequelize, DataTypes);
const User = require('./user')(sequelize, DataTypes);

User.hasMany(Location, {as:'favorites' ,foreignKey:{ name: 'locationId', allowNull: true }, foreignKeyConstraint: true, constraint: false});



/*
(async () => {
    await Location.sync({foce: true});
})();
*/

module.exports = {User, Location};