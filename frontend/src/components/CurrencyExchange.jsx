import React, { useState } from 'react';
import { DollarSign, ArrowLeftRight, RefreshCw, X, Check } from 'lucide-react';

export default function CurrencyExchange({ currentCurrency = 'INR', onCurrencyChange, onClose }) {
  const [amount, setAmount] = useState('100000');
  const [fromCurr, setFromCurr] = useState('INR');
  const [toCurr, setToCurr] = useState('USD');

  const exchangeRates = {
    INR: 1,
    USD: 0.012, // 1 INR = 0.012 USD (~83.33 INR/USD)
    USDT: 0.012,
    EUR: 0.011, // 1 INR = 0.011 EUR
    AED: 0.044  // 1 INR = 0.044 AED
  };

  const currencySymbols = {
    INR: '₹',
    USD: '$',
    USDT: '₮',
    EUR: '€',
    AED: 'د.إ'
  };

  const convertedAmount = (parseFloat(amount || 0) * (exchangeRates[toCurr] / exchangeRates[fromCurr])).toFixed(2);

  const currencies = [
    { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
    { code: 'USD', name: 'US Dollar', symbol: '$' },
    { code: 'USDT', name: 'Tether Crypto', symbol: '₮' },
    { code: 'EUR', name: 'Euro', symbol: '€' },
    { code: 'AED', name: 'UAE Dirham', symbol: 'د.إ' }
  ];

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
        maxWidth: '420px',
        borderRadius: '16px',
        padding: '20px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.25)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DollarSign size={20} color="#0047AB" />
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#003366' }}>Multi-Currency Converter</h3>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="#64748B" /></button>
        </div>

        {/* Currency Selector Grid */}
        <div style={{ background: '#F8FAFC', padding: '14px', borderRadius: '12px', marginBottom: '16px' }}>
          <label style={{ fontSize: '11px', fontWeight: '700', color: '#64748B', display: 'block', marginBottom: '6px' }}>Set Preferred App Display Currency</label>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
            {currencies.map(c => (
              <button
                key={c.code}
                onClick={() => onCurrencyChange && onCurrencyChange(c.code)}
                style={{
                  padding: '8px',
                  borderRadius: '8px',
                  border: currentCurrency === c.code ? '2px solid #0047AB' : '1px solid #CBD5E1',
                  background: currentCurrency === c.code ? '#EFF6FF' : '#FFFFFF',
                  color: currentCurrency === c.code ? '#0047AB' : '#475569',
                  fontSize: '12px',
                  fontWeight: '800',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px'
                }}
              >
                <span>{c.symbol} {c.code}</span>
                {currentCurrency === c.code && <Check size={12} />}
              </button>
            ))}
          </div>
        </div>

        {/* Live Converter */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div>
            <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569' }}>Amount to Convert</label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '14px', fontWeight: '800' }}
              />
              <select 
                value={fromCurr} 
                onChange={(e) => setFromCurr(e.target.value)}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: '800' }}
              >
                {currencies.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
              </select>
            </div>
          </div>

          <div style={{ textAlign: 'center', margin: '4px 0' }}>
            <ArrowLeftRight size={18} color="#0047AB" />
          </div>

          <div>
            <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569' }}>Converted Result</label>
            <div style={{ display: 'flex', gap: '8px', marginTop: '4px' }}>
              <input
                type="text"
                readOnly
                value={`${currencySymbols[toCurr]} ${parseFloat(convertedAmount).toLocaleString()}`}
                style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#F8FAFC', fontSize: '14px', fontWeight: '800', color: '#10B981' }}
              />
              <select 
                value={toCurr} 
                onChange={(e) => setToCurr(e.target.value)}
                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', fontWeight: '800' }}
              >
                {currencies.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
              </select>
            </div>
          </div>
        </div>

        <button 
          onClick={onClose}
          style={{ width: '100%', padding: '12px', marginTop: '16px', background: '#0047AB', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
