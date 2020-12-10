const { Sequelize } = require('sequelize');
const app = require('./app');
const PORT = process.env.SERVER_PORT;

const sequelize = new Sequelize(
    `${process.env.DB_CONNECTION_STR}`
    ,{
        logging: console.log,
    }
);






app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));