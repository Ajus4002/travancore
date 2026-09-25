const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Position = sequelize.define('Position', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  symbol: { type: DataTypes.STRING, allowNull: false },
  exchange: { type: DataTypes.STRING, defaultValue: 'NFO' },
  order_type: { type: DataTypes.STRING, defaultValue: 'LIMIT' },
  side: { type: DataTypes.STRING, defaultValue: 'BUY' },
  quantity: { type: DataTypes.INTEGER, defaultValue: 50 },
  avg_price: { type: DataTypes.FLOAT, defaultValue: 102.50 },
  ltp: { type: DataTypes.FLOAT, defaultValue: 128.30 },
  pnl_amount: { type: DataTypes.FLOAT, defaultValue: 12900.0 },
  pnl_percent: { type: DataTypes.FLOAT, defaultValue: 25.17 },
  is_algo: { type: DataTypes.BOOLEAN, defaultValue: true },
  is_open: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = Position;
