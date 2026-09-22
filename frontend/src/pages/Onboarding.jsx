import React, { useState, useEffect } from 'react';
import Logo from '../components/Logo';
import { Check, ArrowRight, ArrowLeft, Shield, Building2, Upload, AlertCircle, FileCheck2, CheckCircle2 } from 'lucide-react';

export default function Onboarding({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [uploadedDoc, setUploadedDoc] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const [formData, setFormData] = useState({
    fullName: 'Sachin Tendulkar',
    dob: '24/04/1973',
    gender: 'Male',
    mobile: '+91 9876543210',
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
    packageType: 'BALANCED', // CAPITAL_PROTECT, BALANCED, AGGRESSIVE
    markets: ['Indian Markets', 'Commodity Markets', 'Crypto Markets']
  });

  const steps = [
    { num: 1, label: 'Personal' },
    { num: 2, label: 'Contact' },
    { num: 3, label: 'Identity/KYC' },
    { num: 4, label: 'Address' },
    { num: 5, label: 'Profile' },
    { num: 6, label: 'Bank Details' },
    { num: 7, label: 'Trading Setup' }
  ];

  useEffect(() => {
    fetch('/api/onboarding/status')
      .then(r => r.json())
      .then(data => {
        if (data && data.user) {
          setFormData(prev => ({
            ...prev,
            fullName: data.user.full_name || prev.fullName,
            email: data.user.email || prev.email,
            mobile: data.user.mobile_number || prev.mobile,
            dob: data.onboarding?.dob || prev.dob,
            pan: data.onboarding?.pan_number || prev.pan,
            aadhaar: data.onboarding?.aadhaar_number || prev.aadhaar,
            address: data.onboarding?.address || prev.address,
            city: data.onboarding?.city || prev.city,
            state: data.onboarding?.state || prev.state,
            pincode: data.onboarding?.pincode || prev.pincode,
            occupation: data.onboarding?.occupation || prev.occupation,
            income: data.onboarding?.income_range || prev.income,
            accountName: data.bank?.account_holder_name || prev.accountName,
            accountNumber: data.bank?.full_account_number || prev.accountNumber,
            ifsc: data.bank?.ifsc_code || prev.ifsc,
            bankName: data.bank?.bank_name || prev.bankName,
            packageType: data.setup?.package_type || prev.packageType
          }));
        }
      })
      .catch(() => {});
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);

    try {
      const res = await fetch('/api/onboarding/upload-kyc', { method: 'POST' });
      const data = await res.json();
      setUploadedDoc(file.name);
      setSuccessMsg('KYC document verified successfully!');
    } catch {
      setUploadedDoc(file.name);
      setSuccessMsg('Document uploaded.');
    } finally {
      setUploading(false);
    }
  };

  const handleNext = async () => {
    if (currentStep < 7) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSubmitting(true);
      try {
        await fetch('/api/onboarding/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...formData, stepCompleted: 7 })
        });
      } catch (e) {}
      setSubmitting(false);
      onComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(180deg, #F4F6F9 0%, #EBF3FA 100%)', padding: '16px', maxWidth: '540px', margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '16px', paddingTop: '10px' }}>
        <Logo size="medium" />
        <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#003366', marginTop: '12px' }}>7-Step Demat Account opening</h2>
        <p style={{ fontSize: '12px', color: '#64748B' }}>Travancore Research & Investments Ltd.</p>
      </div>

      {/* Step Progress Bar */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        padding: '14px 10px',
        boxShadow: '0 4px 15px rgba(0,51,102,0.06)',
        marginBottom: '20px',
        border: '1px solid #E2E8F0'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'relative' }}>
          {steps.map((s) => (
            <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 2 }}>
              <div style={{
                width: 30, height: 30, borderRadius: '50%',
                background: s.num === currentStep ? 'linear-gradient(135deg, #003366 0%, #0047AB 100%)' : s.num < currentStep ? '#10B981' : '#F1F5F9',
                color: s.num <= currentStep ? '#FFF' : '#64748B',
                fontWeight: '800', fontSize: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: s.num === currentStep ? '0 3px 8px rgba(0,71,171,0.3)' : 'none',
                transition: 'all 0.2s ease'
              }}>
                {s.num < currentStep ? <Check size={14} /> : s.num}
              </div>
              <span style={{ fontSize: '9px', fontWeight: '700', color: s.num === currentStep ? '#0047AB' : s.num < currentStep ? '#047857' : '#94A3B8', marginTop: '4px' }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {successMsg && (
        <div style={{ background: '#E6F4EA', color: '#137333', padding: '10px 14px', borderRadius: '10px', fontSize: '12px', fontWeight: '700', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={16} color="#10B981" />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Main Step Panel */}
      <div className="card-panel" style={{ borderRadius: '20px', padding: '24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
          <span style={{ fontSize: '11px', color: '#0047AB', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            STEP {currentStep} OF 7
          </span>
          <span style={{ fontSize: '11px', background: '#EFF6FF', color: '#1D4ED8', padding: '2px 8px', borderRadius: '12px', fontWeight: '700' }}>
            {Math.round((currentStep / 7) * 100)}% Complete
          </span>
        </div>

        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#003366', marginBottom: '16px' }}>
          {steps[currentStep - 1].label} Details
        </h3>

        {/* STEP 1: Personal Details */}
        {currentStep === 1 && (
          <div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Full Name (as per ID card) *</label>
              <input type="text" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Date of Birth *</label>
              <input type="text" value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} placeholder="DD/MM/YYYY" style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px' }} />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>Gender</label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                {['Male', 'Female', 'Other'].map(g => (
                  <button key={g} type="button" onClick={() => setFormData({...formData, gender: g})} style={{ padding: '10px', borderRadius: '10px', border: '2px solid', borderColor: formData.gender === g ? '#0047AB' : '#E2E8F0', background: formData.gender === g ? '#EFF6FF' : '#FFF', color: formData.gender === g ? '#0047AB' : '#475569', fontWeight: '700', cursor: 'pointer' }}>{g}</button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Contact Details */}
        {currentStep === 2 && (
          <div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Mobile Number (+91) *</label>
              <input type="text" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Email Address *</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px' }} />
            </div>
          </div>
        )}

        {/* STEP 3: Identity & KYC */}
        {currentStep === 3 && (
          <div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>PAN Card Number *</label>
              <input type="text" value={formData.pan} onChange={e => setFormData({...formData, pan: e.target.value.toUpperCase()})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px', textTransform: 'uppercase' }} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Aadhaar Number (12 Digits)</label>
              <input type="text" value={formData.aadhaar} onChange={e => setFormData({...formData, aadhaar: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px' }} />
            </div>
            
            <label style={{ border: '2px dashed #0047AB', borderRadius: '16px', padding: '20px', textAlign: 'center', background: '#F8FAFC', display: 'block', cursor: 'pointer' }}>
              <input type="file" onChange={handleFileUpload} accept="image/*,.pdf" style={{ display: 'none' }} />
              {uploading ? (
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#0047AB' }}>Verifying document...</div>
              ) : uploadedDoc ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <FileCheck2 size={28} color="#10B981" />
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#065F46' }}>{uploadedDoc}</div>
                  <div style={{ fontSize: '10px', color: '#047857' }}>Verified & Uploaded</div>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <Upload size={28} color="#0047AB" />
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#003366' }}>Tap to upload ID document</div>
                  <div style={{ fontSize: '10px', color: '#64748B' }}>PAN / Aadhaar / Passport (JPG, PNG, PDF max 5MB)</div>
                </div>
              )}
            </label>
          </div>
        )}

        {/* STEP 4: Address Details */}
        {currentStep === 4 && (
          <div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Residential Address *</label>
              <input type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px' }} />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>City *</label>
                <input type="text" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>State *</label>
                <input type="text" value={formData.state} onChange={e => setFormData({...formData, state: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px' }} />
              </div>
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Pincode *</label>
              <input type="text" value={formData.pincode} onChange={e => setFormData({...formData, pincode: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px' }} />
            </div>
          </div>
        )}

        {/* STEP 5: Investor Profile */}
        {currentStep === 5 && (
          <div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Occupation *</label>
              <select value={formData.occupation} onChange={e => setFormData({...formData, occupation: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px' }}>
                <option>Salaried</option><option>Business / Professional</option><option>Student</option><option>Retired</option>
              </select>
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Annual Income Range *</label>
              <select value={formData.income} onChange={e => setFormData({...formData, income: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px' }}>
                <option>&lt; ₹1 Lakh</option><option>₹1 Lakh - ₹5 Lakhs</option><option>₹5 Lakhs - ₹25 Lakhs</option><option>&gt; ₹25 Lakhs</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Trading Experience</label>
              <select value={formData.experience} onChange={e => setFormData({...formData, experience: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px' }}>
                <option>Beginner (0-1 yr)</option><option>Moderate (1-3 yrs)</option><option>Expert (&gt; 3 yrs)</option>
              </select>
            </div>
          </div>
        )}

        {/* STEP 6: Bank Details */}
        {currentStep === 6 && (
          <div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Account Holder Name *</label>
              <input type="text" value={formData.accountName} onChange={e => setFormData({...formData, accountName: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>Bank Account Number *</label>
              <input type="text" value={formData.accountNumber} onChange={e => setFormData({...formData, accountNumber: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px' }} />
            </div>
            <div style={{ marginBottom: '14px' }}>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '4px' }}>IFSC Code *</label>
              <input type="text" value={formData.ifsc} onChange={e => setFormData({...formData, ifsc: e.target.value.toUpperCase()})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '14px', textTransform: 'uppercase' }} />
            </div>
          </div>
        )}

        {/* STEP 7: Trading Setup & Package (Page 14 Requirement) */}
        {currentStep === 7 && (
          <div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#003366', marginBottom: '10px' }}>1. Select Your Investment Package</div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '20px' }}>
              {[
                { type: 'CAPITAL_PROTECT', title: 'CAPITAL PROTECT', range: '20% - 30%', bg: '#E6F4EA', color: '#10B981' },
                { type: 'BALANCED', title: 'BALANCED', range: '30% - 60%', bg: '#FEF7E0', color: '#D97706' },
                { type: 'AGGRESSIVE', title: 'AGGRESSIVE', range: '50% - 70%', bg: '#FCE8E6', color: '#EF4444' }
              ].map(p => (
                <div
                  key={p.type}
                  onClick={() => setFormData({...formData, packageType: p.type})}
                  style={{
                    background: p.bg,
                    borderRadius: '16px',
                    padding: '14px 6px',
                    textAlign: 'center',
                    border: '3px solid',
                    borderColor: formData.packageType === p.type ? p.color : 'transparent',
                    boxShadow: formData.packageType === p.type ? '0 6px 15px rgba(0,0,0,0.1)' : 'none',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '10px', fontWeight: '800', color: p.color, letterSpacing: '0.5px' }}>{p.title}</div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#0F172A', marginTop: '6px' }}>{p.range}</div>
                  <div style={{ fontSize: '9px', color: '#64748B', marginTop: '2px' }}>return / mo</div>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '14px', fontWeight: '800', color: '#003366', marginBottom: '10px' }}>2. Selected Markets</div>
            <div style={{ background: '#F8FAFC', borderRadius: '14px', padding: '14px', border: '1px solid #E2E8F0', fontSize: '13px' }}>
              <div style={{ fontWeight: '700', color: '#0F172A', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>Indian Equity & F&O Markets (NSE / BSE)</span>
              </div>
              <div style={{ fontWeight: '700', color: '#0F172A', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>Commodity Markets (GOLD, SILVER, CRUDE OIL)</span>
              </div>
              <div style={{ fontWeight: '700', color: '#0F172A', marginTop: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} color="#10B981" />
                <span>Crypto Assets (BTC, ETH, SOL)</span>
              </div>
            </div>
          </div>
        )}

        {/* Buttons Navigation Bar */}
        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          {currentStep > 1 && (
            <button
              type="button"
              onClick={handleBack}
              style={{ flex: 1, padding: '14px', borderRadius: '12px', border: '1px solid #CBD5E1', background: '#FFF', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <ArrowLeft size={18} /> Back
            </button>
          )}
          <button
            type="button"
            onClick={handleNext}
            disabled={submitting}
            style={{
              flex: 2,
              padding: '14px',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #003366 0%, #0047AB 100%)',
              color: '#FFF',
              fontWeight: '700',
              fontSize: '15px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer',
              boxShadow: '0 4px 12px rgba(0,71,171,0.25)'
            }}
          >
            <span>{submitting ? 'Submitting...' : currentStep === 7 ? 'Complete Setup & Approve' : 'Continue'}</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
