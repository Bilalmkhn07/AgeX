import { motion } from 'framer-motion';
import { TrendingDown, Calendar, Heart, Zap, AlertCircle, Clock, CheckCircle, Activity, Brain, Shield } from 'lucide-react';
import type { CalculationResult } from '../utils/biologicalAgeCalculator';

interface CellularAgeMapProps {
  result: CalculationResult;
}

export default function CellularAgeMap({ result }: CellularAgeMapProps) {
  const { chronologicalAge, biologicalAge, optimizedAge, healthspanGain } = result;
  
  const ageDifference = biologicalAge - chronologicalAge;
  const improvement = biologicalAge - optimizedAge;
  const reversalPercentage = ((improvement / Math.abs(ageDifference)) * 100).toFixed(0);
  const agingRate = 1 + (ageDifference / chronologicalAge);
  const optimizedDifference = optimizedAge - chronologicalAge;
  
  // Calculate when they'd reach "age 50 biology"
  const yearsToAge50Current = (50 - biologicalAge) / agingRate;
  const yearsToAge50Optimized = 50 - optimizedAge;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <div className="glass rounded-3xl p-8 md:p-12 bg-gradient-to-br from-purple-900/30 to-slate-900/30">
        <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
          Your Cellular Age Map
        </h2>

        {/* Main Metrics Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Current Biological Age */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-2xl p-6 border border-red-500/30"
          >
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 text-red-400 mr-2" />
              <span className="text-sm text-gray-300">Current Biological Age</span>
            </div>
            <div className="text-5xl font-bold text-red-400 mb-1">{biologicalAge}</div>
            <div className="text-xs text-gray-400">
              {ageDifference > 0 ? `+${ageDifference.toFixed(1)} years older` : `${Math.abs(ageDifference).toFixed(1)} years younger`}
            </div>
          </motion.div>

          {/* Chronological Age */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/5 rounded-2xl p-6 border border-white/10"
          >
            <div className="flex items-center mb-2">
              <Calendar className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-sm text-gray-300">Chronological Age</span>
            </div>
            <div className="text-5xl font-bold text-white mb-1">{chronologicalAge}</div>
            <div className="text-xs text-gray-400">Your actual age</div>
          </motion.div>

          {/* Optimized Biological Age */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-2xl p-6 border border-green-500/30"
          >
            <div className="flex items-center mb-2">
              <Heart className="w-5 h-5 text-green-400 mr-2" />
              <span className="text-sm text-gray-300">Optimized Age (12mo)</span>
            </div>
            <div className="text-5xl font-bold text-green-400 mb-1">{optimizedAge}</div>
            <div className="text-xs text-green-400 font-semibold">
              -{improvement.toFixed(1)} years younger
            </div>
          </motion.div>

          {/* Healthspan Extension */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 border border-purple-500/30"
          >
            <div className="flex items-center mb-2">
              <Zap className="w-5 h-5 text-purple-400 mr-2" />
              <span className="text-sm text-gray-300">Healthspan Extension</span>
            </div>
            <div className="text-5xl font-bold text-purple-400 mb-1">+{healthspanGain.toFixed(1)}</div>
            <div className="text-xs text-gray-400">quality years gained</div>
          </motion.div>
        </div>

        {/* Emotional Context Sections */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Current State Context */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-red-900/20 border border-red-500/30 rounded-xl p-6"
          >
            <div className="flex items-start mb-3">
              <AlertCircle className="w-6 h-6 text-red-400 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-red-300 mb-2">What Your Current Age Means</h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  Your body is aging <span className="text-red-400 font-semibold">{((agingRate - 1) * 100).toFixed(1)}% faster</span> than normal. 
                  At this rate, you'll reach "age 50 biology" when you're only <span className="text-red-400 font-semibold">{(chronologicalAge + yearsToAge50Current).toFixed(1)} years old</span>.
                </p>
                <div className="flex items-center text-xs text-gray-400">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>Aging rate: {agingRate.toFixed(2)}× normal</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Optimized State Context */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-green-900/20 border border-green-500/30 rounded-xl p-6"
          >
            <div className="flex items-start mb-3">
              <CheckCircle className="w-6 h-6 text-green-400 mr-3 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-lg font-bold text-green-300 mb-2">What Your Optimized Age Means</h3>
                <p className="text-sm text-gray-300 leading-relaxed mb-3">
                  Your body will be biologically <span className="text-green-400 font-semibold">{Math.abs(optimizedDifference).toFixed(1)} years {optimizedDifference > 0 ? 'older' : 'younger'}</span> than your actual age - 
                  the cellular health of someone age {optimizedAge.toFixed(1)}. You'll delay "age 50 biology" until you're actually <span className="text-green-400 font-semibold">{yearsToAge50Optimized.toFixed(1)} years old</span>.
                </p>
                <div className="flex items-center text-xs text-green-400">
                  <TrendingDown className="w-4 h-4 mr-1" />
                  <span>{reversalPercentage}% biological age reversal</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Visual Timeline with Milestones */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-8 bg-slate-800/50 rounded-xl p-6"
        >
          <div className="text-center text-lg font-semibold text-gray-300 mb-6">Your Age Reversal Journey</div>
          
          {/* Current State */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-400">Current State</span>
              <span className="text-red-400 font-semibold">Biological Age: {biologicalAge}</span>
            </div>
            <div className="relative h-10 bg-slate-900 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(biologicalAge / 60) * 100}%` }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-full bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-end pr-4"
              >
                <span className="text-sm font-bold text-white">{biologicalAge}</span>
              </motion.div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-500">
                You are here
              </div>
            </div>
          </div>

          {/* Optimized State */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between text-sm mb-1">
              <span className="text-gray-400">After AI Protocol (12 months)</span>
              <span className="text-green-400 font-semibold">Biological Age: {optimizedAge}</span>
            </div>
            <div className="relative h-10 bg-slate-900 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(optimizedAge / 60) * 100}%` }}
                transition={{ duration: 1, delay: 1 }}
                className="h-full bg-gradient-to-r from-green-500 to-cyan-500 flex items-center justify-end pr-4"
              >
                <span className="text-sm font-bold text-white">{optimizedAge}</span>
              </motion.div>
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-green-400">
                Target in 12 months
              </div>
            </div>
          </div>

          {/* Timeline Milestones */}
          <div className="grid grid-cols-5 gap-2 text-xs text-center mt-6">
            <div className="space-y-1">
              <div className="font-semibold text-purple-400">Month 0</div>
              <div className="text-gray-500">Protocol Start</div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-purple-400">Month 3</div>
              <div className="text-gray-500">Phase 1 Complete</div>
              <div className="text-gray-600">Early cellular changes</div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-cyan-400">Month 6</div>
              <div className="text-gray-500">Peak Reversal</div>
              <div className="text-gray-600">Max telomere extension</div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-green-400">Month 9</div>
              <div className="text-gray-500">Stabilization</div>
              <div className="text-gray-600">Methylation normalized</div>
            </div>
            <div className="space-y-1">
              <div className="font-semibold text-green-400">Month 12</div>
              <div className="text-gray-500">Maintenance Phase</div>
              <div className="text-gray-600">Sustained benefits</div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-center space-x-4 text-sm">
            <div className="text-gray-400">
              Your trajectory: <span className="text-green-400 font-semibold">-{improvement.toFixed(1)} years biological age reversal</span>
            </div>
            <div className="text-gray-500">|</div>
            <div className="text-gray-400">
              Natural aging: <span className="text-gray-500">+1.0 year chronological</span>
            </div>
            <div className="text-gray-500">|</div>
            <div className="text-gray-400">
              Net result: <span className="text-cyan-400 font-semibold">{(improvement - 1).toFixed(1)} years younger</span>
            </div>
          </div>
        </motion.div>

        {/* Comparison to Alternatives */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-8 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-xl p-6"
        >
          <h3 className="text-xl font-bold text-blue-300 mb-4">Comparison: Your Outcome vs. Alternatives</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            {/* No Intervention */}
            <div className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-4">
              <div className="text-sm font-semibold text-gray-400 mb-2">NO INTERVENTION</div>
              <div className="text-2xl font-bold text-gray-400 mb-2">{(biologicalAge + 1.4).toFixed(1)} years</div>
              <div className="text-xs text-gray-500 mb-3">biological age in 12 months</div>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• Continue aging at {agingRate.toFixed(2)}× normal rate</li>
                <li>• Gap increases to +{(ageDifference + 1.4).toFixed(1)} years</li>
              </ul>
            </div>

            {/* Standard Therapy */}
            <div className="bg-slate-800/50 border border-slate-600/50 rounded-lg p-4">
              <div className="text-sm font-semibold text-yellow-400 mb-2">STANDARD TELOMERASE THERAPY</div>
              <div className="text-2xl font-bold text-yellow-400 mb-2">{(biologicalAge - 1.4).toFixed(1)} years</div>
              <div className="text-xs text-gray-500 mb-3">biological age in 12 months</div>
              <ul className="space-y-1 text-xs text-gray-400">
                <li>• One-size-fits-all protocol</li>
                <li>• Improvement: -1.4 years (28% reversal)</li>
              </ul>
            </div>

            {/* AI-Optimized */}
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-lg p-4">
              <div className="text-sm font-semibold text-green-300 mb-2 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                YOUR AI-OPTIMIZED PROTOCOL
              </div>
              <div className="text-2xl font-bold text-green-400 mb-2">{optimizedAge} years</div>
              <div className="text-xs text-green-400 mb-3">biological age in 12 months</div>
              <ul className="space-y-1 text-xs text-gray-300">
                <li>• Personalized multi-pathway targeting</li>
                <li>• Improvement: -{improvement.toFixed(1)} years ({reversalPercentage}% reversal)</li>
              </ul>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-blue-500/30 text-center">
            <div className="text-lg font-semibold text-blue-200 mb-1">AI Advantage</div>
            <div className="text-3xl font-bold text-green-400">
              {(improvement / 1.4).toFixed(1)}× better than standard therapy
            </div>
            <div className="text-sm text-gray-400 mt-2">
              {(improvement - 1.4).toFixed(1)} additional years of biological age reversal through AI optimization
            </div>
          </div>
        </motion.div>

        {/* Why Not Full Reversal */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mb-8 bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6"
        >
          <div className="flex items-start">
            <AlertCircle className="w-6 h-6 text-yellow-400 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="text-lg font-bold text-yellow-300 mb-3">
                Why {optimizedAge.toFixed(1)} and Not Full Reversal to {chronologicalAge}?
              </h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-3">
                Remaining gap of <span className="text-yellow-400 font-semibold">{Math.abs(optimizedDifference).toFixed(1)} years</span> represents:
              </p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span><span className="font-semibold">Minor lipid variations</span> (HDL/LDL) best addressed through lifestyle optimization rather than aggressive pharmaceutical intervention</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span><span className="font-semibold">Baseline epigenetic variation</span> - some people naturally age slightly faster/slower (1-2 years is normal range)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-yellow-400 mr-2">•</span>
                  <span><span className="font-semibold">Conservative safety margin</span> - our AI prioritizes long-term safety over maximum short-term reversal</span>
                </li>
              </ul>
              <div className="mt-4 pt-4 border-t border-yellow-500/20">
                <p className="text-sm text-yellow-300 italic">
                  This balanced approach delivers <span className="font-bold">{reversalPercentage}% biological age reversal</span> with <span className="font-bold">{result.metrics.safetyWindowConfidence}% safety confidence</span> - the optimal risk/benefit ratio for your biomarker profile.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Personal Impact Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-xl p-6"
        >
          <h3 className="text-2xl font-bold text-purple-300 mb-4 text-center">
            What {improvement.toFixed(1)} Years of Biological Age Reversal Means for You
          </h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Cardiovascular */}
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Heart className="w-5 h-5 text-red-400 mr-2" />
                  <h4 className="font-semibold text-red-300">CARDIOVASCULAR SYSTEM</h4>
                </div>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• ~{Math.round(improvement * 3)}% reduced risk of heart disease</li>
                  <li>• Blood pressure & arterial elasticity of age {(optimizedAge - 3).toFixed(0)}</li>
                  <li>• Equivalent to {Math.round(improvement * 1.1)} years of optimal diet & exercise</li>
                </ul>
              </div>

              {/* Cognitive */}
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Brain className="w-5 h-5 text-purple-400 mr-2" />
                  <h4 className="font-semibold text-purple-300">COGNITIVE PERFORMANCE</h4>
                </div>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Memory & processing speed of age {(optimizedAge - 2).toFixed(0)}</li>
                  <li>• Preserve peak cognitive function {Math.round(improvement)} years longer</li>
                  <li>• Reduced age-related cognitive decline</li>
                </ul>
              </div>

              {/* Physical */}
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Activity className="w-5 h-5 text-cyan-400 mr-2" />
                  <h4 className="font-semibold text-cyan-300">PHYSICAL CAPACITY</h4>
                </div>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Energy, recovery & endurance improvement</li>
                  <li>• Train and perform like your {(optimizedAge - 1).toFixed(0)}-year-old self</li>
                  <li>• Faster injury recovery</li>
                </ul>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Immune */}
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Shield className="w-5 h-5 text-green-400 mr-2" />
                  <h4 className="font-semibold text-green-300">IMMUNE FUNCTION</h4>
                </div>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• ~{Math.round(improvement * 5)}% stronger response to infections & vaccines</li>
                  <li>• More resilient immune system</li>
                  <li>• Reduced inflammation-related disease risk</li>
                </ul>
              </div>

              {/* Longevity */}
              <div className="bg-slate-800/50 rounded-lg p-4">
                <div className="flex items-center mb-2">
                  <Zap className="w-5 h-5 text-yellow-400 mr-2" />
                  <h4 className="font-semibold text-yellow-300">LONGEVITY PROJECTION</h4>
                </div>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• {Math.round(improvement)}-{Math.round(improvement + 1)} additional healthy years expected</li>
                  <li>• Delay age-related decline by {improvement.toFixed(1)} years</li>
                  <li>• Healthspan extended, not just lifespan</li>
                </ul>
              </div>

              {/* Summary */}
              <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 border border-green-500/30 rounded-lg p-4">
                <p className="text-sm text-gray-300 leading-relaxed italic">
                  <span className="text-green-400 font-semibold">This protocol doesn't just change numbers on a dashboard</span> - 
                  it changes how you feel, perform, and age every single day.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
