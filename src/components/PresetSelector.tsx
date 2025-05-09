import React from 'react';
import { Preset } from '../types';
import { Bird } from 'lucide-react';

interface PresetSelectorProps {
  presets: Preset[];
  currentPreset: Preset;
  onSelect: (preset: Preset) => void;
}

const PresetSelector = ({ presets, currentPreset, onSelect }: PresetSelectorProps) => {
  return (
    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 h-full">
      <h3 className="text-blue-800 font-semibold mb-4 text-lg">Bird Sound Presets</h3>
      
      <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            onClick={() => onSelect(preset)}
            className={`w-full text-left p-3 rounded-lg transition-all transform hover:scale-[1.02] ${
              currentPreset.id === preset.id
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white text-gray-800 hover:bg-blue-100 shadow-sm'
            }`}
          >
            <div className="flex items-center">
              <Bird className={`h-5 w-5 mr-2 ${
                currentPreset.id === preset.id ? 'text-yellow-300' : 'text-blue-500'
              }`} />
              <span className="font-medium">{preset.name}</span>
            </div>
            
            <p className={`text-sm mt-1 ${
              currentPreset.id === preset.id ? 'text-blue-100' : 'text-gray-600'
            }`}>
              {preset.description}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PresetSelector;