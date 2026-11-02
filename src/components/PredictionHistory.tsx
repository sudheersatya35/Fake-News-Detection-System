import React, { useState, useEffect } from 'react';
import {
  Clock,
  Search,
  Filter,
  Trash2,
  Download,
  AlertTriangle,
  CheckCircle2,
  ExternalLink,
  ShieldCheck,
  ShieldAlert,
  Sliders,
  Calendar,
  Layers,
  Sparkles
} from 'lucide-react';
import {
  PredictionHistoryItem,
  getStoredPredictionHistory,
  clearStoredHistory,
  deleteStoredHistoryItem
} from '../data/modelsData';

interface PredictionHistoryProps {
  onSelectForReanalysis?: (item: PredictionHistoryItem) => void;
}

export const PredictionHistory: React.FC<PredictionHistoryProps> = ({ onSelectForReanalysis }) => {
  const [historyItems, setHistoryItems] = useState<PredictionHistoryItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLabel, setFilterLabel] = useState<'ALL' | 'REAL' | 'FAKE'>('ALL');
  const [filterType, setFilterType] = useState<'ALL' | 'headline' | 'article' | 'social'>('ALL');
  const [selectedItem, setSelectedItem] = useState<PredictionHistoryItem | null>(null);

  useEffect(() => {
    setHistoryItems(getStoredPredictionHistory());
  }, []);

  const handleClearAll = () => {
    if (window.confirm('Are you sure you want to clear your prediction history?')) {
      clearStoredHistory();
      setHistoryItems([]);
      setSelectedItem(null);
    }
  };

  const handleDeleteItem = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = deleteStoredHistoryItem(id);
    setHistoryItems(updated);
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  };

  const handleExportCSV = () => {
    if (historyItems.length === 0) return;
    const headers = ['ID', 'Timestamp', 'InputType', 'Title', 'Label', 'Confidence', 'DecisionScore', 'Model', 'ModelAccuracy'];
    const rows = historyItems.map(item => [
      item.id,
      `"${item.timestamp}"`,
      item.inputType,
      `"${item.title.replace(/"/g, '""')}"`,
      item.label,
      `${item.confidence}%`,
      item.decisionScore,
      `"${item.modelName}"`,
      `${item.modelAccuracy}%`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `fake_news_prediction_history_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredItems = historyItems.filter(item => {
    const matchesLabel = filterLabel === 'ALL' || item.label === filterLabel;
    const matchesType = filterType === 'ALL' || item.inputType === filterType;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.snippet.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.modelName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLabel && matchesType && matchesSearch;
  });

  const totalCount = historyItems.length;
  const fakeCount = historyItems.filter(i => i.label === 'FAKE').length;
  const realCount = historyItems.filter(i => i.label === 'REAL').length;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/60 text-blue-300 border border-blue-800/50 mb-2">
            <Clock className="w-3.5 h-3.5 text-blue-400" />
            <span>Audit Trail & Prediction History</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Prediction Records & Analytics Log
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mt-1">
            Review past news verifications, model decisions, timestamps, and confidence metrics stored in your browser session.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-shrink-0">
          <button
            onClick={handleExportCSV}
            disabled={historyItems.length === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 disabled:opacity-40 cursor-pointer transition-all"
          >
            <Download className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>
          <button
            onClick={handleClearAll}
            disabled={historyItems.length === 0}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-rose-950/50 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 disabled:opacity-40 cursor-pointer transition-all"
          >
            <Trash2 className="w-4 h-4" />
            <span>Clear Log</span>
          </button>
        </div>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block">
            Total Analyzed
          </span>
          <span className="text-2xl font-black text-white mt-1 block">{totalCount}</span>
          <span className="text-[10px] text-slate-500">Recorded predictions</span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-[11px] font-semibold text-emerald-400 uppercase tracking-wider block">
            Real News Flagged
          </span>
          <span className="text-2xl font-black text-emerald-400 mt-1 block">{realCount}</span>
          <span className="text-[10px] text-slate-500">
            {totalCount > 0 ? Math.round((realCount / totalCount) * 100) : 0}% of total
          </span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-[11px] font-semibold text-rose-400 uppercase tracking-wider block">
            Fake News Caught
          </span>
          <span className="text-2xl font-black text-rose-400 mt-1 block">{fakeCount}</span>
          <span className="text-[10px] text-slate-500">
            {totalCount > 0 ? Math.round((fakeCount / totalCount) * 100) : 0}% of total
          </span>
        </div>
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
          <span className="text-[11px] font-semibold text-blue-400 uppercase tracking-wider block">
            Storage Engine
          </span>
          <span className="text-sm font-bold text-white mt-1.5 block">Client LocalStorage</span>
          <span className="text-[10px] text-slate-500">Synced in-browser</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by headline, keyword, or model name..."
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          {/* Label Filter */}
          <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs flex-shrink-0">
            {(['ALL', 'REAL', 'FAKE'] as const).map((lbl) => (
              <button
                key={lbl}
                onClick={() => setFilterLabel(lbl)}
                className={`px-2.5 py-1 rounded font-medium transition-colors cursor-pointer ${
                  filterLabel === lbl ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {lbl}
              </button>
            ))}
          </div>

          {/* Type Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="bg-slate-950 text-slate-300 text-xs rounded-lg px-2.5 py-2 border border-slate-800 focus:outline-none focus:border-blue-500 cursor-pointer flex-shrink-0"
          >
            <option value="ALL">All Input Types</option>
            <option value="headline">Headlines</option>
            <option value="article">Full Articles</option>
            <option value="social">Social Media Posts</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout: History Table + Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Table View */}
        <div className={`space-y-3 ${selectedItem ? 'lg:col-span-7' : 'lg:col-span-12'}`}>
          {filteredItems.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center space-y-3">
              <Clock className="w-10 h-10 text-slate-600 mx-auto" />
              <h3 className="text-base font-bold text-white">No Prediction Records Found</h3>
              <p className="text-xs text-slate-400 max-w-sm mx-auto">
                No past predictions match your filters. Run a new analysis in the News Predictor tab to record results here!
              </p>
            </div>
          ) : (
            filteredItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2.5 ${
                    isSelected
                      ? 'bg-slate-800/90 border-blue-500/70 shadow-lg shadow-blue-500/10'
                      : 'bg-slate-900 border-slate-800 hover:bg-slate-800/60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                          item.label === 'FAKE'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800/60'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                        }`}
                      >
                        {item.label === 'FAKE' ? '⚠️ FAKE' : '✅ REAL'} ({item.confidence}%)
                      </span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-400 border border-slate-800 capitalize">
                        {item.inputType}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono">
                        {item.modelName} ({item.modelAccuracy}% Acc)
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      <span className="text-[10px] text-slate-500">{item.timestamp}</span>
                      <button
                        onClick={(e) => handleDeleteItem(item.id, e)}
                        title="Delete record"
                        className="p-1 text-slate-500 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{item.snippet}</p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/70">
                    <span>
                      {item.wordCount} words • {item.characterCount} characters
                    </span>
                    <span className="text-blue-400 hover:underline">
                      {isSelected ? 'Viewing Details ▼' : 'Click to View Full Analysis →'}
                    </span>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Selected Item Detail Panel */}
        {selectedItem && (
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-2xl sticky top-20 self-start">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-blue-400" />
                <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                  Record Details
                </h3>
              </div>
              <button
                onClick={() => setSelectedItem(null)}
                className="text-xs text-slate-400 hover:text-white"
              >
                Close ✕
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Classification Verdict
                </span>
                <div className="flex items-baseline gap-2 mt-1">
                  <span
                    className={`text-2xl font-black ${
                      selectedItem.label === 'FAKE' ? 'text-rose-400' : 'text-emerald-400'
                    }`}
                  >
                    {selectedItem.label === 'FAKE' ? 'LIKELY FAKE NEWS' : 'LIKELY REAL NEWS'}
                  </span>
                  <span className="text-xs text-slate-400 font-bold">
                    ({selectedItem.confidence}% Confidence)
                  </span>
                </div>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <span className="text-slate-400 font-semibold block">Headline / Title:</span>
                <p className="text-white font-medium">{selectedItem.title}</p>
              </div>

              <div className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1.5">
                <span className="text-slate-400 font-semibold block">Content Snippet:</span>
                <p className="text-slate-300 leading-relaxed max-h-36 overflow-y-auto">
                  {selectedItem.snippet}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Classifier</span>
                  <span className="text-white font-bold block truncate">{selectedItem.modelName}</span>
                  <span className="text-[10px] text-slate-400">{selectedItem.modelAccuracy}% test acc</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-[10px] text-slate-500 block">Decision Score</span>
                  <span className="text-white font-bold block">{selectedItem.decisionScore}</span>
                  <span className="text-[10px] text-slate-400">{selectedItem.decisionScore > 0 ? 'Fake bias' : 'Real bias'}</span>
                </div>
              </div>

              {selectedItem.matchedPatterns.length > 0 && (
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    High-Weight N-Grams Detected:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedItem.matchedPatterns.map((pat, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-800 text-slate-200 border border-slate-700"
                      >
                        {pat}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3 rounded-xl bg-blue-950/30 border border-blue-900/40 text-[11px] text-slate-300 leading-relaxed">
                <strong className="text-blue-300">Analysis Summary: </strong>
                {selectedItem.explanation}
              </div>

              {onSelectForReanalysis && (
                <button
                  onClick={() => onSelectForReanalysis(selectedItem)}
                  className="w-full py-2.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-md transition-all cursor-pointer"
                >
                  Load into News Predictor for Re-Analysis
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
