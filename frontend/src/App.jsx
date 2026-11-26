import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Upload, 
  Leaf, 
  Camera, 
  AlertCircle, 
  RefreshCw, 
  Sparkles, 
  BookOpen, 
  ShieldCheck, 
  Zap, 
  Layers, 
  Wind, 
  Volume2, 
  VolumeX, 
  MessageSquare,
  HeartPulse,
  Activity,
  Cpu
} from 'lucide-react';
import './App.css';

import FloatingFoliage from './components/FloatingFoliage';
import AnimatedPlantHero from './components/AnimatedPlantHero';
import ScannerOverlay from './components/ScannerOverlay';
import SampleLeavesShelf from './components/SampleLeavesShelf';
import ResultDisplay from './components/ResultDisplay';
import CameraModal from './components/CameraModal';
import SpeciesEncyclopedia from './components/SpeciesEncyclopedia';
import PlantChatDrawer from './components/PlantChatDrawer';
import AilmentClinic from './components/AilmentClinic';
import DiseaseLab from './components/DiseaseLab';
import ModelArchitecture from './components/ModelArchitecture';
import { PLANTS_DATABASE } from './data/plantsData';
import { 
  playScanSweep, 
  playSuccessChime, 
  playClickTick, 
  isSoundEnabled, 
  setSoundEnabled 
} from './utils/soundEffects';

