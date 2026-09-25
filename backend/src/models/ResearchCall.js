const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ResearchCall = sequelize.define('ResearchCall', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  symbol: { type: DataTypes.STRING, allowNull: false },
  recommendation: { type: DataTypes.STRING, defaultValue: 'BUY' },
  entry_range: { type: DataTypes.STRING, defaultValue: '25,100 - 25,150' },
  target_1: { type: DataTypes.FLOAT, defaultValue: 25250 },
  target_2: { type: DataTypes.FLOAT, defaultValue: 25350 },
  stop_loss: { type: DataTypes.FLOAT, defaultValue: 24950 },
  risk_level: { type: DataTypes.STRING, defaultValue: 'Moderate' },
  call_type: { type: DataTypes.STRING, defaultValue: 'Intraday' },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = ResearchCall;
