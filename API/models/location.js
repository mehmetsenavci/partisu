const { Sequelize, DataTypes } = require('sequelize');

const User = require('./user');

require('dotenv').config({ path: '../config.env' });
const sequelize = new Sequelize(`${process.env.DB_CONNECTION_STR}`);

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
        defaultValue: null
     },
     longitude: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
     },
});



/*

(async () => {
    await Location.sync();
})();


(async () => {
    await Location.sync({ force: true });
})();


   
*/

module.exports = Location;