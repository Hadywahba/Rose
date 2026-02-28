'use client';

import { ReactNode, useEffect } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;

  children?: ReactNode;
  className?: string;
  overlayOpacity?: number;
}

export default function Modal({
  isOpen,
  children,
  onClose,

  className = '',
  overlayOpacity = 50,
}: Props) {
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center`}
      style={{ backgroundColor: `rgba(0,0,0,${overlayOpacity / 100})` }}
    >
      <div
        className={`overflow-auto bg-white ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}
