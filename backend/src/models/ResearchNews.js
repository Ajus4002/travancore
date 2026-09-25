const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const ResearchNews = sequelize.define('ResearchNews', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  snippet: { type: DataTypes.TEXT, allowNull: false },
  source: { type: DataTypes.STRING, defaultValue: 'Economic Times' },
  sentiment: { type: DataTypes.STRING, defaultValue: 'Positive' },
  time_ago: { type: DataTypes.STRING, defaultValue: '10 min ago' }
});

module.exports = ResearchNews;
