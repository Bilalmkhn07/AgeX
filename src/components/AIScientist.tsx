import { motion } from 'framer-motion';
import { BookOpen, Sparkles, TrendingUp, CheckCircle } from 'lucide-react';

export default function AIScientist() {
  const today = new Date();
  const recentDates = [
    new Date(today.setDate(today.getDate() - 2)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    new Date(today.setDate(today.getDate() - 5)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    new Date(today.setDate(today.getDate() - 8)).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
  ];

  const researchUpdates = [
    {
      date: recentDates[0],
      title: 'Novel TERT expression optimization discovered',
      description: 'New methylation pattern improves cellular uptake by 34%',
      impact: 'High',
      icon: '🧬',
    },
    {
      date: recentDates[1],
      title: 'Mitochondrial co-activation pathway identified',
      description: 'Synergistic effects with NAD+ precursors enhance longevity markers',
      impact: 'Medium',
      icon: '⚡',
    },
    {
      date: recentDates[2],
      title: 'Enhanced LNP delivery mechanism validated',
      description: 'Tissue-specific targeting reduces systemic exposure',
      impact: 'High',
      icon: '🎯',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="mb-12"
    >
      <div className="glass rounded-3xl p-8 md:p-12">
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center mb-2">
              <BookOpen className="w-10 h-10 text-amber-400 mr-4" />
              <h2 className="text-3xl font-bold">AI Longevity Scientist</h2>
            </div>
            <p className="text-gray-400">Continuously learning from cutting-edge research</p>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          >
            <Sparkles className="w-10 h-10 text-amber-400" />
          </motion.div>
        </div>

        {/* Stats Banner */}
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-amber-400 mb-1">1,247</div>
            <div className="text-sm text-gray-400">Papers scanned today</div>
          </div>
          <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-green-400 mb-1">23</div>
            <div className="text-sm text-gray-400">Protocols updated this week</div>
          </div>
          <div className="bg-purple-500/10 border border-purple-500/30 rounded-xl p-4 text-center">
            <div className="text-3xl font-bold text-purple-400 mb-1">99.8%</div>
            <div className="text-sm text-gray-400">Research coverage</div>
          </div>
        </div>

        {/* Research Updates Feed */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 text-green-400 mr-2" />
            Latest Research Integrated
          </h3>
          
          {researchUpdates.map((update, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.15 }}
              className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-purple-500/30 transition-all"
            >
              <div className="flex items-start">
                <div className="text-4xl mr-4">{update.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center">
                      <span className="text-xs text-gray-400 mr-3">{update.date}</span>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        update.impact === 'High' 
                          ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                          : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                      }`}>
                        {update.impact} Impact
                      </span>
                    </div>
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">{update.title}</h4>
                  <p className="text-gray-400 text-sm">{update.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Explanation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 bg-gradient-to-r from-amber-900/30 to-orange-900/30 border border-amber-500/30 rounded-xl p-6"
        >
          <div className="flex items-start">
            <Sparkles className="w-6 h-6 text-amber-400 mr-3 flex-shrink-0 mt-1" />
            <div>
              <h4 className="text-lg font-semibold text-amber-400 mb-2">Continuous Intelligence</h4>
              <p className="text-gray-300 text-sm leading-relaxed">
                Our AI scientist scans over 1,000 peer-reviewed papers daily from PubMed, bioRxiv, and Nature journals. 
                When breakthrough discoveries are validated, your protocol is automatically updated to incorporate the latest science. 
                You always have access to the cutting edge of longevity research.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

