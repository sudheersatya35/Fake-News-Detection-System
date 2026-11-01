import React, { useState } from 'react';
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
  Sparkles
} from 'lucide-react';
import {
  MODELS_METRICS,
  SAMPLE_DATASET,
  VOCABULARY_WEIGHTS
} from '../data/modelsData';

export const ModelLab: React.FC = () => {
  const [selectedAlgKey, setSelectedAlgKey] = useState<'pac' | 'lr' | 'svm' | 'nb'>('pac');
  const [filterLabel, setFilterLabel] = useState<'ALL' | 'REAL' | 'FAKE'>('ALL');
  const [isTraining, setIsTraining] = useState(false);
  const [trainingLogs, setTrainingLogs] = useState<string[]>([]);
  const [trainingComplete, setTrainingComplete] = useState(false);

  const activeModel = MODELS_METRICS.find(m => m.key === selectedAlgKey) || MODELS_METRICS[0];

  const filteredSamples = SAMPLE_DATASET.filter(s => {
    if (filterLabel === 'ALL') return true;
    return s.label === filterLabel;
  });

  const handleSimulateTraining = () => {
    setIsTraining(true);
    setTrainingComplete(false);
    setTrainingLogs([]);

    const steps = [
      '[INFO] Initializing Python 3.11 environment in Fake-News-Detection...',
      '[STEP 1] Loading dataset from dataset/news.csv...',
      '  -> Successfully loaded 6,335 articles (3,171 REAL, 3,164 FAKE). Balanced distribution: 50.05% vs 49.95%.',
      '[STEP 2] Applying NLP text cleaning & regex sanitization...',
      '  -> Dropped 0 nulls, cleaned punctuation, stripped URLs and HTML tags.',
      '[STEP 3] Executing train_test_split (80% Train, 20% Test, stratify=y, random_state=42)...',
      '  -> X_train: 5,068 rows | X_test: 1,267 rows.',
      '[STEP 4] Fitting TfidfVectorizer(ngram_range=(1,2), max_features=10000, stop_words="english")...',
      '  -> Extracted 10,000 unigram and bigram numerical feature representations.',
      '[STEP 5] Training Candidate Classifiers on TF-IDF Matrix...',
      '  -> Training Multinomial Naive Bayes... Completed in 0.18s | F1: 89.30%',
      '  -> Training Logistic Regression (max_iter=1000)... Completed in 0.78s | F1: 92.47%',
      '  -> Training Linear SVM (LinearSVC)... Completed in 0.65s | F1: 93.22%',
      '  -> Training Passive Aggressive Classifier (max_iter=1000)... Completed in 0.42s | F1: 93.85%',
      '[STEP 6] Model Benchmarking Complete: Passive Aggressive Classifier selected as Best Estimator.',
      '[STEP 7] Serializing artifacts via joblib.dump()...',
      '  [OK] Saved: model/fake_news_model.joblib (1.42 MB)',
      '  [OK] Saved: model/tfidf_vectorizer.joblib (3.88 MB)',
      '[SUCCESS] Model training pipeline executed with zero errors!'
    ];

    steps.forEach((line, index) => {
      setTimeout(() => {
        setTrainingLogs(prev => [...prev, line]);
        if (index === steps.length - 1) {
          setIsTraining(false);
          setTrainingComplete(true);
        }
      }, (index + 1) * 220);
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-950/60 text-indigo-300 border border-indigo-800/50 mb-2">
            <Cpu className="w-3.5 h-3.5 text-indigo-400" />
            <span>Machine Learning Benchmarking & Evaluation Lab</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Algorithm Comparison & Training Studio
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mt-1">
            Compare 4 classical NLP classifiers trained on the identical 80:20 stratified TF-IDF 
            feature matrix, inspect confusion matrices, and review dataset records.
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
              <span>Run \`train_model.py\`</span>
            </>
          )}
        </button>
      </div>

      {/* Terminal Output Console */}
      {(trainingLogs.length > 0 || isTraining) && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 shadow-2xl font-mono text-xs overflow-hidden">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500 inline-block" />
              <span className="w-3 h-3 rounded-full bg-green-500 inline-block" />
              <span className="ml-2 font-semibold text-slate-300">python train_model.py (Virtual Environment: venv)</span>
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

      {/* 4 Models Comparison Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Award className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">
              Model Performance Comparison Matrix (Test Set: 1,267 samples)
            </h2>
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
                <th className="py-3 px-4 text-center">Precision (Fake)</th>
                <th className="py-3 px-4 text-center">Recall (Fake)</th>
                <th className="py-3 px-4 text-center">F1-Score</th>
                <th className="py-3 px-4 text-center">Train Latency</th>
                <th className="py-3 px-4 text-right">Action</th>
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
                          ★ Best
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
                      <span className="font-extrabold text-blue-400 bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-900/60">
                        {m.f1Score}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-center text-slate-400">
                      {m.trainingTimeSec}s
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`text-xs px-2.5 py-1 rounded-md font-medium ${
                          isSelected
                            ? 'bg-blue-600 text-white'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {isSelected ? 'Inspecting' : 'Inspect'}
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
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Theory & Suitability */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white">
              {activeModel.name}
            </h3>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
              Scikit-Learn Implementation
            </span>
          </div>

          <p className="text-sm text-slate-300 leading-relaxed">
            {activeModel.description}
          </p>

          <div className="bg-slate-950/70 rounded-xl p-4 border border-slate-800/80 space-y-2">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
              Why it is suitable for Fake News Detection:
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {activeModel.suitability}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">False Positive Rate (Type I)</span>
              <span className="text-base font-bold text-rose-400 mt-0.5 block">
                {((activeModel.confusionMatrix.fp / (activeModel.confusionMatrix.fp + activeModel.confusionMatrix.tn)) * 100).toFixed(2)}%
              </span>
              <span className="text-[10px] text-slate-500">Real news flagged as fake</span>
            </div>
            <div className="p-3 bg-slate-950/50 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400 block">False Negative Rate (Type II)</span>
              <span className="text-base font-bold text-amber-400 mt-0.5 block">
                {((activeModel.confusionMatrix.fn / (activeModel.confusionMatrix.fn + activeModel.confusionMatrix.tp)) * 100).toFixed(2)}%
              </span>
              <span className="text-[10px] text-slate-500">Fake news missed as real</span>
            </div>
          </div>
        </div>

        {/* Right: 2x2 Confusion Matrix Card */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-400" />
                <span>Confusion Matrix (2x2)</span>
              </h3>
              <span className="text-xs text-slate-400">Total: 1,267</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-center">
              {/* True Real */}
              <div className="p-4 rounded-xl bg-emerald-950/50 border border-emerald-800/60">
                <span className="text-[10px] font-bold text-emerald-400 uppercase block">
                  True Real (TN)
                </span>
                <span className="text-2xl font-black text-white mt-1 block">
                  {activeModel.confusionMatrix.tn}
                </span>
                <span className="text-[10px] text-emerald-300/80">Real correctly classified</span>
              </div>

              {/* False Fake (Type I) */}
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-800/60">
                <span className="text-[10px] font-bold text-rose-400 uppercase block">
                  False Fake (FP / Type I)
                </span>
                <span className="text-2xl font-black text-rose-300 mt-1 block">
                  {activeModel.confusionMatrix.fp}
                </span>
                <span className="text-[10px] text-rose-400/80">Real mistaken as fake</span>
              </div>

              {/* False Real (Type II) */}
              <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/60">
                <span className="text-[10px] font-bold text-amber-400 uppercase block">
                  False Real (FN / Type II)
                </span>
                <span className="text-2xl font-black text-amber-300 mt-1 block">
                  {activeModel.confusionMatrix.fn}
                </span>
                <span className="text-[10px] text-amber-400/80">Fake missed as real</span>
              </div>

              {/* True Fake */}
              <div className="p-4 rounded-xl bg-blue-950/50 border border-blue-800/60">
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

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            <strong>Viva Tip:</strong> In misinformation defense, reducing False Negatives (FN) protects users from viral scams, while minimizing False Positives (FP) prevents legitimate journalistic censorship.
          </div>
        </div>
      </div>

      {/* Dataset Explorer & Vocabulary Breakdown */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-400" />
              <span>Dataset Records Explorer (\`dataset/news.csv\`)</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Inspect representative records from the benchmark corpus showing real vs fake text patterns.
            </p>
          </div>

          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setFilterLabel('ALL')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterLabel === 'ALL' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({SAMPLE_DATASET.length})
            </button>
            <button
              onClick={() => setFilterLabel('REAL')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterLabel === 'REAL' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Real News
            </button>
            <button
              onClick={() => setFilterLabel('FAKE')}
              className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                filterLabel === 'FAKE' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Fake News
            </button>
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
