
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

const CodeEditor: React.FC = () => {
  const [code, setCode] = useState(`class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        
        // AI yordamida yozing
    }
}`);
  const [isOptimizing, setIsOptimizing] = useState(false);

  const handleAIOptimize = async () => {
    setIsOptimizing(true);
    const optimized = await geminiService.optimizeCode(code);
    setCode(optimized);
    setIsOptimizing(false);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex flex-col bg-[#011627] relative">
      <div className="flex items-center justify-between px-4 h-12 border-b border-slate-800 bg-slate-900/50">
        <div className="flex space-x-4 text-xs text-slate-400">
          <span className="text-indigo-400 border-b-2 border-indigo-400 py-1">MainActivity.kt</span>
          <span className="py-1 opacity-50">layout.xml</span>
        </div>
        <button 
          onClick={handleAIOptimize}
          disabled={isOptimizing}
          className="flex items-center space-x-1 px-3 py-1 bg-indigo-600/20 text-indigo-400 rounded-full text-[10px] font-bold border border-indigo-500/30 hover:bg-indigo-600/30 transition-all"
        >
          {isOptimizing ? <div className="w-3 h-3 border-b-2 border-indigo-400 rounded-full animate-spin" /> : 
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
          <span>AI FIX</span>
        </button>
      </div>
      
      <div className="flex-1 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-8 h-full bg-slate-900/30 flex flex-col items-center pt-4 text-[10px] text-slate-600 mono select-none border-r border-slate-800/50">
          {Array.from({length: 40}).map((_, i) => <div key={i}>{i + 1}</div>)}
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
          className="w-full h-full pl-10 pr-4 pt-4 bg-transparent text-slate-300 mono text-sm focus:outline-none resize-none overflow-y-auto leading-relaxed"
          style={{ whiteSpace: 'pre', tabSize: 4 }}
        />
      </div>

      <div className="p-2 flex space-x-2 bg-slate-950 border-t border-slate-800 overflow-x-auto no-scrollbar">
        {['{', '}', '(', ')', ';', '.', '"', 'fun', 'val', 'if', 'else'].map(char => (
          <button 
            key={char}
            onClick={() => setCode(prev => prev + char)}
            className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg text-xs mono font-bold border border-slate-700 active:scale-95 transition-all"
          >
            {char}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CodeEditor;
