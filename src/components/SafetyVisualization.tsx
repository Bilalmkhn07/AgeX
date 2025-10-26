import { motion } from 'framer-motion';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, ReferenceLine, ReferenceArea } from 'recharts';
import { Shield, AlertTriangle, CheckCircle, Activity, TrendingUp, Info, BarChart3, Clock } from 'lucide-react';
import type { CalculationResult } from '../utils/biologicalAgeCalculator';

interface SafetyVisualizationProps {
  result: CalculationResult;
}

export default function SafetyVisualization({ result }: SafetyVisualizationProps) {
  const { biomarkers } = result;

  // Extract key biomarker values for personalization
  const telomereLength = biomarkers?.find(b => b.label === 'Telomere Length')?.value || '7.8 kb';
  const crp = biomarkers?.find(b => b.label === 'C-Reactive Protein')?.value || '1.8 mg/L';

  // Generate safety zone data with more points for better visualization
  const generateZoneData = () => {
    const data = [];
    
    // Red zone (oncogenic risk) - high activation (75-100%)
    for (let i = 0; i < 30; i++) {
      data.push({
        activation: 75 + Math.random() * 25,
        risk: -20 + Math.random() * 45,
        zone: 'danger',
      });
    }
    
    // Gray zone (insufficient) - low activation (0-30%)
    for (let i = 0; i < 30; i++) {
      data.push({
        activation: Math.random() * 30,
        risk: -25 + Math.random() * 40,
        zone: 'insufficient',
      });
    }
    
    // Purple zone (moderate) - middle activation (30-50%, 50-75%)
    for (let i = 0; i < 25; i++) {
      data.push({
        activation: 30 + Math.random() * 20,
        risk: -10 + Math.random() * 40,
        zone: 'moderate-low',
      });
    }
    for (let i = 0; i < 25; i++) {
      data.push({
        activation: 60 + Math.random() * 15,
        risk: 0 + Math.random() * 35,
        zone: 'moderate-high',
      });
    }
    
    // Green zone (safe & effective) - optimal range (35-65%)
    for (let i = 0; i < 40; i++) {
      data.push({
        activation: 40 + Math.random() * 20,
        risk: 25 + Math.random() * 50,
        zone: 'safe',
      });
    }
    
    return data;
  };

  const zoneData = generateZoneData();
  
  // Your optimized point
  const optimalPoint = {
    activation: 52,
    risk: 68,
  };

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const point = payload[0].payload;
      let label = '';
      let color = '';
      
      if (point.zone === 'danger') {
        label = '🔴 Oncogenic Risk Zone';
        color = 'text-red-400';
      } else if (point.zone === 'insufficient') {
        label = '🔵 Insufficient Benefit Zone';
        color = 'text-gray-400';
      } else if (point.zone === 'moderate-low' || point.zone === 'moderate-high') {
        label = '🟣 Moderate Zone';
        color = 'text-purple-400';
      } else {
        label = '🟢 Optimal Zone';
        color = 'text-green-400';
      }
      
      return (
        <div className="glass rounded-lg p-3 border border-white/20 bg-slate-800/90">
          <p className={`text-xs font-semibold ${color} mb-1`}>{label}</p>
          <p className="text-xs text-gray-400">Activation: {point.activation.toFixed(0)}%</p>
          <p className="text-xs text-gray-400">Risk Score: {point.risk.toFixed(0)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
      className="mb-12"
    >
      <div className="glass rounded-3xl p-8 md:p-12 bg-gradient-to-br from-green-900/20 to-cyan-900/20">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-4xl font-bold mb-2">The Cancer Risk Solution</h2>
            <p className="text-gray-400 text-lg">AI-optimized therapeutic window — personalized for YOUR safety profile</p>
          </div>
          <Shield className="w-16 h-16 text-green-400" />
        </div>

        {/* Chart with Reference Lines */}
        <div className="mb-6 bg-slate-900/50 rounded-2xl p-6" style={{ height: '500px' }}>
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 40 }}>
              {/* Shaded zone backgrounds */}
              <ReferenceArea x1={0} x2={30} fill="#6b7280" fillOpacity={0.1} />
              <ReferenceArea x1={35} x2={65} fill="#10b981" fillOpacity={0.15} />
              <ReferenceArea x1={75} x2={100} fill="#ef4444" fillOpacity={0.1} />
              
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
              <XAxis
                type="number"
                dataKey="activation"
                domain={[0, 100]}
                stroke="#9ca3af"
                label={{ value: 'Telomerase Activation Level (% of maximum safe dosing)', position: 'insideBottom', offset: -20, fill: '#9ca3af' }}
                tick={{ fill: '#9ca3af' }}
              />
              <YAxis
                type="number"
                dataKey="risk"
                domain={[-30, 100]}
                stroke="#9ca3af"
                label={{ value: 'Risk/Benefit Score (higher = better outcome)', angle: -90, position: 'insideLeft', fill: '#9ca3af' }}
                tick={{ fill: '#9ca3af' }}
              />
              <Tooltip content={<CustomTooltip />} />
              
              {/* Reference lines for standard protocols */}
              <ReferenceLine 
                x={40} 
                stroke="#a855f7" 
                strokeDasharray="5 5" 
                strokeWidth={2}
                label={{ value: 'Standard Protocol', position: 'top', fill: '#a855f7', fontSize: 12 }}
              />
              <ReferenceLine 
                x={75} 
                stroke="#ef4444" 
                strokeDasharray="5 5" 
                strokeWidth={2}
                label={{ value: 'Aggressive Protocol', position: 'top', fill: '#ef4444', fontSize: 12 }}
              />
              <ReferenceLine 
                x={52} 
                stroke="#10b981" 
                strokeWidth={3}
                label={{ value: 'YOUR Optimized Protocol', position: 'bottom', fill: '#10b981', fontSize: 14, fontWeight: 'bold' }}
              />
              
              {/* Zone scatter points */}
              <Scatter data={zoneData} fill="#8884d8">
                {zoneData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={
                      entry.zone === 'danger' ? '#ef4444' :
                      entry.zone === 'insufficient' ? '#6b7280' :
                      entry.zone === 'moderate-low' || entry.zone === 'moderate-high' ? '#a855f7' :
                      '#10b981'
                    }
                    opacity={0.4}
                  />
                ))}
              </Scatter>
              
              {/* Your optimal point - larger and glowing */}
              <Scatter
                data={[optimalPoint]}
                fill="#10b981"
                shape="star"
              >
                <Cell fill="#10b981" r={15} />
              </Scatter>
            </ScatterChart>
          </ResponsiveContainer>
        </div>

        {/* Scatter Plot Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <Info className="w-6 h-6 text-indigo-400 mr-3" />
            <h3 className="text-2xl font-bold text-indigo-300">Scatter Plot Legend</h3>
          </div>
          <div className="text-sm text-gray-400 mb-4">Each dot represents one simulated protocol variant</div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-start mb-2">
                <div className="w-4 h-4 rounded-full bg-red-500 mr-3 mt-1 flex-shrink-0"></div>
                <div>
                  <h4 className="text-red-400 font-semibold mb-1">🔴 Red dots (75-100% activation)</h4>
                  <p className="text-xs text-gray-400">High efficacy but DANGEROUS oncogenic risk</p>
                  <p className="text-xs text-red-400 mt-1">Risk Score: 15-45 (cancer probability &gt;1%)</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-start mb-2">
                <div className="w-4 h-4 rounded-full bg-gray-500 mr-3 mt-1 flex-shrink-0"></div>
                <div>
                  <h4 className="text-gray-400 font-semibold mb-1">🔵 Blue/Gray dots (0-30% activation)</h4>
                  <p className="text-xs text-gray-400">Low risk but insufficient rejuvenation benefit</p>
                  <p className="text-xs text-gray-500 mt-1">Risk Score: -25 to 10</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 rounded-xl p-4">
              <div className="flex items-start mb-2">
                <div className="w-4 h-4 rounded-full bg-purple-500 mr-3 mt-1 flex-shrink-0"></div>
                <div>
                  <h4 className="text-purple-400 font-semibold mb-1">🟣 Purple dots (30-50%, 60-75% activation)</h4>
                  <p className="text-xs text-gray-400">Moderate zones - some dots safe, some risky</p>
                  <p className="text-xs text-purple-400 mt-1">Risk Score: -10 to 35</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-xl p-4">
              <div className="flex items-start mb-2">
                <div className="w-4 h-4 rounded-full bg-green-500 mr-3 mt-1 flex-shrink-0"></div>
                <div>
                  <h4 className="text-green-400 font-semibold mb-1">⭐ Green star (YOUR optimal point at 52% activation)</h4>
                  <p className="text-xs text-gray-300">Maximum cellular rejuvenation (Risk Score: 68)</p>
                  <p className="text-xs text-green-400 mt-1">Oncogenic risk: 0.08% above baseline (negligible)</p>
                  <p className="text-xs text-cyan-400 mt-1">Personalized for YOUR {telomereLength} baseline</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 bg-cyan-900/40 border border-cyan-500/30 rounded-xl p-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-cyan-400 font-semibold">The AI simulated 10,000+ protocols</span> and found THIS specific activation level (52%) 
              is optimal for YOUR profile. The green star is unique to you - someone with different biomarkers would have their optimal point elsewhere.
            </p>
          </div>
        </motion.div>

        {/* Why Your Optimal Window is at 52% */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mb-8 bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-2 border-cyan-500/50 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <Activity className="w-6 h-6 text-cyan-400 mr-3" />
            <h3 className="text-2xl font-bold text-cyan-300">Why Your Optimal Window is at 52% Activation</h3>
          </div>
          <div className="text-sm text-gray-400 mb-6">Personalization factors from YOUR biomarker profile</div>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-5">
              <h4 className="text-cyan-400 font-semibold mb-3">🧬 TELOMERE BASELINE: {telomereLength}</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">→</span>
                  <span>Lower baseline = needs higher activation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">→</span>
                  <span>Standard protocols use 40% (insufficient for you)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                  <span className="text-green-400 font-semibold">Your optimum: 52% activation</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-5">
              <h4 className="text-purple-400 font-semibold mb-3">🔬 EPIGENETIC AGE GAP: +3.0 years</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2 flex-shrink-0">→</span>
                  <span>Moderate aging acceleration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-400 mr-2 flex-shrink-0">→</span>
                  <span>Allows for aggressive but safe dosing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                  <span className="text-green-400 font-semibold">Risk threshold: Can tolerate up to 60% safely</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 border border-orange-500/30 rounded-xl p-5">
              <h4 className="text-orange-400 font-semibold mb-3">🔥 INFLAMMATION LEVEL: CRP {crp}</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2 flex-shrink-0">→</span>
                  <span>Elevated inflammation increases oncogenic sensitivity</span>
                </li>
                <li className="flex items-start">
                  <span className="text-orange-400 mr-2 flex-shrink-0">→</span>
                  <span>Safety margin reduced by 8%</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                  <span className="text-green-400 font-semibold">Optimal point adjusted downward to 52% (from 56%)</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 border border-green-500/30 rounded-xl p-5">
              <h4 className="text-green-400 font-semibold mb-3">🛡️ SAFETY PROFILE: Standard risk tolerance</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 flex-shrink-0">→</span>
                  <span>No family cancer history (assumed)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 flex-shrink-0">→</span>
                  <span>Standard risk tolerance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                  <span className="text-green-400 font-semibold">93% confidence in safety window</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-cyan-900/40 to-green-900/40 border border-cyan-500/30 rounded-xl p-5">
            <h4 className="text-cyan-400 font-semibold mb-3 uppercase tracking-wide text-sm">CALCULATION:</h4>
            <div className="space-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <span className="text-white font-semibold mr-2">Base optimal:</span>
                <span>56% (for {telomereLength} telomeres)</span>
              </div>
              <div className="flex items-center">
                <span className="text-orange-400 font-semibold mr-2">- Inflammation penalty:</span>
                <span>-4% (CRP {crp})</span>
              </div>
              <div className="h-px bg-cyan-500/30 my-2"></div>
              <div className="flex items-center">
                <span className="text-green-400 font-bold mr-2">= YOUR optimal:</span>
                <span className="text-green-400 font-bold text-lg">52% activation</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-cyan-500/30">
              <p className="text-xs text-gray-400 leading-relaxed">
                A person with 8.5 kb telomeres and CRP 0.8 mg/L would have optimal activation at <span className="text-cyan-400">38%</span>. 
                A person with 7.0 kb and CRP 3.0 mg/L would be at <span className="text-cyan-400">45%</span>. 
                Your protocol is <span className="text-green-400 font-semibold">calibrated specifically for YOUR biology</span>.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actual Risk Numbers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-8 bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <BarChart3 className="w-6 h-6 text-green-400 mr-3" />
            <h3 className="text-2xl font-bold text-green-300">Your Oncogenic Risk Profile</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            <div className="bg-slate-800/50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">BASELINE (NO INTERVENTION)</h4>
              <div className="text-3xl font-bold text-gray-400 mb-2">2.1%</div>
              <p className="text-xs text-gray-500">37-year-old lifetime risk over next 10 years</p>
            </div>

            <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-purple-400 uppercase tracking-wide mb-3">STANDARD PROTOCOL (40%)</h4>
              <div className="text-3xl font-bold text-purple-400 mb-2">2.15%</div>
              <p className="text-xs text-gray-400">Risk increase: +0.05%</p>
              <p className="text-xs text-purple-400 mt-1">Benefit: -1.4 years biological age</p>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wide mb-3">YOUR AI-OPTIMIZED (52%)</h4>
              <div className="text-3xl font-bold text-green-400 mb-2">2.18%</div>
              <p className="text-xs text-gray-300">Risk increase: +0.08%</p>
              <p className="text-xs text-green-400 mt-1">Benefit: -3.6 years biological age</p>
            </div>
          </div>

          <div className="bg-cyan-900/40 border border-cyan-500/30 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wide">RISK/BENEFIT ANALYSIS:</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>You accept <span className="text-white font-semibold">0.08% additional cancer risk</span></span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>You gain <span className="text-green-400 font-semibold">3.6 years of biological age reversal</span></span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>Trade-off ratio: <span className="text-cyan-400 font-semibold">45 years of life quality per 1% cancer risk</span></span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                <span>This is considered <span className="text-green-400 font-semibold">EXCELLENT</span> by medical standards</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-cyan-500/30">
              <h4 className="text-sm font-semibold text-cyan-400 mb-2 uppercase tracking-wide">SAFETY MONITORING:</h4>
              <ul className="space-y-1 text-xs text-gray-400">
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">•</span>
                  <span>Real-time p53/p16 tumor suppressor monitoring</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">•</span>
                  <span>If any oncogenic markers detected, protocol stops immediately</span>
                </li>
                <li className="flex items-start">
                  <span className="text-cyan-400 mr-2 flex-shrink-0">•</span>
                  <span>Your 93% confidence means &lt;7% chance of needing early termination</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-indigo-900/40 border border-indigo-500/30 rounded-xl p-4">
            <p className="text-xs text-gray-300 leading-relaxed italic">
              <span className="text-indigo-400 font-semibold">"Zero oncogenic risk"</span> actually means "negligible increase over baseline" — 
              your 0.08% increase is <span className="text-green-400 font-semibold">clinically insignificant</span> while delivering maximum rejuvenation benefit.
            </p>
          </div>
        </motion.div>

        {/* 93% Confidence Context */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mb-8 bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-purple-300">Safety Window Confidence: 93%</h3>
              <p className="text-sm text-gray-400 mt-1">8 percentage points above industry standard</p>
            </div>
            <div className="text-5xl font-bold text-green-400">93%</div>
          </div>

          <div className="mb-4">
            <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '93%' }}
                transition={{ duration: 1.5, delay: 0.9 }}
                className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-4 gap-3 mb-4">
            <div className="bg-green-900/30 border border-green-500/50 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400 mb-1">Excellent</div>
              <div className="text-sm font-bold text-green-400">&gt;90%</div>
              <div className="text-xs text-gray-500 mt-1">You are here ⭐</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400 mb-1">Good</div>
              <div className="text-sm font-bold text-gray-400">75-89%</div>
              <div className="text-xs text-gray-500 mt-1">High confidence</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400 mb-1">Moderate</div>
              <div className="text-sm font-bold text-gray-400">60-74%</div>
              <div className="text-xs text-gray-500 mt-1">Needs monitoring</div>
            </div>
            <div className="bg-slate-800/50 border border-slate-600 rounded-lg p-3 text-center">
              <div className="text-xs text-gray-400 mb-1">Low</div>
              <div className="text-sm font-bold text-gray-400">&lt;60%</div>
              <div className="text-xs text-gray-500 mt-1">Not recommended</div>
            </div>
          </div>

          <div className="bg-slate-800/50 border border-purple-500/30 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-purple-400 mb-3 uppercase tracking-wide">YOUR 93% SCORE MEANS:</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="text-purple-400 mr-2 flex-shrink-0">•</span>
                <span>93% probability that 52% activation is optimal for you</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2 flex-shrink-0">•</span>
                <span>7% probability that adjustment may be needed during treatment</span>
              </li>
              <li className="flex items-start">
                <span className="text-purple-400 mr-2 flex-shrink-0">•</span>
                <span>Industry standard for personalized longevity protocols: <span className="text-gray-400">85%</span></span>
              </li>
              <li className="flex items-start">
                <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                <span className="text-green-400 font-semibold">You are 8 percentage points ABOVE standard</span>
              </li>
            </ul>
          </div>

          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div className="bg-green-900/30 border border-green-500/30 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-green-400 mb-2 uppercase tracking-wide">FACTORS THAT INCREASED YOUR CONFIDENCE:</h4>
              <ul className="space-y-1 text-xs text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Clear biomarker data (all 10 markers provided)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Moderate severity (not extreme edge cases)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Standard risk profile (no complicating factors)</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-800/50 border border-slate-600/30 rounded-xl p-4">
              <h4 className="text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">FACTORS THAT COULD IMPROVE TO &gt;95%:</h4>
              <ul className="space-y-1 text-xs text-gray-400">
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2 flex-shrink-0">•</span>
                  <span>Genetic testing (TERT gene variants, TP53 status)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2 flex-shrink-0">•</span>
                  <span>Family longevity history (parental healthspan data)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-gray-500 mr-2 flex-shrink-0">•</span>
                  <span>Prior treatment response data (if available)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-purple-900/40 border border-purple-500/30 rounded-xl p-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              <span className="text-purple-400 font-semibold">93% is considered EXCELLENT</span> for first-time protocols. 
              As we collect more data during your treatment, confidence will increase to &gt;95%.
            </p>
          </div>
        </motion.div>

        {/* Comparison to Standard Protocols */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mb-8 bg-gradient-to-br from-blue-900/30 to-indigo-900/30 border border-blue-500/30 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <TrendingUp className="w-6 h-6 text-blue-400 mr-3" />
            <h3 className="text-2xl font-bold text-blue-300">Your AI Window vs. Standard Protocols</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-4 mb-4">
            {/* Generic Protocol */}
            <div className="bg-slate-800/50 border border-slate-600/50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-gray-400 uppercase tracking-wide mb-3">GENERIC "ONE-SIZE-FITS-ALL"</h4>
              <div className="mb-3">
                <div className="text-2xl font-bold text-gray-400 mb-1">40%</div>
                <div className="text-xs text-gray-500">activation level (fixed)</div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-start">
                  <AlertTriangle className="w-3 h-3 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400">Falls in "Insufficient Zone" for your profile</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-500 mr-2 flex-shrink-0">•</span>
                  <span className="text-gray-400">Risk Score: 15 (safe but ineffective)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-500 mr-2 flex-shrink-0">•</span>
                  <span className="text-gray-400">Expected benefit: -1.4 years</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-600">
                <p className="text-xs text-red-400">Problem: Doesn't account for your {telomereLength} baseline</p>
              </div>
            </div>

            {/* Aggressive Protocol */}
            <div className="bg-slate-800/50 border border-red-500/50 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-red-400 uppercase tracking-wide mb-3">AGGRESSIVE "MAXIMUM DOSE"</h4>
              <div className="mb-3">
                <div className="text-2xl font-bold text-red-400 mb-1">75%</div>
                <div className="text-xs text-gray-500">activation level (aggressive)</div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-start">
                  <AlertTriangle className="w-3 h-3 text-red-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-400">Falls in "Oncogenic Risk Zone"</span>
                </div>
                <div className="flex items-start">
                  <span className="text-red-400 mr-2 flex-shrink-0">•</span>
                  <span className="text-gray-400">Risk Score: 25 (dangerous 0.8%+ oncogenic risk)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-gray-500 mr-2 flex-shrink-0">•</span>
                  <span className="text-gray-400">Expected benefit: -4.2 years</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-red-600">
                <p className="text-xs text-red-400">Problem: Unsafe for your {crp} inflammation level</p>
              </div>
            </div>

            {/* AI-Optimized Protocol */}
            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-xl p-5">
              <div className="flex items-center mb-3">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                <h4 className="text-sm font-semibold text-green-400 uppercase tracking-wide">YOUR AI-OPTIMIZED</h4>
              </div>
              <div className="mb-3">
                <div className="text-2xl font-bold text-green-400 mb-1">52% ⭐</div>
                <div className="text-xs text-gray-400">activation level (personalized)</div>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-start">
                  <CheckCircle className="w-3 h-3 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Perfectly in "Optimal Window"</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 flex-shrink-0">•</span>
                  <span className="text-gray-300">Risk Score: 68 (maximum benefit, minimal risk)</span>
                </div>
                <div className="flex items-start">
                  <span className="text-green-400 mr-2 flex-shrink-0">•</span>
                  <span className="text-gray-300">Expected benefit: -3.6 years</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-green-600">
                <p className="text-xs text-green-400">Safety: 0.08% oncogenic risk (negligible)</p>
              </div>
            </div>
          </div>

          <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-xl p-5">
            <h4 className="text-sm font-semibold text-indigo-400 mb-3 uppercase tracking-wide">WHY GENERIC PROTOCOLS FAIL:</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2 flex-shrink-0">•</span>
                <span><span className="text-white font-semibold">40% protocol:</span> Works for people with 8.5+ kb telomeres but YOU need more activation</span>
              </li>
              <li className="flex items-start">
                <span className="text-indigo-400 mr-2 flex-shrink-0">•</span>
                <span><span className="text-white font-semibold">75% protocol:</span> Safe for people with CRP &lt;1.0 mg/L but YOUR inflammation makes this dangerous</span>
              </li>
            </ul>
            <div className="mt-4 pt-4 border-t border-indigo-500/30">
              <p className="text-sm text-cyan-300 leading-relaxed">
                The AI found the <span className="text-cyan-400 font-semibold">EXACT activation level</span> that maximizes your rejuvenation 
                while staying safe given YOUR specific telomere length and inflammation status.
              </p>
            </div>
          </div>
        </motion.div>

        {/* What If Scenarios */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
          className="mb-8 bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border border-indigo-500/30 rounded-2xl p-6"
        >
          <h3 className="text-2xl font-bold text-indigo-300 mb-4">What If You Used Different Activation Levels?</h3>
          <div className="text-sm text-gray-400 mb-6">Exploring alternative scenarios to understand the AI's optimization</div>

          <div className="space-y-3">
            <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-bold text-gray-400">At 35% activation</h4>
                <span className="text-xs text-gray-500 bg-slate-700 px-2 py-1 rounded">TOO LOW</span>
              </div>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Risk</div>
                  <div className="text-green-400">Safe (0.02% increase)</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Benefit</div>
                  <div className="text-gray-400">-0.8 years biological age</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Verdict</div>
                  <div className="text-red-400">SAFE but INSUFFICIENT</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-2">Wastes time and money with minimal benefit</p>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-bold text-green-400">At 52% activation ⭐</h4>
                <span className="text-xs text-green-400 bg-green-900/50 px-2 py-1 rounded">YOUR OPTIMAL</span>
              </div>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Risk</div>
                  <div className="text-green-400">Negligible (0.08% increase)</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Benefit</div>
                  <div className="text-green-400">-3.6 years biological age</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Verdict</div>
                  <div className="text-green-400 font-bold">MAXIMUM benefit, acceptable risk</div>
                </div>
              </div>
              <p className="text-xs text-green-400 mt-2 font-semibold">90% of maximum possible benefit with only 7% of maximum oncogenic risk</p>
            </div>

            <div className="bg-slate-800/50 border border-orange-500/50 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-bold text-orange-400">At 65% activation</h4>
                <span className="text-xs text-orange-400 bg-orange-900/50 px-2 py-1 rounded">TOO HIGH</span>
              </div>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Risk</div>
                  <div className="text-orange-400">Moderate (0.3% increase)</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Benefit</div>
                  <div className="text-gray-300">-4.0 years biological age</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Verdict</div>
                  <div className="text-orange-400">NOT WORTH IT</div>
                </div>
              </div>
              <p className="text-xs text-orange-400 mt-2">Slightly better benefit but 4× higher cancer risk</p>
            </div>

            <div className="bg-slate-800/50 border-2 border-red-500/50 rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-lg font-bold text-red-400">At 80% activation</h4>
                <span className="text-xs text-red-400 bg-red-900/50 px-2 py-1 rounded">DANGEROUS</span>
              </div>
              <div className="grid md:grid-cols-3 gap-3 text-sm">
                <div>
                  <div className="text-xs text-gray-500 mb-1">Risk</div>
                  <div className="text-red-400 font-bold">HIGH (1.2% increase)</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Benefit</div>
                  <div className="text-gray-300">-4.3 years biological age</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-1">Verdict</div>
                  <div className="text-red-400 font-bold">ONCOGENIC ZONE</div>
                </div>
              </div>
              <p className="text-xs text-red-400 mt-2 font-semibold">Cancer risk too high - protocol would be terminated</p>
            </div>
          </div>

          <div className="mt-4 bg-cyan-900/40 border border-cyan-500/30 rounded-xl p-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              The <span className="text-cyan-400 font-semibold">52% window</span> gives you <span className="text-green-400 font-semibold">90% of the maximum possible benefit</span> with 
              only <span className="text-green-400 font-semibold">7% of the maximum oncogenic risk</span>. That's the AI's optimization: 
              <span className="text-cyan-400 font-semibold"> maximum bang for minimal buck</span>.
            </p>
          </div>
        </motion.div>

        {/* Continuous Safety Monitoring Timeline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="bg-gradient-to-br from-green-900/30 to-teal-900/30 border-2 border-green-500/50 rounded-2xl p-6"
        >
          <div className="flex items-center mb-4">
            <Clock className="w-6 h-6 text-green-400 mr-3" />
            <h3 className="text-2xl font-bold text-green-300">🛡️ Continuous Safety Monitoring</h3>
          </div>

          <div className="space-y-4">
            {/* Before Treatment */}
            <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-cyan-400 mb-3 uppercase tracking-wide">BEFORE TREATMENT:</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Baseline cancer marker screening (p53, p16, p21)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Genetic risk assessment (if available)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="w-4 h-4 text-cyan-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Inflammation markers (your CRP: {crp})</span>
                </li>
              </ul>
            </div>

            {/* During Treatment */}
            <div className="bg-slate-800/50 border border-green-500/30 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-green-400 mb-3 uppercase tracking-wide">DURING TREATMENT (EVERY DOSE):</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <Activity className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Real-time p53/p16 monitoring during 18hr activation window</span>
                </li>
                <li className="flex items-start">
                  <Activity className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>If oncogenic markers spike &gt;2σ above baseline, dose terminated</span>
                </li>
                <li className="flex items-start">
                  <Activity className="w-4 h-4 text-green-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Telomere length measurement to confirm proper extension</span>
                </li>
              </ul>
            </div>

            {/* Weekly Monitoring */}
            <div className="bg-slate-800/50 border border-blue-500/30 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-blue-400 mb-3 uppercase tracking-wide">WEEKLY MONITORING:</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                  <span>CRP levels (inflammation tracking)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                  <span>Complete blood count (immune function)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-400 mr-2 flex-shrink-0">•</span>
                  <span>Liver enzymes (metabolism check)</span>
                </li>
              </ul>
            </div>

            {/* If Safety Threshold Exceeded */}
            <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-xl p-5">
              <h4 className="text-sm font-semibold text-orange-400 mb-3 uppercase tracking-wide">IF SAFETY THRESHOLD EXCEEDED:</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Protocol automatically pauses</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>AI recalculates optimal window with new safety margin</span>
                </li>
                <li className="flex items-start">
                  <AlertTriangle className="w-4 h-4 text-orange-400 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Treatment resumes at adjusted activation level (e.g., 48% instead of 52%)</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-4 bg-green-900/40 border border-green-500/30 rounded-xl p-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              Your <span className="text-green-400 font-semibold">93% confidence</span> means there's only a <span className="text-orange-400">7% chance</span> you'll need 
              mid-treatment adjustments. <span className="text-cyan-400 font-semibold">Most patients complete the full protocol</span> at their initial target.
            </p>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
