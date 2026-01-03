
import React, { useState } from 'react';
import { AppTab, Project } from './types';
import Navigation from './components/Navigation';
import ProjectList from './components/ProjectList';
import AIChat from './components/AIChat';
import CodeEditor from './components/CodeEditor';
import Preview from './components/Preview';
import ProjectModal from './components/ProjectModal';
import BuildCenter from './components/BuildCenter';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.PROJECTS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([
    {
      id: '1',
      name: 'SalomDunyo',
      language: 'Kotlin',
      lastModified: '15-May',
      description: 'Mening ilk Android ilovam.'
    },
    {
      id: '2',
      name: 'Kalkulyator',
      language: 'Java',
      lastModified: 'Kecha',
      description: 'Oddiy arifmetik kalkulyator.'
    }
  ]);

  const handleCreateProject = (name: string, description: string) => {
    const newProject: Project = {
      id: Date.now().toString(),
      name,
      description,
      language: 'Kotlin',
      lastModified: 'Bugun'
    };
    setProjects([newProject, ...projects]);
    setActiveTab(AppTab.EDITOR);
  };

  const renderContent = () => {
    switch (activeTab) {
      case AppTab.PROJECTS:
        return (
          <div className="relative h-full">
            <ProjectList projects={projects} onSelectProject={() => setActiveTab(AppTab.EDITOR)} />
            <button 
              onClick={() => setIsModalOpen(true)}
              className="fixed bottom-20 right-6 w-14 h-14 bg-indigo-600 rounded-full shadow-lg shadow-indigo-500/40 flex items-center justify-center text-white active:scale-90 transition-all z-10"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
            </button>
          </div>
        );
      case AppTab.AI_CHAT: return <AIChat />;
      case AppTab.EDITOR: return <CodeEditor />;
      case AppTab.PREVIEW: return <Preview />;
      case AppTab.BUILD: return <BuildCenter />;
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-950 max-w-md mx-auto relative overflow-hidden shadow-2xl border-x border-slate-900">
      <header className="px-4 py-4 flex items-center justify-between bg-slate-900 border-b border-slate-800">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
          </div>
          <div>
            <h1 className="text-white font-bold text-sm tracking-tight leading-tight">Studio Pro</h1>
            <p className="text-[9px] text-slate-500 font-medium">Created by <span className="text-indigo-400">abdurazoqov_edits</span></p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
           <div className="hidden xs:flex flex-col items-end mr-2">
              <span className="text-[10px] text-green-500 font-mono">Vision AI</span>
              <span className="text-[8px] text-slate-600 font-mono uppercase">Online</span>
           </div>
           <button className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-slate-400">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" /></svg>
          </button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto no-scrollbar pb-16">
        {renderContent()}
      </main>

      <Navigation activeTab={activeTab} onTabChange={setActiveTab} />
      
      <ProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onCreate={handleCreateProject} 
      />
    </div>
  );
};

export default App;
