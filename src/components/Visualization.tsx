import React, { useRef, useEffect } from 'react';

interface VisualizationProps {
  data: number[];
  isPlaying: boolean;
}

const Visualization = ({ data, isPlaying }: VisualizationProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    ctx.scale(dpr, dpr);
    
    // Clear canvas
    ctx.clearRect(0, 0, rect.width, rect.height);
    
    // Draw waveform
    const centerY = rect.height / 2;
    const width = rect.width;
    const height = rect.height;
    
    ctx.beginPath();
    ctx.moveTo(0, centerY);
    
    for (let i = 0; i < data.length; i++) {
      const x = (i / data.length) * width;
      const y = centerY + data[i] * (height / 2);
      
      ctx.lineTo(x, y);
    }
    
    // Create gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, height);
    gradient.addColorStop(0, 'rgba(34, 197, 94, 0.7)');  // green-500
    gradient.addColorStop(0.5, 'rgba(34, 197, 94, 0.5)'); // green-500 semi-transparent
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0.7)');  // blue-500
    
    ctx.strokeStyle = gradient;
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Add a subtle glow effect if playing
    if (isPlaying) {
      ctx.shadowColor = 'rgba(34, 197, 94, 0.5)';
      ctx.shadowBlur = 10;
    }
    
    // Draw a fill under the line
    ctx.lineTo(width, centerY);
    ctx.lineTo(0, centerY);
    ctx.closePath();
    
    const fillGradient = ctx.createLinearGradient(0, 0, 0, height);
    fillGradient.addColorStop(0, 'rgba(34, 197, 94, 0.1)');
    fillGradient.addColorStop(1, 'rgba(59, 130, 246, 0.1)');
    
    ctx.fillStyle = fillGradient;
    ctx.fill();
    
  }, [data, isPlaying]);
  
  return (
    <div className="relative h-48 w-full bg-green-50 rounded-xl overflow-hidden border border-green-100 shadow-inner">
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center text-green-800 text-opacity-50 text-lg font-medium">
          Press Play to Generate Bird Chirps
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full"
      />
    </div>
  );
};

export default Visualization;