
import React from 'react';
import { SiteConfig, PolaroidItem } from '../types';
import { EditableText } from '../components/EditableText';
import { MediaUpload } from '../components/MediaUpload';
import { Plus, Trash2, Video, Image as ImageIcon, Film } from 'lucide-react';

interface PolaroidsProps {
  config: SiteConfig;
  onUpdate: (key: keyof SiteConfig, val: any) => void;
  isEditMode: boolean;
}

export const Polaroids: React.FC<PolaroidsProps> = ({ config, onUpdate, isEditMode }) => {
  const updateItem = (id: string, field: string, value: any) => {
    const newList = config.polaroids.map(item => item.id === id ? { ...item, [field]: value } : item);
    onUpdate('polaroids', newList);
  };

  const addItem = () => {
    const newItem: PolaroidItem = { 
      id: Date.now().toString(), 
      url: 'https://picsum.photos/seed/' + Math.random() + '/400/500', 
      caption: 'New Memory', 
      type: 'image' 
    };
    onUpdate('polaroids', [...config.polaroids, newItem]);
  };

  const removeItem = (id: string) => {
    onUpdate('polaroids', config.polaroids.filter(i => i.id !== id));
  };

  const handleMediaUpload = (id: string, dataUrl: string) => {
    // Detect if the uploaded file is a video or an image
    const isVideo = dataUrl.startsWith('data:video');
    const newList = config.polaroids.map(item => 
      item.id === id 
        ? { ...item, url: dataUrl, type: (isVideo ? 'video' : 'image') as 'image' | 'video' } 
        : item
    );
    onUpdate('polaroids', newList);
  };

  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-6xl font-serif text-center mb-24 text-slate-800 drop-shadow-sm">
          <EditableText 
            value={config.polaroidsTitle} 
            onSave={(v) => onUpdate('polaroidsTitle', v)} 
            isEditMode={isEditMode} 
          />
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-20 items-start">
          {config.polaroids.map((item, index) => (
            <div
              key={item.id}
              className="group bg-white p-6 shadow-[0_20px_60px_-10px_rgba(0,0,0,0.15)] hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.25)] transition-all duration-500 border-b-[60px] border-white relative rounded-sm"
              style={{ transform: `rotate(${index % 2 === 0 ? (index % 3 === 0 ? -3 : -5) : (index % 4 === 0 ? 3 : 5)}deg)` }}
            >
              {isEditMode && (
                <div className="absolute -top-4 -right-4 flex flex-col gap-2 z-20">
                  <div className="flex gap-2">
                    <MediaUpload 
                      onUpload={(url) => handleMediaUpload(item.id, url)} 
                      accept="image/*,video/*"
                    />
                    <button 
                      onClick={() => removeItem(item.id)} 
                      className="bg-red-500 text-white p-2 rounded-full shadow-lg hover:bg-red-600 transition-all hover:scale-110"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              )}
              
              <div className="aspect-[4/5] bg-slate-900 overflow-hidden relative rounded-[2px] shadow-inner">
                {item.type === 'video' ? (
                  <video 
                    src={item.url} 
                    className="w-full h-full object-cover"
                    autoPlay 
                    muted 
                    loop 
                    playsInline 
                  />
                ) : (
                  <img 
                    src={item.url} 
                    alt={item.caption} 
                    className="w-full h-full object-cover grayscale-[0.1] hover:grayscale-0 transition-all duration-1000" 
                  />
                )}
                
                {/* Visual texture overlay */}
                <div className="absolute inset-0 opacity-[0.1] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/dust.png')] mix-blend-overlay" />
                
                {item.type === 'video' && (
                  <div className="absolute top-4 left-4 p-2 bg-black/30 backdrop-blur rounded-full text-white/80">
                    <Film size={16} />
                  </div>
                )}
              </div>
              
              <div className="mt-8 text-center px-2">
                <p className="font-handwriting text-3xl text-slate-700 leading-tight min-h-[1.5em]">
                  <EditableText value={item.caption} onSave={(v) => updateItem(item.id, 'caption', v)} isEditMode={isEditMode} />
                </p>
              </div>
            </div>
          ))}

          {isEditMode && (
            <button 
              onClick={addItem}
              className="aspect-[4/5] border-4 border-dashed border-pink-200 rounded-[2.5rem] flex flex-col items-center justify-center text-pink-300 hover:text-pink-500 hover:border-pink-400 transition-all bg-white/40 group hover:bg-white/60 min-h-[400px]"
            >
              <div className="p-6 bg-white rounded-full shadow-lg group-hover:scale-110 transition-transform">
                <Plus size={48} />
              </div>
              <span className="font-black uppercase tracking-[0.2em] text-xs mt-6">
                <EditableText 
                  value={config.polaroidsAddText} 
                  onSave={(v) => onUpdate('polaroidsAddText', v)} 
                  isEditMode={isEditMode} 
                />
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
