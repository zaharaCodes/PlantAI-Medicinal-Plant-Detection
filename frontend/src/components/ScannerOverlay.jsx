import React, { useState, useEffect } from 'react';
import { ScanLine, Cpu, Sparkles } from 'lucide-react';

export default function ScannerOverlay({ active }) {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    '📐 Normalizing leaf geometry (224×224 RGB tensor)...',
    '🍃 Mapping venation network & serration geometry...',
    '🧠 Propagating deep convolutional feature layers...',
    '🌿 Cross-referencing 17 medicinal species taxonomies...',
    '✨ Synthesizing Ayurvedic & bioactive profile...'
  ];

  useEffect(() => {
    if (!active) {
      setStepIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setStepIndex((prev) => (prev + 1) % steps.length);
    }, 700);

    return () => clearInterval(interval);
  }, [active]);

  if (!active) return null;

  return (
    <div className="scanner-active-overlay">
      {/* Laser Scanning Beam */}
      <div className="scanner-laser-beam" />

      {/* Cyber Grid Pattern */}
      <div className="scanner-grid-pattern" />

      {/* Reticle Target Corners */}
      <div className="scanner-corner top-left" />
      <div className="scanner-corner top-right" />
      <div className="scanner-corner bottom-left" />
      <div className="scanner-corner bottom-right" />

      {/* Center Neural Pulse */}
      <div className="scanner-center-pulse">
        <div className="scanner-pulse-circle c1" />
        <div className="scanner-pulse-circle c2" />
        <div className="scanner-pulse-circle c3" />
        <Cpu size={28} color="#6EE7B7" className="scanner-cpu-icon" />
      </div>

      {/* Step Status Indicator at Bottom */}
      <div className="scanner-status-badge">
        <Sparkles size={14} color="#34D399" className="spin-slow" />
        <span className="scanner-status-text">{steps[stepIndex]}</span>
      </div>
    </div>
  );
}
