import React from 'react';
import { Music, Bird } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-green-800/90 text-white shadow-md backdrop-blur-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Bird className="h-6 w-6 text-yellow-300" />
          <h1 className="text-xl md:text-2xl font-bold">ChirpComposer</h1>
        </div>
        <div className="flex items-center space-x-2">
          <Music className="h-5 w-5 text-yellow-300" />
          <span className="hidden md:inline text-sm">Bird Rhythm Synthesizer</span>
        </div>
      </div>
    </header>
  );
};

export default Header;