import React, { useState } from 'react';
import { HelpCircle, Bell, MessageSquare, PhoneCall, Ticket, Search, ChevronDown, ChevronUp, Send, CheckCircle2, X } from 'lucide-react';

export default function SupportNotifications({ initialView = 'SUPPORT', onNavigate }) {
  const [activeTab, setActiveTab] = useState(initialView); // 'SUPPORT' or 'NOTIFICATIONS'
  
  // Support state
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaq, setOpenFaq] = useState(null);
  const [chatModal, setChatModal] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Hello Sachin! Welcome to Travancore 24x7 Support. How can I assist your trading today?' }
  ]);
  const [inputMsg, setInputMsg] = useState('');
  const [ticketModal, setTicketModal] = useState(false);
  const [ticketSuccess, setTicketSuccess] = useState('');

  // Notifications state
  const [notifCategory, setNotifCategory] = useState('ALL');

  const faqs = [
    { q: 'How does the Master Algo Trading toggle work?', a: 'When turned ON, our automated algorithms execute buy/sell orders based on your selected package (Capital Protect / Balanced / Aggressive). You can disable it at any time.' },
    { q: 'What is the processing time for funds withdrawal?', a: 'Withdrawals are processed via IMPS/NEFT within 1 to 4 business hours directly to your primary verified bank account.' },
    { q: 'How is the 5% Referral Profit Share calculated?', a: 'You earn 5% on every profitable trade executed by your referee for 2 full years. Earnings accumulate live and can be withdrawn anytime.' },
    { q: 'How do I change my 6-Digit Transaction PIN?', a: 'Go to Account Security Settings -> Security Credentials -> Change 6-Digit PIN.' }
  ];

  const notifications = [
    { id: '1', category: 'Trading', title: 'Algo Position Closed: NIFTY 25000 CE', msg: 'Profit of +₹12,900 booked successfully by Balanced Algo Strategy.', date: 'Today, 03:15 PM', read: false },
    { id: '2', category: 'Funds', title: 'Withdrawal Processed: ₹ 25,000', msg: 'Transfer reference TRW98765432 credited to your HDFC Bank account.', date: 'Today, 11:30 AM', read: false },
    { id: '3', category: 'Trading', title: 'Advisory Signal Alert: RELIANCE BUY', msg: 'New Intraday BUY recommendation target ₹2,950 issued by Research Desk.', date: 'Yesterday, 02:45 PM', read: true },
    { id: '4', category: 'Account', title: 'Security Audit: PIN Login Successful', msg: 'Login recorded from iPhone 15 Pro Max (IP: 192.168.1.45).', date: '10 Sep 2026', read: true }
  ];

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;
    const userMessage = inputMsg;
    setChatMessages(prev => [...prev, { sender: 'user', text: userMessage }]);
    setInputMsg('');
    
    setTimeout(() => {
      let reply = "Thank you for reaching out! Our support executive has received your query regarding '" + userMessage + "' and will respond shortly.";
      if (userMessage.toLowerCase().includes('withdraw')) reply = 'Withdrawal requests are processed within 1-4 hours. You can track status under Funds -> Transaction Status Tracker.';
      if (userMessage.toLowerCase().includes('algo')) reply = 'Your Master Algo is currently ACTIVE. You can monitor live trades on your Dashboard.';
      setChatMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 1000);
  };

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    setTicketSuccess('TCK-' + Math.floor(100000 + Math.random() * 900000));
    setTimeout(() => {
      setTicketSuccess('');
      setTicketModal(false);
    }, 2000);
  };

  const filteredNotifs = notifications.filter(n => notifCategory === 'ALL' ? true : n.category.toUpperCase() === notifCategory);

  return (
    <div style={{ padding: '16px', maxWidth: '600px', margin: '0 auto', paddingBottom: '80px' }}>
      
      {/* Top Switcher Bar */}
      <div style={{ display: 'flex', background: '#E2E8F0', borderRadius: '10px', padding: '4px', marginBottom: '16px' }}>
        <button 
          onClick={() => setActiveTab('SUPPORT')}
          style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', background: activeTab === 'SUPPORT' ? '#FFFFFF' : 'transparent', color: activeTab === 'SUPPORT' ? '#003366' : '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
        >
          <HelpCircle size={16} />
          <span>Help & 24x7 Support</span>
        </button>

        <button 
          onClick={() => setActiveTab('NOTIFICATIONS')}
          style={{ flex: 1, padding: '10px', border: 'none', borderRadius: '8px', fontSize: '13px', fontWeight: '800', cursor: 'pointer', background: activeTab === 'NOTIFICATIONS' ? '#FFFFFF' : 'transparent', color: activeTab === 'NOTIFICATIONS' ? '#003366' : '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
        >
          <Bell size={16} />
          <span>Notifications (5)</span>
        </button>
      </div>

      {activeTab === 'SUPPORT' ? (
        <div>
          {/* Search Box */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <Search size={18} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
            <input 
              type="text"
              placeholder="Search help topics e.g. withdrawal, algo, KYC..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ width: '100%', padding: '10px 12px 10px 38px', borderRadius: '10px', border: '1px solid #CBD5E1', fontSize: '13px', background: '#FFFFFF', outline: 'none' }}
            />
          </div>

          {/* Quick Support Channels (Page 21) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
            <button 
              onClick={() => setChatModal(true)}
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <MessageSquare size={24} color="#0047AB" />
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#0F172A' }}>24x7 Live Chat</span>
            </button>

            <button 
              onClick={() => alert('Call Toll-Free Support: 1800 123 4567 (Mon-Sat 9AM-8PM)')}
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <PhoneCall size={24} color="#10B981" />
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#0F172A' }}>Toll-Free Call</span>
            </button>

            <button 
              onClick={() => setTicketModal(true)}
              style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '14px 8px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            >
              <Ticket size={24} color="#D4AF37" />
              <span style={{ fontSize: '11px', fontWeight: '800', color: '#0F172A' }}>Raise Ticket</span>
            </button>
          </div>

          {/* FAQs Accordion (Page 21) */}
          <div className="card-panel">
            <h3 style={{ fontSize: '15px', fontWeight: '800', color: '#003366', marginBottom: '12px' }}>Frequently Asked Questions</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {faqs.map((faq, idx) => (
                <div key={idx} style={{ border: '1px solid #F1F5F9', borderRadius: '8px', overflow: 'hidden' }}>
                  <button 
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    style={{ width: '100%', padding: '12px', background: '#F8FAFC', border: 'none', textAlign: 'left', fontWeight: '700', fontSize: '12px', color: '#0F172A', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}
                  >
                    <span>{faq.q}</span>
                    {openFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </button>

                  {openFaq === idx && (
                    <div style={{ padding: '12px', fontSize: '12px', color: '#475569', background: '#FFFFFF', lineHeight: '1.5' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Notifications View (Page 22) */
        <div>
          {/* Category Pills */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '14px' }}>
            {['ALL', 'TRADING', 'FUNDS', 'ACCOUNT'].map((cat) => (
              <button
                key={cat}
                onClick={() => setNotifCategory(cat)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '20px',
                  border: 'none',
                  fontSize: '11px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  background: notifCategory === cat ? '#0047AB' : '#E2E8F0',
                  color: notifCategory === cat ? '#FFFFFF' : '#475569'
                }}
              >
                {cat}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filteredNotifs.map((n) => (
              <div key={n.id} className="card-panel" style={{ margin: 0, padding: '14px', background: n.read ? '#FFFFFF' : '#F0F7FF', borderLeft: n.read ? '1px solid #E5E9F0' : '4px solid #0047AB' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: '800', color: '#0F172A' }}>{n.title}</span>
                  <span style={{ fontSize: '10px', color: '#94A3B8' }}>{n.date}</span>
                </div>
                <p style={{ fontSize: '12px', color: '#475569', lineHeight: '1.4' }}>{n.msg}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 24x7 Live Chat Modal */}
      {chatModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '600px', height: '80vh', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', display: 'flex', flexDirection: 'column' }}>
            
            {/* Chat Header */}
            <div style={{ background: '#003366', color: '#FFFFFF', padding: '14px 18px', borderTopLeftRadius: '20px', borderTopRightRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <div style={{ fontSize: '15px', fontWeight: '800' }}>24x7 Instant Support Assistant</div>
                <div style={{ fontSize: '10px', color: '#10B981' }}>● Online · Replies instantly</div>
              </div>
              <button onClick={() => setChatModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} color="#FFFFFF" /></button>
            </div>

            {/* Chat Body */}
            <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', background: '#F8FAFC' }}>
              {chatMessages.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start', maxWidth: '80%' }}>
                  <div style={{
                    padding: '10px 14px',
                    borderRadius: '14px',
                    fontSize: '12px',
                    lineHeight: '1.4',
                    background: msg.sender === 'user' ? '#0047AB' : '#FFFFFF',
                    color: msg.sender === 'user' ? '#FFFFFF' : '#0F172A',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.08)'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <form onSubmit={handleSendChat} style={{ padding: '12px', borderTop: '1px solid #E2E8F0', background: '#FFFFFF', display: 'flex', gap: '8px' }}>
              <input 
                type="text"
                value={inputMsg}
                onChange={(e) => setInputMsg(e.target.value)}
                placeholder="Type your question..."
                style={{ flex: 1, padding: '10px 14px', borderRadius: '20px', border: '1px solid #CBD5E1', fontSize: '13px', outline: 'none' }}
              />
              <button type="submit" style={{ background: '#0047AB', color: '#FFFFFF', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
                <Send size={16} />
              </button>
            </form>

          </div>
        </div>
      )}

      {/* Raise Ticket Modal */}
      {ticketModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '400px', borderRadius: '16px', padding: '20px' }}>
            
            {ticketSuccess ? (
              <div style={{ textAlign: 'center', padding: '20px 0' }}>
                <CheckCircle2 size={44} color="#10B981" style={{ margin: '0 auto 10px' }} />
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>Support Ticket Created!</h3>
                <p style={{ fontSize: '12px', color: '#64748B', marginTop: '4px' }}>
                  Ticket ID: <strong>{ticketSuccess}</strong><br />Our support desk will respond within 4 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleTicketSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#003366' }}>Raise Support Ticket</h3>
                
                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569' }}>Category</label>
                  <select style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', marginTop: '4px' }}>
                    <option>Algo Trading Strategy</option>
                    <option>Funds & Withdrawal</option>
                    <option>KYC Verification</option>
                    <option>Security / Account</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569' }}>Subject</label>
                  <input type="text" required placeholder="Brief title" style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', marginTop: '4px' }} />
                </div>

                <div>
                  <label style={{ fontSize: '11px', fontWeight: '700', color: '#475569' }}>Description</label>
                  <textarea required rows={3} placeholder="Describe issue in detail..." style={{ width: '100%', padding: '8px', borderRadius: '8px', border: '1px solid #CBD5E1', fontSize: '12px', marginTop: '4px' }}></textarea>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                  <button type="submit" style={{ flex: 1, padding: '10px', background: '#0047AB', color: '#FFFFFF', border: 'none', borderRadius: '8px', fontWeight: '800', cursor: 'pointer' }}>
                    Submit Ticket
                  </button>
                  <button type="button" onClick={() => setTicketModal(false)} style={{ padding: '10px', background: '#E2E8F0', color: '#475569', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}
