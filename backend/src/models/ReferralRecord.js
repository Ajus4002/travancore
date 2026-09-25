const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ReferralRecord = sequelize.define('ReferralRecord', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  referee_name: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Active' },
  joined_date: { type: DataTypes.STRING, defaultValue: '12 Aug 2024' },
  total_trades: { type: DataTypes.INTEGER, defaultValue: 156 },
  total_profit: { type: DataTypes.FLOAT, defaultValue: 86400.0 },
  earned_amount: { type: DataTypes.FLOAT, defaultValue: 4320.0 }
});

module.exports = ReferralRecord;
