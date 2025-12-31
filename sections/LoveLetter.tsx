
import React, { useState } from 'react';
import { Mail, Heart } from 'lucide-react';
import { SiteConfig } from '../types';
import { EditableText } from '../components/EditableText';

interface LoveLetterProps {
  config: SiteConfig;
  onUpdate: (key: keyof SiteConfig, val: any) => void;
  isEditMode: boolean;
}

export const LoveLetter: React.FC<LoveLetterProps> = ({ config, onUpdate, isEditMode }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="relative w-full max-w-2xl h-[400px] flex items-center justify-center">
        {!isOpen ? (
          <button
            onClick={() => setIsOpen(true)}
            className="group relative w-80 h-56 transition-all duration-700 hover:scale-110 cursor-pointer"
            style={{ perspective: '1000px' }}
          >
            <div className="absolute inset-0 bg-[#f9f3e9] rounded-lg shadow-2xl border-2 border-[#e8dfcf] z-10" />
            
            <div className="absolute top-0 left-0 right-0 h-28 bg-[#fdfaf5] border-x-2 border-t-2 border-[#e8dfcf] origin-top transition-transform duration-700 z-20 rounded-t-lg group-hover:rotate-x-180" 
                 style={{ transformStyle: 'preserve-3d', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }} />
            
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 group-hover:opacity-0 transition-opacity">
              <div className="bg-red-500 p-4 rounded-full shadow-lg animate-pulse">
                <Heart fill="white" className="text-white" size={32} />
              </div>
            </div>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-[#c8b79f] font-bold tracking-[0.3em] uppercase text-xs opacity-60 text-center w-full px-4">
              <EditableText 
                value={config.letterEnvelopeText} 
                onSave={(v) => onUpdate('letterEnvelopeText', v)} 
                isEditMode={isEditMode} 
              />
            </div>
            
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-slate-700 font-bold uppercase tracking-[0.2em] animate-pulse">
              <EditableText 
                value={config.letterOpenText} 
                onSave={(v) => onUpdate('letterOpenText', v)} 
                isEditMode={isEditMode} 
              />
            </div>
          </button>
        ) : (
          <div className="absolute inset-0 bg-white p-12 md:p-16 shadow-[0_30px_90px_rgba(0,0,0,0.2)] rounded-sm border-t-[40px] border-[#fdfbf7] animate-unfold overflow-y-auto overflow-x-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[repeating-linear-gradient(transparent,transparent_31px,#000_31px,#000_32px)]" />
            
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 text-slate-300 hover:text-pink-500 transition-colors z-20 font-bold uppercase text-xs tracking-widest"
            >
              <EditableText 
                value={config.letterCloseText} 
                onSave={(v) => onUpdate('letterCloseText', v)} 
                isEditMode={isEditMode} 
              />
            </button>

            <div className="relative z-10">
              <pre className="font-handwriting text-3xl md:text-4xl text-slate-800 whitespace-pre-wrap leading-[1.5] drop-shadow-sm">
                <EditableText 
                  value={config.letterContent} 
                  onSave={(v) => onUpdate('letterContent', v)} 
                  isEditMode={isEditMode} 
                  isTextArea 
                />
              </pre>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes unfold {
          0% { opacity: 0; transform: translateY(100px) scale(0.8) rotateX(-20deg); }
          100% { opacity: 1; transform: translateY(0) scale(1) rotateX(0); }
        }
        .animate-unfold {
          animation: unfold 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </div>
  );
};
