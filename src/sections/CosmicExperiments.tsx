import { useInView } from '@/hooks/useScroll';
import { memo } from 'react';
import { ArrowUpRight, Github } from 'lucide-react';

const EXPERIMENTS = [
  {
    name: 'Fault Management System',
    tag: 'IOT SYSTEM · UNO ARDUINO',
    desc: 'Fault detection and management system with real-time monitoring, predictive analytics, and automated response capabilities.',
    stack: ['C++', 'UNO ARDUINO', 'SENSORS', 'MySQL'],
    accent: '#6ad0ff',
    url: 'https://github.com/pchandra191/Arduino-GAS-TEMPERATURE'
  },
  {
    name: ' E-Commerce Website ',
    tag: 'WEB APP · E-COMMERCE',
    desc: 'A fully functional e-commerce platform with product catalog, shopping cart, payment gateway integration, and order management system.',
    stack: ['Core PHP', 'HTML/CSS', 'JavaScript', 'MySQL'],
    accent: '#b07cff',
    url: 'https://github.com/pchandra191/DAP-FASHION-PHP-MYSQL-HTML-CSS-JS-'
  },
  {
    name: 'Giphy GIF Scroll Unlimited',
    tag: 'WEB APP · GIF SEARCH',
    desc: 'A web application that allows users to search and scroll through GIFs from the Giphy API, with infinite scrolling and responsive design.',
    stack: ['VUE JS',  'MongoDB', 'Node JS', 'Express JS'],
    accent: '#b07cff',
    url: 'https://github.com/pchandra191/Giphy-unlimited_scrolling-VUE'
  },
  {
    name: 'Better 8 Homes',
    tag: 'WEB APP · REAL ESTATE',
    desc: 'A web application for browsing and searching real estate listings with advanced filtering and mapping capabilities.',
    stack: ['React', 'Node JS', 'MongoDB', 'Express JS'],
    accent: '#b07cff',
    // url: 'https://github.com/pchandra191/Better8-Homes'
  },
];

