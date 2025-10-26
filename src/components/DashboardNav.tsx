import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Dna, Pill, TrendingUp, Microscope, Shield, Download, Share2, ArrowLeft, ChevronRight } from 'lucide-react';

interface DashboardNavProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  onReset: () => void;
}

interface NavSection {
  id: string;
  icon: React.ElementType;
  label: string;
  subsections?: { id: string; label: string }[];
}

const navSections: NavSection[] = [
  {
    id: 'overview',
    icon: BarChart3,
    label: 'Overview',
  },
  {
    id: 'biology',
    icon: Dna,
    label: 'Your Biology',
    subsections: [
      { id: 'biomarkers', label: 'Biomarkers' },
      { id: 'health-issues', label: 'Health Issues' },
      { id: 'age-analysis', label: 'Age Analysis' },
    ],
  },
  {
    id: 'protocol',
    icon: Pill,
    label: 'Your Protocol',
    subsections: [
      { id: 'formula', label: 'Formula Details' },
      { id: 'dosing', label: 'Dosing & Schedule' },
      { id: 'targets', label: 'Targets & Tissues' },
    ],
  },
  {
    id: 'results',
    icon: TrendingUp,
    label: 'Results',
    subsections: [
      { id: 'age-reversal', label: 'Age Reversal' },
      { id: 'timeline', label: 'Timeline' },
      { id: 'benefits', label: 'Health Benefits' },
    ],
  },
  {
    id: 'science',
    icon: Microscope,
    label: 'The Science',
    subsections: [
      { id: 'ai-advantage', label: 'AI Advantage' },
      { id: 'mechanisms', label: 'Mechanisms' },
    ],
  },
  {
    id: 'safety',
    icon: Shield,
    label: 'Safety & Adaptive',
    subsections: [
      { id: 'cancer-risk', label: 'Cancer Risk' },
      { id: 'adaptive', label: 'Adaptive Learning' },
    ],
  },
];

export default function DashboardNav({ activeSection, onSectionClick, onReset }: DashboardNavProps) {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['biology', 'protocol', 'results', 'science', 'safety']));

  useEffect(() => {
    // Auto-expand section containing active subsection
    navSections.forEach(section => {
      if (section.subsections?.some(sub => sub.id === activeSection)) {
        setExpandedSections(prev => new Set([...prev, section.id]));
      }
    });
  }, [activeSection]);

  const toggleSection = (sectionId: string) => {
    setExpandedSections(prev => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const handleSectionClick = (sectionId: string, hasSubsections: boolean) => {
    if (hasSubsections) {
      toggleSection(sectionId);
    } else {
      onSectionClick(sectionId);
    }
  };

  const isActive = (id: string) => {
    return activeSection === id || (navSections.find(s => s.id === activeSection)?.subsections?.some(sub => sub.id === id));
  };

  return (
    <div className="fixed left-0 top-0 h-screen w-64 bg-gradient-to-b from-slate-900 via-purple-900/30 to-slate-900 border-r border-purple-500/20 overflow-y-auto z-50">
      <div className="p-4">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-white mb-0.5">Your Protocol</h2>
          <p className="text-xs text-gray-400">Navigate your report</p>
        </div>

        {/* Navigation Sections */}
        <nav className="space-y-1.5 mb-6">
          {navSections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections.has(section.id);
            const isSectionActive = isActive(section.id);

            return (
              <div key={section.id}>
                {/* Main Section */}
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={() => handleSectionClick(section.id, !!section.subsections)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all ${
                    isSectionActive
                      ? 'bg-gradient-to-r from-purple-500/30 to-cyan-500/30 border-l-3 border-cyan-400'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center">
                    <Icon className={`w-4 h-4 mr-2 ${isSectionActive ? 'text-cyan-400' : 'text-gray-400'}`} />
                    <span className={`text-xs font-medium ${isSectionActive ? 'text-white' : 'text-gray-300'}`}>
                      {section.label}
                    </span>
                  </div>
                  {section.subsections && (
                    <ChevronRight
                      className={`w-3 h-3 text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                    />
                  )}
                </motion.button>

                {/* Subsections */}
                {section.subsections && isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="ml-6 mt-0.5 space-y-0.5"
                  >
                    {section.subsections.map((subsection) => {
                      const isSubActive = activeSection === subsection.id;
                      return (
                        <motion.button
                          key={subsection.id}
                          whileHover={{ x: 4 }}
                          onClick={() => onSectionClick(subsection.id)}
                          className={`w-full text-left px-3 py-1.5 rounded-lg text-xs transition-all ${
                            isSubActive
                              ? 'bg-cyan-500/20 text-cyan-400 font-medium border-l-2 border-cyan-400'
                              : 'text-gray-400 hover:text-gray-300 hover:bg-white/5'
                          }`}
                        >
                          {subsection.label}
                        </motion.button>
                      );
                    })}
                  </motion.div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="space-y-2 pt-4 border-t border-white/10">
          <button className="w-full glass px-3 py-2 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all text-xs">
            <Download className="w-3.5 h-3.5 mr-1.5" />
            Export PDF
          </button>
          <button className="w-full glass px-3 py-2 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all text-xs">
            <Share2 className="w-3.5 h-3.5 mr-1.5" />
            Share Report
          </button>
          <button
            onClick={onReset}
            className="w-full px-3 py-2 rounded-lg flex items-center justify-center hover:bg-white/10 transition-all text-xs text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1.5" />
            Start Over
          </button>
        </div>

        {/* Progress Indicator */}
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="text-xs text-gray-400 mb-1.5">Report Progress</div>
          <div className="w-full bg-slate-700 rounded-full h-1.5">
            <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-1.5 rounded-full transition-all" style={{ width: '60%' }}></div>
          </div>
          <div className="text-xs text-gray-500 mt-1">60% explored</div>
        </div>
      </div>
    </div>
  );
}

