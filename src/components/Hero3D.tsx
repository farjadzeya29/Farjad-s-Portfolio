import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { ArrowRight, ChevronDown, Sparkles, Database, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';
import { PROFILE } from '../data/portfolioData';

interface HeroProps {
  onStartProject: () => void;
  onExploreWork: () => void;
  onViewServices: () => void;
}

export const Hero3D: React.FC<HeroProps> = ({
  onStartProject,
  onExploreWork,
  onViewServices,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [pipelineStage, setPipelineStage] = useState(2);
  const [hasWebGL, setHasWebGL] = useState(true);

  const stages = [
    { label: 'RAW DATA', detail: 'Disparate CSVs & Logs', color: '#64748b' },
    { label: 'CLEANING', detail: 'Validation & Hygiene', color: '#06b6d4' },
    { label: 'ANALYSIS', detail: 'SQL & Python EDA', color: '#3b82f6' },
    { label: 'INSIGHTS', detail: 'Power BI Dashboards', color: '#10b981' },
    { label: 'DECISIONS', detail: 'Business Growth & ROI', color: '#f59e0b' },
  ];

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const prefersReducedMotion = mediaQuery.matches;

    const container = mountRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 550;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.04);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
    camera.position.z = 15;
    camera.position.y = 1;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: window.devicePixelRatio < 2,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Group holding the entire visual pipeline
    const pipelineGroup = new THREE.Group();
    scene.add(pipelineGroup);

    // 1. Central Floating Data Core (Cube/Sphere cluster representing curated insight)
    const coreGeo = new THREE.IcosahedronGeometry(2.4, 1);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      wireframe: true,
      transparent: true,
      opacity: 0.45,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    pipelineGroup.add(coreMesh);

    // Inner glowing sphere
    const innerGeo = new THREE.SphereGeometry(1.2, 16, 16);
    const innerMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.65,
    });
    const innerMesh = new THREE.Mesh(innerGeo, innerMat);
    pipelineGroup.add(innerMesh);

    // 2. Surrounding Data Transformation Particles
    // Mobile optimization: use 120 particles on mobile, 350 on desktop
    const isMobile = window.innerWidth < 768;
    const particleCount = prefersReducedMotion ? 40 : isMobile ? 120 : 350;

    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x10b981), // Insights Emerald
      new THREE.Color(0x06b6d4), // Cleaning Cyan
      new THREE.Color(0x3b82f6), // Analysis Blue
      new THREE.Color(0x94a3b8), // Raw Slate
      new THREE.Color(0xf59e0b), // Decision Amber
    ];

    for (let i = 0; i < particleCount; i++) {
      const radius = 3.5 + Math.random() * 5.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const chosenColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = chosenColor.r;
      colors[i * 3 + 1] = chosenColor.g;
      colors[i * 3 + 2] = chosenColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: isMobile ? 0.08 : 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    pipelineGroup.add(particles);

    // 3. Orbiting Data Ring (representing SQL & Cleaning stages)
    const ringGeo = new THREE.TorusGeometry(4.8, 0.03, 8, 48);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.35,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    pipelineGroup.add(ringMesh);

    const ringGeo2 = new THREE.TorusGeometry(6.2, 0.02, 8, 48);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.y = Math.PI / 4;
    pipelineGroup.add(ringMesh2);

    // Mouse movement interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle Resize
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    // Scroll Reaction
    let scrollY = 0;
    const handleScroll = () => {
      scrollY = window.scrollY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX - targetX) * 0.05;
      targetY += (mouseY - targetY) * 0.05;

      if (!prefersReducedMotion) {
        coreMesh.rotation.x = elapsedTime * 0.15 + targetY * 0.4;
        coreMesh.rotation.y = elapsedTime * 0.2 + targetX * 0.4;

        innerMesh.rotation.x = -elapsedTime * 0.25;
        innerMesh.rotation.y = -elapsedTime * 0.35;

        ringMesh.rotation.z = elapsedTime * 0.12;
        ringMesh2.rotation.z = -elapsedTime * 0.08;

        particles.rotation.y = elapsedTime * 0.05 + targetX * 0.2;
        particles.rotation.x = targetY * 0.15;

        // Subtle scroll influence
        pipelineGroup.position.y = -scrollY * 0.002;
        pipelineGroup.rotation.z = scrollY * 0.0005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Auto cycle through the 5 pipeline stages every 4 seconds to emphasize transformation
    const stageInterval = setInterval(() => {
      setPipelineStage((prev) => (prev + 1) % 5);
    }, 3800);

    return () => {
      clearInterval(stageInterval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      coreGeo.dispose();
      coreMat.dispose();
      innerGeo.dispose();
      innerMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen pt-28 pb-16 flex flex-col justify-center overflow-hidden grid-bg"
    >
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* 3D Canvas Background Layer */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 pointer-events-none opacity-85 overflow-hidden"
        aria-hidden="true"
      >
        {!hasWebGL && (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-72 h-72 rounded-full border border-emerald-500/20 bg-emerald-500/5 animate-pulse" />
          </div>
        )}
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
        {/* Verification & Availability Badge */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/80 border border-emerald-500/30 backdrop-blur-md mb-8 shadow-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs font-mono text-emerald-300 font-medium tracking-wide">
            AVAILABLE FOR FREELANCE ANALYTICS PROJECTS
          </span>
          <span className="text-slate-600 text-xs">•</span>
          <span className="text-xs text-slate-400 font-mono">Q1/Q2 2026</span>
        </motion.div>

        {/* Primary Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-[1.1]"
        >
          Turn Data Into{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Decisions.
          </span>
        </motion.h1>

        {/* Subheadline with Precise Positioning */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed"
        >
          <span className="text-white font-semibold">{PROFILE.name}</span> —{' '}
          {PROFILE.roleTagline} helping businesses transform raw data into clear dashboards, actionable insights, and smarter decisions.
        </motion.p>

        {/* 3D Pipeline Stage Indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-8 flex items-center justify-center flex-wrap gap-2 sm:gap-3 bg-slate-900/60 p-2 rounded-2xl border border-slate-800 backdrop-blur-md"
        >
          {stages.map((stg, idx) => {
            const isCurrent = pipelineStage === idx;
            return (
              <button
                key={stg.label}
                onClick={() => setPipelineStage(idx)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all flex items-center gap-1.5 cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: stg.color }} />
                <span className="font-semibold">{stg.label}</span>
                {idx < stages.length - 1 && (
                  <span className="text-slate-600 hidden sm:inline ml-1">→</span>
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md mx-auto"
        >
          <button
            onClick={onStartProject}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreWork}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 flex items-center justify-center gap-2 transition-all hover:border-slate-600 cursor-pointer"
          >
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            <span>Explore My Work</span>
          </button>

          <button
            onClick={onViewServices}
            className="w-full sm:w-auto px-5 py-3 text-xs font-mono text-slate-400 hover:text-slate-200 underline decoration-slate-600 hover:decoration-emerald-400 transition-colors cursor-pointer"
          >
            View Services
          </button>
        </motion.div>

        {/* Floating Data KPI Badges around hero (Animated Subtly) */}
        <div className="w-full max-w-5xl mt-14 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {[
            { label: 'Revenue', value: '$2.4M', sub: 'Analyzed', color: 'text-emerald-400' },
            { label: 'Profit Drag', value: '-16.4%', sub: 'Isolated', color: 'text-rose-400' },
            { label: 'Customers', value: '14,200+', sub: 'Segmented', color: 'text-cyan-400' },
            { label: 'Orders', value: '18,600+', sub: 'Audited', color: 'text-blue-400' },
            { label: 'Conversion', value: '3.8%', sub: 'Optimized', color: 'text-amber-400' },
            { label: 'Growth', value: '+22%', sub: 'Baseline', color: 'text-emerald-300' },
            { label: 'KPIs', value: '99.2%', sub: 'SLA Health', color: 'text-teal-300' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.35 + i * 0.05 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-md flex flex-col items-center justify-center text-center group hover:border-slate-700 transition-colors"
            >
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">
                {item.label}
              </span>
              <span className={`text-base sm:text-lg font-mono font-bold mt-0.5 ${item.color}`}>
                {item.value}
              </span>
              <span className="text-[10px] font-mono text-slate-500">
                {item.sub}
              </span>
            </motion.div>
          ))}
        </div>

        {/* Scroll down prompt */}
        <div className="mt-12 flex items-center justify-center">
          <a
            href="#journey"
            className="flex flex-col items-center gap-1.5 text-xs text-slate-500 hover:text-emerald-400 transition-colors font-mono"
          >
            <span>DISCOVER THE TRANSFORMATION</span>
            <ChevronDown className="w-4 h-4 animate-bounce text-emerald-400" />
          </a>
        </div>
      </div>
    </section>
  );
};
