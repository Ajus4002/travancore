const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  account_id: { type: DataTypes.STRING, unique: true, allowNull: false, defaultValue: '458921' },
  full_name: { type: DataTypes.STRING, allowNull: false, defaultValue: 'Sachin Tendulkar' },
  email: { type: DataTypes.STRING, unique: true, allowNull: false, defaultValue: 'sachin@travancore.com' },
  mobile_number: { type: DataTypes.STRING, defaultValue: '+91 9876543210' },
  password_hash: { type: DataTypes.STRING, allowNull: false },
  pin_hash: { type: DataTypes.STRING, allowNull: true },
  pattern_hash: { type: DataTypes.STRING, allowNull: true },
  fingerprint_enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
  face_id_enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
  is_kyc_verified: { type: DataTypes.BOOLEAN, defaultValue: true },
  referral_code: { type: DataTypes.STRING, defaultValue: 'ST1234' },
  last_login_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
});

module.exports = User;
