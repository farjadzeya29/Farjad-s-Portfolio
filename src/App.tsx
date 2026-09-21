import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { EditorialHero } from './components/EditorialHero';
import { Hero3D } from './components/Hero3D';
import { DataTransformationStory } from './components/DataTransformationStory';
import { ServicesSection } from './components/ServicesSection';
import { FlagshipProjects } from './components/FlagshipProjects';
import { DataLab3D } from './components/DataLab3D';
import { ResumeExperience } from './components/ResumeExperience';
import { FreelancingSection } from './components/FreelancingSection';
import { ContactFooter } from './components/ContactFooter';
import { FloatingAssistant } from './components/FloatingAssistant';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [inquiryPrefill, setInquiryPrefill] = useState<string | undefined>(undefined);
  const [heroMode, setHeroMode] = useState<'editorial' | '3d'>('editorial');

  // Intersection Observer to highlight active navigation link
  useEffect(() => {
    const sectionIds = ['home', 'journey', 'services', 'projects', 'datalab', 'about', 'skills', 'experience', 'freelance', 'contact'];
    
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenInquiry = (serviceOrProjectPrefill?: string) => {
    if (serviceOrProjectPrefill) {
      setInquiryPrefill(serviceOrProjectPrefill);
    }
    const target = document.getElementById('inquiry-form');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => {
    const el = document.getElementById('projects');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToServices = () => {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#d8d3c8] text-[#1a1b20] selection:bg-[#16171b] selection:text-[#f4f1ea]">
      {/* Top Fixed Header */}
      <Navbar
        onOpenInquiry={handleOpenInquiry}
        activeSection={activeSection}
      />

      {/* Main Content Area */}
      <main>
        {/* 1. Hero Section: Editorial Magazine Studio or 3D Data Pipeline */}
        {heroMode === 'editorial' ? (
          <EditorialHero
            onStartProject={() => handleOpenInquiry()}
            onExploreWork={scrollToProjects}
            onViewServices={scrollToServices}
            onSwitchTo3D={() => setHeroMode('3d')}
          />
        ) : (
          <div className="relative">
            {/* Quick Button to return to Editorial Mode */}
            <div className="absolute top-24 right-6 z-30">
              <button
                onClick={() => setHeroMode('editorial')}
                className="px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-700 text-slate-200 hover:text-white text-xs font-mono flex items-center gap-1.5 shadow-lg backdrop-blur-md cursor-pointer"
              >
                <span>Editorial Studio Mode</span>
              </button>
            </div>
            <Hero3D
              onStartProject={() => handleOpenInquiry()}
              onExploreWork={scrollToProjects}
              onViewServices={scrollToServices}
            />
          </div>
        )}

        {/* 2. Interactive Data Transformation Journey (7 Steps) */}
        <DataTransformationStory />

        {/* 3. 8 Consulting & Dashboard Services */}
        <ServicesSection
          onSelectService={(serviceTitle) => handleOpenInquiry(serviceTitle)}
        />

        {/* 4. 4 Flagship Projects with Real Interactive Dashboards */}
        <FlagshipProjects
          onStartProject={(projectTitle) => handleOpenInquiry(projectTitle)}
        />

        {/* 5. 3D Data Lab: Multi-Dimensional Customer RFM Clustering */}
        <DataLab3D />

        {/* 6. About, Skills Constellation, Experience Timeline & Resume */}
        <ResumeExperience />

        {/* 7. Freelance Conversion: Pain Points, Estimator & Inquiry Intake */}
        <FreelancingSection
          prefillService={inquiryPrefill}
          onClearPrefill={() => setInquiryPrefill(undefined)}
        />
      </main>

      {/* 8. Studio Contact & Direct Access Footer */}
      <ContactFooter
        onOpenInquiry={handleOpenInquiry}
      />

      {/* 9. Floating "Ask My Analytics AI" Assistant */}
      <FloatingAssistant />
    </div>
  );
}
