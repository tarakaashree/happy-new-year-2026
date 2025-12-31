
import React from 'react';
import { SiteConfig } from '../types';
import { EditableText } from '../components/EditableText';
import { Plus, Trash2 } from 'lucide-react';

interface TimelineProps {
  config: SiteConfig;
  onUpdate: (key: keyof SiteConfig, val: any) => void;
  isEditMode: boolean;
}

export const Timeline: React.FC<TimelineProps> = ({ config, onUpdate, isEditMode }) => {
  const updateItem = (id: string, field: string, value: string) => {
    const newList = config.timeline.map(item => item.id === id ? { ...item, [field]: value } : item);
    onUpdate('timeline', newList);
  };

  const addItem = () => {
    const newItem = { id: Date.now().toString(), date: 'New Date', title: 'New Event', description: 'Brief description here...' };
    onUpdate('timeline', [...config.timeline, newItem]);
  };

  const removeItem = (id: string) => {
    onUpdate('timeline', config.timeline.filter(i => i.id !== id));
  };

  return (
    <div className="min-h-screen py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-5xl font-serif text-center mb-24 text-slate-800">
          <EditableText 
            value={config.timelineTitle} 
            onSave={(v) => onUpdate('timelineTitle', v)} 
            isEditMode={isEditMode} 
          />
        </h2>
        
        <div className="relative">
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-pink-100 via-pink-300 to-pink-100 hidden md:block" />
          
          <div className="space-y-16">
            {config.timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={item.id} className="relative flex flex-col md:flex-row items-center justify-center">
                  <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-white border-4 border-pink-400 z-10 shadow-lg" />
                  
                  <div className={`w-full md:w-1/2 ${isEven ? 'md:pr-16 md:text-right' : 'md:pl-16 md:order-last md:text-left'} text-center`}>
                    <div className="bg-white/80 backdrop-blur-md p-8 rounded-[2.5rem] shadow-xl border border-pink-50 hover:shadow-2xl transition-all duration-300 group relative">
                      {isEditMode && (
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="absolute -top-2 -right-2 p-2 bg-red-100 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                      
                      <div className="text-pink-500 font-bold text-sm uppercase tracking-[0.2em] mb-2">
                        <EditableText value={item.date} onSave={(v) => updateItem(item.id, 'date', v)} isEditMode={isEditMode} />
                      </div>
                      
                      <h3 className="text-2xl font-bold text-slate-800 mb-3">
                        <EditableText value={item.title} onSave={(v) => updateItem(item.id, 'title', v)} isEditMode={isEditMode} />
                      </h3>
                      
                      <p className="text-slate-600 italic leading-relaxed">
                        <EditableText value={item.description} onSave={(v) => updateItem(item.id, 'description', v)} isEditMode={isEditMode} isTextArea />
                      </p>
                    </div>
                  </div>

                  <div className="hidden md:block w-1/2" />
                </div>
              );
            })}
          </div>

          {isEditMode && (
            <div className="flex justify-center mt-20">
              <button 
                onClick={addItem}
                className="flex items-center gap-2 bg-pink-500 text-white px-8 py-3 rounded-full font-bold shadow-xl hover:scale-105 transition-transform"
              >
                <Plus size={20} />
                <EditableText 
                  value={config.timelineAddText} 
                  onSave={(v) => onUpdate('timelineAddText', v)} 
                  isEditMode={isEditMode} 
                />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
