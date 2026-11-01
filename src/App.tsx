/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { NewsPredictor } from './components/NewsPredictor';
import { ModelLab } from './components/ModelLab';
import { ArchitectureView } from './components/ArchitectureView';
import { CollegeGuide } from './components/CollegeGuide';
import { ProjectReportModal } from './components/ProjectReportModal';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('detector');

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navigation */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'detector' && <NewsPredictor />}
        {activeTab === 'lab' && <ModelLab />}
        {activeTab === 'architecture' && <ArchitectureView />}
        {activeTab === 'guide' && <CollegeGuide />}
        {activeTab === 'report' && (
          <ProjectReportModal onBackToDetector={() => setActiveTab('detector')} />
        )}
      </main>

      {/* Global Academic Footer */}
      <footer className="bg-slate-950 border-t border-slate-800/80 py-8 px-4 sm:px-6 lg:px-8 mt-16 print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center text-white font-bold text-xs">
              FN
            </div>
            <span className="font-semibold text-slate-300">
              Fake News Detection System
            </span>
            <span className="text-slate-600">•</span>
            <span>B.Tech CSE 2nd-Year Mini-Project</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('guide')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              22-Step Guide
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              System Architecture
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              ML Benchmark Lab
            </button>
            <button
              onClick={() => setActiveTab('report')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Project Report
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
