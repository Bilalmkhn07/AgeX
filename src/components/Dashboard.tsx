import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import type { CalculationResult } from '../utils/biologicalAgeCalculator';
import DashboardNav from './DashboardNav';
import BiomarkersSection from './BiomarkersSection';
import CellularAgeMap from './CellularAgeMap';
import ProtocolReversalBreakdown from './ProtocolReversalBreakdown';
import RejuvenationTimeline from './RejuvenationTimeline';
import PersonalizedFormula from './PersonalizedFormula';
import SafetyVisualization from './SafetyVisualization';
import AdaptiveLearning from './AdaptiveLearning';
import MetricsSummary from './MetricsSummary';
import ChatInterface from './ChatInterface';

interface DashboardProps {
  result: CalculationResult;
  onReset: () => void;
  apiKey?: string;
}

export default function Dashboard({ result, onReset, apiKey }: DashboardProps) {
  const [activeSection, setActiveSection] = useState('overview');
  
  // Refs for all sections
  const sectionRefs = {
    overview: useRef<HTMLDivElement>(null),
    biomarkers: useRef<HTMLDivElement>(null),
    'health-issues': useRef<HTMLDivElement>(null),
    'age-analysis': useRef<HTMLDivElement>(null),
    formula: useRef<HTMLDivElement>(null),
    timeline: useRef<HTMLDivElement>(null),
    'cancer-risk': useRef<HTMLDivElement>(null),
    adaptive: useRef<HTMLDivElement>(null),
  };

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const ref = sectionRefs[sectionId as keyof typeof sectionRefs];
    if (ref?.current) {
      const element = ref.current;
      const offset = 100; // Offset for header
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
    }
  };

  // Observe sections for active state
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const options = {
      root: null,
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0,
    };

    Object.entries(sectionRefs).forEach(([id, ref]) => {
      if (ref.current) {
        const observer = new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        }, options);
        
        observer.observe(ref.current);
        observers.push(observer);
      }
    });

    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-500 rounded-full opacity-20"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: 15 + Math.random() * 30,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      {/* Sidebar Navigation */}
      <DashboardNav 
        activeSection={activeSection}
        onSectionClick={scrollToSection}
        onReset={onReset}
      />

      {/* Main Content - Offset for sidebar */}
      <div className="relative z-10 ml-64">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="px-6 py-6 max-w-[1600px] mx-auto"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-6"
          >
            <h1 className="text-4xl font-bold mb-2">Your Personal Longevity Protocol</h1>
            <p className="text-lg text-gray-300 mb-2">
              AI-optimized results based on your unique biology
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {result.dataSource === 'sample' && (
                <div className="inline-flex items-center bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2">
                  <Info className="w-4 h-4 text-green-400 mr-2" />
                  <span className="text-sm text-green-400">Viewing sample patient data for demonstration</span>
                </div>
              )}
              {result.dataSource === 'lifestyle' && (
                <div className="inline-flex items-center bg-yellow-500/20 border border-yellow-500/30 rounded-full px-4 py-2">
                  <Info className="w-4 h-4 text-yellow-400 mr-2" />
                  <span className="text-sm text-yellow-400">{result.confidenceLevel}% confidence - Upload lab results for clinical-grade accuracy</span>
                </div>
              )}
              {(result as any).analysisMethod === 'ai-powered' && (
                <div className="inline-flex items-center bg-cyan-500/20 border border-cyan-500/30 rounded-full px-4 py-2">
                  <span className="text-sm font-semibold text-cyan-400">🤖 AI-Powered Analysis using Claude 4.5 Sonnet</span>
                </div>
              )}
              {(result as any).analysisMethod === 'formula-based' && (
                <div className="inline-flex items-center bg-blue-500/20 border border-blue-500/30 rounded-full px-4 py-2">
                  <span className="text-sm text-blue-400">📊 Formula-Based Analysis</span>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>

        {/* Dashboard Content - All sections with IDs */}
        <div className="px-6 pb-12 max-w-[1600px] mx-auto">
          
          {/* 📊 OVERVIEW SECTION */}
          <div ref={sectionRefs.overview} id="overview">
            <MetricsSummary result={result} />
          </div>

          {/* 🧬 YOUR BIOLOGY SECTION */}
          <div ref={sectionRefs.biomarkers} id="biomarkers">
            <BiomarkersSection result={result} />
          </div>

          <div ref={sectionRefs['health-issues']} id="health-issues">
            <ProtocolReversalBreakdown result={result} />
          </div>

          <div ref={sectionRefs['age-analysis']} id="age-analysis">
            <CellularAgeMap result={result} />
          </div>

          {/* 💊 YOUR PROTOCOL SECTION */}
          <div ref={sectionRefs.formula} id="formula">
            <PersonalizedFormula result={result} />
          </div>

          {/* 📈 RESULTS SECTION */}
          <div ref={sectionRefs.timeline} id="timeline">
            <RejuvenationTimeline result={result} />
          </div>

          {/* 🛡️ SAFETY & ADAPTIVE SECTION */}
          <div ref={sectionRefs['cancer-risk']} id="cancer-risk">
            <SafetyVisualization result={result} />
          </div>

          <div ref={sectionRefs.adaptive} id="adaptive">
            <AdaptiveLearning result={result} />
          </div>

        </div>

        {/* Chat Interface */}
        <ChatInterface result={result} apiKey={apiKey} />

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="px-6 pb-6 max-w-[1600px] mx-auto text-center text-gray-400 text-xs"
        >
          <p className="mb-1">
            This is a demonstration of AI-powered personalized longevity medicine.
          </p>
          <p>
            Results are simulated based on current research. Always consult healthcare professionals.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
