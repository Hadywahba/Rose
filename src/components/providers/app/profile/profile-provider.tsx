'use client';

import { createContext, useEffect, useState, ReactNode } from 'react';

type ImageContextType = {
  image: string | null;
  setImage: (url: string | null) => void;
};

export const ImageContext = createContext<ImageContextType | null>(null);

const STORAGE_KEY = 'uploaded_image';

export function ImageProvider({ children }: { children: ReactNode }) {
  const [image, setImageState] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setImageState(stored);
    }
  }, []);

  const setImage = (url: string | null) => {
    setImageState(url);

    if (url) {
      localStorage.setItem(STORAGE_KEY, url);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return (
    <ImageContext.Provider value={{ image, setImage }}>
      {children}
    </ImageContext.Provider>
  );
}
