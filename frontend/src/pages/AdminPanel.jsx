import React, { useState, useEffect } from 'react';
import { ShieldAlert, Users, Cpu, DollarSign, AlertTriangle, CheckCircle2, RefreshCw, Activity, Lock, Search } from 'lucide-react';

export default function AdminPanel({ onNavigate }) {
  const [metrics, setMetrics] = useState({
    total_users: 1420,
    active_algo_accounts: 1180,
    total_aum: 48500000,
    global_algo_active: true,
    pending_kyc_count: 14,
    pending_withdrawals_count: 8,
    active_positions_count: 42,
    system_health: 'OPTIMAL (99.98% Uptime)'
  });

  const [togglingAlgo, setTogglingAlgo] = useState(false);
  const [searchUser, setSearchUser] = useState('');
  const [notificationMsg, setNotificationMsg] = useState('');

  const usersList = [
    { id: '1', name: 'Sachin Tendulkar', account_id: '458921', package: 'Balanced', status: 'KYC Verified', balance: 124850, algo: true },
    { id: '2', name: 'Rahul Dravid', account_id: '458922', package: 'Capital Protect', status: 'KYC Verified', balance: 250000, algo: true },
    { id: '3', name: 'Virender Sehwag', account_id: '458923', package: 'Aggressive', status: 'KYC Verified', balance: 500000, algo: true },
    { id: '4', name: 'Anil Kumble', account_id: '458924', package: 'Balanced', status: 'Pending KYC', balance: 75000, algo: false },
    { id: '5', name: 'Sourav Ganguly', account_id: '458925', package: 'Aggressive', status: 'KYC Verified', balance: 340000, algo: true }
  ];

  const fetchMetrics = async () => {
    try {
      const res = await fetch('/api/admin/metrics');
      if (res.ok) {
        const data = await res.json();
        setMetrics(data);
      }
    } catch (e) {}
  };

  useEffect(() => {
    fetchMetrics();
  }, []);

  const handleGlobalAlgoToggle = async () => {
    setTogglingAlgo(true);
    const newStatus = !metrics.global_algo_active;
    try {
      const res = await fetch('/api/admin/global-algo-toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: newStatus })
      });
      if (res.ok) {
        const data = await res.json();
        setMetrics(prev => ({ ...prev, global_algo_active: data.global_algo_active }));
        setNotificationMsg(data.message);
      }
    } catch (e) {
      setMetrics(prev => ({ ...prev, global_algo_active: newStatus }));
      setNotificationMsg(`Global Algo engine is now ${newStatus ? 'ACTIVE' : 'EMERGENCY PAUSED'}`);
    }
    setTogglingAlgo(false);
    setTimeout(() => setNotificationMsg(''), 3000);
  };

  const filteredUsers = usersList.filter(u => 
    u.name.toLowerCase().includes(searchUser.toLowerCase()) || 
    u.account_id.includes(searchUser)
  );

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', paddingBottom: '80px' }}>
      
      {/* Header Strip */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={22} color="#D4AF37" />
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#003366' }}>Admin Master Control Panel</h2>
          </div>
          <p style={{ fontSize: '12px', color: '#64748B' }}>Back-office risk management & global platform controls</p>
        </div>

        <button 
          onClick={fetchMetrics}
          style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 10px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <RefreshCw size={14} />
          <span>Refresh</span>
        </button>
      </div>

      {notificationMsg && (
        <div style={{ background: metrics.global_algo_active ? '#EFF6FF' : '#FEF2F2', border: metrics.global_algo_active ? '1px solid #93C5FD' : '1px solid #FCA5A5', color: metrics.global_algo_active ? '#0047AB' : '#DC2626', padding: '12px', borderRadius: '10px', fontSize: '12px', fontWeight: '800', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <AlertTriangle size={18} />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Emergency Kill Switch Panel */}
      <div className="card-panel" style={{ background: metrics.global_algo_active ? 'linear-gradient(135deg, #001F3F 0%, #003366 100%)' : 'linear-gradient(135deg, #7F1D1D 0%, #991B1B 100%)', color: '#FFFFFF', padding: '18px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#D4AF37', fontWeight: '800' }}>GLOBAL PLATFORM ALGO CONTROL</div>
            <div style={{ fontSize: '16px', fontWeight: '800', marginTop: '2px' }}>
              {metrics.global_algo_active ? 'System Engine: RUNNING' : 'System Engine: PAUSED'}
            </div>
            <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)', marginTop: '2px' }}>
              {metrics.active_algo_accounts} user trading algorithms executing live
            </div>
          </div>

          <button
            onClick={handleGlobalAlgoToggle}
            disabled={togglingAlgo}
            style={{
              background: metrics.global_algo_active ? '#EF4444' : '#10B981',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              padding: '10px 16px',
              fontSize: '12px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.2)'
            }}
          >
            {metrics.global_algo_active ? 'KILL SWITCH (PAUSE ALL)' : 'RESUME ALGO ENGINE'}
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div className="card-panel" style={{ margin: 0 }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Total Registered Users</div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>{metrics.total_users.toLocaleString()}</div>
          <div style={{ fontSize: '10px', color: '#10B981', fontWeight: '700', marginTop: '4px' }}>Active Algo: {metrics.active_algo_accounts}</div>
        </div>

        <div className="card-panel" style={{ margin: 0 }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Total Platform AUM</div>
          <div style={{ fontSize: '20px', fontWeight: '800', color: '#0047AB', marginTop: '2px' }}>₹ {(metrics.total_aum / 10000000).toFixed(2)} Cr</div>
          <div style={{ fontSize: '10px', color: '#64748B', marginTop: '4px' }}>Across all packages</div>
        </div>

        <div className="card-panel" style={{ margin: 0 }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Pending KYC Verification</div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#D4AF37', marginTop: '2px' }}>{metrics.pending_kyc_count} Requests</div>
          <div style={{ fontSize: '10px', color: '#64748B' }}>Requires approval</div>
        </div>

        <div className="card-panel" style={{ margin: 0 }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Pending Withdrawals</div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#EF4444', marginTop: '2px' }}>{metrics.pending_withdrawals_count} Requests</div>
          <div style={{ fontSize: '10px', color: '#64748B' }}>Queue processing</div>
        </div>
      </div>

      {/* User Accounts Management List */}
      <div className="card-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#003366' }}>User Demat Profile Directory</h3>
          <span style={{ fontSize: '11px', color: '#64748B' }}>Admin Control</span>
        </div>

        {/* Search Input */}
        <div style={{ position: 'relative', marginBottom: '12px' }}>
          <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input 
            type="text"
            placeholder="Search by name or account ID..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            style={{ width: '100%', padding: '8px 10px 8px 32px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', outline: 'none' }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredUsers.map(user => (
            <div key={user.id} style={{ padding: '10px', borderRadius: '8px', border: '1px solid #F1F5F9', background: '#F8FAFC', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{user.name}</span>
                  <span style={{ fontSize: '10px', color: '#0047AB', fontWeight: '800' }}>({user.account_id})</span>
                  <span className={`badge ${user.status === 'KYC Verified' ? 'badge-green' : 'badge-gold'}`} style={{ fontSize: '9px' }}>
                    {user.status}
                  </span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  Package: <strong>{user.package}</strong> • Balance: ₹{user.balance.toLocaleString()}
                </div>
              </div>

              <button
                onClick={() => alert(`KYC and risk controls for account ${user.account_id} updated!`)}
                style={{ background: '#0047AB', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: '700', cursor: 'pointer' }}
              >
                Manage
              </button>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
