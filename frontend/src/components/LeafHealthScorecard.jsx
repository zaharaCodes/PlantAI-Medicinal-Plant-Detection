import React from 'react';
import { Activity, ShieldCheck, AlertTriangle, Sparkles, Droplets } from 'lucide-react';

export default function LeafHealthScorecard({ health }) {
  if (!health) return null;

  const scoreNum = parseInt(health.vitality_score) || 92;
  const isHealthy = scoreNum >= 85;

  return (
    <div className="leaf-health-card">
      <div className="health-card-header">
        <div className="health-title-group">
          <Activity size={18} color={health.status_color || '#10B981'} className="pulse-slow" />
          <h4 className="health-heading">Foliar Health & Vitality Diagnostics</h4>
        </div>
        <span
          className="health-badge-pill"
          style={{
            color: health.status_color || '#10B981',
            borderColor: `${health.status_color || '#10B981'}55`,
            backgroundColor: `${health.status_color || '#10B981'}15`,
          }}
        >
          {health.condition}
        </span>
      </div>

      <div className="health-metrics-row">
        {/* Vitality Score Dial */}
        <div className="vitality-score-box">
          <span className="vitality-num" style={{ color: health.status_color || '#10B981' }}>
            {health.vitality_score}
          </span>
          <span className="vitality-label">Cellular Health</span>
        </div>

        {/* Micro gauges */}
        <div className="micro-gauges-col">
          <div className="micro-gauge-item">
            <div className="gauge-label-row">
              <span className="gauge-name">
                <Sparkles size={12} color="#34D399" /> Chlorophyll Ratio
              </span>
              <span className="gauge-val">{health.green_index}%</span>
            </div>
            <div className="gauge-bar-track">
              <div
                className="gauge-bar-fill"
                style={{ width: `${Math.min(100, health.green_index * 1.5)}%`, backgroundColor: '#10B981' }}
              />
            </div>
          </div>

          <div className="micro-gauge-item">
            <div className="gauge-label-row">
              <span className="gauge-name">
                <Droplets size={12} color="#F59E0B" /> Chlorosis (Yellowing)
              </span>
              <span className="gauge-val">{health.chlorosis_index}%</span>
            </div>
            <div className="gauge-bar-track">
              <div
                className="gauge-bar-fill"
                style={{ width: `${Math.min(100, health.chlorosis_index * 3)}%`, backgroundColor: '#F59E0B' }}
              />
            </div>
          </div>
        </div>
      </div>

      <p className="health-recommendation-note">
        <strong>Agronomic Insight:</strong> {health.recommendation}
      </p>
    </div>
  );
}
