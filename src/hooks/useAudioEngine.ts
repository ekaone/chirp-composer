import { useRef, useCallback } from 'react';
import { BirdChirpParams } from '../types';

export const useAudioEngine = () => {
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscillatorRef = useRef<OscillatorNode | null>(null);
  const filterRef = useRef<BiquadFilterNode | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const intervalRef = useRef<number | null>(null);
  const paramsRef = useRef<BirdChirpParams>({
    pitch: 2000,
    rate: 5,
    decay: 0.5,
    chirpLength: 0.1,
    filterFreq: 2000,
    filterQ: 5,
    volume: 0.7,
  });

  const initialize = useCallback(() => {
    // Create audio context if it doesn't exist
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Create analyzer for visualization
      analyserRef.current = audioContextRef.current.createAnalyser();
      analyserRef.current.fftSize = 256;
      analyserRef.current.connect(audioContextRef.current.destination);
      
      // Create main gain node that will control overall volume
      gainNodeRef.current = audioContextRef.current.createGain();
      gainNodeRef.current.gain.value = paramsRef.current.volume;
      gainNodeRef.current.connect(analyserRef.current);
    }
  }, []);

  const updateParams = useCallback((params: BirdChirpParams) => {
    paramsRef.current = params;
    
    // Update any active nodes
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = params.volume;
    }
    
    if (filterRef.current) {
      filterRef.current.frequency.value = params.filterFreq;
      filterRef.current.Q.value = params.filterQ;
    }
  }, []);

  const createChirp = useCallback(() => {
    if (!audioContextRef.current || !gainNodeRef.current) return;
    
    const ctx = audioContextRef.current;
    const params = paramsRef.current;
    
    // Create oscillator for the chirp
    const oscillator = ctx.createOscillator();
    oscillator.type = 'sine';
    oscillator.frequency.value = params.pitch;
    
    // Create filter
    const filter = ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.value = params.filterFreq;
    filter.Q.value = params.filterQ;
    
    // Create envelope for the chirp
    const chirpGain = ctx.createGain();
    chirpGain.gain.value = 0;
    
    // Connect nodes
    oscillator.connect(filter);
    filter.connect(chirpGain);
    chirpGain.connect(gainNodeRef.current);
    
    // Schedule the envelope
    const now = ctx.currentTime;
    const attackTime = 0.01;
    const holdTime = params.chirpLength * 0.3;
    const releaseTime = params.chirpLength * 0.7;
    
    // Attack
    chirpGain.gain.setValueAtTime(0, now);
    chirpGain.gain.linearRampToValueAtTime(1, now + attackTime);
    
    // Hold
    chirpGain.gain.setValueAtTime(1, now + attackTime + holdTime);
    
    // Release with slight pitch bend
    chirpGain.gain.exponentialRampToValueAtTime(0.001, now + attackTime + holdTime + releaseTime);
    oscillator.frequency.exponentialRampToValueAtTime(
      params.pitch * 1.2, 
      now + attackTime + holdTime + releaseTime
    );
    
    // Start and stop
    oscillator.start(now);
    oscillator.stop(now + attackTime + holdTime + releaseTime + 0.01);
    
    // Cleanup
    oscillator.onended = () => {
      oscillator.disconnect();
      filter.disconnect();
      chirpGain.disconnect();
    };
  }, []);

  const startChirpSequence = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
    }
    
    // Schedule chirps at the specified rate
    intervalRef.current = window.setInterval(() => {
      createChirp();
    }, 1000 / paramsRef.current.rate);
  }, [createChirp]);

  const stopChirpSequence = useCallback(() => {
    if (intervalRef.current) {
      window.clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const play = useCallback(async () => {
    if (!audioContextRef.current) return;
    
    // Resume audio context if it's suspended (autoplay policy)
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }
    
    startChirpSequence();
  }, [startChirpSequence]);

  const stop = useCallback(() => {
    stopChirpSequence();
  }, [stopChirpSequence]);

  const getVisualizationData = useCallback(() => {
    if (!analyserRef.current) return Array(100).fill(0);
    
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    analyserRef.current.getByteTimeDomainData(dataArray);
    
    // Convert to normalized values between -1 and 1
    const normalizedData = Array.from(dataArray).map(value => (value / 128) - 1);
    
    return normalizedData;
  }, []);

  return {
    initialize,
    play,
    stop,
    updateParams,
    getVisualizationData
  };
};