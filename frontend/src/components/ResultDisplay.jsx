import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, 
  Volume2, 
  VolumeX, 
  Copy, 
  Check, 
  Download, 
  RefreshCw, 
  ShieldAlert, 
  Pill, 
  Flame, 
  Sparkles,
  BookOpen,
  MessageSquare,
  Sparkle
} from 'lucide-react';
import { PLANTS_DATABASE } from '../data/plantsData';
import LeafHealthScorecard from './LeafHealthScorecard';
import AyurvedicProfile from './AyurvedicProfile';
import TopCandidatesBar from './TopCandidatesBar';
import { playClickTick } from '../utils/soundEffects';

export default function ResultDisplay({ 
  result, 
  onReset, 
  onOpenEncyclopedia, 
  onOpenChat 
}) {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [activeTab, setActiveTab] = useState('uses'); // 'uses', 'prep', 'safety', 'ayurveda'
  
  // 3D Holographic Card Tilt Effect
  const cardRef = useRef(null);
  const [tiltStyle, setTiltStyle] = useState({});

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setTiltStyle({
      transform: `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`,
      transition: 'transform 0.08s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
      transition: 'transform 0.5s ease-out'
    });
  };

  // Match with comprehensive botanical database
  const plantMeta = PLANTS_DATABASE[result.plant] || {
    commonName: result.common || result.plant,
    scientificName: result.scientific || 'Botanical specimen',
    sanskritName: result.sanskrit || '',
    family: result.family || 'Plantae',
    tags: ['Medicinal', 'Pharmacological'],
    dosha: result.dosha || null,
    phytochemicals: result.phytochemicals || [],
    morphology: result.morphology || null
  };

  // Web Speech API Voice Reader
  const handleToggleSpeech = () => {
    playClickTick();
    if (!('speechSynthesis' in window)) {
      alert('Text-to-speech is not supported in this browser.');
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const textToSpeak = `Specimen identified as ${plantMeta.commonName}, scientifically classified as ${plantMeta.scientificName}. Confidence score: ${result.confidence}. Therapeutic uses: ${result.uses}. Preparation method: ${result.preparation}. Safety warnings: ${result.warning}.`;

    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
    setIsSpeaking(true);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const handleCopySummary = () => {
    playClickTick();
    const text = `🌿 PlantAI Neural Diagnosis\n` +
      `Plant: ${plantMeta.commonName} (${plantMeta.scientificName})\n` +
      `Botanical Family: ${plantMeta.family}\n` +
      `Match Confidence: ${result.confidence}\n\n` +
      `💊 Therapeutic Uses:\n${result.uses}\n\n` +
      `🍵 Preparation Guide:\n${result.preparation}\n\n` +
      `⚠️ Safety Warnings:\n${result.warning}`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadReport = () => {
    playClickTick();
    const text = `=================================================\n` +
      `         PLANTAI BIO-NEURAL VISION REPORT        \n` +
      `    Medicinal Species Identification & Health    \n` +
      `=================================================\n\n` +
      `SPECIMEN IDENTIFIED: ${result.plant.toUpperCase()} (${plantMeta.commonName})\n` +
      `SCIENTIFIC BINOMIAL: ${plantMeta.scientificName}\n` +
      `BOTANICAL FAMILY:    ${plantMeta.family}\n` +
      `AYURVEDIC / ALIAS:   ${plantMeta.sanskritName || 'N/A'}\n` +
      `NEURAL CONFIDENCE:   ${result.confidence}\n` +
      `TIMESTAMP:           ${new Date().toLocaleString()}\n\n` +
      `-------------------------------------------------\n` +
      `[1] THERAPEUTIC & BIOACTIVE USES:\n` +
      `${result.uses}\n\n` +
      `-------------------------------------------------\n` +
      `[2] HERBAL PREPARATION & DECOCTION GUIDE:\n` +
      `${result.preparation}\n\n` +
      `-------------------------------------------------\n` +
      `[3] SAFETY WARNING & CONTRAINDICATIONS:\n` +
      `${result.warning}\n\n` +
      `-------------------------------------------------\n` +
      `[4] PHYTOCHEMICAL SPECTRUM:\n` +
      `${(plantMeta.phytochemicals || []).join(', ')}\n\n` +
      `=================================================\n` +
      `Disclaimer: For educational & research assistance.\n` +
      `Always consult a certified herbalist or physician.\n`;

    const blob = new Blob([text], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `PlantAI_${result.plant}_Diagnostic_Report.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const rawScore = Number(result.raw_confidence) || 95;
  const strokeDashoffset = 251.2 - (251.2 * rawScore) / 100;

  return (
    <div 
      ref={cardRef}
      className="result-card-wrapper holographic-sheen animate-fade-in"
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Top Banner Result Header */}
      <div className="result-top-banner">
        <div className="result-pill-badge">
          <CheckCircle2 size={16} color="#34D399" />
          <span>Neural Match Confirmed</span>
        </div>

        <div className="result-audio-control">
          <button
            type="button"
            className={`audio-btn ${isSpeaking ? 'audio-active' : ''}`}
            onClick={handleToggleSpeech}
            title={isSpeaking ? 'Stop voice guide' : 'Listen to medicinal guide'}
          >
            {isSpeaking ? (
              <>
                <VolumeX size={16} />
                <span>Mute Audio</span>
                <span className="equalizer-bars">
                  <span className="bar b1" />
                  <span className="bar b2" />
                  <span className="bar b3" />
                </span>
              </>
            ) : (
              <>
                <Volume2 size={16} />
                <span>Listen Guide</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Specimen Identification Header */}
      <div className="result-specimen-section">
        <div className="specimen-taxonomy">
          <h2 className="specimen-name">{plantMeta.commonName || result.plant}</h2>
          <div className="specimen-scientific-name">
            <em>{plantMeta.scientificName}</em>
            {plantMeta.sanskritName && (
              <span className="sanskrit-pill">• {plantMeta.sanskritName}</span>
            )}
          </div>
          <div className="specimen-family-badge">
            Botanical Family: <strong>{plantMeta.family}</strong>
          </div>

          {/* Tags */}
          <div className="specimen-tags-list">
            {(plantMeta.tags || ['Medicinal', 'Ayurvedic']).map((tag) => (
              <span key={tag} className="specimen-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Circular Confidence Meter Gauge */}
        <div className="confidence-meter-box">
          <div className="circular-meter">
            <svg width="105" height="105" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="rgba(31, 41, 55, 0.8)"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#10B981"
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                style={{
                  transition: 'stroke-dashoffset 1.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  filter: 'drop-shadow(0 0 8px rgba(16, 185, 129, 0.7))',
                }}
              />
            </svg>
            <div className="meter-inner-label">
              <span className="meter-number">{result.confidence}</span>
              <span className="meter-sub">Match</span>
            </div>
          </div>
        </div>
      </div>

      {/* Top Candidates Probability Distribution */}
      {result.top_candidates && (
        <TopCandidatesBar 
          candidates={result.top_candidates} 
          onSelectCandidate={onOpenEncyclopedia}
        />
      )}

      {/* Foliar Health & Disease Diagnostics */}
      {result.health && (
        <LeafHealthScorecard health={result.health} />
      )}

      {/* Navigation Tabs */}
      <div className="result-nav-tabs">
        <button
          className={`result-tab-btn ${activeTab === 'uses' ? 'active-tab' : ''}`}
          onClick={() => { playClickTick(); setActiveTab('uses'); }}
        >
          <Pill size={15} />
          <span>Therapeutic Uses</span>
        </button>
        <button
          className={`result-tab-btn ${activeTab === 'prep' ? 'active-tab' : ''}`}
          onClick={() => { playClickTick(); setActiveTab('prep'); }}
        >
          <Flame size={15} />
          <span>Preparation</span>
        </button>
        <button
          className={`result-tab-btn ${activeTab === 'ayurveda' ? 'active-tab' : ''}`}
          onClick={() => { playClickTick(); setActiveTab('ayurveda'); }}
        >
          <Sparkles size={15} />
          <span>Ayurveda & Bioactives</span>
        </button>
        <button
          className={`result-tab-btn ${activeTab === 'safety' ? 'active-tab safety-tab' : ''}`}
          onClick={() => { playClickTick(); setActiveTab('safety'); }}
        >
          <ShieldAlert size={15} />
          <span>Safety & Warnings</span>
        </button>
      </div>

      {/* Tab Content Display */}
      <div className="result-tab-pane">
        {activeTab === 'uses' && (
          <div className="tab-pane-card card-uses animate-fade-in">
            <div className="pane-header">
              <Sparkles size={18} color="#34D399" />
              <h3>Bioactive & Pharmacological Efficacy</h3>
            </div>
            <p className="pane-body">{result.uses}</p>
          </div>
        )}

        {activeTab === 'prep' && (
          <div className="tab-pane-card card-prep animate-fade-in">
            <div className="pane-header">
              <Flame size={18} color="#60A5FA" />
              <h3>Herbal Preparation, Infusion & Decoctions</h3>
            </div>
            <p className="pane-body">{result.preparation}</p>
          </div>
        )}

        {activeTab === 'ayurveda' && (
          <div className="animate-fade-in">
            <AyurvedicProfile
              dosha={plantMeta.dosha}
              phytochemicals={plantMeta.phytochemicals}
              morphology={plantMeta.morphology}
            />
          </div>
        )}

        {activeTab === 'safety' && (
          <div className="tab-pane-card card-safety animate-fade-in">
            <div className="pane-header warning-header">
              <ShieldAlert size={18} color="#F87171" />
              <h3>Precautions, Toxicities & Contraindications</h3>
            </div>
            <p className="pane-body warning-body">{result.warning}</p>
          </div>
        )}
      </div>

      {/* Action Footer Buttons */}
      <div className="result-footer-actions">
        {onOpenChat && (
          <button
            type="button"
            className="action-btn chat-action"
            onClick={() => { playClickTick(); onOpenChat(result.plant); }}
          >
            <MessageSquare size={16} />
            <span>Chat with Herbalist AI</span>
          </button>
        )}

        <button
          type="button"
          className="action-btn secondary-action"
          onClick={handleCopySummary}
        >
          {copied ? <Check size={16} color="#34D399" /> : <Copy size={16} />}
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>

        <button
          type="button"
          className="action-btn secondary-action"
          onClick={handleDownloadReport}
        >
          <Download size={16} />
          <span>Report</span>
        </button>

        {onOpenEncyclopedia && (
          <button
            type="button"
            className="action-btn secondary-action"
            onClick={() => { playClickTick(); onOpenEncyclopedia(result.plant); }}
          >
            <BookOpen size={16} />
            <span>Dossier</span>
          </button>
        )}

        <button
          type="button"
          className="action-btn reset-action"
          onClick={() => { playClickTick(); onReset(); }}
        >
          <RefreshCw size={16} />
          <span>Scan Another</span>
        </button>
      </div>
    </div>
  );
}
