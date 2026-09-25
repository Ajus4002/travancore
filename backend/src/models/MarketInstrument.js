const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const MarketInstrument = sequelize.define('MarketInstrument', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  symbol: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, defaultValue: 'INDIAN' },
  exchange: { type: DataTypes.STRING, defaultValue: 'NSE' },
  ltp: { type: DataTypes.FLOAT, allowNull: false },
  change_amount: { type: DataTypes.FLOAT, defaultValue: 0.0 },
  change_percent: { type: DataTypes.FLOAT, defaultValue: 0.0 },
  trading_hours: { type: DataTypes.STRING, defaultValue: '09:00 AM - 04:00 PM' },
  trading_days: { type: DataTypes.STRING, defaultValue: 'Mon - Fri' },
  currency_symbol: { type: DataTypes.STRING, defaultValue: '₹' }
});

module.exports = MarketInstrument;
