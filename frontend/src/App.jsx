import React, { useState } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';

import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Markets from './pages/Markets';
import PnLReport from './pages/PnLReport';
import Referrals from './pages/Referrals';
import Funds from './pages/Funds';
import Research from './pages/Research';
import SecuritySettings from './pages/SecuritySettings';
import SupportNotifications from './pages/SupportNotifications';
import MoreMenu from './pages/MoreMenu';

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'login', 'onboarding', 'home', 'markets', 'algo', 'funds', 'pnl', 'referrals', 'research', 'security', 'support', 'notifications', 'more'
  const [currentUser, setCurrentUser] = useState({ full_name: 'Sachin Tendulkar', account_id: '458921' });

  const handleLoginSuccess = (userData) => {
    if (userData) setCurrentUser(userData);
    setCurrentView('home');
  };

  const isAuthPage = currentView === 'login';

  return (
    <div className="app-container">
      {/* Top Header Bar */}
      {!isAuthPage && (
        <Header 
          user={currentUser} 
          onNavChange={(target) => setCurrentView(target)} 
        />
      )}

      {/* Main Content Area */}
      <main style={{ flex: 1 }}>
        {currentView === 'login' && <Login onLoginSuccess={handleLoginSuccess} />}
        {currentView === 'onboarding' && <Onboarding onComplete={() => setCurrentView('home')} />}
        {currentView === 'home' && <Dashboard onNavigate={(target) => setCurrentView(target)} />}
        {currentView === 'algo' && <Dashboard onNavigate={(target) => setCurrentView(target)} />}
        {currentView === 'markets' && <Markets onNavigate={(target) => setCurrentView(target)} />}
        {currentView === 'pnl' && <PnLReport onNavigate={(target) => setCurrentView(target)} />}
        {currentView === 'referrals' && <Referrals onNavigate={(target) => setCurrentView(target)} />}
        {currentView === 'funds' && <Funds onNavigate={(target) => setCurrentView(target)} />}
        {currentView === 'research' && <Research onNavigate={(target) => setCurrentView(target)} />}
        {currentView === 'security' && <SecuritySettings onNavigate={(target) => setCurrentView(target)} />}
        {currentView === 'support' && <SupportNotifications initialView="SUPPORT" onNavigate={(target) => setCurrentView(target)} />}
        {currentView === 'notifications' && <SupportNotifications initialView="NOTIFICATIONS" onNavigate={(target) => setCurrentView(target)} />}
        {currentView === 'more' && <MoreMenu user={currentUser} onNavigate={(target) => setCurrentView(target)} />}
      </main>

      {/* Mobile Sticky Bottom Navigation Bar */}
      {!isAuthPage && (
        <BottomNav 
          activeTab={currentView === 'home' ? 'home' : currentView} 
          onTabChange={(tabId) => setCurrentView(tabId)} 
        />
      )}
    </div>
  );
}
