const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const LoginHistory = sequelize.define('LoginHistory', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  ip_address: { type: DataTypes.STRING, defaultValue: '192.168.1.45' },
  device_name: { type: DataTypes.STRING, defaultValue: 'iPhone 15 Pro Max' },
  location: { type: DataTypes.STRING, defaultValue: 'Mumbai, India' },
  auth_method: { type: DataTypes.STRING, defaultValue: 'PIN' }
});

module.exports = LoginHistory;
