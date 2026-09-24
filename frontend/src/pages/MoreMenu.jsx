import React from 'react';
import { Gift, LineChart, ShieldCheck, UserCheck, HelpCircle, Bell, LogOut, ChevronRight, Cpu, ShieldAlert } from 'lucide-react';

export default function MoreMenu({ onNavigate, user = { full_name: 'Sachin Tendulkar', account_id: '458921' } }) {
  const menuItems = [
    { id: 'referrals', title: 'Refer & Earn (5% Profit Share)', sub: 'Earn 5% of referee profit per trade for 2 years', icon: Gift, color: '#D4AF37' },
    { id: 'research', title: 'Research & Advisory Signals', sub: 'Expert buy/sell recommendations & news feed', icon: LineChart, color: '#0047AB' },
    { id: 'pnl', title: 'P&L Reports & Analytics', sub: 'Institutional performance statements & trade log', icon: Cpu, color: '#10B981' },
    { id: 'security', title: 'Account Security Settings', sub: 'PIN, Biometrics, Audit log & Trusted devices', icon: ShieldCheck, color: '#003366' },
    { id: 'onboarding', title: 'Trading Package & Markets', sub: 'Modify package risk profile & market selections', icon: UserCheck, color: '#6366F1' },
    { id: 'support', title: 'Help & 24x7 Live Chat Support', sub: 'Instant assistant, tickets & toll-free support', icon: HelpCircle, color: '#0047AB' },
    { id: 'notifications', title: 'Notifications Center', sub: 'Real-time order execution & funds alerts', icon: Bell, color: '#EF4444' },
    { id: 'admin', title: 'Admin Master Control Panel', sub: 'Risk management, emergency kill switch & KYC directory', icon: ShieldAlert, color: '#D4AF37' }
  ];

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', paddingBottom: '80px' }}>
      
      {/* Profile Header Card */}
      <div className="card-panel" style={{ background: 'linear-gradient(135deg, #001F3F 0%, #003366 100%)', color: '#FFFFFF', padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#D4AF37', color: '#003366', fontWeight: '800', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            ST
          </div>
          <div>
            <div style={{ fontSize: '16px', fontWeight: '800' }}>{user.full_name}</div>
            <div style={{ fontSize: '11px', color: '#93C5FD' }}>Account ID: {user.account_id} • KYC Verified</div>
          </div>
        </div>
        <span className="badge badge-green" style={{ fontSize: '10px' }}>ACTIVE</span>
      </div>

      {/* Menu Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="card-panel"
              style={{
                margin: 0,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                justify: 'space-between',
                cursor: 'pointer'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: 36, height: 36, borderRadius: '10px', background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon size={20} color={item.color} />
                </div>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>{item.title}</div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{item.sub}</div>
                </div>
              </div>
              <ChevronRight size={18} color="#94A3B8" />
            </div>
          );
        })}
      </div>

      {/* Logout / Switch Account Button */}
      <button 
        onClick={() => onNavigate('login')}
        style={{
          width: '100%',
          padding: '12px',
          borderRadius: '10px',
          border: '1px solid #FCA5A5',
          background: '#FEF2F2',
          color: '#EF4444',
          fontSize: '13px',
          fontWeight: '800',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px',
          cursor: 'pointer'
        }}
      >
        <LogOut size={16} />
        <span>Switch Account / Sign Out</span>
      </button>

    </div>
  );
}
