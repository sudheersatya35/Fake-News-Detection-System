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
  FileSearch,
  Share2,
  Type,
  FileText,
  MessageSquare,
  Activity,
  Award
} from 'lucide-react';
import {
  predictNews,
  PredictionOutput,
  MODELS_METRICS,
  SAMPLE_DATASET,
  savePredictionToHistory,
  getStoredPredictionHistory,
  PredictionHistoryItem
} from '../data/modelsData';

type InputMode = 'headline' | 'article' | 'social';

export const NewsPredictor: React.FC = () => {
  const [inputMode, setInputMode] = useState<InputMode>('article');
  const [headline, setHeadline] = useState('');
  const [articleBody, setArticleBody] = useState('');
  const [socialPost, setSocialPost] = useState('');
  const [selectedModelKey, setSelectedModelKey] = useState<'pac' | 'svm' | 'lr' | 'nb'>('pac');
  const [result, setResult] = useState<PredictionOutput | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingPhase, setLoadingPhase] = useState<'normalizing' | 'vectorizing' | 'evaluating'>('normalizing');
  const [recentHistory, setRecentHistory] = useState<PredictionHistoryItem[]>(() => getStoredPredictionHistory().slice(0, 4));

  // Compute character & word counts
  const currentText = inputMode === 'social' ? socialPost : `${headline} ${articleBody}`.trim();
  const characterCount = currentText.length;
  const wordCount = currentText ? currentText.split(/\s+/).filter(Boolean).length : 0;

  const handlePredict = () => {
    let titleToEvaluate = '';
    let bodyToEvaluate = '';

    if (inputMode === 'social') {
      if (!socialPost.trim()) {
        setErrorMsg('Please enter a social media post, message forward, or claim to analyze.');
        setResult(null);
        return;
      }
      bodyToEvaluate = socialPost.trim();
      titleToEvaluate = socialPost.slice(0, 60) + (socialPost.length > 60 ? '...' : '');
    } else if (inputMode === 'headline') {
      if (!headline.trim()) {
        setErrorMsg('Please enter a news headline to analyze.');
        setResult(null);
        return;
      }
      titleToEvaluate = headline.trim();
      bodyToEvaluate = '';
    } else {
      // Full article mode
      if (!headline.trim() && !articleBody.trim()) {
        setErrorMsg('Please enter a headline or article body text to analyze.');
        setResult(null);
        return;
      }
      titleToEvaluate = headline.trim();
      bodyToEvaluate = articleBody.trim();
    }

    const words = `${titleToEvaluate} ${bodyToEvaluate}`.trim().split(/\s+/).filter(Boolean);
    if (words.length < 3) {
      setErrorMsg('The input text is too short. Please provide at least 3 words for accurate NLP feature extraction.');
      setResult(null);
      return;
    }

    setErrorMsg(null);
    setIsProcessing(true);
    setLoadingPhase('normalizing');

    // Multi-phase realistic scanning animation
    setTimeout(() => {
      setLoadingPhase('vectorizing');
    }, 250);

    setTimeout(() => {
      setLoadingPhase('evaluating');
    }, 500);

    setTimeout(() => {
      const prediction = predictNews(titleToEvaluate, bodyToEvaluate, selectedModelKey);
      setResult(prediction);
      setIsProcessing(false);

      // Save to persistent history
      const historyRecord: PredictionHistoryItem = {
        id: 'hist-' + Date.now(),
        timestamp: prediction.timestamp,
        inputType: inputMode,
        title: titleToEvaluate || (bodyToEvaluate.length > 70 ? bodyToEvaluate.slice(0, 70) + '...' : bodyToEvaluate),
        snippet: (bodyToEvaluate || titleToEvaluate).slice(0, 240) + '...',
        characterCount,
        wordCount,
        modelKey: selectedModelKey,
        modelName: prediction.selectedModelName,
        modelAccuracy: prediction.modelAccuracy,
        label: prediction.label,
        confidence: prediction.confidence,
        decisionScore: prediction.decisionScore,
        matchedPatterns: [...prediction.matchedFakeCues, ...prediction.matchedRealCues],
        explanation: prediction.explanation
      };

      const updatedHistory = savePredictionToHistory(historyRecord);
      setRecentHistory(updatedHistory.slice(0, 4));
    }, 750);
  };

  const handleClear = () => {
    setHeadline('');
    setArticleBody('');
    setSocialPost('');
    setResult(null);
    setErrorMsg(null);
  };

  const loadSample = (sampleId: string) => {
    const sample = SAMPLE_DATASET.find(s => s.id === sampleId);
    if (sample) {
      if (sample.type === 'social') {
        setInputMode('social');
        setSocialPost(`${sample.title}\n\n${sample.text}`);
        setHeadline('');
        setArticleBody('');
      } else if (sample.type === 'headline') {
        setInputMode('headline');
        setHeadline(sample.title);
        setArticleBody('');
        setSocialPost('');
      } else {
        setInputMode('article');
        setHeadline(sample.title);
        setArticleBody(sample.text);
        setSocialPost('');
      }
      setErrorMsg(null);
      setResult(null);
    }
  };

  const activeModel = MODELS_METRICS.find(m => m.key === selectedModelKey) || MODELS_METRICS[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Hero Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold bg-blue-950/70 text-blue-300 border border-blue-700/60 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>AI-Powered News Credibility and Authenticity Analysis Platform</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
          News Authenticity Predictor
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Input headlines, full-length articles, or social media forwards to evaluate textual credibility 
          using trained Scikit-learn Machine Learning classifiers and TF-IDF feature extraction.
        </p>
      </div>

      {/* Main Grid: Input Form + Sidebar History */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Form & Controller (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
            {/* Input Mode Selector Bar */}
            <div className="p-4 sm:p-5 bg-slate-950/70 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => setInputMode('article')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    inputMode === 'article'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Full News Article</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('headline')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    inputMode === 'headline'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Type className="w-3.5 h-3.5" />
                  <span>Headline Only</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInputMode('social')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-all cursor-pointer ${
                    inputMode === 'social'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Social Media Post</span>
                </button>
              </div>

              {/* Model Selector Dropdown */}
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-400 flex items-center gap-1 flex-shrink-0">
                  <Sliders className="w-3.5 h-3.5 text-blue-400" />
                  <span>Model:</span>
                </span>
                <select
                  value={selectedModelKey}
                  onChange={(e) => setSelectedModelKey(e.target.value as any)}
                  className="bg-slate-950 text-slate-200 text-xs font-semibold rounded-lg px-2.5 py-1.5 border border-slate-700 focus:outline-none focus:border-blue-500 cursor-pointer"
                >
                  {MODELS_METRICS.map(m => (
                    <option key={m.key} value={m.key}>
                      {m.name} ({m.accuracy}% Acc)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Form Fields */}
            <div className="p-5 sm:p-6 space-y-4">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-rose-950/70 border border-rose-800/80 text-rose-200 text-xs sm:text-sm flex items-start gap-2.5 animate-fadeIn">
                  <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Conditional Inputs based on mode */}
              {inputMode === 'headline' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    News Headline to Inspect
                  </label>
                  <input
                    type="text"
                    value={headline}
                    onChange={(e) => setHeadline(e.target.value)}
                    placeholder="e.g. European Parliament Passes Landmark AI Governance Legislation"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                  />
                </div>
              )}

              {inputMode === 'article' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Article Headline / Title (Recommended)
                    </label>
                    <input
                      type="text"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      placeholder="e.g. NASA James Webb Telescope Confirms Discovery of Exoplanet Atmosphere"
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                      Full Article Body Text
                    </label>
                    <textarea
                      rows={6}
                      value={articleBody}
                      onChange={(e) => setArticleBody(e.target.value)}
                      placeholder="Paste article paragraphs, claims, quotations, or news copy here for TF-IDF linguistic analysis..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-y"
                    />
                  </div>
                </>
              )}

              {inputMode === 'social' && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                    Social Media Viral Post / WhatsApp Forward / Tweet
                  </label>
                  <textarea
                    rows={6}
                    value={socialPost}
                    onChange={(e) => setSocialPost(e.target.value)}
                    placeholder="Paste unverified social media text, viral forwarded messages, or sensational social claims..."
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition-colors resize-y"
                  />
                </div>
              )}

              {/* Character and Word Counter Badge Bar */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
                <div className="flex items-center gap-3">
                  <span>
                    Characters: <strong className="text-white">{characterCount}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Words: <strong className="text-white">{wordCount}</strong>
                  </span>
                </div>
                <span className="text-[11px] text-slate-500">
                  {wordCount >= 3 ? 'Ready for ML inference' : 'Min 3 words required'}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handlePredict}
                    disabled={isProcessing}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 transition-all cursor-pointer disabled:opacity-50"
                  >
                    {isProcessing ? (
                      <>
                        <Activity className="w-4 h-4 animate-spin text-white" />
                        <span>
                          {loadingPhase === 'normalizing' && '1/3 Normalizing Text...'}
                          {loadingPhase === 'vectorizing' && '2/3 TF-IDF Vectorizing...'}
                          {loadingPhase === 'evaluating' && '3/3 Calculating Decision Margin...'}
                        </span>
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
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl text-sm font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-all cursor-pointer"
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
                    onClick={() => loadSample('1')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/50 cursor-pointer whitespace-nowrap"
                  >
                    Real Science
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSample('2')}
                    className="px-2.5 py-1 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 cursor-pointer whitespace-nowrap"
                  >
                    Fake Miracle Cure
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSample('6')}
                    className="px-2.5 py-1 rounded-lg bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/50 cursor-pointer whitespace-nowrap"
                  >
                    Viral Forward
                  </button>
                  <button
                    type="button"
                    onClick={() => loadSample('5')}
                    className="px-2.5 py-1 rounded-lg bg-emerald-950/40 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-800/50 cursor-pointer whitespace-nowrap"
                  >
                    Real Tech Law
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Active Model Card + Quick History (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Active Model Status Card */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                <Award className="w-4 h-4 text-amber-400" />
                <span>Selected Classifier</span>
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-950 text-blue-300 border border-blue-800/50 font-bold">
                Scikit-Learn
              </span>
            </div>

            <div>
              <h4 className="text-base font-extrabold text-white">{activeModel.name}</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">{activeModel.description}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">Test Accuracy</span>
                <span className="text-lg font-black text-emerald-400 block mt-0.5">
                  {activeModel.accuracy}%
                </span>
                <span className="text-[9px] text-slate-500">Evaluated on test set</span>
              </div>
              <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                <span className="text-[10px] text-slate-500 block">F1-Score</span>
                <span className="text-lg font-black text-blue-400 block mt-0.5">
                  {activeModel.f1Score}%
                </span>
                <span className="text-[9px] text-slate-500">Harmonic balance</span>
              </div>
            </div>
          </div>

          {/* Quick History Column Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-3 shadow-xl">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-400" />
                <span>Recent History</span>
              </span>
              <span className="text-[10px] text-slate-500">{recentHistory.length} logged</span>
            </div>

            <div className="space-y-2">
              {recentHistory.length === 0 ? (
                <p className="text-xs text-slate-500 italic py-2 text-center">No predictions yet</p>
              ) : (
                recentHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                          item.label === 'FAKE'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800/50'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800/50'
                        }`}
                      >
                        {item.label} ({item.confidence}%)
                      </span>
                      <span className="text-[10px] text-slate-500">{item.timestamp.split(' at ')[1] || item.timestamp}</span>
                    </div>
                    <p className="text-slate-300 font-medium truncate">{item.title}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Professional Results Dashboard */}
      {result && (
        <div
          className={`rounded-2xl border p-6 sm:p-8 space-y-6 shadow-2xl transition-all animate-fadeIn ${
            result.label === 'FAKE'
              ? 'bg-gradient-to-b from-rose-950/40 via-slate-900 to-slate-900 border-rose-800/80 shadow-rose-950/20'
              : 'bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-900 border-emerald-800/80 shadow-emerald-950/20'
          }`}
        >
          {/* Result Header Banner */}
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
                <span className="text-[11px] font-extrabold tracking-widest text-slate-400 uppercase">
                  PREDICTED CLASSIFICATION CATEGORY
                </span>
                <h3
                  className={`text-2xl sm:text-4xl font-black tracking-tight ${
                    result.label === 'FAKE' ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {result.label === 'FAKE' ? 'LIKELY FAKE NEWS' : 'LIKELY REAL NEWS'}
                </h3>
              </div>
            </div>

            {/* Model Confidence & Decision Score Box */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 px-5 sm:min-w-[220px]">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Model Decision Confidence
              </span>
              <div className="flex items-baseline justify-between gap-2 mt-0.5">
                <span
                  className={`text-2xl font-black ${
                    result.label === 'FAKE' ? 'text-rose-400' : 'text-emerald-400'
                  }`}
                >
                  {result.confidence}%
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  Score: {result.decisionScore > 0 ? `+${result.decisionScore}` : result.decisionScore}
                </span>
              </div>
              <div className="w-full bg-slate-800 h-2 rounded-full mt-2 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    result.label === 'FAKE' ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${result.confidence}%` }}
                />
              </div>
            </div>
          </div>

          {/* Model & Timestamp Audit Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Classifier</span>
              <span className="text-xs font-bold text-white block mt-0.5 truncate">{result.selectedModelName}</span>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Measured Test Accuracy</span>
              <span className="text-xs font-bold text-emerald-400 block mt-0.5">{result.modelAccuracy}%</span>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Text Statistics</span>
              <span className="text-xs font-bold text-white block mt-0.5">
                {result.linguisticSignals.wordCount} words ({result.linguisticSignals.characterCount} chars)
              </span>
            </div>
            <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800">
              <span className="text-[10px] text-slate-500 block uppercase font-bold">Prediction Timestamp</span>
              <span className="text-xs font-bold text-slate-300 block mt-0.5">{result.timestamp}</span>
            </div>
          </div>

          {/* Text Analysis Summary & Explanation */}
          <div className="bg-slate-950/80 rounded-xl p-4 sm:p-5 border border-slate-800 text-slate-300 text-xs sm:text-sm leading-relaxed space-y-2">
            <div className="flex items-center gap-2 text-white font-bold text-sm">
              <FileSearch className="w-4 h-4 text-blue-400" />
              <span>Text Analysis Summary & Explanation:</span>
            </div>
            <p>{result.explanation}</p>
          </div>

          {/* Important Text Patterns Identified */}
          <div className="space-y-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              Important Text Patterns & N-Grams Identified:
            </span>
            <div className="flex flex-wrap gap-2">
              {result.matchedFakeCues.map((term, i) => (
                <span
                  key={`fake-${i}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-rose-950 text-rose-300 border border-rose-800 flex items-center gap-1.5"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  <span>{term}</span>
                  <span className="text-[10px] text-rose-400/80 font-normal">(Deceptive Indicator)</span>
                </span>
              ))}

              {result.matchedRealCues.map((term, i) => (
                <span
                  key={`real-${i}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{term}</span>
                  <span className="text-[10px] text-emerald-400/80 font-normal">(Attribution Indicator)</span>
                </span>
              ))}

              {result.matchedFakeCues.length === 0 && result.matchedRealCues.length === 0 && (
                <span className="text-xs text-slate-500 italic py-1">
                  No high-weight single vocabulary flags detected; classification governed by overall sentence syntax and linear decision margin.
                </span>
              )}
            </div>
          </div>

          {/* Mandatory Academic Warning Banner */}
          <div className="p-4 rounded-xl bg-slate-950 border border-amber-900/60 text-xs text-amber-200/90 flex items-start gap-3 shadow-inner">
            <Info className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong className="text-amber-300 block font-bold mb-0.5">Verification Warning:</strong>
              {result.warningMessage}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
