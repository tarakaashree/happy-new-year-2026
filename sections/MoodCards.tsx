
import React, { useState } from 'react';
import { X, Heart } from 'lucide-react';
import { SiteConfig, MoodCardItem } from '../types';
import { EditableText } from '../components/EditableText';
import { MediaUpload } from '../components/MediaUpload';

interface MoodCardsProps {
  config: SiteConfig;
  onUpdate: (key: keyof SiteConfig, val: any) => void;
  isEditMode: boolean;
}

export const MoodCards: React.FC<MoodCardsProps> = ({ config, onUpdate, isEditMode }) => {
  const [selectedMood, setSelectedMood] = useState<MoodCardItem | null>(null);

  const updateCard = (id: string, field: string, value: string) => {
    const newList = config.moodCards.map(c => c.id === id ? { ...c, [field]: value } : c);
    onUpdate('moodCards', newList);
    if (selectedMood?.id === id) {
      setSelectedMood({ ...selectedMood, [field]: value } as MoodCardItem);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 py-20">
      <div className="text-center mb-20 max-w-2xl">
        <h2 className="text-5xl font-serif text-slate-800 mb-6 leading-tight">
          <EditableText 
            value={config.moodCardsTitle} 
            onSave={(v) => onUpdate('moodCardsTitle', v)} 
            isEditMode={isEditMode} 
          />
        </h2>
        <p className="text-slate-500 italic text-xl text-center">
          <EditableText 
            value={config.moodCardsDesc} 
            onSave={(v) => onUpdate('moodCardsDesc', v)} 
            isEditMode={isEditMode} 
          />
        </p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 w-full max-w-6xl">
        {config.moodCards.map((mood) => (
          <div key={mood.id} className="relative group">
            <button
              onClick={() => setSelectedMood(mood)}
              className={`${mood.bgColor} w-full h-64 rounded-[3.5rem] shadow-[0_20px_40px_-10px_rgba(0,0,0,0.05)] hover:shadow-2xl hover:-translate-y-4 transition-all duration-500 flex flex-col items-center justify-center border-2 border-white/50 group`}
            >
              <div className="bg-white/40 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform pointer-events-none">
                <Heart className="text-pink-500" fill={selectedMood?.id === mood.id ? "#ec4899" : "none"} />
              </div>
              <div className="text-2xl font-black text-slate-800 uppercase tracking-wider">
                <EditableText value={mood.label} onSave={(v) => updateCard(mood.id, 'label', v)} isEditMode={isEditMode} />
              </div>
            </button>
          </div>
        ))}
      </div>

      {selectedMood && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-fade-in" onClick={() => setSelectedMood(null)}>
          <div 
            className="bg-white rounded-[4rem] p-12 max-w-xl w-full relative shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] animate-scale-up border-8 border-pink-50"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setSelectedMood(null)}
              className="absolute top-8 right-8 p-3 hover:bg-slate-100 rounded-full transition-colors"
            >
              <X size={28} className="text-slate-400" />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="relative group/photo w-64 h-64 rounded-[3rem] overflow-hidden mb-10 shadow-2xl ring-4 ring-pink-50">
                <img src={selectedMood.photoUrl} alt="My message photo" className="w-full h-full object-cover" />
                {isEditMode && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/photo:opacity-100 transition-opacity flex items-center justify-center">
                    <MediaUpload onUpload={(url) => updateCard(selectedMood!.id, 'photoUrl', url)} />
                  </div>
                )}
              </div>
              
              <h3 className="text-4xl font-handwriting text-pink-500 mb-6 drop-shadow-sm">
                <EditableText 
                  value={config.moodCardsNoteTitle} 
                  onSave={(v) => onUpdate('moodCardsNoteTitle', v)} 
                  isEditMode={isEditMode} 
                />
              </h3>
              <p className="text-2xl text-slate-700 font-bold italic leading-relaxed text-center">
                <EditableText 
                  value={selectedMood.message} 
                  onSave={(v) => updateCard(selectedMood!.id, 'message', v)} 
                  isEditMode={isEditMode} 
                  isTextArea 
                />
              </p>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes scale-up {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-scale-up {
          animation: scale-up 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
      `}</style>
    </div>
  );
};
