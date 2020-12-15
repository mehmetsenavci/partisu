const app = require('./app');
const PORT = 5000 || process.env.SERVER_PORT;

console.log(process.env.NODE_ENV.toUpperCase());

app.listen(PORT, () => console.log(`Server listening on ${PORT}...`));
