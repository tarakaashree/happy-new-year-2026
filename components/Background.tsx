
import React from 'react';

export const Background: React.FC<{ variant?: 'dark' | 'warm' }> = ({ variant = 'warm' }) => {
  const bgClass = variant === 'dark' 
    ? 'bg-slate-900' 
    : 'bg-gradient-to-br from-rose-50 via-orange-50 to-pink-50';

  return (
    <div className={`fixed inset-0 -z-10 overflow-hidden ${bgClass}`}>
      <div className="absolute inset-0 opacity-30">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-pulse"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {Math.random() > 0.5 ? '✨' : '💖'}
          </div>
        ))}
      </div>
      {/* Soft gradient blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-pink-200/20 blur-3xl rounded-full" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-yellow-200/20 blur-3xl rounded-full" />
    </div>
  );
};
