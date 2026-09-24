/**
 * Travancore Research & Investments Ltd.
 * Comprehensive E2E Automated Integration Test Suite (Module 15)
 */

const http = require('http');
const { spawn } = require('child_process');

console.log('====================================================');
console.log('TRAVANCORE PLATFORM — E2E INTEGRATION TEST SUITE');
console.log('====================================================\n');

const endpoints = [
  { path: '/api/onboarding/status', method: 'GET', desc: '7-Step Onboarding Status API' },
  { path: '/api/dashboard/summary', method: 'GET', desc: 'Demat Dashboard & Algo Summary API' },
  { path: '/api/algo/performance', method: 'GET', desc: 'Detailed Algo Analytics API' },
  { path: '/api/markets/all', method: 'GET', desc: 'Live Markets Watchlist API' },
  { path: '/api/pnl/summary', method: 'GET', desc: 'P&L Financial Summary API' },
  { path: '/api/referrals/stats', method: 'GET', desc: '5% Profit Sharing Referral API' },
  { path: '/api/funds/balance', method: 'GET', desc: 'Funds & Withdrawal Balance API' },
  { path: '/api/research/data', method: 'GET', desc: 'Research Desk & Advisory Signals API' },
  { path: '/api/notifications', method: 'GET', desc: 'Notifications Center API' }
];

const serverProcess = spawn('node', ['backend/src/server.js']);
let testsPassed = 0;
let testsFailed = 0;

serverProcess.stdout.on('data', (data) => {
  const output = data.toString();
  if (output.includes('Running on http://localhost:5000') || output.includes('synced successfully')) {
    console.log('[Server Started] Running automated integration suite...\n');

    let completed = 0;
    endpoints.forEach((ep) => {
      const req = http.get(`http://localhost:5000${ep.path}`, (res) => {
        if (res.statusCode === 200) {
          console.log(`[PASS] ${ep.desc} (${ep.path}) -> Status ${res.statusCode}`);
          testsPassed++;
        } else {
          console.log(`[FAIL] ${ep.desc} (${ep.path}) -> Status ${res.statusCode}`);
          testsFailed++;
        }
        completed++;

        if (completed === endpoints.length) {
          console.log('\n====================================================');
          console.log(`RESULTS: ${testsPassed} PASSED | ${testsFailed} FAILED out of ${endpoints.length} TESTS`);
          console.log('====================================================');
          serverProcess.kill();
          process.exit(testsFailed === 0 ? 0 : 1);
        }
      });

      req.on('error', (err) => {
        console.log(`[FAIL] ${ep.desc} (${ep.path}) -> Error: ${err.message}`);
        testsFailed++;
        completed++;
        if (completed === endpoints.length) {
          serverProcess.kill();
          process.exit(1);
        }
      });
    });
  }
});

serverProcess.stderr.on('data', (d) => {
  // Ignore minor DB fallback notices
});
