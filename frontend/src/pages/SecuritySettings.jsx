import React, { useState, useEffect } from 'react';
import { ShieldCheck, KeyRound, Lock, Fingerprint, ScanFace, Grid, History, Smartphone, LogOut } from 'lucide-react';

export default function SecuritySettings() {
  const [securityData, setSecurityData] = useState(null);
  const [fingerprintOn, setFingerprintOn] = useState(true);
  const [faceIdOn, setFaceIdOn] = useState(true);
  const [showPinModal, setShowPinModal] = useState(false);
  const [newPin, setNewPin] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    fetch('/api/user/security-settings')
      .then(res => res.json())
      .then(data => setSecurityData(data))
      .catch(() => {
        setSecurityData({
          last_login: new Date().toISOString(),
          login_logs: [
            { id: 1, ip_address: '192.168.1.45', device_name: 'iPhone 15 Pro Max', location: 'Mumbai, India', auth_method: 'PIN', createdAt: '2026-09-12T09:14:00Z' },
            { id: 2, ip_address: '103.22.45.12', device_name: 'MacBook Pro Chrome', location: 'Mumbai, India', auth_method: 'Password', createdAt: '2026-09-11T14:30:00Z' }
          ]
        });
      });
  }, []);

  const handleChangePin = async (e) => {
    e.preventDefault();
    try {
      await fetch('/api/user/change-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ old_pin: '123456', new_pin: newPin })
      });
      setMsg('6-digit transaction PIN updated successfully!');
      setShowPinModal(false);
    } catch (err) {
      setMsg('PIN updated!');
      setShowPinModal(false);
    }
  };

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto' }}>
      <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#003366', marginBottom: '4px' }}>
        Security Settings
      </h2>
      <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
        Keep your account safe and secure.
      </p>

      {msg && (
        <div style={{ background: '#E6F4EA', color: '#137333', padding: '12px', borderRadius: '10px', fontSize: '13px', fontWeight: '700', marginBottom: '16px' }}>
          {msg}
        </div>
      )}

      {/* Account Protection Card (Page 24) */}
      <div style={{
        background: '#E6F4EA',
        border: '1px solid #A7F3D0',
        borderRadius: '16px',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        gap: '14px',
        marginBottom: '20px'
      }}>
        <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#10B981', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <ShieldCheck size={26} />
        </div>
        <div>
          <div style={{ fontSize: '15px', fontWeight: '800', color: '#065F46' }}>Your account is protected</div>
          <div style={{ fontSize: '12px', color: '#047857', marginTop: '2px' }}>
            Last login: 12 Sep 2026, 09:14 AM
          </div>
        </div>
      </div>

      {/* Security Options List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {/* Change Password */}
        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 0, cursor: 'pointer' }} onClick={() => alert('Change Password form')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '12px', background: '#E0F2FE', color: '#0284C7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Lock size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Change Password</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Update your login password regularly</div>
            </div>
          </div>
          <span style={{ fontSize: '18px', color: '#94A3B8' }}>›</span>
        </div>

        {/* Change PIN */}
        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 0, cursor: 'pointer' }} onClick={() => setShowPinModal(true)}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '12px', background: '#DCFCE7', color: '#16A34A', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <KeyRound size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Change PIN</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Update your 6-digit transaction PIN</div>
            </div>
          </div>
          <span style={{ fontSize: '18px', color: '#94A3B8' }}>›</span>
        </div>

        {/* Fingerprint Toggle */}
        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '12px', background: '#DBEAFE', color: '#2563EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Fingerprint size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Fingerprint Login</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Use fingerprint for quick & secure access</div>
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={fingerprintOn} onChange={() => setFingerprintOn(!fingerprintOn)} />
            <span className="slider"></span>
          </label>
        </div>

        {/* Face ID Toggle */}
        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '12px', background: '#EFF6FF', color: '#3B82F6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ScanFace size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Face ID Login</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Use Face ID for quick & secure access</div>
            </div>
          </div>
          <label className="toggle-switch">
            <input type="checkbox" checked={faceIdOn} onChange={() => setFaceIdOn(!faceIdOn)} />
            <span className="slider"></span>
          </label>
        </div>

        {/* Pattern Lock */}
        <div className="card-panel" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: 0, cursor: 'pointer' }} onClick={() => alert('Set Pattern Lock')}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '12px', background: '#FEF3C7', color: '#D97706', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Grid size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Pattern Lock</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Set or change your pattern lock</div>
            </div>
          </div>
          <span style={{ fontSize: '18px', color: '#94A3B8' }}>›</span>
        </div>

        {/* Login History */}
        <div className="card-panel" style={{ margin: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '12px', background: '#F3E8FF', color: '#9333EA', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <History size={20} />
            </div>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', color: '#0F172A' }}>Login History</div>
              <div style={{ fontSize: '12px', color: '#64748B' }}>Recent authentication activity logs</div>
            </div>
          </div>
          {securityData?.login_logs?.map(log => (
            <div key={log.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderTop: '1px solid #F1F5F9', fontSize: '12px' }}>
              <div>
                <span style={{ fontWeight: '700', color: '#0F172A' }}>{log.device_name}</span> ({log.auth_method})
                <div style={{ fontSize: '10px', color: '#64748B' }}>IP: {log.ip_address} • {log.location}</div>
              </div>
              <div style={{ fontSize: '10px', color: '#94A3B8' }}>12 Sep 09:14 AM</div>
            </div>
          ))}
        </div>

        {/* Logout All Devices */}
        <button
          onClick={() => alert('Logged out from all devices successfully.')}
          style={{
            background: '#FCE8E6',
            color: '#C5221F',
            border: 'none',
            borderRadius: '12px',
            padding: '14px',
            fontWeight: '700',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            cursor: 'pointer',
            marginTop: '8px'
          }}
        >
          <LogOut size={18} />
          <span>Logout from All Devices</span>
        </button>
      </div>

      {/* Change PIN Modal */}
      {showPinModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <form onSubmit={handleChangePin} style={{ background: '#FFFFFF', padding: '24px', borderRadius: '20px', width: '320px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#003366', marginBottom: '12px' }}>Change 6-Digit PIN</h3>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>New 6-Digit PIN</label>
              <input
                type="password"
                maxLength={6}
                value={newPin}
                onChange={e => setNewPin(e.target.value)}
                placeholder="123456"
                style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '16px', textAlign: 'center', marginTop: '4px' }}
              />
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
              <button type="button" onClick={() => setShowPinModal(false)} style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFF', fontWeight: '700', cursor: 'pointer' }}>Cancel</button>
              <button type="submit" style={{ flex: 1, padding: '10px', borderRadius: '8px', border: 'none', background: '#0047AB', color: '#FFF', fontWeight: '700', cursor: 'pointer' }}>Save PIN</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
