import React, { useState } from 'react';
import { 
  HeartPulse, 
  Sparkles, 
  Flame, 
  ShieldAlert, 
  Pill, 
  ArrowRight, 
  Search,
  CheckCircle2,
  Droplets,
  Wind
} from 'lucide-react';
import { PLANTS_DATABASE } from '../data/plantsData';
import { playClickTick } from '../utils/soundEffects';

const AILMENTS_DATA = [
  {
    id: 'hair-fall',
    title: 'Hair Fall & Premature Graying',
    category: 'Hair & Scalp',
    icon: '💇',
    plantId: 'Bringaraja',
    remedyName: 'Bhringraj & Curry Leaf Herbal Hair Oil',
    keyBenefit: 'Stimulates dormant anagen hair follicles and preserves natural melanin.',
    ingredients: [
      'Fresh Bhringraj leaves (1 cup crushed)',
      'Fresh Curry leaves (1/2 cup)',
      'Cold-pressed virgin coconut oil (250 ml)',
      'Methi (Fenugreek) seeds (1 tbsp)'
    ],
    recipe: 'Heat coconut oil on low heat. Add crushed Bhringraj and Curry leaves with Fenugreek seeds. Simmer until the bubbling stops and oil turns dark emerald green. Cool, strain, and store in glass jar.',
    dosage: 'Massage warm oil into scalp 2-3 times weekly 1 hour before bath or leave overnight.',
    safety: 'Perform a patch test. Ensure leaves are thoroughly dried to avoid water splatters in oil.'
  },
  {
    id: 'fever-immunity',
    title: 'Chronic Fever & Immune Defense',
    category: 'Immunity',
    icon: '🛡️',
    plantId: 'Amruthaballi',
    remedyName: 'Giloy (Guduchi) Immunity Kadha',
    keyBenefit: 'Acts as a natural antipyretic, purifies toxic blood metabolites, and boosts lymphocytes.',
    ingredients: [
      'Fresh Giloy stem (5-6 inches, crushed)',
      'Fresh Tulsi leaves (7-8 leaves)',
      'Crushed black peppercorns (3-4)',
      'Water (4 cups)'
    ],
    recipe: 'Boil water with crushed Giloy stem, Tulsi leaves, and black pepper. Simmer on medium-low flame until reduced to 1 cup. Strain and drink warm with honey.',
    dosage: 'Drink 50ml warm decoction once or twice daily during seasonal sickness or fever.',
    safety: 'Avoid high doses in pregnancy. Diabetics should monitor blood glucose levels.'
  },
  {
    id: 'stress-sleep',
    title: 'Anxiety, Cortisol Stress & Insomnia',
    category: 'Cognitive',
    icon: '🧠',
    plantId: 'Ashwagandha',
    remedyName: 'Ashwagandha Golden Moon Milk',
    keyBenefit: 'Reduces circulating cortisol, promotes deep restorative REM sleep, and calms Vata.',
    ingredients: [
      'Pure Ashwagandha powder (1/2 tsp)',
      'Warm cow or almond milk (1 cup)',
      'Pure Turmeric powder (pinch)',
      'Nutmeg powder (pinch)',
      'Organic raw honey (1 tsp)'
    ],
    recipe: 'Whisk Ashwagandha and Turmeric into simmering milk for 3 minutes. Pour into mug, let cool slightly, stir in nutmeg and raw honey.',
    dosage: 'Sip warm 30 minutes before bedtime.',
    safety: 'Do not take during pregnancy. Avoid combining with heavy pharmaceutical sedatives.'
  },
  {
    id: 'digestion-acidity',
    title: 'Acidity, Gas & Indigestion',
    category: 'Digestion',
    icon: '🍵',
    plantId: 'Mint',
    remedyName: 'Mint & Coriander Digestive Elixir',
    keyBenefit: 'Relaxes gastrointestinal smooth muscles, halts painful spasms, and soothes Pitta heat.',
    ingredients: [
      'Fresh Mint leaves (10-12 leaves)',
      'Coriander seeds (1 tbsp crushed)',
      'Fresh ginger slice (1/2 inch)',
      'Water (2 cups)'
    ],
    recipe: 'Boil crushed coriander seeds and ginger in water for 5 minutes. Remove from heat, throw in fresh bruised mint leaves, cover and steep for 4 minutes. Strain.',
    dosage: 'Drink warm after heavy meals or when experiencing acid reflux.',
    safety: 'People with severe GERD should consume warm, diluted mint infusions.'
  },
  {
    id: 'skin-acne-burns',
    title: 'Acne, Sunburns & Skin Blemishes',
    category: 'Skin Care',
    icon: '✨',
    plantId: 'Aloevera',
    remedyName: 'Aloe Vera & Neem Soothing Gel Pack',
    keyBenefit: 'Accelerates dermal tissue repair, eradicates acne bacteria, and cools inflamed skin.',
    ingredients: [
      'Fresh Aloe Vera translucent inner gel (2 tbsp)',
      'Fresh Neem leaf paste (1 tsp)',
      'Pure Turmeric powder (pinch)'
    ],
    recipe: 'Scrape fresh inner clear gel from a washed Aloe leaf (discard yellow sap). Blend with neem leaf paste and a pinch of turmeric until smooth.',
    dosage: 'Apply evenly on face or affected skin. Leave for 20 minutes, then rinse with cool water.',
    safety: 'Do not use outer rind. Perform a small wrist patch test prior to facial application.'
  },
  {
    id: 'cough-congestion',
    title: 'Bronchial Congestion & Sinusitis',
    category: 'Respiratory',
    icon: '🫁',
    plantId: 'Tulsi',
    remedyName: 'Sacred Tulsi & Ginger Respiratory Tea',
    keyBenefit: 'Eugenol and cineole liquefy phlegm, clear bronchospasms, and soothe raw throat tissues.',
    ingredients: [
      'Fresh Holy Basil (Tulsi) leaves (7-10)',
      'Crushed fresh Ginger root (1 inch)',
      'Clove (2 pods)',
      'Raw organic honey (1 tbsp)'
    ],
    recipe: 'Tear Tulsi leaves into 300ml boiling water along with crushed ginger and cloves. Boil for 4 minutes, strain into a cup, and stir in honey when lukewarm.',
    dosage: 'Drink warm 2-3 times daily during cough, cold, or throat irritation.',
    safety: 'Do not add raw honey into scalding boiling water (Ayurvedic guideline).'
  },
  {
    id: 'blood-sugar',
    title: 'Blood Sugar & Metabolic Balance',
    category: 'Metabolic',
    icon: '🩸',
    plantId: 'Fenugreek',
    remedyName: 'Overnight Methi (Fenugreek) Water',
    keyBenefit: '4-hydroxyisoleucine supports insulin sensitivity and slows digestive carbohydrate absorption.',
    ingredients: [
      'Organic Fenugreek (Methi) seeds (1 tbsp)',
      'Filtered room-temperature water (1 glass)'
    ],
    recipe: 'Soak Fenugreek seeds in water overnight (8 hours). In the morning, strain and drink the golden water on an empty stomach. You can also chew the softened seeds.',
    dosage: 'Take daily at sunrise.',
    safety: 'Monitor blood glucose if taking prescription diabetic medications to prevent hypoglycemia.'
  },
  {
    id: 'platelet-dengue',
    title: 'Platelet Boost & Dengue Recovery',
    category: 'Immunity',
    icon: '⚡',
    plantId: 'Papaya',
    remedyName: 'Fresh Papaya Leaf Bitter Extract',
    keyBenefit: 'Stimulates bone marrow thrombocyte production via upregulation of ALOX12 gene.',
    ingredients: [
      'Clean young Papaya leaves (2 medium leaves, veins removed)',
      'Boiled and cooled water (2 tbsp)'
    ],
    recipe: 'Wash leaves thoroughly with saline water. Cut away thick fibrous central stems. Crush leaf blades in mortar and pestle with 2 tbsp water. Squeeze extract through muslin cloth.',
    dosage: 'Take 25ml to 30ml twice daily under clinical supervision during platelet drops.',
    safety: 'Strictly prohibited during pregnancy. Bitter taste is intense; follow with a sip of water.'
  }
];

