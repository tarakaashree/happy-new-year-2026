
import React, { useRef } from 'react';
import { Upload } from 'lucide-react';

interface MediaUploadProps {
  onUpload: (url: string) => void;
  className?: string;
  accept?: string;
}

export const MediaUpload: React.FC<MediaUploadProps> = ({ onUpload, className, accept = "image/*,video/*" }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={className}>
      <input
        type="file"
        ref={inputRef}
        className="hidden"
        accept={accept}
        onChange={handleChange}
      />
      <button
        onClick={() => inputRef.current?.click()}
        className="flex items-center gap-2 bg-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold hover:bg-pink-600 transition-all shadow-sm"
      >
        <Upload size={12} />
        Upload
      </button>
    </div>
  );
};
