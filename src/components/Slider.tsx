import React, { useState } from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  className?: string;
}

const Slider = ({ label, value, min, max, step, onChange, className = '' }: SliderProps) => {
  const [hovering, setHovering] = useState(false);

  const percentage = ((value - min) / (max - min)) * 100;
  
  const formatValue = (val: number) => {
    if (val < 0.1) return val.toFixed(3);
    if (val < 1) return val.toFixed(2);
    if (val < 10) return val.toFixed(1);
    return val.toFixed(0);
  };

  return (
    <div className={`relative ${className}`}>
      <div className="flex justify-between mb-1">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <span 
          className={`text-sm font-medium ${hovering ? 'text-blue-600' : 'text-gray-500'} transition-colors`}
        >
          {formatValue(value)}
        </span>
      </div>
      
      <div 
        className="relative h-6"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <div className="absolute h-2 top-2 w-full bg-gray-200 rounded-full">
          <div 
            className="absolute h-full bg-gradient-to-r from-green-400 to-blue-500 rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
        
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="absolute w-full h-6 opacity-0 cursor-pointer"
        />
        
        <div 
          className={`absolute h-4 w-4 bg-white border-2 rounded-full shadow transform -translate-y-1/2 top-1/2 ${
            hovering ? 'border-blue-500 scale-110' : 'border-green-500'
          } transition-all`}
          style={{ left: `calc(${percentage}% - 8px)` }}
        />
      </div>
    </div>
  );
};

export default Slider;