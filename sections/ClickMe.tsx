
import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';
import { SiteConfig } from '../types';
import { EditableText } from '../components/EditableText';

interface PopMessage {
  id: number;
  text: string;
  x: number;
  y: number;
}

interface ClickMeProps {
  config: SiteConfig;
  onUpdate: (key: keyof SiteConfig, val: any) => void;
  isEditMode: boolean;
}

export const ClickMe: React.FC<ClickMeProps> = ({ config, onUpdate, isEditMode }) => {
  const [activeMessages, setActiveMessages] = useState<PopMessage[]>([]);

  const handlePop = () => {
    const messages = config.missMeMessages;
    if (!messages || messages.length === 0) return;
    
    const randomMsg = messages[Math.floor(Math.random() * messages.length)];
    const newMessage: PopMessage = {
      id: Date.now(),
      text: randomMsg,
      x: Math.random() * 60 + 20,
      y: Math.random() * 60 + 20,
    };

    setActiveMessages(prev => [...prev, newMessage]);

    setTimeout(() => {
      setActiveMessages(prev => prev.filter(m => m.id !== newMessage.id));
    }, 3000);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden">
      <div className="text-center z-10 mb-12">
        <h2 className="text-4xl font-serif text-slate-800 mb-4">
          <EditableText 
            value={config.clickMeTitle} 
            onSave={(v) => onUpdate('clickMeTitle', v)} 
            isEditMode={isEditMode} 
          />
        </h2>
        <p className="text-slate-500 italic">
          <EditableText 
            value={config.clickMeDesc} 
            onSave={(v) => onUpdate('clickMeDesc', v)} 
            isEditMode={isEditMode} 
          />
        </p>
      </div>

      <button
        onClick={handlePop}
        className="relative group w-32 h-32 bg-rose-400 rounded-full flex items-center justify-center text-white shadow-2xl hover:scale-110 active:scale-90 transition-all z-20"
      >
        <Sparkles className="animate-spin-slow" size={48} />
      </button>

      {activeMessages.map((msg) => (
        <div
          key={msg.id}
          className="absolute animate-fade-up px-6 py-3 bg-white/90 backdrop-blur shadow-lg rounded-2xl border border-pink-100 z-30 pointer-events-none"
          style={{
            left: `${msg.x}%`,
            top: `${msg.y}%`,
          }}
        >
          <span className="text-slate-800 font-bold italic">"{msg.text}"</span>
        </div>
      ))}

      <style>{`
        @keyframes fade-up {
          0% { opacity: 0; transform: translateY(20px) scale(0.9); }
          20% { opacity: 1; transform: translateY(0) scale(1); }
          80% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translateY(-20px) scale(0.9); }
        }
        .animate-fade-up {
          animation: fade-up 3s ease-out forwards;
        }
        .animate-spin-slow {
          animation: spin 6s linear infinite;
        }
      `}</style>
    </div>
  );
};