function EarthBackground({ inView }: { inView: boolean }) {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: -280,
        right: -180,
        width: 520,
        height: 520,
        opacity: inView ? 1 : 0,
        transition: 'opacity 1.2s cubic-bezier(0.22,1,0.36,1)',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      {/* Deep space fog — volumetric depth behind Earth */}
      <div
        style={{
          position: 'absolute',
          inset: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 50% 55%, rgba(20,40,80,0.12) 0%, rgba(10,20,50,0.06) 35%, rgba(0,0,0,0) 65%)',
          filter: 'blur(30px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Atmospheric scattering — outer glow, 5-8% opacity */}
      <div
        style={{
          position: 'absolute',
          inset: '-16%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 55% 45%, rgba(160,210,255,0.08) 20%, rgba(100,170,240,0.04) 40%, rgba(60,120,200,0.015) 60%, transparent 78%)',
          filter: 'blur(22px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Volumetric atmospheric halo — illuminated side */}
      <div
        style={{
          position: 'absolute',
          inset: '-8%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 45% 40%, rgba(180,230,255,0.1) 15%, rgba(120,190,250,0.05) 35%, rgba(80,150,220,0.02) 55%, transparent 72%)',
          filter: 'blur(12px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Soft cosmic fog below planet — depth embedding */}
      <div
        style={{
          position: 'absolute',
          bottom: '-12%',
          left: '10%',
          right: '10%',
          height: '35%',
          borderRadius: '50%',
          background: 'radial-gradient(ellipse at 50% 0%, rgba(40,70,120,0.08) 0%, rgba(20,40,80,0.04) 40%, transparent 70%)',
          filter: 'blur(18px)',
          mixBlendMode: 'screen',
        }}
      />

      {/* Earth body — NASA Blue Marble with feathered mask */}
      <div
        style={{
          position: 'absolute',
          inset: '3%',
          borderRadius: '50%',
          backgroundImage: "url('/earth-texture.png')",
          backgroundSize: '200% 100%',
          backgroundPosition: '0% 50%',
          animation: 'earth-rotate 120s linear infinite',
          boxShadow:
            'inset -35px -30px 80px rgba(0,0,0,0.65), ' +
            'inset 12px 12px 30px rgba(255,255,255,0.1), ' +
            '0 0 140px rgba(100,180,255,0.08)',
          overflow: 'hidden',
          WebkitMaskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(50% - 45px), rgba(0,0,0,0.6) calc(50% - 20px), rgba(0,0,0,0) calc(50% + 35px), rgba(0,0,0,0) 100%)',
          maskImage: 'radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) calc(50% - 45px), rgba(0,0,0,0.6) calc(50% - 20px), rgba(0,0,0,0) calc(50% + 35px), rgba(0,0,0,0) 100%)',
          WebkitMaskSize: '100% 100%',
          maskSize: '100% 100%',
        }}
      >
        {/* Cloud layer overlay — independent rotation */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 18% 25%, rgba(255,255,255,0.32) 0%, transparent 28%)' +
              ', radial-gradient(circle at 52% 18%, rgba(255,255,255,0.26) 0%, transparent 22%)' +
              ', radial-gradient(circle at 32% 48%, rgba(255,255,255,0.22) 0%, transparent 24%)' +
              ', radial-gradient(circle at 62% 52%, rgba(255,255,255,0.3) 0%, transparent 20%)' +
              ', radial-gradient(circle at 10% 58%, rgba(255,255,255,0.2) 0%, transparent 26%)' +
              ', radial-gradient(circle at 40% 32%, rgba(255,255,255,0.18) 0%, transparent 30%)' +
              ', radial-gradient(circle at 72% 38%, rgba(255,255,255,0.24) 0%, transparent 18%)',
            animation: 'earth-clouds 80s linear infinite',
          }}
        />

        {/* Day/night terminator */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'linear-gradient(to right, rgba(0,0,0,0.32) 0%, transparent 32%, transparent 68%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        {/* Depth-of-field blur — far edge softness */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(circle at 50% 50%, transparent 65%, rgba(0,0,0,0.04) 78%, rgba(0,0,0,0.12) 88%, rgba(0,0,0,0.22) 94%, rgba(0,0,0,0.35) 97%, rgba(0,0,0,0.5) 100%)',
          }}
        />

        {/* Specular sunlight highlight — realistic PBR reflection */}
        <div
          style={{
            position: 'absolute',
            top: '10%',
            left: '16%',
            width: '38%',
            height: '28%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 40% 40%, rgba(255,255,255,0.1) 0%, transparent 70%)',
            filter: 'blur(10px)',
          }}
        />

        {/* City lights on night side */}
        <div style={{ position: 'absolute', top: '18%', left: '16%', width: 1.5, height: 1.5, borderRadius: '50%', background: '#fff8c0', boxShadow: '0 0 3px #fff8c0, 5px 1px 0 0 #ffec99, 10px -1px 0 0 #fff8c0, 15px 2px 0 0 #ffec99, 20px -2px 0 0 #fff8c0' }} />
        <div style={{ position: 'absolute', top: '16%', left: '46%', width: 1.2, height: 1.2, borderRadius: '50%', background: '#fff8c0', boxShadow: '0 0 3px #fff8c0, 4px -1px 0 0 #ffec99, 8px 2px 0 0 #fff8c0' }} />
        <div style={{ position: 'absolute', top: '20%', left: '60%', width: 1.5, height: 1.5, borderRadius: '50%', background: '#fff8c0', boxShadow: '0 0 3px #fff8c0, 5px 2px 0 0 #ffec99, 11px -1px 0 0 #fff8c0, 16px 1px 0 0 #ffec99' }} />
        <div style={{ position: 'absolute', top: '30%', left: '26%', width: 1, height: 1, borderRadius: '50%', background: '#fff8c0', boxShadow: '0 0 2px #fff8c0, 3px 1px 0 0 #ffec99' }} />
        <div style={{ position: 'absolute', top: '26%', left: '50%', width: 1, height: 1, borderRadius: '50%', background: '#fff8c0', boxShadow: '0 0 2px #fff8c0, 4px -1px 0 0 #ffec99' }} />
        <div style={{ position: 'absolute', top: '34%', left: '56%', width: 1, height: 1, borderRadius: '50%', background: '#fff8c0', boxShadow: '0 0 2px #fff8c0' }} />
        <div style={{ position: 'absolute', top: '44%', left: '24%', width: 1, height: 1, borderRadius: '50%', background: '#fff8c0', boxShadow: '0 0 2px #fff8c0, 3px 2px 0 0 #ffec99' }} />
        <div style={{ position: 'absolute', top: '40%', left: '46%', width: 1.2, height: 1.2, borderRadius: '50%', background: '#fff8c0', boxShadow: '0 0 2px #fff8c0, 3px 1px 0 0 #ffec99' }} />
      </div>

      {/* Tiny Moon — orbiting */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          animation: 'moon-orbit-earth 65s linear infinite',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -210,
            right: -14,
            width: 28,
            height: 28,
            opacity: 0.75,
            pointerEvents: 'none',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 32% 32%, #f8f8f8, #c8c8c8, #909090)',
            boxShadow:
              'inset -3px -3px 6px rgba(0,0,0,0.45), ' +
              'inset 2px 2px 4px rgba(255,255,255,0.3), ' +
              '0 0 10px rgba(200,200,200,0.1)',
          }}
        >
          <div style={{ position: 'absolute', top: '16%', left: '20%', width: '28%', height: '28%', borderRadius: '50%', background: 'rgba(0,0,0,0.1)', filter: 'blur(1px)' }} />
          <div style={{ position: 'absolute', top: '52%', left: '46%', width: '20%', height: '20%', borderRadius: '50%', background: 'rgba(0,0,0,0.08)', filter: 'blur(1px)' }} />
        </div>
      </div>
    </div>
  );
}

