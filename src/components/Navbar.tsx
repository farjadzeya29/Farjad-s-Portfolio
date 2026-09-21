import React, { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Menu, 
  X, 
  ArrowUpRight, 
  Sparkles,
  PhoneCall,
  Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PROFILE } from '../data/portfolioData';

interface NavbarProps {
  onOpenInquiry: (prefillType?: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenInquiry, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Services', href: '#services' },
    { name: 'Projects', href: '#projects' },
    { name: 'Data Lab', href: '#datalab' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#e5e1d7]/95 backdrop-blur-md border-b border-[#c8c3b7] py-2.5 shadow-md text-[#18191e]'
            : 'bg-[#ebe7de]/90 backdrop-blur-md border-b border-[#d2cdc2] py-3 text-[#18191e]'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 rounded-lg"
          >
            <div className="w-9 h-9 rounded-xl bg-[#14151a] border border-[#2b2c35] flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-all shadow-sm">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <div className="font-extrabold text-sm sm:text-base tracking-tight text-[#16171b] flex items-center gap-2">
                <span style={{ fontFamily: "'Playfair Display', serif" }} className="font-bold tracking-normal">Farjad Zeya</span>
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-[#dcd7cc] text-[#3e404a] border border-[#beb9ad]">
                  STUDIO
                </span>
              </div>
              <p className="text-[10px] text-[#63625b] font-mono tracking-wider">
                DATA & BI CONSULTING
              </p>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#ded9ce] border border-[#c8c3b7] px-3 py-1 rounded-full shadow-inner">
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1 text-xs font-medium rounded-full transition-all duration-200 ${
                    isActive
                      ? 'bg-[#18191e] text-white font-semibold shadow-sm'
                      : 'text-[#484950] hover:text-[#16171b] hover:bg-[#d0cbbf]'
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Quick Contact & Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="p-2 text-[#4c4d54] hover:text-[#18191e] transition-colors rounded-lg hover:bg-[#ded9ce]"
              title="Email Farjad"
            >
              <Mail className="w-4 h-4" />
            </a>
            <a
              href={`tel:${PROFILE.phone}`}
              className="p-2 text-[#4c4d54] hover:text-[#18191e] transition-colors rounded-lg hover:bg-[#ded9ce]"
              title="Call Farjad"
            >
              <PhoneCall className="w-4 h-4" />
            </a>
            <button
              onClick={() => onOpenInquiry()}
              className="px-4 py-2 text-xs font-mono font-semibold text-white bg-[#14151a] hover:bg-[#2c2e36] rounded-full shadow-sm flex items-center gap-1.5 transition-all duration-200 cursor-pointer hover:shadow-md hover:scale-[1.02] active:scale-[0.98] border border-[#2b2c35]"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400" />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => onOpenInquiry()}
              className="sm:hidden px-3 py-1.5 text-xs font-mono font-bold text-white bg-[#14151a] rounded-full"
            >
              PROJECT
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-[#2c2d33] hover:text-black rounded-lg hover:bg-[#ded9ce]"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[60px] z-30 bg-[#ece8df] border-b border-[#c8c3b7] px-6 py-6 lg:hidden shadow-2xl"
          >
            <nav className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="px-4 py-2 text-xs font-mono text-[#2c2d33] hover:text-white hover:bg-[#18191e] rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>{link.name}</span>
                  <span className="text-[#848278] text-xs font-mono">→</span>
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-[#d8d3c7] flex flex-col gap-3">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenInquiry();
                  }}
                  className="w-full py-3 text-center text-xs font-mono font-bold text-white bg-[#14151a] rounded-full shadow-md"
                >
                  START A PROJECT
                </button>
                <div className="flex items-center justify-between text-xs text-[#626159] px-1 pt-1 font-mono">
                  <span>{PROFILE.email}</span>
                  <span>{PROFILE.phone}</span>
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
