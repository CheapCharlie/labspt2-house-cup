require('dotenv').config();

const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL, {
      dialect:'postgres'
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Sequelize: Connection has been established successfully.');
  })
  .catch(err => {
    console.error('ERROR: Sequelize was unable to connect to the database:', err);
  });



module.exports = sequelize;
