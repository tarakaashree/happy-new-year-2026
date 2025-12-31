
import React, { useState, useEffect } from 'react';

interface EditableTextProps {
  value: string;
  onSave: (val: string) => void;
  className?: string;
  isTextArea?: boolean;
  isEditMode: boolean;
}

export const EditableText: React.FC<EditableTextProps> = ({ value, onSave, className, isTextArea, isEditMode }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  if (!isEditMode) return <span className={className}>{value}</span>;

  if (isEditing) {
    return (
      <div className="inline-block w-full">
        {isTextArea ? (
          <textarea
            autoFocus
            className={`w-full p-2 border-2 border-pink-300 rounded outline-none bg-white text-slate-800 ${className}`}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
              onSave(tempValue);
            }}
          />
        ) : (
          <input
            autoFocus
            className={`w-full p-2 border-2 border-pink-300 rounded outline-none bg-white text-slate-800 ${className}`}
            value={tempValue}
            onChange={(e) => setTempValue(e.target.value)}
            onBlur={() => {
              setIsEditing(false);
              onSave(tempValue);
            }}
          />
        )}
      </div>
    );
  }

  return (
    <span
      onClick={() => setIsEditing(true)}
      className={`cursor-pointer hover:bg-pink-100/50 rounded transition-colors border-b border-dashed border-pink-300 px-1 ${className}`}
      title="Click to edit"
    >
      {value || "(empty)"}
    </span>
  );
};
