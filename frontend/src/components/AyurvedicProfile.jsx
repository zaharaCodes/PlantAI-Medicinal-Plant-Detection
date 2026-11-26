import React from 'react';
import { Flame, Wind, Droplets, Dna, Compass } from 'lucide-react';

export default function AyurvedicProfile({ dosha, phytochemicals, morphology }) {
  if (!dosha && !phytochemicals && !morphology) return null;

  return (
    <div className="ayurvedic-profile-card">
      {/* Tridosha Balancing Section */}
      {dosha && (
        <div className="tridosha-section">
          <div className="section-mini-heading">
            <Compass size={14} color="#34D399" />
            <span>Ayurvedic Tridosha Energetics</span>
          </div>

          <div className="tridosha-grid">
            <div className="dosha-item vata">
              <div className="dosha-icon-title">
                <Wind size={15} color="#93C5FD" />
                <span className="dosha-name">Vata (Air)</span>
              </div>
              <span className="dosha-state">{dosha.vata || 'Balances'}</span>
            </div>

            <div className="dosha-item pitta">
              <div className="dosha-icon-title">
                <Flame size={15} color="#FCA5A5" />
                <span className="dosha-name">Pitta (Fire)</span>
              </div>
              <span className="dosha-state">{dosha.pitta || 'Cools'}</span>
            </div>

            <div className="dosha-item kapha">
              <div className="dosha-icon-title">
                <Droplets size={15} color="#86EFAC" />
                <span className="dosha-name">Kapha (Earth)</span>
              </div>
              <span className="dosha-state">{dosha.kapha || 'Pacifies'}</span>
            </div>
          </div>
        </div>
      )}

      {/* Phytochemical Bioactive Spectrum */}
      {phytochemicals && phytochemicals.length > 0 && (
        <div className="phytochemicals-section">
          <div className="section-mini-heading">
            <Dna size={14} color="#60A5FA" />
            <span>Active Phytochemical Spectrum</span>
          </div>
          <div className="phytochemical-chips-wrap">
            {phytochemicals.map((compound) => (
              <span key={compound} className="phytochemical-chip">
                {compound}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Leaf Morphometrics */}
      {morphology && (
        <div className="morphometrics-section">
          <div className="morpho-tag">
            <span className="morpho-label">Apex:</span>
            <span className="morpho-val">{morphology.apex}</span>
          </div>
          <div className="morpho-tag">
            <span className="morpho-label">Margin:</span>
            <span className="morpho-val">{morphology.margin}</span>
          </div>
          <div className="morpho-tag">
            <span className="morpho-label">Venation:</span>
            <span className="morpho-val">{morphology.venation}</span>
          </div>
        </div>
      )}
    </div>
  );
}
