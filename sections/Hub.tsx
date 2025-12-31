
import React from 'react';
import { 
  Mic2, Camera, Music, MessageCircleHeart, 
  Smile, Milestone, Heart, Mail, Sparkles, Star
} from 'lucide-react';
import { Page, SiteConfig } from '../types';
import { EditableText } from '../components/EditableText';

interface HubProps {
  config: SiteConfig;
  onUpdate: (key: keyof SiteConfig, val: any) => void;
  onNavigate: (page: Page) => void;
  isEditMode: boolean;
}

export const Hub: React.FC<HubProps> = ({ config, onUpdate, onNavigate, isEditMode }) => {
  const HUB_CARDS = [
    { id: 'HEAR_ME', configKey: 'hubHearMeLabel' as keyof SiteConfig, icon: Mic2, color: 'text-rose-500', bg: 'bg-rose-50', border: 'border-rose-100', shadow: 'shadow-rose-100' },
    { id: 'POLAROIDS', configKey: 'hubMemoriesLabel' as keyof SiteConfig, icon: Camera, color: 'text-amber-500', bg: 'bg-amber-50', border: 'border-amber-100', shadow: 'shadow-amber-100' },
    { id: 'PLAYLIST', configKey: 'hubPlaylistLabel' as keyof SiteConfig, icon: Music, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100', shadow: 'shadow-indigo-100' },
    { id: 'CLICK_ME', configKey: 'hubMissMeLabel' as keyof SiteConfig, icon: MessageCircleHeart, color: 'text-pink-500', bg: 'bg-pink-50', border: 'border-pink-100', shadow: 'shadow-pink-100' },
    { id: 'VIRTUAL_KISS', configKey: 'hubKissLabel' as keyof SiteConfig, icon: Heart, color: 'text-red-500', bg: 'bg-red-50', border: 'border-red-100', shadow: 'shadow-red-100' },
    { id: 'TIMELINE', configKey: 'hubTimelineLabel' as keyof SiteConfig, icon: Milestone, color: 'text-emerald-500', bg: 'bg-emerald-50', border: 'border-emerald-100', shadow: 'shadow-emerald-100' },
    { id: 'MOOD_CARDS', configKey: 'hubMoodsLabel' as keyof SiteConfig, icon: Smile, color: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-100', shadow: 'shadow-orange-100' },
    { id: 'LOVE_LETTER', configKey: 'hubLetterLabel' as keyof SiteConfig, icon: Mail, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100', shadow: 'shadow-blue-100' },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-20 px-6 relative overflow-hidden">
      <div className="absolute top-20 left-20 animate-bounce-slow text-rose-300/20 select-none pointer-events-none">
        <Heart size={160} fill="currentColor" />
      </div>
      <div className="absolute -bottom-10 -left-10 animate-pulse text-pink-200/30 select-none pointer-events-none">
        <Sparkles size={200} />
      </div>
      <div className="absolute top-1/2 -right-20 animate-pulse text-amber-200/20 select-none pointer-events-none">
        <Star size={240} fill="currentColor" />
      </div>

      <div className="mb-20 text-center z-10 animate-fade-in-up">
        <div className="inline-flex items-center gap-3 bg-white/70 backdrop-blur-xl px-8 py-3 rounded-full text-pink-600 text-sm font-black mb-8 shadow-2xl border border-white ring-8 ring-pink-50/30">
          <Sparkles size={18} className="animate-spin-slow" />
          <span className="tracking-[0.4em] uppercase">Happy New Year 2026</span>
        </div>
        
        <h1 className="text-8xl md:text-[10rem] font-serif font-black text-slate-800 mb-8 leading-[0.9] tracking-tighter">
          <EditableText 
            value={config.homeTitle} 
            onSave={(v) => onUpdate('homeTitle', v)} 
            isEditMode={isEditMode}
            className="block drop-shadow-[0_20px_20px_rgba(0,0,0,0.08)]"
          />
        </h1>
        
        <div className="flex items-center justify-center gap-6 text-3xl md:text-4xl text-slate-400 font-handwriting italic opacity-80 mt-4">
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-slate-300 hidden md:block" />
          <EditableText 
            value={config.homeSubtext} 
            onSave={(v) => onUpdate('homeSubtext', v)} 
            isEditMode={isEditMode}
          />
          <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-slate-300 hidden md:block" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 max-w-7xl w-full z-10 px-4">
        {HUB_CARDS.map((card, index) => (
          <button
            key={card.id}
            onClick={() => onNavigate(card.id as Page)}
            className={`
              group relative flex flex-col items-center p-10 md:p-14 
              bg-white/60 backdrop-blur-2xl rounded-[4rem] 
              border-2 ${card.border}
              shadow-[0_25px_60px_-15px_rgba(0,0,0,0.08)]
              hover:shadow-[0_40px_100px_-10px_var(--tw-shadow-color)] ${card.shadow}
              hover:-translate-y-6 hover:bg-white/95 transition-all duration-700 
              overflow-hidden animate-pop-in
            `}
            style={{ animationDelay: `${index * 0.12}s`, '--tw-shadow-color': 'rgba(236,72,153,0.15)' } as any}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/60 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            <div className={`
              relative p-8 rounded-[2.5rem] ${card.bg} mb-10 
              group-hover:scale-125 group-hover:rotate-[20deg] 
              transition-all duration-700 shadow-inner
            `}>
              <card.icon className={`${card.color} drop-shadow-md`} size={52} />
            </div>
            
            <span className="font-black text-slate-800 text-sm md:text-lg uppercase tracking-[0.4em] group-hover:text-pink-600 transition-colors">
              <EditableText 
                value={config[card.configKey] as string} 
                onSave={(v) => onUpdate(card.configKey, v)} 
                isEditMode={isEditMode}
              />
            </span>
            
            <div className="absolute bottom-6 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-4 transition-all duration-500">
              <Heart size={20} className="text-pink-400 fill-pink-300" />
            </div>
          </button>
        ))}
      </div>

      <div className="mt-32 flex flex-col items-center gap-10 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
        <button 
          onClick={() => onNavigate('ENDING')}
          className="relative px-16 py-7 bg-slate-900 text-white rounded-[2rem] font-black text-sm tracking-[0.6em] uppercase overflow-hidden group shadow-[0_30px_60px_-10px_rgba(0,0,0,0.3)] hover:scale-110 transition-all duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 translate-y-full group-hover:translate-y-0 transition-transform duration-700" />
          <span className="relative z-10 flex items-center gap-4">
            Our Next Chapter <Milestone size={22} />
          </span>
        </button>
        <div className="w-[3px] h-24 bg-gradient-to-b from-pink-200 to-transparent rounded-full animate-pulse" />
      </div>

      <style>{`
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.5) translateY(40px) rotate(-10deg); }
          100% { opacity: 1; transform: scale(1) translateY(0) rotate(0deg); }
        }
        @keyframes fade-in-up {
          0% { opacity: 0; transform: translateY(50px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-pop-in {
          animation: pop-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .animate-fade-in-up {
          animation: fade-in-up 1.2s ease-out forwards;
        }
        .animate-spin-slow {
          animation: spin 10s linear infinite;
        }
        .animate-bounce-slow {
          animation: bounce 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};
