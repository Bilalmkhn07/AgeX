import { motion } from 'framer-motion';
import { Target, Award, Activity, Shield } from 'lucide-react';
import type { CalculationResult } from '../utils/biologicalAgeCalculator';

interface MetricsSummaryProps {
  result: CalculationResult;
}

export default function MetricsSummary({ result }: MetricsSummaryProps) {
  const { metrics, healthspanGain } = result;

  const metricCards = [
    {
      icon: Target,
      label: 'Protocol Confidence',
      value: `${metrics.protocolConfidence}%`,
      color: 'from-purple-500 to-pink-500',
      bgColor: 'from-purple-900/30 to-pink-900/30',
      borderColor: 'border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      icon: Award,
      label: 'Predicted Healthspan Gain',
      value: `+${healthspanGain.toFixed(1)} years`,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'from-green-900/30 to-emerald-900/30',
      borderColor: 'border-green-500/30',
      iconColor: 'text-green-400',
    },
    {
      icon: Activity,
      label: 'Cellular Reversal Score',
      value: `${metrics.cellularRejuvenationScore}/100`,
      color: 'from-cyan-500 to-blue-500',
      bgColor: 'from-cyan-900/30 to-blue-900/30',
      borderColor: 'border-cyan-500/30',
      iconColor: 'text-cyan-400',
    },
    {
      icon: Shield,
      label: 'Optimization Cycles Completed',
      value: metrics.optimizationCycles.toLocaleString(),
      color: 'from-amber-500 to-orange-500',
      bgColor: 'from-amber-900/30 to-orange-900/30',
      borderColor: 'border-amber-500/30',
      iconColor: 'text-amber-400',
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.7 }}
      className="mb-12"
    >
      <h2 className="text-3xl font-bold mb-6 text-center">Key Metrics Summary</h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metricCards.map((metric, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 + index * 0.1 }}
            whileHover={{ scale: 1.05 }}
            className={`glass rounded-2xl p-6 bg-gradient-to-br ${metric.bgColor} border ${metric.borderColor} cursor-pointer`}
          >
            <div className="flex items-center justify-between mb-4">
              <metric.icon className={`w-8 h-8 ${metric.iconColor}`} />
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 1,
                }}
                className={`w-2 h-2 rounded-full bg-gradient-to-r ${metric.color}`}
              />
            </div>
            
            <div className="mb-2">
              <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                {metric.value}
              </div>
            </div>
            
            <div className="text-sm text-gray-400">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

