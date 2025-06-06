'use client';
import { useEffect, FC } from 'react';

interface KeyboardSaveHandlerProps {
  onSave: () => void;
}

const KeyboardSaveHandler: FC<KeyboardSaveHandlerProps> = ({ onSave }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 's') {
        event.preventDefault();
        onSave();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onSave]);

  return null;
};

export default KeyboardSaveHandler;