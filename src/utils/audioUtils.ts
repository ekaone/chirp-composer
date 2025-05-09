/**
 * Utility functions for audio processing
 */

/**
 * Generate a random value within a range
 */
export const randomInRange = (min: number, max: number): number => {
  return Math.random() * (max - min) + min;
};

/**
 * Add a slight randomization to a value to make it sound more natural
 */
export const addJitter = (value: number, amount: number): number => {
  const jitter = (Math.random() * 2 - 1) * amount;
  return value * (1 + jitter);
};

/**
 * Convert a MIDI note number to frequency
 */
export const midiToFreq = (midi: number): number => {
  return 440 * Math.pow(2, (midi - 69) / 12);
};

/**
 * Map a frequency to a MIDI note number
 */
export const freqToMidi = (freq: number): number => {
  return Math.round(12 * Math.log2(freq / 440) + 69);
};

/**
 * Scale a value from one range to another
 */
export const scaleValue = (value: number, inMin: number, inMax: number, outMin: number, outMax: number): number => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Clamp a value between min and max
 */
export const clamp = (value: number, min: number, max: number): number => {
  return Math.min(Math.max(value, min), max);
};

/**
 * Linerly interpolate between two values
 */
export const lerp = (start: number, end: number, amt: number): number => {
  return (1 - amt) * start + amt * end;
};