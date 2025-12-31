
import React, { useState } from 'react';
import { Heart, Upload } from 'lucide-react';
import { SiteConfig } from '../types';
import { MediaUpload } from '../components/MediaUpload';
import { EditableText } from '../components/EditableText';

interface VirtualKissProps {
  config: SiteConfig;
  onUpdate: (key: keyof SiteConfig, val: any) => void;
  isEditMode: boolean;
}

interface Kiss {
  id: number;
  x: number;
  y: number;
  size: number;
  rotation: number;
}

export const VirtualKiss: React.FC<VirtualKissProps> = ({ config, onUpdate, isEditMode }) => {
  const [kisses, setKisses] = useState<Kiss[]>([]);

  const addKiss = () => {
    const newKiss: Kiss = {
      id: Date.now(),
      x: Math.random() * 80 + 10,
      y: Math.random() * 80 + 10,
      size: Math.random() * 60 + 80,
      rotation: Math.random() * 60 - 30,
    };
    setKisses((prev) => [...prev, newKiss]);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center overflow-hidden cursor-crosshair" onClick={addKiss}>
      <div className="text-center z-10 pointer-events-none select-none">
        <h2 className="text-5xl font-serif text-slate-800 mb-8 drop-shadow-sm">
          <EditableText 
            value={config.kissTitle} 
            onSave={(v) => onUpdate('kissTitle', v)} 
            isEditMode={isEditMode} 
          />
        </h2>
        <p className="text-slate-500 italic text-xl">
          <EditableText 
            value={config.kissDesc} 
            onSave={(v) => onUpdate('kissDesc', v)} 
            isEditMode={isEditMode} 
          />
        </p>
      </div>

      {isEditMode && (
        <div className="fixed bottom-24 bg-white/90 backdrop-blur p-4 rounded-3xl shadow-xl z-50 border border-pink-100 flex flex-col items-center gap-2">
          <span className="text-xs font-bold text-slate-400 uppercase">Custom Lips</span>
          <MediaUpload onUpload={(url) => onUpdate('kissImageUrl', url)} />
          {config.kissImageUrl && (
            <button onClick={() => onUpdate('kissImageUrl', '')} className="text-[10px] text-red-400 underline">Reset to Heart</button>
          )}
        </div>
      )}

      <button
        onClick={(e) => { e.stopPropagation(); addKiss(); }}
        className="mt-12 group bg-pink-500 text-white px-12 py-6 rounded-[2rem] text-2xl font-black shadow-2xl hover:bg-pink-600 transition-all active:scale-95 z-20"
      >
        <EditableText 
          value={config.kissButtonText} 
          onSave={(v) => onUpdate('kissButtonText', v)} 
          isEditMode={isEditMode} 
        />
      </button>

      {kisses.map((kiss) => (
        <div
          key={kiss.id}
          className="absolute animate-pop-in pointer-events-none select-none"
          style={{
            left: `${kiss.x}%`,
            top: `${kiss.y}%`,
            width: kiss.size,
            height: kiss.size,
            transform: `rotate(${kiss.rotation}deg)`,
          }}
        >
          {config.kissImageUrl ? (
            <img 
              src={config.kissImageUrl} 
              alt="Kiss" 
              className="w-full h-full object-contain drop-shadow-lg" 
            />
          ) : (
            <svg viewBox="0 0 24 24" fill="#ec4899" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-xl">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </div>
      ))}

      <style>{`
        @keyframes pop-in {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          70% { transform: scale(1.2) rotate(var(--rot)); opacity: 1; }
          100% { transform: scale(1) rotate(var(--rot)); opacity: 1; }
        }
        .animate-pop-in {
          animation: pop-in 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
      `}</style>
    </div>
  );
};
