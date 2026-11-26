/**
 * Web Audio API Botanical & Sci-Fi Sound Synthesizer.
 * Generates futuristic audio feedback without requiring external audio assets.
 */

let audioCtx = null;
let soundEnabled = true;

const getAudioContext = () => {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
};

export const setSoundEnabled = (enabled) => {
  soundEnabled = enabled;
  try {
    localStorage.setItem('plantai_sound_enabled', enabled ? '1' : '0');
  } catch (e) {}
};

export const isSoundEnabled = () => {
  try {
    const saved = localStorage.getItem('plantai_sound_enabled');
    if (saved !== null) return saved === '1';
  } catch (e) {}
  return soundEnabled;
};

// Subtle tactile button tick
export const playClickTick = () => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = 'triangle';
  osc.frequency.setValueAtTime(600, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(180, ctx.currentTime + 0.04);

  gain.gain.setValueAtTime(0.08, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.04);
};

// Sci-Fi laser frequency sweep during scanning
export const playScanSweep = () => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(320, ctx.currentTime);
  osc.frequency.linearRampToValueAtTime(840, ctx.currentTime + 0.35);
  osc.frequency.linearRampToValueAtTime(420, ctx.currentTime + 0.7);

  filter.type = 'bandpass';
  filter.frequency.value = 600;
  filter.Q.value = 3;

  gain.gain.setValueAtTime(0.02, ctx.currentTime);
  gain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.35);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.75);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime);
  osc.stop(ctx.currentTime + 0.75);
};

// Crystalline harmonic chord upon successful identification
export const playSuccessChime = () => {
  if (!isSoundEnabled()) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  // C major chord frequencies: C5, E5, G5, C6
  const freqs = [523.25, 659.25, 783.99, 1046.50];

  freqs.forEach((freq, idx) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.05);

    gain.gain.setValueAtTime(0.001, ctx.currentTime + idx * 0.05);
    gain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + idx * 0.05 + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + idx * 0.05 + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(ctx.currentTime + idx * 0.05);
    osc.stop(ctx.currentTime + idx * 0.05 + 0.85);
  });
};
