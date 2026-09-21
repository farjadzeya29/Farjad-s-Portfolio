import React, { useState } from 'react';
import { 
  FileCode2, 
  ArrowRight, 
  Check, 
  Play, 
  Layers, 
  Database, 
  Cpu, 
  BarChart, 
  Lightbulb, 
  CheckCircle,
  Terminal,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { DATA_JOURNEY_STEPS } from '../data/portfolioData';

export const DataTransformationStory: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = DATA_JOURNEY_STEPS[activeStepIndex];

  const stepIcons = [
    Database,
    Cpu,
    FileCode2,
    Terminal,
    BarChart,
    Lightbulb,
    CheckCircle,
  ];

  return (
    <section id="journey" className="py-20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Editorial Style */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#c8c3b7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#54555e] uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18191e]" />
              <span>02 // RIGOROUS METHODOLOGY</span>
            </div>
            <h2 
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#141519] tracking-tight"
            >
              From Raw Data to <span className="italic font-normal">Business Decisions</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4f5058] max-w-2xl leading-relaxed">
              Data transformation is not magic — it is a disciplined, 7-stage analytical pipeline. 
              Observe how noisy records convert into structured executive intelligence.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-[#63646d] uppercase tracking-wider">
              PIPELINE INTEGRITY:
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#14151a] text-white border border-[#2b2d35]">
              VERIFIED 100%
            </span>
          </div>
        </div>

        {/* 7-Step Horizontal Editorial Tab Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 mb-8">
          {DATA_JOURNEY_STEPS.map((s, idx) => {
            const isSelected = activeStepIndex === idx;
            const Icon = stepIcons[idx];
            return (
              <button
                key={s.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`p-3.5 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-[#14151a] text-[#f4f1ea] border-[#14151a] shadow-lg scale-[1.02]'
                    : 'bg-[#ebe7de] text-[#1c1d22] border-[#c8c3b7] hover:border-[#96938a] hover:bg-[#e4dfd5]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-mono font-bold ${
                    isSelected ? 'text-emerald-400' : 'text-[#6e6e76]'
                  }`}>
                    0{s.step} //
                  </span>
                  <Icon className={`w-3.5 h-3.5 ${
                    isSelected ? 'text-emerald-400' : 'text-[#7e7e88] group-hover:text-[#1c1d22]'
                  }`} />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-tight line-clamp-1">
                    {s.title}
                  </div>
                  <div className={`text-[10px] font-mono truncate mt-0.5 ${
                    isSelected ? 'text-[#a3a8b5]' : 'text-[#64656d]'
                  }`}>
                    {s.subtitle}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Transformation Stage Viewport - Bento Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Column: Context & Narrative (Warm Alabaster Card) */}
          <div className="lg:col-span-5 p-7 sm:p-9 rounded-3xl bg-[#ebe7de] border border-[#c8c3b7] shadow-sm flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between gap-2 font-mono text-xs text-[#52535a] mb-4">
                <span className="uppercase tracking-wider font-semibold">STAGE 0{currentStep.step} OF 07</span>
                <span className="px-2.5 py-1 rounded-full bg-[#dfd9ce] text-[#22232a] border border-[#beb9ad] text-[10px] font-bold">
                  {currentStep.status}
                </span>
              </div>
              <h3 
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl sm:text-3xl font-bold text-[#141519] mb-2"
              >
                {currentStep.title}
              </h3>
              <p className="text-xs font-mono text-[#743527] font-semibold mb-4 tracking-wide uppercase">
                // {currentStep.subtitle}
              </p>
              <p className="text-sm text-[#43444c] leading-relaxed mb-6 font-sans">
                {currentStep.description}
              </p>
            </div>

            {/* Step navigation buttons */}
            <div className="pt-6 border-t border-[#d3cdc2] flex items-center justify-between">
              <button
                onClick={() => setActiveStepIndex((prev) => Math.max(0, prev - 1))}
                disabled={activeStepIndex === 0}
                className="px-4 py-2 text-xs font-mono font-semibold text-[#3b3c43] hover:text-[#141519] rounded-full border border-[#bbb5a7] disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-colors hover:bg-[#ded8cc]"
              >
                ← PREVIOUS
              </button>
              <span className="text-xs font-mono font-bold text-[#5c5d66]">
                0{activeStepIndex + 1} / 0{DATA_JOURNEY_STEPS.length}
              </span>
              <button
                onClick={() => setActiveStepIndex((prev) => Math.min(DATA_JOURNEY_STEPS.length - 1, prev + 1))}
                disabled={activeStepIndex === DATA_JOURNEY_STEPS.length - 1}
                className="px-5 py-2 text-xs font-mono font-bold text-white bg-[#14151a] hover:bg-[#2c2e36] rounded-full flex items-center gap-1.5 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer transition-all shadow-sm"
              >
                <span>NEXT STAGE</span>
                <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
              </button>
            </div>
          </div>

          {/* Right Column: Code / Data Transformation Mock Window (Matte Ink Charcoal) */}
          <div className="lg:col-span-7 rounded-3xl bg-[#14151a] border border-[#2b2c34] overflow-hidden flex flex-col shadow-xl">
            {/* Terminal Header */}
            <div className="px-5 py-3.5 bg-[#1b1c22] border-b border-[#292b34] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#f59e0b]" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#10b981]" />
                <span className="text-xs font-mono text-[#9ca3af] ml-2">
                  farjad-analytics // stage_0{currentStep.step}_{currentStep.title.toLowerCase().replace(/\s+/g, '_')}
                </span>
              </div>
              <div className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/40">
                ACTIVE PIPELINE
              </div>
            </div>

            {/* Terminal Code / Data Content with AnimatePresence */}
            <div className="p-6 font-mono text-xs text-[#e5e7eb] flex-1 overflow-x-auto bg-[#14151a]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep.step}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.15 }}
                  className="space-y-3"
                >
                  <pre className="text-[#d1d5db] leading-relaxed font-mono whitespace-pre-wrap selection:bg-[#374151]">
                    {currentStep.sampleData}
                  </pre>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Footer metric badge */}
            <div className="px-6 py-3.5 bg-[#181920] border-t border-[#262832] flex items-center justify-between text-[11px] font-mono text-[#94a3b8]">
              <div className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span>Deterministic integrity: 100% verified</span>
              </div>
              <div className="text-[#64748b]">
                UTF-8 • ISO 8601 Standardized
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
