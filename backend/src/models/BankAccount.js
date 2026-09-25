const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const BankAccount = sequelize.define('BankAccount', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  account_holder_name: { type: DataTypes.STRING, defaultValue: 'Sachin Tendulkar' },
  account_number: { type: DataTypes.STRING, defaultValue: '4567' },
  full_account_number: { type: DataTypes.STRING, defaultValue: '91801004567' },
  ifsc_code: { type: DataTypes.STRING, defaultValue: 'HDFC0001234' },
  bank_name: { type: DataTypes.STRING, defaultValue: 'HDFC Bank' },
  is_primary: { type: DataTypes.BOOLEAN, defaultValue: true }
});

module.exports = BankAccount;
