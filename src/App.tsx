import { useState } from 'react';
import LandingPageNew from './components/LandingPageNew';
import Dashboard from './components/Dashboard';
import { calculateFromBiomarkersWithAI } from './utils/biologicalAgeCalculator';
import type { BiomarkerData, CalculationResult } from './utils/biologicalAgeCalculator';

// You can set this via environment variable
const ANTHROPIC_API_KEY = import.meta.env.VITE_ANTHROPIC_API_KEY;

function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [result, setResult] = useState<CalculationResult | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleBiomarkerSubmit = async (age: number, biomarkers: BiomarkerData) => {
    setIsAnalyzing(true);
    try {
      // Use AI-powered analysis if API key is available
      const calculatedResult = await calculateFromBiomarkersWithAI(age, biomarkers, ANTHROPIC_API_KEY);
      setResult(calculatedResult);
      setCurrentView('dashboard');
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleReset = () => {
    setCurrentView('landing');
    setResult(null);
  };

  if (isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="mb-8">
            <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-cyan-400 mx-auto"></div>
          </div>
          <h2 className="text-3xl font-bold mb-3">AI Analyzing Your Biomarkers...</h2>
          <p className="text-gray-400 text-lg mb-2">
            {ANTHROPIC_API_KEY 
              ? '🤖 Using Claude AI to analyze your biological age based on scientific literature'
              : '📊 Calculating your biological age using research-based formulas'}
          </p>
          <p className="text-gray-500 text-sm">This may take 5-10 seconds</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentView === 'landing' ? (
        <LandingPageNew
          onBiomarkerSubmit={handleBiomarkerSubmit}
        />
      ) : result ? (
        <Dashboard result={result} onReset={handleReset} apiKey={ANTHROPIC_API_KEY} />
      ) : null}
    </>
  );
}

export default App;
