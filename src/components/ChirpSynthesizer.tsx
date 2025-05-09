import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, Save, RotateCcw, Loader } from 'lucide-react';
import ControlPanel from './ControlPanel';
import Visualization from './Visualization';
import PresetSelector from './PresetSelector';
import { useAudioEngine } from '../hooks/useAudioEngine';
import { BirdChirpParams, Preset } from '../types';
import { presets } from '../data/presets';

const ChirpSynthesizer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPreset, setCurrentPreset] = useState<Preset>(presets[0]);
  const [params, setParams] = useState<BirdChirpParams>(presets[0].params);
  const [visualData, setVisualData] = useState<number[]>(Array(100).fill(0));
  const [isLoading, setIsLoading] = useState(false);
  
  const { 
    initialize, 
    play, 
    stop, 
    updateParams,
    getVisualizationData
  } = useAudioEngine();
  
  const visualizationInterval = useRef<number | null>(null);
  
  useEffect(() => {
    initialize();
    
    return () => {
      if (visualizationInterval.current) {
        window.clearInterval(visualizationInterval.current);
      }
      stop();
    };
  }, []);
  
  useEffect(() => {
    updateParams(params);
  }, [params]);
  
  const handlePlayPause = () => {
    setIsLoading(true);
    
    if (isPlaying) {
      stop();
      if (visualizationInterval.current) {
        window.clearInterval(visualizationInterval.current);
        visualizationInterval.current = null;
      }
      setIsPlaying(false);
      setIsLoading(false);
    } else {
      play().then(() => {
        setIsPlaying(true);
        visualizationInterval.current = window.setInterval(() => {
          const data = getVisualizationData();
          setVisualData(data);
        }, 50);
        setIsLoading(false);
      });
    }
  };
  
  const handlePresetChange = (preset: Preset) => {
    setCurrentPreset(preset);
    setParams(preset.params);
    
    if (isPlaying) {
      stop();
      play();
    }
  };
  
  const handleParamChange = (name: keyof BirdChirpParams, value: number) => {
    setParams(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleRandomize = () => {
    const randomParams: BirdChirpParams = {
      pitch: Math.random() * 2000 + 1000,
      rate: Math.random() * 10 + 1,
      decay: Math.random() * 0.9 + 0.1,
      chirpLength: Math.random() * 0.2 + 0.05,
      filterFreq: Math.random() * 3000 + 1000,
      filterQ: Math.random() * 10 + 1,
      volume: 0.7,
    };
    
    setParams(randomParams);
    setCurrentPreset({
      id: 'custom',
      name: 'Custom',
      description: 'Your custom bird sound',
      params: randomParams
    });
  };
  
  return (
    <div className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl shadow-xl max-w-4xl w-full mx-auto overflow-hidden transform transition-all">
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-2/3">
            <Visualization data={visualData} isPlaying={isPlaying} />
            
            <div className="flex justify-between items-center mt-4 mb-6">
              <button
                onClick={handlePlayPause}
                className={`px-6 py-3 rounded-full font-medium flex items-center justify-center space-x-2 ${
                  isPlaying 
                    ? 'bg-orange-500 hover:bg-orange-600' 
                    : 'bg-green-600 hover:bg-green-700'
                } text-white transition-colors shadow-md`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="w-5 h-5 mr-2 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : (
                  <>
                    {isPlaying ? (
                      <>
                        <Pause className="w-5 h-5 mr-2" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="w-5 h-5 mr-2" />
                        <span>Play</span>
                      </>
                    )}
                  </>
                )}
              </button>
              
              <div className="flex space-x-2">
                <button
                  onClick={handleRandomize}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center transition-colors shadow-md"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  <span>Randomize</span>
                </button>
                
                <button
                  className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors shadow-md"
                >
                  <Save className="w-4 h-4 mr-2" />
                  <span>Save</span>
                </button>
              </div>
            </div>
            
            <ControlPanel params={params} onChange={handleParamChange} />
          </div>
          
          <div className="w-full md:w-1/3">
            <PresetSelector
              presets={presets}
              currentPreset={currentPreset}
              onSelect={handlePresetChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChirpSynthesizer;