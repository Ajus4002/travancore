const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

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
const seedDatabase = require('./seed');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'travancore_secret_jwt_key_2026';

app.use(cors());
app.use(express.json());

// Middleware for auth
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access token required' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = user;
    next();
  });
};

// ================= AUTHENTICATION & SECURITY ENDPOINTS (MODULE 1) =================

// Password Login
app.post('/api/auth/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        email: username
      }
    }) || await User.findOne({ where: { account_id: username } });

    if (!user) return res.status(404).json({ error: 'User account not found' });

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) return res.status(401).json({ error: 'Invalid password credential' });

    user.last_login_at = new Date();
    await user.save();

    await LoginHistory.create({
      userId: user.id,
      ip_address: req.ip || '192.168.1.45',
      device_name: req.headers['user-agent'] ? 'Mobile / Web Browser' : 'iPhone 15 Pro Max',
      location: 'Mumbai, India',
      auth_method: 'Password'
    });

    const token = jwt.sign({ id: user.id, account_id: user.account_id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, account_id: user.account_id, full_name: user.full_name, email: user.email, mobile_number: user.mobile_number, referral_code: user.referral_code } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PIN Login
app.post('/api/auth/pin-login', async (req, res) => {
  try {
    const { pin, account_id = '458921' } = req.body;
    const user = await User.findOne({ where: { account_id } });
    if (!user) return res.status(404).json({ error: 'Account not found' });

    const validPin = await bcrypt.compare(pin, user.pin_hash);
    if (!validPin) return res.status(401).json({ error: 'Incorrect 6-digit transaction PIN' });

    user.last_login_at = new Date();
    await user.save();

    await LoginHistory.create({
      userId: user.id,
      ip_address: req.ip || '192.168.1.45',
      device_name: 'iPhone 15 Pro Max',
      location: 'Mumbai, India',
      auth_method: 'PIN'
    });

    const token = jwt.sign({ id: user.id, account_id: user.account_id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, account_id: user.account_id, full_name: user.full_name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Biometric Auth (Fingerprint / Face ID Simulation)
app.post('/api/auth/biometric-login', async (req, res) => {
  try {
    const { account_id = '458921', bio_type = 'Fingerprint' } = req.body;
    const user = await User.findOne({ where: { account_id } });
    if (!user) return res.status(404).json({ error: 'Account not found' });

    user.last_login_at = new Date();
    await user.save();

    await LoginHistory.create({
      userId: user.id,
      ip_address: req.ip || '192.168.1.45',
      device_name: 'iPhone 15 Pro Max',
      location: 'Mumbai, India',
      auth_method: bio_type
    });

    const token = jwt.sign({ id: user.id, account_id: user.account_id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, account_id: user.account_id, full_name: user.full_name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Pattern Lock Login
app.post('/api/auth/pattern-login', async (req, res) => {
  try {
    const { pattern, account_id = '458921' } = req.body;
    const user = await User.findOne({ where: { account_id } });
    if (!user) return res.status(404).json({ error: 'Account not found' });

    user.last_login_at = new Date();
    await user.save();

    await LoginHistory.create({
      userId: user.id,
      ip_address: req.ip || '192.168.1.45',
      device_name: 'iPhone 15 Pro Max',
      location: 'Mumbai, India',
      auth_method: 'Pattern Lock'
    });

    const token = jwt.sign({ id: user.id, account_id: user.account_id, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, user: { id: user.id, account_id: user.account_id, full_name: user.full_name, email: user.email } });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Security Settings & Login Audit Log
app.get('/api/user/security-settings', async (req, res) => {
  try {
    const user = await User.findOne({ where: { account_id: '458921' } });
    const loginLogs = await LoginHistory.findAll({ where: { userId: user.id }, order: [['createdAt', 'DESC']], limit: 10 });
    res.json({
      last_login: user.last_login_at,
      fingerprint_enabled: user.fingerprint_enabled,
      face_id_enabled: user.face_id_enabled,
      login_logs: loginLogs
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Toggle Biometrics
app.post('/api/user/toggle-biometric', async (req, res) => {
  try {
    const { type, enabled } = req.body;
    const user = await User.findOne({ where: { account_id: '458921' } });
    if (type === 'fingerprint') user.fingerprint_enabled = enabled;
    if (type === 'face_id') user.face_id_enabled = enabled;
    await user.save();
    res.json({ message: `Biometric ${type} setting updated successfully`, fingerprint_enabled: user.fingerprint_enabled, face_id_enabled: user.face_id_enabled });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Revoke All Active Sessions
app.post('/api/user/revoke-sessions', async (req, res) => {
  try {
    const user = await User.findOne({ where: { account_id: '458921' } });
    await LoginHistory.destroy({ where: { userId: user.id } });
    // Re-create initial current session
    await LoginHistory.create({
      userId: user.id,
      ip_address: req.ip || '127.0.0.1',
      device_name: 'Current Session (Mobile Web App)',
      location: 'Mumbai, India',
      auth_method: 'Active Session'
    });
    res.json({ message: 'All other active sessions revoked successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Change PIN
app.post('/api/user/change-pin', async (req, res) => {
  try {
    const { old_pin, new_pin } = req.body;
    const user = await User.findOne({ where: { account_id: '458921' } });
    const newPinHash = await bcrypt.hash(new_pin, 10);
    user.pin_hash = newPinHash;
    await user.save();
    res.json({ message: '6-digit transaction PIN updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= ONBOARDING & ACCOUNT CREATION (MODULE 3) =================

app.get('/api/onboarding/status', async (req, res) => {
  try {
    const user = await User.findOne({ where: { account_id: '458921' } });
    let onboarding = await OnboardingDetails.findOne({ where: { userId: user.id } });
    let bank = await BankAccount.findOne({ where: { userId: user.id, is_primary: true } });
    let setup = await UserTradingSetup.findOne({ where: { userId: user.id } });

    res.json({
      user: { full_name: user.full_name, email: user.email, mobile_number: user.mobile_number, is_kyc_verified: user.is_kyc_verified },
      onboarding,
      bank,
      setup
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/onboarding/submit', async (req, res) => {
  try {
    const {
      fullName, dob, gender, mobile, email,
      pan, aadhaar, address, city, state, pincode,
      occupation, income, experience, risk, objective,
      accountName, accountNumber, ifsc, bankName,
      packageType, markets, stepCompleted = 7
    } = req.body;

    const user = await User.findOne({ where: { account_id: '458921' } });
    if (fullName) user.full_name = fullName;
    if (email) user.email = email;
    if (mobile) user.mobile_number = mobile;
    user.is_kyc_verified = true;
    await user.save();

    let onboarding = await OnboardingDetails.findOne({ where: { userId: user.id } });
    if (!onboarding) {
      onboarding = await OnboardingDetails.create({ userId: user.id });
    }
    await onboarding.update({
      dob, gender, pan_number: pan, aadhaar_number: aadhaar,
      address, city, state, pincode, occupation, income_range: income,
      experience, risk_profile: risk, investment_objective: objective,
      step_completed: stepCompleted, status: 'APPROVED'
    });

    let bank = await BankAccount.findOne({ where: { userId: user.id, is_primary: true } });
    if (!bank) {
      bank = await BankAccount.create({ userId: user.id, is_primary: true });
    }
    await bank.update({
      account_holder_name: accountName || fullName,
      account_number: accountNumber ? accountNumber.slice(-4) : '4567',
      full_account_number: accountNumber,
      ifsc_code: ifsc,
      bank_name: bankName || 'HDFC Bank'
    });

    let setup = await UserTradingSetup.findOne({ where: { userId: user.id } });
    if (!setup) {
      setup = await UserTradingSetup.create({ userId: user.id });
    }
    const returnRange = packageType === 'CAPITAL_PROTECT' ? '20% - 30%' : packageType === 'AGGRESSIVE' ? '50% - 70%' : '30% - 60%';
    await setup.update({
      package_type: packageType || 'BALANCED',
      package_return_range: returnRange,
      markets: markets || ['Indian Markets', 'Commodity Markets', 'Crypto Markets']
    });

    res.json({
      message: 'Onboarding step submitted successfully!',
      status: 'APPROVED',
      stepCompleted
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/onboarding/upload-kyc', (req, res) => {
  res.json({
    message: 'KYC Document uploaded and verified successfully!',
    document_url: '/uploads/pan_card_verified.pdf',
    verification_status: 'VERIFIED'
  });
});

// ================= DASHBOARD & ALGO TRADING (MODULE 3 & 4) =================

app.get('/api/dashboard/summary', async (req, res) => {
  try {
    const user = await User.findOne({ where: { account_id: '458921' } });
    const setup = await UserTradingSetup.findOne({ where: { userId: user.id } });
    const tickers = await MarketInstrument.findAll({ limit: 4 });
    const positions = await Position.findAll({ where: { userId: user.id, is_open: true } });

    res.json({
      user: { full_name: user.full_name, account_id: user.account_id },
      trading_setup: setup,
      tickers,
      open_positions_count: positions.length,
      positions
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/algo/toggle', async (req, res) => {
  try {
    const { enabled } = req.body;
    const user = await User.findOne({ where: { account_id: '458921' } });
    const setup = await UserTradingSetup.findOne({ where: { userId: user.id } });
    setup.algo_enabled = enabled;
    await setup.save();
    res.json({ algo_enabled: setup.algo_enabled, message: `Algo Trading is now ${enabled ? 'ACTIVE' : 'DISABLED'}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Detailed Algo Performance Analytics (Page 20 Requirement)
app.get('/api/algo/performance', async (req, res) => {
  try {
    const user = await User.findOne({ where: { account_id: '458921' } });
    const setup = await UserTradingSetup.findOne({ where: { userId: user.id } });
    const positions = await Position.findAll({ where: { userId: user.id } });

    const totalTrades = 28;
    const winningTrades = 21;
    const losingTrades = 7;
    const winRate = ((winningTrades / totalTrades) * 100).toFixed(1);
    const grossPnl = 52340.0;
    const netPnl = 48625.0;
    const roi = 9.73;

    res.json({
      strategy_name: setup.package_type || 'BALANCED',
      target_return: setup.package_return_range || '30% - 60%',
      algo_enabled: setup.algo_enabled,
      algo_investment: setup.total_investment,
      total_trades: totalTrades,
      winning_trades: winningTrades,
      losing_trades: losingTrades,
      win_rate: parseFloat(winRate),
      gross_pnl: grossPnl,
      net_pnl: netPnl,
      roi_percent: roi,
      best_day: { date: '5 Sep 2026', pnl: 14320.0 },
      worst_day: { date: '3 Sep 2026', pnl: -5860.0 },
      chart_data: [
        { date: '1 Sep', gross: 4200, net: 3950, cumulative: 3950 },
        { date: '2 Sep', gross: 8600, net: 8100, cumulative: 12050 },
        { date: '3 Sep', gross: -5860, net: -6100, cumulative: 5950 },
        { date: '4 Sep', gross: 11200, net: 10400, cumulative: 16350 },
        { date: '5 Sep', gross: 14320, net: 13500, cumulative: 29850 },
        { date: '8 Sep', gross: 9800, net: 9100, cumulative: 38950 },
        { date: '9 Sep', gross: 10080, net: 9675, cumulative: 48625 }
      ],
      positions
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= MARKETS WATCHLIST (MODULE 5) =================

app.get('/api/markets/all', async (req, res) => {
  try {
    const markets = await MarketInstrument.findAll();
    res.json(markets);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= P&L & ALGO PERFORMANCE REPORTS (MODULE 6) =================

app.get('/api/pnl/summary', async (req, res) => {
  try {
    const user = await User.findOne({ where: { account_id: '458921' } });
    const setup = await UserTradingSetup.findOne({ where: { userId: user.id } });
    const positions = await Position.findAll({ where: { userId: user.id } });

    res.json({
      total_investment: setup.total_investment,
      current_value: setup.current_value,
      overall_pnl: setup.current_value - setup.total_investment,
      overall_pnl_percent: (((setup.current_value - setup.total_investment) / setup.total_investment) * 100).toFixed(2),
      realized_pnl: setup.realized_pnl,
      unrealized_pnl: setup.unrealized_pnl,
      total_trades: 28,
      winning_trades: 21,
      losing_trades: 7,
      win_rate: '75.0%',
      positions
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= REFERRAL PROGRAM (MODULE 7) =================

app.get('/api/referrals/stats', async (req, res) => {
  try {
    const user = await User.findOne({ where: { account_id: '458921' } });
    const referrals = await ReferralRecord.findAll({ where: { userId: user.id } });
    const totalEarnings = referrals.reduce((sum, r) => sum + r.earned_amount, 0);

    res.json({
      referral_code: user.referral_code,
      total_referrals: referrals.length,
      total_earnings: totalEarnings,
      available_to_withdraw: 8750.0,
      pending_settlement: 3700.0,
      referrals
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= FUNDS & WITHDRAWALS (MODULE 8) =================

app.get('/api/funds/balance', async (req, res) => {
  try {
    const user = await User.findOne({ where: { account_id: '458921' } });
    const bankAccounts = await BankAccount.findAll({ where: { userId: user.id } });
    const transactions = await Transaction.findAll({ where: { userId: user.id }, order: [['createdAt', 'DESC']] });

    res.json({
      available_balance: 124850.0,
      withdrawable_amount: 120000.0,
      in_trades: 4850.0,
      bank_accounts: bankAccounts,
      transactions
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/funds/withdraw', async (req, res) => {
  try {
    const { amount, bank_account_id, pin } = req.body;
    const user = await User.findOne({ where: { account_id: '458921' } });

    if (pin && !(await bcrypt.compare(pin, user.pin_hash))) {
      return res.status(401).json({ error: 'Invalid 6-digit transaction PIN' });
    }

    const txnId = 'TRW' + Math.floor(10000000 + Math.random() * 90000000);
    const txn = await Transaction.create({
      userId: user.id,
      txn_id: txnId,
      type: 'WITHDRAWAL',
      amount: parseFloat(amount),
      bank_name: 'HDFC Bank',
      account_masked: '**** 4567',
      ifsc_code: 'HDFC0001234',
      status: 'Processing',
      expected_time: 'Within 1-4 hours'
    });

    res.json({ message: 'Withdrawal request submitted successfully', transaction: txn });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= RESEARCH & NEWS (MODULE 9) =================

app.get('/api/research/data', async (req, res) => {
  try {
    const calls = await ResearchCall.findAll({ where: { is_active: true } });
    const news = await ResearchNews.findAll({ order: [['createdAt', 'DESC']] });
    res.json({ calls, news });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ================= NOTIFICATIONS & SUPPORT (MODULE 10 & 11) =================

app.get('/api/notifications', async (req, res) => {
  try {
    const user = await User.findOne({ where: { account_id: '458921' } });
    const notifications = await Notification.findAll({ where: { userId: user.id }, order: [['createdAt', 'DESC']] });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Init DB & Seed
async function startServer() {
  try {
    await sequelize.sync();
    console.log('[Express] PostgreSQL Database synced successfully.');
  } catch (err) {
    console.log('[Database Notice] Could not connect to PostgreSQL. PostgreSQL service can be started with `npm run pg:start`.');
    console.log('[Express] Server starting with fallback local SQLite database...');
  }

  try {
    const userCount = await User.count().catch(() => 0);
    if (userCount === 0) {
      await seedDatabase().catch(() => {});
    }
  } catch (e) {}

  app.listen(PORT, () => {
    console.log(`[Express API Server] Running on http://localhost:${PORT}`);
  });
}

startServer();

