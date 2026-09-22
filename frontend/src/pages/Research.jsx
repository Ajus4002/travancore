import React, { useState } from 'react';
import { Newspaper, Target, ShieldAlert, ArrowUpRight, ArrowDownRight, ExternalLink, Zap, CheckCircle2 } from 'lucide-react';

export default function Research({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('CALLS'); // 'CALLS' or 'NEWS'
  const [executeCall, setExecuteCall] = useState(null);
  const [executedSuccess, setExecutedSuccess] = useState(false);

  const advisoryCalls = [
    {
      id: '1',
      symbol: 'NIFTY 50',
      action: 'BUY',
      entryRange: '25,000 - 25,030',
      target1: '25,250',
      target2: '25,350',
      stopLoss: '24,950',
      risk: 'Moderate',
      type: 'Intraday',
      time: '10 min ago',
      analysis: 'Bullish breakout above 25,000 resistance level with high institutional volume.'
    },
    {
      id: '2',
      symbol: 'RELIANCE',
      action: 'BUY',
      entryRange: '2,910 - 2,925',
      target1: '2,950',
      target2: '2,980',
      stopLoss: '2,870',
      risk: 'Moderate',
      type: 'Swing Trade',
      time: '35 min ago',
      analysis: 'Consolidation near key support zone, expected momentum boost from Q2 earnings.'
    },
    {
      id: '3',
      symbol: 'BANK NIFTY',
      action: 'SELL',
      entryRange: '51,350 - 51,400',
      target1: '51,200',
      target2: '50,900',
      stopLoss: '51,750',
      risk: 'High',
      type: 'Intraday',
      time: '1 hour ago',
      analysis: 'Overbought RSI indicator on 15-min timeframe; profit booking anticipated.'
    },
    {
      id: '4',
      symbol: 'GOLD OCT FUT',
      action: 'SELL',
      entryRange: '72,600 - 72,650',
      target1: '72,400',
      target2: '72,200',
      stopLoss: '73,150',
      risk: 'Moderate',
      type: 'Intraday',
      time: '2 hours ago',
      analysis: 'US Dollar index strength weighing on precious metals in international market.'
    }
  ];

  const newsFeed = [
    {
      id: 'n1',
      title: 'RBI Signals Potential Rate Cut in Upcoming Policy Review as Inflation Cools to 3-Year Low',
      source: 'Economic Times',
      time: '15 min ago',
      sentiment: 'Positive',
      snippet: 'Reserve Bank of India monetary policy committee expected to adopt accommodative stance following favorable CPI inflation data.'
    },
    {
      id: 'n2',
      title: 'Global Markets Rally as Tech Stocks Push S&P 500 and Nasdaq to All-Time Highs',
      source: 'Moneycontrol',
      time: '45 min ago',
      sentiment: 'Positive',
      snippet: 'Surge in AI infrastructure spending drives semiconductor and cloud sector valuations across Asian and US exchanges.'
    },
    {
      id: 'n3',
      title: 'Crude Oil Prices Drop 1.5% Amid Demand Concerns in European Manufacturing Sector',
      source: 'Reuters',
      time: '2 hours ago',
      sentiment: 'Negative',
      snippet: 'Brent crude futures dropped below $74 per barrel as inventory reports indicated higher supply buffers.'
    },
    {
      id: 'n4',
      title: 'IT Sector Q2 Earnings Preview: Major Indian Tech Firms Expected to Show Steady Margin Growth',
      source: 'CNBC-TV18',
      time: '3 hours ago',
      sentiment: 'Neutral',
      snippet: 'Analysts project mid-single digit revenue growth for top tier IT services firms backed by banking and cloud deals.'
    }
  ];

  const handleExecute = (call) => {
    setExecuteCall(call);
    setExecutedSuccess(false);
  };

  const handleConfirmCallExecution = () => {
    setExecutedSuccess(true);
    setTimeout(() => {
      setExecuteCall(null);
      setExecutedSuccess(false);
    }, 1800);
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', paddingBottom: '80px' }}>
      
      {/* Header */}
      <div style={{ marginBottom: '16px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#003366' }}>Research & Advisory Hub</h2>
        <p style={{ fontSize: '12px', color: '#64748B' }}>Expert trading signals, market intelligence & breaking news</p>
      </div>

      {/* Switcher Pills */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => setActiveTab('CALLS')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '13px',
            fontWeight: '800',
            cursor: 'pointer',
            background: activeTab === 'CALLS' ? '#0047AB' : '#E2E8F0',
            color: activeTab === 'CALLS' ? '#FFFFFF' : '#475569'
          }}
        >
          Expert Advisory Signals
        </button>

        <button
          onClick={() => setActiveTab('NEWS')}
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '10px',
            border: 'none',
            fontSize: '13px',
            fontWeight: '800',
            cursor: 'pointer',
            background: activeTab === 'NEWS' ? '#0047AB' : '#E2E8F0',
            color: activeTab === 'NEWS' ? '#FFFFFF' : '#475569'
          }}
        >
          Market News Feed
        </button>
      </div>

      {activeTab === 'CALLS' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {advisoryCalls.map((call) => (
            <div key={call.id} className="card-panel" style={{ margin: 0, padding: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>{call.symbol}</span>
                    <span style={{
                      padding: '3px 8px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '800',
                      background: call.action === 'BUY' ? '#10B981' : '#EF4444',
                      color: '#FFFFFF'
                    }}>
                      {call.action}
                    </span>
                    <span className="badge badge-blue" style={{ fontSize: '9px' }}>{call.type}</span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>Entry Range: {call.entryRange}</div>
                </div>

                <div style={{ fontSize: '10px', color: '#94A3B8', fontWeight: '600' }}>{call.time}</div>
              </div>

              {/* Targets Grid (Page 25) */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', background: '#F8FAFC', padding: '10px', borderRadius: '8px', marginBottom: '10px', fontSize: '11px' }}>
                <div>
                  <div style={{ color: '#64748B', fontSize: '10px' }}>Target 1</div>
                  <div style={{ fontWeight: '800', color: '#10B981' }}>₹{call.target1}</div>
                </div>
                <div>
                  <div style={{ color: '#64748B', fontSize: '10px' }}>Target 2</div>
                  <div style={{ fontWeight: '800', color: '#10B981' }}>₹{call.target2}</div>
                </div>
                <div>
                  <div style={{ color: '#64748B', fontSize: '10px' }}>Stop Loss</div>
                  <div style={{ fontWeight: '800', color: '#EF4444' }}>₹{call.stopLoss}</div>
                </div>
              </div>

              <div style={{ fontSize: '11px', color: '#475569', lineHeight: '1.4', marginBottom: '12px' }}>
                {call.analysis}
              </div>

              <button
                onClick={() => handleExecute(call)}
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: 'none', background: '#0047AB', color: '#FFFFFF', fontSize: '12px', fontWeight: '800', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
              >
                <Zap size={14} color="#D4AF37" />
                <span>Execute Signal Trade</span>
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {newsFeed.map((news) => (
            <div key={news.id} className="card-panel" style={{ margin: 0, padding: '14px 16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span className="badge badge-blue" style={{ fontSize: '9px' }}>{news.source}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className={`badge ${news.sentiment === 'Positive' ? 'badge-green' : news.sentiment === 'Negative' ? 'badge-red' : 'badge-gold'}`} style={{ fontSize: '9px' }}>
                    Impact: {news.sentiment}
                  </span>
                  <span style={{ fontSize: '10px', color: '#94A3B8' }}>{news.time}</span>
                </div>
              </div>

              <h3 style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', marginBottom: '4px', lineHeight: '1.4' }}>
                {news.title}
              </h3>

              <p style={{ fontSize: '12px', color: '#64748B', lineHeight: '1.4' }}>
                {news.snippet}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Execute Signal Trade Modal */}
      {executeCall && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '400px', borderRadius: '16px', padding: '20px' }}>
            
            {executedSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={44} color="#10B981" style={{ margin: '0 auto 10px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>Signal Order Executed!</h3>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  {executeCall.action} {executeCall.symbol} placed at Target 1 ₹{executeCall.target1} with SL ₹{executeCall.stopLoss}
                </p>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#003366', marginBottom: '8px' }}>
                  Execute Advisory Call: {executeCall.symbol}
                </h3>
                <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', fontSize: '12px', color: '#475569', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>Recommendation:</span>
                    <strong style={{ color: executeCall.action === 'BUY' ? '#10B981' : '#EF4444' }}>{executeCall.action}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span>Target 1:</span>
                    <strong>₹{executeCall.target1}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <span>Stop Loss:</span>
                    <strong style={{ color: '#EF4444' }}>₹{executeCall.stopLoss}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px' }}>
                  <button 
                    onClick={handleConfirmCallExecution}
                    style={{ flex: 1, padding: '12px', background: executeCall.action === 'BUY' ? '#10B981' : '#EF4444', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
                  >
                    Confirm & Execute Order
                  </button>
                  <button 
                    onClick={() => setExecuteCall(null)}
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
