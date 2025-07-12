
import React from 'react';
import { Sparkles } from 'lucide-react';

const HeaderLogo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <div className="domestika-gradient p-2 rounded-domestika">
        <Sparkles className="w-6 h-6 text-white" />
      </div>
      <h1 className="text-h1 font-bold text-foreground hidden sm:block">
        Domestika Creative Assistant
      </h1>
      <h1 className="text-lg font-bold text-foreground sm:hidden">
        Domestika
      </h1>
    </div>
  );
};

export default HeaderLogo;
