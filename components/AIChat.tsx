
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage } from '../types';
import { geminiService } from '../services/geminiService';

const AIChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('chat_history');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) }));
      } catch (e) { return []; }
    }
    return [{ 
      role: 'model', 
      text: "Salom! Men abdurazoqov_edits tomonidan sozlangan maxsus AI yordamchisiman. Kodingizni tahlil qilishga yoki yangi ilova yaratishga tayyorman!", 
      timestamp: new Date() 
    }];
  });
  
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    localStorage.setItem('chat_history', JSON.stringify(messages));
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSend = async (text: string = input) => {
    if ((!text.trim() && !selectedImage) || isLoading) return;

    const userMessage: ChatMessage = { 
      role: 'user', 
      text, 
      image: selectedImage || undefined,
      timestamp: new Date() 
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    const currentImage = selectedImage;
    setSelectedImage(null);
    setIsLoading(true);

    const response = await geminiService.getCodingAssistance(text || "Ushbu rasmni tahlil qilib bering.", currentImage || undefined);
    const modelMessage: ChatMessage = { role: 'model', text: response, timestamp: new Date() };
    
    setMessages(prev => [...prev, modelMessage]);
    setIsLoading(false);
  };

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedIndex(id);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const renderMessageText = (text: string, msgIdx: number) => {
    const parts = text.split(/(```[\s\S]*?```)/g);
    
    return parts.map((part, pIdx) => {
      if (part.startsWith('```')) {
        const code = part.replace(/```[a-z]*\n?/, '').replace(/```$/, '').trim();
        const id = `${msgIdx}-${pIdx}`;
        return (
          <div key={id} className="my-3 rounded-xl overflow-hidden border border-slate-700 bg-[#0d1117]">
            <div className="flex justify-between items-center px-4 py-2 bg-slate-800/50 border-b border-slate-700">
              <span className="text-[10px] font-mono text-slate-400 uppercase">Kod</span>
              <button 
                onClick={() => copyToClipboard(code, id)}
                className="flex items-center space-x-1 text-indigo-400 hover:text-indigo-300 transition-colors"
              >
                {copiedIndex === id ? <span className="text-[10px] font-bold">Nusxalandi!</span> : <span className="text-[10px] font-bold">Nusxa olish</span>}
              </button>
            </div>
            <pre className="p-4 text-xs font-mono text-slate-300 overflow-x-auto no-scrollbar whitespace-pre">
              <code>{code}</code>
            </pre>
          </div>
        );
      }
      return <p key={pIdx} className="whitespace-pre-wrap">{part}</p>;
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="flex justify-between items-center px-4 py-2 bg-slate-900/40 border-b border-slate-800">
        <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Vision AI Chat</span>
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
          <span className="text-[8px] text-slate-400 font-mono">ENCRYPTED BY AE</span>
        </div>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar bg-slate-950/20">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] p-3 rounded-2xl ${
              msg.role === 'user' 
                ? 'bg-indigo-600 text-white rounded-br-none' 
                : 'bg-slate-800 text-slate-200 border border-slate-700 rounded-bl-none shadow-lg'
            }`}>
              {msg.image && (
                <img src={msg.image} alt="uploaded" className="mb-3 rounded-lg max-w-full h-auto border border-white/10" />
              )}
              <div className="text-sm leading-relaxed">{renderMessageText(msg.text, idx)}</div>
              <div className="text-[8px] mt-2 opacity-30 text-right font-mono">
                {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
             <div className="bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 flex space-x-1">
               <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce"></div>
               <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
               <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
             </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-slate-900 border-t border-slate-800 space-y-3">
        {selectedImage && (
          <div className="relative inline-block">
            <img src={selectedImage} alt="preview" className="w-16 h-16 object-cover rounded-lg border-2 border-indigo-500" />
            <button onClick={() => setSelectedImage(null)} className="absolute -top-2 -right-2 bg-red-500 rounded-full p-1 text-white shadow-lg">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M6 18L18 6M6 6l12 12" strokeWidth={3} /></svg>
            </button>
          </div>
        )}
        
        <div className="flex items-center space-x-2">
          <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/*" className="hidden" />
          <button onClick={() => fileInputRef.current?.click()} className="p-3 bg-slate-800 text-slate-400 rounded-xl hover:text-indigo-400 border border-slate-700 active:scale-95 transition-all">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          </button>
          
          <div className="relative flex-1">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Savol yozing yoki rasm yuboring..."
              className="w-full bg-slate-800 border border-slate-700 text-white rounded-xl py-3 px-4 pr-12 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
            />
            <button onClick={() => handleSend()} disabled={isLoading} className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-400 p-2 disabled:opacity-30">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
