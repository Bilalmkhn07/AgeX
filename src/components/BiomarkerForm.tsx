import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, FileText } from 'lucide-react';
import type { BiomarkerData } from '../utils/biologicalAgeCalculator';

interface BiomarkerFormProps {
  onSubmit: (age: number, biomarkers: BiomarkerData) => void;
  onBack: () => void;
}

export default function BiomarkerForm({ onSubmit, onBack }: BiomarkerFormProps) {
  const [age, setAge] = useState(37);
  const [biomarkers, setBiomarkers] = useState<BiomarkerData>({
    telomereLength: 7.8,
    epigeneticAge: 40,
    crp: 1.8,
    hba1c: 5.4,
    fastingGlucose: 92,
    totalCholesterol: 195,
    hdl: 55,
    ldl: 115,
    wbc: 7200,
    mitochondrialDNA: 1350,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [uploadMode, setUploadMode] = useState<'upload' | 'manual'>('manual');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate AI processing time
    setTimeout(() => {
      onSubmit(age, biomarkers);
    }, 2500);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Placeholder for file upload logic
    const file = e.target.files?.[0];
    if (file) {
      alert('File upload feature coming soon! For now, please use manual entry.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
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
          <h2 className="text-4xl font-bold mb-4">Clinical Biomarker Entry</h2>
          <p className="text-gray-400 mb-8">Enter your lab results for the most accurate protocol</p>

          {/* Upload vs Manual Toggle */}
          <div className="flex space-x-4 mb-8">
            <button
              onClick={() => setUploadMode('upload')}
              className={`flex-1 py-3 px-6 rounded-xl flex items-center justify-center transition-all ${
                uploadMode === 'upload'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              <Upload className="w-5 h-5 mr-2" />
              Upload PDF/CSV
            </button>
            <button
              onClick={() => setUploadMode('manual')}
              className={`flex-1 py-3 px-6 rounded-xl flex items-center justify-center transition-all ${
                uploadMode === 'manual'
                  ? 'bg-purple-500 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              <FileText className="w-5 h-5 mr-2" />
              Manual Entry
            </button>
          </div>

          {uploadMode === 'upload' ? (
            /* Upload Zone */
            <div className="border-2 border-dashed border-purple-500/50 rounded-xl p-12 text-center bg-purple-900/20 hover:bg-purple-900/30 transition-all cursor-pointer">
              <input
                type="file"
                accept=".pdf,.csv"
                onChange={handleFileUpload}
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload className="w-16 h-16 text-purple-400 mx-auto mb-4" />
                <p className="text-xl font-semibold mb-2">Drop your lab results here</p>
                <p className="text-gray-400 text-sm">or click to browse (PDF, CSV)</p>
              </label>
            </div>
          ) : (
            /* Manual Entry Form */
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Age */}
              <div>
                <label className="block text-sm font-medium mb-2">Chronological Age (years)</label>
                <input
                  type="number"
                  min="18"
                  max="100"
                  value={age}
                  onChange={(e) => setAge(parseInt(e.target.value))}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                  required
                />
              </div>

              {/* Biomarkers Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Telomere Length */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Telomere Length (kb)
                    <span className="text-xs text-gray-400 ml-2">Normal: 7-10</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="3"
                    max="15"
                    value={biomarkers.telomereLength}
                    onChange={(e) => setBiomarkers({ ...biomarkers, telomereLength: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                    required
                  />
                </div>

                {/* Epigenetic Age */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Epigenetic Age (years)
                    <span className="text-xs text-gray-400 ml-2">DNA methylation</span>
                  </label>
                  <input
                    type="number"
                    min="18"
                    max="120"
                    value={biomarkers.epigeneticAge}
                    onChange={(e) => setBiomarkers({ ...biomarkers, epigeneticAge: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                    required
                  />
                </div>

                {/* C-Reactive Protein */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    C-Reactive Protein (mg/L)
                    <span className="text-xs text-gray-400 ml-2">Inflammation</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="50"
                    value={biomarkers.crp}
                    onChange={(e) => setBiomarkers({ ...biomarkers, crp: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                    required
                  />
                </div>

                {/* HbA1c */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    HbA1c (%)
                    <span className="text-xs text-gray-400 ml-2">Glucose control</span>
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    min="3"
                    max="15"
                    value={biomarkers.hba1c}
                    onChange={(e) => setBiomarkers({ ...biomarkers, hba1c: parseFloat(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                    required
                  />
                </div>

                {/* Fasting Glucose */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Fasting Glucose (mg/dL)
                  </label>
                  <input
                    type="number"
                    min="40"
                    max="400"
                    value={biomarkers.fastingGlucose}
                    onChange={(e) => setBiomarkers({ ...biomarkers, fastingGlucose: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                    required
                  />
                </div>

                {/* Total Cholesterol */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Total Cholesterol (mg/dL)
                  </label>
                  <input
                    type="number"
                    min="100"
                    max="400"
                    value={biomarkers.totalCholesterol}
                    onChange={(e) => setBiomarkers({ ...biomarkers, totalCholesterol: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                    required
                  />
                </div>

                {/* HDL */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    HDL Cholesterol (mg/dL)
                    <span className="text-xs text-gray-400 ml-2">"Good" cholesterol</span>
                  </label>
                  <input
                    type="number"
                    min="20"
                    max="150"
                    value={biomarkers.hdl}
                    onChange={(e) => setBiomarkers({ ...biomarkers, hdl: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                    required
                  />
                </div>

                {/* LDL */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    LDL Cholesterol (mg/dL)
                    <span className="text-xs text-gray-400 ml-2">"Bad" cholesterol</span>
                  </label>
                  <input
                    type="number"
                    min="20"
                    max="300"
                    value={biomarkers.ldl}
                    onChange={(e) => setBiomarkers({ ...biomarkers, ldl: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                    required
                  />
                </div>

                {/* WBC */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    White Blood Cells (cells/μL)
                  </label>
                  <input
                    type="number"
                    min="1000"
                    max="20000"
                    value={biomarkers.wbc}
                    onChange={(e) => setBiomarkers({ ...biomarkers, wbc: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                    required
                  />
                </div>

                {/* Mitochondrial DNA */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Mitochondrial DNA (copies)
                    <span className="text-xs text-gray-400 ml-2">Per cell</span>
                  </label>
                  <input
                    type="number"
                    min="500"
                    max="3000"
                    value={biomarkers.mitochondrialDNA}
                    onChange={(e) => setBiomarkers({ ...biomarkers, mitochondrialDNA: parseInt(e.target.value) })}
                    className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-400/50 transition-all"
                    required
                  />
                </div>
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
                  'Generate My Precision Protocol'
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}

