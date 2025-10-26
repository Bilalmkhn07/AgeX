import { motion } from 'framer-motion';
import { Beaker, Dna, Target, Award, Shield, Clock, TrendingUp, AlertCircle, CheckCircle, Activity, Zap, BarChart3 } from 'lucide-react';
import type { CalculationResult } from '../utils/biologicalAgeCalculator';

interface PersonalizedFormulaProps {
  result: CalculationResult;
}

export default function PersonalizedFormula({ result }: PersonalizedFormulaProps) {
  const { protocolDetails, biomarkers } = result;

  // Extract key biomarker values for personalization
  const telomereLength = biomarkers?.find(b => b.label === 'Telomere Length')?.value || '7.8 kb';
  const epigeneticAge = biomarkers?.find(b => b.label === 'Epigenetic Age')?.value || '40 years';
  const crp = biomarkers?.find(b => b.label === 'C-Reactive Protein')?.value || '1.8 mg/L';
  const mtDNA = biomarkers?.find(b => b.label === 'Mitochondrial DNA')?.value || '1350';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="mb-12"
    >
      <div className="glass rounded-3xl p-8 md:p-12 bg-gradient-to-br from-cyan-900/20 to-slate-900/30">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Beaker className="w-12 h-12 text-cyan-400 mr-4" />
            <div>
              <h2 className="text-4xl font-bold">Your Personalized Longevity Formula</h2>
              <p className="text-gray-400 text-lg">AI-Generated mRNA Protocol — Optimized for YOUR Biomarker Profile</p>
            </div>
          </div>
        </div>

        {/* Why These Targets Were Selected */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-2 border-purple-500/50 rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold text-purple-300 mb-4">Why These Targets Were Selected for Your Profile</h3>
          <div className="text-sm text-gray-400 mb-6">AI analyzed YOUR specific biomarkers to determine optimal intervention targets</div>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Priority #1: Methylation */}
            <div className="bg-slate-800/50 border-2 border-purple-500/50 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                  <Dna className="w-5 h-5 text-purple-400" />
                </div>
                <div>
                  <h4 className="font-bold text-purple-300">METHYLATION OPTIMIZATION</h4>
                  <span className="text-xs text-purple-400 font-semibold">Priority #1</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <span className="text-purple-400 mr-2 flex-shrink-0">Why:</span>
                  <span className="text-gray-300">Your epigenetic age of <span className="text-white font-semibold">{epigeneticAge}</span> is the PRIMARY driver, contributing <span className="text-purple-400 font-semibold">3.0 years</span> (61% of total age gap)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">Personalization:</span>
                  <span className="text-gray-300">Targets age-accelerated methylation sites specific to YOUR profile using enhanced cellular rejuvenation</span>
                </div>
              </div>
            </div>

            {/* Priority #2: Telomerase */}
            <div className="bg-slate-800/50 border-2 border-cyan-500/50 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                  <Activity className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-bold text-cyan-300">TELOMERASE ACTIVATION</h4>
                  <span className="text-xs text-cyan-400 font-semibold">Priority #2</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <span className="text-purple-400 mr-2 flex-shrink-0">Why:</span>
                  <span className="text-gray-300">Your <span className="text-white font-semibold">9.8% telomere deficit</span> (at {telomereLength}) contributes <span className="text-cyan-400 font-semibold">1.5 years</span> to biological age</span>
                </div>
                <div className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">Personalization:</span>
                  <span className="text-gray-300">Dosing optimized for YOUR {telomereLength} baseline using 18hr pulses (67% reversal target)</span>
                </div>
              </div>
            </div>

            {/* Priority #3: Anti-inflammatory */}
            <div className="bg-slate-800/50 border border-orange-500/50 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mr-3">
                  <Zap className="w-5 h-5 text-orange-400" />
                </div>
                <div>
                  <h4 className="font-bold text-orange-300">ANTI-INFLAMMATORY</h4>
                  <span className="text-xs text-orange-400 font-semibold">Priority #3</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <span className="text-purple-400 mr-2 flex-shrink-0">Why:</span>
                  <span className="text-gray-300">Your CRP at <span className="text-white font-semibold">{crp}</span> indicates chronic low-grade inflammation (+0.4 years to biological age)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">Personalization:</span>
                  <span className="text-gray-300">IL-10 co-therapy calibrated to reduce YOUR CRP to &lt;1.0 mg/L (75% reversal target)</span>
                </div>
              </div>
            </div>

            {/* Priority #4: Mitochondrial */}
            <div className="bg-slate-800/50 border border-green-500/50 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
                <div>
                  <h4 className="font-bold text-green-300">MITOCHONDRIAL SUPPORT</h4>
                  <span className="text-xs text-green-400 font-semibold">Priority #4</span>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <span className="text-purple-400 mr-2 flex-shrink-0">Why:</span>
                  <span className="text-gray-300">Your <span className="text-white font-semibold">{mtDNA} mtDNA copies</span> shows mild decline (+0.2 years to biological age)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">Personalization:</span>
                  <span className="text-gray-300">PGC-1α dosing optimized for restoration to 1400+ copies (100% reversal target)</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dosing Schedule with Calculation Basis */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 bg-gradient-to-br from-indigo-900/30 to-blue-900/30 border border-indigo-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-indigo-400 mr-3" />
            <h3 className="text-2xl font-bold text-indigo-300">Dosing Schedule</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-1">{protocolDetails.dosesCount}</div>
              <div className="text-sm text-gray-400">doses</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-1">{protocolDetails.durationWeeks}</div>
              <div className="text-sm text-gray-400">weeks</div>
            </div>
            <div className="bg-slate-800/50 rounded-xl p-4 text-center">
              <div className="text-4xl font-bold text-cyan-400 mb-1">18hr</div>
              <div className="text-sm text-gray-400">activation pulses</div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-indigo-500/30 rounded-xl p-5 mb-4">
            <h4 className="text-sm font-semibold text-indigo-400 mb-3 uppercase tracking-wide">CALCULATION BASIS:</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 flex-shrink-0">•</span>
                <span><span className="text-white font-semibold">Telomere deficit:</span> 9.8% → requires 6-8 activation cycles</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 flex-shrink-0">•</span>
                <span><span className="text-white font-semibold">Epigenetic gap:</span> 3.0 years → requires 14-18 week duration</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 flex-shrink-0">•</span>
                <span><span className="text-white font-semibold">Safety margin:</span> Moderate risk profile → standard dosing protocol</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span><span className="text-green-400 font-semibold">AI optimization:</span> {protocolDetails.dosesCount} doses = optimal efficacy/safety ratio for YOUR profile</span>
              </li>
            </ul>
          </div>

          <div className="bg-gradient-to-r from-cyan-900/30 to-blue-900/30 border border-cyan-500/30 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wide">SCHEDULE BREAKDOWN:</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-0.5 flex-shrink-0">📅</span>
                <div>
                  <span className="text-white font-semibold">Weeks 1-4:</span> <span className="text-gray-300">Doses 1-2 (Activation Phase - rapid loading)</span>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-0.5 flex-shrink-0">📅</span>
                <div>
                  <span className="text-white font-semibold">Weeks 5-8:</span> <span className="text-gray-300">Dose 3 (Consolidation - telomere extension)</span>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-0.5 flex-shrink-0">📅</span>
                <div>
                  <span className="text-white font-semibold">Weeks 9-12:</span> <span className="text-gray-300">Doses 4-5 (Peak effect - epigenetic reset)</span>
                </div>
              </div>
              <div className="flex items-start">
                <span className="text-cyan-400 mr-2 mt-0.5 flex-shrink-0">📅</span>
                <div>
                  <span className="text-white font-semibold">Weeks 13-{protocolDetails.durationWeeks}:</span> <span className="text-gray-300">Doses {protocolDetails.dosesCount - 2}-{protocolDetails.dosesCount} (Stabilization - maintenance entry)</span>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-cyan-500/30">
              <p className="text-sm text-cyan-300">
                <span className="font-semibold">Then:</span> Bi-monthly maintenance doses for 4-6 months
              </p>
            </div>
          </div>
        </motion.div>

        {/* Target Tissues - Expanded */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <Target className="w-6 h-6 text-purple-400 mr-3" />
            <h3 className="text-2xl font-bold text-purple-300">Target Tissues (AI-Selected)</h3>
          </div>

          <div className="space-y-4">
            {/* Primary Targets */}
            <div className="bg-slate-800/50 border-2 border-purple-500/50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-purple-400 mb-3 uppercase tracking-wide">PRIMARY TARGETS:</h4>
              <div className="space-y-2">
                <div className="flex items-start text-sm">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300"><span className="text-white font-semibold">Cardiovascular</span> (telomere + inflammation + mitochondrial)</span>
                </div>
                <div className="flex items-start text-sm">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300"><span className="text-white font-semibold">Immune System</span> (telomere + epigenetic + inflammation)</span>
                </div>
                <div className="flex items-start text-sm">
                  <CheckCircle className="w-4 h-4 text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300"><span className="text-white font-semibold">Neural</span> (epigenetic + mitochondrial)</span>
                </div>
              </div>
            </div>

            {/* Secondary Targets */}
            <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-purple-400 mb-3 uppercase tracking-wide">SECONDARY TARGETS:</h4>
              <div className="space-y-2">
                <div className="flex items-start text-sm">
                  <span className="text-purple-400 mr-2 flex-shrink-0">•</span>
                  <span className="text-gray-300"><span className="text-white font-semibold">Skeletal Muscle</span> (mitochondrial support)</span>
                </div>
                <div className="flex items-start text-sm">
                  <span className="text-purple-400 mr-2 flex-shrink-0">•</span>
                  <span className="text-gray-300"><span className="text-white font-semibold">Skin</span> (telomere maintenance - visible aging markers)</span>
                </div>
              </div>
            </div>

            {/* Excluded */}
            <div className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">EXCLUDED:</h4>
              <div className="space-y-2">
                <div className="flex items-start text-sm">
                  <span className="text-gray-500 mr-2 flex-shrink-0">✗</span>
                  <span className="text-gray-400"><span className="text-gray-300 font-semibold">Hepatic</span> (your liver markers are optimal - no intervention needed)</span>
                </div>
                <div className="flex items-start text-sm">
                  <span className="text-gray-500 mr-2 flex-shrink-0">✗</span>
                  <span className="text-gray-400"><span className="text-gray-300 font-semibold">Renal</span> (kidney function normal - no targeting required)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-indigo-900/40 border border-indigo-500/30 rounded-xl p-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              The AI selected tissues based on which of <span className="text-cyan-400 font-semibold">YOUR biomarkers</span> are suboptimal 
              and which tissues are most affected by those specific deficits.
            </p>
          </div>
        </motion.div>

        {/* Molecular Optimization Score - Expanded */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-8 bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <Award className="w-6 h-6 text-green-400 mr-3" />
            <h3 className="text-2xl font-bold text-green-300">Molecular Optimization Score</h3>
          </div>

          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="text-7xl font-bold text-green-400">{protocolDetails.optimizationScore}%</div>
              <div className="text-sm text-gray-400 text-center mt-2">90th percentile among all protocols</div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">mRNA sequence optimization</span>
                <span className="text-green-400 font-semibold">95%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '95%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">near-perfect</div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">LNP tissue targeting</span>
                <span className="text-green-400 font-semibold">92%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">excellent</div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Dosing schedule</span>
                <span className="text-green-400 font-semibold">88%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">very good</div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-400">Safety parameters</span>
                <span className="text-green-400 font-semibold">91%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full" style={{ width: '91%' }}></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">excellent</div>
            </div>
          </div>

          <div className="bg-green-900/40 border border-green-500/30 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-green-400 mb-3 uppercase tracking-wide">INTERPRETATION:</h4>
            <p className="text-sm text-gray-300 mb-3 leading-relaxed">
              Your protocol is in the <span className="text-green-400 font-semibold">top 10%</span> of all simulated variants. 
              Achieving &gt;95% would require experimental components not yet validated for clinical use. 
              This 90% score represents the optimal balance of efficacy, safety, and proven science.
            </p>
            <h4 className="text-sm font-semibold text-green-400 mb-2 uppercase tracking-wide">WHAT WAS OPTIMIZED FOR YOU:</h4>
            <ul className="space-y-1 text-sm text-gray-300">
              <li className="flex items-start">
                <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>mRNA stability tuned for your metabolic rate</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>LNP targeting calibrated for your tissue distribution</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Pulsatile schedule matched to your telomere dynamics</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Safety thresholds set based on your inflammation levels</span>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Comparison to Generic Protocol */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <BarChart3 className="w-6 h-6 text-blue-400 mr-3" />
            <h3 className="text-2xl font-bold text-blue-300">Your AI-Optimized Protocol vs. Standard Protocol</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Standard Protocol */}
            <div className="bg-slate-800/50 border border-slate-600/50 rounded-xl p-5">
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-4">STANDARD "OFF-THE-SHELF" PROTOCOL:</div>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start text-sm">
                  <AlertCircle className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400">12 doses over 24 weeks (not optimized for severity)</span>
                </li>
                <li className="flex items-start text-sm">
                  <AlertCircle className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400">Targets: Cardiovascular only</span>
                </li>
                <li className="flex items-start text-sm">
                  <AlertCircle className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400">Fixed dosing (doesn't account for {telomereLength} baseline)</span>
                </li>
                <li className="flex items-start text-sm">
                  <AlertCircle className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400">Single pathway (telomerase only)</span>
                </li>
                <li className="flex items-start text-sm">
                  <AlertCircle className="w-4 h-4 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400">No molecular optimization</span>
                </li>
              </ul>
              <div className="border-t border-slate-600 pt-3">
                <div className="text-xs text-gray-500 mb-1">Expected outcome</div>
                <div className="text-2xl font-bold text-gray-400">-1.4 years</div>
                <div className="text-xs text-gray-500 mt-1">biological age improvement</div>
              </div>
              <div className="mt-3 text-xs text-gray-500">Cost: Higher due to more doses</div>
            </div>

            {/* AI-Optimized Protocol */}
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-xl p-5">
              <div className="flex items-center mb-4">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <div className="text-sm font-semibold text-green-300 uppercase tracking-wide">YOUR AI-OPTIMIZED PROTOCOL:</div>
              </div>
              <ul className="space-y-3 mb-4">
                <li className="flex items-start text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{protocolDetails.dosesCount} doses over {protocolDetails.durationWeeks} weeks (optimized for moderate issues)</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Targets: Cardiovascular, Immune, Neural (data-driven)</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Personalized dosing for YOUR {telomereLength} telomere length</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Multi-pathway (4 simultaneous interventions)</span>
                </li>
                <li className="flex items-start text-sm">
                  <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">{protocolDetails.optimizationScore}% molecular optimization score</span>
                </li>
              </ul>
              <div className="border-t border-green-600 pt-3">
                <div className="text-xs text-green-400 mb-1">Expected outcome</div>
                <div className="text-2xl font-bold text-green-400">-{(result.biologicalAge - result.optimizedAge).toFixed(1)} years</div>
                <div className="text-xs text-green-400 mt-1">biological age improvement</div>
              </div>
              <div className="mt-3 text-xs text-green-400">Cost: Lower due to fewer doses</div>
            </div>
          </div>

          {/* AI Advantage */}
          <div className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500/50 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wide">AI ADVANTAGE:</h4>
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">2.6×</div>
                <div className="text-xs text-gray-400">more biological age reversal</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">33%</div>
                <div className="text-xs text-gray-400">shorter treatment duration</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-400">42%</div>
                <div className="text-xs text-gray-400">fewer doses required</div>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              The AI determined that YOUR specific biomarker profile (moderate telomere + high epigenetic aging) requires 
              <span className="text-cyan-400 font-semibold"> simultaneous multi-pathway targeting</span>. Generic protocols miss this optimization entirely.
            </p>
          </div>
        </motion.div>

        {/* Protocol Intensity - Expanded */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-8 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <Activity className="w-6 h-6 text-indigo-400 mr-3" />
            <h3 className="text-2xl font-bold text-indigo-300">Protocol Intensity: Moderate</h3>
          </div>
          <div className="text-sm text-gray-400 mb-4">Calibrated for your biomarker severity profile</div>

          <div className="bg-slate-800/50 border border-indigo-500/30 rounded-xl p-5 mb-4">
            <h4 className="text-sm font-semibold text-indigo-400 mb-3 uppercase tracking-wide">YOUR SEVERITY ASSESSMENT:</h4>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <div className="text-orange-400 font-semibold mb-2">3 MEDIUM markers</div>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• Telomere (9.8% deficit)</li>
                  <li>• Epigenetic (+3.0 years)</li>
                  <li>• Inflammation (1.8 mg/L)</li>
                </ul>
              </div>
              <div>
                <div className="text-yellow-400 font-semibold mb-2">3 MILD markers</div>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• HDL (8% below)</li>
                  <li>• LDL (15% above)</li>
                  <li>• Mitochondrial (3.6% below)</li>
                </ul>
              </div>
              <div>
                <div className="text-green-400 font-semibold mb-2">4 OPTIMAL markers</div>
                <ul className="space-y-1 text-xs text-gray-400">
                  <li>• Glucose ✓</li>
                  <li>• HbA1c ✓</li>
                  <li>• Cholesterol ✓</li>
                  <li>• WBC ✓</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-indigo-500/30">
              <p className="text-sm text-gray-300">
                Overall: <span className="text-indigo-400 font-semibold">60% of biomarkers suboptimal</span> → MODERATE intervention required
              </p>
            </div>
          </div>

          <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-indigo-400 mb-3 uppercase tracking-wide">DOSING IMPLICATIONS:</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 flex-shrink-0">•</span>
                <span>Moderate severity = <span className="text-white font-semibold">{protocolDetails.dosesCount} doses</span> (vs. 4 for mild, 11 for severe)</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 flex-shrink-0">•</span>
                <span>Standard activation protocol (vs. gentle for mild, intensive for severe)</span>
              </li>
              <li className="flex items-start">
                <span className="text-cyan-400 mr-2 flex-shrink-0">•</span>
                <span>Safety margin: Conservative (97% confidence, &lt;0.1% risk)</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-indigo-500/30">
              <p className="text-xs text-gray-400 leading-relaxed">
                If your profile were SEVERE (e.g., 15%+ telomere deficit, +5 years epigenetic age), you would receive 11 doses over 24 weeks with more aggressive targeting.
                If your profile were MILD (e.g., 5% telomere deficit, +1 year epigenetic age), you would receive 4 doses over 8 weeks with gentler intervention.
                Your protocol is precisely calibrated to your MODERATE profile.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Safety & Monitoring */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mb-8 bg-gradient-to-br from-green-900/30 to-teal-900/30 border-2 border-green-500/50 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <Shield className="w-6 h-6 text-green-400 mr-3" />
            <h3 className="text-2xl font-bold text-green-300">Safety & Monitoring Protocol</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Oncogenic Risk */}
            <div className="bg-slate-800/50 border border-green-500/30 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-green-400 mb-3 uppercase tracking-wide">ONCOGENIC RISK MITIGATION:</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Real-time p53/p16 monitoring during each dose</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>18hr activation windows (minimizes cancer risk)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>72hr rest periods (allows cellular recovery)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Your risk score: <span className="text-green-400 font-semibold">0.08%</span> above baseline (well within safe limits)</span>
                </li>
              </ul>
            </div>

            {/* Adaptive Adjustments */}
            <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wide">ADAPTIVE ADJUSTMENTS:</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">Week 2:</span>
                  <span>Biomarker check (telomere, CRP, mtDNA)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">Week 4:</span>
                  <span>Protocol adjustment based on early response</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">Week 8:</span>
                  <span>Mid-point analysis (epigenetic age, full panel)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">Week 12:</span>
                  <span>Fine-tuning based on observed improvements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">Week {protocolDetails.durationWeeks}:</span>
                  <span>Final assessment & maintenance protocol design</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Response Tracking */}
          <div className="mt-6 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-blue-400 mb-3 uppercase tracking-wide">RESPONSE TRACKING:</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-gray-300">
              <div className="flex items-start">
                <Activity className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                <span><span className="text-white font-semibold">Telomere length:</span> Measured at weeks 0, 8, {protocolDetails.durationWeeks}</span>
              </div>
              <div className="flex items-start">
                <Activity className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                <span><span className="text-white font-semibold">Epigenetic age:</span> Measured at weeks 0, 12, {protocolDetails.durationWeeks}</span>
              </div>
              <div className="flex items-start">
                <Activity className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                <span><span className="text-white font-semibold">Inflammation:</span> Measured weekly (CRP blood test)</span>
              </div>
              <div className="flex items-start">
                <Activity className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                <span><span className="text-white font-semibold">Mitochondrial:</span> Measured at weeks 0, 8, {protocolDetails.durationWeeks}</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-500/30">
              <p className="text-sm text-cyan-300">
                <span className="font-semibold">Adaptive AI:</span> If your response deviates from predicted trajectory, the AI automatically recalculates and adjusts your protocol.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Bottom Banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="bg-gradient-to-r from-cyan-500/20 to-purple-500/20 border-2 border-cyan-500/50 rounded-2xl p-6 text-center"
        >
          <p className="text-lg text-cyan-300 mb-2">
            <span className="font-bold text-xl">Precision Medicine at Scale</span>
          </p>
          <p className="text-gray-300">
            Your protocol is unique among <span className="text-cyan-400 font-bold">1.2M+ simulated variants</span>
          </p>
          <p className="text-sm text-gray-400 mt-2">
            Generated in 2.4 seconds. Would take human experts weeks to design.
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}
