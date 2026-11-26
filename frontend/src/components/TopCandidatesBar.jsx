import React from 'react';
import { Layers, CheckCircle2 } from 'lucide-react';

export default function TopCandidatesBar({ candidates, onSelectCandidate }) {
  if (!candidates || candidates.length <= 1) return null;

  return (
    <div className="top-candidates-card">
      <div className="candidates-header">
        <div className="candidates-title">
          <Layers size={14} color="#34D399" />
          <span>Neural Confidence Distribution (Top Matches)</span>
        </div>
        <span className="candidates-sub">Ensemble Test-Time Probabilities</span>
      </div>

      <div className="candidates-list">
        {candidates.map((c, index) => {
          const raw = Number(c.raw_confidence) || 0;
          const isTop = index === 0;

          return (
            <div
              key={c.plant}
              className={`candidate-row ${isTop ? 'top-match' : ''}`}
              onClick={() => onSelectCandidate && onSelectCandidate(c.plant)}
              title={isTop ? 'Primary prediction' : `Click to view ${c.plant} dossier`}
            >
              <div className="candidate-name-col">
                <span className="candidate-rank">#{index + 1}</span>
                <span className="candidate-plant-name">{c.plant}</span>
                {isTop && (
                  <span className="candidate-badge">Top Match</span>
                )}
              </div>

              <div className="candidate-bar-col">
                <div className="candidate-bar-track">
                  <div
                    className="candidate-bar-fill"
                    style={{
                      width: `${Math.max(4, raw)}%`,
                      backgroundColor: isTop ? '#10B981' : '#3B82F6',
                    }}
                  />
                </div>
                <span className="candidate-percent">{c.confidence}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
