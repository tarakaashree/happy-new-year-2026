
import React, { useState, useRef } from 'react';
import { SiteConfig } from '../types';
import { EditableText } from '../components/EditableText';
import { MediaUpload } from '../components/MediaUpload';
import { Play, Pause, Heart, Sparkles, Mic2 } from 'lucide-react';

interface HearMeProps {
  config: SiteConfig;
  onUpdate: (key: keyof SiteConfig, val: any) => void;
  isEditMode: boolean;
}

export const HearMe: React.FC<HearMeProps> = ({ config, onUpdate, isEditMode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleVoice = () => {
    if (audioRef.current && config.voiceUrl) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <div className="max-w-md w-full text-center z-10">
        <h2 className="text-6xl font-serif text-slate-800 mb-12 drop-shadow-sm">
          <EditableText 
            value={config.hearMeTitle} 
            onSave={(v) => onUpdate('hearMeTitle', v)} 
            isEditMode={isEditMode} 
          />
        </h2>
        
        <div className="relative group mb-12">
          {/* Pulsing Aura */}
          <div className={`absolute inset-0 bg-pink-400/30 blur-[80px] rounded-full transition-all duration-1000 ${isPlaying ? 'scale-150 opacity-100 animate-pulse' : 'scale-100 opacity-40'}`} />
          
          <button
            onClick={toggleVoice}
            disabled={!config.voiceUrl && !isEditMode}
            className={`
              relative w-72 h-72 mx-auto rounded-full flex items-center justify-center 
              bg-white shadow-[0_30px_70px_-15px_rgba(236,72,153,0.4)]
              border-8 border-pink-50 hover:scale-105 active:scale-95 transition-all duration-500
              ${!config.voiceUrl ? 'opacity-50 grayscale' : ''}
            `}
          >
            {/* Spinning ring when playing */}
            <div className={`absolute inset-3 border-4 border-dotted border-pink-200 rounded-full ${isPlaying ? 'animate-spin-slow' : ''}`} />
            
            {isPlaying ? (
              <Pause size={100} className="text-pink-500 fill-pink-500" />
            ) : (
              <div className="flex flex-col items-center gap-4">
                <Heart size={100} className="text-pink-500 hover:fill-pink-500 transition-all duration-500 animate-bounce-slow" />
                {!config.voiceUrl && isEditMode && (
                  <span className="text-[10px] font-black text-pink-300 uppercase tracking-[0.3em]">No Audio File</span>
                )}
              </div>
            )}
          </button>

          {isPlaying && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(8)].map((_, i) => (
                <Sparkles 
                  key={i} 
                  size={24} 
                  className="absolute text-yellow-400 animate-pop-and-fade" 
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${i * 0.15}s`
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <audio 
          ref={audioRef} 
          src={config.voiceUrl} 
          onEnded={() => setIsPlaying(false)}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />

        <div className="bg-white/60 backdrop-blur-xl p-10 rounded-[3rem] border border-white shadow-lg relative overflow-hidden group/caption">
          <div className="absolute top-0 left-0 w-2 h-full bg-pink-400 opacity-20 group-hover/caption:opacity-100 transition-opacity" />
          <p className="text-3xl font-handwriting text-slate-700 italic leading-relaxed">
            <EditableText 
              value={config.voiceCaption} 
              onSave={(v) => onUpdate('voiceCaption', v)} 
              isEditMode={isEditMode} 
              isTextArea
            />
          </p>
        </div>

        {isEditMode && (
          <div className="mt-12 p-6 bg-white/90 backdrop-blur rounded-[2.5rem] border border-pink-100 shadow-2xl inline-flex flex-col items-center gap-4">
            <div className="flex items-center gap-2 text-pink-600 font-black text-xs uppercase tracking-[0.3em]">
              <Mic2 size={16} />
              <span>Your Voice Message</span>
            </div>
            <MediaUpload 
              onUpload={(url) => onUpdate('voiceUrl', url)} 
              accept="audio/*"
            />
            {config.voiceUrl && (
              <div className="flex items-center gap-2 text-[10px] text-emerald-500 font-black uppercase tracking-widest">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-ping" />
                Ready to Hear
              </div>
            )}
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }
        @keyframes pop-and-fade {
          0% { transform: scale(0) rotate(0deg); opacity: 0; }
          50% { transform: scale(1.2) rotate(180deg); opacity: 1; }
          100% { transform: scale(0) rotate(360deg); opacity: 0; }
        }
        .animate-spin-slow { animation: spin 15s linear infinite; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
        .animate-pop-and-fade { animation: pop-and-fade 2s ease-out infinite; }
      `}</style>
    </div>
  );
};
