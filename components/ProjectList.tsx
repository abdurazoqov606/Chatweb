
import React from 'react';
import { Project } from '../types';

interface ProjectListProps {
  projects: Project[];
  onSelectProject: (id: string) => void;
}

const ProjectList: React.FC<ProjectListProps> = ({ projects, onSelectProject }) => {
  
  const handleExport = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(project, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `${project.name}.studio`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    alert(`${project.name} loyihasi yuklab olindi!`);
  };

  const handleShare = (e: React.MouseEvent, project: Project) => {
    e.stopPropagation();
    const dummyLink = `https://studio.pro/share/${project.id}?ref=abdurazoqov_edits`;
    navigator.clipboard.writeText(dummyLink);
    alert("Loyiha havolasi nusxalandi! Endi buni do'stlaringizga yuborishingiz mumkin.");
  };

  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-xl font-bold text-white">Mening Loyihalarim</h2>
          <p className="text-[10px] text-slate-500 font-mono italic">abdurazoqov_edits cloud storage active</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white p-2 rounded-lg transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
        </button>
      </div>
      
      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-slate-500 text-center px-6">
          <div className="w-20 h-20 bg-slate-900 rounded-full flex items-center justify-center mb-4 border border-slate-800">
            <svg className="w-10 h-10 opacity-20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" /></svg>
          </div>
          <p className="text-sm font-medium">Loyiha mavjud emas</p>
          <p className="text-[10px] mt-1 opacity-50">Yangi loyiha yaratish uchun "+" tugmasini bosing</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => onSelectProject(project.id)}
              className="bg-slate-800/50 border border-slate-700 p-4 rounded-2xl hover:bg-slate-800 hover:border-indigo-500/50 transition-all cursor-pointer group relative overflow-hidden"
            >
              {/* Background gradient hint */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 blur-3xl -mr-16 -mt-16 group-hover:bg-indigo-500/10 transition-colors" />
              
              <div className="flex justify-between items-start relative z-10">
                <div className="flex-1 pr-4">
                  <h3 className="text-white font-bold group-hover:text-indigo-400 transition-colors">{project.name}</h3>
                  <p className="text-slate-400 text-[10px] mt-1 line-clamp-1">{project.description}</p>
                </div>
                <div className="flex flex-col items-end space-y-2">
                  <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                    project.language === 'Kotlin' ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' :
                    project.language === 'Java' ? 'bg-red-500/20 text-red-400 border border-red-500/30' :
                    'bg-indigo-500/20 text-indigo-400 border border-indigo-500/30'
                  }`}>
                    {project.language}
                  </span>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-slate-700/50 pt-3">
                <div className="flex items-center text-[9px] text-slate-500 font-mono">
                  <svg className="w-3 h-3 mr-1 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  {project.lastModified}
                </div>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={(e) => handleShare(e, project)}
                    className="p-1.5 bg-slate-700/50 hover:bg-indigo-600/30 rounded-lg text-slate-400 hover:text-indigo-400 transition-all border border-transparent hover:border-indigo-500/30"
                    title="Havola olish"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                  </button>
                  <button 
                    onClick={(e) => handleExport(e, project)}
                    className="p-1.5 bg-slate-700/50 hover:bg-green-600/30 rounded-lg text-slate-400 hover:text-green-400 transition-all border border-transparent hover:border-green-500/30"
                    title="Faylni yuklash"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-8 px-4 py-3 bg-indigo-500/5 border border-indigo-500/20 rounded-xl">
        <p className="text-[10px] text-slate-400 text-center leading-relaxed">
          Barcha loyihalar <span className="text-indigo-400 font-bold">abdurazoqov_edits</span> Cloud tizimi tomonidan himoyalangan.
        </p>
      </div>
    </div>
  );
};

export default ProjectList;
