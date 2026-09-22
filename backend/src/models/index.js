const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// 1. User Model
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

// 2. Onboarding Details Model
const OnboardingDetails = sequelize.define('OnboardingDetails', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  dob: { type: DataTypes.STRING, defaultValue: '24/04/1973' },
  gender: { type: DataTypes.STRING, defaultValue: 'Male' },
  pan_number: { type: DataTypes.STRING, defaultValue: 'ABCDE1234F' },
  aadhaar_number: { type: DataTypes.STRING, defaultValue: 'XXXX-XXXX-9012' },
  kyc_document_url: { type: DataTypes.STRING, defaultValue: '/uploads/pan_card.pdf' },
  address: { type: DataTypes.STRING, defaultValue: 'Bandra West, Sea Face View' },
  city: { type: DataTypes.STRING, defaultValue: 'Mumbai' },
  state: { type: DataTypes.STRING, defaultValue: 'Maharashtra' },
  pincode: { type: DataTypes.STRING, defaultValue: '400050' },
  country: { type: DataTypes.STRING, defaultValue: 'India' },
  occupation: { type: DataTypes.STRING, defaultValue: 'Business / Professional' },
  income_range: { type: DataTypes.STRING, defaultValue: '> ₹25 Lakhs' },
  experience: { type: DataTypes.STRING, defaultValue: 'Expert' },
  risk_profile: { type: DataTypes.STRING, defaultValue: 'Balanced' },
  investment_objective: { type: DataTypes.STRING, defaultValue: 'Growth & Income' },
  step_completed: { type: DataTypes.INTEGER, defaultValue: 7 },
  status: { type: DataTypes.STRING, defaultValue: 'APPROVED' }
});

// 3. Bank Account Model
const BankAccount = sequelize.define('BankAccount', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  account_holder_name: { type: DataTypes.STRING, defaultValue: 'Sachin Tendulkar' },
  account_number: { type: DataTypes.STRING, defaultValue: '4567' },
  full_account_number: { type: DataTypes.STRING, defaultValue: '91801004567' },
  ifsc_code: { type: DataTypes.STRING, defaultValue: 'HDFC0001234' },
  bank_name: { type: DataTypes.STRING, defaultValue: 'HDFC Bank' },
  is_primary: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// 4. User Trading Setup & Package Model
const UserTradingSetup = sequelize.define('UserTradingSetup', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  package_type: { type: DataTypes.STRING, defaultValue: 'BALANCED' }, // CAPITAL_PROTECT, BALANCED, AGGRESSIVE
  package_return_range: { type: DataTypes.STRING, defaultValue: '30% - 60%' },
  markets: { type: DataTypes.JSON, defaultValue: ['Indian Markets', 'Commodity Markets', 'Crypto Markets'] },
  algo_enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
  total_investment: { type: DataTypes.FLOAT, defaultValue: 500000.0 },
  current_value: { type: DataTypes.FLOAT, defaultValue: 538750.0 },
  realized_pnl: { type: DataTypes.FLOAT, defaultValue: 27850.0 },
  unrealized_pnl: { type: DataTypes.FLOAT, defaultValue: 10900.0 }
});

// 5. Market Instrument Model
const MarketInstrument = sequelize.define('MarketInstrument', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  symbol: { type: DataTypes.STRING, allowNull: false, unique: true },
  name: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, defaultValue: 'INDIAN' }, // INDIAN, COMMODITY, CRYPTO
  exchange: { type: DataTypes.STRING, defaultValue: 'NSE' },
  ltp: { type: DataTypes.FLOAT, allowNull: false },
  change_amount: { type: DataTypes.FLOAT, defaultValue: 0.0 },
  change_percent: { type: DataTypes.FLOAT, defaultValue: 0.0 },
  trading_hours: { type: DataTypes.STRING, defaultValue: '09:00 AM - 04:00 PM' },
  trading_days: { type: DataTypes.STRING, defaultValue: 'Mon - Fri' },
  currency_symbol: { type: DataTypes.STRING, defaultValue: '₹' }
});

