import React from 'react';
import { SAMPLE_PLANTS } from '../data/plantsData';
import { Sparkles, ArrowRight } from 'lucide-react';
import { playClickTick } from '../utils/soundEffects';

export default function SampleLeavesShelf({ onSelectSample, activeId, disabled }) {
  const handleCardClick = async (sample) => {
    if (disabled) return;
    playClickTick();
    try {
      const response = await fetch(sample.image);
      const blob = await response.blob();
      const file = new File([blob], `${sample.id.toLowerCase()}_sample.jpg`, { type: 'image/jpeg' });
      onSelectSample(file, sample.image, sample.id);
    } catch (err) {
      console.error('Failed to load sample image:', err);
    }
  };

  return (
    <div className="sample-shelf-section">
      <div className="sample-shelf-header">
        <div className="sample-shelf-title-row">
          <Sparkles size={16} color="#34D399" />
          <h3 className="sample-shelf-heading">Try Instant Samples</h3>
        </div>
        <span className="sample-shelf-subheading">
          Don't have a leaf on hand? Click any specimen below to test:
        </span>
      </div>

      <div className="sample-grid">
        {SAMPLE_PLANTS.map((sample) => {
          const isSelected = activeId === sample.id;
          return (
            <button
              key={sample.id}
              type="button"
              className={`sample-card ${isSelected ? 'active-sample' : ''}`}
              onClick={() => handleCardClick(sample)}
              disabled={disabled}
              title={`Test model with ${sample.name}`}
            >
              <div className="sample-img-container">
                <img src={sample.image} alt={sample.name} className="sample-img" />
                <div className="sample-badge-overlay">{sample.badge}</div>
                {isSelected && (
                  <div className="sample-active-glow" />
                )}
              </div>
              <div className="sample-label-row">
                <span className="sample-name">{sample.name}</span>
                <ArrowRight size={13} className="sample-arrow-icon" />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
