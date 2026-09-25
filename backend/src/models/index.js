const sequelize = require('../config/database');

const User = require('./User');
const OnboardingDetails = require('./OnboardingDetails');
const BankAccount = require('./BankAccount');
const UserTradingSetup = require('./UserTradingSetup');
const MarketInstrument = require('./MarketInstrument');
const Position = require('./Position');
const Transaction = require('./Transaction');
const ReferralRecord = require('./ReferralRecord');
const LoginHistory = require('./LoginHistory');
const Notification = require('./Notification');
const ResearchCall = require('./ResearchCall');
const ResearchNews = require('./ResearchNews');

// Associations & Relationships
User.hasOne(OnboardingDetails, { foreignKey: 'userId', onDelete: 'CASCADE' });
OnboardingDetails.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(BankAccount, { foreignKey: 'userId', onDelete: 'CASCADE' });
BankAccount.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(UserTradingSetup, { foreignKey: 'userId', onDelete: 'CASCADE' });
UserTradingSetup.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Position, { foreignKey: 'userId', onDelete: 'CASCADE' });
Position.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Transaction, { foreignKey: 'userId', onDelete: 'CASCADE' });
Transaction.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(ReferralRecord, { foreignKey: 'userId', onDelete: 'CASCADE' });
ReferralRecord.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(LoginHistory, { foreignKey: 'userId', onDelete: 'CASCADE' });
LoginHistory.belongsTo(User, { foreignKey: 'userId' });

User.hasMany(Notification, { foreignKey: 'userId', onDelete: 'CASCADE' });
Notification.belongsTo(User, { foreignKey: 'userId' });

module.exports = {
  sequelize,
  User,
  OnboardingDetails,
  BankAccount,
  UserTradingSetup,
  MarketInstrument,
  Position,
  Transaction,
  ReferralRecord,
  LoginHistory,
  Notification,
  ResearchCall,
  ResearchNews
};
