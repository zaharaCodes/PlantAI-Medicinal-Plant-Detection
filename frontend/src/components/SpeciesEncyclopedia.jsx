import React, { useState, useMemo } from 'react';
import { 
  X, 
  Search, 
  BookOpen, 
  Pill, 
  Flame, 
  ShieldAlert, 
  ExternalLink, 
  Check,
  Tag
} from 'lucide-react';
import { PLANTS_DATABASE } from '../data/plantsData';
import { playClickTick } from '../utils/soundEffects';

export default function SpeciesEncyclopedia({ isOpen, onClose, onSelectPlant, highlightPlant }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [focusedPlantId, setFocusedPlantId] = useState(highlightPlant || null);

  const plantList = useMemo(() => Object.values(PLANTS_DATABASE), []);

  const categories = useMemo(() => {
    const cats = new Set(plantList.map((p) => p.category));
    return ['All', ...Array.from(cats)];
  }, [plantList]);

  const filteredPlants = useMemo(() => {
    return plantList.filter((plant) => {
      const matchesCategory =
        selectedCategory === 'All' || plant.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        plant.commonName.toLowerCase().includes(q) ||
        plant.scientificName.toLowerCase().includes(q) ||
        plant.sanskritName.toLowerCase().includes(q) ||
        plant.uses.toLowerCase().includes(q) ||
        plant.tags.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [plantList, selectedCategory, searchQuery]);

  if (!isOpen) return null;

  const currentFocusedPlant =
    focusedPlantId ? PLANTS_DATABASE[focusedPlantId] : null;

  return (
    <div className="encyclopedia-backdrop" onClick={onClose}>
      <div className="encyclopedia-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="encyclopedia-header">
          <div className="encyclopedia-title-group">
            <div className="title-icon-badge">
              <BookOpen size={20} color="#10B981" />
            </div>
            <div>
              <h2 className="encyclopedia-title">Medicinal Botanical Field Guide</h2>
              <p className="encyclopedia-subtitle">
                Comprehensive taxonomy of all 17 medicinal species recognized by PlantAI
              </p>
            </div>
          </div>
          <button className="icon-btn-close" onClick={onClose} aria-label="Close encyclopedia">
            <X size={20} />
          </button>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="encyclopedia-toolbar">
          <div className="encyclopedia-search-box">
            <Search size={16} color="#6EE7B7" />
            <input
              type="text"
              placeholder="Search by plant name, scientific name, ailment (e.g., hair, digestion)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="encyclopedia-search-input"
            />
            {searchQuery && (
              <button
                className="clear-search-btn"
                onClick={() => setSearchQuery('')}
              >
                Clear
              </button>
            )}
          </div>

          <div className="category-pills-row">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: Split grid + detail card */}
        <div className="encyclopedia-body">
          {/* Plants Grid */}
          <div className="encyclopedia-grid">
            {filteredPlants.map((plant) => {
              const isSelected = focusedPlantId === plant.id;
              return (
                <div
                  key={plant.id}
                  className={`encyclopedia-plant-card ${isSelected ? 'selected' : ''}`}
                  onClick={() => setFocusedPlantId(plant.id)}
                >
                  <div className="plant-card-thumb-wrap">
                    <img
                      src={plant.image}
                      alt={plant.commonName}
                      className="plant-card-thumb"
                      loading="lazy"
                    />
                    <span className="plant-family-tag">{plant.family}</span>
                  </div>

                  <div className="plant-card-info">
                    <h4 className="plant-card-name">{plant.commonName}</h4>
                    <span className="plant-card-scientific">
                      {plant.scientificName}
                    </span>
                    <p className="plant-card-excerpt">
                      {plant.uses.slice(0, 75)}...
                    </p>
                  </div>
                </div>
              );
            })}

            {filteredPlants.length === 0 && (
              <div className="no-results-box">
                <p>No medicinal species matched your search query.</p>
              </div>
            )}
          </div>

          {/* Plant Detail Dossier Sidebar */}
          {currentFocusedPlant && (
            <div className="encyclopedia-dossier">
              <div className="dossier-header">
                <img
                  src={currentFocusedPlant.image}
                  alt={currentFocusedPlant.commonName}
                  className="dossier-image"
                />
                <div className="dossier-titles">
                  <h3>{currentFocusedPlant.commonName}</h3>
                  <div className="dossier-latin">
                    <em>{currentFocusedPlant.scientificName}</em>
                  </div>
                  {currentFocusedPlant.sanskritName && (
                    <div className="dossier-sanskrit">
                      Ayurvedic: {currentFocusedPlant.sanskritName}
                    </div>
                  )}
                  <div className="dossier-family">
                    Family: {currentFocusedPlant.family}
                  </div>
                </div>
              </div>

              <div className="dossier-tags">
                {currentFocusedPlant.tags.map((tag) => (
                  <span key={tag} className="dossier-tag">
                    <Tag size={11} /> {tag}
                  </span>
                ))}
              </div>

              <div className="dossier-sections">
                <div className="dossier-block uses-block">
                  <div className="dossier-block-title">
                    <Pill size={15} color="#34D399" />
                    <span>Therapeutic Uses</span>
                  </div>
                  <p>{currentFocusedPlant.uses}</p>
                </div>

                <div className="dossier-block prep-block">
                  <div className="dossier-block-title">
                    <Flame size={15} color="#60A5FA" />
                    <span>Preparation Method</span>
                  </div>
                  <p>{currentFocusedPlant.preparation}</p>
                </div>

                <div className="dossier-block warn-block">
                  <div className="dossier-block-title">
                    <ShieldAlert size={15} color="#F87171" />
                    <span>Safety Precautions</span>
                  </div>
                  <p>{currentFocusedPlant.warning}</p>
                </div>
              </div>

              {currentFocusedPlant.sampleImage && onSelectPlant && (
                <button
                  type="button"
                  className="dossier-test-btn"
                  onClick={() => {
                    onSelectPlant(currentFocusedPlant.id);
                    onClose();
                  }}
                >
                  <ExternalLink size={16} />
                  <span>Test this specimen in Scanner</span>
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
