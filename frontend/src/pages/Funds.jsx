import React, { useState } from 'react';
import { Wallet, PlusCircle, ArrowDownLeft, Building2, ShieldCheck, CheckCircle2, Clock, Lock, AlertCircle } from 'lucide-react';

export default function Funds({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('WITHDRAW'); // 'WITHDRAW' or 'DEPOSIT'
  const [withdrawalAmount, setWithdrawalAmount] = useState('10000');
  const [selectedBank, setSelectedBank] = useState('HDFC');
  const [authModal, setAuthModal] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [txnSuccess, setTxnSuccess] = useState(null);
  const [trackerTab, setTrackerTab] = useState('ALL');

  const registeredBanks = [
    { id: 'HDFC', name: 'HDFC Bank', masked: '**** 4567', full: '91801004567', ifsc: 'HDFC0001234', primary: true },
    { id: 'ICICI', name: 'ICICI Bank', masked: '**** 8901', full: '000401588901', ifsc: 'ICIC0000004', primary: false }
  ];

  const initialTransactions = [
    { id: 'TRW12345678', type: 'WITHDRAWAL', amount: 10000, bank: 'HDFC Bank (**** 4567)', status: 'Processing', time: '1-4 hours', date: '12 Sep 2026, 10:15 AM' },
    { id: 'TRW98765432', type: 'WITHDRAWAL', amount: 25000, bank: 'HDFC Bank (**** 4567)', status: 'Completed', time: 'Instant', date: '05 Sep 2026, 02:30 PM' },
    { id: 'TRD45678912', type: 'DEPOSIT', amount: 50000, bank: 'UPI / NetBanking', status: 'Completed', time: 'Instant', date: '01 Sep 2026, 09:00 AM' }
  ];

  const [transactions, setTransactions] = useState(initialTransactions);

  const quickChips = [5000, 10000, 25000, 50000, 100000];

  const handleStartWithdrawal = (e) => {
    e.preventDefault();
    if (!withdrawalAmount || parseFloat(withdrawalAmount) <= 0) return;
    if (parseFloat(withdrawalAmount) > 120000) {
      alert('Withdrawal amount exceeds withdrawable balance of ₹ 1,20,000');
      return;
    }
    setPinInput('');
    setPinError('');
    setAuthModal(true);
  };

  const handleConfirmPIN = (e) => {
    e.preventDefault();
    if (pinInput.length !== 6) {
      setPinError('Please enter a valid 6-digit transaction PIN');
      return;
    }

    const newTxn = {
      id: 'TRW' + Math.floor(10000000 + Math.random() * 90000000),
      type: 'WITHDRAWAL',
      amount: parseFloat(withdrawalAmount),
      bank: selectedBank === 'HDFC' ? 'HDFC Bank (**** 4567)' : 'ICICI Bank (**** 8901)',
      status: 'Processing',
      time: '1-4 hours',
      date: new Date().toLocaleString()
    };

    setTxnSuccess(newTxn);
    setTransactions([newTxn, ...transactions]);

    setTimeout(() => {
      setAuthModal(false);
      setTxnSuccess(null);
    }, 2200);
  };

  const filteredTxns = transactions.filter((t) => {
    if (trackerTab === 'ALL') return true;
    return t.status.toUpperCase() === trackerTab;
  });

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', paddingBottom: '80px' }}>
      
      {/* Wallet Balances Strip (Page 23) */}
      <div className="card-panel" style={{ background: 'linear-gradient(135deg, #001F3F 0%, #003366 100%)', color: '#FFFFFF', padding: '20px' }}>
        <div style={{ fontSize: '11px', color: '#93C5FD', fontWeight: '700' }}>TOTAL WALLET BALANCE</div>
        <div style={{ fontSize: '26px', fontWeight: '800', marginTop: '4px' }}>₹ 1,24,850.00</div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginTop: '16px', paddingTop: '14px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#94A3B8' }}>WITHDRAWABLE AMOUNT</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#10B981', marginTop: '2px' }}>₹ 1,20,000.00</div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#94A3B8' }}>AMOUNT IN TRADES</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#D4AF37', marginTop: '2px' }}>₹ 4,850.00</div>
          </div>
        </div>
      </div>

      {/* Switcher Tabs */}
      <div style={{ display: 'flex', background: '#E2E8F0', borderRadius: '10px', padding: '4px', marginBottom: '16px' }}>
        <button 
          onClick={() => setActiveTab('WITHDRAW')}
          style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', background: activeTab === 'WITHDRAW' ? '#FFFFFF' : 'transparent', color: activeTab === 'WITHDRAW' ? '#003366' : '#64748B' }}
        >
          Withdraw Funds
        </button>
        <button 
          onClick={() => setActiveTab('DEPOSIT')}
          style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', background: activeTab === 'DEPOSIT' ? '#FFFFFF' : 'transparent', color: activeTab === 'DEPOSIT' ? '#003366' : '#64748B' }}
        >
          Add Funds (Deposit)
        </button>
      </div>

      {activeTab === 'WITHDRAW' ? (
        <div className="card-panel" style={{ marginBottom: '20px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#003366', marginBottom: '14px' }}>
            Step 1: Enter Withdrawal Amount
          </h3>

          {/* Amount Input */}
          <div style={{ position: 'relative', marginBottom: '12px' }}>
            <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px', fontWeight: '800', color: '#475569' }}>₹</span>
            <input 
              type="number"
              value={withdrawalAmount}
              onChange={(e) => setWithdrawalAmount(e.target.value)}
              placeholder="Enter amount in INR"
              style={{ width: '100%', padding: '12px 14px 12px 34px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '18px', fontWeight: '800', color: '#0F172A', outline: 'none' }}
            />
          </div>

          {/* Quick Select Chips */}
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '18px' }}>
            {quickChips.map((chip) => (
              <button
                key={chip}
                onClick={() => setWithdrawalAmount(chip.toString())}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: '1px solid #CBD5E1',
                  background: withdrawalAmount === chip.toString() ? '#EFF6FF' : '#F8FAFC',
                  color: withdrawalAmount === chip.toString() ? '#0047AB' : '#475569',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                + ₹{chip.toLocaleString()}
              </button>
            ))}
          </div>

          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#003366', marginBottom: '12px' }}>
            Step 2: Select Bank Account
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
            {registeredBanks.map((b) => (
              <div
                key={b.id}
                onClick={() => setSelectedBank(b.id)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  border: selectedBank === b.id ? '2px solid #0047AB' : '1px solid #E2E8F0',
                  background: selectedBank === b.id ? '#F0F7FF' : '#FFFFFF',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Building2 size={20} color="#0047AB" />
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: '#0F172A' }}>
                      {b.name} ({b.masked})
                    </div>
                    <div style={{ fontSize: '11px', color: '#64748B' }}>IFSC: {b.ifsc}</div>
                  </div>
                </div>

                {b.primary && <span className="badge badge-gold">Primary</span>}
              </div>
            ))}
          </div>

          <button 
            onClick={handleStartWithdrawal}
            style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: '#0047AB', color: '#FFFFFF', fontSize: '15px', fontWeight: '800', cursor: 'pointer' }}
          >
            PROCEED WITHDRAWAL
          </button>
        </div>
      ) : (
        <div className="card-panel" style={{ marginBottom: '20px', textAlign: 'center', padding: '30px 20px' }}>
          <PlusCircle size={40} color="#0047AB" style={{ margin: '0 auto 12px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>Instant Add Funds</h3>
          <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px', marginBottom: '16px' }}>
            Deposit funds using UPI (GPay, PhonePe, Paytm) or Instant Net Banking without any transaction charges.
          </p>
          <button 
            onClick={() => alert('Redirecting to secure instant UPI payment gateway...')}
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: '#10B981', color: '#FFFFFF', fontSize: '14px', fontWeight: '800', cursor: 'pointer' }}
          >
            Deposit via UPI / NetBanking
          </button>
        </div>
      )}

      {/* Status Tracker (Page 23) */}
      <div className="card-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '14px', fontWeight: '800', color: '#003366' }}>Transaction Status Tracker</div>
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
          {['ALL', 'PROCESSING', 'COMPLETED'].map((st) => (
            <button
              key={st}
              onClick={() => setTrackerTab(st)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: 'none',
                fontSize: '10px',
                fontWeight: '800',
                cursor: 'pointer',
                background: trackerTab === st ? '#003366' : '#F1F5F9',
                color: trackerTab === st ? '#FFFFFF' : '#64748B'
              }}
            >
              {st}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filteredTxns.map((tx) => (
            <div key={tx.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '12px', fontWeight: '800', color: '#0F172A' }}>{tx.id}</span>
                  <span className={`badge ${tx.status === 'Completed' ? 'badge-green' : 'badge-gold'}`} style={{ fontSize: '9px' }}>
                    {tx.status}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  {tx.bank} • {tx.date}
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: tx.type === 'WITHDRAWAL' ? '#0F172A' : '#10B981' }}>
                  ₹{tx.amount.toLocaleString()}
                </div>
                <div style={{ fontSize: '10px', color: '#64748B' }}>Est: {tx.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step 3: Security Authorization Modal (Page 23) */}
      {authModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '400px', borderRadius: '16px', padding: '20px' }}>
            
            {txnSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 10px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>Withdrawal Submitted!</h3>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  Request ID: <strong>{txnSuccess.id}</strong><br />
                  Amount: ₹ {txnSuccess.amount.toLocaleString()} queued for credit within 1-4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleConfirmPIN}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Lock size={20} color="#003366" />
                  <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#003366' }}>Authorize Withdrawal</h3>
                </div>

                <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#475569', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>Withdrawal Amount:</span>
                    <strong style={{ color: '#0F172A' }}>₹ {parseFloat(withdrawalAmount).toLocaleString()}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Target Bank:</span>
                    <strong style={{ color: '#0F172A' }}>{selectedBank === 'HDFC' ? 'HDFC Bank' : 'ICICI Bank'}</strong>
                  </div>
                </div>

                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                  Enter 6-Digit Transaction PIN
                </label>
                <input 
                  type="password"
                  maxLength={6}
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value.replace(/\D/g, ''))}
                  placeholder="• • • • • •"
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '20px', fontWeight: '800', textAlign: 'center', letterSpacing: '4px', marginBottom: '8px' }}
                />

                {pinError && <div style={{ fontSize: '11px', color: '#EF4444', fontWeight: '700', marginBottom: '10px' }}>{pinError}</div>}

                <div style={{ display: 'flex', gap: '8px', marginTop: '10px' }}>
                  <button 
                    type="submit"
                    style={{ flex: 1, padding: '12px', background: '#0047AB', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
                  >
                    Confirm & Submit
                  </button>
                  <button 
                    type="button"
                    onClick={() => setAuthModal(false)}
                    style={{ padding: '12px', background: '#E2E8F0', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
