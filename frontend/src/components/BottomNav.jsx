import React from 'react';
import { Home, TrendingUp, Cpu, Wallet, Menu } from 'lucide-react';

export default function BottomNav({ activeTab, onTabChange }) {
  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'markets', label: 'Markets', icon: TrendingUp },
    { id: 'algo', label: 'Algo Trade', icon: Cpu },
    { id: 'funds', label: 'Funds', icon: Wallet },
    { id: 'more', label: 'More', icon: Menu }
  ];

  return (
    <nav className="bottom-nav">
      {navItems.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onTabChange(item.id)}
            className={`nav-item ${isActive ? 'active' : ''}`}
          >
            <Icon size={20} color={isActive ? '#0047AB' : '#64748B'} />
            <span style={{ color: isActive ? '#0047AB' : '#64748B' }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
