import React, { useState } from 'react';
import Logo from '../components/Logo';
import { Check, ArrowRight, ArrowLeft, Shield, Building2, Upload, AlertCircle } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: 'Sachin Tendulkar',
    dob: '24/04/1973',
    gender: 'Male',
    mobile: '9876543210',
    email: 'sachin@travancore.com',
    pan: 'ABCDE1234F',
    aadhaar: '901234567890',
    address: 'Bandra West, Sea Face View',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400050',
    occupation: 'Business / Professional',
    income: '> ₹25 Lakhs',
    experience: 'Expert',
    risk: 'Balanced',
    objective: 'Growth & Income',
    accountName: 'Sachin Tendulkar',
    accountNumber: '91801004567',
    ifsc: 'HDFC0001234',
    bankName: 'HDFC Bank',
    package: 'BALANCED', // CAPITAL_PROTECT, BALANCED, AGGRESSIVE
    markets: ['Indian Markets', 'Commodity Markets', 'Crypto Markets']
  });

  const steps = [
    { num: 1, label: 'Personal' },
    { num: 2, label: 'Contact' },
    { num: 3, label: 'KYC' },
    { num: 4, label: 'Address' },
    { num: 5, label: 'Profile' },
    { num: 6, label: 'Bank Details' },
    { num: 7, label: 'Trading Setup' }
  ];

  const handleNext = () => {
    if (currentStep < 7) setCurrentStep(currentStep + 1);
    else onComplete();
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  return (
    <div style={{ minHeight: '100vh', background: '#F4F6F9', padding: '16px', maxWidth: '480px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '16px' }}>
        <Logo size="small" />
        <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#003366', marginTop: '12px' }}>Create Your Account</h2>
        <p style={{ fontSize: '12px', color: '#64748B' }}>A few simple steps to get started</p>
      </div>

      {/* Step Progress Tracker Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', position: 'relative' }}>
        {steps.map((s) => (
          <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              background: s.num <= currentStep ? '#0047AB' : '#E2E8F0',
              color: s.num <= currentStep ? '#FFF' : '#64748B',
              fontWeight: '700', fontSize: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              {s.num < currentStep ? <Check size={14} /> : s.num}
            </div>
            <span style={{ fontSize: '9px', fontWeight: '600', color: s.num === currentStep ? '#0047AB' : '#64748B', marginTop: '4px' }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      <div className="card-panel">
        <div style={{ fontSize: '11px', color: '#0047AB', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>
          Step {currentStep} of 7
        </div>
        <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#003366', marginBottom: '16px' }}>
          {steps[currentStep - 1].label} Details
        </h3>

        {/* STEP 1: Personal Details */}
        {currentStep === 1 && (
          <div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Full Name *</label>
              <input type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Date of Birth *</label>
              <input type="text" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Gender</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '4px' }}>
                {['Male', 'Female', 'Other'].map(g => (
                  <button key={g} type="button" onClick={() => setFormData({...formData, gender: g})} style={{ padding: '8px', borderRadius: '8px', border: '1px solid', borderColor: formData.gender === g ? '#0047AB' : '#CBD5E1', background: formData.gender === g ? '#EFF6FF' : '#FFF', color: formData.gender === g ? '#0047AB' : '#475569', fontWeight: '700' }}>{g}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Contact Details */}
        {currentStep === 2 && (
          <div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Mobile Number (+91) *</label>
              <input type="text" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Email Address *</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px' }} />
            </div>
          </div>
        )}

        {/* STEP 3: Identity & KYC */}
        {currentStep === 3 && (
          <div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>PAN Number *</label>
              <input type="text" value={formData.pan} onChange={e => setFormData({...formData, pan: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Aadhaar Number (Optional)</label>
              <input type="text" value={formData.aadhaar} onChange={e => setFormData({...formData, aadhaar: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px' }} />
            </div>
            <div style={{ border: '2px dashed #CBD5E1', borderRadius: '12px', padding: '16px', textAlign: 'center', background: '#F8FAFC' }}>
              <Upload size={24} color="#0047AB" />
              <div style={{ fontSize: '12px', fontWeight: '700', color: '#003366', marginTop: '6px' }}>Tap to upload ID document</div>
              <div style={{ fontSize: '10px', color: '#94A3B8' }}>Aadhaar / PAN / Passport (JPG, PNG, PDF max 5MB)</div>
            </div>
          </div>
        )}

        {/* STEP 4: Address Details */}
        {currentStep === 4 && (
          <div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Residential Address *</label>
              <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>City / District *</label>
                <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>State *</label>
                <input type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px' }} />
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Investor Profile */}
        {currentStep === 5 && (
          <div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Occupation *</label>
              <select value={formData.occupation} onChange={e => setFormData({...formData, occupation: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px' }}>
                <option>Salaried</option><option>Business / Professional</option><option>Student</option><option>Retired</option>
              </select>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Annual Income Range *</label>
              <select value={formData.income} onChange={e => setFormData({...formData, income: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px' }}>
                <option>&lt; ₹1 Lakh</option><option>₹1 Lakh - ₹5 Lakhs</option><option>₹5 Lakhs - ₹25 Lakhs</option><option>&gt; ₹25 Lakhs</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 6: Bank Details */}
        {currentStep === 6 && (
          <div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Account Holder Name *</label>
              <input type="text" value={formData.accountName} onChange={e => setFormData({...formData, accountName: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>Bank Account Number *</label>
              <input type="text" value={formData.accountNumber} onChange={e => setFormData({...formData, accountNumber: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px' }} />
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569' }}>IFSC Code *</label>
              <input type="text" value={formData.ifsc} onChange={e => setFormData({...formData, ifsc: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #CBD5E1', marginTop: '4px' }} />
            </div>
          </div>
        )}

        {/* STEP 7: Customise Trading Setup (Page 14) */}
        {currentStep === 7 && (
          <div>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#003366', marginBottom: '8px' }}>1. Select Your Investment Package</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginBottom: '16px' }}>
              {[
                { type: 'CAPITAL_PROTECT', title: 'CAPITAL PROTECT', range: '20% - 30%', bg: '#E6F4EA', color: '#10B981' },
                { type: 'BALANCED', title: 'BALANCED', range: '30% - 60%', bg: '#FEF7E0', color: '#D97706' },
                { type: 'AGGRESSIVE', title: 'AGGRESSIVE', range: '50% - 70%', bg: '#FCE8E6', color: '#EF4444' }
              ].map(p => (
                <div key={p.type} onClick={() => setFormData({...formData, package: p.type})} style={{ background: p.bg, borderRadius: '12px', padding: '10px 4px', textAlign: 'center', border: '2px solid', borderColor: formData.package === p.type ? p.color : 'transparent', cursor: 'pointer' }}>
                  <div style={{ fontSize: '9px', fontWeight: '800', color: p.color }}>{p.title}</div>
                  <div style={{ fontSize: '12px', fontWeight: '800', color: '#0F172A', marginTop: '4px' }}>{p.range}</div>
                  <div style={{ fontSize: '8px', color: '#475569' }}>return / mo</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '13px', fontWeight: '700', color: '#003366', marginBottom: '8px' }}>2. Select Markets & Instruments</div>
            <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '10px', border: '1px solid #E2E8F0', fontSize: '12px' }}>
              <div style={{ fontWeight: '700', color: '#0F172A' }}>✓ Indian Markets (NIFTY, SENSEX, STOCKS)</div>
              <div style={{ fontWeight: '700', color: '#0F172A', marginTop: '4px' }}>✓ Commodity Markets (GOLD, SILVER, CRUDE OIL)</div>
              <div style={{ fontWeight: '700', color: '#0F172A', marginTop: '4px' }}>✓ Crypto Markets (BTC, ETH, SOL)</div>
            </div>
          </div>
        )}

        {/* Buttons Bar */}
        <div style={{ display: 'flex', gap: '8px', marginTop: '20px' }}>
          {currentStep > 1 && (
            <button type="button" onClick={handleBack} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', background: '#FFF', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <ArrowLeft size={16} /> Back
            </button>
          )}
          <button type="button" onClick={handleNext} style={{ flex: 2, padding: '12px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #003366 0%, #0047AB 100%)', color: '#FFF', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
            <span>{currentStep === 7 ? 'Complete Setup' : 'Continue'}</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
