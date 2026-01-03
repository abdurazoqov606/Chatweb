
import React, { useState } from 'react';
import { geminiService } from '../services/geminiService';

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (name: string, desc: string) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ isOpen, onClose, onCreate }) => {
  const [idea, setIdea] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleAIDesign = async () => {
    if (!idea.trim()) return;
    setLoading(true);
    const suggestion = await geminiService.suggestProject(idea);
    onCreate(suggestion.name, suggestion.description);
    setIdea('');
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-700 w-full max-w-sm rounded-2xl p-6 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-2">Yangi G'oya?</h3>
        <p className="text-slate-400 text-sm mb-4">Ilovangiz nima haqida bo'lishini yozing, AI qolganini qiladi.</p>
        
        <textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Masalan: Ovqat yetkazib berish ilovasi..."
          className="w-full bg-slate-800 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-indigo-500 outline-none mb-4 resize-none h-24"
        />

        <div className="flex space-x-3">
          <button 
            onClick={onClose}
            className="flex-1 py-3 text-slate-400 font-medium hover:text-white transition-colors"
          >
            Bekor qilish
          </button>
          <button 
            onClick={handleAIDesign}
            disabled={loading || !idea.trim()}
            className="flex-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white font-bold rounded-xl transition-all flex items-center justify-center"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : 'AI bilan Yaratish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
