import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Activity, Heart, Brain } from 'lucide-react';
import type { UserInput } from '../utils/biologicalAgeCalculator';

interface LandingPageProps {
  onSubmit: (data: UserInput) => void;
}

export default function LandingPage({ onSubmit }: LandingPageProps) {
  const [formData, setFormData] = useState<UserInput>({
    age: 35,
    exercise: 'moderate',
    sleep: '7-8',
    stress: 5,
    diet: 'good',
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      onSubmit(formData);
    }, 2500);
  };

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
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            What if AI could
            <br />
            <span className="text-gradient">reverse your biological age?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Discover your personalized longevity protocol powered by cutting-edge AI.
            Safe, science-backed, and optimized for your unique biology.
          </p>
        </motion.div>

        {/* Features Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {[
            { icon: Activity, title: 'AI-Optimized', desc: 'Personalized telomerase therapy' },
            { icon: Heart, title: 'Proven Safe', desc: 'Zero oncogenic risk guarantee' },
            { icon: Brain, title: 'Adaptive Learning', desc: 'Protocol updates in real-time' },
          ].map((feature, i) => (
            <div key={i} className="glass rounded-2xl p-6 text-center hover:scale-105 transition-transform">
              <feature.icon className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.desc}</p>
            </div>
          ))}
        </motion.div>

        {/* Form Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="glass rounded-3xl p-8 md:p-12 max-w-3xl mx-auto"
        >
          <h3 className="text-3xl font-bold mb-8 text-center">
            Generate Your Personalized Longevity Protocol
          </h3>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Age Input */}
            <div>
              <label className="block text-sm font-medium mb-2">Age</label>
              <input
                type="number"
                min="18"
                max="100"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                required
              />
            </div>

            {/* Exercise Frequency */}
            <div>
              <label className="block text-sm font-medium mb-2">Exercise Frequency</label>
              <select
                value={formData.exercise}
                onChange={(e) => setFormData({ ...formData, exercise: e.target.value as UserInput['exercise'] })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
              >
                <option value="sedentary">Sedentary (Little to no exercise)</option>
                <option value="light">Light (1-2 days/week)</option>
                <option value="moderate">Moderate (3-4 days/week)</option>
                <option value="heavy">Heavy (5+ days/week)</option>
              </select>
            </div>

            {/* Sleep Hours */}
            <div>
              <label className="block text-sm font-medium mb-2">Average Sleep Hours</label>
              <select
                value={formData.sleep}
                onChange={(e) => setFormData({ ...formData, sleep: e.target.value as UserInput['sleep'] })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
              >
                <option value="<5">Less than 5 hours</option>
                <option value="5-6">5-6 hours</option>
                <option value="7-8">7-8 hours</option>
                <option value="9+">9+ hours</option>
              </select>
            </div>

            {/* Stress Level */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Stress Level: {formData.stress}/10
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={formData.stress}
                onChange={(e) => setFormData({ ...formData, stress: parseInt(e.target.value) })}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer slider"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Low</span>
                <span>High</span>
              </div>
            </div>

            {/* Diet Quality */}
            <div>
              <label className="block text-sm font-medium mb-2">Diet Quality</label>
              <select
                value={formData.diet}
                onChange={(e) => setFormData({ ...formData, diet: e.target.value as UserInput['diet'] })}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
              >
                <option value="poor">Poor (Fast food, processed foods)</option>
                <option value="fair">Fair (Mixed, some healthy choices)</option>
                <option value="good">Good (Mostly whole foods)</option>
                <option value="excellent">Excellent (Optimized nutrition)</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full gradient-primary text-white font-bold py-4 px-8 rounded-xl text-lg hover:shadow-2xl hover:shadow-purple-500/50 transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                  AI analyzing your cellular profile...
                </div>
              ) : (
                'Generate My Longevity Protocol'
              )}
            </button>
          </form>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12 text-gray-400 text-sm"
        >
          <p>Powered by advanced AI • Science-backed protocols • Safe and personalized</p>
        </motion.div>
      </div>

      <style>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
          cursor: pointer;
          border: none;
        }
        
        select {
          color: white;
        }
        
        select option {
          background-color: #1e293b;
          color: white;
        }
      `}</style>
    </div>
  );
}

