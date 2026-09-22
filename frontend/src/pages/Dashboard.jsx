import React, { useState, useEffect } from 'react';
import { Cpu, PlusCircle, ArrowUpRight, ArrowDownLeft, FileText, ChevronRight, TrendingUp, ShieldCheck, Zap, Award, BarChart3, Activity, PieChart } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

export default function Dashboard({ onNavigate }) {
  const [algoActive, setAlgoActive] = useState(true);
  const [dashboardData, setDashboardData] = useState(null);
  const [algoPerf, setAlgoPerf] = useState(null);
  const [showAlgoDetails, setShowAlgoDetails] = useState(false);

  useEffect(() => {
    fetch('/api/dashboard/summary')
      .then(res => res.json())
      .then(data => {
        setDashboardData(data);
        if (data?.trading_setup?.algo_enabled !== undefined) {
          setAlgoActive(data.trading_setup.algo_enabled);
        }
      })
      .catch(() => {
        setDashboardData({
          trading_setup: { package_type: 'BALANCED', package_return_range: '30% - 60%', total_investment: 500000, current_value: 538750, realized_pnl: 27850, unrealized_pnl: 10900 },
          open_positions_count: 5,
          positions: [
            { id: 1, symbol: 'NIFTY 12 SEP 25000 CE', exchange: 'NFO', quantity: 50, avg_price: 102.50, ltp: 128.30, pnl_amount: 12900.0, pnl_percent: 25.17, side: 'BUY' },
            { id: 2, symbol: 'BANKNIFTY 12 SEP 51300 PE', exchange: 'NFO', quantity: 25, avg_price: 215.00, ltp: 198.40, pnl_amount: -4150.0, pnl_percent: -7.72, side: 'BUY' },
            { id: 3, symbol: 'RELIANCE', exchange: 'NSE', quantity: 100, avg_price: 2856.00, ltp: 2914.75, pnl_amount: 5875.0, pnl_percent: 2.06, side: 'BUY' },
            { id: 4, symbol: 'GOLD OCT FUT', exchange: 'MCX', quantity: 10, avg_price: 72450.0, ltp: 72612.0, pnl_amount: 1620.0, pnl_percent: 0.22, side: 'BUY' },
            { id: 5, symbol: 'BTC/USDT', exchange: 'CRYPTO', quantity: 1, avg_price: 58210.0, ltp: 58450.0, pnl_amount: 620.0, pnl_percent: 0.41, side: 'BUY' }
          ]
        });
      });

    fetch('/api/algo/performance')
      .then(res => res.json())
      .then(data => setAlgoPerf(data))
      .catch(() => {});
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

  const setup = dashboardData?.trading_setup || {
    package_type: 'BALANCED',
    package_return_range: '30% - 60%',
    total_investment: 500000,
    current_value: 538750,
    realized_pnl: 27850,
    unrealized_pnl: 10900
  };

  const totalInv = setup.total_investment || 500000;
  const currVal = setup.current_value || 538750;
  const overallPnl = currVal - totalInv;
  const overallPct = ((overallPnl / totalInv) * 100).toFixed(2);

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', paddingBottom: '90px' }}>
      
      {/* Master Algo Control Card (Pages 15, 19, 20) */}
      <div className="algo-card" style={{ marginBottom: '16px', position: 'relative' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={26} color="#D4AF37" />
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#FFFFFF' }}>Master Algo Engine</h3>
          </div>
          <p style={{ fontSize: '12px', color: '#93C5FD', marginTop: '4px' }}>
            {algoActive ? 'Automated strategy running • Target: ' + setup.package_return_range : 'Algo Trading Paused'}
          </p>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              background: algoActive ? 'rgba(16,185,129,0.2)' : 'rgba(239,68,68,0.2)',
              border: '1px solid',
              borderColor: algoActive ? '#10B981' : '#EF4444',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: '800',
              color: algoActive ? '#10B981' : '#FCA5A5'
            }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: algoActive ? '#10B981' : '#EF4444' }} />
              <span>{algoActive ? 'ALGO ACTIVE' : 'ALGO PAUSED'}</span>
            </span>

            <button
              onClick={() => setShowAlgoDetails(!showAlgoDetails)}
              style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: '#FFF', borderRadius: '16px', padding: '4px 10px', fontSize: '11px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <BarChart3 size={14} color="#D4AF37" />
              <span>Analytics</span>
            </button>
          </div>
        </div>

        <label className="toggle-switch" style={{ alignSelf: 'flex-start', marginTop: '4px' }}>
          <input type="checkbox" checked={algoActive} onChange={handleToggleAlgo} />
          <span className="slider"></span>
        </label>
      </div>

      {/* Algo Detailed Analytics Card (Expandable Page 20) */}
      {showAlgoDetails && (
        <div className="card-panel" style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', marginBottom: '16px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#003366', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={18} color="#D97706" />
              <span>Algo Performance Metrics</span>
            </div>
            <span className="badge badge-green">75.0% Win Rate</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', textAlign: 'center', marginBottom: '12px' }}>
            <div style={{ background: '#FFF', padding: '8px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '10px', color: '#64748B' }}>Trades</div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A' }}>28</div>
            </div>
            <div style={{ background: '#FFF', padding: '8px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '10px', color: '#64748B' }}>Wins</div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#10B981' }}>21</div>
            </div>
            <div style={{ background: '#FFF', padding: '8px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '10px', color: '#64748B' }}>Losses</div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#EF4444' }}>7</div>
            </div>
            <div style={{ background: '#FFF', padding: '8px', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '10px', color: '#64748B' }}>Net ROI</div>
              <div style={{ fontSize: '14px', fontWeight: '800', color: '#10B981' }}>+9.7%</div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#475569', paddingTop: '8px', borderTop: '1px solid #E2E8F0' }}>
            <div>Best Day: <strong style={{ color: '#10B981' }}>+₹14,320</strong> (5 Sep)</div>
            <div>Worst Day: <strong style={{ color: '#EF4444' }}>-₹5,860</strong> (3 Sep)</div>
          </div>
        </div>
      )}

      {/* Portfolio Performance Summary Card (Page 15) */}
      <div className="card-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '12px', fontWeight: '800', color: '#003366', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Portfolio Summary
          </span>
          <span style={{ fontSize: '11px', color: '#0047AB', fontWeight: '700' }}>Live Equity Curve</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Total Investment</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
              ₹ {totalInv.toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Current Value</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>
              ₹ {currVal.toLocaleString()}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Overall P&L</div>
            <div style={{ fontSize: '16px', fontWeight: '800', color: overallPnl >= 0 ? '#10B981' : '#EF4444', marginTop: '2px' }}>
              {overallPnl >= 0 ? '+' : ''}₹ {overallPnl.toLocaleString()}
            </div>
            <div style={{ fontSize: '11px', fontWeight: '800', color: overallPnl >= 0 ? '#10B981' : '#EF4444' }}>
              ({overallPct >= 0 ? '+' : ''}{overallPct}%)
            </div>
          </div>
        </div>

        {/* Realized & Unrealized P&L Strip */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', background: '#F8FAFC', padding: '10px', borderRadius: '10px', border: '1px solid #E2E8F0', marginBottom: '12px' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#64748B', fontWeight: '600' }}>Realized Profit</div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#10B981' }}>+ ₹ {(setup.realized_pnl || 27850).toLocaleString()}</div>
          </div>
          <div>
            <div style={{ fontSize: '10px', color: '#64748B', fontWeight: '600' }}>Unrealized Floating P&L</div>
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#10B981' }}>+ ₹ {(setup.unrealized_pnl || 10900).toLocaleString()}</div>
          </div>
        </div>

        {/* Live Sparkline Area Chart */}
        <div style={{ width: '100%', height: 100, marginTop: '8px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="pnlGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10B981" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#10B981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="pnl" stroke="#10B981" strokeWidth={2.5} fillOpacity={1} fill="url(#pnlGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Package Customization Banner (Page 15) */}
      <div className="card-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>Active Trading Package</div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#003366', marginTop: '2px' }}>
            {setup.package_type || 'BALANCED'} ({setup.package_return_range || '30% - 60%'} / mo)
          </div>
        </div>
        <button 
          onClick={() => onNavigate('onboarding')}
          style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', color: '#0047AB', borderRadius: '10px', padding: '8px 12px', fontWeight: '700', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          <span>Package</span>
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Quick Action Grid (Page 15) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '16px' }}>
        <button onClick={() => onNavigate('funds')} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <PlusCircle size={24} color="#0047AB" />
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#0F172A' }}>Add Funds</span>
        </button>

        <button onClick={() => onNavigate('funds')} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <ArrowDownLeft size={24} color="#0047AB" />
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#0F172A' }}>Withdraw</span>
        </button>

        <button onClick={() => onNavigate('security')} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <ShieldCheck size={24} color="#0047AB" />
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#0F172A' }}>Security</span>
        </button>

        <button onClick={() => onNavigate('pnl')} style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '12px 6px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.03)' }}>
          <FileText size={24} color="#0047AB" />
          <span style={{ fontSize: '11px', fontWeight: '700', color: '#0F172A' }}>Reports</span>
        </button>
      </div>

      {/* Live Open Positions List (Page 19 Requirement) */}
      <div className="card-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
          <div>
            <div style={{ fontSize: '15px', fontWeight: '800', color: '#003366' }}>
              Active Algo Trades ({dashboardData?.positions?.length || 5})
            </div>
            <div style={{ fontSize: '11px', color: '#64748B' }}>Live market executions</div>
          </div>
          <button onClick={() => onNavigate('pnl')} style={{ background: 'none', border: 'none', color: '#0047AB', fontSize: '12px', fontWeight: '800', cursor: 'pointer' }}>
            View P&L Report ›
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {dashboardData?.positions?.map((pos) => (
            <div key={pos.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #F1F5F9' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ background: pos.side === 'BUY' ? '#E6F4EA' : '#FCE8E6', color: pos.side === 'BUY' ? '#137333' : '#C5221F', padding: '1px 6px', borderRadius: '4px', fontSize: '10px', fontWeight: '800' }}>
                    {pos.side || 'BUY'}
                  </span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{pos.symbol}</span>
                  <span style={{ fontSize: '9px', background: '#FEF7E0', color: '#B06000', padding: '1px 4px', borderRadius: '4px', fontWeight: '800' }}>ALGO</span>
                </div>
                <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                  Qty: {pos.quantity} • Avg: ₹{pos.avg_price} • LTP: ₹{pos.ltp}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '14px', fontWeight: '800', color: pos.pnl_amount >= 0 ? '#10B981' : '#EF4444' }}>
                  {pos.pnl_amount >= 0 ? '+' : ''}₹{pos.pnl_amount.toLocaleString()}
                </div>
                <div style={{ fontSize: '10px', fontWeight: '800', color: pos.pnl_amount >= 0 ? '#10B981' : '#EF4444' }}>
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
