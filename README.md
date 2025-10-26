# Rejuvenation.AI - Your Personal AI Longevity Scientist

An interactive web application that simulates an AI-driven personalized anti-aging therapy platform. This hackathon MVP demonstrates how AI can optimize telomerase therapy for safe biological age reversal.

## 🚀 Features

### **Three Entry Pathways:**
1. **Clinical Upload** (95% confidence) - Upload lab results or manually enter biomarkers like telomere length, epigenetic age, inflammation markers
2. **Lifestyle Estimation** (75% confidence) - AI estimates biological age from exercise, sleep, stress, diet
3. **Sample Data** (instant demo) - Pre-loaded realistic patient profile for demonstrations

### **Core Features:**
- **Personalized Biological Age Calculation** - From actual biomarkers or lifestyle factors
- **Clinical Biomarker Analysis** - Detailed breakdown of 10+ key longevity markers with optimal ranges
- **AI-Optimized Protocol Generation** - Custom mRNA-based longevity protocol optimized for your profile
- **Interactive Visualizations** - Beautiful charts showing rejuvenation timeline and safety windows
- **Real-Time Adaptive Learning** - Simulates continuous protocol optimization
- **AI Longevity Scientist Chat** - Natural language interface powered by Claude API (optional)
- **Comprehensive Dashboard** - Eight detailed sections covering all aspects of personalized therapy

## 🛠️ Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS with custom gradients and glassmorphism
- **Charts**: Recharts for data visualizations
- **Animations**: Framer Motion for smooth transitions
- **AI**: Anthropic Claude API (optional integration)
- **Icons**: Lucide React

## 📦 Installation

1. Clone this repository
2. Install dependencies:
```bash
npm install
```

3. (Optional) Create a `.env` file and add your Anthropic API key for the chat feature:
```bash
VITE_ANTHROPIC_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
```

5. Open your browser to the URL shown (typically `http://localhost:5173`)

## 🎨 Design Highlights

- **Dark Mode First** - Beautiful gradient backgrounds with purple/cyan accent colors
- **Glassmorphism UI** - Modern frosted glass effects throughout
- **Smooth Animations** - Every interaction is polished with Framer Motion
- **Responsive Design** - Works perfectly on mobile, tablet, and desktop
- **Data Visualization** - Three major charts showing your aging trajectory and safety windows

## 📊 Dashboard Sections

1. **Cellular Biomarkers** (for clinical data) - Complete breakdown of all biomarkers with status indicators and AI analysis
2. **Cellular Age Map** - Hero section showing biological age metrics
3. **Rejuvenation Timeline** - 24-month projection comparing different interventions
4. **Personalized Formula** - Your custom mRNA protocol details
5. **Safety Visualization** - Cancer risk vs benefit optimization chart
6. **Adaptive Learning** - Real-time monitoring and protocol adjustments
7. **AI Scientist** - Latest research integration feed
8. **Metrics Summary** - Key performance indicators
9. **Chat Interface** - Ask your AI longevity scientist anything

## 🧪 How It Works

### **Clinical Pathway** (95% confidence):
Uses actual biomarker data to calculate biological age:
- **Telomere Length** - Primary aging indicator
- **Epigenetic Age** - DNA methylation patterns
- **Inflammation Markers** - CRP and immune function
- **Metabolic Health** - HbA1c, glucose, cholesterol
- **Mitochondrial Function** - DNA copy number

### **Lifestyle Pathway** (75% confidence):
Estimates biological age from lifestyle factors:
- Exercise frequency (-0.5 to +2 years)
- Sleep quality (-1 to +2 years)
- Stress level (0 to +1.5 years)
- Diet quality (-1 to +1.5 years)

The AI protocol then calculates an optimized biological age 3-9 years younger through simulated telomerase therapy, with better results from biomarker data.

## 🚢 Deployment

Deploy to Vercel for instant hosting:

```bash
npm run build
```

Then deploy the `dist` folder to Vercel, Netlify, or any static hosting service.

## 🔑 Environment Variables

- `VITE_ANTHROPIC_API_KEY` - (Optional) Your Anthropic API key for Claude integration

## 📝 Note

This is a demonstration/simulation of personalized longevity medicine. All results are calculated based on research but are not actual medical advice. Always consult healthcare professionals for real medical decisions.

## 🏆 Built for Hackathons

This MVP is designed to wow judges with:
- Immediate visual impact
- Deep personalization
- Scientific credibility
- Production-ready polish
- Interactive AI features


