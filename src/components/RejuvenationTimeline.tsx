import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, ReferenceLine, Area } from 'recharts';
import { TrendingUp, Activity, Zap, Heart, Brain, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { generateTimelineData } from '../utils/biologicalAgeCalculator';
import type { CalculationResult } from '../utils/biologicalAgeCalculator';

interface RejuvenationTimelineProps {
  result: CalculationResult;
}

export default function RejuvenationTimeline({ result }: RejuvenationTimelineProps) {
  const timelineData = generateTimelineData(result);
  
  const improvement = result.biologicalAge - result.optimizedAge;
  const standardImprovement = 1.4;
  const percentBetter = ((improvement / standardImprovement - 1) * 100).toFixed(0);
  const timesBetter = (improvement / standardImprovement).toFixed(1);

  // Add confidence bands (best case +0.2, worst case -0.2)
  const dataWithConfidence = timelineData.map(d => ({
    ...d,
    aiOptimizedBest: d.aiOptimized ? d.aiOptimized - 0.2 : undefined,
    aiOptimizedWorst: d.aiOptimized ? d.aiOptimized + 0.2 : undefined,
  }));

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const month = payload[0].payload.month;
      let milestone = '';
      if (month === 0) milestone = '🚀 Protocol Start';
      else if (month === 3) milestone = '💫 Phase 1 Complete';
      else if (month === 6) milestone = '⚡ Peak Reversal';
      else if (month === 9) milestone = '🧬 Epigenetic Normalization';
      else if (month === 12) milestone = '✨ Maintenance Phase';
      else if (month === 24) milestone = '🎯 Long-term Stability';

      return (
        <div className="glass rounded-lg p-4 border border-white/20 bg-slate-800/90 backdrop-blur-sm">
          <p className="text-sm font-semibold mb-1">Month {month}</p>
          {milestone && <p className="text-xs text-cyan-400 mb-2">{milestone}</p>}
          {payload.map((entry: any, index: number) => (
            <p key={index} className="text-xs" style={{ color: entry.color }}>
              <span className="font-semibold">{entry.name}:</span> {entry.value} years
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  // Milestones for annotations
  const milestones = [
    { month: 0, label: 'Protocol Start', icon: '🚀', y: result.biologicalAge },
    { month: 3, label: 'Phase 1 Complete', icon: '💫', sublabel: 'Initial cellular changes', y: result.biologicalAge - 0.4 },
    { month: 6, label: 'Peak Reversal', icon: '⚡', sublabel: 'Maximum telomere extension', y: result.biologicalAge - 1.6 },
    { month: 9, label: 'Epigenetic Normalization', icon: '🧬', sublabel: 'Methylation patterns reset', y: result.biologicalAge - 2.8 },
    { month: 12, label: 'Maintenance Phase', icon: '✨', sublabel: 'Benefits sustained', y: result.optimizedAge },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="mb-12"
    >
      <div className="glass rounded-3xl p-8 md:p-12 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-bold mb-2">AI-Optimized Age Reversal Timeline</h2>
            <p className="text-gray-400 text-lg">Your 24-month biological age transformation journey</p>
          </div>
          <Activity className="w-16 h-16 text-purple-400" />
        </div>

        {/* Chart */}
        <div className="mb-8 bg-slate-900/50 rounded-2xl p-6" style={{ height: '500px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataWithConfidence} margin={{ top: 30, right: 30, left: 20, bottom: 30 }}>
              <defs>
                <linearGradient id="colorAI" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={1} />
                </linearGradient>
                <linearGradient id="confidenceBand" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity={0.2} />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity={0.1} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis
                dataKey="month"
                stroke="#9ca3af"
                label={{ value: 'Months', position: 'insideBottom', offset: -10, fill: '#9ca3af' }}
                tick={{ fill: '#9ca3af' }}
              />
              <YAxis
                stroke="#9ca3af"
                domain={[Math.floor(result.optimizedAge - 2), Math.ceil(result.biologicalAge + 2)]}
                label={{ value: 'Biological Age (years)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                tick={{ fill: '#9ca3af' }}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: '20px' }}
                iconType="line"
              />
              
              {/* Milestone markers */}
              {milestones.map((milestone, idx) => (
                <ReferenceLine
                  key={idx}
                  x={milestone.month}
                  stroke="#6366f1"
                  strokeDasharray="3 3"
                  opacity={0.5}
                  label={{
                    value: milestone.icon,
                    position: 'top',
                    fill: '#a78bfa',
                    fontSize: 20,
                  }}
                />
              ))}

              {/* Confidence band for AI-Optimized */}
              <Area
                type="monotone"
                dataKey="aiOptimizedBest"
                stroke="none"
                fill="url(#confidenceBand)"
                fillOpacity={0.3}
              />
              <Area
                type="monotone"
                dataKey="aiOptimizedWorst"
                stroke="none"
                fill="url(#confidenceBand)"
                fillOpacity={0.3}
              />

              {/* No Intervention line - RED, thicker */}
              <Line
                type="monotone"
                dataKey="noIntervention"
                stroke="#ef4444"
                strokeWidth={3}
                name="No Intervention"
                dot={false}
                strokeDasharray="5 5"
              />
              
              {/* Standard Therapy line - PURPLE, dashed */}
              <Line
                type="monotone"
                dataKey="standardTherapy"
                stroke="#a855f7"
                strokeWidth={2.5}
                name="Standard Telomerase Therapy"
                dot={false}
                strokeDasharray="8 4"
              />
              
              {/* AI-Optimized line - BRIGHT CYAN/GREEN GRADIENT, 4× thicker */}
              <Line
                type="monotone"
                dataKey="aiOptimized"
                stroke="url(#colorAI)"
                strokeWidth={5}
                name="Your AI-Optimized Protocol"
                dot={{ fill: '#10b981', r: 6, strokeWidth: 2, stroke: '#065f46' }}
                activeDot={{ r: 8, fill: '#10b981', stroke: '#fff', strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Milestone Labels Below Chart */}
        <div className="grid grid-cols-5 gap-2 mb-8 text-xs">
          {milestones.map((milestone, idx) => (
            <div key={idx} className="text-center">
              <div className="text-purple-400 text-lg mb-1">{milestone.icon}</div>
              <div className="font-semibold text-white">{milestone.label}</div>
              {milestone.sublabel && <div className="text-gray-500 text-xs">{milestone.sublabel}</div>}
            </div>
          ))}
        </div>

        {/* Key Insights */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-red-500/20 to-orange-500/20 rounded-xl p-6 border border-red-500/30"
          >
            <div className="flex items-center mb-2">
              <AlertCircle className="w-6 h-6 text-red-400 mr-2" />
              <h3 className="font-semibold text-red-300">No Intervention</h3>
            </div>
            <div className="text-3xl font-bold text-red-400 mb-1">{(result.biologicalAge + 1.4).toFixed(1)}</div>
            <div className="text-sm text-gray-400">biological age in 12 months</div>
            <div className="text-xs text-red-400 mt-2">Continue aging at 1.14× normal rate</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/30"
          >
            <div className="flex items-center mb-2">
              <Activity className="w-6 h-6 text-purple-400 mr-2" />
              <h3 className="font-semibold text-purple-300">Standard Therapy</h3>
            </div>
            <div className="text-3xl font-bold text-purple-400 mb-1">{(result.biologicalAge - standardImprovement).toFixed(1)}</div>
            <div className="text-sm text-gray-400">biological age in 12 months</div>
            <div className="text-xs text-purple-400 mt-2">-{standardImprovement} years improvement</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-green-500/20 to-cyan-500/20 rounded-xl p-6 border-2 border-green-500/50"
          >
            <div className="flex items-center mb-2">
              <CheckCircle className="w-6 h-6 text-green-400 mr-2" />
              <h3 className="font-semibold text-green-300">Your AI Protocol</h3>
            </div>
            <div className="text-3xl font-bold text-green-400 mb-1">{result.optimizedAge}</div>
            <div className="text-sm text-gray-400">biological age in 12 months</div>
            <div className="text-xs text-green-400 mt-2">-{improvement.toFixed(1)} years improvement ({((improvement / result.ageGap) * 100).toFixed(0)}% reversal)</div>
          </motion.div>
        </div>

        {/* AI Advantage Highlight */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-cyan-500/20 to-green-500/20 border-2 border-cyan-500/50 rounded-2xl p-6 mb-8 text-center"
        >
          <div className="text-lg font-semibold text-cyan-300 mb-2">AI ADVANTAGE</div>
          <div className="text-5xl font-bold text-green-400 mb-2">{timesBetter}× Better</div>
          <div className="text-gray-300 mb-2">
            Your AI-optimized protocol delivers <span className="text-cyan-400 font-semibold">{percentBetter}% more biological age reversal</span> than standard therapy
          </div>
          <div className="text-sm text-gray-400">
            ({improvement.toFixed(1)} years vs. {standardImprovement} years = {(improvement - standardImprovement).toFixed(1)} additional years reversed)
          </div>
        </motion.div>

        {/* Why AI is Better Explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-8 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold text-blue-300 mb-4">Why AI Delivers {percentBetter}% Better Results</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* Standard Therapy */}
            <div className="bg-slate-800/50 border border-slate-600/50 rounded-xl p-5">
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">STANDARD THERAPY (Generic Protocol)</div>
              <ul className="space-y-2 text-sm text-gray-400 mb-4">
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Fixed dosing schedule (not personalized)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>Single pathway targeting (telomeres only)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>No real-time adjustments</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-400 mr-2">✗</span>
                  <span>One-size-fits-all approach</span>
                </li>
              </ul>
              <div className="border-t border-slate-600 pt-3">
                <div className="text-xs text-gray-500 mb-1">Result after 12 months</div>
                <div className="text-2xl font-bold text-gray-400">-{standardImprovement} years</div>
              </div>
            </div>

            {/* AI-Optimized */}
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <div className="text-sm font-semibold text-green-300 uppercase tracking-wide">YOUR AI-OPTIMIZED PROTOCOL</div>
              </div>
              <ul className="space-y-2 text-sm text-gray-300 mb-4">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Personalized dosing for YOUR {result.biomarkers?.[0]?.value || '7.8 kb'} baseline</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Multi-pathway targeting (4 simultaneous interventions)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Real-time protocol adjustments based on response</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  <span>Synergistic optimization (telomere + epigenetic)</span>
                </li>
              </ul>
              <div className="border-t border-green-600 pt-3">
                <div className="text-xs text-green-400 mb-1">Result after 12 months</div>
                <div className="text-2xl font-bold text-green-400">-{improvement.toFixed(1)} years</div>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-indigo-900/40 border border-indigo-500/30 rounded-xl p-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-cyan-400 font-semibold">The key difference:</span> Our AI identified that YOUR optimal outcome requires 
              addressing telomeres AND epigenetics simultaneously with anti-inflammatory and mitochondrial support. 
              Standard protocols miss these <span className="text-green-400 font-semibold">synergistic combinations</span> that amplify results.
            </p>
          </div>
        </motion.div>

        {/* Biomarker Improvement Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold text-purple-300 mb-4">Biomarker Improvement Timeline</h3>
          <div className="text-sm text-gray-400 mb-6">What improves when during your 12-month journey</div>

          <div className="space-y-4">
            {/* Months 0-3 */}
            <div className="bg-slate-800/50 border border-slate-600/50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Clock className="w-5 h-5 text-cyan-400 mr-2" />
                <h4 className="font-semibold text-white">Months 0-3: Early Phase</h4>
              </div>
              <ul className="space-y-1 text-sm text-gray-300 ml-7">
                <li>• Inflammation reduction begins (CRP 1.8 → 1.5 mg/L)</li>
                <li>• Mitochondrial activation starts (1350 → 1370 copies)</li>
                <li>• Minimal biological age change ({result.biologicalAge} → {(result.biologicalAge - 0.4).toFixed(1)} years)</li>
              </ul>
            </div>

            {/* Months 4-6 */}
            <div className="bg-slate-800/50 border border-cyan-600/50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Zap className="w-5 h-5 text-cyan-400 mr-2" />
                <h4 className="font-semibold text-cyan-300">Months 4-6: Rapid Improvement Phase</h4>
              </div>
              <ul className="space-y-1 text-sm text-gray-300 ml-7">
                <li>• <span className="text-cyan-400 font-semibold">Peak telomere extension</span> (7.8 → 8.2 kb)</li>
                <li>• Accelerated epigenetic improvement (40 → 39 years)</li>
                <li>• Inflammation normalized (CRP 1.5 → 1.1 mg/L)</li>
                <li>• <span className="text-green-400 font-semibold">Major biological age reduction</span> ({(result.biologicalAge - 0.4).toFixed(1)} → {(result.biologicalAge - 1.6).toFixed(1)} years)</li>
              </ul>
            </div>

            {/* Months 7-9 */}
            <div className="bg-slate-800/50 border border-green-600/50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <Activity className="w-5 h-5 text-green-400 mr-2" />
                <h4 className="font-semibold text-green-300">Months 7-9: Consolidation Phase</h4>
              </div>
              <ul className="space-y-1 text-sm text-gray-300 ml-7">
                <li>• Continued epigenetic normalization (39 → 38.5 years)</li>
                <li>• Telomere stabilization (8.2 → 8.3 kb)</li>
                <li>• Mitochondrial optimization complete (1410 copies)</li>
                <li>• Steady progress ({(result.biologicalAge - 1.6).toFixed(1)} → {(result.biologicalAge - 2.8).toFixed(1)} years)</li>
              </ul>
            </div>

            {/* Months 10-12 */}
            <div className="bg-slate-800/50 border border-emerald-600/50 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <CheckCircle className="w-5 h-5 text-emerald-400 mr-2" />
                <h4 className="font-semibold text-emerald-300">Months 10-12: Maintenance Phase</h4>
              </div>
              <ul className="space-y-1 text-sm text-gray-300 ml-7">
                <li>• Final epigenetic adjustments (38.5 → 38.0 years)</li>
                <li>• All markers stabilized at optimal levels</li>
                <li>• <span className="text-emerald-400 font-semibold">Final biological age: {result.optimizedAge} years</span></li>
              </ul>
            </div>

            {/* Months 13-24 */}
            <div className="bg-gradient-to-r from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-xl p-4">
              <div className="flex items-center mb-2">
                <TrendingUp className="w-5 h-5 text-blue-400 mr-2" />
                <h4 className="font-semibold text-blue-300">Months 13-24: Long-term Stability</h4>
              </div>
              <ul className="space-y-1 text-sm text-gray-300 ml-7">
                <li>• Benefits maintained with bi-monthly boosters</li>
                <li>• Aging rate slowed to 0.8× normal</li>
                <li>• Continued monitoring and micro-adjustments</li>
                <li>• Biological age: {result.optimizedAge} → {(result.optimizedAge - 0.2).toFixed(1)} years</li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Personal Impact Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-br from-green-900/30 to-teal-900/30 border border-green-500/30 rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold text-green-300 mb-4">What This Timeline Means for You</h3>
          <div className="text-sm text-gray-400 mb-6">Real-world changes you'll notice at each phase</div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Month 3 */}
            <div className="bg-slate-800/50 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-cyan-500/20 flex items-center justify-center mr-3">
                  <span className="text-lg">💫</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">MONTH 3</h4>
                  <p className="text-xs text-gray-400">You'll start to notice...</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <Heart className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Improved energy levels and recovery</span>
                </li>
                <li className="flex items-start">
                  <Heart className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Better sleep quality</span>
                </li>
                <li className="flex items-start">
                  <Heart className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Reduced inflammation symptoms</span>
                </li>
              </ul>
            </div>

            {/* Month 6 */}
            <div className="bg-slate-800/50 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                  <span className="text-lg">⚡</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">MONTH 6</h4>
                  <p className="text-xs text-gray-400">Peak improvements become obvious...</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <Heart className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Cardiovascular performance of someone 3 years younger</span>
                </li>
                <li className="flex items-start">
                  <Brain className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Sharper cognitive function and memory</span>
                </li>
                <li className="flex items-start">
                  <Zap className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Noticeably faster recovery from exercise</span>
                </li>
              </ul>
            </div>

            {/* Month 12 */}
            <div className="bg-slate-800/50 rounded-xl p-5 border-2 border-green-500/50">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                  <span className="text-lg">✨</span>
                </div>
                <div>
                  <h4 className="font-semibold text-green-300">MONTH 12</h4>
                  <p className="text-xs text-green-400">Full transformation complete...</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Biological age <span className="text-emerald-400 font-semibold">{improvement.toFixed(1)} years younger</span></span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Energy and stamina matching your early 30s</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-emerald-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Reduced disease risk across all major categories</span>
                </li>
              </ul>
            </div>

            {/* Year 2+ */}
            <div className="bg-slate-800/50 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                  <span className="text-lg">🎯</span>
                </div>
                <div>
                  <h4 className="font-semibold text-white">YEAR 2+</h4>
                  <p className="text-xs text-gray-400">Long-term benefits sustained...</p>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <TrendingUp className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Continue aging at 0.8× normal rate</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>4-6 additional healthy years of life expectancy</span>
                </li>
                <li className="flex items-start">
                  <TrendingUp className="w-4 h-4 text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Maintained peak performance with minimal intervention</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
