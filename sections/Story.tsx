
import React from 'react';
import { SiteConfig } from '../types';
import { EditableText } from '../components/EditableText';
import { MediaUpload } from '../components/MediaUpload';

interface StoryProps {
  config: SiteConfig;
  onUpdate: (key: keyof SiteConfig, val: any) => void;
  isEditMode: boolean;
}

// Fixed: Removed non-existent CONFIG import and added props to support dynamic config and editing
export const Story: React.FC<StoryProps> = ({ config, onUpdate, isEditMode }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="max-w-4xl w-full bg-black rounded-3xl overflow-hidden shadow-2xl relative group">
        <video 
          src={config.storyVideoUrl}
          controls
          autoPlay
          className="w-full aspect-video object-cover"
        />
        {/* Added edit mode support for video URL */}
        {isEditMode && (
          <div className="absolute top-4 right-4 z-20">
            <MediaUpload onUpload={(url) => onUpdate('storyVideoUrl', url)} accept="video/*" />
          </div>
        )}
        <div className="absolute inset-0 pointer-events-none border-[12px] border-white/10 rounded-3xl" />
      </div>
      
      <div className="mt-8 text-center max-w-xl">
        <p className="text-2xl font-handwriting text-slate-700 italic">
          {/* Added edit mode support for caption */}
          "<EditableText 
            value={config.storyCaption} 
            onSave={(v) => onUpdate('storyCaption', v)} 
            isEditMode={isEditMode} 
          />"
        </p>
      </div>
    </div>
  );
};