export default function App() {
  // Navigation View State: 'scanner' | 'field-guide' | 'clinic' | 'disease-lab' | 'model-lab'
  const [activeView, setActiveView] = useState('scanner');

  // Scanner State
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [activeSampleId, setActiveSampleId] = useState(null);
  const [dragOver, setDragOver] = useState(false);

  // Modals & UI Toggles
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [isEncyclopediaOpen, setIsEncyclopediaOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatTargetPlant, setChatTargetPlant] = useState('Tulsi');
  const [encyclopediaHighlight, setEncyclopediaHighlight] = useState(null);
  const [foliageEnabled, setFoliageEnabled] = useState(true);
  const [soundOn, setSoundOn] = useState(true);
  const [simulationMode, setSimulationMode] = useState(false);

  useEffect(() => {
    setSoundOn(isSoundEnabled());
  }, []);

  const toggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
    if (next) playClickTick();
  };

  const handleNavClick = (viewName) => {
    playClickTick();
    setActiveView(viewName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle file input selection
  const handleImageChange = (e) => {
    playClickTick();
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setResult(null);
      setError('');
      setActiveSampleId(null);
      setActiveView('scanner');
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    playClickTick();
    const droppedFile = e.dataTransfer.files?.[0];
    if (droppedFile && droppedFile.type.startsWith('image/')) {
      setFile(droppedFile);
      setPreview(URL.createObjectURL(droppedFile));
      setResult(null);
      setError('');
      setActiveSampleId(null);
      setActiveView('scanner');
    }
  };

  // Handle sample selection from shelf
  const handleSelectSample = (sampleFile, previewUrl, plantId) => {
    playClickTick();
    setFile(sampleFile);
    setPreview(previewUrl);
    setResult(null);
    setError('');
    setActiveSampleId(plantId);
    setActiveView('scanner');
  };

  // Handle camera capture
  const handleCameraCapture = (capturedFile, previewUrl) => {
    playClickTick();
    setFile(capturedFile);
    setPreview(previewUrl);
    setResult(null);
    setError('');
    setActiveSampleId(null);
    setActiveView('scanner');
  };

  // Reset current leaf
  const handleReset = () => {
    playClickTick();
    setFile(null);
    setPreview(null);
    setResult(null);
    setError('');
    setActiveSampleId(null);
  };

  // Open encyclopedia for a specific plant
  const handleOpenEncyclopedia = (plantName) => {
    playClickTick();
    setEncyclopediaHighlight(plantName);
    setIsEncyclopediaOpen(true);
  };

  // Open Chat for a specific plant
  const handleOpenChat = (plantName) => {
    playClickTick();
    setChatTargetPlant(plantName || 'Tulsi');
    setIsChatOpen(true);
  };

  // High-fidelity simulation for demo / offline resilience
  const runSimulatedPrediction = () => {
    let targetPlant = activeSampleId;
    if (!targetPlant || !PLANTS_DATABASE[targetPlant]) {
      const keys = ['Tulsi', 'Aloevera', 'Moringa', 'Ashwagandha', 'Neem', 'Mint', 'Curry_Leaf', 'Brahmi'];
      targetPlant = keys[Math.floor(Math.random() * keys.length)];
    }

    const info = PLANTS_DATABASE[targetPlant] || {};
    const topScore = (94.5 + Math.random() * 4.8).toFixed(2);
    const secondScore = ((100 - parseFloat(topScore)) * 0.75).toFixed(2);
    const thirdScore = (100 - parseFloat(topScore) - parseFloat(secondScore)).toFixed(2);

    const runnerUps = Object.keys(PLANTS_DATABASE).filter(k => k !== targetPlant);
    const secondPlant = runnerUps[Math.floor(Math.random() * runnerUps.length)];
    const thirdPlant = runnerUps.filter(k => k !== secondPlant)[0] || 'Mint';

    return {
      plant: targetPlant,
      confidence: `${topScore}%`,
      raw_confidence: parseFloat(topScore),
      common: info.commonName || targetPlant,
      scientific: info.scientificName || 'Botanical specimen',
      sanskrit: info.sanskritName || 'N/A',
      family: info.family || 'Plantae',
      uses: info.uses,
      preparation: info.preparation,
      warning: info.warning,
      dosha: info.dosha,
      phytochemicals: info.phytochemicals,
      morphology: info.morphology,
      top_candidates: [
        { plant: targetPlant, confidence: `${topScore}%`, raw_confidence: parseFloat(topScore) },
        { plant: secondPlant, confidence: `${secondScore}%`, raw_confidence: parseFloat(secondScore) },
        { plant: thirdPlant, confidence: `${thirdScore}%`, raw_confidence: parseFloat(thirdScore) }
      ],
      health: {
        vitality_score: `${Math.floor(92 + Math.random() * 7)}%`,
        condition: 'Healthy & Vigorous Leaf Tissue',
        status_color: '#10B981',
        recommendation: 'Optimal cellular hydration and chlorophyll content. Prime vitality for herbal preparation.',
        green_index: 88.4,
        chlorosis_index: 4.2
      }
    };
  };

  // Run AI Model Classification
  const handleUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError('');
    playScanSweep();

    if (simulationMode) {
      setTimeout(() => {
        const simRes = runSimulatedPrediction();
        setResult(simRes);
        setLoading(false);
        playSuccessChime();
      }, 2200);
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Connect to Flask backend (proxied via Vite or direct)
      const response = await axios.post('/predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        timeout: 14000
      });
      setResult(response.data);
      playSuccessChime();
    } catch (err) {
      // If proxied fails, try direct port 5000 fallback
      try {
        const fallbackResp = await axios.post('http://127.0.0.1:5000/predict', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 14000
        });
        setResult(fallbackResp.data);
        playSuccessChime();
      } catch (err2) {
        console.warn('Backend server unreachable:', err2);
        setError('Flask backend (app.py) is not responding on port 5000.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      {/* 60fps Floating Botanical Foliage Engine */}
      <FloatingFoliage enabled={foliageEnabled} />

      {/* Navigation Bar */}
      <header className="app-navbar">
        <div className="nav-brand" onClick={() => handleNavClick('scanner')}>
          <div className="brand-icon-shield">
            <Leaf size={24} color="#10B981" />
          </div>
          <div className="brand-text-block">
            <span className="brand-title">PlantAI</span>
            <span className="brand-tagline">Intelligence Engine</span>
          </div>
        </div>

        {/* Multi-Section Page Tabs */}
        <nav className="nav-links-menu">
          <button
            type="button"
            className={`nav-tab-link ${activeView === 'scanner' ? 'active' : ''}`}
            onClick={() => handleNavClick('scanner')}
          >
            <Sparkles size={15} />
            <span>AI Scanner</span>
          </button>

          <button
            type="button"
            className={`nav-tab-link ${activeView === 'clinic' ? 'active' : ''}`}
            onClick={() => handleNavClick('clinic')}
          >
            <HeartPulse size={15} />
            <span>Remedies Clinic</span>
          </button>

          <button
            type="button"
            className={`nav-tab-link ${activeView === 'disease-lab' ? 'active' : ''}`}
            onClick={() => handleNavClick('disease-lab')}
          >
            <Activity size={15} />
            <span>Disease Lab</span>
          </button>

          <button
            type="button"
            className={`nav-tab-link ${activeView === 'model-lab' ? 'active' : ''}`}
            onClick={() => handleNavClick('model-lab')}
          >
            <Cpu size={15} />
            <span>Model Metrics</span>
          </button>
        </nav>

        {/* Global Controls */}
        <div className="nav-controls">
          <div className="status-badge" title="Deep MobileNetV2 architecture with TTA Ensembling">
            <span className="status-indicator-dot" />
            <span>25 Species Online</span>
          </div>

          <button
            type="button"
            className={`nav-btn ${soundOn ? 'active' : ''}`}
            onClick={toggleSound}
            title="Toggle synthesized tactile & scanner sound effects"
          >
            {soundOn ? <Volume2 size={15} /> : <VolumeX size={15} />}
            <span>{soundOn ? 'FX On' : 'Muted'}</span>
          </button>

          <button
            type="button"
            className={`nav-btn ${foliageEnabled ? 'active' : ''}`}
            onClick={() => setFoliageEnabled(!foliageEnabled)}
            title="Toggle floating botanical foliage in background"
          >
            <Wind size={15} />
            <span>{foliageEnabled ? 'Foliage' : 'Off'}</span>
          </button>

          <button
            type="button"
            className="nav-btn"
            onClick={() => {
              playClickTick();
              setEncyclopediaHighlight(null);
              setIsEncyclopediaOpen(true);
            }}
          >
            <BookOpen size={15} />
            <span>Field Guide</span>
          </button>

          <button
            type="button"
            className="nav-btn"
            onClick={() => handleOpenChat(result ? result.plant : 'Tulsi')}
          >
            <MessageSquare size={15} />
            <span>Herbalist AI</span>
          </button>
        </div>
      </header>

      {/* Main Content Sections */}
      <main className="app-main-content">
        {/* VIEW 1: AI Scanner Studio (Home) */}
        {activeView === 'scanner' && (
          <>
            {/* Hero Section */}
            <section className="hero-section">
              <div className="hero-text-content">
                <div className="hero-pill-category">
                  <Sparkles size={14} />
                  <span>Bio-Neural Vision v3.0 • 25 Medicinal Species</span>
                </div>

                <h1 className="hero-main-title">
                  Medicinal Flora <br />
                  <span className="hero-gradient-text">Neural Identification</span>
                </h1>

                <p className="hero-description">
                  Scan, upload, or choose any medicinal leaf specimen (Google Images, camera, or the wild).
                  Our aspect-preserving neural network decodes leaf venation, cellular health, 
                  Ayurvedic Tridosha energetics, and pharmacological guidelines.
                </p>

                <div className="hero-badges-row">
                  <div className="hero-stat-badge">
                    <ShieldCheck size={16} color="#10B981" />
                    <span><strong>25</strong> Medicinal Classes</span>
                  </div>
                  <div className="hero-stat-badge">
                    <Zap size={16} color="#34D399" />
                    <span><strong>3× TTA</strong> Ensembled Accuracy</span>
                  </div>
                  <div className="hero-stat-badge">
                    <Layers size={16} color="#60A5FA" />
                    <span><strong>Cellular</strong> Health Score</span>
                  </div>
                </div>
              </div>

              {/* Living Animated Mascot Hero Art */}
              <AnimatedPlantHero />
            </section>

            {/* Dual Workspace: Scanner Dropzone & Instant Test Shelf */}
            <div className="workspace-layout">
              {/* Left Column: Scanner Card */}
              <div className="scanner-card">
                <div className="scanner-card-header">
                  <div className="card-title-group">
                    <Leaf size={18} color="#10B981" />
                    <h2>Leaf Morphology & Health Scanner</h2>
                  </div>
                  {preview && (
                    <button
                      type="button"
                      className="icon-btn-close"
                      onClick={handleReset}
                      title="Clear current leaf"
                    >
                      <RefreshCw size={14} />
                    </button>
                  )}
                </div>

                {/* Dropzone Viewport */}
                <div
                  className={`dropzone-frame ${dragOver ? 'drag-over' : ''}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <label htmlFor="leaf-file-input" style={{ width: '100%', height: '100%', cursor: 'pointer' }}>
                    {preview ? (
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <img src={preview} alt="Specimen Preview" className="leaf-preview-img" />
                        {/* Futuristic Laser Scanner Overlay */}
                        <ScannerOverlay active={loading} />
                      </div>
                    ) : (
                      <div className="dropzone-placeholder">
                        <div className="upload-icon-wrapper">
                          <Upload size={32} color="#34D399" />
                        </div>
                        <p className="upload-prompt-text">Drag & drop any leaf photo (Google Images, camera, etc.)</p>
                        <span className="upload-specs">Aspect-ratio preserved • Supports JPG, PNG, WEBP</span>
                      </div>
                    )}
                    <input
                      id="leaf-file-input"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      style={{ display: 'none' }}
                    />
                  </label>
                </div>

                {/* Action Bar */}
                <div className="scanner-actions-bar">
                  <button
                    type="button"
                    className="camera-trigger-btn"
                    onClick={() => { playClickTick(); setIsCameraOpen(true); }}
                    title="Use webcam or phone camera to photograph a leaf"
                  >
                    <Camera size={18} />
                    <span>Live Camera</span>
                  </button>

                  <button
                    type="button"
                    className="primary-btn"
                    onClick={handleUpload}
                    disabled={!file || loading}
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="spin" size={18} />
                        <span>Analyzing Venation & Tissue Health...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={18} />
                        <span>Identify & Analyze Specimen</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Error & Offline Fallback Notice */}
                {error && (
                  <div className="error-notice-card">
                    <div className="error-notice-row">
                      <AlertCircle size={20} color="#EF4444" />
                      <span>{error}</span>
                    </div>
                    <button
                      type="button"
                      className="simulation-switch-btn"
                      onClick={() => {
                        setSimulationMode(true);
                        setError('');
                        setLoading(true);
                        playScanSweep();
                        setTimeout(() => {
                          setResult(runSimulatedPrediction());
                          setLoading(false);
                          playSuccessChime();
                        }, 1800);
                      }}
                    >
                      Run in Demonstration / Offline AI Simulation Mode →
                    </button>
                  </div>
                )}

                {/* Results Display */}
                {result && (
                  <ResultDisplay
                    result={result}
                    onReset={handleReset}
                    onOpenEncyclopedia={handleOpenEncyclopedia}
                    onOpenChat={handleOpenChat}
                  />
                )}
              </div>

              {/* Right Column: Instant Test Samples */}
              <SampleLeavesShelf
                onSelectSample={handleSelectSample}
                activeId={activeSampleId}
                disabled={loading}
              />
            </div>
          </>
        )}

        {/* VIEW 2: Remedies & Ailment Clinic */}
        {activeView === 'clinic' && (
          <AilmentClinic
            onSelectPlant={(plantId) => {
              const sample = PLANTS_DATABASE[plantId];
              if (sample && (sample.sampleImage || sample.image)) {
                const imgSrc = sample.sampleImage || sample.image;
                fetch(imgSrc)
                  .then((res) => res.blob())
                  .then((blob) => {
                    const f = new File([blob], `${plantId.toLowerCase()}.jpg`, { type: 'image/jpeg' });
                    handleSelectSample(f, imgSrc, plantId);
                  });
              }
            }}
          />
        )}

        {/* VIEW 3: Foliar Health & Plant Disease Lab */}
        {activeView === 'disease-lab' && (
          <DiseaseLab />
        )}

        {/* VIEW 4: Model Metrics & Architecture Lab */}
        {activeView === 'model-lab' && (
          <ModelArchitecture />
        )}
      </main>

      {/* Live Camera Viewfinder Modal */}
      <CameraModal
        isOpen={isCameraOpen}
        onClose={() => setIsCameraOpen(false)}
        onCapture={handleCameraCapture}
      />

      {/* 25 Species Botanical Field Guide / Encyclopedia Modal */}
      <SpeciesEncyclopedia
        isOpen={isEncyclopediaOpen}
        onClose={() => setIsEncyclopediaOpen(false)}
        onSelectPlant={(plantId) => {
          const sample = PLANTS_DATABASE[plantId];
          if (sample && (sample.sampleImage || sample.image)) {
            const imgSrc = sample.sampleImage || sample.image;
            fetch(imgSrc)
              .then((res) => res.blob())
              .then((blob) => {
                const f = new File([blob], `${plantId.toLowerCase()}.jpg`, { type: 'image/jpeg' });
                handleSelectSample(f, imgSrc, plantId);
              });
          }
        }}
        highlightPlant={encyclopediaHighlight}
      />

      {/* Interactive Botanical AI Assistant Chat Drawer */}
      <PlantChatDrawer
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        plantName={chatTargetPlant}
      />

      {/* Footer */}
      <footer className="app-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Leaf size={16} color="#10B981" />
          <span>PlantAI v3.0 • 25-Species Deep Neural Botanical Classifier</span>
        </div>
        <p className="footer-disclaimer">
          PlantAI uses deep convolutional neural networks fine-tuned across 25 medicinal species.
          Botanical details are provided for research, education, and identification support.
          Always consult an herbalist or healthcare practitioner before therapeutic usage.
        </p>
      </footer>
    </div>
  );
}
