export interface BirdChirpParams {
  pitch: number;      // Base frequency in Hz
  rate: number;       // Chirps per second
  decay: number;      // How quickly the chirp fades out (0-1)
  chirpLength: number; // Length of each chirp in seconds
  filterFreq: number; // Filter frequency in Hz
  filterQ: number;    // Filter resonance/Q
  volume: number;     // Overall volume (0-1)
}

export interface Preset {
  id: string;
  name: string;
  description: string;
  params: BirdChirpParams;
}