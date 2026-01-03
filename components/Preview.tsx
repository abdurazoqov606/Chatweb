
import React from 'react';

const Preview: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-8rem)] p-8">
      <div className="relative w-full max-w-[280px] aspect-[9/19] bg-slate-900 border-[6px] border-slate-700 rounded-[3rem] shadow-2xl overflow-hidden">
        {/* Status Bar */}
        <div className="h-6 flex justify-between items-center px-6 pt-1 text-[8px] text-slate-400 font-bold">
          <span>12:45</span>
          <div className="flex space-x-1 items-center">
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" /></svg>
            <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7a1 1 0 011.414-1.414L10 14.586l6.293-6.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
          </div>
        </div>

        {/* Dynamic Notch */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-700 rounded-b-2xl z-10"></div>

        {/* Content */}
        <div className="flex flex-col items-center justify-center h-full bg-white text-slate-900 px-6 text-center">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-200">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <h1 className="text-lg font-bold">Salom Android!</h1>
          <p className="text-xs text-slate-500 mt-2">Bu sizning mobil ilovangizning ko'rinishi.</p>
          <button className="mt-8 px-6 py-2 bg-indigo-600 text-white text-xs font-bold rounded-full hover:bg-indigo-700 transition-colors">
            Xush Kelibsiz
          </button>
        </div>

        {/* Navigation Bar */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-slate-300 rounded-full"></div>
      </div>
      
      <p className="mt-6 text-slate-500 text-xs italic">Layout: activity_main.xml rendering...</p>
    </div>
  );
};

export default Preview;
