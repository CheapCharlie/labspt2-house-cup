const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const { User, School, House } = require('../Models');
const sequelize = require('../sequelize');

School.belongsTo(User, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
User.hasMany(School, {
  foreignKey: 'user_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

House.belongsTo(School, {
  foreignKey: 'school_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});
School.hasMany(House, {
  foreignKey: 'school_id',
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE'
});

// user.getSchools()
// user.createSchool()

/*
  source.methodName(target, options)

  belongsTo
    it adds a foreignKey in the source model

  hasOne
    it adds a foreignKey to the target model

  hasMany
    it adds a foreignKey to the target model

  belongsToMany
*/

sequelize.sync();
const userRouter = require('../controllers/routes/users_routes');
const schoolsRouter = require('../controllers/routes/schools');
const housesRouter = require('../controllers/routes/houses');
const { errorHandler } = require('../middleware/index');
const server = express();

server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use(helmet());
server.use(logger('tiny'));
server.use(cors());

// server.use('/api/users', userRouter);
// server.use('/api/schools', schoolsRouter);
// // Get the id from req.params -- > houses.js
// server.use('/api/', housesRouter);

// server.use(express.static(__dirname + '/HouseCup/house-cup-app/build'))

// server.get('/', (req, res) => {
//   res.send(`Server is up and running now.`);
// });

server.use('/users', userRouter);
server.use('/schools', schoolsRouter);
// Get the id from req.params -- > houses.js
server.use('/', housesRouter);

server.use(express.static('./HouseCup/house-cup-app/build'))

server.use(errorHandler);

module.exports = {
  server,
};
