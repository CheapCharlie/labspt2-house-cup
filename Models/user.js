const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

module.exports = sequelize.define('users', {
  // firstName: { type: Sequelize.STRING, allowNull: false },
  id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
  user_id: {type:Sequelize.STRING, allowNull:false, unique: true, onDelete: 'CASCADE', onUpdate: 'CASCADE'},
  name: { type: Sequelize.STRING, allowNull: true },
  email: { type: Sequelize.STRING, allowNull: true },
  // password: { type: Sequelize.STRING, allowNull: false },
  is_admin: { type: Sequelize.BOOLEAN, allowNull: false, defaultValue: true },
},
{
  timestamps: false,
  underscored: true,
  sequelize: sequelize
}
);

/*
  knex('users').select('firstName')

  users = User.findAll()
*/

