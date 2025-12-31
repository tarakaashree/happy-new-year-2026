
import React, { useState, useRef } from 'react';
import { Play, Pause, SkipForward, SkipBack, Music2, Heart, Plus, Trash2 } from 'lucide-react';
import { SiteConfig, Song } from '../types';
import { MediaUpload } from '../components/MediaUpload';
import { EditableText } from '../components/EditableText';

interface PlaylistProps {
  config: SiteConfig;
  onUpdate: (key: keyof SiteConfig, val: any) => void;
  isEditMode: boolean;
}

export const Playlist: React.FC<PlaylistProps> = ({ config, onUpdate, isEditMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) audioRef.current.pause();
      else audioRef.current.play();
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    if (config.playlist.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % config.playlist.length);
    setIsPlaying(false);
  };

  const prevSong = () => {
    if (config.playlist.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + config.playlist.length) % config.playlist.length);
    setIsPlaying(false);
  };

  const currentSong = config.playlist[currentIndex] || ({ id: 'empty', title: 'No Songs', url: '' } as Song);

  const addSong = (url: string) => {
    const newSong: Song = { id: Date.now().toString(), title: 'New Favorite Song', url };
    onUpdate('playlist', [...config.playlist, newSong]);
  };

  const removeSong = (id: string) => {
    onUpdate('playlist', config.playlist.filter(s => s.id !== id));
    if (currentIndex >= config.playlist.length - 1) setCurrentIndex(0);
  };

  const updateSongTitle = (id: string, title: string) => {
    onUpdate('playlist', config.playlist.map(s => s.id === id ? { ...s, title } : s));
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 p-6">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-[4rem] p-12 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-white relative overflow-hidden group">
        <div className="absolute inset-0 pointer-events-none opacity-20">
          {[...Array(8)].map((_, i) => (
            <Heart 
              key={i}
              className="absolute animate-bounce text-pink-300 fill-pink-300"
              style={{ top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`, animationDelay: `${i * 0.3}s`, width: 15, height: 15 }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center">
          <div className={`w-56 h-56 bg-gradient-to-tr from-pink-400 to-indigo-300 rounded-full flex items-center justify-center shadow-2xl mb-10 ring-8 ring-pink-50 transition-all duration-700 ${isPlaying ? 'rotate-[360deg] scale-105' : ''}`}>
            <Music2 size={80} className="text-white" />
          </div>

          <h3 className="text-3xl font-black text-slate-800 mb-2 text-center">
            <EditableText value={currentSong.title} onSave={(v) => updateSongTitle(currentSong.id, v)} isEditMode={isEditMode} />
          </h3>
          <p className="text-pink-500 font-bold uppercase tracking-widest mb-10 text-xs text-center">
            <EditableText 
              value={config.playlistSubtitle} 
              onSave={(v) => onUpdate('playlistSubtitle', v)} 
              isEditMode={isEditMode} 
            />
          </p>

          <div className="flex items-center gap-10 mb-10">
            <button onClick={prevSong} className="p-3 text-slate-300 hover:text-pink-500 transition-all hover:scale-110">
              <SkipBack size={40} />
            </button>
            <button 
              onClick={togglePlay} 
              className="w-24 h-24 bg-pink-500 rounded-full flex items-center justify-center text-white shadow-[0_10px_30px_rgba(236,72,153,0.4)] hover:scale-110 active:scale-95 transition-all"
            >
              {isPlaying ? <Pause size={44} fill="white" /> : <Play size={44} className="ml-2" fill="white" />}
            </button>
            <button onClick={nextSong} className="p-3 text-slate-300 hover:text-pink-500 transition-all hover:scale-110">
              <SkipForward size={40} />
            </button>
          </div>

          <audio 
            key={currentSong.url}
            ref={audioRef} 
            src={currentSong.url} 
            onEnded={nextSong}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          />

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div className={`bg-pink-400 h-full transition-all duration-1000 ${isPlaying ? 'w-full' : 'w-0'}`} />
          </div>
        </div>
      </div>

      {isEditMode && (
        <div className="w-full max-w-sm bg-white/60 backdrop-blur p-8 rounded-[3rem] border border-white shadow-xl max-h-[60vh] overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h4 className="font-bold text-slate-700 uppercase tracking-widest text-sm">
              <EditableText 
                value={config.playlistManageText} 
                onSave={(v) => onUpdate('playlistManageText', v)} 
                isEditMode={isEditMode} 
              />
            </h4>
            <MediaUpload accept="audio/*" onUpload={addSong} />
          </div>
          <div className="space-y-4">
            {config.playlist.map((song) => (
              <div key={song.id} className="flex items-center justify-between bg-white p-4 rounded-2xl shadow-sm group">
                <span className="text-sm font-medium text-slate-600 truncate mr-2">{song.title}</span>
                <button onClick={() => removeSong(song.id)} className="text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
