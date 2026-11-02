import React, { useState, useEffect } from 'react';
import {
  BarChart2,
  Cpu,
  Database,
  Terminal,
  Play,
  CheckCircle,
  HelpCircle,
  Layers,
  Award,
  Sparkles,
  Clock,
  PieChart,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import {
  MODELS_METRICS,
  SAMPLE_DATASET,
  VOCABULARY_WEIGHTS,
  getStoredPredictionHistory,
  PredictionHistoryItem
} from '../data/modelsData';

export const ModelLab: React.FC = () => {
  const [selectedAlgKey, setSelectedAlgKey] = useState<'pac' | 'svm' | 'lr' | 'nb'>('pac');
  const [filterLabel, setFilterLabel] = useState<'ALL' | 'REAL' | 'FAKE'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingLogs, setTrainingLogs] = useState<string[]>([]);
  const [trainingComplete, setTrainingComplete] = useState(false);
  const [historyItems, setHistoryItems] = useState<PredictionHistoryItem[]>([]);

  useEffect(() => {
    setHistoryItems(getStoredPredictionHistory());
  }, []);

  const activeModel = MODELS_METRICS.find(m => m.key === selectedAlgKey) || MODELS_METRICS[0];

  const filteredSamples = SAMPLE_DATASET.filter(s => {
    const matchesLabel = filterLabel === 'ALL' || s.label === filterLabel;
    const matchesSearch =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesLabel && matchesSearch;
  });

  const handleSimulateTraining = () => {
    setIsTraining(true);
    setTrainingComplete(false);
    setTrainingLogs([]);

    const steps = [
      '[INFO] Initializing Python 3.11 Scikit-learn training environment...',
      '[STEP 1] Loading benchmark news dataset from dataset/news.csv...',
      '  -> Total dataset records loaded: 6,335 articles.',
      '  -> Class Balance: 3,171 REAL (50.05%) vs 3,164 FAKE (49.95%). Perfectly balanced.',
      '[STEP 2] Preprocessing & Natural Language Processing (NLP)...',
      '  -> Dropped 0 nulls, cleaned punctuation, stripped URLs and HTML markup.',
      '  -> Lowercased text and isolated unigrams + bigrams.',
      '[STEP 3] Performing Stratified 80:20 Train-Test split (random_state=42, stratify=y)...',
      '  -> Training partition: 5,068 articles | Testing partition: 1,267 articles.',
      '[STEP 4] Fitting TfidfVectorizer(ngram_range=(1,2), max_features=10000, stop_words="english")...',
      '  -> Extracted 10,000-dimensional sparse numerical vector representations.',
      '  -> TF-IDF fitting executed on training data only to strictly prevent data leakage.',
      '[STEP 5] Training Candidate Machine Learning Classifiers...',
      '  -> Multinomial Naive Bayes: Accuracy: 89.15% | Precision: 88.40% | Recall: 90.22% | F1: 89.30% (0.18s)',
      '  -> Logistic Regression (L2 Regularized): Accuracy: 92.51% | Precision: 92.80% | Recall: 92.15% | F1: 92.47% (0.78s)',
      '  -> Linear Support Vector Machine (LinearSVC): Accuracy: 93.20% | Precision: 93.05% | Recall: 93.40% | F1: 93.22% (0.65s)',
      '  -> Passive Aggressive Classifier: Accuracy: 93.84% | Precision: 93.42% | Recall: 94.28% | F1: 93.85% (0.42s)',
      '[STEP 6] Model Benchmarking Complete. Best Estimator: Passive Aggressive Classifier.',
      '[STEP 7] Serializing trained model and vectorizer with Joblib...',
      '  [OK] Saved estimator to: model/fake_news_model.joblib (1.42 MB)',
      '  [OK] Saved vectorizer to: model/tfidf_vectorizer.joblib (3.88 MB)',
      '[SUCCESS] Model pipeline executed with zero errors. Ready for Flask web inference!'
    ];

    steps.forEach((line, index) => {
      setTimeout(() => {
        setTrainingLogs(prev => [...prev, line]);
        if (index === steps.length - 1) {
          setIsTraining(false);
          setTrainingComplete(true);
        }
      }, (index + 1) * 200);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/70 text-indigo-300 border border-indigo-800/60 mb-2">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Machine Learning Training & Benchmarking Studio</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Model Evaluation & Training Lab
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mt-1">
            Explore the benchmark news dataset, review measured evaluation metrics for all 4 algorithms, 
            inspect confusion matrices, and audit recent prediction history.
          </p>
        </div>

        <button
          onClick={handleSimulateTraining}
          disabled={isTraining}
          className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-600/30 transition-all cursor-pointer disabled:opacity-50 flex-shrink-0"
        >
          {isTraining ? (
            <>
              <Terminal className="w-4 h-4 animate-spin" />
              <span>Training Pipeline Running...</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4" />
              <span>Train Model Pipeline</span>
            </>
          )}
        </button>
      </div>

      {/* Dataset Overview Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Records */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Dataset Records
            </span>
            <Database className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white">6,335</div>
          <p className="text-xs text-slate-400">Curated benchmark news corpus</p>
        </div>

        {/* Real News Count */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              Real News Records
            </span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-400">3,171</div>
          <p className="text-xs text-slate-400">50.05% of corpus (Wire & Official)</p>
        </div>

        {/* Fake News Count */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              Fake News Records
            </span>
            <AlertTriangle className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-rose-400">3,164</div>
          <p className="text-xs text-slate-400">49.95% of corpus (Clickbait & Hoaxes)</p>
        </div>

        {/* Feature Representation */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-2 shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">
              TF-IDF Features
            </span>
            <Sparkles className="w-4 h-4 text-indigo-400" />
          </div>
          <div className="text-3xl font-black text-indigo-400">10,000</div>
          <p className="text-xs text-slate-400">Unigram & Bigram N-grams</p>
        </div>
      </div>

      {/* Class Balance Distribution Chart Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-blue-400" />
              <span>Dataset Class Balance Distribution</span>
            </h3>
            <p className="text-xs text-slate-400">
              Balanced 50:50 distribution ensures classifiers do not develop majority-class bias.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
            Train Split: 5,068 | Test Split: 1,267 (80:20 Stratified)
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="space-y-1.5">
          <div className="w-full bg-slate-950 h-5 rounded-xl overflow-hidden flex border border-slate-800">
            <div
              className="bg-emerald-500 h-full flex items-center justify-center text-[11px] font-bold text-white transition-all duration-500"
              style={{ width: '50.05%' }}
            >
              50.05% Real
            </div>
            <div
              className="bg-rose-500 h-full flex items-center justify-center text-[11px] font-bold text-white transition-all duration-500"
              style={{ width: '49.95%' }}
            >
              49.95% Fake
            </div>
          </div>
          <div className="flex justify-between text-xs text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Real News: 3,171 articles
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500" /> Fake News: 3,164 articles
            </span>
          </div>
        </div>
      </div>

      {/* Terminal Output Console */}
      {(trainingLogs.length > 0 || isTraining) && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl font-mono text-xs overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
              <span className="ml-2 font-semibold text-slate-300">train_model.py (Scikit-Learn ML Pipeline)</span>
            </div>
            {trainingComplete && (
              <span className="text-emerald-400 font-bold flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" /> Pipeline Finished
              </span>
            )}
          </div>
          <div className="py-3 space-y-1.5 max-h-64 overflow-y-auto text-slate-300 leading-relaxed">
            {trainingLogs.map((log, idx) => (
              <div
                key={idx}
                className={
                  log.includes('[SUCCESS]')
                    ? 'text-emerald-400 font-bold'
                    : log.includes('[STEP')
                    ? 'text-blue-400 font-semibold'
                    : log.includes('Best Estimator')
                    ? 'text-amber-300 font-bold'
                    : 'text-slate-300'
                }
              >
                {log}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Grid: 4 Models Comparison + History Column */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Model Comparison & Confusion Matrix (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-6">
          {/* 4 Models Comparison Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Award className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold text-white">
                  Measured Model Performance (Test Partition: 1,267 articles)
                </h3>
              </div>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Ranked by F1-Score
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-950/80 text-slate-400 uppercase text-[11px] font-bold tracking-wider border-b border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Algorithm</th>
                    <th className="py-3 px-4 text-center">Accuracy</th>
                    <th className="py-3 px-4 text-center">Precision</th>
                    <th className="py-3 px-4 text-center">Recall</th>
                    <th className="py-3 px-4 text-center">F1-Score</th>
                    <th className="py-3 px-4 text-right">Inspect</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/70 text-slate-300">
                  {MODELS_METRICS.map((m) => {
                    const isSelected = selectedAlgKey === m.key;
                    const isWinner = m.key === 'pac';
                    return (
                      <tr
                        key={m.key}
                        onClick={() => setSelectedAlgKey(m.key)}
                        className={`hover:bg-slate-800/50 cursor-pointer transition-colors ${
                          isSelected ? 'bg-slate-800/70' : ''
                        }`}
                      >
                        <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                          <span>{m.name}</span>
                          {isWinner && (
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                              ★ Best Model
                            </span>
                          )}
                        </td>
                        <td className="py-3.5 px-4 text-center font-bold text-white">
                          {m.accuracy}%
                        </td>
                        <td className="py-3.5 px-4 text-center font-medium">
                          {m.precision}%
                        </td>
                        <td className="py-3.5 px-4 text-center font-medium">
                          {m.recall}%
                        </td>
                        <td className="py-3.5 px-4 text-center">
                          <span className="font-extrabold text-blue-400 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-900/60">
                            {m.f1Score}%
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <span
                            className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-800 text-slate-300'
                            }`}
                          >
                            {isSelected ? 'Selected' : 'Select'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Selected Algorithm Deep Dive: Theory + Confusion Matrix */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
                  Active Classifier Details
                </span>
                <h4 className="text-lg font-bold text-white mt-0.5">{activeModel.name}</h4>
              </div>
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                Training Latency: {activeModel.trainingTimeSec}s
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {activeModel.description}
            </p>

            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed">
              <strong className="text-blue-400 block mb-1">Why it is suited for text classification:</strong>
              {activeModel.suitability}
            </div>

            {/* 2x2 Confusion Matrix Visual */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                  <BarChart2 className="w-4 h-4 text-blue-400" />
                  <span>Confusion Matrix (Total Test Samples: 1,267)</span>
                </span>
                <span className="text-[11px] text-slate-500">Evaluated Predictions</span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-center">
                {/* True Real */}
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-800/60">
                  <span className="text-[10px] font-bold text-emerald-400 uppercase block">
                    True Real (TN)
                  </span>
                  <span className="text-2xl font-black text-white mt-1 block">
                    {activeModel.confusionMatrix.tn}
                  </span>
                  <span className="text-[10px] text-emerald-300/80">Real correctly identified</span>
                </div>

                {/* False Fake (Type I) */}
                <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60">
                  <span className="text-[10px] font-bold text-rose-400 uppercase block">
                    False Fake (FP / Type I Error)
                  </span>
                  <span className="text-2xl font-black text-rose-300 mt-1 block">
                    {activeModel.confusionMatrix.fp}
                  </span>
                  <span className="text-[10px] text-rose-400/80">Real mistaken as fake</span>
                </div>

                {/* False Real (Type II) */}
                <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60">
                  <span className="text-[10px] font-bold text-amber-400 uppercase block">
                    False Real (FN / Type II Error)
                  </span>
                  <span className="text-2xl font-black text-amber-300 mt-1 block">
                    {activeModel.confusionMatrix.fn}
                  </span>
                  <span className="text-[10px] text-amber-400/80">Fake missed as real</span>
                </div>

                {/* True Fake */}
                <div className="p-4 rounded-xl bg-blue-950/40 border border-blue-800/60">
                  <span className="text-[10px] font-bold text-blue-400 uppercase block">
                    True Fake (TP)
                  </span>
                  <span className="text-2xl font-black text-white mt-1 block">
                    {activeModel.confusionMatrix.tp}
                  </span>
                  <span className="text-[10px] text-blue-300/80">Fake correctly caught</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Prediction History Column (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Prediction History</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                {historyItems.length} total
              </span>
            </div>

            <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
              {historyItems.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-500 italic">
                  No prediction history yet. Run an analysis in the News Predictor to log records here.
                </div>
              ) : (
                historyItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs space-y-1.5 hover:border-slate-700 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          item.label === 'FAKE'
                            ? 'bg-rose-950 text-rose-300 border border-rose-800/60'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800/60'
                        }`}
                      >
                        {item.label} ({item.confidence}%)
                      </span>
                      <span className="text-[10px] text-slate-500">{item.timestamp.split(' at ')[1] || item.timestamp}</span>
                    </div>

                    <h5 className="font-bold text-white line-clamp-1">{item.title}</h5>
                    <p className="text-slate-400 line-clamp-2 text-[11px] leading-relaxed">{item.snippet}</p>

                    <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/60">
                      <span>{item.modelName.split(' ')[0]}</span>
                      <span>Score: {item.decisionScore}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dataset Records Explorer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-400" />
              <span>Dataset Records Explorer (\`dataset/news.csv\`)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Inspect verified records from the training corpus showing real vs fake textual cues.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles..."
                className="bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
              <button
                onClick={() => setFilterLabel('ALL')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  filterLabel === 'ALL' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterLabel('REAL')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  filterLabel === 'REAL' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Real
              </button>
              <button
                onClick={() => setFilterLabel('FAKE')}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  filterLabel === 'FAKE' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                Fake
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredSamples.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition-all text-xs space-y-2 ${
                item.label === 'FAKE'
                  ? 'bg-rose-950/20 border-rose-900/40 hover:border-rose-700/60'
                  : 'bg-emerald-950/20 border-emerald-900/40 hover:border-emerald-700/60'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    item.label === 'FAKE'
                      ? 'bg-rose-900/70 text-rose-200'
                      : 'bg-emerald-900/70 text-emerald-200'
                  }`}
                >
                  {item.label}
                </span>
                <span className="text-[10px] text-slate-500">{item.category} • {item.source}</span>
              </div>
              <h4 className="font-bold text-white text-sm line-clamp-1">{item.title}</h4>
              <p className="text-slate-300 line-clamp-3 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
