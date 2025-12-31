
import React from 'react';
import { SiteConfig } from '../types';

interface EndingProps {
  config: SiteConfig;
}

// Fixed: Removed missing CONFIG import and added config prop
export const Ending: React.FC<EndingProps> = ({ config }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-12 text-center bg-slate-950">
      <div className="max-w-2xl animate-slow-reveal">
        <h2 className="text-4xl md:text-5xl font-serif text-white/90 leading-tight">
          {config.finalMessage}
        </h2>
        <div className="mt-12 flex justify-center gap-4">
          {[...Array(3)].map((_, i) => (
            <div 
              key={i} 
              className="w-2 h-2 rounded-full bg-yellow-400/50 animate-pulse" 
              style={{ animationDelay: `${i * 0.4}s` }} 
            />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes slow-reveal {
          0% { opacity: 0; filter: blur(10px); }
          100% { opacity: 1; filter: blur(0); }
        }
        .animate-slow-reveal {
          animation: slow-reveal 4s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
