'use client';

import React from 'react';
import Sidebar from './Sidebar';
import { X } from 'lucide-react';

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileNav({ isOpen, onClose }: MobileNavProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden flex">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      {/* Drawer */}
      <div className="relative flex-1 max-w-xs w-full bg-[#080d1a] h-full shadow-2xl z-50">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/60 z-50"
        >
          <X className="w-5 h-5" />
        </button>
        <Sidebar onCloseMobile={onClose} className="w-full" />
      </div>
    </div>
  );
}
