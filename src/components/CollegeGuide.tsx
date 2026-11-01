import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Sparkles,
  Terminal,
  FileCheck,
  Search,
  ExternalLink
} from 'lucide-react';
import { COLLEGE_STEPS, VIVA_QUESTIONS, VivaQuestion } from '../data/stepsData';

export const CollegeGuide: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);
  const [vivaFilter, setVivaFilter] = useState<'All' | 'ML' | 'Python' | 'Project'>('All');
  const [openVivaId, setOpenVivaId] = useState<number | null>(1);
  const [searchVivaQuery, setSearchVivaQuery] = useState('');

  const currentStep = COLLEGE_STEPS[activeStepIndex];

  const filteredViva: VivaQuestion[] = VIVA_QUESTIONS.filter((q) => {
    const matchesCategory = vivaFilter === 'All' || q.category === vivaFilter;
    const matchesSearch =
      q.question.toLowerCase().includes(searchVivaQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchVivaQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Hero */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-purple-950/60 text-purple-300 border border-purple-800/50">
          <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
          <span>B.Tech CSE Project Mentor & Viva Guide</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          22-Step Development Roadmap & College Viva Prep
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Everything you need as a 2nd-year B.Tech CSE student: step-by-step guidance from Step 1 
          to Step 22, testing tables, architecture diagrams, and 30 curated viva questions with answers.
        </p>
      </div>

      {/* Steps Navigation Slider */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl">
        <div className="flex items-center justify-between mb-3 px-2">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Project Phases (Step {currentStep.stepNumber} of 22)
          </span>
          <span className="text-xs font-semibold text-purple-400">
            {currentStep.category}
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {COLLEGE_STEPS.map((step, idx) => {
            const isCurrent = idx === activeStepIndex;
            return (
              <button
                key={step.stepNumber}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isCurrent
                    ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <div className="flex items-center gap-1.5">
                  <span className="opacity-75">#{step.stepNumber}</span>
                  <span className="truncate max-w-[140px]">{step.title.split(':')[0]}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Active Step Content Viewer */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-purple-400 tracking-wider uppercase">
              STEP {currentStep.stepNumber} DETAILED GUIDE
            </span>
            <h2 className="text-2xl font-black text-white mt-0.5">
              {currentStep.title}
            </h2>
            <p className="text-sm text-slate-400 mt-1">
              {currentStep.summary}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 disabled:opacity-40 cursor-pointer"
            >
              Previous Step
            </button>
            <button
              disabled={activeStepIndex === COLLEGE_STEPS.length - 1}
              onClick={() => setActiveStepIndex((prev) => Math.min(COLLEGE_STEPS.length - 1, prev + 1))}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40 cursor-pointer"
            >
              Next Step
            </button>
          </div>
        </div>

        {/* Step 1 Workflow Diagram Illustration if on Step 1 */}
        {currentStep.stepNumber === 1 && (
          <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                System Architecture & Workflow Diagram
              </span>
              <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                College Report Fig 1.1
              </span>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-xl border border-slate-800/80 font-mono text-xs text-blue-300 overflow-x-auto leading-relaxed">
{`+---------------------------------------------------------------------------------------+
|                              USER INTERACTION LAYER (Web UI)                           |
|  [ User enters News Headline / Article ] ----> [ Flask Web Server: app.py (Port 5000) ]|
+-------------------------------------------+-------------------------------------------+
                                            |
                                            v (HTTP POST /)
+---------------------------------------------------------------------------------------+
|                              NLP PREPROCESSING PIPELINE                                |
|  1. Lowercase conversion                                                              |
|  2. URL & HTML regex sanitization: re.sub(r'https?://\\S+|www\\.\\S+|<.*?>', ' ', text)  |
|  3. Punctuation & Digit stripping                                                     |
|  4. Whitespace normalization & English stopword filtering                             |
+-------------------------------------------+-------------------------------------------+
                                            |
                                            v Cleaned String
+---------------------------------------------------------------------------------------+
|                            FEATURE EXTRACTION (TF-IDF)                                 |
|  Loads: model/tfidf_vectorizer.joblib                                                  |
|  Transforms cleaned tokens into sparse 10,000-dimensional numerical vector             |
|  Applies unigrams (n=1) and bigrams (n=2) with inverse document frequency weights      |
+-------------------------------------------+-------------------------------------------+
                                            |
                                            v High-Dimensional Sparse Matrix
+---------------------------------------------------------------------------------------+
|                          MACHINE LEARNING CLASSIFIER INFERENCE                         |
|  Loads: model/fake_news_model.joblib (Passive Aggressive Classifier / Logistic Reg.)  |
|  Computes decision margin distance: score = w^T * x + b                               |
|  Calculates probability / confidence percentage                                       |
+-------------------------------------------+-------------------------------------------+
                                            |
                                            v Class Verdict: "REAL" or "FAKE"
+---------------------------------------------------------------------------------------+
|                           RESULT PRESENTATION & EXPLANATION                           |
|  Renders Jinja2 HTML Card: Badge (Red/Green) + Confidence % + Influential Cues Tokens |
+---------------------------------------------------------------------------------------+`}
            </div>
          </div>
        )}

        {/* Formatted Content */}
        <div className="prose prose-invert max-w-none text-slate-300 text-sm leading-relaxed space-y-4">
          <div className="whitespace-pre-line font-sans">
            {currentStep.content}
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-purple-950/30 border border-purple-900/50 rounded-xl p-4 space-y-2">
          <span className="text-xs font-bold text-purple-300 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>Key Academic Takeaways for Step {currentStep.stepNumber}</span>
          </span>
          <ul className="list-disc list-inside space-y-1 text-xs text-slate-300">
            {currentStep.keyTakeaways.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* 30 Viva Voce Questions Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>College Viva Voce Oral Exam Preparation</span>
            </div>
            <h2 className="text-2xl font-black text-white">
              30 Most Important Viva Questions with Answers
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Master every algorithm, formula, Python concept, and system trade-off. Click any question to reveal the model answer.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {(['All', 'ML', 'Python', 'Project'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setVivaFilter(cat)}
                className={`px-3 py-1 rounded-lg font-medium transition-colors cursor-pointer ${
                  vivaFilter === cat ? 'bg-purple-600 text-white' : 'text-slate-400 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar for Viva Questions */}
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={searchVivaQuery}
            onChange={(e) => setSearchVivaQuery(e.target.value)}
            placeholder="Search questions (e.g. TF-IDF, Confusion Matrix, Passive Aggressive, Virtual Environment)..."
            className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Questions Accordion List */}
        <div className="space-y-3">
          {filteredViva.map((q) => {
            const isOpen = openVivaId === q.id;
            return (
              <div
                key={q.id}
                className="bg-slate-950/70 border border-slate-800 rounded-xl overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenVivaId(isOpen ? null : q.id)}
                  className="w-full p-4 flex items-start justify-between gap-3 text-left hover:bg-slate-800/40 cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-purple-950 text-purple-300 border border-purple-800/60 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {q.id}
                    </span>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400 bg-purple-950/50 px-2 py-0.5 rounded mr-2">
                        {q.category}
                      </span>
                      <span className="font-semibold text-white text-sm">
                        {q.question}
                      </span>
                    </div>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-purple-400 flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 flex-shrink-0 mt-1" />
                  )}
                </button>

                {isOpen && (
                  <div className="px-4 pb-4 pt-1 border-t border-slate-800/80 bg-slate-900/60 text-xs sm:text-sm text-slate-300 leading-relaxed pl-13">
                    <strong className="text-purple-300 block mb-1">Standard Viva Answer:</strong>
                    {q.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
