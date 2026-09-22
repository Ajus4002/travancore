import React, { useState } from 'react';
import { Gift, Copy, Share2, Wallet, ArrowRight, CheckCircle2, Users, DollarSign } from 'lucide-react';

export default function Referrals({ onNavigate }) {
  const [copied, setCopied] = useState(false);
  const [actionSuccess, setActionSuccess] = useState('');
  const [modalType, setModalType] = useState(null); // 'WITHDRAW' or 'TRANSFER'

  const referralCode = 'ST1234';
  const referralLink = 'https://travancoretrade.com/ref/ST1234';

  const referralList = [
    { name: 'Anil R', status: 'Active', date: '12 Aug 2024', trades: 156, totalProfit: 86400, earnings: 4320 },
    { name: 'Priya K', status: 'Active', date: '28 Sep 2024', trades: 102, totalProfit: 57000, earnings: 2850 },
    { name: 'Rahul S', status: 'Active', date: '15 Nov 2024', trades: 78, totalProfit: 35600, earnings: 1780 },
    { name: 'Meera T', status: 'Active', date: '04 Jan 2025', trades: 54, totalProfit: 25000, earnings: 1250 },
    { name: 'Vikas M', status: 'Active', date: '18 Feb 2025', trades: 42, totalProfit: 18400, earnings: 920 },
    { name: 'Deepa S', status: 'Pending KYC', date: '10 Mar 2025', trades: 12, totalProfit: 7600, earnings: 380 },
    { name: 'Arjun V', status: 'Active', date: '02 Apr 2025', trades: 28, totalProfit: 11200, earnings: 560 },
    { name: 'Neha P', status: 'Active', date: '22 May 2025', trades: 19, totalProfit: 7800, earnings: 390 }
  ];

  const handleCopyCode = () => {
    navigator.clipboard?.writeText?.(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePayoutSubmit = (type) => {
    setActionSuccess(type);
    setTimeout(() => {
      setActionSuccess('');
      setModalType(null);
    }, 2000);
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', paddingBottom: '80px' }}>
      
      {/* Promo Banner (Page 18) */}
      <div className="card-panel" style={{ background: 'linear-gradient(135deg, #002B55 0%, #0047AB 100%)', color: '#FFFFFF', padding: '20px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
          <Gift size={24} color="#D4AF37" />
          <h2 style={{ fontSize: '18px', fontWeight: '800' }}>Refer & Earn 5% Profit Share</h2>
        </div>
        <p style={{ fontSize: '12px', color: '#93C5FD', lineHeight: '1.5' }}>
          Earn 5% of your friend's profit per trade for up to 2 years. Instant payouts directly to your bank account or wallet.
        </p>

        {/* Unique Referral Code Card */}
        <div style={{ background: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)', borderRadius: '12px', padding: '12px 16px', marginTop: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#D4AF37', fontWeight: '700' }}>YOUR REFERRAL CODE</div>
            <div style={{ fontSize: '18px', fontWeight: '800', letterSpacing: '1px', marginTop: '2px' }}>{referralCode}</div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={handleCopyCode}
              style={{ background: '#FFFFFF', color: '#003366', border: 'none', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
            >
              <Copy size={14} />
              <span>{copied ? 'Copied!' : 'Copy'}</span>
            </button>

            <button 
              onClick={() => alert(`Share referral link: ${referralLink}`)}
              style={{ background: '#D4AF37', color: '#003366', border: 'none', borderRadius: '8px', padding: '8px 12px', fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
            >
              <Share2 size={14} />
              <span>Share</span>
            </button>
          </div>
        </div>
      </div>

      {/* Metrics Overview (Page 18) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div className="card-panel" style={{ margin: 0 }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Total Referral Earnings</div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>₹ 12,450</div>
          <div style={{ fontSize: '10px', color: '#10B981', fontWeight: '700', marginTop: '4px' }}>Lifetime Cumulative</div>
        </div>

        <div className="card-panel" style={{ margin: 0 }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Available to Withdraw</div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#10B981', marginTop: '2px' }}>₹ 8,750</div>
          <div style={{ fontSize: '10px', color: '#64748B', marginTop: '4px' }}>Pending: ₹ 3,700</div>
        </div>
      </div>

      {/* Action Buttons for Payout */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '16px' }}>
        <button 
          onClick={() => setModalType('WITHDRAW')}
          style={{ background: '#0047AB', color: '#FFFFFF', border: 'none', borderRadius: '10px', padding: '12px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
        >
          <Wallet size={16} />
          <span>Withdraw to Bank</span>
        </button>

        <button 
          onClick={() => setModalType('TRANSFER')}
          style={{ background: '#003366', color: '#FFFFFF', border: 'none', borderRadius: '10px', padding: '12px', fontSize: '12px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
        >
          <DollarSign size={16} color="#D4AF37" />
          <span>Add to Master Wallet</span>
        </button>
      </div>

      {/* Referrals List Table */}
      <div className="card-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '14px', fontWeight: '800', color: '#003366' }}>
            Referred Traders ({referralList.length})
          </div>
          <span style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>5% Profit Share</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {referralList.map((ref, idx) => (
            <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{ref.name}</span>
                  <span className={`badge ${ref.status === 'Active' ? 'badge-green' : 'badge-gold'}`} style={{ fontSize: '9px' }}>
                    {ref.status}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  Joined: {ref.date} • {ref.trades} Trades Executed
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', fontWeight: '800', color: '#10B981' }}>
                  +₹{ref.earnings.toLocaleString()}
                </div>
                <div style={{ fontSize: '10px', color: '#64748B' }}>
                  Friend Profit: ₹{ref.totalProfit.toLocaleString()}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payout Action Modal */}
      {modalType && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '400px', borderRadius: '16px', padding: '20px' }}>
            
            {actionSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={44} color="#10B981" style={{ margin: '0 auto 10px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>
                  {actionSuccess === 'WITHDRAW' ? 'Payout Requested' : 'Wallet Credited'}
                </h3>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  ₹ 8,750 has been successfully {actionSuccess === 'WITHDRAW' ? 'queued for bank transfer' : 'transferred to your main trading wallet'}.
                </p>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#003366', marginBottom: '8px' }}>
                  {modalType === 'WITHDRAW' ? 'Withdraw Referral Earnings' : 'Transfer to Master Account Wallet'}
                </h3>
                <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '16px' }}>
                  Available referral balance: <strong>₹ 8,750</strong>
                </p>

                {modalType === 'WITHDRAW' ? (
                  <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#475569', marginBottom: '16px' }}>
                    <div>Payout Bank: <strong>HDFC Bank (**** 4567)</strong></div>
                    <div style={{ marginTop: '4px' }}>Expected Processing: Instant - 2 Hours</div>
                  </div>
                ) : (
                  <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#475569', marginBottom: '16px' }}>
                    <div>Destination: <strong>Master Account Wallet Balance</strong></div>
                    <div style={{ marginTop: '4px' }}>Use balance instantly for algo or manual trading.</div>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={() => handlePayoutSubmit(modalType)}
                    style={{ flex: 1, padding: '12px', background: '#0047AB', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
                  >
                    Confirm Payout
                  </button>
                  <button 
                    onClick={() => setModalType(null)}
                    style={{ padding: '12px', background: '#E2E8F0', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
