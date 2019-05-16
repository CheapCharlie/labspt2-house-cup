const Sequelize = require('sequelize');
const sequelize = require('../sequelize');

module.exports = sequelize.define('house', {
  name: { type: Sequelize.STRING, allowNull: false },
  color: { type: Sequelize.STRING },
  school_id: { type: Sequelize.BIGINT, },
  points: { type: Sequelize.INTEGER, defaultValue: 0 },
},
{
  timestamps: false,
  underscored: true,
  sequelize: sequelize
}
);
