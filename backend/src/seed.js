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

    console.log('[Seed] Creating dummy trading users...');
    const passwordHash = await bcrypt.hash('password123', 10);
    const pinHash1 = await bcrypt.hash('123456', 10);
    const pinHash2 = await bcrypt.hash('654321', 10);
    const pinHash3 = await bcrypt.hash('777777', 10);
    const pinHash4 = await bcrypt.hash('454545', 10);
    const pinHash5 = await bcrypt.hash('101010', 10);
    const patternHash = await bcrypt.hash('1-2-3-6-9', 10);

    const usersData = [
      {
        account_id: '458921',
        full_name: 'Sachin Tendulkar',
        email: 'sachin@travancore.com',
        mobile_number: '+91 9876543210',
        password_hash: passwordHash,
        pin_hash: pinHash1,
        pattern_hash: patternHash,
        referral_code: 'ST1234',
        onboarding: { dob: '24/04/1973', gender: 'Male', pan: 'ABCDE1234F', aadhaar: 'XXXX-XXXX-9012', address: 'Bandra West, Sea Face View', city: 'Mumbai', state: 'Maharashtra', pincode: '400050', occupation: 'Business / Professional', income: '> ₹25 Lakhs', experience: 'Expert', risk: 'Balanced', objective: 'Growth & Income' },
        bank: { name: 'HDFC Bank', number: '4567', full_number: '91801004567', ifsc: 'HDFC0001234' },
        setup: { package: 'BALANCED', return_range: '30% - 60%', investment: 500000.0, current: 538750.0, realized: 27850.0, unrealized: 10900.0 }
      },
      {
        account_id: '458922',
        full_name: 'Virat Kohli',
        email: 'virat@travancore.com',
        mobile_number: '+91 9876543211',
        password_hash: passwordHash,
        pin_hash: pinHash2,
        pattern_hash: patternHash,
        referral_code: 'VK1818',
        onboarding: { dob: '05/11/1988', gender: 'Male', pan: 'VKOPL5678G', aadhaar: 'XXXX-XXXX-1818', address: 'Worli Skyline Towers', city: 'Mumbai', state: 'Maharashtra', pincode: '400018', occupation: 'Professional Athlete', income: '> ₹25 Lakhs', experience: 'Intermediate', risk: 'High', objective: 'Aggressive Capital Growth' },
        bank: { name: 'ICICI Bank', number: '1818', full_number: '91801001818', ifsc: 'ICIC0001818' },
        setup: { package: 'AGGRESSIVE', return_range: '50% - 70%', investment: 1000000.0, current: 1185000.0, realized: 185000.0, unrealized: 45000.0 }
      },
      {
        account_id: '458923',
        full_name: 'MS Dhoni',
        email: 'dhoni@travancore.com',
        mobile_number: '+91 9876543212',
        password_hash: passwordHash,
        pin_hash: pinHash3,
        pattern_hash: patternHash,
        referral_code: 'MSD007',
        onboarding: { dob: '07/07/1981', gender: 'Male', pan: 'MSDPH0007K', aadhaar: 'XXXX-XXXX-0007', address: 'Ranchi Farmhouse Estate', city: 'Ranchi', state: 'Jharkhand', pincode: '834001', occupation: 'Business Owner', income: '> ₹25 Lakhs', experience: 'Expert', risk: 'Capital Protect / Low', objective: 'Wealth Preservation' },
        bank: { name: 'State Bank of India', number: '0007', full_number: '91801000007', ifsc: 'SBIN0000007' },
        setup: { package: 'CAPITAL_PROTECT', return_range: '20% - 30%', investment: 2500000.0, current: 2710000.0, realized: 210000.0, unrealized: 35000.0 }
      },
      {
        account_id: '458924',
        full_name: 'Rohit Sharma',
        email: 'rohit@travancore.com',
        mobile_number: '+91 9876543213',
        password_hash: passwordHash,
        pin_hash: pinHash4,
        pattern_hash: patternHash,
        referral_code: 'RS4545',
        onboarding: { dob: '30/04/1987', gender: 'Male', pan: 'RSHAR4545M', aadhaar: 'XXXX-XXXX-4545', address: 'Prabhadevi Heights', city: 'Mumbai', state: 'Maharashtra', pincode: '400025', occupation: 'Sports Professional', income: '> ₹25 Lakhs', experience: 'Intermediate', risk: 'Balanced', objective: 'Capital Appreciation' },
        bank: { name: 'Axis Bank', number: '4545', full_number: '91801004545', ifsc: 'UTIB0004545' },
        setup: { package: 'BALANCED', return_range: '30% - 60%', investment: 750000.0, current: 815400.0, realized: 65400.0, unrealized: 18200.0 }
      },
      {
        account_id: '458925',
        full_name: 'Anil Kumble',
        email: 'anil@travancore.com',
        mobile_number: '+91 9876543214',
        password_hash: passwordHash,
        pin_hash: pinHash5,
        pattern_hash: patternHash,
        referral_code: 'AK1010',
        onboarding: { dob: '17/10/1970', gender: 'Male', pan: 'AKUMB1010N', aadhaar: 'XXXX-XXXX-1010', address: 'Indiranagar Main Road', city: 'Bengaluru', state: 'Karnataka', pincode: '560038', occupation: 'Tech Entrepreneur / Consultant', income: '₹10L - ₹25L', experience: 'Expert', risk: 'Balanced', objective: 'Monthly Income' },
        bank: { name: 'Canara Bank', number: '1010', full_number: '91801001010', ifsc: 'CNRB0001010' },
        setup: { package: 'BALANCED', return_range: '30% - 60%', investment: 300000.0, current: 324000.0, realized: 24000.0, unrealized: 6800.0 }
      }
    ];

    for (const u of usersData) {
      const user = await User.create({
        account_id: u.account_id,
        full_name: u.full_name,
        email: u.email,
        mobile_number: u.mobile_number,
        password_hash: u.password_hash,
        pin_hash: u.pin_hash,
        pattern_hash: u.pattern_hash,
        fingerprint_enabled: true,
        face_id_enabled: true,
        is_kyc_verified: true,
        referral_code: u.referral_code,
        last_login_at: new Date()
      });

      await OnboardingDetails.create({
        userId: user.id,
        dob: u.onboarding.dob,
        gender: u.onboarding.gender,
        pan_number: u.onboarding.pan,
        aadhaar_number: u.onboarding.aadhaar,
        address: u.onboarding.address,
        city: u.onboarding.city,
        state: u.onboarding.state,
        pincode: u.onboarding.pincode,
        country: 'India',
        occupation: u.onboarding.occupation,
        income_range: u.onboarding.income,
        experience: u.onboarding.experience,
        risk_profile: u.onboarding.risk,
        investment_objective: u.onboarding.objective,
        step_completed: 7,
        status: 'APPROVED'
      });

      await BankAccount.create({
        userId: user.id,
        account_holder_name: u.full_name,
        account_number: u.bank.number,
        full_account_number: u.bank.full_number,
        ifsc_code: u.bank.ifsc,
        bank_name: u.bank.name,
        is_primary: true
      });

      await UserTradingSetup.create({
        userId: user.id,
        package_type: u.setup.package,
        package_return_range: u.setup.return_range,
        markets: ['Indian Markets', 'Commodity Markets', 'Crypto Markets'],
        algo_enabled: true,
        total_investment: u.setup.investment,
        current_value: u.setup.current,
        realized_pnl: u.setup.realized,
        unrealized_pnl: u.setup.unrealized
      });

      await Position.bulkCreate([
        { userId: user.id, symbol: 'NIFTY 12 SEP 25000 CE', exchange: 'NFO', side: 'BUY', quantity: 50, avg_price: 102.50, ltp: 128.30, pnl_amount: 12900.0, pnl_percent: 25.17, is_algo: true, is_open: true },
        { userId: user.id, symbol: 'BANKNIFTY 12 SEP 51300 PE', exchange: 'NFO', side: 'SELL', quantity: 25, avg_price: 215.00, ltp: 198.40, pnl_amount: -4150.0, pnl_percent: -7.72, is_algo: true, is_open: true },
        { userId: user.id, symbol: 'RELIANCE', exchange: 'NSE', side: 'BUY', quantity: 100, avg_price: 2856.00, ltp: 2914.75, pnl_amount: 5875.0, pnl_percent: 2.06, is_algo: true, is_open: true }
      ]);

      await Transaction.bulkCreate([
        { userId: user.id, txn_id: 'TRW' + Math.floor(10000000 + Math.random() * 90000000), type: 'WITHDRAWAL', amount: 50000.0, bank_name: u.bank.name, account_masked: '**** ' + u.bank.number, ifsc_code: u.bank.ifsc, status: 'Processing', expected_time: 'Within 1-4 hours' },
        { userId: user.id, txn_id: 'TRW' + Math.floor(10000000 + Math.random() * 90000000), type: 'WITHDRAWAL', amount: 25000.0, bank_name: u.bank.name, account_masked: '**** ' + u.bank.number, ifsc_code: u.bank.ifsc, status: 'Completed', expected_time: 'Completed' }
      ]);

      await ReferralRecord.bulkCreate([
        { userId: user.id, referee_name: 'Anil R', status: 'Active', joined_date: '12 Aug 2024', total_trades: 156, total_profit: 86400.0, earned_amount: 4320.0 },
        { userId: user.id, referee_name: 'Priya K', status: 'Active', joined_date: '28 Sep 2024', total_trades: 98, total_profit: 57000.0, earned_amount: 2850.0 }
      ]);

      await LoginHistory.bulkCreate([
        { userId: user.id, ip_address: '192.168.1.45', device_name: 'iPhone 15 Pro Max', location: 'Mumbai, India', auth_method: 'PIN' },
        { userId: user.id, ip_address: '103.22.45.12', device_name: 'MacBook Pro Chrome', location: 'Mumbai, India', auth_method: 'Password' }
      ]);

      await Notification.bulkCreate([
        { userId: user.id, category: 'Trading', title: 'Order Executed', message: 'NIFTY 12 SEP 25000 CE • BUY 50 @ ₹128.30. Order executed successfully.', is_read: false, time_ago: 'Today at 09:22 AM' },
        { userId: user.id, category: 'Funds', title: 'Withdrawal Requested', message: `Withdrawal request of ₹50,000 to ${u.bank.name} is processing.`, is_read: false, time_ago: 'Today at 02:35 PM' }
      ]);
    }

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

    console.log('[Seed] Database successfully seeded with 5 dummy users and complete sample market data!');
  } catch (err) {
    console.error('[Seed Error]', err);
  }
}

if (require.main === module) {
  seedDatabase().then(() => process.exit(0));
}

module.exports = seedDatabase;
