const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

module.exports = sequelize.define('school', {
  name: { type: Sequelize.STRING, allowNull: false },
  city: { type: Sequelize.STRING },
  // description: {type: Sequelize.STRING},
  user_id: { type: Sequelize.BIGINT, allowNull: false, onDelete: 'CASCADE', onUpdate: 'CASCADE' },
},
{
  timestamps: false,
  underscored: true,
  sequelize: sequelize
}
);
