import React from 'react';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  Database, 
  Code2, 
  Wand2, 
  TrendingUp, 
  Users, 
  Cpu, 
  Check, 
  ArrowUpRight,
  Briefcase
} from 'lucide-react';
import { SERVICES } from '../data/portfolioData';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const iconMap: Record<string, React.ElementType> = {
    LayoutDashboard,
    FileSpreadsheet,
    Database,
    Code2,
    Wand2,
    TrendingUp,
    Users,
    Cpu,
  };

  return (
    <section id="services" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#c8c3b7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#54555e] uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18191e]" />
              <span>03 // FREELANCE CONSULTING OFFERINGS</span>
            </div>
            <h2 
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#141519] tracking-tight"
            >
              Consulting & Dashboard <span className="italic font-normal">Services</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4f5058] max-w-2xl leading-relaxed">
              Transform disparate, complex business datasets into clear management dashboards, robust reporting pipelines, and actionable executive decisions.
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#52535b]">
            <span>DELIVERY TIMELINE:</span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#14151a] text-white">
              1 - 3 WEEKS
            </span>
          </div>
        </div>

        {/* 8 Services Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((srv, idx) => {
            const Icon = iconMap[srv.iconName] || LayoutDashboard;
            // Alternate card themes for rich bento rhythm: 0, 3, 5, 6 alabaster, others dark matte charcoal
            const isDark = idx % 3 === 1 || idx === 7;

            return (
              <div
                key={srv.id}
                className={`rounded-3xl p-6.5 border transition-all duration-300 flex flex-col justify-between group shadow-sm hover:shadow-xl hover:-translate-y-1 ${
                  isDark
                    ? 'bg-[#14151a] text-[#f4f1ea] border-[#292b34]'
                    : 'bg-[#ebe7de] text-[#1a1b21] border-[#c8c3b7]'
                }`}
              >
                <div>
                  {/* Top Header with Icon and Number */}
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-105 ${
                      isDark
                        ? 'bg-[#22242c] text-emerald-400 border border-[#31333f]'
                        : 'bg-[#dfd9ce] text-[#1c1d23] border border-[#beb8ac]'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-xs font-mono font-bold tracking-widest ${
                      isDark ? 'text-[#828694]' : 'text-[#6e6f77]'
                    }`}>
                      0{srv.number} //
                    </span>
                  </div>

                  {/* Title & Tag */}
                  <div className="mb-3">
                    <span className={`text-[10px] font-mono uppercase tracking-widest font-semibold ${
                      isDark ? 'text-emerald-400' : 'text-[#743527]'
                    }`}>
                      {srv.tag}
                    </span>
                    <h3 
                      style={{ fontFamily: "'Playfair Display', serif" }}
                      className={`text-xl font-bold mt-1 tracking-tight group-hover:opacity-85 transition-opacity ${
                        isDark ? 'text-white' : 'text-[#14151a]'
                      }`}
                    >
                      {srv.title}
                    </h3>
                  </div>

                  {/* Short Description */}
                  <p className={`text-xs leading-relaxed mb-5 font-sans ${
                    isDark ? 'text-[#9ca3af]' : 'text-[#505159]'
                  }`}>
                    {srv.shortDesc}
                  </p>

                  {/* Deliverables List */}
                  <div className={`space-y-1.5 mb-5 pt-3.5 border-t ${
                    isDark ? 'border-[#262832]' : 'border-[#d4cec3]'
                  }`}>
                    <div className={`text-[10px] font-mono font-bold uppercase tracking-wider mb-2 ${
                      isDark ? 'text-[#cbd5e1]' : 'text-[#3f4048]'
                    }`}>
                      Key Deliverables:
                    </div>
                    {srv.deliverables.slice(0, 3).map((d) => (
                      <div key={d} className={`flex items-start gap-2 text-xs ${
                        isDark ? 'text-[#94a3b8]' : 'text-[#44454d]'
                      }`}>
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{d}</span>
                      </div>
                    ))}
                  </div>

                  {/* Example Use Case */}
                  <div className={`p-3 rounded-2xl text-[11px] leading-relaxed mb-6 font-sans border ${
                    isDark 
                      ? 'bg-[#191a22] border-[#292b34] text-[#9ca3af]' 
                      : 'bg-[#dfd9ce] border-[#cbc5b8] text-[#4f5058]'
                  }`}>
                    <span className={`font-semibold block mb-0.5 text-[10px] font-mono uppercase ${
                      isDark ? 'text-slate-300' : 'text-[#1c1d22]'
                    }`}>
                      Use Case:
                    </span>
                    {srv.exampleUseCase}
                  </div>
                </div>

                {/* Card Action CTA */}
                <button
                  onClick={() => onSelectService(srv.title)}
                  className={`w-full py-2.5 px-4 rounded-full text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer ${
                    isDark
                      ? 'bg-[#f4f1ea] hover:bg-white text-[#14151a] shadow-sm'
                      : 'bg-[#14151a] hover:bg-[#2c2e36] text-white shadow-sm'
                  }`}
                >
                  <span>INQUIRE SERVICE</span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-500" />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
