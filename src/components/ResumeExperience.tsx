import React, { useState } from 'react';
import { 
  FileText, 
  Download, 
  Briefcase, 
  GraduationCap, 
  Award, 
  CheckCircle2, 
  ArrowUpRight, 
  Code2, 
  Calendar, 
  MapPin, 
  Building, 
  Eye, 
  Copy, 
  Check, 
  Sparkles,
  ExternalLink,
  ChevronDown,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  PROFILE, 
  EXPERIENCE, 
  SKILLS_DATA, 
  CERTIFICATIONS, 
  EDUCATION,
  CAPABILITY_OUTCOMES 
} from '../data/portfolioData';

export const ResumeExperience: React.FC = () => {
  const [activeSkillCategory, setActiveSkillCategory] = useState<string>('All');
  const [selectedSkill, setSelectedSkill] = useState(SKILLS_DATA[0]);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [activeExpYear, setActiveExpYear] = useState<string>('All');

  const categories = ['All', 'Core Tools', 'Libraries', 'Methodologies', 'Domain'];

  const filteredSkills = SKILLS_DATA.filter(
    (s) => activeSkillCategory === 'All' || s.category === activeSkillCategory
  );

  const handleCopyResume = () => {
    const resumePlainText = `FARJAD ZEYA - DATA ANALYST & BUSINESS INTELLIGENCE FREELANCER
Email: ${PROFILE.email} | Phone: ${PROFILE.phone} | Location: ${PROFILE.location}

ABOUT
${PROFILE.bio}

CORE SKILLS
Tools: Power BI, Advanced Excel, SQL (PostgreSQL, MySQL), Python (Pandas, NumPy)
Specialties: Data Cleaning, EDA, RFM Segmentation, KPI Dashboards, MIS Automation

EXPERIENCE
${EXPERIENCE.map(e => `${e.role} | ${e.company} (${e.period})
${e.bullets.map(b => `- ${b}`).join('\n')}`).join('\n\n')}

EDUCATION
${EDUCATION.degree}, ${EDUCATION.institution} (${EDUCATION.period})

CERTIFICATIONS
${CERTIFICATIONS.map(c => `- ${c.name} (${c.issuer})`).join('\n')}`;

    navigator.clipboard.writeText(resumePlainText);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2500);
  };

  const handlePrintResume = () => {
    window.print();
  };

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#c8c3b7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#54555e] uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18191e]" />
              <span>06 // BIOGRAPHY & TECHNICAL REPERTOIRE</span>
            </div>
            <h2 
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#141519] tracking-tight"
            >
              Biography, Stack & <span className="italic font-normal">Track Record</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4f5058] max-w-2xl leading-relaxed">
              "Data Analyst focused on transforming operational and business data into clear, auditable dashboards and executive decisions."
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setResumeModalOpen(true)}
              className="px-5 py-2.5 rounded-full bg-[#14151a] hover:bg-[#2b2d35] text-white text-xs font-mono font-bold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-emerald-400" />
              <span>PREVIEW CV</span>
            </button>
            <button
              onClick={handleCopyResume}
              className="px-4 py-2.5 rounded-full bg-[#ebe7de] hover:bg-[#ded9cb] text-[#1c1d22] text-xs font-mono font-semibold flex items-center gap-2 border border-[#c8c3b7] transition-colors cursor-pointer"
            >
              {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 text-[#55565e]" />}
              <span>{copiedText ? 'COPIED' : 'COPY PLAIN'}</span>
            </button>
          </div>
        </div>

        {/* Technical Skills Constellation */}
        <div id="skills" className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <div className="text-[11px] font-mono text-[#743527] font-bold uppercase tracking-wider mb-1">
                PRACTICAL CAPABILITY MATRIX
              </div>
              <h3 
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl font-bold text-[#14151a]"
              >
                Technical Stack & Production Deliverables
              </h3>
              <p className="text-xs text-[#52535b] mt-0.5">
                Zero arbitrary percentage bars. Evaluated strictly by practical implementation and deliverables.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveSkillCategory(cat)}
                  className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                    activeSkillCategory === cat
                      ? 'bg-[#14151a] text-[#f4f1ea] font-bold shadow-sm'
                      : 'bg-[#ebe7de] text-[#55565e] hover:text-[#14151a] border border-[#c8c3b7]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Skill Selector Grid */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-3">
              {filteredSkills.map((s) => {
                const isSelected = selectedSkill.name === s.name;
                return (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSkill(s)}
                    className={`p-4 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#14151a] text-[#f4f1ea] border-[#14151a] shadow-md scale-[1.02]'
                        : 'bg-[#ebe7de] text-[#1c1d22] border-[#c8c3b7] hover:border-[#969288] hover:bg-[#e4dfd5]'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className={`text-[10px] font-mono uppercase font-semibold ${
                        isSelected ? 'text-emerald-400' : 'text-[#6e6f76]'
                      }`}>
                        {s.category}
                      </span>
                      <span className={`w-2 h-2 rounded-full ${isSelected ? 'bg-emerald-400' : 'bg-[#9f998d]'}`} />
                    </div>
                    <div 
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className="text-base font-bold tracking-tight"
                    >
                      {s.name}
                    </div>
                    <div className={`text-[10px] font-mono mt-1 truncate ${
                      isSelected ? 'text-[#9ca3af]' : 'text-[#585962]'
                    }`}>
                      {s.relevantProject}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Selected Skill Depth Card (Matte Charcoal Dossier) */}
            <div className="lg:col-span-5 rounded-3xl bg-[#14151a] text-[#f4f1ea] border border-[#2b2c35] p-6 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#282a34] mb-4">
                <div className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
                  // SKILL PROFILE DOSSIER
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#242630] text-emerald-300 border border-[#333644]">
                  {selectedSkill.category}
                </span>
              </div>

              <h4 
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl font-bold text-white mb-4 tracking-tight"
              >
                {selectedSkill.name}
              </h4>

              <div className="space-y-3.5 text-xs font-sans">
                <div>
                  <div className="font-mono text-[#8f94a2] font-semibold mb-1 text-[11px] uppercase">
                    What I Use It For:
                  </div>
                  <p className="text-[#e2e8f0] leading-relaxed bg-[#191b22] p-3.5 rounded-2xl border border-[#282a34]">
                    {selectedSkill.whatIUseItFor}
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[#8f94a2] font-semibold mb-1 text-[11px] uppercase">
                    Relevant Case Study:
                  </div>
                  <p className="text-emerald-300 font-mono bg-[#191b22] p-3 rounded-2xl border border-[#282a34]">
                    {selectedSkill.relevantProject}
                  </p>
                </div>

                <div>
                  <div className="font-mono text-[#8f94a2] font-semibold mb-1 text-[11px] uppercase">
                    Production Deliverable:
                  </div>
                  <p className="text-[#cbd5e1] leading-relaxed bg-[#191b22] p-3.5 rounded-2xl border border-[#282a34]">
                    {selectedSkill.deliverable}
                  </p>
                </div>
              </div>

              <div className="mt-5 pt-3.5 border-t border-[#262832] text-[10px] font-mono text-[#767b8a]">
                Direct capability validated in enterprise consulting engagements.
              </div>
            </div>
          </div>
        </div>

        {/* Experience Timeline */}
        <div id="experience" className="mb-20">
          <div className="mb-8 pb-4 border-b border-[#c8c3b7]">
            <div className="text-xs font-mono text-[#54555e] uppercase tracking-widest mb-1">
              07 // PROFESSIONAL TRACK RECORD
            </div>
            <h3 
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-2xl sm:text-3xl font-bold text-[#141519]"
            >
              Work Experience Timeline
            </h3>
            <p className="text-xs sm:text-sm text-[#4f5058] mt-1">
              Hands-on analytics, MIS compilation, operational data cleaning, and business intelligence.
            </p>
          </div>

          <div className="space-y-6">
            {EXPERIENCE.map((exp, idx) => {
              const isDark = idx === 0;
              return (
                <div
                  key={exp.id}
                  className={`p-6 sm:p-8 rounded-3xl border transition-all duration-300 shadow-md hover:shadow-xl ${
                    isDark
                      ? 'bg-[#14151a] text-[#f4f1ea] border-[#292b34]'
                      : 'bg-[#ebe7de] text-[#1c1d22] border-[#c8c3b7]'
                  }`}
                >
                  <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b mb-5 ${
                    isDark ? 'border-[#262832]' : 'border-[#d4cec3]'
                  }`}>
                    <div>
                      <span className={`text-[10px] font-mono font-bold uppercase tracking-widest ${
                        isDark ? 'text-emerald-400' : 'text-[#743527]'
                      }`}>
                        {exp.type}
                      </span>
                      <h4 
                        style={{ fontFamily: "'Playfair Display', serif" }}
                        className={`text-xl sm:text-2xl font-bold mt-1 tracking-tight ${
                          isDark ? 'text-white' : 'text-[#14151a]'
                        }`}
                      >
                        {exp.role}
                      </h4>
                      <div className={`text-xs font-medium flex items-center gap-2 mt-1 ${
                        isDark ? 'text-[#9ca3af]' : 'text-[#505159]'
                      }`}>
                        <Building className="w-3.5 h-3.5 shrink-0" />
                        <span className="font-bold">{exp.company}</span>
                        <span>•</span>
                        <span>{exp.location}</span>
                      </div>
                    </div>

                    <div className={`flex items-center gap-2 text-xs font-mono px-3.5 py-1.5 rounded-full border self-start sm:self-auto ${
                      isDark 
                        ? 'bg-[#20222a] text-[#cbd5e1] border-[#31333f]' 
                        : 'bg-[#ded8cb] text-[#1c1d22] border-[#beb8ac]'
                    }`}>
                      <Calendar className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="space-y-2 mb-6">
                    {exp.bullets.map((bullet, i) => (
                      <div key={i} className={`flex items-start gap-2.5 text-xs sm:text-sm leading-relaxed font-sans ${
                        isDark ? 'text-[#cbd5e1]' : 'text-[#3f4048]'
                      }`}>
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>

                  <div className={`flex items-center gap-2 flex-wrap pt-4 border-t ${
                    isDark ? 'border-[#262832]' : 'border-[#d4cec3]'
                  }`}>
                    <span className={`text-xs font-mono ${isDark ? 'text-[#828694]' : 'text-[#6e6f77]'}`}>
                      Tech Stack:
                    </span>
                    {exp.skills.map((s) => (
                      <span
                        key={s}
                        className={`px-3 py-1 rounded-full text-xs font-mono font-medium ${
                          isDark
                            ? 'bg-[#20222a] text-[#cbd5e1] border border-[#31333f]'
                            : 'bg-[#dfd9ce] text-[#1c1d23] border border-[#beb8ac]'
                        }`}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Education & Certifications Split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-20 items-stretch">
          {/* Education - Dark Bento */}
          <div className="p-8 rounded-3xl bg-[#14151a] text-[#f4f1ea] border border-[#2b2c35] flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-3">
                <GraduationCap className="w-4 h-4" />
                <span>// FORMAL EDUCATION</span>
              </div>
              <h4 
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl font-bold text-white mb-1"
              >
                {EDUCATION.degree}
              </h4>
              <div className="text-sm font-semibold text-[#cbd5e1] mb-2">
                {EDUCATION.institution}
              </div>
              <div className="flex items-center gap-3 text-xs font-mono text-[#8f94a2] mb-4">
                <span>{EDUCATION.location}</span>
                <span>•</span>
                <span>Graduated {EDUCATION.period}</span>
              </div>
              <p className="text-xs text-[#9ca3af] leading-relaxed font-sans">
                {EDUCATION.details}
              </p>
            </div>
            <div className="mt-6 pt-4 border-t border-[#262832] text-xs font-mono text-[#717684]">
              Relational database design, data structures, and algorithmic decision systems.
            </div>
          </div>

          {/* Certifications - Warm Alabaster Bento */}
          <div className="p-8 rounded-3xl bg-[#ebe7de] text-[#1c1d22] border border-[#c8c3b7] flex flex-col justify-between shadow-lg">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-[#743527] font-bold mb-3">
                <Award className="w-4 h-4" />
                <span>// PROFESSIONAL CERTIFICATIONS</span>
              </div>
              <h4 
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl font-bold text-[#14151a] mb-4"
              >
                Verified Industry Simulations
              </h4>
              <div className="space-y-3">
                {CERTIFICATIONS.map((cert) => (
                  <div
                    key={cert.name}
                    className="p-4 rounded-2xl bg-[#dfd9ce] border border-[#ccc6b9]"
                  >
                    <div className="flex items-center justify-between text-xs font-mono text-[#55565e] mb-1">
                      <span className="text-[#14151a] font-bold">{cert.issuer}</span>
                      <span>{cert.date}</span>
                    </div>
                    <div 
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className="text-base font-bold text-[#14151a]"
                    >
                      {cert.name}
                    </div>
                    <div className="text-xs text-[#52535b] mt-1 font-mono">
                      {cert.skills}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-[#d4cec3] text-xs font-mono text-[#6c6d75]">
              Credentials validated through enterprise business cases and practical simulations.
            </div>
          </div>
        </div>

        {/* Typical Client Outcomes (Bento Row) */}
        <div className="rounded-3xl bg-[#14151a] text-[#f4f1ea] border border-[#2b2c35] p-8 sm:p-10 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-[#282a34]">
            <div>
              <div className="text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider mb-1">
                // MEASURABLE FREELANCE VALUE
              </div>
              <h3 
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-2xl sm:text-3xl font-bold text-white"
              >
                Typical Client Outcomes
              </h3>
              <p className="text-xs sm:text-sm text-[#9ca3af] mt-1">
                Real-world operational benefits realized when replacing spreadsheet chaos with structured BI pipelines.
              </p>
            </div>
            <div className="text-xs font-mono text-emerald-400 bg-[#1e2028] px-3.5 py-1.5 rounded-full border border-[#2c2e39]">
              AUDITABLE ROI
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CAPABILITY_OUTCOMES.map((out) => (
              <div
                key={out.outcome}
                className="p-5 rounded-2xl bg-[#191b22] border border-[#282a34] flex flex-col justify-between hover:border-emerald-500/40 transition-colors"
              >
                <div>
                  <div className="text-sm font-mono text-emerald-400 font-bold uppercase mb-2">
                    {out.metric}
                  </div>
                  <h4 
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-base font-bold text-white mb-2"
                  >
                    {out.outcome}
                  </h4>
                  <p className="text-xs text-[#9ca3af] leading-relaxed font-sans">
                    {out.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Resume Modal View (Printer-friendly & structured) */}
      <AnimatePresence>
        {resumeModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-3xl rounded-3xl bg-[#ebe7de] text-[#1c1d22] border border-[#c8c3b7] p-6 sm:p-8 shadow-2xl my-8"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-[#c8c3b7] mb-6">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-[#14151a]" />
                  <h3 
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-xl font-bold text-[#14151a]"
                  >
                    Curriculum Vitae Preview
                  </h3>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handlePrintResume}
                    className="px-4 py-2 rounded-full bg-[#14151a] hover:bg-[#2c2e37] text-xs font-mono font-bold text-white flex items-center gap-1.5 cursor-pointer shadow-sm"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>PRINT / PDF</span>
                  </button>
                  <button
                    onClick={() => setResumeModalOpen(false)}
                    className="p-1.5 text-[#55565e] hover:text-[#14151a] rounded-full hover:bg-[#ded9cc] cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Resume Body */}
              <div className="space-y-6 font-sans text-xs sm:text-sm">
                <div>
                  <h2 
                    style={{ fontFamily: "'Playfair Display', serif" }}
                    className="text-2xl sm:text-3xl font-bold text-[#14151a]"
                  >
                    {PROFILE.name}
                  </h2>
                  <p className="text-xs text-emerald-800 font-mono font-bold">{PROFILE.roleTagline}</p>
                  <p className="text-xs text-[#55565e] font-mono mt-1">
                    {PROFILE.email} • {PROFILE.phone} • {PROFILE.location}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#14151a] border-b border-[#c8c3b7] pb-1 mb-2 font-mono uppercase text-xs">
                    Professional Summary
                  </h4>
                  <p className="text-[#3e3f47] leading-relaxed text-xs">
                    {PROFILE.bio}
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-[#14151a] border-b border-[#c8c3b7] pb-1 mb-2 font-mono uppercase text-xs">
                    Work Experience
                  </h4>
                  <div className="space-y-4">
                    {EXPERIENCE.map((e) => (
                      <div key={e.id} className="p-3.5 rounded-2xl bg-[#dfd9ce] border border-[#ccc6b9]">
                        <div className="flex items-center justify-between font-bold text-[#14151a] text-xs">
                          <span>{e.role} — {e.company}</span>
                          <span className="font-mono text-[#55565e] text-[11px]">{e.period}</span>
                        </div>
                        <ul className="list-disc list-inside text-[#3e3f47] text-xs mt-2 space-y-1">
                          {e.bullets.map((b, i) => (
                            <li key={i}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#14151a] border-b border-[#c8c3b7] pb-1 mb-2 font-mono uppercase text-xs">
                    Education
                  </h4>
                  <div className="text-xs">
                    <div className="font-bold text-[#14151a]">
                      {EDUCATION.degree} — {EDUCATION.institution}
                    </div>
                    <div className="text-[#55565e] font-mono text-[11px]">
                      {EDUCATION.location} | Graduated {EDUCATION.period}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-[#14151a] border-b border-[#c8c3b7] pb-1 mb-2 font-mono uppercase text-xs">
                    Certifications
                  </h4>
                  <div className="text-xs space-y-1">
                    {CERTIFICATIONS.map((c) => (
                      <div key={c.name} className="flex justify-between text-[#3e3f47]">
                        <span>• {c.name} ({c.issuer})</span>
                        <span className="text-[#676872] font-mono text-[11px]">{c.date}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t border-[#c8c3b7] flex justify-end">
                <button
                  onClick={() => setResumeModalOpen(false)}
                  className="px-5 py-2 rounded-full bg-[#14151a] hover:bg-[#2b2d35] text-xs font-mono font-bold text-white cursor-pointer shadow-sm"
                >
                  CLOSE PREVIEW
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

// Helper UserIcon
const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);
