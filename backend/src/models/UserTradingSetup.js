const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const UserTradingSetup = sequelize.define('UserTradingSetup', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  package_type: { type: DataTypes.STRING, defaultValue: 'BALANCED' },
  package_return_range: { type: DataTypes.STRING, defaultValue: '30% - 60%' },
  markets: { type: DataTypes.JSON, defaultValue: ['Indian Markets', 'Commodity Markets', 'Crypto Markets'] },
  algo_enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
  total_investment: { type: DataTypes.FLOAT, defaultValue: 500000.0 },
  current_value: { type: DataTypes.FLOAT, defaultValue: 538750.0 },
  realized_pnl: { type: DataTypes.FLOAT, defaultValue: 27850.0 },
  unrealized_pnl: { type: DataTypes.FLOAT, defaultValue: 10900.0 }
});

module.exports = UserTradingSetup;
