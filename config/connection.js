const Sequelize = require('sequelize');

require('dotenv').config();

let sequelize;

// if Live on Heroku use JAWSDB_URL, else use localhost port 3001
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
  // eslint-disable-next-line no-console
  console.log('Server live on Heroku\n');
} else {
  // create connection to our db
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
  // eslint-disable-next-line no-console
  console.log('Server Live @ localhost\n');
}

module.exports = sequelize;
