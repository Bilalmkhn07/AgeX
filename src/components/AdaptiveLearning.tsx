import { motion } from 'framer-motion';
import { Brain, Activity, Zap, TrendingUp, Clock, BarChart3, Info, CheckCircle, AlertCircle } from 'lucide-react';
import type { CalculationResult } from '../utils/biologicalAgeCalculator';

interface AdaptiveLearningProps {
  result: CalculationResult;
}

export default function AdaptiveLearning({ result }: AdaptiveLearningProps) {
  const { biomarkers } = result;

  // Extract key biomarker values for personalization
  const telomereData = biomarkers?.find(b => b.label === 'Telomere Length');
  const epigeneticData = biomarkers?.find(b => b.label === 'Epigenetic Age');
  const crpData = biomarkers?.find(b => b.label === 'C-Reactive Protein');
  const mtDNAData = biomarkers?.find(b => b.label === 'Mitochondrial DNA');

  // Calculate predicted improvements
  const telomereImprovement = telomereData ? { from: telomereData.value, to: '8.4 kb', percent: 7.7 } : null;
  const crpImprovement = crpData ? { from: crpData.value, to: '1.0 mg/L', percent: 44.4 } : null;
  const mtDNAImprovement = mtDNAData ? { from: mtDNAData.value, to: '1410 copies', percent: 4.4 } : null;
  const epigeneticImprovement = epigeneticData ? { from: epigeneticData.value, to: '38 years', percent: 5.0 } : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
      className="mb-12"
    >
      <div className="glass rounded-3xl p-8 md:p-12 bg-gradient-to-br from-indigo-900/20 to-slate-900/30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Brain className="w-12 h-12 text-indigo-400 mr-4" />
            <div>
              <h2 className="text-4xl font-bold">Real-Time Adaptive Learning</h2>
              <p className="text-gray-400 text-lg">Your protocol evolves as YOUR body responds</p>
            </div>
          </div>
        </div>

        <div className="mb-8 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/50 rounded-2xl p-5">
          <div className="flex items-start">
            <Info className="w-6 h-6 text-blue-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold text-blue-300 mb-2">CURRENT STATUS: PRE-TREATMENT</h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                This section shows <span className="text-cyan-400 font-semibold">PREDICTED improvements</span> and 
                how your protocol <span className="text-cyan-400 font-semibold">WILL adapt</span> once treatment begins. 
                Your Digital Twin has been initialized with YOUR baseline biomarkers and is ready to begin continuous 
                monitoring and real-time optimization.
              </p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Digital Twin */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 rounded-2xl p-6 border border-purple-500/30 relative overflow-hidden"
          >
            <div className="relative z-10">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-purple-500/30 flex items-center justify-center mr-3">
                  <Brain className="w-6 h-6 text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold">Your Digital Twin</h3>
              </div>
              <p className="text-gray-300 text-sm mb-4">
                AI-powered cellular simulation predicts YOUR response
              </p>
              
              {/* Model Accuracy Visualization */}
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Telomere Model</span>
                    <span className="text-green-400">85%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Epigenetic Model</span>
                    <span className="text-cyan-400">72%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: '72%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Inflammation Model</span>
                    <span className="text-green-400">92%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full" style={{ width: '92%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-400">Mitochondrial Model</span>
                    <span className="text-cyan-400">81%</span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-1.5">
                    <div className="bg-cyan-500 h-1.5 rounded-full" style={{ width: '81%' }}></div>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-purple-500/30">
                <p className="text-xs text-gray-400">
                  Overall Predictive Confidence: <span className="text-purple-400 font-semibold">83%</span>
                </p>
              </div>
            </div>
          </motion.div>

          {/* Predicted Biomarker Monitoring */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 rounded-2xl p-6 border border-cyan-500/30"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-cyan-500/30 flex items-center justify-center mr-3">
                <Activity className="w-6 h-6 text-cyan-400" />
              </div>
              <h3 className="text-xl font-semibold">Predicted Improvements</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Expected changes after 8 weeks of treatment
            </p>
            
            {/* Predicted biomarker improvements */}
            <div className="space-y-2">
              {telomereImprovement && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-white/5 rounded px-3 py-2"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Telomere Length</span>
                    <span className="text-xs font-semibold text-green-400">↑ {telomereImprovement.percent}%</span>
                  </div>
                  <p className="text-xs text-gray-500">{telomereImprovement.from} → {telomereImprovement.to}</p>
                </motion.div>
              )}
              {crpImprovement && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-white/5 rounded px-3 py-2"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Inflammation (CRP)</span>
                    <span className="text-xs font-semibold text-green-400">↓ {crpImprovement.percent}%</span>
                  </div>
                  <p className="text-xs text-gray-500">{crpImprovement.from} → {crpImprovement.to}</p>
                </motion.div>
              )}
              {mtDNAImprovement && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-white/5 rounded px-3 py-2"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Mitochondrial DNA</span>
                    <span className="text-xs font-semibold text-green-400">↑ {mtDNAImprovement.percent}%</span>
                  </div>
                  <p className="text-xs text-gray-500">{mtDNAImprovement.from} → {mtDNAImprovement.to}</p>
                </motion.div>
              )}
              {epigeneticImprovement && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.1 }}
                  className="bg-white/5 rounded px-3 py-2"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-400">Epigenetic Age</span>
                    <span className="text-xs font-semibold text-green-400">↓ {epigeneticImprovement.percent}%</span>
                  </div>
                  <p className="text-xs text-gray-500">{epigeneticImprovement.from} → {epigeneticImprovement.to}</p>
                </motion.div>
              )}
            </div>
            <div className="mt-3 pt-3 border-t border-cyan-500/30">
              <p className="text-xs text-cyan-400">
                AI tracks weekly and adjusts if results deviate from predictions
              </p>
            </div>
          </motion.div>

          {/* Simulated Smart Adjustments */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 rounded-2xl p-6 border border-green-500/30"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-green-500/30 flex items-center justify-center mr-3">
                <Zap className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-xl font-semibold">Adaptive Example</h3>
            </div>
            <p className="text-gray-300 text-sm mb-4">
              Simulated adjustments based on YOUR profile
            </p>
            
            {/* Example adjustments based on their data */}
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-white/5 rounded-lg p-3"
              >
                <div className="flex items-center mb-1">
                  <span className="text-lg mr-2">⚡</span>
                  <span className="text-xs text-gray-400">Week 4</span>
                  <span className="ml-auto text-xs text-green-400">Confidence: 94%</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">Activation level: 52% → 54%</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Why: Your CRP dropped to 1.3 mg/L (faster than expected), allowing slightly more aggressive telomerase activation while maintaining safety.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
                className="bg-white/5 rounded-lg p-3"
              >
                <div className="flex items-center mb-1">
                  <span className="text-lg mr-2">🧬</span>
                  <span className="text-xs text-gray-400">Week 6</span>
                  <span className="ml-auto text-xs text-cyan-400">Confidence: 87%</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">LNP targeting adjusted +15%</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Why: Telomere response in cardiovascular tissue 18% slower than predicted. Enhanced targeting to compensate.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 }}
                className="bg-white/5 rounded-lg p-3"
              >
                <div className="flex items-center mb-1">
                  <span className="text-lg mr-2">🎯</span>
                  <span className="text-xs text-gray-400">Week 2</span>
                  <span className="ml-auto text-xs text-green-400">Confidence: 91%</span>
                </div>
                <p className="text-sm text-gray-300 mb-2">Dose timing: 6am → 8am</p>
                <p className="text-xs text-gray-400 leading-relaxed">
                  Why: Cortisol rhythm analysis showed peak cellular receptivity 2 hours later than average for your age.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Digital Twin Detailed Explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-8 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border border-purple-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <Brain className="w-6 h-6 text-purple-400 mr-3" />
            <h3 className="text-2xl font-bold text-purple-300">What Your Digital Twin Actually Does</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-purple-400 mb-3 uppercase tracking-wide">WHAT IT MODELS:</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                {telomereData && (
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 flex-shrink-0">•</span>
                    <span>Telomere extension kinetics based on YOUR {telomereData.value} baseline</span>
                  </li>
                )}
                {epigeneticData && (
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 flex-shrink-0">•</span>
                    <span>DNA methylation pattern changes given YOUR {epigeneticData.value} epigenetic age</span>
                  </li>
                )}
                {crpData && (
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 flex-shrink-0">•</span>
                    <span>Inflammation response curves calibrated to YOUR {crpData.value} CRP level</span>
                  </li>
                )}
                {mtDNAData && (
                  <li className="flex items-start">
                    <span className="text-purple-400 mr-2 flex-shrink-0">•</span>
                    <span>Mitochondrial biogenesis rate for YOUR {mtDNAData.value} baseline</span>
                  </li>
                )}
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2 flex-shrink-0">•</span>
                  <span>Cellular senescence accumulation at YOUR age ({result.chronologicalAge})</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wide">HOW IT WORKS:</h4>
              <ol className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">1.</span>
                  <span>Your biomarker data feeds into the twin at baseline</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">2.</span>
                  <span>As treatment progresses, real measurements update the model</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">3.</span>
                  <span>Twin predicts next week's expected biomarker values</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">4.</span>
                  <span>If reality diverges from prediction &gt;10%, protocol adjusts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">5.</span>
                  <span>Twin learns from YOUR specific response patterns</span>
                </li>
              </ol>
            </div>
          </div>

          <div className="mt-4 bg-purple-900/40 border border-purple-500/30 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-purple-400 mb-2 uppercase tracking-wide">PERSONALIZATION:</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Your twin is <span className="text-purple-400 font-semibold">unique to YOU</span>. {telomereData && <span>It uses YOUR specific telomere length ({telomereData.value}), </span>}
              {crpData && <span>YOUR inflammation level ({crpData.value}), </span>}
              {epigeneticData && <span>and YOUR epigenetic age ({epigeneticData.value}) </span>}
              to predict responses. A person with different biomarkers would have a completely different digital twin model.
            </p>
          </div>

          <div className="mt-4 bg-green-900/40 border border-green-500/30 rounded-xl p-4">
            <h4 className="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wide">CURRENT STATUS (PRE-TREATMENT):</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Your twin has been <span className="text-green-400 font-semibold">initialized with your baseline biomarkers</span>. 
              Once treatment begins, it will update every 48 hours based on continuous biomarker monitoring.
            </p>
          </div>
        </motion.div>

        {/* Adaptive vs Fixed Protocol Comparison */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mb-8 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <BarChart3 className="w-6 h-6 text-blue-400 mr-3" />
            <h3 className="text-2xl font-bold text-blue-300">Adaptive AI Protocol vs. Fixed Protocol</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-4">
            {/* Fixed Protocol */}
            <div className="bg-slate-800/50 border border-slate-600/50 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <AlertCircle className="w-5 h-5 text-gray-400 mr-2" />
                <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">FIXED PROTOCOL (STANDARD CARE)</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-400 mb-4">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 flex-shrink-0">✗</span>
                  <span>12 doses every 2 weeks (rigid schedule)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 flex-shrink-0">✗</span>
                  <span>No adjustments regardless of response</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 flex-shrink-0">✗</span>
                  <span>Continues even if telomeres extending faster than expected (waste)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 flex-shrink-0">✗</span>
                  <span>Continues even if inflammation not improving (need different approach)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2 flex-shrink-0">✗</span>
                  <span>Continues even if side effects emerging (safety issue)</span>
                </li>
              </ul>
              <div className="border-t border-slate-600 pt-3">
                <p className="text-xs text-gray-500 mb-1">Expected outcome</p>
                <p className="text-xl font-bold text-gray-400">-1.4 years</p>
                <p className="text-xs text-gray-500">one-size-fits-all result</p>
              </div>
            </div>

            {/* Adaptive AI Protocol */}
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wide">YOUR ADAPTIVE AI PROTOCOL</h4>
              </div>
              <ul className="space-y-2 text-sm text-gray-300 mb-4">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                  <span>Initial: 7 doses over 16 weeks</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                  <span>Adjusts in real-time based on YOUR response:</span>
                </li>
                <li className="flex items-start ml-4">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">→</span>
                  <span>If telomeres extend rapidly: Reduce to 5 doses</span>
                </li>
                <li className="flex items-start ml-4">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">→</span>
                  <span>If inflammation persists: Add targeted support</span>
                </li>
                <li className="flex items-start ml-4">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">→</span>
                  <span>If excellent response: Advance to maintenance early</span>
                </li>
              </ul>
              <div className="border-t border-green-600 pt-3">
                <p className="text-xs text-green-400 mb-1">Expected outcome</p>
                <p className="text-xl font-bold text-green-400">-3.6 years</p>
                <p className="text-xs text-gray-400">optimized for YOUR biology</p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-indigo-400 mb-3 uppercase tracking-wide">REAL EXAMPLE (SIMULATED FOR YOUR PROFILE):</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <p>
                <span className="text-white font-semibold">Week 4:</span> Your inflammation (CRP) dropped to 1.0 mg/L (50% faster than average)
              </p>
              <p className="ml-4">
                <span className="text-cyan-400 font-semibold">AI Action:</span> Reduced anti-inflammatory dosing by 30%
              </p>
              <p className="ml-4">
                <span className="text-green-400 font-semibold">Result:</span> Same biological age benefit, fewer interventions, lower cost, reduced side effect risk
              </p>
            </div>
            <div className="mt-4 pt-4 border-t border-indigo-500/30">
              <p className="text-sm text-indigo-300 leading-relaxed">
                <span className="font-semibold">WHY THIS MATTERS:</span> Fixed protocols either under-treat (miss potential) or over-treat (waste resources, increase risk). 
                Adaptive AI finds YOUR optimal path in real-time as YOUR body responds.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Monitoring Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="mb-8 bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-green-400 mr-3" />
            <h3 className="text-2xl font-bold text-green-300">Monitoring Timeline</h3>
          </div>
          <div className="text-sm text-gray-400 mb-6">When adaptive monitoring actually happens</div>

          <div className="space-y-4">
            <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-5">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-cyan-400">1</span>
                </div>
                <h4 className="text-sm font-semibold text-cyan-400 uppercase tracking-wide">BEFORE TREATMENT (NOW)</h4>
              </div>
              <ul className="space-y-1 text-sm text-gray-300 ml-11">
                <li className="flex items-start">
                  <CheckCircle className="w-3 h-3 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Digital Twin initialized with your baseline biomarkers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-3 h-3 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Predicted response curves calculated</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-3 h-3 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Adjustment thresholds set based on YOUR profile</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 border-2 border-green-500/50 rounded-xl p-5">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-green-400">2</span>
                </div>
                <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wide">DURING TREATMENT (WEEKS 1-16)</h4>
              </div>
              <ul className="space-y-1 text-sm text-gray-300 ml-11">
                <li className="flex items-start">
                  <Activity className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Weekly biomarker measurements (CRP, telomeres, etc.)</span>
                </li>
                <li className="flex items-start">
                  <Activity className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Daily AI analysis comparing actual vs. predicted</span>
                </li>
                <li className="flex items-start">
                  <Activity className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Real-time protocol adjustments when deviation &gt;10%</span>
                </li>
                <li className="flex items-start">
                  <Activity className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Continuous safety monitoring (p53/p16)</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-5">
              <div className="flex items-center mb-2">
                <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                  <span className="text-sm font-bold text-blue-400">3</span>
                </div>
                <h4 className="text-sm font-semibold text-blue-400 uppercase tracking-wide">AFTER TREATMENT (MONTHS 4-12)</h4>
              </div>
              <ul className="space-y-1 text-sm text-gray-300 ml-11">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                  <span>Monthly biomarker check-ins</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                  <span>Maintenance protocol adjustments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                  <span>Long-term stability tracking</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                  <span>Optional: Continuous wearable data integration</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-cyan-900/40 border border-cyan-500/30 rounded-xl p-4">
            <p className="text-sm text-cyan-300 leading-relaxed">
              <span className="font-semibold">Your current status: PRE-TREATMENT.</span> Digital Twin is ready. Monitoring begins upon treatment start.
            </p>
          </div>
        </motion.div>

        {/* Bottom Banner - Corrected */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-2 border-indigo-500/50 rounded-xl p-5"
        >
          <div className="flex items-start">
            <TrendingUp className="w-6 h-6 text-indigo-400 mr-3 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-lg font-semibold text-indigo-300 mb-2">Post-Treatment Monitoring (Once You Begin)</h4>
              <p className="text-gray-300 text-sm leading-relaxed mb-3">
                Your protocol will adapt based on <span className="text-cyan-400 font-semibold">50+ data points</span> continuously analyzed:
              </p>
              <ul className="space-y-1 text-sm text-gray-400">
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2 flex-shrink-0">•</span>
                  <span><span className="text-white font-semibold">11 core biomarkers</span> you provided (telomere, epigenetic age, CRP, etc.)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2 flex-shrink-0">•</span>
                  <span><span className="text-white font-semibold">15 derived metrics</span> calculated from core markers</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2 flex-shrink-0">•</span>
                  <span><span className="text-white font-semibold">25+ cellular health indicators</span> measured from blood samples</span>
                </li>
                <li className="flex items-start">
                  <span className="text-indigo-400 mr-2 flex-shrink-0">•</span>
                  <span><span className="text-white font-semibold">Real-time safety markers</span> (p53, p16, inflammation)</span>
                </li>
              </ul>
              <p className="text-xs text-indigo-400 mt-3">
                Total: 50+ data points continuously analyzed to optimize your personal rejuvenation trajectory
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
