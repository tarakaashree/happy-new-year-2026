
import React from 'react';
import { Heart } from 'lucide-react';
import { Page, SiteConfig } from '../types';
import { EditableText } from './EditableText';

interface NavigationProps {
  onNavigate: (page: Page) => void;
  config: SiteConfig;
  onUpdate: (key: keyof SiteConfig, val: any) => void;
  isEditMode: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, config, onUpdate, isEditMode }) => {
  return (
    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <button
        onClick={() => onNavigate('HUB')}
        className="group flex items-center gap-2 bg-white/80 backdrop-blur-md px-6 py-2 rounded-full shadow-lg border border-pink-100 hover:bg-pink-50 transition-all active:scale-95"
      >
        <span className="text-pink-500 font-bold uppercase tracking-wider text-sm">
          <EditableText 
            value={config.navHomeText} 
            onSave={(v) => onUpdate('navHomeText', v)} 
            isEditMode={isEditMode} 
          />
        </span>
        <Heart size={18} className="text-pink-400 group-hover:fill-pink-400 transition-all" />
      </button>
    </div>
  );
};
