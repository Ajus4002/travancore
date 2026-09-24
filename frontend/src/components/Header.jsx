import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Bell, User, ChevronDown } from 'lucide-react';

export default function Header({ user = { full_name: 'Sachin Tendulkar', account_id: '458921' }, onNavChange }) {
  const [tickers, setTickers] = useState({
    nifty: { ltp: 25017.35, change: 162.40, pct: 0.65 },
    sensex: { ltp: 81697.76, change: 520.90, pct: 0.64 },
    banknifty: { ltp: 51328.45, change: 310.25, pct: 0.61 }
  });

  useEffect(() => {
    let eventSource;
    try {
      eventSource = new EventSource('/api/stream/market-ticks');
      eventSource.onmessage = (event) => {
        const data = JSON.parse(event.data);
        const n = data.find(t => t.symbol === 'NIFTY 50');
        const s = data.find(t => t.symbol === 'SENSEX');
        const b = data.find(t => t.symbol === 'BANK NIFTY');

        setTickers(prev => ({
          nifty: n ? { ltp: n.ltp, change: n.change_amount, pct: n.change_percent } : prev.nifty,
          sensex: s ? { ltp: s.ltp, change: s.change_amount, pct: s.change_percent } : prev.sensex,
          banknifty: b ? { ltp: b.ltp, change: b.change_amount, pct: b.change_percent } : prev.banknifty
        }));
      };
    } catch (e) {}

    // Interval fallback simulation if SSE offline
    const interval = setInterval(() => {
      setTickers(prev => ({
        nifty: { ...prev.nifty, ltp: parseFloat((prev.nifty.ltp + (Math.random() * 4 - 2)).toFixed(2)) },
        sensex: { ...prev.sensex, ltp: parseFloat((prev.sensex.ltp + (Math.random() * 8 - 4)).toFixed(2)) },
        banknifty: { ...prev.banknifty, ltp: parseFloat((prev.banknifty.ltp + (Math.random() * 6 - 3)).toFixed(2)) }
      }));
    }, 2500);

    return () => {
      if (eventSource) eventSource.close();
      clearInterval(interval);
    };
  }, []);

  return (
    <header style={{
      background: 'linear-gradient(180deg, #002B55 0%, #003366 100%)',
      color: '#FFFFFF',
      padding: '10px 16px',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Logo size="small" light={true} />

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Notification Bell Icon */}
          <button 
            onClick={() => onNavChange('notifications')}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: 'none',
              borderRadius: '50%',
              width: 36,
              height: 36,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              cursor: 'pointer',
              position: 'relative'
            }}
          >
            <Bell size={18} />
            <span style={{
              position: 'absolute',
              top: 4,
              right: 4,
              background: '#EF4444',
              color: '#FFFFFF',
              borderRadius: '50%',
              width: 14,
              height: 14,
              fontSize: '9px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              5
            </span>
          </button>

          {/* User Profile Switcher (Page 15) */}
          <button 
            onClick={() => onNavChange('security')}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(212,175,55,0.4)',
              borderRadius: '20px',
              padding: '4px 10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: '#FFFFFF',
              cursor: 'pointer'
            }}
          >
            <div style={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              background: '#D4AF37',
              color: '#003366',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '800',
              fontSize: '11px'
            }}>
              ST
            </div>
            <div style={{ textAlign: 'left', display: 'none', minWidth: 80 }}>
              <div style={{ fontSize: '11px', fontWeight: '700' }}>{user.full_name}</div>
              <div style={{ fontSize: '9px', color: '#D4AF37' }}>{user.account_id}</div>
            </div>
            <ChevronDown size={14} color="#D4AF37" />
          </button>
        </div>
      </div>

      {/* Live Market Index Ticker Strip (Page 15) */}
      <div style={{
        marginTop: '10px',
        paddingTop: '8px',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        overflowX: 'auto',
        fontSize: '11px',
        scrollbarWidth: 'none'
      }}>
        <div style={{ flexShrink: 0 }}>
          <span style={{ color: '#94A3B8' }}>NIFTY 50: </span>
          <span style={{ fontWeight: '700', color: '#FFFFFF' }}>{tickers.nifty.ltp.toLocaleString()} </span>
          <span style={{ color: tickers.nifty.change >= 0 ? '#10B981' : '#EF4444', fontWeight: '700' }}>
            {tickers.nifty.change >= 0 ? '▲ +' : '▼ '}{tickers.nifty.change} ({tickers.nifty.pct >= 0 ? '+' : ''}{tickers.nifty.pct}%)
          </span>
        </div>
        <div style={{ flexShrink: 0 }}>
          <span style={{ color: '#94A3B8' }}>SENSEX: </span>
          <span style={{ fontWeight: '700', color: '#FFFFFF' }}>{tickers.sensex.ltp.toLocaleString()} </span>
          <span style={{ color: tickers.sensex.change >= 0 ? '#10B981' : '#EF4444', fontWeight: '700' }}>
            {tickers.sensex.change >= 0 ? '▲ +' : '▼ '}{tickers.sensex.change} ({tickers.sensex.pct >= 0 ? '+' : ''}{tickers.sensex.pct}%)
          </span>
        </div>
        <div style={{ flexShrink: 0 }}>
          <span style={{ color: '#94A3B8' }}>BANK NIFTY: </span>
          <span style={{ fontWeight: '700', color: '#FFFFFF' }}>{tickers.banknifty.ltp.toLocaleString()} </span>
          <span style={{ color: tickers.banknifty.change >= 0 ? '#10B981' : '#EF4444', fontWeight: '700' }}>
            {tickers.banknifty.change >= 0 ? '▲ +' : '▼ '}{tickers.banknifty.change} ({tickers.banknifty.pct >= 0 ? '+' : ''}{tickers.banknifty.pct}%)
          </span>
        </div>
        <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center', gap: '4px', background: 'rgba(16,185,129,0.2)', padding: '2px 8px', borderRadius: '12px' }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#10B981' }}></span>
          <span style={{ color: '#10B981', fontWeight: '700', fontSize: '10px' }}>Market Live Stream</span>
        </div>
      </div>
    </header>
  );
}