export const CATEGORIES = ['All', 'Hair & Scalp', 'Immunity', 'Cognitive', 'Digestion', 'Skin Care', 'Respiratory', 'Metabolic'];

export default function AilmentClinic({ onSelectPlant }) {
  const [selectedCat, setSelectedCat] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRemedy, setSelectedRemedy] = useState(AILMENTS_DATA[0]);

  const filteredRemedies = AILMENTS_DATA.filter((r) => {
    const matchesCat = selectedCat === 'All' || r.category === selectedCat;
    const q = searchQuery.toLowerCase();
    const matchesQuery = 
      !q || 
      r.title.toLowerCase().includes(q) ||
      r.remedyName.toLowerCase().includes(q) ||
      r.keyBenefit.toLowerCase().includes(q) ||
      r.plantId.toLowerCase().includes(q);
    return matchesCat && matchesQuery;
  });

  return (
    <div className="ailment-clinic-wrapper animate-fade-in">
      {/* Clinic Hero Banner */}
      <div className="clinic-hero-banner">
        <div className="clinic-hero-content">
          <div className="clinic-pill-badge">
            <HeartPulse size={14} color="#10B981" />
            <span>Ayurvedic Clinical Pharmacopeia</span>
          </div>
          <h2 className="clinic-main-title">
            Herbal Remedies & Ailment Clinic
          </h2>
          <p className="clinic-subtitle">
            Science-backed traditional Ayurvedic recipes, step-by-step home decoctions, and targeted herbal protocols for 8 major health categories.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="clinic-toolbar">
        <div className="clinic-search-box">
          <Search size={16} color="#6EE7B7" />
          <input
            type="text"
            placeholder="Search remedy by symptom (e.g. hair fall, sleep, fever, acidity)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="clinic-search-input"
          />
          {searchQuery && (
            <button className="clear-search-btn" onClick={() => setSearchQuery('')}>
              Clear
            </button>
          )}
        </div>

        <div className="clinic-category-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`category-pill ${selectedCat === cat ? 'active' : ''}`}
              onClick={() => { playClickTick(); setSelectedCat(cat); }}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Master/Detail Layout */}
      <div className="clinic-content-grid">
        {/* Remedy List Cards */}
        <div className="clinic-cards-list">
          {filteredRemedies.map((remedy) => {
            const isSelected = selectedRemedy?.id === remedy.id;
            const plant = PLANTS_DATABASE[remedy.plantId] || {};
            return (
              <div
                key={remedy.id}
                className={`remedy-card ${isSelected ? 'active-remedy' : ''}`}
                onClick={() => { playClickTick(); setSelectedRemedy(remedy); }}
              >
                <div className="remedy-card-header">
                  <span className="remedy-icon">{remedy.icon}</span>
                  <div>
                    <h3 className="remedy-title">{remedy.title}</h3>
                    <span className="remedy-plant-tag">Primary Herb: {plant.commonName || remedy.plantId}</span>
                  </div>
                </div>
                <p className="remedy-benefit-snippet">{remedy.keyBenefit}</p>
                <div className="remedy-card-footer">
                  <span className="remedy-category-badge">{remedy.category}</span>
                  <ArrowRight size={14} className="remedy-arrow" />
                </div>
              </div>
            );
          })}

          {filteredRemedies.length === 0 && (
            <div className="no-results-box">
              <p>No Ayurvedic remedies found matching your search term.</p>
            </div>
          )}
        </div>

        {/* Remedy Deep Protocol Dossier */}
        {selectedRemedy && (
          <div className="remedy-detail-pane">
            <div className="detail-pane-header">
              <div className="detail-header-text">
                <span className="detail-icon-large">{selectedRemedy.icon}</span>
                <div>
                  <h3 className="detail-remedy-title">{selectedRemedy.remedyName}</h3>
                  <span className="detail-target-ailment">Target: {selectedRemedy.title}</span>
                </div>
              </div>

              {onSelectPlant && (
                <button
                  type="button"
                  className="test-specimen-btn"
                  onClick={() => { playClickTick(); onSelectPlant(selectedRemedy.plantId); }}
                  title={`Test ${selectedRemedy.plantId} in Scanner`}
                >
                  <Sparkles size={14} />
                  <span>Test {selectedRemedy.plantId} in Scanner</span>
                </button>
              )}
            </div>

            <div className="detail-pane-body">
              {/* Key Therapeutic Benefit */}
              <div className="detail-block benefit-block">
                <div className="detail-block-heading">
                  <Sparkles size={15} color="#34D399" />
                  <h4>Therapeutic Mechanism</h4>
                </div>
                <p>{selectedRemedy.keyBenefit}</p>
              </div>

              {/* Ingredients */}
              <div className="detail-block ingredients-block">
                <div className="detail-block-heading">
                  <Pill size={15} color="#60A5FA" />
                  <h4>Required Herbal Ingredients</h4>
                </div>
                <ul className="ingredients-list">
                  {selectedRemedy.ingredients.map((ing, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={13} color="#34D399" />
                      <span>{ing}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Step-by-Step Recipe */}
              <div className="detail-block recipe-block">
                <div className="detail-block-heading">
                  <Flame size={15} color="#F59E0B" />
                  <h4>Preparation Protocol & Method</h4>
                </div>
                <p className="recipe-text">{selectedRemedy.recipe}</p>
              </div>

              {/* Dosage & Timing */}
              <div className="detail-block dosage-block">
                <div className="detail-block-heading">
                  <Droplets size={15} color="#2DD4BF" />
                  <h4>Dosage & Administration Timing</h4>
                </div>
                <p>{selectedRemedy.dosage}</p>
              </div>

              {/* Safety & Contraindications */}
              <div className="detail-block safety-block">
                <div className="detail-block-heading warning-title">
                  <ShieldAlert size={15} color="#F87171" />
                  <h4>Safety Advisory & Warnings</h4>
                </div>
                <p className="safety-text">{selectedRemedy.safety}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
