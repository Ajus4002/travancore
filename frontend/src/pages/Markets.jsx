import React, { useState, useEffect } from 'react';
import { Search, Filter, TrendingUp, TrendingDown, Clock, ShieldCheck, X, CheckCircle2 } from 'lucide-react';

export default function Markets({ onNavigate }) {
  const [activeTab, setActiveTab] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedInstrument, setSelectedInstrument] = useState(null);
  const [orderModal, setOrderModal] = useState(false);
  const [orderType, setOrderType] = useState('BUY'); // BUY or SELL
  const [orderMode, setOrderMode] = useState('INTRADAY'); // INTRADAY or DELIVERY
  const [quantity, setQuantity] = useState(1);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [filterModal, setFilterModal] = useState(false);

  const initialInstruments = [
    { id: '1', symbol: 'NIFTY 50', name: 'Nifty 50 Index', category: 'INDIAN', exchange: 'NSE', ltp: 25017.35, change_amount: 162.40, change_percent: 0.65, hours: '09:00 AM - 04:00 PM', days: 'Mon - Fri', currency: '₹' },
    { id: '2', symbol: 'SENSEX', name: 'BSE Sensex Index', category: 'INDIAN', exchange: 'BSE', ltp: 81697.76, change_amount: 520.90, change_percent: 0.64, hours: '09:00 AM - 04:00 PM', days: 'Mon - Fri', currency: '₹' },
    { id: '3', symbol: 'BANK NIFTY', name: 'Bank Nifty Index', category: 'INDIAN', exchange: 'NSE', ltp: 51328.45, change_amount: 310.25, change_percent: 0.61, hours: '09:00 AM - 04:00 PM', days: 'Mon - Fri', currency: '₹' },
    { id: '4', symbol: 'RELIANCE', name: 'Reliance Industries Ltd.', category: 'INDIAN', exchange: 'NSE', ltp: 2914.75, change_amount: 45.20, change_percent: 1.58, hours: '09:00 AM - 04:00 PM', days: 'Mon - Fri', currency: '₹' },
    { id: '5', symbol: 'TCS', name: 'Tata Consultancy Services', category: 'INDIAN', exchange: 'NSE', ltp: 3789.10, change_amount: 20.35, change_percent: 0.54, hours: '09:00 AM - 04:00 PM', days: 'Mon - Fri', currency: '₹' },
    
    { id: '6', symbol: 'GOLD OCT FUT', name: 'Gold 1KG Futures', category: 'COMMODITY', exchange: 'MCX', ltp: 72358.00, change_amount: 280.00, change_percent: 0.39, hours: '06:00 PM - 12:00 AM', days: 'Mon - Fri', currency: '₹' },
    { id: '7', symbol: 'SILVER FUT', name: 'Silver 30KG Futures', category: 'COMMODITY', exchange: 'MCX', ltp: 83420.00, change_amount: 610.00, change_percent: 0.74, hours: '06:00 PM - 12:00 AM', days: 'Mon - Fri', currency: '₹' },
    { id: '8', symbol: 'CRUDE OIL', name: 'Crude Oil 100 BBL', category: 'COMMODITY', exchange: 'MCX', ltp: 6847.00, change_amount: -18.00, change_percent: -0.26, hours: '06:00 PM - 12:00 AM', days: 'Mon - Fri', currency: '₹' },
    { id: '9', symbol: 'NATURAL GAS', name: 'Natural Gas Futures', category: 'COMMODITY', exchange: 'MCX', ltp: 245.30, change_amount: 2.80, change_percent: 1.16, hours: '06:00 PM - 12:00 AM', days: 'Mon - Fri', currency: '₹' },

    { id: '10', symbol: 'BITCOIN', name: 'BTC / USDT Perpetual', category: 'CRYPTO', exchange: 'CRYPTO', ltp: 58421.35, change_amount: 1245.00, change_percent: 2.18, hours: '24x7 / All 7 Days', days: '24x7', currency: '$' },
    { id: '11', symbol: 'ETHEREUM', name: 'ETH / USDT Perpetual', category: 'CRYPTO', exchange: 'CRYPTO', ltp: 2432.10, change_amount: 38.50, change_percent: 1.61, hours: '24x7 / All 7 Days', days: '24x7', currency: '$' },
    { id: '12', symbol: 'SOLANA', name: 'SOL / USDT Perpetual', category: 'CRYPTO', exchange: 'CRYPTO', ltp: 142.35, change_amount: -1.80, change_percent: -1.25, hours: '24x7 / All 7 Days', days: '24x7', currency: '$' }
  ];

  const filteredInstruments = initialInstruments.filter((item) => {
    const matchesCategory = 
      activeTab === 'ALL' ? true :
      activeTab === 'INDIAN' ? item.category === 'INDIAN' :
      activeTab === 'COMMODITY' ? item.category === 'COMMODITY' :
      activeTab === 'CRYPTO' ? item.category === 'CRYPTO' :
      activeTab === 'GAINERS' ? item.change_percent > 0 :
      activeTab === 'LOSERS' ? item.change_percent < 0 : true;

    const matchesSearch = item.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.name.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const handleOpenOrder = (inst, side) => {
    setSelectedInstrument(inst);
    setOrderType(side);
    setOrderSuccess(false);
    setQuantity(1);
    setOrderModal(true);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setOrderSuccess(true);
    setTimeout(() => {
      setOrderModal(false);
      setOrderSuccess(false);
    }, 1800);
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', paddingBottom: '80px' }}>
      
      {/* Header Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#003366' }}>Live Watchlist & Markets</h2>
          <p style={{ fontSize: '12px', color: '#64748B' }}>Indian Equities, MCX Commodities & 24x7 Crypto</p>
        </div>
        <button 
          onClick={() => setFilterModal(true)}
          style={{ background: '#F1F5F9', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: '700', color: '#003366', cursor: 'pointer' }}
        >
          <Filter size={14} />
          <span>Filters</span>
        </button>
      </div>

      {/* Search Input Bar */}
      <div style={{ position: 'relative', marginBottom: '16px' }}>
        <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
        <input 
          type="text"
          placeholder="Search stock, index, commodity, crypto..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 12px 10px 38px',
            borderRadius: '10px',
            border: '1px solid #CBD5E1',
            fontSize: '13px',
            outline: 'none',
            background: '#FFFFFF'
          }}
        />
      </div>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '12px', scrollbarWidth: 'none' }}>
        {[
          { id: 'ALL', label: 'All Markets' },
          { id: 'INDIAN', label: 'Indian Equity & F&O' },
          { id: 'COMMODITY', label: 'Commodities' },
          { id: 'CRYPTO', label: 'Crypto (24x7)' },
          { id: 'GAINERS', label: 'Top Gainers' },
          { id: 'LOSERS', label: 'Top Losers' }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: 'none',
              fontSize: '12px',
              fontWeight: '700',
              whiteSpace: 'nowrap',
              cursor: 'pointer',
              background: activeTab === tab.id ? '#0047AB' : '#E2E8F0',
              color: activeTab === tab.id ? '#FFFFFF' : '#475569'
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Market Instrument List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filteredInstruments.map((item) => (
          <div 
            key={item.id}
            className="card-panel"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: 0, padding: '14px 16px' }}
          >
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>{item.symbol}</span>
                <span className="badge badge-blue" style={{ fontSize: '9px' }}>{item.exchange}</span>
              </div>
              <div style={{ fontSize: '11px', color: '#64748B', marginTop: '2px' }}>{item.name}</div>
              <div style={{ fontSize: '10px', color: '#94A3B8', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={10} />
                <span>Hours: {item.hours}</span>
              </div>
            </div>

            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
              <div style={{ fontSize: '15px', fontWeight: '800', color: '#0F172A' }}>
                {item.currency}{item.ltp.toLocaleString()}
              </div>
              <div style={{ 
                fontSize: '11px', 
                fontWeight: '700', 
                color: item.change_percent >= 0 ? '#10B981' : '#EF4444',
                display: 'flex',
                alignItems: 'center',
                gap: '2px'
              }}>
                {item.change_percent >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                <span>{item.change_percent >= 0 ? '+' : ''}{item.change_amount} ({item.change_percent >= 0 ? '+' : ''}{item.change_percent}%)</span>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
                <button 
                  onClick={() => handleOpenOrder(item, 'BUY')}
                  style={{ background: '#10B981', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}
                >
                  BUY
                </button>
                <button 
                  onClick={() => handleOpenOrder(item, 'SELL')}
                  style={{ background: '#EF4444', color: '#FFFFFF', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '11px', fontWeight: '800', cursor: 'pointer' }}
                >
                  SELL
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Order Execution Modal */}
      {orderModal && selectedInstrument && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '600px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', padding: '20px', animation: 'slideUp 0.2s ease-out' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>{selectedInstrument.symbol}</span>
                  <span style={{ 
                    padding: '2px 8px', 
                    borderRadius: '4px', 
                    fontSize: '11px', 
                    fontWeight: '800',
                    background: orderType === 'BUY' ? '#10B981' : '#EF4444',
                    color: '#FFFFFF'
                  }}>
                    {orderType}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: '#64748B' }}>LTP: {selectedInstrument.currency}{selectedInstrument.ltp.toLocaleString()}</div>
              </div>
              <button onClick={() => setOrderModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#64748B" />
              </button>
            </div>

            {orderSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 0' }}>
                <CheckCircle2 size={48} color="#10B981" style={{ margin: '0 auto 12px' }} />
                <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>Order Executed Successfully!</h3>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  {orderType} {quantity} qty of {selectedInstrument.symbol} at {selectedInstrument.currency}{selectedInstrument.ltp}
                </p>
              </div>
            ) : (
              <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                
                {/* Product Type Switcher */}
                <div style={{ display: 'flex', background: '#F1F5F9', borderRadius: '10px', padding: '3px' }}>
                  <button 
                    type="button"
                    onClick={() => setOrderMode('INTRADAY')}
                    style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', background: orderMode === 'INTRADAY' ? '#FFFFFF' : 'transparent', color: orderMode === 'INTRADAY' ? '#003366' : '#64748B' }}
                  >
                    Intraday (MIS)
                  </button>
                  <button 
                    type="button"
                    onClick={() => setOrderMode('DELIVERY')}
                    style={{ flex: 1, padding: '8px', border: 'none', borderRadius: '8px', fontSize: '12px', fontWeight: '700', cursor: 'pointer', background: orderMode === 'DELIVERY' ? '#FFFFFF' : 'transparent', color: orderMode === 'DELIVERY' ? '#003366' : '#64748B' }}
                  >
                    Longterm / Delivery (CNC)
                  </button>
                </div>

                {/* Quantity Input */}
                <div>
                  <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Quantity</label>
                  <input 
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', fontWeight: '700' }}
                  />
                </div>

                {/* Estimated Value */}
                <div style={{ background: '#F8FAFC', padding: '12px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', fontSize: '12px' }}>
                  <span style={{ color: '#64748B' }}>Total Margin Required:</span>
                  <span style={{ fontWeight: '800', color: '#0F172A' }}>
                    {selectedInstrument.currency}{(quantity * selectedInstrument.ltp).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Submit Order Button */}
                <button 
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '10px',
                    border: 'none',
                    background: orderType === 'BUY' ? '#10B981' : '#EF4444',
                    color: '#FFFFFF',
                    fontSize: '15px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    marginTop: '6px'
                  }}
                >
                  PLACE {orderType} ORDER
                </button>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Filter Modal */}
      {filterModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '400px', borderRadius: '16px', padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#003366' }}>Filter Market Instruments</h3>
              <button onClick={() => setFilterModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="#64748B" /></button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px' }}>
              <div>
                <label style={{ fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Exchange</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                  <option>All Exchanges (NSE, BSE, MCX, Crypto)</option>
                  <option>NSE</option>
                  <option>BSE</option>
                  <option>MCX</option>
                  <option>CRYPTO</option>
                </select>
              </div>

              <div>
                <label style={{ fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Sort By</label>
                <select style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
                  <option>Top Gainers First</option>
                  <option>Top Losers First</option>
                  <option>Highest Volume</option>
                  <option>Alphabetical (A-Z)</option>
                </select>
              </div>

              <button 
                onClick={() => setFilterModal(false)}
                style={{ width: '100%', padding: '12px', background: '#0047AB', color: '#FFFFFF', borderRadius: '8px', border: 'none', fontWeight: '800', marginTop: '10px', cursor: 'pointer' }}
              >
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
