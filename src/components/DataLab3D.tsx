import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Box, 
  RotateCcw, 
  ZoomIn, 
  Layers, 
  Sparkles, 
  UserCheck, 
  AlertTriangle, 
  TrendingUp,
  Info
} from 'lucide-react';
import { RFM_POINT_CLUSTERS } from '../data/portfolioData';
import { RfmPoint } from '../types';

export const DataLab3D: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedSegment, setSelectedSegment] = useState<string>('All');
  const [selectedPoint, setSelectedPoint] = useState<RfmPoint>(RFM_POINT_CLUSTERS[0]);
  const [hasWebGL, setHasWebGL] = useState(true);

  const segmentsList = ['All', 'Champions', 'Loyal', 'Potential Loyalists', 'At Risk', 'Hibernating'];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // WebGL Check
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

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090e, 0.025);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(10, 8, 14);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    container.appendChild(renderer.domElement);

    // Bounding 3D Box Grid to indicate Axes: Recency (X), Frequency (Y), Monetary (Z)
    const gridBox = new THREE.BoxHelper(new THREE.Mesh(new THREE.BoxGeometry(8, 8, 8)), 0x334155);
    scene.add(gridBox);

    // Group for points
    const pointsGroup = new THREE.Group();
    scene.add(pointsGroup);

    // Colors mapping
    const colorMap: Record<string, number> = {
      'Champions': 0x10b981,
      'Loyal': 0x06b6d4,
      'Potential Loyalists': 0x3b82f6,
      'At Risk': 0xf59e0b,
      'Hibernating': 0xf43f5e,
    };

    // Create 3D spheres for each customer in the RFM cluster dataset
    const sphereGeometry = new THREE.SphereGeometry(0.18, 12, 12);
    const meshes: THREE.Mesh[] = [];

    RFM_POINT_CLUSTERS.forEach((pt) => {
      const hex = colorMap[pt.segment] || 0x94a3b8;
      const mat = new THREE.MeshBasicMaterial({
        color: hex,
        transparent: true,
        opacity: 0.85,
      });
      const mesh = new THREE.Mesh(sphereGeometry, mat);
      mesh.position.set(pt.x, pt.y, pt.z);
      mesh.userData = pt;
      pointsGroup.add(mesh);
      meshes.push(mesh);
    });

    // Mouse rotate interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      pointsGroup.rotation.y += deltaX * 0.006;
      pointsGroup.rotation.x += deltaY * 0.006;
      gridBox.rotation.y = pointsGroup.rotation.y;
      gridBox.rotation.x = pointsGroup.rotation.x;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
    };

    const domElement = renderer.domElement;
    domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    // Raycaster for clicking spheres
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleClick = (e: MouseEvent) => {
      const rect = domElement.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(meshes);

      if (intersects.length > 0) {
        const clickedData = intersects[0].object.userData as RfmPoint;
        setSelectedPoint(clickedData);
      }
    };
    domElement.addEventListener('click', handleClick);

    // Auto slow rotate when idle
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isDragging) {
        pointsGroup.rotation.y += 0.002;
        gridBox.rotation.y = pointsGroup.rotation.y;
      }

      // Filter visibility based on selected segment
      meshes.forEach((mesh) => {
        const pt = mesh.userData as RfmPoint;
        const matches = selectedSegment === 'All' || pt.segment === selectedSegment;
        mesh.visible = matches;
      });

      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      domElement.removeEventListener('click', handleClick);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      sphereGeometry.dispose();
      renderer.dispose();
    };
  }, [selectedSegment]);

  return (
    <section id="datalab" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-6 border-b border-[#c8c3b7]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#54555e] uppercase tracking-widest mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#18191e]" />
              <span>05 // THREE.JS VECTOR SPACE</span>
            </div>
            <h2 
              style={{ fontFamily: "'Playfair Display', serif" }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#141519] tracking-tight"
            >
              Multi-Dimensional <span className="italic font-normal">RFM Clustering Lab</span>
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4f5058] max-w-2xl leading-relaxed">
              Drag to rotate the 3D customer segmentation space. Each sphere represents an audited customer account positioned mathematically by Recency (X), Frequency (Y), and Monetary Spend (Z).
            </p>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[#52535b]">
            <span>ENGINE:</span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-[#14151a] text-white">
              THREE.JS WEBGL
            </span>
          </div>
        </div>

        {/* 3D Lab Interactive Container - Bento Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left: 3D Canvas Area (Matte Charcoal Container) */}
          <div className="lg:col-span-8 rounded-3xl bg-[#14151a] border border-[#2b2c35] p-5 sm:p-7 overflow-hidden relative shadow-2xl flex flex-col justify-between">
            {/* Top Toolbar */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-4 pb-4 border-b border-[#282a34]">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-mono text-[#8f94a2] uppercase tracking-wider">Cohort:</span>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {segmentsList.map((seg) => (
                    <button
                      key={seg}
                      onClick={() => setSelectedSegment(seg)}
                      className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer ${
                        selectedSegment === seg
                          ? 'bg-[#f4f1ea] text-[#14151a] font-bold shadow-sm'
                          : 'bg-[#1e2028] text-[#8e93a2] hover:text-white border border-[#2c2e39]'
                      }`}
                    >
                      {seg}
                    </button>
                  ))}
                </div>
              </div>

              <div className="text-[10px] font-mono text-[#767b8a] flex items-center gap-2">
                <span>Drag to Rotate • Click Node to Inspect</span>
              </div>
            </div>

            {/* Canvas Mount */}
            <div
              ref={mountRef}
              className="w-full h-[450px] rounded-2xl bg-[#0d0e12] flex items-center justify-center cursor-grab active:cursor-grabbing relative overflow-hidden border border-[#20222a]"
            >
              {!hasWebGL && (
                <div className="text-center p-6 text-[#8e93a2] text-xs font-mono">
                  3D WebGL is disabled or unsupported. A 2D fallback is active.
                </div>
              )}
            </div>

            {/* Axes Legend */}
            <div className="mt-4 pt-3.5 border-t border-[#262832] flex items-center justify-between text-xs font-mono text-[#9da2af] flex-wrap gap-3">
              <div className="flex items-center gap-4 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>X: Recency (Days)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>Y: Frequency (Orders)</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-400" />
                  <span>Z: Monetary Spend ($)</span>
                </span>
              </div>
              <span className="text-[10px] text-[#6b707e]">
                Vector Space Normalization
              </span>
            </div>
          </div>

          {/* Right: Selected Customer Telemetry Card (Warm Alabaster Contrast Card) */}
          <div className="lg:col-span-4 rounded-3xl bg-[#ebe7de] border border-[#c8c3b7] p-7 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="text-xs font-mono text-[#52535a] uppercase tracking-wider font-bold">
                  // AUDIT TELEMETRY
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-[#ded8cb] text-[#22232a] border border-[#beb9ad]">
                  {selectedPoint.id}
                </span>
              </div>

              <div className="p-5 rounded-2xl bg-[#f4f1ea] border border-[#d6cfc2] mb-5 shadow-sm">
                <div className="text-[11px] text-[#65666f] font-mono uppercase tracking-wider">Assigned Cohort:</div>
                <div 
                  style={{ fontFamily: "'Playfair Display', serif" }}
                  className="text-2xl sm:text-3xl font-bold text-[#14151a] mt-1"
                >
                  {selectedPoint.segment}
                </div>
                <div className="text-xs text-emerald-700 font-mono font-bold mt-1">
                  RFM Composite Score: {selectedPoint.score}
                </div>
              </div>

              {/* Specific Metrics */}
              <div className="space-y-2.5 font-mono text-xs">
                <div className="p-3.5 rounded-xl bg-[#dfd9ce] border border-[#ccc6b9] flex items-center justify-between">
                  <span className="text-[#55565e]">Recency (Last Order):</span>
                  <span className="text-[#14151a] font-bold">{selectedPoint.recencyDays} days</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#dfd9ce] border border-[#ccc6b9] flex items-center justify-between">
                  <span className="text-[#55565e]">Frequency (Orders):</span>
                  <span className="text-[#14151a] font-bold">{selectedPoint.frequency} purchases</span>
                </div>

                <div className="p-3.5 rounded-xl bg-[#dfd9ce] border border-[#ccc6b9] flex items-center justify-between">
                  <span className="text-[#55565e]">Monetary Spend (LTV):</span>
                  <span className="text-[#14151a] font-bold">${selectedPoint.monetary.toLocaleString()}</span>
                </div>
              </div>

              {/* Strategic Corporate Action */}
              <div className="mt-5 p-4 rounded-2xl bg-[#f4f1ea] border border-[#d6cfc2] text-xs text-[#2b2c34] leading-relaxed font-sans shadow-sm">
                <div className="font-bold font-mono text-[#743527] mb-1.5 flex items-center gap-1.5 uppercase tracking-wide">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>Strategic Corporate Action:</span>
                </div>
                {selectedPoint.segment === 'Champions' && 'Enroll into exclusive executive roundtables and VIP beta release cohorts.'}
                {selectedPoint.segment === 'Loyal' && 'Offer custom volume discount tiers to incentivize larger enterprise basket sizes.'}
                {selectedPoint.segment === 'Potential Loyalists' && 'Deliver targeted cross-sell bundles aligned with previous purchase categories.'}
                {selectedPoint.segment === 'At Risk' && 'Trigger automated personalized discount win-back campaign within 7 business days.'}
                {selectedPoint.segment === 'Hibernating' && 'Low-cost quarterly digest newsletter; cease burning paid ad spend.'}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-[#d3cdc2] text-[10px] font-mono text-[#71727c]">
              Interactive 3D vector-space rendering via Three.js WebGL.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
