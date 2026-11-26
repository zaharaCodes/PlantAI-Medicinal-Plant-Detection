import React, { useState } from 'react';
import { 
  Activity, 
  Sparkles, 
  AlertTriangle, 
  ShieldCheck, 
  Droplets, 
  Sun, 
  Bug, 
  Layers,
  HelpCircle,
  CheckCircle2
} from 'lucide-react';
import { playClickTick } from '../utils/soundEffects';

export default function DiseaseLab() {
  const [chlorophyll, setChlorophyll] = useState(88);
  const [chlorosis, setChlorosis] = useState(6);
  const [necrosis, setNecrosis] = useState(3);

  // Compute simulated health vitality
  const calculatedVitality = Math.max(20, Math.min(99, Math.round(
    (chlorophyll * 0.75) - (chlorosis * 1.8) - (necrosis * 3.2) + 20
  )));

  let condition = "Healthy & Vigorous Leaf Tissue";
  let statusColor = "#10B981";
  let diagnosisNote = "Optimal photosynthetic chlorophyll concentration. Vigorous vascular turgidity and prime herbal bioactive yield.";
  let treatment = "Maintain scheduled morning hydration and indirect full-spectrum sunlight. No corrective intervention required.";

  if (necrosis >= 18 || calculatedVitality < 50) {
    condition = "Severe Foliar Necrosis / Anthracnose Lesions";
    statusColor = "#EF4444";
    diagnosisNote = "Significant cellular death and membrane rupture detected. Likely fungal blight, septoria leaf spot, or chemical scorch.";
    treatment = "Prune infected leaves immediately. Spray organic copper fungicide or 1% cold-pressed neem oil emulsion every 5 days.";
  } else if (chlorosis >= 18 || (chlorosis > 10 && necrosis > 8)) {
    condition = "Moderate Chlorosis (Nutrient Deficiency)";
    statusColor = "#F59E0B";
    diagnosisNote = "Chlorophyll degradation and interveinal yellowing. Commonly caused by iron (Fe), magnesium (Mg), or nitrogen (N) soil deficiency.";
    treatment = "Apply chelated iron or composted manure tea to root zone. Ensure pot drainage holes are unblocked to prevent root hypoxia.";
  } else if (chlorophyll < 65) {
    condition = "Mild Solar Bleaching / Senescence";
    statusColor = "#3B82F6";
    diagnosisNote = "Tissue shows reduced green reflectance from photobleaching, shade acclimation, or natural leaf maturation.";
    treatment = "Relocate specimen to balanced bright indirect sunlight and foliar-mist with seaweed extract.";
  }

  return (
    <div className="disease-lab-wrapper animate-fade-in">
      {/* Header Banner */}
      <div className="disease-lab-hero">
        <div className="lab-pill-badge">
          <Activity size={14} color="#34D399" />
          <span>Computer Vision Botanical Pathology</span>
        </div>
        <h2 className="disease-lab-title">Foliar Health & Plant Disease Lab</h2>
        <p className="disease-lab-subtitle">
          Discover how PlantAI evaluates foliar cellular health, chlorophyll indices, and detects early signs of crop pests and nutrient deficiencies.
        </p>
      </div>

      {/* Interactive Simulation Console */}
      <div className="lab-console-card">
        <div className="console-header">
          <div className="console-title-group">
            <Sparkles size={18} color="#10B981" />
            <h3>Interactive Leaf Health Diagnostic Simulator</h3>
          </div>
          <span className="console-badge">Real-time Spectral Simulator</span>
        </div>

        <div className="console-grid">
          {/* Sliders Column */}
          <div className="sliders-column">
            {/* Chlorophyll Slider */}
            <div className="slider-box">
              <div className="slider-label-row">
                <span className="slider-name">
                  <Sparkles size={14} color="#10B981" /> Chlorophyll Ratio (Greenness)
                </span>
                <span className="slider-val" style={{ color: '#10B981' }}>{chlorophyll}%</span>
              </div>
              <input
                type="range"
                min="20"
                max="98"
                value={chlorophyll}
                onChange={(e) => { playClickTick(); setChlorophyll(Number(e.target.value)); }}
                className="custom-range range-green"
              />
              <span className="slider-hint">Evaluates excess green index (ExG = 2G - R - B)</span>
            </div>

            {/* Chlorosis Slider */}
            <div className="slider-box">
              <div className="slider-label-row">
                <span className="slider-name">
                  <Sun size={14} color="#F59E0B" /> Chlorosis Ratio (Yellowing / Bleach)
                </span>
                <span className="slider-val" style={{ color: '#F59E0B' }}>{chlorosis}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                value={chlorosis}
                onChange={(e) => { playClickTick(); setChlorosis(Number(e.target.value)); }}
                className="custom-range range-yellow"
              />
              <span className="slider-hint">Detects nitrogen, iron, or magnesium starvation</span>
            </div>

            {/* Necrosis Slider */}
            <div className="slider-box">
              <div className="slider-label-row">
                <span className="slider-name">
                  <AlertTriangle size={14} color="#EF4444" /> Necrosis Ratio (Browning / Lesions)
                </span>
                <span className="slider-val" style={{ color: '#EF4444' }}>{necrosis}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={necrosis}
                onChange={(e) => { playClickTick(); setNecrosis(Number(e.target.value)); }}
                className="custom-range range-red"
              />
              <span className="slider-hint">Calculates cellular collapse, bacterial spots & scorch</span>
            </div>
          </div>

          {/* Diagnostic Result Column */}
          <div className="diagnostic-output-box">
            <div className="output-top-row">
              <div className="vitality-dial">
                <svg width="120" height="120" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="50" stroke="rgba(255,255,255,0.08)" strokeWidth="10" fill="none" />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke={statusColor}
                    strokeWidth="10"
                    strokeDasharray="314"
                    strokeDashoffset={314 - (314 * calculatedVitality) / 100}
                    strokeLinecap="round"
                    fill="none"
                    style={{ transition: 'stroke-dashoffset 0.4s ease, stroke 0.4s ease' }}
                  />
                </svg>
                <div className="vitality-dial-text">
                  <span className="dial-num" style={{ color: statusColor }}>{calculatedVitality}%</span>
                  <span className="dial-sub">Vitality</span>
                </div>
              </div>

              <div className="condition-status-group">
                <span className="condition-pill" style={{ color: statusColor, borderColor: `${statusColor}55`, background: `${statusColor}18` }}>
                  {condition}
                </span>
                <p className="diagnosis-body">{diagnosisNote}</p>
              </div>
            </div>

            {/* Organic Treatment Protocol */}
            <div className="treatment-protocol-box">
              <div className="protocol-title">
                <CheckCircle2 size={16} color="#10B981" />
                <span>Recommended Organic Protocol</span>
              </div>
              <p className="protocol-text">{treatment}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Educational Pathology Cards */}
      <div className="pathology-cards-grid">
        <div className="pathology-card card-healthy">
          <div className="patho-header">
            <ShieldCheck size={24} color="#10B981" />
            <h4>Healthy Leaf Anatomy</h4>
          </div>
          <p>
            Dense chloroplast distribution throughout the palisade mesophyll produces peak green reflectance and strong near-infrared scatter. Vein turgidity is intact with zero pathogen spotting.
          </p>
          <div className="patho-footer">Optimal for Ayurvedic Extraction</div>
        </div>

        <div className="pathology-card card-chlorosis">
          <div className="patho-header">
            <Sun size={24} color="#F59E0B" />
            <h4>Foliar Chlorosis</h4>
          </div>
          <p>
            Loss of chlorophyll pigments allows yellow carotenoids and xanthophylls to dominate. Usually triggered by root waterlogging, iron chlorosis, or lack of soil nitrogen.
          </p>
          <div className="patho-footer">Remedy: Organic Nitrogen / Iron Chelates</div>
        </div>

        <div className="pathology-card card-necrosis">
          <div className="patho-header">
            <AlertTriangle size={24} color="#EF4444" />
            <h4>Necrosis & Fungal Spots</h4>
          </div>
          <p>
            Irreversible cell lysis and membrane oxidation, typically forming dark haloed spots. Caused by Alternaria, Cercospora, powdery mildew, or direct fertilizer chemical burn.
          </p>
          <div className="patho-footer">Remedy: Neem Oil Emulsion / Copper Spray</div>
        </div>
      </div>
    </div>
  );
}
