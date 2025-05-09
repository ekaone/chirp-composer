import React from 'react';
import Slider from './Slider';
import { BirdChirpParams } from '../types';

interface ControlPanelProps {
  params: BirdChirpParams;
  onChange: (name: keyof BirdChirpParams, value: number) => void;
}

const ControlPanel = ({ params, onChange }: ControlPanelProps) => {
  return (
    <div className="bg-green-50 rounded-lg p-4 border border-green-100">
      <h3 className="text-green-800 font-semibold mb-4 text-lg">Sound Parameters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Slider
          label="Pitch (Hz)"
          value={params.pitch}
          min={500}
          max={4000}
          step={10}
          onChange={(value) => onChange('pitch', value)}
        />
        
        <Slider
          label="Rate (chirps/sec)"
          value={params.rate}
          min={0.5}
          max={15}
          step={0.1}
          onChange={(value) => onChange('rate', value)}
        />
        
        <Slider
          label="Decay"
          value={params.decay}
          min={0.1}
          max={1}
          step={0.01}
          onChange={(value) => onChange('decay', value)}
        />
        
        <Slider
          label="Chirp Length (sec)"
          value={params.chirpLength}
          min={0.01}
          max={0.3}
          step={0.01}
          onChange={(value) => onChange('chirpLength', value)}
        />
        
        <Slider
          label="Filter Frequency (Hz)"
          value={params.filterFreq}
          min={500}
          max={5000}
          step={10}
          onChange={(value) => onChange('filterFreq', value)}
        />
        
        <Slider
          label="Filter Q"
          value={params.filterQ}
          min={1}
          max={20}
          step={0.1}
          onChange={(value) => onChange('filterQ', value)}
        />
        
        <Slider
          label="Volume"
          value={params.volume}
          min={0}
          max={1}
          step={0.01}
          onChange={(value) => onChange('volume', value)}
          className="md:col-span-2"
        />
      </div>
    </div>
  );
};

export default ControlPanel;