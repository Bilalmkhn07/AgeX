import { motion } from 'framer-motion';
import { Target, TrendingDown } from 'lucide-react';
import type { CalculationResult } from '../utils/biologicalAgeCalculator';

interface BiomarkerImprovementsProps {
  result: CalculationResult;
}

export default function BiomarkerImprovements({ result }: BiomarkerImprovementsProps) {
  if (!result.biomarkerImprovements || result.biomarkerImprovements.length === 0) {
    return null;
  }

  const totalImpact = result.biomarkerImprovements.reduce(
    (sum, imp) => sum + imp.biologicalAgeImpact,
    0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.35 }}
      className="mb-12"
    >
      <div className="glass rounded-3xl p-8 md:p-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">How Your Protocol Targets Each Issue</h2>
            <p className="text-gray-400">Personalized biomarker optimization strategy</p>
          </div>
          <Target className="w-12 h-12 text-cyan-400" />
        </div>

        {/* Improvement Cards */}
        <div className="space-y-4 mb-6">
          {result.biomarkerImprovements.map((improvement, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="bg-gradient-to-r from-slate-800/50 to-slate-900/50 rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all"
            >
              <div className="grid md:grid-cols-4 gap-4 items-center">
                {/* Biomarker Name */}
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">BIOMARKER</div>
                  <div className="font-semibold text-white">{improvement.biomarker}</div>
                </div>

                {/* Current → Target */}
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">TRAJECTORY</div>
                  <div className="flex items-center space-x-2">
                    <span className="text-red-400 font-mono text-sm">{improvement.current}</span>
                    <TrendingDown className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-mono text-sm">{improvement.target}</span>
                  </div>
                  <div className="text-xs text-cyan-400 mt-1">{improvement.expectedGain}</div>
                </div>

                {/* Strategy */}
                <div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">STRATEGY</div>
                  <div className="text-sm text-gray-300">{improvement.strategy}</div>
                </div>

                {/* Biological Age Impact */}
                <div className="text-center md:text-right">
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">BIO AGE IMPACT</div>
                  <div className="text-2xl font-bold text-green-400">
                    -{improvement.biologicalAgeImpact.toFixed(1)} yrs
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-gradient-to-br from-green-900/40 to-cyan-900/40 border border-green-500/30 rounded-xl p-6"
        >
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-gray-400 mb-1">TOTAL EXPECTED REDUCTION</h4>
              <p className="text-gray-300 text-sm">
                Combined effect of targeted biomarker optimizations
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-green-400 mb-1">
                -{totalImpact.toFixed(1)} years
              </div>
              <div className="text-sm text-gray-400">
                Final: {result.biologicalAge.toFixed(1)} → {result.optimizedAge.toFixed(1)} years
              </div>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-white/10">
            <p className="text-sm text-gray-300">
              <span className="text-green-400 font-semibold">Outcome:</span> Brings you {
                result.optimizedAge < result.chronologicalAge 
                  ? `${(result.chronologicalAge - result.optimizedAge).toFixed(1)} years younger than`
                  : result.optimizedAge > result.chronologicalAge
                  ? `${(result.optimizedAge - result.chronologicalAge).toFixed(1)} years older than`
                  : 'back to'
              } your chronological age {
                result.optimizedAge <= result.chronologicalAge + 1
                  ? '(optimal outcome)'
                  : ''
              }
            </p>
          </div>
        </motion.div>

        {/* Why This Matters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-6 bg-purple-900/20 border border-purple-500/30 rounded-xl p-6"
        >
          <h4 className="text-lg font-semibold text-purple-300 mb-3">Why AI Optimization Delivers Superior Results</h4>
          <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-300">
            <div className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>Personalized dosing based on your exact biomarker profile</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>Real-time protocol adjustments as your body responds</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>Precision tissue targeting (your top needs vs. generic approach)</span>
            </div>
            <div className="flex items-start">
              <span className="text-green-400 mr-2">✓</span>
              <span>Optimal activation windows that standard protocols miss</span>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-400 italic">
            Standard protocols use fixed dosing schedules. Our AI adapts daily to your cellular response.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

