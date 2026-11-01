import React, { useState } from 'react';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Info,
  Clock,
  ArrowRight,
  Sliders,
  CheckCircle2,
  FileSearch
} from 'lucide-react';
import {
  predictNews,
  PredictionOutput,
  MODELS_METRICS,
  SAMPLE_DATASET
} from '../data/modelsData';

interface HistoryItem {
  id: string;
  headline: string;
  label: 'REAL' | 'FAKE';
  confidence: number;
  timestamp: string;
}

export const NewsPredictor: React.FC = () => {
  const [headline, setHeadline] = useState('');
  const [bodyText, setBodyText] = useState('');
  const [selectedModel, setSelectedModel] = useState<'pac' | 'lr' | 'svm' | 'nb'>('pac');
  const [result, setResult] = useState<PredictionOutput | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      id: 'init-1',
      headline: 'NASA James Webb Telescope Confirms Exoplanet Atmosphere Discovery',
      label: 'REAL',
      confidence: 94.2,
      timestamp: 'Just now'
    },
    {
      id: 'init-2',
      headline: 'SHOCKING SECRET: Miracle Fruit Cures All Terminal Cancers Overnight!',
      label: 'FAKE',
      confidence: 97.8,
      timestamp: '5 mins ago'
    }
  ]);

  const handlePredict = () => {
    const combined = `${headline} ${bodyText}`.trim();
    if (!combined) {
      setErrorMsg('Please enter a news headline or article body text to analyze.');
      setResult(null);
      return;
    }

    const words = combined.split(/\s+/).filter(Boolean);
    if (words.length < 3) {
      setErrorMsg('The input text is too short. Please provide at least 3 words for accurate NLP feature extraction.');
      setResult(null);
      return;
    }

    setErrorMsg(null);
    setIsProcessing(true);

    // Simulate standard NLP inference latency
    setTimeout(() => {
      const prediction = predictNews(headline, bodyText, selectedModel);
      setResult(prediction);
      setIsProcessing(false);

      // Add to history
      const newHistoryItem: HistoryItem = {
        id: Date.now().toString(),
        headline: headline || (bodyText.length > 60 ? bodyText.substring(0, 60) + '...' : bodyText),
        label: prediction.label,
        confidence: prediction.confidence,
        timestamp: 'Just now'
      };
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 4)]);
    }, 280);
  };

  const handleClear = () => {
    setHeadline('');
    setBodyText('');
    setResult(null);
    setErrorMsg(null);
  };

  const loadSample = (index: number) => {
    const sample = SAMPLE_DATASET[index];
    if (sample) {
      setHeadline(sample.title);
      setBodyText(sample.text);
      setErrorMsg(null);
      setResult(null);
    }
  };

  const activeModelMeta = MODELS_METRICS.find(m => m.key === selectedModel) || MODELS_METRICS[0];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-900/40 text-blue-300 border border-blue-700/50">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Interactive Machine Learning & Natural Language Processing</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          News Credibility & Authenticity Predictor
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Analyze news headlines and articles to detect whether they exhibit stylistic markers of 
          authentic reporting or synthetic misinformation using TF-IDF feature extraction.
        </p>
      </div>

      {/* Main Detector Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        {/* Card Header & Algorithm Selector */}
        <div className="p-5 sm:p-6 bg-slate-900/60 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FileSearch className="w-5 h-5 text-blue-400" />
              <span>Input News Content</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Paste a headline, social media viral post, or full article text.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5" />
              <span>Model:</span>
            </span>
            <select
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value as any)}
              className="bg-slate-800 text-slate-200 text-xs font-medium rounded-lg px-3 py-1.5 border border-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
            >
              {MODELS_METRICS.map(m => (
                <option key={m.key} value={m.key}>
                  {m.name} ({m.accuracy}% Acc)
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6 space-y-4">
          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-950/60 border border-red-800/80 text-red-200 text-xs sm:text-sm flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Headline Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              News Headline / Title (Optional but Recommended)
            </label>
            <input
              type="text"
              value={headline}
              onChange={(e) => setHeadline(e.target.value)}
              placeholder="e.g. NASA Telescope Discovers Atmosphere on Distant Rocky Exoplanet"
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
            />
          </div>

          {/* Body Article Textarea */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
              Article Body or Social Media Forward Text
            </label>
            <textarea
              rows={5}
              value={bodyText}
              onChange={(e) => setBodyText(e.target.value)}
              placeholder="Paste article paragraphs, claims, or viral text here to analyze linguistic patterns..."
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-y"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePredict}
                disabled={isProcessing}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <RotateCcw className="w-4 h-4 animate-spin" />
                    <span>Analyzing NLP Signals...</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Detect News Authenticity</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={handleClear}
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
              <span className="text-slate-500 flex-shrink-0">Quick Samples:</span>
              <button
                type="button"
                onClick={() => loadSample(0)}
                className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-emerald-400 border border-emerald-900/40 cursor-pointer whitespace-nowrap"
              >
                Real Science
              </button>
              <button
                type="button"
                onClick={() => loadSample(1)}
                className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-rose-400 border border-rose-900/40 cursor-pointer whitespace-nowrap"
              >
                Fake Cancer Cure
              </button>
              <button
                type="button"
                onClick={() => loadSample(2)}
                className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-emerald-400 border border-emerald-900/40 cursor-pointer whitespace-nowrap"
              >
                Real Economy
              </button>
              <button
                type="button"
                onClick={() => loadSample(3)}
                className="px-2.5 py-1 rounded-md bg-slate-800/80 hover:bg-slate-700 text-rose-400 border border-rose-900/40 cursor-pointer whitespace-nowrap"
              >
                Fake Alien Bunker
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Prediction Output Section */}
      {result && (
        <div
          className={`rounded-2xl border p-6 sm:p-8 space-y-6 shadow-2xl transition-all ${
            result.label === 'FAKE'
              ? 'bg-gradient-to-b from-rose-950/40 to-slate-900 border-rose-800/70 shadow-rose-950/20'
              : 'bg-gradient-to-b from-emerald-950/40 to-slate-900 border-emerald-800/70 shadow-emerald-950/20'
          }`}
        >
          {/* Result Header Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800/80">
            <div className="flex items-center gap-4">
              <div
                className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg ${
                  result.label === 'FAKE'
                    ? 'bg-rose-600 text-white shadow-rose-600/30'
                    : 'bg-emerald-600 text-white shadow-emerald-600/30'
                }`}
              >
                {result.label === 'FAKE' ? (
                  <ShieldAlert className="w-8 h-8" />
                ) : (
                  <CheckCircle2 className="w-8 h-8" />
                )}
              </div>
              <div>
                <span className="text-xs font-bold tracking-widest text-slate-400 uppercase">
                  CLASSIFICATION VERDICT
                </span>
                <h3
                  className={`text-2xl sm:text-3xl font-black tracking-tight ${
                    result.label === 'FAKE' ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {result.label === 'FAKE' ? 'LIKELY FAKE NEWS' : 'LIKELY REAL NEWS'}
                </h3>
              </div>
            </div>

            {/* Model Confidence Meter */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 px-5 text-right sm:min-w-[200px]">
              <span className="text-[11px] font-semibold text-slate-400 uppercase block">
                Model Confidence
              </span>
              <div className="flex items-baseline justify-end gap-1.5">
                <span
                  className={`text-2xl font-black ${
                    result.label === 'FAKE' ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {result.confidence}%
                </span>
                <span className="text-xs text-slate-500">decision score</span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full mt-1.5 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    result.label === 'FAKE' ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* Explanation Text */}
          <div className="bg-slate-900/80 rounded-xl p-4 border border-slate-800 text-slate-300 text-sm leading-relaxed">
            <strong className="text-white">NLP Inference Summary: </strong>
            {result.explanation}
          </div>

          {/* Breakdown Grid: Linguistic Signals & Cues */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5">
              <span className="text-[11px] font-medium text-slate-400 block uppercase">
                Active Classifier
              </span>
              <span className="text-sm font-bold text-white mt-1 block truncate">
                {activeModelMeta.name}
              </span>
              <span className="text-[10px] text-slate-500">{activeModelMeta.accuracy}% benchmark acc</span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5">
              <span className="text-[11px] font-medium text-slate-400 block uppercase">
                Sensationalism Risk
              </span>
              <span
                className={`text-sm font-bold mt-1 block ${
                  result.linguisticSignals.clickbaitSeverity === 'High'
                    ? 'text-rose-400'
                    : result.linguisticSignals.clickbaitSeverity === 'Medium'
                    ? 'text-amber-400'
                    : 'text-emerald-400'
                }`}
              >
                {result.linguisticSignals.clickbaitSeverity}
              </span>
              <span className="text-[10px] text-slate-500">
                Punctuation / Exclamation: {result.linguisticSignals.punctuationIntensity}
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5">
              <span className="text-[11px] font-medium text-slate-400 block uppercase">
                All-Caps Density
              </span>
              <span className="text-sm font-bold text-white mt-1 block">
                {result.linguisticSignals.allCapsScore}%
              </span>
              <span className="text-[10px] text-slate-500">
                {result.linguisticSignals.allCapsScore > 20 ? 'Elevated shouting' : 'Normal casing'}
              </span>
            </div>

            <div className="bg-slate-900/90 border border-slate-800/80 rounded-xl p-3.5">
              <span className="text-[11px] font-medium text-slate-400 block uppercase">
                Attribution Cues
              </span>
              <span className="text-sm font-bold text-white mt-1 block">
                {result.linguisticSignals.sourceCredibilityIndicators} verified markers
              </span>
              <span className="text-[10px] text-slate-500">wire & peer-review tokens</span>
            </div>
          </div>

          {/* Extracted Key Tokens Chips */}
          <div className="space-y-3 pt-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Influential TF-IDF N-Grams Detected:
            </span>
            <div className="flex flex-wrap gap-2">
              {result.matchedFakeCues.map((term, i) => (
                <span
                  key={`fake-${i}`}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-rose-950/80 text-rose-300 border border-rose-800/60 flex items-center gap-1"
                >
                  <AlertTriangle className="w-3 h-3 text-rose-400" />
                  <span>{term}</span>
                  <span className="text-[10px] text-rose-400/80">(Fake cue)</span>
                </span>
              ))}

              {result.matchedRealCues.map((term, i) => (
                <span
                  key={`real-${i}`}
                  className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-emerald-950/80 text-emerald-300 border border-emerald-800/60 flex items-center gap-1"
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>{term}</span>
                  <span className="text-[10px] text-emerald-400/80">(Real cue)</span>
                </span>
              ))}

              {result.matchedFakeCues.length === 0 && result.matchedRealCues.length === 0 && (
                <span className="text-xs text-slate-500 italic">
                  No high-weight vocabulary flags detected; classification governed by overall sentence syntax and linear decision margin.
                </span>
              )}
            </div>
          </div>

          {/* Academic Disclaimer */}
          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 text-[11px] text-slate-400 flex items-start gap-2.5">
            <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <strong className="text-slate-300">College Project Evaluation Disclaimer: </strong>
              This classification reflects statistical lexical and syntactical associations learned from the training corpus.
              It serves as an automated preliminary filter and does not constitute independent, real-world fact verification.
            </div>
          </div>
        </div>
      )}

      {/* Recent Checks Session History */}
      {history.length > 0 && (
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-slate-400" />
              <span>Session Testing History</span>
            </h3>
            <span className="text-xs text-slate-500">{history.length} items evaluated</span>
          </div>

          <div className="divide-y divide-slate-800/60">
            {history.map((item) => (
              <div key={item.id} className="py-2.5 flex items-center justify-between gap-4 text-xs">
                <span className="text-slate-300 truncate max-w-md font-medium">{item.headline}</span>
                <div className="flex items-center gap-3 flex-shrink-0">
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.label === 'FAKE'
                        ? 'bg-rose-950 text-rose-300 border border-rose-800/50'
                        : 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                    }`}
                  >
                    {item.label} ({item.confidence}%)
                  </span>
                  <span className="text-slate-500 text-[10px] hidden sm:inline">{item.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
