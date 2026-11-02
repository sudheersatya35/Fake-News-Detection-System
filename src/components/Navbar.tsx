import React, { useState, useEffect } from 'react';
import { ShieldCheck, BarChart3, Clock, GraduationCap, Workflow, Sparkles } from 'lucide-react';
import { getStoredPredictionHistory } from '../data/modelsData';

export type ActiveTab = 'detector' | 'lab' | 'history' | 'guide' | 'architecture';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [historyCount, setHistoryCount] = useState<number>(0);

  useEffect(() => {
    const updateCount = () => {
      setHistoryCount(getStoredPredictionHistory().length);
    };
    updateCount();
    window.addEventListener('storage', updateCount);
    const interval = setInterval(updateCount, 1500);
    return () => {
      window.removeEventListener('storage', updateCount);
      clearInterval(interval);
    };
  }, []);

  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'detector', label: 'News Predictor', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'lab', label: 'ML Training Lab', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'history', label: 'Prediction History', icon: <Clock className="w-4 h-4" />, badge: historyCount > 0 ? `${historyCount}` : undefined },
    { id: 'guide', label: '22-Step Guide & Viva', icon: <GraduationCap className="w-4 h-4" />, badge: '30 Q&A' },
    { id: 'architecture', label: 'System Architecture', icon: <Workflow className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Title */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveTab('detector')}>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-blue-500/20 text-white font-bold">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base sm:text-lg tracking-tight">
                  Fake News Detection System
                </span>
                <span className="hidden lg:inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-950 text-blue-300 border border-blue-800/60">
                  AI & ML Platform
                </span>
              </div>
              <p className="text-[11px] text-slate-400 hidden sm:block">
                AI-Powered News Credibility and Authenticity Analysis Platform
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30 font-semibold'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {item.icon}
                  <span className="hidden md:inline">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold hidden sm:inline-block ${
                        isActive
                          ? 'bg-blue-800 text-blue-100'
                          : 'bg-slate-800 text-slate-400 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
};
