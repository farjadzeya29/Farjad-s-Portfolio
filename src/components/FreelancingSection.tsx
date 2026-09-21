import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  Send, 
  Sparkles, 
  Calculator, 
  ArrowRight, 
  FileText, 
  Clock, 
  ShieldCheck,
  Building2,
  Mail,
  User,
  Check
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CLIENT_PAIN_POINTS, HOW_I_CAN_HELP, PROFILE } from '../data/portfolioData';

interface FreelancingSectionProps {
  prefillService?: string;
  onClearPrefill?: () => void;
}

export const FreelancingSection: React.FC<FreelancingSectionProps> = ({ 
  prefillService,
  onClearPrefill,
}) => {
  // Quote Estimator States
  const [estType, setEstType] = useState('Power BI Dashboard');
  const [estComplexity, setEstComplexity] = useState('Multi-source Excel & CSVs');
  const [estDataSize, setEstDataSize] = useState('10k - 100k records');
  const [estViews, setEstViews] = useState('2 - 3 Analytical Views');
  const [estTimeline, setEstTimeline] = useState('Standard (2-3 weeks)');

  // Inquiry Form States
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: prefillService || 'Power BI Dashboard',
    dataSource: 'Excel / CSV spreadsheets',
    datasetSize: '10k - 100k rows',
    deliverable: 'Executive Dashboard + Automated Refresh',
    deadline: 'Within 3-4 weeks',
    budgetRange: '$1,000 - $3,000',
    description: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{
    success: boolean;
    message: string;
    referenceId?: string;
  } | null>(null);

  // When prefillService changes
  React.useEffect(() => {
    if (prefillService) {
      setFormData((prev) => ({ ...prev, projectType: prefillService }));
    }
  }, [prefillService]);

  const handleInquirySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitResult(null);

    try {
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmitResult({
          success: true,
          message: data.message || 'Thank you! Your project inquiry has been received.',
          referenceId: data.referenceId,
        });

        // Trigger celebratory confetti
        try {
          confetti({
            particleCount: 80,
            spread: 60,
            origin: { y: 0.7 },
            colors: ['#10b981', '#06b6d4', '#3b82f6', '#f59e0b'],
          });
        } catch {}

        // Reset text description
        setFormData((prev) => ({ ...prev, description: '' }));
      } else {
        setSubmitResult({
          success: false,
          message: data.error || 'Failed to submit inquiry. Please email Farjad directly.',
        });
      }
    } catch {
      setSubmitResult({
        success: false,
        message: 'Network error. Please email Farjad directly at farjadzeya1234@gmail.com.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const applyEstimatorToForm = () => {
    setFormData((prev) => ({
      ...prev,
      projectType: estType,
      dataSource: estComplexity,
      datasetSize: estDataSize,
      deadline: estTimeline,
    }));
    const target = document.getElementById('inquiry-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="freelance" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#c8c3b7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#54555e] uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18191e]" />
              <span>08 // FREELANCE CONSULTING ENGAGEMENTS</span>
            </div>
            <h2 
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#141519] tracking-tight"
            >
              Need Help With <span className="italic font-normal">Your Business Data?</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4f5058] max-w-2xl leading-relaxed">
              Disorganized spreadsheets and unmonitored KPIs drain dozens of operational hours every week. Here is how we diagnose the problem and build reliable analytics pipelines.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#52535b]">
            <span>AVAILABILITY:</span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#14151a] text-white">
              OPEN FOR Q2 PROJECTS
            </span>
          </div>
        </div>

        {/* Pain Points vs Solutions Split (Bento Pair) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16 items-stretch">
          {/* Pain Points Column (Warm Alabaster) */}
          <div className="p-8 rounded-3xl bg-[#ebe7de] text-[#1c1d22] border border-[#c8c3b7] flex flex-col justify-between shadow-lg">
            <div>
              <div className="text-xs font-mono text-[#743527] uppercase tracking-wider font-bold mb-2">
                // COMMON CLIENT FRICTION POINTS
              </div>
              <h3 
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl font-bold text-[#14151a] mb-6"
              >
                Does Any of This Sound Familiar?
              </h3>
              <div className="space-y-3">
                {CLIENT_PAIN_POINTS.map((point) => (
                  <div
                    key={point}
                    className="p-4 rounded-2xl bg-[#dfd9ce] border border-[#ccc6b9] flex items-start gap-3 text-xs sm:text-sm text-[#2b2c34]"
                  >
                    <span className="text-[#8e382b] font-bold text-base leading-none mt-0.5">•</span>
                    <span className="leading-snug">"{point}"</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#d4cec3] text-xs font-mono text-[#6c6d75]">
              Unaddressed data chaos directly inflates decision turnaround time and operational costs.
            </div>
          </div>

          {/* Solutions Column (Matte Charcoal) */}
          <div className="p-8 rounded-3xl bg-[#14151a] text-[#f4f1ea] border border-[#2b2c35] flex flex-col justify-between shadow-lg">
            <div>
              <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold mb-2">
                // SYSTEMATIC RESOLUTION
              </div>
              <h3 
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl font-bold text-white mb-6"
              >
                How I Can Help Your Business
              </h3>
              <div className="space-y-3">
                {HOW_I_CAN_HELP.map((step) => (
                  <div
                    key={step.step}
                    className="p-4 rounded-2xl bg-[#191b22] border border-[#282a34] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-7 h-7 rounded-xl bg-[#242732] text-emerald-400 font-mono font-bold text-xs flex items-center justify-center border border-[#373a48]">
                        {step.step}
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-white">
                        {step.title}
                      </span>
                    </div>
                    <Check className="w-4 h-4 text-emerald-400" />
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#262832] flex items-center justify-between">
              <span className="text-xs font-mono text-[#8f94a2]">
                End-to-End Governance Guaranteed
              </span>
              <a
                href="#inquiry-form"
                className="text-xs font-bold text-emerald-400 hover:text-emerald-300 font-mono flex items-center gap-1"
              >
                <span>Discuss Scope</span>
                <span>→</span>
              </a>
            </div>
          </div>
        </div>

        {/* Interactive Scope & Estimate Calculator (Bento Container) */}
        <div className="mb-16 rounded-3xl bg-[#ebe7de] text-[#1c1d22] border border-[#c8c3b7] p-8 sm:p-10 shadow-lg">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8 pb-6 border-b border-[#c8c3b7]">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#743527] font-bold mb-1">
                <Calculator className="w-4 h-4" />
                <span>// INTERACTIVE SCOPING CALCULATOR</span>
              </div>
              <h3 
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl sm:text-3xl font-bold text-[#14151a]"
              >
                Project Scope & Requirements Configurator
              </h3>
              <p className="text-xs sm:text-sm text-[#4f5058] mt-1">
                Configure your project requirements to calculate deliverable complexity. All engagements receive transparent, milestones-backed quotes.
              </p>
            </div>
            <button
              onClick={applyEstimatorToForm}
              className="px-5 py-2.5 rounded-full bg-[#14151a] hover:bg-[#2c2e37] text-white font-mono font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap self-start md:self-auto shadow-sm"
            >
              <span>TRANSFER TO INQUIRY</span>
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
            {/* Project Type */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-[#52535b] block font-semibold uppercase">Project Type</label>
              <select
                value={estType}
                onChange={(e) => setEstType(e.target.value)}
                className="w-full bg-[#dfd9ce] border border-[#ccc6b9] text-xs text-[#14151a] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#14151a] font-mono font-medium"
              >
                <option value="Power BI Dashboard">Power BI Dashboard</option>
                <option value="Excel & MIS Reporting">Excel & MIS Reporting</option>
                <option value="SQL Data Analysis">SQL Data Analysis</option>
                <option value="Python EDA & Modeling">Python EDA & Modeling</option>
                <option value="End-to-End Consulting">End-to-End Consulting</option>
              </select>
            </div>

            {/* Data Source Complexity */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-[#52535b] block font-semibold uppercase">Data Sources</label>
              <select
                value={estComplexity}
                onChange={(e) => setEstComplexity(e.target.value)}
                className="w-full bg-[#dfd9ce] border border-[#ccc6b9] text-xs text-[#14151a] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#14151a] font-mono font-medium"
              >
                <option value="Single Clean Excel/CSV">Single Clean Excel/CSV</option>
                <option value="Multi-source Excel & CSVs">Multi-source Excel & CSVs</option>
                <option value="Relational SQL Database">Relational SQL Database</option>
                <option value="Unstructured / Messy Logs">Unstructured / Messy Logs</option>
              </select>
            </div>

            {/* Record Count */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-[#52535b] block font-semibold uppercase">Dataset Volume</label>
              <select
                value={estDataSize}
                onChange={(e) => setEstDataSize(e.target.value)}
                className="w-full bg-[#dfd9ce] border border-[#ccc6b9] text-xs text-[#14151a] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#14151a] font-mono font-medium"
              >
                <option value="< 10k records">&lt; 10k records</option>
                <option value="10k - 100k records">10k - 100k records</option>
                <option value="100k - 1M records">100k - 1M records</option>
                <option value="1M+ records">1M+ records (Big Data)</option>
              </select>
            </div>

            {/* Views Required */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-[#52535b] block font-semibold uppercase">Deliverables</label>
              <select
                value={estViews}
                onChange={(e) => setEstViews(e.target.value)}
                className="w-full bg-[#dfd9ce] border border-[#ccc6b9] text-xs text-[#14151a] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#14151a] font-mono font-medium"
              >
                <option value="1 Executive Summary Page">1 Executive Summary Page</option>
                <option value="2 - 3 Analytical Views">2 - 3 Analytical Views</option>
                <option value="4+ Comprehensive Suite">4+ Comprehensive Suite</option>
                <option value="Full MIS Automation Script">Full MIS Automation Script</option>
              </select>
            </div>

            {/* Timeline */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-mono text-[#52535b] block font-semibold uppercase">Desired Delivery</label>
              <select
                value={estTimeline}
                onChange={(e) => setEstTimeline(e.target.value)}
                className="w-full bg-[#dfd9ce] border border-[#ccc6b9] text-xs text-[#14151a] rounded-xl px-3 py-2.5 focus:outline-none focus:border-[#14151a] font-mono font-medium"
              >
                <option value="Rush (1 week)">Rush (1 week)</option>
                <option value="Standard (2-3 weeks)">Standard (2-3 weeks)</option>
                <option value="Flexible (4+ weeks)">Flexible (4+ weeks)</option>
              </select>
            </div>
          </div>

          {/* Scoped Advisory Summary Pill */}
          <div className="p-4 rounded-2xl bg-[#dfd9ce] border border-[#ccc6b9] flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#14151a] text-emerald-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-[#3a3b42]">
                <span className="text-[#14151a] font-bold">Scoped Recommendation: </span>
                Custom milestone contract with fixed deliverables, DAX/SQL code handover, and 14-day post-delivery warranty.
              </div>
            </div>
            <span className="text-[#14151a] font-bold whitespace-nowrap bg-[#ebe7de] px-3 py-1 rounded-full border border-[#c8c3b7]">
              Proposal within 24h
            </span>
          </div>
        </div>

        {/* Project Inquiry Form (Matte Charcoal Dossier) */}
        <div id="inquiry-form" className="rounded-3xl bg-[#14151a] text-[#f4f1ea] border border-[#2b2c35] p-8 sm:p-12 shadow-2xl">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#20222a] border border-[#31333f] text-emerald-400 text-xs font-mono font-medium mb-3">
              <FileText className="w-3.5 h-3.5" />
              <span>PROJECT INTAKE QUESTIONNAIRE</span>
            </div>
            <h3 
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-2xl sm:text-3xl font-bold text-white tracking-tight"
            >
              Start Your Analytics Project
            </h3>
            <p className="text-xs sm:text-sm text-[#9ca3af] mt-2 leading-relaxed font-sans">
              Share details about your dataset, analytical objectives, and desired delivery date. You will receive a direct technical response and proposal from Farjad within 24 hours.
            </p>
          </div>

          {submitResult && (
            <div
              className={`p-6 rounded-2xl mb-8 border ${
                submitResult.success
                  ? 'bg-emerald-950/40 border-emerald-500/50 text-emerald-300'
                  : 'bg-rose-950/40 border-rose-500/50 text-rose-300'
              }`}
            >
              <div className="flex items-center gap-3">
                {submitResult.success ? (
                  <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0" />
                ) : (
                  <ShieldCheck className="w-6 h-6 text-rose-400 shrink-0" />
                )}
                <div>
                  <h4 className="font-bold text-base text-white">
                    {submitResult.success ? 'Inquiry Submitted Successfully' : 'Submission Error'}
                  </h4>
                  <p className="text-xs sm:text-sm mt-1">{submitResult.message}</p>
                  {submitResult.referenceId && (
                    <div className="text-xs font-mono text-emerald-400 mt-2">
                      Reference ID: {submitResult.referenceId}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleInquirySubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-mono text-[#cbd5e1] mb-2">
                  Your Full Name <span className="text-rose-400">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#191b22] border border-[#2e303b] rounded-xl px-4 py-3 text-xs text-white placeholder-[#686d7c] focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#cbd5e1] mb-2">
                  Business Email <span className="text-rose-400">*</span>
                </label>
                <input
                  type="email"
                  required
                  placeholder="alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#191b22] border border-[#2e303b] rounded-xl px-4 py-3 text-xs text-white placeholder-[#686d7c] focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#cbd5e1] mb-2">
                  Company / Organization
                </label>
                <input
                  type="text"
                  placeholder="e.g. Retail Corp"
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full bg-[#191b22] border border-[#2e303b] rounded-xl px-4 py-3 text-xs text-white placeholder-[#686d7c] focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <div>
                <label className="block text-xs font-mono text-[#cbd5e1] mb-2">
                  Project Type
                </label>
                <select
                  value={formData.projectType}
                  onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                  className="w-full bg-[#191b22] border border-[#2e303b] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                >
                  <option value="Power BI Dashboard">Power BI Dashboard</option>
                  <option value="Excel & MIS Reporting">Excel & MIS Reporting</option>
                  <option value="SQL Data Analysis">SQL Data Analysis</option>
                  <option value="Python EDA & Modeling">Python EDA & Modeling</option>
                  <option value="Data Cleaning & ETL">Data Cleaning & ETL</option>
                  <option value="Business KPI Reporting">Business KPI Reporting</option>
                  <option value="Sales & Customer Analytics">Sales & Customer Analytics</option>
                  <option value="Automated Reporting Pipeline">Automated Reporting Pipeline</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#cbd5e1] mb-2">
                  Primary Data Source
                </label>
                <select
                  value={formData.dataSource}
                  onChange={(e) => setFormData({ ...formData, dataSource: e.target.value })}
                  className="w-full bg-[#191b22] border border-[#2e303b] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                >
                  <option value="Excel / CSV spreadsheets">Excel / CSV spreadsheets</option>
                  <option value="PostgreSQL / MySQL database">PostgreSQL / MySQL database</option>
                  <option value="Google Sheets / Cloud Drive">Google Sheets / Cloud Drive</option>
                  <option value="CRM (HubSpot, Salesforce)">CRM (HubSpot, Salesforce)</option>
                  <option value="ERP / Accounting software export">ERP / Accounting software export</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-[#cbd5e1] mb-2">
                  Estimated Dataset Size
                </label>
                <select
                  value={formData.datasetSize}
                  onChange={(e) => setFormData({ ...formData, datasetSize: e.target.value })}
                  className="w-full bg-[#191b22] border border-[#2e303b] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                >
                  <option value="Under 10,000 rows">Under 10,000 rows</option>
                  <option value="10k - 100k rows">10k - 100k rows</option>
                  <option value="100k - 1M rows">100k - 1M rows</option>
                  <option value="1M+ rows">1M+ rows</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-mono text-[#cbd5e1] mb-2">
                  Desired Timeline / Deadline
                </label>
                <input
                  type="text"
                  placeholder="e.g. Completed within 3 weeks"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full bg-[#191b22] border border-[#2e303b] rounded-xl px-4 py-3 text-xs text-white placeholder-[#686d7c] focus:outline-none focus:border-emerald-500 font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-[#cbd5e1] mb-2">
                  Target Budget Guidance
                </label>
                <select
                  value={formData.budgetRange}
                  onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value })}
                  className="w-full bg-[#191b22] border border-[#2e303b] rounded-xl px-4 py-3 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                >
                  <option value="Under $1,000">Under $1,000 (Small sprint / single report)</option>
                  <option value="$1,000 - $3,000">$1,000 - $3,000 (Standard dashboard + ETL)</option>
                  <option value="$3,000 - $7,000">$3,000 - $7,000 (Comprehensive analytics suite)</option>
                  <option value="$7,000+">$7,000+ (Enterprise ongoing retainer)</option>
                  <option value="Request Quote">Request Custom Proposal</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#cbd5e1] mb-2">
                Project Overview & Business Goal <span className="text-rose-400">*</span>
              </label>
              <textarea
                required
                rows={4}
                placeholder="Briefly describe what your data looks like, what decisions you want to make, or what current reporting bottlenecks you face..."
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="w-full bg-[#191b22] border border-[#2e303b] rounded-xl p-4 text-xs text-white placeholder-[#686d7c] focus:outline-none focus:border-emerald-500 leading-relaxed font-sans"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#262832]">
              <div className="text-xs font-mono text-[#8f94a2] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>NDA & Client Data Confidentiality Guaranteed</span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#f4f1ea] hover:bg-white text-[#14151a] font-mono font-bold text-xs shadow-md flex items-center justify-center gap-2 transition-all disabled:opacity-50 cursor-pointer"
              >
                <span>{isSubmitting ? 'SUBMITTING SCOPE...' : 'SUBMIT PROJECT INQUIRY'}</span>
                <Send className="w-3.5 h-3.5 text-emerald-600" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
