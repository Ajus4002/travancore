const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  txn_id: { type: DataTypes.STRING, unique: true, defaultValue: 'TRW12345678' },
  type: { type: DataTypes.STRING, defaultValue: 'WITHDRAWAL' },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  bank_name: { type: DataTypes.STRING, defaultValue: 'HDFC Bank' },
  account_masked: { type: DataTypes.STRING, defaultValue: '**** 4567' },
  ifsc_code: { type: DataTypes.STRING, defaultValue: 'HDFC0001234' },
  status: { type: DataTypes.STRING, defaultValue: 'Processing' },
  expected_time: { type: DataTypes.STRING, defaultValue: 'Within 1-4 hours' }
});

module.exports = Transaction;
