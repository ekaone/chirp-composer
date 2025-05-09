import { Preset } from '../types';

export const presets: Preset[] = [
  {
    id: 'robin',
    name: 'Robin',
    description: 'Cheerful, bright chirps with a medium pace',
    params: {
      pitch: 2500,
      rate: 6,
      decay: 0.4,
      chirpLength: 0.07,
      filterFreq: 2800,
      filterQ: 5,
      volume: 0.7
    }
  },
  {
    id: 'sparrow',
    name: 'Sparrow',
    description: 'Quick, chattering chirps',
    params: {
      pitch: 3000,
      rate: 10,
      decay: 0.3,
      chirpLength: 0.04,
      filterFreq: 3200,
      filterQ: 8,
      volume: 0.65
    }
  },
  {
    id: 'finch',
    name: 'Finch',
    description: 'High-pitched, melodic tones',
    params: {
      pitch: 3800,
      rate: 4,
      decay: 0.5,
      chirpLength: 0.1,
      filterFreq: 4000,
      filterQ: 10,
      volume: 0.6
    }
  },
  {
    id: 'nightingale',
    name: 'Nightingale',
    description: 'Complex, flute-like calls',
    params: {
      pitch: 2200,
      rate: 3,
      decay: 0.7,
      chirpLength: 0.15,
      filterFreq: 2400,
      filterQ: 7,
      volume: 0.8
    }
  },
  {
    id: 'canary',
    name: 'Canary',
    description: 'Fast, musical trills',
    params: {
      pitch: 3500,
      rate: 12,
      decay: 0.2,
      chirpLength: 0.03,
      filterFreq: 3800,
      filterQ: 9,
      volume: 0.7
    }
  },
  {
    id: 'woodpecker',
    name: 'Woodpecker',
    description: 'Rhythmic, percussive sounds',
    params: {
      pitch: 1800,
      rate: 8,
      decay: 0.1,
      chirpLength: 0.02,
      filterFreq: 2000,
      filterQ: 4,
      volume: 0.75
    }
  },
  {
    id: 'owl',
    name: 'Owl',
    description: 'Low, hooting calls',
    params: {
      pitch: 900,
      rate: 1,
      decay: 0.8,
      chirpLength: 0.25,
      filterFreq: 1000,
      filterQ: 3,
      volume: 0.85
    }
  },
  {
    id: 'hummingbird',
    name: 'Hummingbird',
    description: 'Ultra-rapid, high-pitched chirps',
    params: {
      pitch: 4000,
      rate: 15,
      decay: 0.15,
      chirpLength: 0.02,
      filterFreq: 4500,
      filterQ: 12,
      volume: 0.5
    }
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Your custom bird sound',
    params: {
      pitch: 2000,
      rate: 5,
      decay: 0.5,
      chirpLength: 0.1,
      filterFreq: 2000,
      filterQ: 5,
      volume: 0.7
    }
  }
];