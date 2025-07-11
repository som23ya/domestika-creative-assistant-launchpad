
import React from 'react';
import { Sparkles } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b border-border py-4 px-domestika sticky top-0 z-50">
      <div className="max-w-domestika mx-auto">
        <div className="flex items-center justify-center sm:justify-start">
          <div className="flex items-center space-x-3">
            <div className="domestika-gradient p-2 rounded-domestika">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-h1 font-bold text-foreground">
              Domestika Creative Assistant
            </h1>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
