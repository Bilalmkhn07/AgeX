import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import type { UserInput } from '../utils/biologicalAgeCalculator';

interface LifestyleFormProps {
  onSubmit: (data: UserInput) => void;
  onBack: () => void;
}

export default function LifestyleForm({ onSubmit, onBack }: LifestyleFormProps) {
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
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-3xl">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="flex items-center text-gray-400 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to options
        </button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-8 md:p-12"
        >
          <h2 className="text-4xl font-bold mb-4">Lifestyle-Based Estimation</h2>
          <p className="text-gray-400 mb-2">AI will estimate your biological age from lifestyle factors</p>
          <p className="text-sm text-yellow-400 mb-8">
            Note: Upload lab results for 10x more accurate protocols (95% vs 75% confidence)
          </p>

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
                  AI estimating your biological age...
                </div>
              ) : (
                'Estimate My Longevity Protocol'
              )}
            </button>
          </form>
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

