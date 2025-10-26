import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, FileUp } from 'lucide-react';
import BiomarkerForm from './BiomarkerForm';
import type { BiomarkerData } from '../utils/biologicalAgeCalculator';

interface LandingPageNewProps {
  onBiomarkerSubmit: (age: number, biomarkers: BiomarkerData) => void;
}

type PathwayType = null | 'clinical';

export default function LandingPageNew({
  onBiomarkerSubmit,
}: LandingPageNewProps) {
  const [selectedPathway, setSelectedPathway] = useState<PathwayType>(null);

  if (selectedPathway === 'clinical') {
    return <BiomarkerForm onSubmit={onBiomarkerSubmit} onBack={() => setSelectedPathway(null)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-500 rounded-full opacity-20"
            animate={{
              x: [Math.random() * window.innerWidth, Math.random() * window.innerWidth],
              y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight],
            }}
            transition={{
              duration: 10 + Math.random() * 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-12 h-12 text-purple-400 mr-3" />
            <h1 className="text-4xl md:text-5xl font-bold">AgeX</h1>
          </div>
          <p className="text-gray-400 text-lg">Your Personal AI Longevity Scientist</p>
        </motion.div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-16 max-w-4xl mx-auto"
        >
          <h2 className="text-4xl md:text-6xl font-bold mb-12 leading-tight space-y-4">
            <div className="text-red-400">Your body is 5 years older</div>
            <div className="text-red-400">than it should be.</div>
            <div className="mt-8 text-white">You'll die 7 years earlier</div>
            <div className="text-white">than you could.</div>
            <div className="mt-8 text-3xl md:text-5xl text-cyan-400">Unless you do this.</div>
          </h2>
          
          <div className="text-xl md:text-2xl text-gray-300 mb-8 space-y-3 leading-relaxed">
            <p className="font-semibold text-white">AI-designed mRNA protocols that reverse cellular aging.</p>
            <p className="text-purple-300">Not tomorrow. Not in 10 years. <span className="text-cyan-400 font-bold">Today.</span></p>
          </div>
          
          <div className="text-lg text-gray-400 mb-12">
            <p>The science exists. Most people just don't know.</p>
          </div>

          <div className="mt-12 pt-8 border-t border-white/10">
            <p className="text-sm text-purple-300 mb-4">
              Ready to begin? Upload your lab results:
            </p>
          </div>
        </motion.div>

        {/* Single Option - Lab Results */}
        <div className="max-w-md mx-auto mb-12">
          {/* Option A: Clinical Upload */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => setSelectedPathway('clinical')}
            className="glass rounded-2xl p-8 cursor-pointer hover:scale-105 hover:border-purple-500/50 transition-all border-2 border-white/10 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 bg-gradient-to-br from-purple-500 to-pink-500 text-xs font-bold px-3 py-1 rounded-bl-lg">
              CLINICAL GRADE
            </div>
            
            <div className="mb-6 mt-4">
              <FileUp className="w-16 h-16 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-2xl font-bold mb-2">I Have Lab Results</h3>
              <p className="text-gray-400 text-sm mb-4">
                Upload or manually enter your biomarkers
              </p>
            </div>

            <div className="bg-purple-900/30 rounded-lg p-4 text-sm text-gray-300">
              <p className="font-semibold mb-2">We extract:</p>
              <ul className="text-xs space-y-1">
                <li>• Telomere length</li>
                <li>• Epigenetic age</li>
                <li>• Complete blood count</li>
                <li>• Metabolic panel</li>
                <li>• Inflammation markers</li>
              </ul>
            </div>

            <div className="mt-4 text-center">
              <span className="inline-block bg-green-500/20 text-green-400 text-xs px-3 py-1 rounded-full">
                95% Confidence
              </span>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center text-gray-400 text-sm"
        >
          <p>Powered by advanced AI • Science-backed protocols • Safe and personalized</p>
        </motion.div>
      </div>
    </div>
  );
}

