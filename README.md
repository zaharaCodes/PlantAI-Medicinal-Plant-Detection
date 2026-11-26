# PlantAI: Medicinal Species Identification & Neural Classification System (v3.0)

An end-to-end full-stack deep learning web application designed to classify **25 distinct medicinal plant species** from leaf images (including Google Images, wild photography, and live webcams), providing real-time identification alongside foliar health diagnostics, Ayurvedic Tridosha energetics, preparation methods, and an interactive Herbalist AI assistant.

---

## 🌿 Key Capabilities

### 1. 25-Species Deep Learning Classification Engine
* **Expanded Botanical Taxonomy (25 Classes):**
  * *Aloe Vera*, *Amruthaballi (Giloy)*, *Ashwagandha*, *Bamboo*, *Betel Leaf (Paan)*, *Brahmi*, *Bringaraja*, *Coriander*, *Curry Leaf*, *Eucalyptus*, *Fenugreek*, *Ginger*, *Guava Leaf*, *Henna*, *Hibiscus*, *Lemongrass*, *Mint*, *Moringa*, *Neem*, *Onion*, *Palak (Spinach)*, *Papaya*, *Tamarind*, *Tulsi (Holy Basil)*, *Turmeric*.
* **Aspect-Ratio Preserving Letterboxing:** Eliminates image squashing on arbitrary Google Images and camera aspect ratios, preserving true venation angles and leaf margin geometry.
* **Test-Time Augmentation (TTA):** Ensembles predictions across original, horizontal flips, and rotations to deliver high real-world accuracy on internet photos.
* **Top-3 Neural Candidates:** Displays the full confidence distribution of top matches.

### 2. Foliar Health & Vitality Diagnostics
* Analyzes cellular vitality, chlorophyll reflectance index (ExG), chlorosis (solar bleaching / nutrient yellowing), and necrotic lesion spotting.

### 3. Ayurvedic Tridosha & Phytochemical Profiler
* Visualizes balance across **Vata** (Air), **Pitta** (Fire), and **Kapha** (Earth).
* Details key bioactive chemical principles (Curcumin, Bacosides, Withanolides, Eugenol, Nimbin, etc.) and leaf morphometrics (Apex, Margin, Venation).

### 4. Cyber-Botanical UI & Interactive Animations
* **60fps Floating Botanical Foliage Canvas:** Drifting leaves with organic wind sway and bioluminescent spores with mouse cursor disturbance.
* **Interactive Living Mascot:** Vector SVG living plant with organic breathing, dewdrop reflections, and interactive nurture clicks.
* **3D Holographic Perspective Tilt:** Dynamic card tilt reacting to mouse position with prismatic sheen.
* **Synthesized Web Audio FX:** Tactile clicks, radar sweep frequency sweeps, and crystal chord success chimes.
* **Botanical Herbalist AI Chat Drawer:** Conversational Q&A on dosages, tea brewing protocols, and contraindications.
* **Live Botanical Viewfinder:** Web/mobile camera integration with leaf alignment HUD.
* **10 Instant Testing Samples:** One-click testing cards with high-res photography.

---

## 🛠️ Tech Stack
* **Machine Learning:** Python, TensorFlow, Keras, MobileNetV2, NumPy, Pillow
* **Backend:** Flask, Flask-CORS
* **Frontend:** React 19, Vite, Axios, Lucide Icons, HTML5 Canvas Foliage Engine, Web Audio API, Web Speech API

---

## 🚀 Running the Project

### 1. Start the Flask Backend Server
```bash
python app.py
```
Backend will serve predictions on `http://127.0.0.1:5000`.

### 2. Start the Frontend Development Server
```bash
cd frontend
npm run dev
```
Open `http://localhost:5173` in your browser.
