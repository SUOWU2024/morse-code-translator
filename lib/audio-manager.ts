export class AudioManager {
  private audioContext: AudioContext | null = null;
  private currentGain: GainNode | null = null;
  private isPlaying = false;
  
  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioContext();
    }
  }
  
  private initAudioContext() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    } catch (error) {
      console.warn('Web Audio API not supported');
    }
  }
  
  private async ensureAudioContext() {
    if (!this.audioContext) {
      this.initAudioContext();
    }
    
    if (this.audioContext?.state === 'suspended') {
      await this.audioContext.resume();
    }
  }
  
  private createBeep(frequency: number, duration: number, startTime: number) {
    if (!this.audioContext) return;
    
    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);
    
    oscillator.frequency.setValueAtTime(frequency, startTime);
    oscillator.type = 'sine';
    
    // Smooth attack and release to avoid clicks
    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.15, startTime + 0.01);
    gainNode.gain.linearRampToValueAtTime(0.15, startTime + duration - 0.01);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);
    
    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
  }
  
  async playMorseCode(
    timings: Array<{ type: 'dot' | 'dash' | 'pause' | 'space'; duration: number }>,
    frequency: number = 600,
    speed: number = 1,
    onProgress?: (progress: number) => void,
    onComplete?: () => void,
    onCharacterProgress?: (timingIndex: number) => void
  ) {
    await this.ensureAudioContext();
    
    if (!this.audioContext || this.isPlaying) return;
    
    this.isPlaying = true;
    let currentTime = this.audioContext.currentTime;
    const totalDurationMs = timings.reduce((sum, timing) => sum + timing.duration, 0) / speed;
    let accumulatedDelayMs = 0;
    
    timings.forEach((timing, index) => {
      const durationSeconds = timing.duration / 1000 / speed; // Convert to seconds and apply speed
      
      if (timing.type === 'dot' || timing.type === 'dash') {
        this.createBeep(frequency, durationSeconds, currentTime);
      }
      
      // Schedule progress callback with accurate timing
      if (onProgress || onCharacterProgress) {
        setTimeout(() => {
          if (this.isPlaying) { // Only update if still playing
            if (onProgress) {
              const elapsedMs = timings.slice(0, index + 1).reduce((sum, t) => sum + t.duration, 0) / speed;
              const progress = elapsedMs / totalDurationMs;
              onProgress(Math.min(progress, 1)); // Ensure progress doesn't exceed 1
            }
            
            if (onCharacterProgress) {
              onCharacterProgress(index);
            }
          }
        }, accumulatedDelayMs);
      }
      
      accumulatedDelayMs += timing.duration / speed;
      currentTime += durationSeconds;
    });
    
    // Schedule completion callback
    setTimeout(() => {
      this.isPlaying = false;
      onComplete?.();
    }, totalDurationMs);
  }
  
  stop() {
    this.isPlaying = false;
    if (this.audioContext) {
      // Close and recreate audio context to stop all sounds
      this.audioContext.close();
      this.initAudioContext();
    }
  }
  
  get playing() {
    return this.isPlaying;
  }
}

export const audioManager = new AudioManager();