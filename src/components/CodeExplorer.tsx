import React, { useState } from 'react';
import {
  Folder,
  FileCode,
  Copy,
  Check,
  Download,
  Terminal,
  ExternalLink,
  Code2,
  FileText
} from 'lucide-react';
import { PROJECT_SOURCE_FILES, ProjectSourceFile } from '../data/projectFiles';

export const CodeExplorer: React.FC = () => {
  const [selectedFilePath, setSelectedFilePath] = useState<string>('app.py');
  const [copied, setCopied] = useState(false);

  const activeFile: ProjectSourceFile =
    PROJECT_SOURCE_FILES.find((f) => f.path === selectedFilePath) || PROJECT_SOURCE_FILES[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadActiveFile = () => {
    const blob = new Blob([activeFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    // ensure simple file name
    link.download = activeFile.name.replace('/', '_');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/60 text-emerald-300 border border-emerald-800/50 mb-2">
            <Code2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Complete Python & Flask Project Source Tree</span>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Repository Code Explorer
          </h1>
          <p className="text-slate-400 text-sm max-w-2xl mt-1">
            Browse, copy, or download the exact source code files for your local VS Code setup.
            Every file is fully implemented with zero placeholders.
          </p>
        </div>

        <button
          onClick={handleDownloadActiveFile}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 transition-all cursor-pointer flex-shrink-0"
        >
          <Download className="w-4 h-4 text-emerald-400" />
          <span>Download \`{activeFile.name}\`</span>
        </button>
      </div>

      {/* Main File Explorer Container */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[580px]">
        {/* Left Sidebar: File Tree */}
        <div className="md:col-span-4 bg-slate-950 border-r border-slate-800 p-4 space-y-3">
          <div className="flex items-center justify-between px-2 pb-2 border-b border-slate-800/80">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
              <Folder className="w-4 h-4 text-amber-400" />
              <span>Fake-News-Detection/</span>
            </span>
            <span className="text-[10px] text-slate-500 font-mono">8 files</span>
          </div>

          <div className="space-y-1">
            {PROJECT_SOURCE_FILES.map((file) => {
              const isSelected = selectedFilePath === file.path;
              return (
                <button
                  key={file.path}
                  onClick={() => setSelectedFilePath(file.path)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono transition-all text-left cursor-pointer ${
                    isSelected
                      ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-sm'
                      : 'text-slate-300 hover:bg-slate-900 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileCode
                      className={`w-4 h-4 flex-shrink-0 ${
                        file.name.endsWith('.py')
                          ? 'text-yellow-400'
                          : file.name.endsWith('.html')
                          ? 'text-orange-400'
                          : file.name.endsWith('.css')
                          ? 'text-cyan-400'
                          : 'text-slate-400'
                      }`}
                    />
                    <span className="truncate">{file.path}</span>
                  </div>
                  <span className="text-[10px] text-slate-500 uppercase">{file.language}</span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 space-y-2 px-1">
            <span className="font-semibold text-slate-300 block">How to run locally:</span>
            <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400 space-y-1">
              <div>1. python -m venv venv</div>
              <div>2. venv\Scripts\activate</div>
              <div>3. pip install -r requirements.txt</div>
              <div>4. python train_model.py</div>
              <div>5. python app.py</div>
            </div>
          </div>
        </div>

        {/* Right Pane: Code Viewer */}
        <div className="md:col-span-8 flex flex-col bg-slate-900">
          {/* File Tab Header */}
          <div className="p-3.5 bg-slate-950/60 border-b border-slate-800 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono font-bold text-white block">
                {activeFile.path}
              </span>
              <span className="text-[11px] text-slate-400 line-clamp-1">
                {activeFile.description}
              </span>
            </div>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all cursor-pointer flex-shrink-0"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>

          {/* Syntax / Code Pre */}
          <div className="p-4 flex-1 overflow-x-auto bg-[#0a0f1d] font-mono text-xs text-slate-300 leading-relaxed max-h-[640px] select-all">
            <pre>
              <code>{activeFile.content}</code>
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
