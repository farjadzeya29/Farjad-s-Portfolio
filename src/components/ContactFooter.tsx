import React from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  ArrowUp, 
  BarChart3, 
  Send
} from 'lucide-react';
import { PROFILE } from '../data/portfolioData';

interface ContactFooterProps {
  onOpenInquiry: (servicePrefill?: string) => void;
}

export const ContactFooter: React.FC<ContactFooterProps> = ({ onOpenInquiry }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="relative pt-12 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upper Contact Grand Bento Card */}
        <div className="rounded-3xl bg-[#14151a] text-[#f4f1ea] border border-[#2b2c35] p-8 sm:p-12 md:p-16 mb-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 uppercase tracking-widest">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>09 // DIRECT CONSULTING ACCESS</span>
              </div>
              <h2 
                style={{ fontFamily: "'Playfair Display', serif" }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight"
              >
                Ready to Turn Raw Data <br />
                <span className="italic font-normal text-[#e2ded5]">Into High-Yield Decisions?</span>
              </h2>
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed max-w-xl font-sans">
                Whether you need an executive Power BI dashboard suite, recurring Excel MIS automation, or deep SQL data warehouse analysis, reach out directly to begin your engagement.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <button
                  onClick={() => onOpenInquiry()}
                  className="px-7 py-3.5 rounded-full bg-[#f4f1ea] hover:bg-white text-[#14151a] font-mono font-bold text-xs shadow-lg flex items-center gap-2 transition-all cursor-pointer"
                >
                  <span>START PROJECT INTAKE</span>
                  <Send className="w-3.5 h-3.5 text-emerald-600" />
                </button>

                <a
                  href={`mailto:${PROFILE.email}`}
                  className="px-6 py-3.5 rounded-full bg-[#1e2029] hover:bg-[#282a35] text-[#d1d5db] hover:text-white border border-[#313442] text-xs font-mono flex items-center gap-2 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{PROFILE.email}</span>
                </a>
              </div>
            </div>

            {/* Direct Contact Cards */}
            <div className="lg:col-span-5 space-y-3">
              <div className="p-5 rounded-2xl bg-[#191b22] border border-[#2e303b] flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#222530] border border-[#333644] flex items-center justify-center text-emerald-400 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="overflow-hidden">
                  <div className="text-[10px] font-mono text-[#8b91a0] uppercase tracking-wider">Direct Email</div>
                  <a
                    href={`mailto:${PROFILE.email}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-emerald-400 transition-colors truncate block"
                  >
                    {PROFILE.email}
                  </a>
                  <div className="text-[10px] text-[#6d7280] font-mono mt-0.5">Direct response within 24 hours</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#191b22] border border-[#2e303b] flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#222530] border border-[#333644] flex items-center justify-center text-teal-400 shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8b91a0] uppercase tracking-wider">Direct Phone / WhatsApp</div>
                  <a
                    href={`tel:${PROFILE.phone}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-teal-400 transition-colors block font-mono"
                  >
                    {PROFILE.phone}
                  </a>
                  <div className="text-[10px] text-[#6d7280] font-mono mt-0.5">IST / Global Remote Timezones</div>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#191b22] border border-[#2e303b] flex items-center gap-4">
                <div className="w-11 h-11 rounded-xl bg-[#222530] border border-[#333644] flex items-center justify-center text-amber-400 shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-[#8b91a0] uppercase tracking-wider">Location & Studio Base</div>
                  <div className="text-xs sm:text-sm font-semibold text-white">
                    {PROFILE.location}
                  </div>
                  <div className="text-[10px] text-[#6d7280] font-mono mt-0.5">Worldwide Remote Client Engagements</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Brand & Navigation Bottom Bar */}
        <div className="pt-6 border-t border-[#c8c3b7] flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-[#52535b] font-mono">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#14151a] text-white flex items-center justify-center font-bold font-mono text-xs">
              FZ
            </div>
            <div>
              <div className="font-bold text-xs text-[#14151a] tracking-tight">
                {PROFILE.name}
              </div>
              <div className="text-[11px] text-[#6d6e77]">
                Senior Data Analyst & BI Consultant
              </div>
            </div>
          </div>

          <div className="text-center text-[11px]">
            © {new Date().getFullYear()} Farjad Zeya. High-Yield Decision Architecture. All rights reserved.
          </div>

          <button
            onClick={scrollToTop}
            className="px-4 py-2 rounded-full bg-[#ded8cb] hover:bg-[#d0c9bc] text-[#14151a] border border-[#c4beaf] transition-colors flex items-center gap-2 text-xs font-mono font-bold cursor-pointer"
            aria-label="Scroll back to top"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