// 6. Position / Trade Model
const Position = sequelize.define('Position', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  symbol: { type: DataTypes.STRING, allowNull: false },
  exchange: { type: DataTypes.STRING, defaultValue: 'NFO' },
  order_type: { type: DataTypes.STRING, defaultValue: 'LIMIT' },
  side: { type: DataTypes.STRING, defaultValue: 'BUY' }, // BUY, SELL
  quantity: { type: DataTypes.INTEGER, defaultValue: 50 },
  avg_price: { type: DataTypes.FLOAT, defaultValue: 102.50 },
  ltp: { type: DataTypes.FLOAT, defaultValue: 128.30 },
  pnl_amount: { type: DataTypes.FLOAT, defaultValue: 12900.0 },
  pnl_percent: { type: DataTypes.FLOAT, defaultValue: 25.17 },
  is_algo: { type: DataTypes.BOOLEAN, defaultValue: true },
  is_open: { type: DataTypes.BOOLEAN, defaultValue: true }
});

// 7. Transaction / Withdrawal Model
const Transaction = sequelize.define('Transaction', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  txn_id: { type: DataTypes.STRING, unique: true, defaultValue: 'TRW12345678' },
  type: { type: DataTypes.STRING, defaultValue: 'WITHDRAWAL' }, // WITHDRAWAL, DEPOSIT, REFERRAL_TRANSFER
  amount: { type: DataTypes.FLOAT, allowNull: false },
  bank_name: { type: DataTypes.STRING, defaultValue: 'HDFC Bank' },
  account_masked: { type: DataTypes.STRING, defaultValue: '**** 4567' },
  ifsc_code: { type: DataTypes.STRING, defaultValue: 'HDFC0001234' },
  status: { type: DataTypes.STRING, defaultValue: 'Processing' }, // Processing, Completed, Failed
  expected_time: { type: DataTypes.STRING, defaultValue: 'Within 1-4 hours' }
});

// 8. Referral Record Model
const ReferralRecord = sequelize.define('ReferralRecord', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  referee_name: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: 'Active' },
  joined_date: { type: DataTypes.STRING, defaultValue: '12 Aug 2024' },
  total_trades: { type: DataTypes.INTEGER, defaultValue: 156 },
  total_profit: { type: DataTypes.FLOAT, defaultValue: 86400.0 },
  earned_amount: { type: DataTypes.FLOAT, defaultValue: 4320.0 }
});

// 9. Login History Model
const LoginHistory = sequelize.define('LoginHistory', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  ip_address: { type: DataTypes.STRING, defaultValue: '192.168.1.45' },
  device_name: { type: DataTypes.STRING, defaultValue: 'iPhone 15 Pro Max' },
  location: { type: DataTypes.STRING, defaultValue: 'Mumbai, India' },
  auth_method: { type: DataTypes.STRING, defaultValue: 'PIN' }
});

// 10. Notification Model
const Notification = sequelize.define('Notification', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  category: { type: DataTypes.STRING, defaultValue: 'Trading' }, // Trading, Funds, Account, Important
  title: { type: DataTypes.STRING, allowNull: false },
  message: { type: DataTypes.TEXT, allowNull: false },
  is_read: { type: DataTypes.BOOLEAN, defaultValue: false },
  time_ago: { type: DataTypes.STRING, defaultValue: 'Today at 09:22 AM' }
});

// 11. Research Call & News Model
const ResearchCall = sequelize.define('ResearchCall', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  symbol: { type: DataTypes.STRING, allowNull: false },
  recommendation: { type: DataTypes.STRING, defaultValue: 'BUY' }, // BUY, SELL
  entry_range: { type: DataTypes.STRING, defaultValue: '25,100 - 25,150' },
  target_1: { type: DataTypes.FLOAT, defaultValue: 25250 },
  target_2: { type: DataTypes.FLOAT, defaultValue: 25350 },
  stop_loss: { type: DataTypes.FLOAT, defaultValue: 24950 },
  risk_level: { type: DataTypes.STRING, defaultValue: 'Moderate' },
  call_type: { type: DataTypes.STRING, defaultValue: 'Intraday' },
  is_active: { type: DataTypes.BOOLEAN, defaultValue: true }
});

const ResearchNews = sequelize.define('ResearchNews', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  snippet: { type: DataTypes.TEXT, allowNull: false },
  source: { type: DataTypes.STRING, defaultValue: 'Economic Times' },
  sentiment: { type: DataTypes.STRING, defaultValue: 'Positive' }, // Positive, Neutral, Negative
  time_ago: { type: DataTypes.STRING, defaultValue: '10 min ago' }
});

// Relationships
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
