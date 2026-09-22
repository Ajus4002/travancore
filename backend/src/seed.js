const bcrypt = require('bcryptjs');
const {
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
} = require('./models');

async function seedDatabase() {
  try {
    console.log('[Seed] Syncing database models...');
    await sequelize.sync({ force: true });

    console.log('[Seed] Creating demo user Sachin Tendulkar (458921)...');
    const passwordHash = await bcrypt.hash('password123', 10);
    const pinHash = await bcrypt.hash('123456', 10);
    const patternHash = await bcrypt.hash('1-2-3-6-9', 10);

    const demoUser = await User.create({
      account_id: '458921',
      full_name: 'Sachin Tendulkar',
      email: 'sachin@travancore.com',
      mobile_number: '+91 9876543210',
      password_hash: passwordHash,
      pin_hash: pinHash,
      pattern_hash: patternHash,
      fingerprint_enabled: true,
      face_id_enabled: true,
      is_kyc_verified: true,
      referral_code: 'ST1234',
      last_login_at: new Date()
    });

    await OnboardingDetails.create({
      userId: demoUser.id,
      dob: '24/04/1973',
      gender: 'Male',
      pan_number: 'ABCDE1234F',
      aadhaar_number: 'XXXX-XXXX-9012',
      address: 'Bandra West, Sea Face View',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400050',
      country: 'India',
      occupation: 'Business / Professional',
      income_range: '> ₹25 Lakhs',
      experience: 'Expert',
      risk_profile: 'Balanced',
      investment_objective: 'Growth & Income',
      step_completed: 7,
      status: 'APPROVED'
    });

    await BankAccount.create({
      userId: demoUser.id,
      account_holder_name: 'Sachin Tendulkar',
      account_number: '4567',
      full_account_number: '91801004567',
      ifsc_code: 'HDFC0001234',
      bank_name: 'HDFC Bank',
      is_primary: true
    });

    await UserTradingSetup.create({
      userId: demoUser.id,
      package_type: 'BALANCED',
      package_return_range: '30% - 60%',
      markets: ['Indian Markets', 'Commodity Markets', 'Crypto Markets'],
      algo_enabled: true,
      total_investment: 500000.0,
      current_value: 538750.0,
      realized_pnl: 27850.0,
      unrealized_pnl: 10900.0
    });

    // Market Instruments (Page 16)
    await MarketInstrument.bulkCreate([
      { symbol: 'NIFTY 50', name: 'NIFTY Index', category: 'INDIAN', exchange: 'NSE', ltp: 25017.35, change_amount: 162.40, change_percent: 0.65, trading_hours: '09:00 AM - 04:00 PM', trading_days: 'Mon - Fri', currency_symbol: '₹' },
      { symbol: 'SENSEX', name: 'BSE SENSEX Index', category: 'INDIAN', exchange: 'BSE', ltp: 81697.76, change_amount: 520.90, change_percent: 0.64, trading_hours: '09:00 AM - 04:00 PM', trading_days: 'Mon - Fri', currency_symbol: '₹' },
      { symbol: 'BANK NIFTY', name: 'Nifty Bank Index', category: 'INDIAN', exchange: 'NSE', ltp: 51328.45, change_amount: 310.25, change_percent: 0.61, trading_hours: '09:00 AM - 04:00 PM', trading_days: 'Mon - Fri', currency_symbol: '₹' },
      { symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', category: 'INDIAN', exchange: 'NSE', ltp: 2914.75, change_amount: 45.20, change_percent: 1.58, trading_hours: '09:00 AM - 04:00 PM', trading_days: 'Mon - Fri', currency_symbol: '₹' },
      { symbol: 'TCS', name: 'Tata Consultancy Services', category: 'INDIAN', exchange: 'NSE', ltp: 3789.10, change_amount: 20.40, change_percent: 0.54, trading_hours: '09:00 AM - 04:00 PM', trading_days: 'Mon - Fri', currency_symbol: '₹' },
      { symbol: 'GOLD', name: 'Gold Futures', category: 'COMMODITY', exchange: 'MCX', ltp: 72358.0, change_amount: 284.0, change_percent: 0.39, trading_hours: '06:00 PM - 12:00 AM', trading_days: 'Mon - Fri', currency_symbol: '₹' },
      { symbol: 'SILVER', name: 'Silver Futures', category: 'COMMODITY', exchange: 'MCX', ltp: 83420.0, change_amount: 612.0, change_percent: 0.74, trading_hours: '06:00 PM - 12:00 AM', trading_days: 'Mon - Fri', currency_symbol: '₹' },
      { symbol: 'CRUDE OIL', name: 'Crude Oil Futures', category: 'COMMODITY', exchange: 'MCX', ltp: 6847.0, change_amount: -18.0, change_percent: -0.26, trading_hours: '06:00 PM - 12:00 AM', trading_days: 'Mon - Fri', currency_symbol: '₹' },
      { symbol: 'NATURAL GAS', name: 'Natural Gas Futures', category: 'COMMODITY', exchange: 'MCX', ltp: 245.30, change_amount: 2.80, change_percent: 1.16, trading_hours: '06:00 PM - 12:00 AM', trading_days: 'Mon - Fri', currency_symbol: '₹' },
      { symbol: 'BITCOIN', name: 'Bitcoin (BTC/USD)', category: 'CRYPTO', exchange: 'CRYPTO', ltp: 58421.35, change_amount: 1245.60, change_percent: 2.18, trading_hours: '24x7', trading_days: 'All 7 Days', currency_symbol: '$' },
      { symbol: 'ETHEREUM', name: 'Ethereum (ETH/USD)', category: 'CRYPTO', exchange: 'CRYPTO', ltp: 2432.10, change_amount: 38.45, change_percent: 1.61, trading_hours: '24x7', trading_days: 'All 7 Days', currency_symbol: '$' },
      { symbol: 'SOLANA', name: 'Solana (SOL/USD)', category: 'CRYPTO', exchange: 'CRYPTO', ltp: 142.35, change_amount: -1.80, change_percent: -1.25, trading_hours: '24x7', trading_days: 'All 7 Days', currency_symbol: '$' }
    ]);

    // Positions (Pages 17, 19)
    await Position.bulkCreate([
      { userId: demoUser.id, symbol: 'NIFTY 12 SEP 25000 CE', exchange: 'NFO', side: 'BUY', quantity: 50, avg_price: 102.50, ltp: 128.30, pnl_amount: 12900.0, pnl_percent: 25.17, is_algo: true, is_open: true },
      { userId: demoUser.id, symbol: 'BANKNIFTY 12 SEP 51300 PE', exchange: 'NFO', side: 'SELL', quantity: 25, avg_price: 215.00, ltp: 198.40, pnl_amount: -4150.0, pnl_percent: -7.72, is_algo: true, is_open: true },
      { userId: demoUser.id, symbol: 'RELIANCE', exchange: 'NSE', side: 'BUY', quantity: 100, avg_price: 2856.00, ltp: 2914.75, pnl_amount: 5875.0, pnl_percent: 2.06, is_algo: true, is_open: true },
      { userId: demoUser.id, symbol: 'GOLD OCT FUT', exchange: 'MCX', side: 'BUY', quantity: 10, avg_price: 72450.0, ltp: 72612.0, pnl_amount: 1620.0, pnl_percent: 0.22, is_algo: true, is_open: true },
      { userId: demoUser.id, symbol: 'BTC/USDT', exchange: 'CRYPTO', side: 'BUY', quantity: 1, avg_price: 58210.0, ltp: 58450.0, pnl_amount: 620.0, pnl_percent: 0.41, is_algo: true, is_open: true }
    ]);

    // Transactions / Withdrawals (Page 23)
    await Transaction.bulkCreate([
      { userId: demoUser.id, txn_id: 'TRW12345678', type: 'WITHDRAWAL', amount: 50000.0, bank_name: 'HDFC Bank', account_masked: '**** 4567', ifsc_code: 'HDFC0001234', status: 'Processing', expected_time: 'Within 1-4 hours' },
      { userId: demoUser.id, txn_id: 'TRW12345677', type: 'WITHDRAWAL', amount: 25000.0, bank_name: 'ICICI Bank', account_masked: '**** 8901', ifsc_code: 'ICIC0008901', status: 'Completed', expected_time: 'Completed' },
      { userId: demoUser.id, txn_id: 'TRW12345676', type: 'WITHDRAWAL', amount: 15000.0, bank_name: 'HDFC Bank', account_masked: '**** 4567', ifsc_code: 'HDFC0001234', status: 'Completed', expected_time: 'Completed' },
      { userId: demoUser.id, txn_id: 'TRW12345675', type: 'WITHDRAWAL', amount: 10000.0, bank_name: 'SBI Bank', account_masked: '**** 2233', ifsc_code: 'SBIN0002233', status: 'Failed', expected_time: 'Failed' },
      { userId: demoUser.id, txn_id: 'TRW12345674', type: 'WITHDRAWAL', amount: 40000.0, bank_name: 'HDFC Bank', account_masked: '**** 4567', ifsc_code: 'HDFC0001234', status: 'Completed', expected_time: 'Completed' }
    ]);

    // Referral Records (Page 18)
    await ReferralRecord.bulkCreate([
      { userId: demoUser.id, referee_name: 'Anil R', status: 'Active', joined_date: '12 Aug 2024', total_trades: 156, total_profit: 86400.0, earned_amount: 4320.0 },
      { userId: demoUser.id, referee_name: 'Priya K', status: 'Active', joined_date: '28 Sep 2024', total_trades: 98, total_profit: 57000.0, earned_amount: 2850.0 },
      { userId: demoUser.id, referee_name: 'Rahul S', status: 'Active', joined_date: '14 Jan 2025', total_trades: 64, total_profit: 35600.0, earned_amount: 1780.0 },
      { userId: demoUser.id, referee_name: 'Meera T', status: 'Active', joined_date: '03 Feb 2025', total_trades: 42, total_profit: 25000.0, earned_amount: 1250.0 }
    ]);

    // Login History (Page 24)
    await LoginHistory.bulkCreate([
      { userId: demoUser.id, ip_address: '192.168.1.45', device_name: 'iPhone 15 Pro Max', location: 'Mumbai, India', auth_method: 'PIN' },
      { userId: demoUser.id, ip_address: '192.168.1.45', device_name: 'iPhone 15 Pro Max', location: 'Mumbai, India', auth_method: 'Fingerprint' },
      { userId: demoUser.id, ip_address: '103.22.45.12', device_name: 'MacBook Pro Chrome', location: 'Mumbai, India', auth_method: 'Password' }
    ]);

    // Notifications (Page 22)
    await Notification.bulkCreate([
      { userId: demoUser.id, category: 'Trading', title: 'Order Executed', message: 'NIFTY 12 SEP 25000 CE • BUY 50 @ ₹128.30. Your order has been fully executed.', is_read: false, time_ago: 'Today at 09:22 AM' },
      { userId: demoUser.id, category: 'Trading', title: 'Algo Trade Executed', message: 'BANKNIFTY 12 SEP 51300 PE • SELL 25 @ ₹198.40. Executed by Algo Strategy (Balanced).', is_read: false, time_ago: 'Today at 09:18 AM' },
      { userId: demoUser.id, category: 'Trading', title: 'Position Closed', message: 'RELIANCE • SELL 100 @ ₹2,914.75. Position closed. P&L: +₹5,875.', is_read: false, time_ago: 'Today at 09:45 AM' },
      { userId: demoUser.id, category: 'Funds', title: 'Withdrawal Requested', message: 'Withdrawal request of ₹50,000 to HDFC Bank is currently processing.', is_read: false, time_ago: 'Today at 02:35 PM' },
      { userId: demoUser.id, category: 'Important', title: 'Algo Strategy Summary', message: 'Total trades today: 8 | Net P&L: +₹18,420 | Win rate: 75%.', is_read: true, time_ago: 'Yesterday at 04:15 PM' }
    ]);

    // Research Calls & News (Page 25)
    await ResearchCall.bulkCreate([
      { symbol: 'NIFTY 50', recommendation: 'BUY', entry_range: '25,100 - 25,150', target_1: 25250, target_2: 25350, stop_loss: 24950, risk_level: 'Moderate', call_type: 'Intraday' },
      { symbol: 'RELIANCE', recommendation: 'BUY', entry_range: '2,910 - 2,920', target_1: 2950, target_2: 2980, stop_loss: 2870, risk_level: 'Moderate', call_type: 'Swing' },
      { symbol: 'BANK NIFTY', recommendation: 'SELL', entry_range: '51,400 - 51,500', target_1: 51200, target_2: 50900, stop_loss: 51750, risk_level: 'High', call_type: 'Intraday' },
      { symbol: 'GOLD OCT FUT', recommendation: 'SELL', entry_range: '72,800 - 72,900', target_1: 72400, target_2: 72200, stop_loss: 73150, risk_level: 'Moderate', call_type: 'Intraday' },
      { symbol: 'TCS', recommendation: 'BUY', entry_range: '3,420 - 3,450', target_1: 3580, target_2: 3700, stop_loss: 3320, risk_level: 'Moderate', call_type: 'Positional' }
    ]);

    await ResearchNews.bulkCreate([
      { title: 'Indian markets open higher as banking and IT stocks gain momentum', snippet: 'NIFTY opens above 25,100, Sensex up 500+ points led by strong buying in PSU banks and IT stocks.', source: 'Economic Times', sentiment: 'Positive', time_ago: '10 min ago' },
      { title: 'RBI keeps repo rate unchanged at 6.50%, maintains neutral stance', snippet: 'MPC decides to keep policy rate unchanged, cites stable inflation and steady growth outlook.', source: 'Moneycontrol', sentiment: 'Neutral', time_ago: '45 min ago' },
      { title: 'HDFC Bank to raise ₹25,000 crore via infrastructure bonds', snippet: 'Proceeds to be used for infrastructure financing and business growth.', source: 'Business Standard', sentiment: 'Positive', time_ago: '1 hour ago' },
      { title: 'Crude oil slips below $72 on global supply concerns', snippet: 'Brent crude falls 1.8% as OPEC signals higher output in coming months.', source: 'Reuters', sentiment: 'Negative', time_ago: '2 hours ago' }
    ]);

    console.log('[Seed] Database successfully seeded with demo user and sample market data!');
  } catch (err) {
    console.error('[Seed Error]', err);
  }
}

if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}

module.exports = seedDatabase;
