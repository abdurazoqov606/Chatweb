
import React, { useState, useEffect, useRef } from 'react';

const BuildCenter: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'building' | 'success' | 'failed'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);
  const logEndRef = useRef<HTMLDivElement>(null);

  const buildSteps = [
    "Initializing Gradle daemon...",
    "Searching for project root...",
    "Resolving dependencies...",
    "Compiling Kotlin source code...",
    "Compiling Java source code...",
    "Processing Android resources (AAPT2)...",
    "Linking resources...",
    "Generating DEX files...",
    "Packaging APK (debug)...",
    "Signing APK with debug key...",
    "Verifying APK alignment...",
    "BUILD SUCCESSFUL in 12s"
  ];

  useEffect(() => {
    if (logEndRef.current) {
      logEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs]);

  const startBuild = () => {
    setStatus('building');
    setLogs([]);
    setProgress(0);

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < buildSteps.length) {
        setLogs(prev => [...prev, `> Task :app:${buildSteps[currentStep]}`]);
        setProgress(((currentStep + 1) / buildSteps.length) * 100);
        currentStep++;
      } else {
        clearInterval(interval);
        setStatus('success');
      }
    }, 800);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] p-4">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 mb-4 shadow-xl">
        <h2 className="text-xl font-bold text-white mb-2">Build Center</h2>
        <p className="text-slate-400 text-sm mb-6">Loyihangizni APK formatiga tayyorlang.</p>

        {status === 'idle' && (
          <button 
            onClick={startBuild}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-500/30 transition-all flex items-center justify-center space-x-2 active:scale-95"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" /></svg>
            <span>BUILD APK (DEBUG)</span>
          </button>
        )}

        {status === 'building' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center text-xs text-indigo-400 font-mono">
              <span className="animate-pulse">Building project...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
              <div 
                className="bg-indigo-500 h-full transition-all duration-500" 
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        {status === 'success' && (
          <div className="space-y-4">
            <div className="bg-green-500/20 border border-green-500/50 p-4 rounded-xl flex items-center space-x-3">
              <div className="bg-green-500 p-1 rounded-full">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
              </div>
              <div>
                <p className="text-green-400 font-bold text-sm">APK muvaffaqiyatli yaratildi!</p>
                <p className="text-[10px] text-green-400/70">app-debug.apk (4.2 MB)</p>
              </div>
            </div>
            <button 
              className="w-full py-3 bg-slate-800 border border-slate-700 text-white font-bold rounded-xl hover:bg-slate-700 transition-all"
              onClick={() => setStatus('idle')}
            >
              Yana qurish
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 bg-black rounded-xl p-4 font-mono text-[10px] overflow-y-auto no-scrollbar border border-slate-800 shadow-inner">
        <div className="flex items-center space-x-2 mb-2 text-slate-500 border-b border-slate-800 pb-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/50" />
          <div className="w-2 h-2 rounded-full bg-green-500/50" />
          <span className="ml-2">Gradle Console</span>
        </div>
        {logs.length === 0 ? (
          <div className="text-slate-700 italic">Hali loglar yo'q...</div>
        ) : (
          logs.map((log, i) => (
            <div key={i} className={`${log.includes('SUCCESSFUL') ? 'text-green-400 font-bold mt-2' : 'text-slate-300'} mb-1`}>
              {log}
            </div>
          ))
        )}
        <div ref={logEndRef} />
      </div>
      
      <div className="mt-4 p-4 bg-indigo-600/10 border border-indigo-500/20 rounded-xl">
        <h4 className="text-indigo-400 text-xs font-bold mb-1 flex items-center">
          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          Real telefonda APK olish:
        </h4>
        <p className="text-slate-400 text-[10px] leading-relaxed">
          Haqiqiy APK faylni olish uchun ushbu kodlarni telefondagi <b>AIDE</b> yoki <b>Android Studio</b>-ga nusxalab o'tkazing va "Run" tugmasini bosing.
        </p>
      </div>
    </div>
  );
};

export default BuildCenter;
