import React, { useState } from 'react';
import { Cpu, Play, BarChart2, TrendingUp, ShieldCheck, Zap, RefreshCw, Award, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

export default function AlgoBacktester({ onNavigate }) {
  const [strategy, setStrategy] = useState('BALANCED');
  const [initialCapital, setInitialCapital] = useState('500000');
  const [timeframe, setTimeframe] = useState('1Y');
  const [running, setRunning] = useState(false);

  const [results, setResults] = useState({
    strategy: 'BALANCED',
    timeframe: '1Y',
    initial_capital: 500000,
    final_capital: 711000,
    net_profit: 211000,
    roi_percentage: 42.2,
    total_trades: 264,
    winning_trades: 199,
    losing_trades: 65,
    win_rate: 75.4,
    max_drawdown_percent: 8.5,
    sharpe_ratio: 2.15,
    profit_factor: 2.45,
    equity_curve: [
      { month: 'Jan', equity: 518000, pnl: 18000 },
      { month: 'Feb', equity: 539000, pnl: 21000 },
      { month: 'Mar', equity: 528000, pnl: -11000 },
      { month: 'Apr', equity: 562000, pnl: 34000 },
      { month: 'May', equity: 589000, pnl: 27000 },
      { month: 'Jun', equity: 615000, pnl: 26000 },
      { month: 'Jul', equity: 638000, pnl: 23000 },
      { month: 'Aug', equity: 672000, pnl: 34000 },
      { month: 'Sep', equity: 711000, pnl: 39000 }
    ]
  });

  const handleRunBacktest = async (e) => {
    e.preventDefault();
    setRunning(true);

    try {
      const res = await fetch('/api/algo/backtest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ strategy, initialCapital, timeframe })
      });
      if (res.ok) {
        const data = await res.json();
        setResults(data);
      }
    } catch (e) {}

    setTimeout(() => {
      setRunning(false);
    }, 1200);
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', paddingBottom: '80px' }}>
      
      {/* Header Strip */}
      <div style={{ marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Cpu size={22} color="#D4AF37" />
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#003366' }}>Algo Strategy Backtester</h2>
        </div>
        <p style={{ fontSize: '12px', color: '#64748B' }}>Simulate strategy performance over historical market tick data</p>
      </div>

      {/* Configuration Form */}
      <div className="card-panel" style={{ marginBottom: '16px' }}>
        <form onSubmit={handleRunBacktest} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Select Trading Strategy</label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
              {[
                { id: 'CAPITAL_PROTECT', label: 'Capital Protect (20-30%)' },
                { id: 'BALANCED', label: 'Balanced (30-60%)' },
                { id: 'AGGRESSIVE', label: 'Aggressive (50-70%)' }
              ].map(s => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setStrategy(s.id)}
                  style={{
                    padding: '8px 4px',
                    borderRadius: '8px',
                    border: strategy === s.id ? '2px solid #0047AB' : '1px solid #CBD5E1',
                    background: strategy === s.id ? '#EFF6FF' : '#FFFFFF',
                    color: strategy === s.id ? '#0047AB' : '#475569',
                    fontSize: '11px',
                    fontWeight: '800',
                    cursor: 'pointer'
                  }}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569' }}>Initial Capital (₹)</label>
              <input 
                type="number"
                value={initialCapital}
                onChange={(e) => setInitialCapital(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '13px', fontWeight: '800', marginTop: '4px' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569' }}>Backtest Timeframe</label>
              <select 
                value={timeframe} 
                onChange={(e) => setTimeframe(e.target.value)}
                style={{ width: '100%', padding: '8px 10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: '800', marginTop: '4px' }}
              >
                <option value="1M">1 Month</option>
                <option value="6M">6 Months</option>
                <option value="1Y">1 Year (Historical)</option>
                <option value="3Y">3 Years</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={running}
            style={{
              width: '100%',
              padding: '12px',
              background: '#0047AB',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '10px',
              fontSize: '14px',
              fontWeight: '800',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              marginTop: '4px'
            }}
          >
            <Play size={16} fill="#FFFFFF" />
            <span>{running ? 'Running Backtest Engine...' : 'RUN STRATEGY BACKTEST'}</span>
          </button>
        </form>
      </div>

      {/* Results Header Card */}
      <div className="card-panel" style={{ background: 'linear-gradient(135deg, #001F3F 0%, #003366 100%)', color: '#FFFFFF', padding: '18px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '10px', color: '#D4AF37', fontWeight: '800' }}>BACKTEST RESULT SUMMARY ({results.timeframe})</div>
            <div style={{ fontSize: '22px', fontWeight: '800', marginTop: '2px' }}>₹ {results.final_capital.toLocaleString()}</div>
            <div style={{ fontSize: '12px', color: '#10B981', fontWeight: '700', marginTop: '2px' }}>
              Net Profit: +₹ {results.net_profit.toLocaleString()} (+{results.roi_percentage}%)
            </div>
          </div>

          <span className="badge badge-green" style={{ fontSize: '11px', padding: '4px 10px' }}>
            Sharpe: {results.sharpe_ratio}
          </span>
        </div>
      </div>

      {/* KPI Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
        <div className="card-panel" style={{ margin: 0, padding: '12px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#64748B' }}>Win Rate</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#10B981', marginTop: '2px' }}>{results.win_rate}%</div>
        </div>

        <div className="card-panel" style={{ margin: 0, padding: '12px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#64748B' }}>Max Drawdown</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#EF4444', marginTop: '2px' }}>-{results.max_drawdown_percent}%</div>
        </div>

        <div className="card-panel" style={{ margin: 0, padding: '12px 10px', textAlign: 'center' }}>
          <div style={{ fontSize: '10px', color: '#64748B' }}>Total Trades</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>{results.total_trades}</div>
        </div>
      </div>

      {/* Cumulative Equity Curve Chart */}
      <div className="card-panel">
        <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#003366', marginBottom: '12px' }}>Simulated Equity Growth Curve</h3>
        <div style={{ width: '100%', height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={results.equity_curve}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="month" stroke="#94A3B8" fontSize={10} />
              <YAxis stroke="#94A3B8" fontSize={10} />
              <Tooltip formatter={(val) => `₹ ${val.toLocaleString()}`} />
              <Area type="monotone" dataKey="equity" stroke="#0047AB" fill="#EFF6FF" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
