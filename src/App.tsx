/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar, ActiveTab } from './components/Navbar';
import { NewsPredictor } from './components/NewsPredictor';
import { ModelLab } from './components/ModelLab';
import { PredictionHistory } from './components/PredictionHistory';
import { CollegeGuide } from './components/CollegeGuide';
import { ArchitectureView } from './components/ArchitectureView';

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
        {activeTab === 'history' && (
          <PredictionHistory
            onSelectForReanalysis={() => setActiveTab('detector')}
          />
        )}
        {activeTab === 'guide' && <CollegeGuide />}
        {activeTab === 'architecture' && <ArchitectureView />}
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
            <span>AI-Powered News Credibility & Authenticity Analysis Platform</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setActiveTab('detector')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              News Predictor
            </button>
            <button
              onClick={() => setActiveTab('lab')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              ML Training Lab
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Prediction History
            </button>
            <button
              onClick={() => setActiveTab('guide')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              22-Step Guide & Viva
            </button>
            <button
              onClick={() => setActiveTab('architecture')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              System Architecture
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