const CosmicExperiments = memo(function CosmicExperiments() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="experiments" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-32 ">
      <EarthBackground inView={inView} />
      <div ref={ref} className="max-w-6xl mx-auto w-full relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="section-label block mb-3">/ 05 — Pulsar System</span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
              COLLAGE
            </span>{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              MISSIONS
            </span>
          </h2>
          <p className="font-mono text-[0.65rem] tracking-[0.15em] text-white/40 max-w-lg mx-auto leading-relaxed">
            Experiments launched beyond the main trajectory. Exploration is the engine of discovery on Earth.
          </p>
        </div>

        {/* Experiment cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {EXPERIMENTS.map((e, i) => (
            <div
              key={e.name}
              className="glass glass-hover hud-corner rounded-2xl p-6 group relative overflow-hidden"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms`,
              }}
            >
              {/* Accent glow */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${e.accent}40, transparent 70%)` }}
              />

              {/* Icon */}
              <div className="flex items-center justify-between mb-6 relative">
                {/* <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${e.accent}30, transparent)`,
                    border: `1px solid ${e.accent}40`,
                  }}
                >
                  <FlaskConical size={18} style={{ color: e.accent }} />
                </div> */}
                <span
                  className="font-mono text-[0.45rem] tracking-[0.2em] px-2 py-0.5 rounded-full"
                  style={{
                    color: e.accent,
                    border: `1px solid ${e.accent}40`,
                    background: `${e.accent}10`,
                  }}
                >
                  {e.stack?.join(' · ')}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-display text-lg font-bold text-white/90 mb-2 group-hover:text-white transition-colors">
                {e.name}
              </h3>

              {/* Tag */}
              <p className="font-mono text-[0.5rem] tracking-[0.15em] text-white/35 uppercase mb-4">
                {e.tag}
              </p>

              {/* Desc */}
              <p className="text-xs text-white/55 leading-relaxed mb-5">
                {e.desc}
              </p>

              {/* Link */}
              {e.url && (
              <div className="flex items-center gap-1.5 font-mono text-[0.55rem] tracking-[0.15em] text-white/40 group-hover:text-cyan-300 transition-colors">
                <button className="btn-hud text-[0.55rem] py-2 px-3" onClick={() => window.open(e.url, '_blank')}>
                  <Github size={11} />
                  Source
                <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default CosmicExperiments;
