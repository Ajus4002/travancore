import React, { useState } from 'react';
import { Download, Share2, Calendar, TrendingUp, Cpu, PieChart as PieIcon, FileSpreadsheet, FileText, Mail, CheckCircle2 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function PnLReport({ onNavigate }) {
  const [timeFilter, setTimeFilter] = useState('MONTHLY');
  const [activeTab, setActiveTab] = useState('POSITIONS');
  const [exportModal, setExportModal] = useState(false);
  const [exportSuccess, setExportSuccess] = useState('');

  const pnlTrendData = [
    { date: '1 Sep', gross: 4200, net: 3850 },
    { date: '3 Sep', gross: -5860, net: -6120 },
    { date: '5 Sep', gross: 14320, net: 13900 },
    { date: '7 Sep', gross: 8900, net: 8450 },
    { date: '9 Sep', gross: 11200, net: 10700 },
    { date: '11 Sep', gross: 6400, net: 5950 },
    { date: '12 Sep', gross: 13180, net: 11895 }
  ];

  const tradeHistory = [
    { date: '12 Sep 2026', symbol: 'NIFTY 12 SEP 25000 CE', type: 'ALGO BUY', qty: 50, buy: 102.50, sell: 128.30, pnl: 12900.0, status: 'OPEN' },
    { date: '12 Sep 2026', symbol: 'BANKNIFTY 12 SEP 51300 PE', type: 'ALGO BUY', qty: 25, buy: 215.00, sell: 198.40, pnl: -4150.0, status: 'OPEN' },
    { date: '11 Sep 2026', symbol: 'RELIANCE', type: 'MANUAL BUY', qty: 100, buy: 2856.00, sell: 2914.75, pnl: 5875.0, status: 'CLOSED' },
    { date: '10 Sep 2026', symbol: 'TCS', type: 'ALGO BUY', qty: 20, buy: 3720.00, sell: 3785.00, pnl: 1300.0, status: 'CLOSED' },
    { date: '09 Sep 2026', symbol: 'GOLD OCT FUT', type: 'ALGO SELL', qty: 10, buy: 72450.0, sell: 72612.0, pnl: 1620.0, status: 'OPEN' },
    { date: '08 Sep 2026', symbol: 'BTC/USDT', type: 'ALGO BUY', qty: 1, buy: 58210.0, sell: 58450.0, pnl: 620.0, status: 'OPEN' }
  ];

  const handleExportAction = (type) => {
    setExportSuccess(type);
    setTimeout(() => {
      setExportSuccess('');
      setExportModal(false);
    }, 2000);
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', paddingBottom: '80px' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#003366' }}>P&L & Performance Analytics</h2>
          <p style={{ fontSize: '12px', color: '#64748B' }}>Institutional financial summary & algo performance reports</p>
        </div>
        <button 
          onClick={() => setExportModal(true)}
          style={{ background: '#0047AB', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '8px 14px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}
        >
          <Download size={14} />
          <span>Export</span>
        </button>
      </div>

      {/* Time Range Pills */}
      <div style={{ display: 'flex', gap: '6px', marginBottom: '16px' }}>
        {[
          { id: 'TODAY', label: 'Today' },
          { id: 'WEEKLY', label: 'Weekly' },
          { id: 'MONTHLY', label: 'Monthly' },
          { id: 'CUSTOM', label: 'Custom' }
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTimeFilter(t.id)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '8px',
              border: '1px solid #CBD5E1',
              fontSize: '12px',
              fontWeight: '700',
              cursor: 'pointer',
              background: timeFilter === t.id ? '#003366' : '#FFFFFF',
              color: timeFilter === t.id ? '#FFFFFF' : '#475569'
            }}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Strategy Header Banner (Page 20) */}
      <div className="card-panel" style={{ background: 'linear-gradient(135deg, #001F3F 0%, #003366 100%)', color: '#FFFFFF', padding: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={20} color="#D4AF37" />
            <span style={{ fontSize: '14px', fontWeight: '800' }}>BALANCED ALGO STRATEGY</span>
          </div>
          <span className="badge badge-green">ACTIVE</span>
        </div>
        <div style={{ fontSize: '11px', color: '#93C5FD', marginTop: '4px' }}>
          Target Return: 30% - 60% / month • Markets: Nifty, Bank Nifty, Stocks, Options
        </div>
      </div>

      {/* Primary KPI Grid (Pages 17, 20) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '16px' }}>
        <div className="card-panel" style={{ margin: 0 }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Total Algo Investment</div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A', marginTop: '2px' }}>₹ 5,00,000</div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '700', marginTop: '4px' }}>Current Val: ₹ 5,38,750</div>
        </div>

        <div className="card-panel" style={{ margin: 0 }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Net Cumulative P&L</div>
          <div style={{ fontSize: '18px', fontWeight: '800', color: '#10B981', marginTop: '2px' }}>+ ₹ 48,625</div>
          <div style={{ fontSize: '11px', color: '#10B981', fontWeight: '700', marginTop: '4px' }}>ROI: +9.73%</div>
        </div>

        <div className="card-panel" style={{ margin: 0 }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Realized P&L</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#10B981', marginTop: '2px' }}>+ ₹ 27,850</div>
          <div style={{ fontSize: '10px', color: '#64748B' }}>Closed trades</div>
        </div>

        <div className="card-panel" style={{ margin: 0 }}>
          <div style={{ fontSize: '11px', color: '#64748B' }}>Unrealized P&L</div>
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#10B981', marginTop: '2px' }}>+ ₹ 10,900</div>
          <div style={{ fontSize: '10px', color: '#64748B' }}>Active positions</div>
        </div>
      </div>

      {/* Win Ratio Donut & Trade Stats (Page 20) */}
      <div className="card-panel" style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '800', color: '#003366', marginBottom: '12px' }}>
          Trade Win/Loss Breakdown
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '800', color: '#10B981' }}>75.0%</div>
            <div style={{ fontSize: '11px', color: '#64748B', fontWeight: '600' }}>Overall Win Ratio</div>
            <div style={{ fontSize: '12px', marginTop: '8px', color: '#0F172A' }}>
              <strong>28 Total Trades</strong> (21 Wins / 7 Losses)
            </div>
          </div>
          
          {/* Visual Bar / Donut Ratio */}
          <div style={{ width: '120px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700' }}>
              <span style={{ color: '#10B981' }}>21 Wins</span>
              <span style={{ color: '#EF4444' }}>7 Losses</span>
            </div>
            <div style={{ height: '12px', borderRadius: '6px', background: '#EF4444', overflow: 'hidden', display: 'flex' }}>
              <div style={{ width: '75%', background: '#10B981', height: '100%' }}></div>
            </div>
            <div style={{ fontSize: '10px', color: '#64748B', textAlign: 'center' }}>
              Best Day: <span style={{ color: '#10B981', fontWeight: '700' }}>+₹14,320</span>
            </div>
          </div>
        </div>
      </div>

      {/* Daily P&L Trend Combo Chart (Page 20) */}
      <div className="card-panel" style={{ marginBottom: '16px' }}>
        <div style={{ fontSize: '14px', fontWeight: '800', color: '#003366', marginBottom: '12px' }}>
          Daily P&L Trajectory (September 2026)
        </div>
        <div style={{ width: '100%', height: 180 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={pnlTrendData}>
              <XAxis dataKey="date" stroke="#94A3B8" fontSize={10} />
              <YAxis stroke="#94A3B8" fontSize={10} />
              <Tooltip formatter={(val) => `₹ ${val.toLocaleString()}`} />
              <Bar dataKey="net" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Positions & Trade History Data Table */}
      <div className="card-panel">
        <div style={{ display: 'flex', gap: '12px', borderBottom: '1px solid #E2E8F0', paddingBottom: '10px', marginBottom: '12px' }}>
          <button 
            onClick={() => setActiveTab('POSITIONS')}
            style={{ background: 'none', border: 'none', fontSize: '13px', fontWeight: '800', cursor: 'pointer', color: activeTab === 'POSITIONS' ? '#0047AB' : '#64748B', borderBottom: activeTab === 'POSITIONS' ? '2px solid #0047AB' : 'none', paddingBottom: '4px' }}
          >
            Live Positions ({tradeHistory.filter(t => t.status === 'OPEN').length})
          </button>
          <button 
            onClick={() => setActiveTab('CLOSED')}
            style={{ background: 'none', border: 'none', fontSize: '13px', fontWeight: '800', cursor: 'pointer', color: activeTab === 'CLOSED' ? '#0047AB' : '#64748B', borderBottom: activeTab === 'CLOSED' ? '2px solid #0047AB' : 'none', paddingBottom: '4px' }}
          >
            Closed Trades Log
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {tradeHistory
            .filter(t => activeTab === 'POSITIONS' ? t.status === 'OPEN' : t.status === 'CLOSED')
            .map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid #F1F5F9' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>{item.symbol}</span>
                    <span style={{ fontSize: '9px', fontWeight: '700', padding: '1px 6px', borderRadius: '4px', background: item.type.includes('ALGO') ? '#EFF6FF' : '#F8FAFC', color: '#0047AB' }}>
                      {item.type}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>
                    {item.date} • Qty: {item.qty} • Buy: ₹{item.buy} • Sell/LTP: ₹{item.sell}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: item.pnl >= 0 ? '#10B981' : '#EF4444' }}>
                    {item.pnl >= 0 ? '+' : ''}₹{item.pnl.toLocaleString()}
                  </div>
                  <span className={`badge ${item.status === 'OPEN' ? 'badge-green' : 'badge-blue'}`} style={{ fontSize: '9px', marginTop: '2px' }}>
                    {item.status}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Export Modal */}
      {exportModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '420px', borderRadius: '16px', padding: '20px' }}>
            
            {exportSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={44} color="#10B981" style={{ margin: '0 auto 10px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>Export Request Generated</h3>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  Your {exportSuccess} has been generated and sent to your registered email!
                </p>
              </div>
            ) : (
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#003366', marginBottom: '12px' }}>
                  Export P&L Reports
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <button 
                    onClick={() => handleExportAction('PDF P&L Statement')}
                    style={{ padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', background: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '700', color: '#0F172A', cursor: 'pointer' }}
                  >
                    <FileText size={18} color="#EF4444" />
                    <span>Download PDF P&L Statement</span>
                  </button>

                  <button 
                    onClick={() => handleExportAction('Excel Trade Log')}
                    style={{ padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', background: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '700', color: '#0F172A', cursor: 'pointer' }}
                  >
                    <FileSpreadsheet size={18} color="#10B981" />
                    <span>Download Excel Trade History (.xlsx)</span>
                  </button>

                  <button 
                    onClick={() => handleExportAction('Automated Daily Report Schedule')}
                    style={{ padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', background: '#F8FAFC', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px', fontWeight: '700', color: '#0F172A', cursor: 'pointer' }}
                  >
                    <Mail size={18} color="#0047AB" />
                    <span>Schedule Daily Performance Email</span>
                  </button>
                </div>

                <button 
                  onClick={() => setExportModal(false)}
                  style={{ width: '100%', padding: '10px', marginTop: '16px', background: '#E2E8F0', border: 'none', borderRadius: '8px', fontWeight: '700', color: '#475569', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
