import React from 'react';
import { ShieldCheck, BarChart3, Code2, GraduationCap, FileText, Sparkles } from 'lucide-react';

export type ActiveTab = 'detector' | 'lab' | 'architecture' | 'guide' | 'report';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ReactNode; badge?: string }[] = [
    { id: 'detector', label: 'News Predictor', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'lab', label: 'ML Training Lab', icon: <BarChart3 className="w-4 h-4" /> },
    { id: 'architecture', label: 'System Architecture', icon: <Code2 className="w-4 h-4" />, badge: '5 Layers' },
    { id: 'guide', label: '22-Step Guide & Viva', icon: <GraduationCap className="w-4 h-4" />, badge: '30 Q&A' },
    { id: 'report', label: 'Project Report', icon: <FileText className="w-4 h-4" /> },
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
                <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-950 text-blue-300 border border-blue-800/60">
                  Python & ML
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                B.Tech CSE 2nd-Year Mini-Project Workbench
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex space-x-1 sm:space-x-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`relative flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                  }`}
                >
                  {item.icon}
                  <span className="hidden md:inline">{item.label}</span>
                  {item.badge && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold hidden lg:inline-block ${
                        isActive ? 'bg-blue-800 text-blue-100' : 'bg-slate-800 text-slate-400 border border-slate-700'
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
