import React, { useState, useEffect } from 'react';
import { Cpu, PlusCircle, ArrowUpRight, ArrowDownLeft, FileText, ChevronRight, TrendingUp, ShieldCheck } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ onNavigate }) {
  const [algoActive, setAlgoActive] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);

  useEffect(() => {
    fetch('/api/dashboard/summary')
      .then(res => res.json())
      .then(data => setDashboardData(data))
      .catch(() => {
        setDashboardData({
          trading_setup: { package_type: 'BALANCED', package_return_range: '30% - 60%', total_investment: 500000, current_value: 538750 },
          open_positions_count: 5,
          positions: [
            { id: 1, symbol: 'NIFTY 12 SEP 25000 CE', exchange: 'NFO', quantity: 50, avg_price: 102.50, ltp: 128.30, pnl_amount: 12900.0, pnl_percent: 25.17 },
            { id: 2, symbol: 'BANKNIFTY 12 SEP 51300 PE', exchange: 'NFO', quantity: 25, avg_price: 215.00, ltp: 198.40, pnl_amount: -4150.0, pnl_percent: -7.72 },
            { id: 3, symbol: 'RELIANCE', exchange: 'NSE', quantity: 100, avg_price: 2856.00, ltp: 2914.75, pnl_amount: 5875.0, pnl_percent: 2.06 },
            { id: 4, symbol: 'GOLD OCT FUT', exchange: 'MCX', quantity: 10, avg_price: 72450.0, ltp: 72612.0, pnl_amount: 1620.0, pnl_percent: 0.22 },
            { id: 5, symbol: 'BTC/USDT', exchange: 'CRYPTO', quantity: 1, avg_price: 58210.0, ltp: 58450.0, pnl_amount: 620.0, pnl_percent: 0.41 }
          ]
        });
      });
  }, []);

  const chartData = [
    { time: '09:15', pnl: 0 },
    { time: '10:00', pnl: 8500 },
    { time: '11:00', pnl: 14200 },
    { time: '12:00', pnl: 11800 },
    { time: '13:00', pnl: 22400 },
    { time: '14:00', pnl: 31000 },
    { time: '15:00', pnl: 38750 }
  ];

  const handleToggleAlgo = async () => {
    const nextState = !algoActive;
    setAlgoActive(nextState);
    try {
      await fetch('/api/algo/toggle', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enabled: nextState })
      });
    } catch (e) {}
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', paddingBottom: '80px' }}>
      
      {/* Algo Master Control Card (Pages 15, 19) */}
      <div className="algo-card" style={{ marginBottom: '16px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={24} color="#D4AF37" />
            <h3 style={{ fontSize: '18px', fontWeight: '800' }}>Algo Trading</h3>
          </div>
          <p style={{ fontSize: '12px', color: '#93C5FD', marginTop: '4px' }}>
            {algoActive ? 'Executing trades as per your strategy' : 'Trading Completed for Today'}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: algoActive ? '#10B981' : '#EF4444' }}></span>
            <span style={{ fontSize: '11px', fontWeight: '700', color: algoActive ? '#10B981' : '#FCA5A5' }}>
              {algoActive ? 'Algo Trading is Active' : 'Session Closed'}
            </span>
          </div>
        </div>
        <label className="toggle-switch">
          <input type="checkbox" checked={algoActive} onChange={handleToggleAlgo} />
          <span className="slider"></span>
        </label>
      </div>

      {/* Portfolio Performance Summary (Page 15) */}
      <div className="card-panel">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Total Investment</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>₹ 5,00,000</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Current Value</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>₹ 5,38,750</div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Overall P&L</div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#10B981', marginTop: '2px' }}>
              + ₹ 38,750
            </div>
            <div style={{ fontSize: '10px', fontWeight: '700', color: '#10B981' }}>(+7.75%)</div>
          </div>
        </div>

        {/* Live Sparkline Area Chart */}
        <div style={{ width: '100%', height: 90, marginTop: '10px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="pnlGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="pnl" stroke="#10B981" strokeWidth={2} fillOpacity={1} fill="url(#pnlGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Package Banner (Page 15) */}
      <div className="card-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>Your Trading Package</div>
          <div style={{ fontSize: '14px', fontWeight: '800', color: '#003366', marginTop: '2px' }}>
            BALANCED (30% - 60% per month)
          </div>
        </div>
        <button 
          onClick={() => onNavigate('onboarding')}
          style={{ background: 'none', border: 'none', color: '#0047AB', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '2px' }}
        >
          <span>Change Package</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Quick Action Grid (Page 15) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '16px' }}>
        <button onClick={() => onNavigate('funds')} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <PlusCircle size={22} color="#0047AB" />
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#0F172A' }}>Add Funds</span>
        </button>

        <button onClick={() => onNavigate('funds')} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <ArrowDownLeft size={22} color="#0047AB" />
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#0F172A' }}>Withdraw</span>
        </button>

        <button onClick={() => onNavigate('security')} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <ShieldCheck size={22} color="#0047AB" />
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#0F172A' }}>Account</span>
        </button>

        <button onClick={() => onNavigate('pnl')} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer' }}>
          <FileText size={22} color="#0047AB" />
          <span style={{ fontSize: '10px', fontWeight: '700', color: '#0F172A' }}>Reports</span>
        </button>
      </div>

      {/* Live Open Positions List (Page 19) */}
      <div className="card-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <div style={{ fontSize: '14px', fontWeight: '800', color: '#003366' }}>
            Active Positions ({dashboardData?.positions?.length || 5})
          </div>
          <button onClick={() => onNavigate('pnl')} style={{ background: 'none', border: 'none', color: '#0047AB', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
            View P&L Report ›
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {dashboardData?.positions?.map((pos) => (
            <div key={pos.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{pos.symbol}</div>
                <div style={{ fontSize: '11px', color: '#64748B' }}>Qty: {pos.quantity} • Avg: ₹{pos.avg_price} • LTP: ₹{pos.ltp}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '13px', fontWeight: '800', color: pos.pnl_amount >= 0 ? '#10B981' : '#EF4444' }}>
                  {pos.pnl_amount >= 0 ? '+' : ''}₹{pos.pnl_amount.toLocaleString()}
                </div>
                <div style={{ fontSize: '10px', fontWeight: '700', color: pos.pnl_percent >= 0 ? '#10B981' : '#EF4444' }}>
                  ({pos.pnl_percent >= 0 ? '+' : ''}{pos.pnl_percent}%)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
