
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full py-6 px-4 border-b border-purple-100 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl creative-gradient">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold creative-text-gradient">
            Domestika Creative Assistant
          </h1>
        </div>
      </div>
    </header>
  );
};

export default Header;
