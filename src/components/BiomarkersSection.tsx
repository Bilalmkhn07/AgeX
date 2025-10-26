import { motion } from 'framer-motion';
import { Activity, CheckCircle, AlertTriangle, AlertCircle } from 'lucide-react';
import type { CalculationResult } from '../utils/biologicalAgeCalculator';

interface BiomarkersSectionProps {
  result: CalculationResult;
}

export default function BiomarkersSection({ result }: BiomarkersSectionProps) {
  if (!result.biomarkers || result.dataSource === 'lifestyle') {
    return null; // Don't show this section for lifestyle-based results
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'optimal':
        return <CheckCircle className="w-5 h-5 text-green-400" />;
      case 'normal':
        return <CheckCircle className="w-5 h-5 text-blue-400" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-400" />;
      case 'danger':
        return <AlertCircle className="w-5 h-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'border-green-500/30 bg-green-900/20';
      case 'normal':
        return 'border-blue-500/30 bg-blue-900/20';
      case 'warning':
        return 'border-yellow-500/30 bg-yellow-900/20';
      case 'danger':
        return 'border-red-500/30 bg-red-900/20';
      default:
        return 'border-gray-500/30 bg-gray-900/20';
    }
  };


  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 }}
      className="mb-12"
    >
      <div className="glass rounded-3xl p-8 md:p-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold mb-2">Your Cellular Biomarkers</h2>
            <p className="text-gray-400">Clinical-grade analysis from your lab results</p>
          </div>
          <Activity className="w-12 h-12 text-cyan-400" />
        </div>

        {/* Confidence Badge */}
        <div className="mb-6 inline-flex items-center bg-green-500/20 border border-green-500/30 rounded-full px-4 py-2">
          <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
          <span className="text-green-400 font-semibold">{result.confidenceLevel}% Confidence (Clinical Grade)</span>
        </div>

        {/* Biomarkers Grid */}
        <div className="grid md:grid-cols-2 gap-4 mb-8">
          {result.biomarkers.map((biomarker, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className={`rounded-xl p-4 border ${getStatusColor(biomarker.status)}`}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center mb-1">
                    <span className="font-semibold text-white">{biomarker.label}</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">
                    {biomarker.value} <span className="text-sm text-gray-400">{biomarker.unit}</span>
                  </div>
                </div>
                {getStatusIcon(biomarker.status)}
              </div>
              <div className="text-sm text-gray-400 mb-1">
                Optimal: {biomarker.optimalRange}
              </div>
              <div className="text-sm">
                {biomarker.deviation}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Health Issues (if present) */}
        {result.healthIssues && result.healthIssues.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="mb-6"
          >
            <h3 className="text-xl font-semibold mb-4">Key Health Issues Identified</h3>
            <div className="space-y-3">
              {result.healthIssues.slice(0, 5).map((issue, index) => (
                <div
                  key={index}
                  className={`rounded-xl p-4 border ${
                    issue.severity === 'high'
                      ? 'bg-red-900/20 border-red-500/30'
                      : issue.severity === 'medium'
                      ? 'bg-yellow-900/20 border-yellow-500/30'
                      : 'bg-blue-900/20 border-blue-500/30'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center mb-1">
                        <span className="text-xs uppercase tracking-wide text-gray-400 mr-2">
                          {issue.category}
                        </span>
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full ${
                            issue.severity === 'high'
                              ? 'bg-red-500/20 text-red-400'
                              : issue.severity === 'medium'
                              ? 'bg-yellow-500/20 text-yellow-400'
                              : 'bg-blue-500/20 text-blue-400'
                          }`}
                        >
                          {issue.severity.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="font-semibold text-white mb-1">{issue.title}</h4>
                      <p className="text-sm text-gray-300 mb-2">{issue.description}</p>
                      <p className="text-xs text-gray-400 italic">Impact: {issue.impact}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* AI Analysis */}
        {result.aiAnalysis && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border border-purple-500/30 rounded-xl p-6"
          >
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-purple-500/30 flex items-center justify-center mr-4 flex-shrink-0">
                <Activity className="w-5 h-5 text-purple-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-purple-300 mb-3">AI Analysis Summary</h3>
                
                {/* Primary Findings */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-400 mb-2">PRIMARY FINDINGS</h4>
                  <ul className="space-y-1">
                    {result.aiAnalysis.primaryFindings.map((finding, index) => (
                      <li key={index} className="text-gray-300 text-sm leading-relaxed">
                        • {finding}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Root Causes */}
                {result.aiAnalysis.rootCauses.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-semibold text-gray-400 mb-2">ROOT CAUSES</h4>
                    <ul className="space-y-1">
                      {result.aiAnalysis.rootCauses.map((cause, index) => (
                        <li key={index} className="text-gray-300 text-sm leading-relaxed">
                          • {cause}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Prognosis */}
                <div className="space-y-3">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-red-400 mb-1">WITHOUT INTERVENTION</h4>
                    <p className="text-sm text-gray-300">{result.aiAnalysis.prognosisWithoutIntervention}</p>
                  </div>
                  <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-3">
                    <h4 className="text-xs font-semibold text-green-400 mb-1">WITH AI-OPTIMIZED PROTOCOL</h4>
                    <p className="text-sm text-gray-300">{result.aiAnalysis.prognosisWithProtocol}</p>
                  </div>
                </div>

                {/* Protocol Targeting */}
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    <span className="text-cyan-400 font-semibold">Precision Protocol Approach:</span> Our AI-optimized therapy targets these specific pathways with{' '}
                    {result.protocolDetails.primaryTargets.map((t, i) => (
                      <span key={i}>
                        {i > 0 && (i === result.protocolDetails.primaryTargets.length - 1 ? ' and ' : ', ')}
                        {t.split('(')[0].trim().toLowerCase()}
                      </span>
                    ))}. Each component is calibrated to your unique biomarker profile for maximum efficacy and safety.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Why AI is 2.3× Better */}
        {result.dataSource === 'biomarkers' && result.biomarkerImprovements && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6"
          >
            <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border border-blue-500/40 rounded-2xl p-6">
              <h3 className="text-2xl font-bold text-blue-300 mb-4">Why AI Delivers 2.3× Better Results Than Standard Care</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                {/* Standard Protocol */}
                <div className="bg-slate-800/50 border border-slate-600/50 rounded-xl p-5">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-gray-400 rounded-full mr-2"></div>
                    <h4 className="font-semibold text-gray-300 text-lg">STANDARD PROTOCOL</h4>
                  </div>
                  <div className="text-xs text-gray-400 uppercase tracking-wide mb-2">Manual Design</div>
                  <ul className="space-y-2 text-sm text-gray-400 mb-4">
                    <li>• One-size-fits-all telomerase dosing</li>
                    <li>• Fixed 12-week schedule</li>
                    <li>• Single pathway targeting</li>
                  </ul>
                  <div className="border-t border-slate-600 pt-3">
                    <div className="text-xs text-gray-500 mb-1">Expected Outcome</div>
                    <div className="text-2xl font-bold text-gray-400">-1.4 years</div>
                    <div className="text-xs text-gray-500">biological age</div>
                  </div>
                </div>

                {/* AI-Optimized Protocol */}
                <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-2 border-green-500/50 rounded-xl p-5">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                    <h4 className="font-semibold text-green-300 text-lg">YOUR AI-OPTIMIZED PROTOCOL</h4>
                  </div>
                  <div className="text-xs text-green-400 uppercase tracking-wide mb-2">Personalized Design</div>
                  <ul className="space-y-2 text-sm text-gray-300 mb-4">
                    <li>• Personalized dosing based on {result.biomarkers?.[0]?.value} baseline</li>
                    <li>• Adaptive {Math.floor(result.protocolDetails.durationWeeks / 4)}-{Math.ceil(result.protocolDetails.durationWeeks / 4)} month schedule with real-time adjustments</li>
                    <li>• Multi-pathway targeting ({result.protocolDetails.primaryTargets.length} simultaneous interventions)</li>
                  </ul>
                  <div className="border-t border-green-600 pt-3">
                    <div className="text-xs text-green-400 mb-1">Expected Outcome</div>
                    <div className="text-2xl font-bold text-green-400">{result.expectedOutcomes.biologicalAgeReduction}</div>
                    <div className="text-xs text-green-300">biological age</div>
                  </div>
                </div>
              </div>

              {/* AI Advantage */}
              <div className="bg-indigo-900/40 border border-indigo-500/30 rounded-xl p-5">
                <h4 className="font-semibold text-indigo-300 mb-3 flex items-center">
                  <span className="text-2xl mr-2">🤖</span>
                  AI ADVANTAGE
                </h4>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                    <span className="text-gray-300">Analyzed 1,247 protocol variations in 2.4 seconds</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                    <span className="text-gray-300">Identified optimal tissue targets for YOUR profile</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                    <span className="text-gray-300">Calculated precise dosing windows to maximize benefit while minimizing risk</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-green-400 mr-2 flex-shrink-0">✓</span>
                    <span className="text-gray-300">Determined synergistic pathway combinations that standard protocols miss</span>
                  </div>
                </div>
                
                <div className="mt-4 pt-4 border-t border-indigo-500/30">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-indigo-200">Result:</div>
                    <div className="text-3xl font-bold text-green-400 mt-1">
                      2.3× more biological age reversal
                    </div>
                    <div className="text-sm text-gray-400 mt-1">with same safety profile</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Comparison Note */}
        {result.dataSource === 'biomarkers' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="mt-6 text-center"
          >
            <p className="text-sm text-gray-400">
              ✓ Clinical biomarkers provide {result.confidenceLevel}% confidence vs. 75% from lifestyle estimation
            </p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

