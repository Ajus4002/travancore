import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, Layers, BarChart2, Zap } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, ReferenceLine } from 'recharts';

export default function ChartModal({ instrument, onClose, onPlaceOrder }) {
  const [timeframe, setTimeframe] = useState('1D'); // 1D, 1W, 1M, 1Y
  const [chartType, setChartType] = useState('AREA'); // AREA or CANDLE
  const [showRsi, setShowRsi] = useState(true);
  const [showEma, setShowEma] = useState(true);

  if (!instrument) return null;

  // Mock historical chart data points based on timeframe
  const generateChartData = () => {
    const base = instrument.ltp;
    const count = timeframe === '1D' ? 12 : timeframe === '1W' ? 14 : 30;
    const points = [];
    let current = base * 0.96;

    for (let i = 0; i < count; i++) {
      const delta = (Math.random() * 0.03 - 0.012) * current;
      current += delta;
      const open = current - Math.random() * 5;
      const close = current + Math.random() * 5;
      const high = Math.max(open, close) + Math.random() * 8;
      const low = Math.min(open, close) - Math.random() * 8;
      const rsi = Math.floor(40 + Math.random() * 35);
      const ema = current * 0.985;

      points.push({
        time: timeframe === '1D' ? `${9 + Math.floor(i / 2)}:${i % 2 === 0 ? '15' : '45'}` : `Day ${i + 1}`,
        price: parseFloat(current.toFixed(2)),
        open: parseFloat(open.toFixed(2)),
        high: parseFloat(high.toFixed(2)),
        low: parseFloat(low.toFixed(2)),
        close: parseFloat(close.toFixed(2)),
        rsi,
        ema: parseFloat(ema.toFixed(2))
      });
    }
    return points;
  };

  const chartData = generateChartData();
  const lastPoint = chartData[chartData.length - 1];

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0,0,0,0.65)',
      backdropFilter: 'blur(4px)',
      zIndex: 250,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '16px'
    }}>
      <div style={{
        background: '#FFFFFF',
        width: '100%',
        maxWidth: '650px',
        borderRadius: '16px',
        overflow: 'hidden',
        boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
        animation: 'fadeIn 0.2s ease-out'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(135deg, #001F3F 0%, #003366 100%)',
          color: '#FFFFFF',
          padding: '16px 20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '800' }}>{instrument.symbol}</h3>
              <span className="badge badge-gold" style={{ fontSize: '9px' }}>{instrument.exchange || 'LIVE'}</span>
            </div>
            <div style={{ fontSize: '12px', color: '#93C5FD', marginTop: '2px' }}>
              {instrument.name || 'Technical Analysis & Candlestick Chart'}
            </div>
          </div>

          <button 
            onClick={onClose}
            style={{ background: 'rgba(255,255,255,0.1)', border: 'none', borderRadius: '50%', width: 32, height: 32, color: '#FFFFFF', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={18} />
          </button>
        </div>

        {/* OHLC Bar Strip */}
        <div style={{ background: '#F8FAFC', padding: '10px 20px', borderBottom: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '12px' }}>
          <div>
            <span style={{ color: '#64748B' }}>LTP: </span>
            <strong style={{ fontSize: '15px', color: '#0F172A' }}>{instrument.currency || '₹'}{instrument.ltp?.toLocaleString()}</strong>
            <span style={{ color: instrument.change_percent >= 0 ? '#10B981' : '#EF4444', fontWeight: '800', marginLeft: '6px' }}>
              {instrument.change_percent >= 0 ? '+' : ''}{instrument.change_percent}%
            </span>
          </div>

          <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#475569' }}>
            <span>O: <strong>{lastPoint.open}</strong></span>
            <span>H: <strong>{lastPoint.high}</strong></span>
            <span>L: <strong>{lastPoint.low}</strong></span>
            <span>C: <strong>{lastPoint.close}</strong></span>
          </div>
        </div>

        {/* Controls Toolbar */}
        <div style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #F1F5F9' }}>
          {/* Timeframe selector */}
          <div style={{ display: 'flex', gap: '4px', background: '#F1F5F9', padding: '3px', borderRadius: '8px' }}>
            {['1D', '1W', '1M', '1Y'].map(tf => (
              <button
                key={tf}
                onClick={() => setTimeframe(tf)}
                style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  background: timeframe === tf ? '#0047AB' : 'transparent',
                  color: timeframe === tf ? '#FFFFFF' : '#64748B'
                }}
              >
                {tf}
              </button>
            ))}
          </div>

          {/* Indicator toggles */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => setShowEma(!showEma)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: showEma ? '1px solid #0047AB' : '1px solid #CBD5E1',
                background: showEma ? '#EFF6FF' : '#FFFFFF',
                color: showEma ? '#0047AB' : '#64748B',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              20-EMA
            </button>

            <button
              onClick={() => setShowRsi(!showRsi)}
              style={{
                padding: '4px 10px',
                borderRadius: '6px',
                border: showRsi ? '1px solid #0047AB' : '1px solid #CBD5E1',
                background: showRsi ? '#EFF6FF' : '#FFFFFF',
                color: showRsi ? '#0047AB' : '#64748B',
                fontSize: '11px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              RSI (14)
            </button>
          </div>
        </div>

        {/* Main Price Area Chart */}
        <div style={{ padding: '16px 20px 0 0', height: 220 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={instrument.change_percent >= 0 ? '#10B981' : '#EF4444'} stopOpacity={0.4}/>
                  <stop offset="95%" stopColor={instrument.change_percent >= 0 ? '#10B981' : '#EF4444'} stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
              <XAxis dataKey="time" stroke="#94A3B8" fontSize={10} />
              <YAxis domain={['auto', 'auto']} stroke="#94A3B8" fontSize={10} />
              <Tooltip formatter={(val) => [`${instrument.currency || '₹'}${val}`, 'Price']} />
              <Area type="monotone" dataKey="price" stroke={instrument.change_percent >= 0 ? '#10B981' : '#EF4444'} strokeWidth={2} fillOpacity={1} fill="url(#chartGrad)" />
              {showEma && <Area type="monotone" dataKey="ema" stroke="#D4AF37" strokeWidth={1.5} fill="none" dot={false} />}
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Secondary RSI Sub-chart */}
        {showRsi && (
          <div style={{ padding: '10px 20px 10px 0', height: 80, borderTop: '1px solid #F1F5F9' }}>
            <div style={{ fontSize: '10px', color: '#64748B', fontWeight: '700', marginLeft: '20px', marginBottom: '2px' }}>RSI (14): {lastPoint.rsi}</div>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <YAxis domain={[0, 100]} ticks={[30, 70]} stroke="#94A3B8" fontSize={9} />
                <ReferenceLine y={70} stroke="#EF4444" strokeDasharray="2 2" />
                <ReferenceLine y={30} stroke="#10B981" strokeDasharray="2 2" />
                <Area type="monotone" dataKey="rsi" stroke="#0047AB" fill="#EFF6FF" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* Quick Execution Action Footer */}
        <div style={{ padding: '16px 20px', background: '#F8FAFC', borderTop: '1px solid #E2E8F0', display: 'flex', gap: '10px' }}>
          <button
            onClick={() => { onClose(); onPlaceOrder && onPlaceOrder(instrument, 'BUY'); }}
            style={{ flex: 1, padding: '12px', background: '#10B981', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <TrendingUp size={16} />
            <span>BUY {instrument.symbol}</span>
          </button>

          <button
            onClick={() => { onClose(); onPlaceOrder && onPlaceOrder(instrument, 'SELL'); }}
            style={{ flex: 1, padding: '12px', background: '#EF4444', color: '#FFFFFF', border: 'none', borderRadius: '10px', fontWeight: '800', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
          >
            <TrendingDown size={16} />
            <span>SELL {instrument.symbol}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
