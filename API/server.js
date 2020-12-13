const { Sequelize } = require('sequelize');
const app = require('./app');
const PORT = 5000 || process.env.SERVER_PORT;







app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));