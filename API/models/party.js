const { Sequelize, DataTypes } = require('sequelize');

const Location = require('./location');

require('dotenv').config({ path: '../config.env' });
const sequelize = new Sequelize(`${process.env.DB_CONNECTION_STR}`);

const Party = sequelize.define('Party', {
    partyId: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },

});


/*
(async () => {
    await Party.sync({ force: true });
})();

*/

module.exports = Party;