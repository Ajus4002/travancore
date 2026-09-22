import React from 'react';

export default function Logo({ size = 'medium', light = false }) {
  const isSmall = size === 'small';
  const isLarge = size === 'large';
  
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: isSmall ? '8px' : '12px' }}>
      {/* Padmanabhaswamy Temple Icon Symbol with Growth Arrow */}
      <div style={{
        width: isSmall ? 36 : isLarge ? 64 : 48,
        height: isSmall ? 36 : isLarge ? 64 : 48,
        borderRadius: '50%',
        background: 'linear-gradient(135deg, #002244 0%, #0047AB 100%)',
        border: '2px solid #D4AF37',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#FFFFFF',
        boxShadow: '0 4px 10px rgba(0,51,102,0.3)',
        flexShrink: 0
      }}>
        <svg width={isSmall ? 22 : isLarge ? 38 : 28} height={isSmall ? 22 : isLarge ? 38 : 28} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          {/* Temple Gopuram Tower Silhouette */}
          <path d="M12 2L8 7H16L12 2Z" fill="#D4AF37" stroke="none" />
          <path d="M7 7H17V11H7V7Z" fill="currentColor" opacity="0.3" />
          <path d="M6 11H18V16H6V11Z" fill="currentColor" opacity="0.5" />
          <path d="M5 16H19V22H5V16Z" fill="currentColor" />
          {/* Growth Chart Arrow */}
          <path d="M4 20L10 14L14 17L20 8" stroke="#D4AF37" strokeWidth="2.5" />
          <polyline points="15 8 20 8 20 13" stroke="#D4AF37" strokeWidth="2.5" />
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span style={{
          fontSize: isSmall ? '13px' : isLarge ? '22px' : '16px',
          fontWeight: '800',
          color: light ? '#FFFFFF' : '#003366',
          letterSpacing: '0.5px',
          lineHeight: 1.1
        }}>
          TRAVANCORE
        </span>
        <span style={{
          fontSize: isSmall ? '8px' : isLarge ? '10px' : '9px',
          fontWeight: '700',
          color: '#D4AF37',
          letterSpacing: '1px',
          marginTop: '2px'
        }}>
          RESEARCH & INVESTMENTS LTD
        </span>
        {!isSmall && (
          <span style={{
            fontSize: '8px',
            color: light ? '#93C5FD' : '#475569',
            fontStyle: 'italic',
            marginTop: '1px'
          }}>
            Invest · Trade · Grow
          </span>
        )}
      </div>
    </div>
  );
}
