import React from 'react';
import { 
  Cpu, 
  Layers, 
  Zap, 
  ShieldCheck, 
  CheckCircle2, 
  BarChart3, 
  Database,
  Workflow
} from 'lucide-react';
import { PLANTS_DATABASE } from '../data/plantsData';

export default function ModelArchitecture() {
  const classes = Object.keys(PLANTS_DATABASE);

  return (
    <div className="model-lab-wrapper animate-fade-in">
      {/* Header Banner */}
      <div className="model-lab-hero">
        <div className="lab-pill-badge">
          <Cpu size={14} color="#60A5FA" />
          <span>Deep Learning Architecture & Neural Metrics</span>
        </div>
        <h2 className="model-lab-title">Model Architecture & Performance Lab</h2>
        <p className="model-lab-subtitle">
          Transparent metrics, convolutional layer pipeline, and ensemble test-time augmentation (TTA) powering the PlantAI neural vision engine.
        </p>
      </div>

      {/* Stats Counter Bar */}
      <div className="model-stats-grid">
        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: 'rgba(16, 185, 129, 0.15)', color: '#10B981' }}>
            <ShieldCheck size={24} />
          </div>
          <div className="stat-text">
            <span className="stat-number">91.24%</span>
            <span className="stat-label">Validation Accuracy</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#60A5FA' }}>
            <Layers size={24} />
          </div>
          <div className="stat-text">
            <span className="stat-number">25</span>
            <span className="stat-label">Botanical Classes</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: 'rgba(245, 158, 11, 0.15)', color: '#F59E0B' }}>
            <Database size={24} />
          </div>
          <div className="stat-text">
            <span className="stat-number">2,591</span>
            <span className="stat-label">Curated Specimens</span>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon-wrap" style={{ background: 'rgba(168, 85, 247, 0.15)', color: '#C084FC' }}>
            <Zap size={24} />
          </div>
          <div className="stat-text">
            <span className="stat-number">3× TTA</span>
            <span className="stat-label">Ensemble Inference</span>
          </div>
        </div>
      </div>

      {/* Neural Pipeline Diagram */}
      <div className="pipeline-section-card">
        <div className="pipeline-header">
          <Workflow size={18} color="#10B981" />
          <h3>Convolutional Forward Pass Pipeline</h3>
        </div>

        <div className="pipeline-steps-flow">
          <div className="pipe-node">
            <span className="node-step">01</span>
            <h4 className="node-title">Aspect Letterbox</h4>
            <span className="node-sub">Square padding prevents aspect ratio distortion</span>
            <span className="node-tensor">224 × 224 × 3 RGB</span>
          </div>

          <div className="pipe-arrow">→</div>

          <div className="pipe-node">
            <span className="node-step">02</span>
            <h4 className="node-title">Augmentation</h4>
            <span className="node-sub">Random rotation, flips, zoom & contrast</span>
            <span className="node-tensor">Invariant Features</span>
          </div>

          <div className="pipe-arrow">→</div>

          <div className="pipe-node active-node">
            <span className="node-step">03</span>
            <h4 className="node-title">MobileNetV2</h4>
            <span className="node-sub">Depthwise separable convolutions & inverted residuals</span>
            <span className="node-tensor">7 × 7 × 1280 Feature Map</span>
          </div>

          <div className="pipe-arrow">→</div>

          <div className="pipe-node">
            <span className="node-step">04</span>
            <h4 className="node-title">Dense Head</h4>
            <span className="node-sub">GlobalAvgPool → BatchNorm → Dropout(0.35) → Dense(192)</span>
            <span className="node-tensor">192 Latent Embedding</span>
          </div>

          <div className="pipe-arrow">→</div>

          <div className="pipe-node output-node">
            <span className="node-step">05</span>
            <h4 className="node-title">Softmax Output</h4>
            <span className="node-sub">Categorical probabilities across species</span>
            <span className="node-tensor">25 Class Logits</span>
          </div>
        </div>
      </div>

      {/* Accuracy & Generalization Breakdown */}
      <div className="insights-grid">
        <div className="insight-card">
          <h4>Why Real-world Google Images Work Accurately Now</h4>
          <ul className="insight-list">
            <li>
              <CheckCircle2 size={16} color="#10B981" />
              <span>
                <strong>Aspect-Ratio Preserving Letterboxing:</strong> Eliminates geometric squishing of elongated leaves (e.g. Bamboo, Lemongrass, Eucalyptus) so leaf venation angles stay intact.
              </span>
            </li>
            <li>
              <CheckCircle2 size={16} color="#10B981" />
              <span>
                <strong>Test-Time Augmentation (TTA):</strong> Takes 3 multi-angle passes (original, horizontal flip, and 90° rotation) and averages the softmax logits to eliminate orientation bias.
              </span>
            </li>
            <li>
              <CheckCircle2 size={16} color="#10B981" />
              <span>
                <strong>Balanced 25-Class Dataset:</strong> Each species is represented by diverse wild captures, garden photos, and augmented variations.
              </span>
            </li>
          </ul>
        </div>

        <div className="insight-card">
          <h4>Supported 25-Species Classification Taxonomy</h4>
          <div className="taxonomy-chips-wrap">
            {classes.map((cls) => (
              <span key={cls} className="taxonomy-chip">
                {PLANTS_DATABASE[cls]?.commonName || cls}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
