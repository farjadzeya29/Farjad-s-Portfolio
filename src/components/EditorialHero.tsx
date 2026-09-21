import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowDown, 
  ArrowUpRight, 
  Sparkles, 
  Camera, 
  Upload, 
  Check, 
  RefreshCw,
  Layers,
  ChevronRight,
  ExternalLink,
  Sliders
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE } from '../data/portfolioData';

interface EditorialHeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
  onViewServices: () => void;
  onSwitchTo3D?: () => void;
}

export const EditorialHero: React.FC<EditorialHeroProps> = ({
  onStartProject,
  onExploreWork,
  onViewServices,
  onSwitchTo3D
}) => {
  // Allow user to use custom uploaded photo or default portrait vector
  const [userPhotoUrl, setUserPhotoUrl] = useState<string | null>(null);
  const [isPhotoHovered, setIsPhotoHovered] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check localStorage for saved custom photo
    const saved = localStorage.getItem('farjad_custom_photo');
    if (saved) {
      setUserPhotoUrl(saved);
    }
  }, []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setUserPhotoUrl(result);
        try {
          localStorage.setItem('farjad_custom_photo', result);
        } catch {
          // If quota exceeded for localStorage, still keep in state
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleResetPhoto = (e: React.MouseEvent) => {
    e.stopPropagation();
    setUserPhotoUrl(null);
    localStorage.removeItem('farjad_custom_photo');
  };

  return (
    <section 
      id="home" 
      className="relative min-h-screen bg-[#d8d3c8] text-[#1c1d21] pt-24 pb-16 px-3 sm:px-6 lg:px-10 flex flex-col justify-center select-none overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}
    >
      {/* Top Subtle Status Bar */}
      <div className="max-w-7xl mx-auto w-full mb-3 px-1 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-[#5c5b56]">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
          <span className="font-semibold uppercase tracking-widest text-[#2f3036]">
            FARJAD ZEYA — DATA ANALYST & BUSINESS INTELLIGENCE
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="hidden sm:inline-block">NEW DELHI, INDIA • AVAILABLE FOR FREELANCE</span>
          {onSwitchTo3D && (
            <button
              onClick={onSwitchTo3D}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1c1d21] text-[#f4f1ea] hover:bg-[#34353d] transition-all text-[11px] cursor-pointer shadow-sm"
              title="Toggle to 3D Pipeline Simulation"
            >
              <Layers className="w-3 h-3 text-emerald-400" />
              <span>3D Pipeline Mode</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Editorial Board (Faithful to Portfolio example.jfif) */}
      <div className="max-w-7xl mx-auto w-full bg-[#121316] rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden border border-[#b8b3a7]/60">
        
        {/* ================= UPPER ROW ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[#23252b]">
          
          {/* 1. TOP-LEFT: Farjad's Photo + "Portf" Overlay */}
          <div 
            className="md:col-span-5 relative min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] bg-[#7a3429] overflow-hidden group cursor-pointer"
            onMouseEnter={() => setIsPhotoHovered(true)}
            onMouseLeave={() => setIsPhotoHovered(false)}
            onClick={() => fileInputRef.current?.click()}
          >
            {/* The Image of Farjad (User photo or high-fidelity vector) */}
            <img 
              src={userPhotoUrl || "/farjad-photo.svg"} 
              alt="Farjad Zeya - Data Analyst" 
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Subtle Gradient Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none" />

            {/* Huge Elegant Serif Typography Overlay: "Portf" */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-6 z-10 pointer-events-none">
              <h1 
                className="text-white text-7xl sm:text-8xl lg:text-9xl tracking-tight leading-none drop-shadow-lg"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
              >
                <span className="italic font-normal">Portf</span>
              </h1>
            </div>

            {/* Interactive Photo Control Pill */}
            <div className="absolute top-4 left-4 z-20">
              <div className="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white text-[11px] font-mono flex items-center gap-1.5 transition-all">
                <Camera className="w-3.5 h-3.5 text-emerald-400" />
                <span>Farjad Zeya</span>
                {userPhotoUrl && (
                  <button 
                    onClick={handleResetPhoto}
                    className="ml-1 text-slate-400 hover:text-white p-0.5"
                    title="Reset to default"
                  >
                    <RefreshCw className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>

            {/* Hover Tooltip to upload / replace with personal photo if desired */}
            <AnimatePresence>
              {isPhotoHovered && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute bottom-4 left-4 right-4 z-20 bg-black/80 backdrop-blur-md rounded-xl p-2.5 border border-white/20 text-center"
                >
                  <p className="text-[11px] text-slate-200 font-mono flex items-center justify-center gap-2">
                    <Upload className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Click anytime to upload / update your photo</span>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <input 
              ref={fileInputRef}
              type="file" 
              accept="image/*" 
              className="hidden" 
              onChange={handleFileUpload} 
            />
          </div>

          {/* 2. TOP-MIDDLE-LEFT: Dark Charcoal Block + "olio" continuation */}
          <div className="md:col-span-2 bg-[#17181c] relative min-h-[140px] md:min-h-[520px] p-6 flex flex-col justify-between border-l border-r border-[#23252b]">
            <div className="hidden md:block">
              <div className="text-[10px] font-mono text-emerald-400 tracking-widest uppercase">
                VOL. 01 // 2026
              </div>
            </div>

            {/* Continuation of "olio" in display serif */}
            <div className="relative z-10">
              <h1 
                className="text-white text-7xl sm:text-8xl lg:text-9xl tracking-tight leading-none"
                style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
              >
                <span className="font-normal block -mt-8 md:mt-0">olio</span>
              </h1>
            </div>

            <div className="text-[10px] font-mono text-slate-500 hidden md:block">
              BI • SQL • POWER BI • EXCEL
            </div>
          </div>

          {/* 3. TOP-MIDDLE-RIGHT: Minimalist Architectural Studio Interior */}
          <div className="md:col-span-2 bg-[#e4e1d9] relative min-h-[220px] md:min-h-[520px] overflow-hidden border-r border-[#23252b]">
            <img 
              src="/studio-workspace.svg" 
              alt="Minimalist Architecture & Analytics Studio" 
              className="w-full h-full object-cover object-center"
              referrerPolicy="no-referrer"
            />
            {/* Subtle Label */}
            <div className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/40 backdrop-blur-sm text-[9px] font-mono text-white/90">
              STUDIO INTERIOR
            </div>
          </div>

          {/* 4. TOP-RIGHT: Dark Editorial Statement Block */}
          <div className="md:col-span-3 bg-[#191a1f] p-8 sm:p-10 flex flex-col justify-between min-h-[300px] md:min-h-[520px]">
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  ANALYTICS MANIFESTO
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </div>

              {/* Poetic quote formatted exactly like reference image */}
              <blockquote 
                className="text-slate-200 text-sm sm:text-base leading-relaxed tracking-wide space-y-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                <p>
                  When data becomes <span className="italic font-normal text-white">unclear</span>, I shall <span className="font-bold text-white">focus</span> with <span className="italic font-normal text-emerald-400">dashboards</span>.
                </p>
                <p>
                  When reports become <span className="font-bold text-white">inadequate</span>, I shall deliver clarity through <span className="italic font-normal text-cyan-300">decisions</span>.
                </p>
              </blockquote>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800">
              {/* Pill Button styled like "STUDIO NATIVE" */}
              <button
                onClick={onStartProject}
                className="w-full py-3 px-6 rounded-full border border-slate-700 hover:border-emerald-400 hover:bg-slate-900/60 text-slate-300 hover:text-white transition-all text-xs font-mono tracking-widest uppercase flex items-center justify-center gap-2 cursor-pointer group"
              >
                <span>DATA STUDIO // INQUIRE</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>

        </div>

        {/* ================= LOWER ROW ================= */}
        <div className="grid grid-cols-1 md:grid-cols-12 bg-[#f4f1ea] text-[#1c1d21]">
          
          {/* 5. BOTTOM-LEFT: "My latest Projects" + Consulting Overview */}
          <div className="md:col-span-6 p-8 sm:p-12 flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#d4cfc3]">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#e6e2d8] text-[#555248] text-[10px] font-mono uppercase mb-4">
                <span>FLAGSHIP PORTFOLIO CASE STUDIES</span>
              </div>

              <h2 
                className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#16171b] mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                My latest <span className="italic font-normal text-[#2b593f]">Projects</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#4a4b52] leading-relaxed max-w-xl font-sans mb-6">
                Turn your raw, fragmented business spreadsheets and transactional databases into executive Power BI dashboards, automated MIS reporting, and high-ROI operational decisions.
              </p>

              {/* Quick Jump Badges to 4 Projects */}
              <div className="flex flex-wrap gap-2 mb-6">
                <a 
                  href="#project-ecommerce" 
                  className="px-3 py-1.5 rounded-lg bg-[#e8e4da] hover:bg-[#ded9cc] text-[#2c2d33] text-xs font-mono transition-colors"
                >
                  01 // E-Commerce RFM
                </a>
                <a 
                  href="#project-churn" 
                  className="px-3 py-1.5 rounded-lg bg-[#e8e4da] hover:bg-[#ded9cc] text-[#2c2d33] text-xs font-mono transition-colors"
                >
                  02 // Bank Churn
                </a>
                <a 
                  href="#project-supplychain" 
                  className="px-3 py-1.5 rounded-lg bg-[#e8e4da] hover:bg-[#ded9cc] text-[#2c2d33] text-xs font-mono transition-colors"
                >
                  03 // Supply Chain
                </a>
                <a 
                  href="#project-marketing" 
                  className="px-3 py-1.5 rounded-lg bg-[#e8e4da] hover:bg-[#ded9cc] text-[#2c2d33] text-xs font-mono transition-colors"
                >
                  04 // Ad Funnels
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-[#dfdbcf]">
              <button
                onClick={onExploreWork}
                className="px-6 py-3 rounded-xl bg-[#17181c] hover:bg-[#2e3038] text-white font-bold text-xs font-mono flex items-center gap-2 transition-all cursor-pointer shadow-md"
              >
                <span>Explore Interactive Dashboards</span>
                <ChevronRight className="w-4 h-4 text-emerald-400" />
              </button>

              <button
                onClick={onViewServices}
                className="px-4 py-3 rounded-xl border border-[#c8c3b7] hover:border-[#17181c] text-[#2b2c33] text-xs font-mono transition-colors cursor-pointer"
              >
                <span>View 8 Services</span>
              </button>
            </div>
          </div>

          {/* 6. BOTTOM-MIDDLE: Giant Stacked Editorial "DA / TA" */}
          <div className="md:col-span-2 bg-[#ebe7de] p-8 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-[#d4cfc3]">
            <div 
              className="text-6xl sm:text-7xl lg:text-8xl tracking-tight leading-none text-[#1b1c21]"
              style={{ fontFamily: "'Playfair Display', 'Cormorant Garamond', serif" }}
            >
              <span className="font-bold block">DA</span>
              <span className="italic font-normal block text-[#2b593f]">TA</span>
            </div>
            <div className="text-[10px] font-mono text-[#686760] tracking-widest mt-3 uppercase">
              ANALYTICS
            </div>
          </div>

          {/* 7. BOTTOM-RIGHT: Sleek Dark Card with Farjad Profile Artwork */}
          <div className="md:col-span-4 bg-[#14151a] relative min-h-[300px] overflow-hidden group">
            <img 
              src="/farjad-profile-dark.svg" 
              alt="Farjad Zeya - Data Consultant" 
              className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            <div className="absolute bottom-6 left-6 right-6 z-10 flex items-end justify-between">
              <div>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest block">
                  EXPERIENCE RECORD
                </span>
                <h4 className="text-white text-base font-bold">
                  CK Infrastructure • Cochain • CDAC
                </h4>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  B.Tech Computer Science (Graduated May 2026)
                </p>
              </div>

              <a 
                href="#about"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-emerald-500 text-white hover:text-black flex items-center justify-center transition-colors shrink-0"
                aria-label="View Resume and Experience"
              >
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* ================= BOTTOM MICRO-BAR ================= */}
        <div className="bg-[#ebe7de] border-t border-[#d8d3c7] py-3.5 px-6 sm:px-10 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-[#585750]">
          <div className="flex items-center gap-3">
            <span className="font-bold text-[#1f2026]">@farjadzeya</span>
            <span>•</span>
            <a 
              href={`mailto:${PROFILE.email}`} 
              className="hover:text-emerald-700 transition-colors underline"
            >
              {PROFILE.email}
            </a>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">{PROFILE.phone}</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline">
              © 2026 Farjad Zeya • All Rights Reserved
            </span>
            <a 
              href="#journey" 
              className="inline-flex items-center gap-1 font-semibold text-[#1f2026] hover:text-emerald-700 transition-colors"
            >
              <span>Scroll to explore</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </section>
  );
};
