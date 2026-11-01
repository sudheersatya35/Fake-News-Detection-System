import React, { useState } from 'react';
import {
  Layers,
  ArrowRight,
  Database,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  Workflow,
  Sparkles,
  GitBranch,
  FileCheck
} from 'lucide-react';

export const ArchitectureView: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(1);

  const layers = [
    {
      id: 1,
      title: 'Layer 1: Presentation & User Interface',
      tag: 'Frontend Layer',
      icon: <ShieldCheck className="w-5 h-5 text-blue-400" />,
      description: 'Provides a clean, accessible interface where users paste news headlines and articles, select models, and view categorized predictions.',
      responsibilities: [
        'Accepts news headlines and full article paragraphs',
        'Validates that input is non-empty and contains at least 3 words',
        'Displays visual credibility badges: Green for Real, Red for Fake',
        'Displays Model Confidence % and Transparent Linguistic Indicators'
      ]
    },
    {
      id: 2,
      title: 'Layer 2: Natural Language Processing (NLP) Sanitization',
      tag: 'Data Pipeline Layer',
      icon: <Workflow className="w-5 h-5 text-purple-400" />,
      description: 'Cleans and normalizes incoming unstructured text to isolate semantic words and remove extraneous internet noise.',
      responsibilities: [
        'Converts all characters to lowercase for uniform representation',
        'Strips web URLs, domain links, and scrape artifacts',
        'Removes HTML markup tags and formatting residue',
        'Eliminates punctuation symbols and numbers to focus on lexical tokens',
        'Removes common English stopwords ("the", "is", "at", "which")'
      ]
    },
    {
      id: 3,
      title: 'Layer 3: TF-IDF Mathematical Feature Extraction',
      tag: 'Vector Space Layer',
      icon: <Database className="w-5 h-5 text-amber-400" />,
      description: 'Transforms cleaned text strings into high-dimensional numerical coordinates in vector space.',
      responsibilities: [
        'Extracts Unigrams (single words) and Bigrams (word pairs like "miracle cure")',
        'Computes Term Frequency (TF): Word occurrence within the article',
        'Computes Inverse Document Frequency (IDF): Penalizes universally frequent words',
        'Maps text to a fixed 10,000-dimensional sparse feature representation'
      ]
    },
    {
      id: 4,
      title: 'Layer 4: Supervised Machine Learning Inference',
      tag: 'Intelligence Layer',
      icon: <Cpu className="w-5 h-5 text-emerald-400" />,
      description: 'Evaluates the vector in high-dimensional space against the decision boundary learned during training.',
      responsibilities: [
        'Employs trained margin-based algorithms (Passive Aggressive Classifier, Linear SVM, etc.)',
        'Calculates distance from the separating hyperplane',
        'Generates binary class prediction: REAL or FAKE',
        'Computes decision confidence probability (50% to 99%)'
      ]
    },
    {
      id: 5,
      title: 'Layer 5: Decision Explanation & Metric Delivery',
      tag: 'Explainability Layer',
      icon: <Sparkles className="w-5 h-5 text-indigo-400" />,
      description: 'Translates raw mathematical margins into human-understandable insights, highlighting why the model reached its verdict.',
      responsibilities: [
        'Identifies high-impact vocabulary tokens (sensational words vs attribution words)',
        'Calculates all-caps density and exclamation mark intensity',
        'Generates human-readable summary sentences explaining the decision',
        'Presents academic disclaimers reminding users that the model evaluates stylistic patterns'
      ]
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Header */}
      <div className="space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-blue-950/60 text-blue-300 border border-blue-800/50">
          <Layers className="w-3.5 h-3.5 text-blue-400" />
          <span>Software Engineering & System Architecture</span>
        </div>
        <h1 className="text-3xl font-black text-white tracking-tight">
          System Architecture & Data Flow Design
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl">
          Explore the five modular architectural layers, Data Flow Diagrams (DFD), and UML Use Case 
          structures powering the Fake News Detection framework without needing to inspect raw code.
        </p>
      </div>

      {/* Layer Tabs & Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Layer Selector */}
        <div className="lg:col-span-5 space-y-2.5">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block px-1">
            Architectural Layers
          </span>
          {layers.map((layer) => {
            const isSelected = activeLayer === layer.id;
            return (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`w-full p-4 rounded-xl border text-left transition-all cursor-pointer flex items-center justify-between ${
                  isSelected
                    ? 'bg-slate-800 border-blue-500/80 shadow-lg shadow-blue-500/10'
                    : 'bg-slate-900 border-slate-800 hover:bg-slate-800/50 text-slate-400'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-slate-950 border border-slate-800">
                    {layer.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-blue-400 uppercase block">
                      {layer.tag}
                    </span>
                    <span className={`text-sm font-bold block ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                      {layer.title}
                    </span>
                  </div>
                </div>
                <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Right: Active Layer Detail Card */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
          {(() => {
            const layer = layers.find((l) => l.id === activeLayer) || layers[0];
            return (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800">
                      {layer.icon}
                    </div>
                    <div>
                      <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
                        {layer.tag}
                      </span>
                      <h3 className="text-xl font-black text-white mt-0.5">
                        {layer.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    Step {layer.id} of 5
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed">
                  {layer.description}
                </p>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                    Core Functional Responsibilities:
                  </span>
                  <div className="space-y-2">
                    {layer.responsibilities.map((resp, idx) => (
                      <div
                        key={idx}
                        className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80 flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Visual System Architecture Diagram (DFD Level 0 & Level 1) */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider">
              Data Flow Diagram (DFD Level 1)
            </span>
            <h2 className="text-xl font-black text-white mt-0.5">
              Information Flow from Input to Classification
            </h2>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-lg">
            Academic Reference Diagram
          </span>
        </div>

        <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800/80 font-mono text-xs text-blue-300 overflow-x-auto leading-relaxed">
{`[ USER INTERACTION ]
        │
        ▼ (Submits headline or news article text)
[ 1.0 INPUT VALIDATION & DISPATCHER ]
        │ ── (If empty / < 3 words) ──> [ Return Guidance Alert ]
        │
        ▼ (Valid text)
[ 2.0 NATURAL LANGUAGE PROCESSING (NLP) PIPELINE ]
        │ ── Normalize case to lowercase
        │ ── Filter web hyperlinks and HTML artifacts
        │ ── Remove punctuation symbols and digits
        │ ── Discard common English stopwords
        │
        ▼ (Cleaned semantic string)
[ 3.0 TF-IDF NUMERICAL VECTOR MAPPING ]
        │ ── Lookup terms in 10,000-word vocabulary
        │ ── Calculate Term Frequency (TF) * Inverse Document Frequency (IDF)
        │ ── Generate Unigram & Bigram coordinate vector
        │
        ▼ (High-dimensional sparse coordinate)
[ 4.0 MACHINE LEARNING MARGIN CLASSIFICATION ]
        │ ── Evaluate position against separating hyperplane
        │ ── Passive Aggressive / Linear SVM margin calculation
        │ ── Convert distance into Confidence Probability %
        │
        ▼ (Prediction: REAL or FAKE + Score + Cues)
[ 5.0 USER INTERFACE RESULT CARD GENERATION ]
        │
        ▼
[ Real-Time Display with Status Badge, Metric Gauges & Disclaimers ]`}
        </div>
      </div>

      {/* UML Use Case Diagram Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">
              System Modeling (UML)
            </span>
            <h2 className="text-xl font-black text-white mt-0.5">
              Use Case Actor & Action Matrix
            </h2>
          </div>
          <span className="text-xs bg-slate-800 text-slate-300 px-3 py-1 rounded-lg">
            College Project UML Specification
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
              Actor: End User / Student
            </span>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>Input news headline or article</li>
              <li>Select active machine learning classifier</li>
              <li>Trigger automated authenticity analysis</li>
              <li>Inspect decision confidence and linguistic cues</li>
              <li>Clear form and test pre-set news scenarios</li>
            </ul>
          </div>

          <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Actor: ML System Engine
            </span>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>Preprocess and sanitize raw strings</li>
              <li>Transform tokens into TF-IDF vector space</li>
              <li>Evaluate mathematical decision boundary</li>
              <li>Compute probability and confidence scores</li>
              <li>Highlight matched influential n-grams</li>
            </ul>
          </div>

          <div className="bg-slate-950/70 p-5 rounded-xl border border-slate-800 space-y-3">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
              Actor: Project Evaluator / Guide
            </span>
            <ul className="text-xs text-slate-300 space-y-2 list-disc list-inside">
              <li>Review algorithm benchmark metrics</li>
              <li>Examine Confusion Matrix quadrants</li>
              <li>Verify test cases and edge scenario handling</li>
              <li>Inspect academic disclaimers and scope</li>
              <li>Conduct Viva Voce examination</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
