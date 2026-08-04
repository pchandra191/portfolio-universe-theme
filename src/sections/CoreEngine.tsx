import { useState, useEffect, memo, useRef, useCallback } from 'react';
import { useInView } from '@/hooks/useScroll';
import { getTechLogo } from '@/components/tech-logos';

interface TechInfo {
  name: string;
  angle: number;
  ring: number;
  color: string;
  size: number;
  years: string;
  usage: string;
}

const TECHS: TechInfo[] = [
  { name: 'Symfony', angle: 30, ring: 1, color: '#6ad0ff', size: 70, years: '4+ Years', usage: 'Enterprise Applications • Saas' },
  { name: 'React', angle: 60, ring: 0, color: '#6ad0ff', size: 60, years: '3+ Years', usage: 'SPA • Dashboard • UI' },
  { name: 'MySQL', angle: 90, ring: 1, color: '#7cd0ff', size: 60, years: '5+ Years', usage: 'Relational Data • Replication' },
  { name: 'PHP', angle: 240, ring: 0, color: '#b07cff', size: 80, years: '5+ Years', usage: 'Backend • CMS • E-commerce' },
  { name: 'REST APIs', angle: 330, ring: 1, color: '#b07cff', size: 43, years: '3+ Years', usage: 'Design • Integration • Testing' },
  { name: 'Laravel', angle: 0, ring: 0, color: '#ff7c7c', size: 40, years: '2+ Years', usage: 'Full-Stack Apps • APIs' },
  { name: 'HTML', angle: 50, ring: 1, color: '#ffd27a', size: 49, years: '5+ Years', usage: 'Frontend • Design • Responsiveness' },
  { name: 'CSS', angle: 180, ring: 0, color: '#ffd27a', size: 51, years: '5+ Years', usage: 'Styling • Layout • Responsiveness' },
  { name: 'JavaScript', angle: 120, ring: 0, color: '#ffd27a', size: 49, years: '3+ Years', usage: 'Frontend • Backend • Scripting' },
  { name: 'AWS', angle: 300, ring: 0, color: '#ffd27a', size: 49, years: '1+ Years', usage: 'Cloud • Deployment • Scaling' },
  { name: 'Linux', angle: 210, ring: 1, color: '#ffd27a', size: 38, years: '3+ Years', usage: 'Servers • Scripting • DevOps' },
  { name: 'Git', angle: 270, ring: 1, color: '#ff7c7c', size: 38, years: '3+ Years', usage: 'Version Control • Collaboration' },
];

const BASE_RADII = [245, 380];
const BASE_SPEEDS = [40, 55];
const MAX_ORBIT_DIAMETER = 760;
const VIEWPORT_PADDING = 32;

const RING_LABELS = ['Inner Orbit', 'Core Orbit'];

const CoreEngine = memo(function CoreEngine() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const [hovered, setHovered] = useState<string | null>(null);
  const [active, setActive] = useState<string | null>(null);
  const [orbitScale, setOrbitScale] = useState(() => {
    if (typeof window === 'undefined') return 1;
    const vw = window.innerWidth;
    if (vw < 500) return Math.max(0.35, Math.min((vw - VIEWPORT_PADDING) / MAX_ORBIT_DIAMETER, 0.7));
    if (vw < 640) return 0.75;
    if (vw < 1024) return 0.85;
    return 1;
  });
  const [orbitSize, setOrbitSize] = useState(() => {
    if (typeof window === 'undefined') return 820;
    const vw = window.innerWidth;
    const scale = vw < 500 ? Math.max(0.35, Math.min((vw - VIEWPORT_PADDING) / MAX_ORBIT_DIAMETER, 0.7)) : vw < 640 ? 0.75 : vw < 1024 ? 0.85 : 1;
    return vw >= 1024 ? 820 : Math.max(420, MAX_ORBIT_DIAMETER * scale);
  });
  const [linePos, setLinePos] = useState<{ x: number; y: number } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const planetRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      let scale = 1;
      if (vw < 500) {
        scale = Math.max(0.35, Math.min((vw - VIEWPORT_PADDING) / MAX_ORBIT_DIAMETER, 0.7));
      } else if (vw < 640) {
        scale = 0.75;
      } else if (vw < 1024) {
        scale = 0.85;
      }
      setOrbitScale(scale);
      setOrbitSize(vw >= 1024 ? 820 : Math.max(420, MAX_ORBIT_DIAMETER * scale));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handlePlanetClick = useCallback((tech: TechInfo) => {
    setActive((prev) => (prev === tech.name ? null : tech.name));
  }, []);

  useEffect(() => {
    if (!active || !containerRef.current) {
      setLinePos(null);
      return;
    }
    const planetEl = planetRefs.current[active];
    if (!planetEl) return;

    const updateLine = () => {
      const container = containerRef.current;
      if (!container) return;
      const containerRect = container.getBoundingClientRect();
      const planetRect = planetEl.getBoundingClientRect();
      const cx = planetRect.left + planetRect.width / 2 - containerRect.left;
      const cy = planetRect.top + planetRect.height / 2 - containerRect.top;
      setLinePos({ x: cx, y: cy });
    };

    updateLine();
    const raf = requestAnimationFrame(() => {
      const interval = setInterval(updateLine, 100);
      return () => clearInterval(interval);
    });
    return () => cancelAnimationFrame(raf);
  }, [active]);

  const activeTech = TECHS.find((t) => t.name === active) || null;

  return (
    <section id="engine" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-16 sm:py-24 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)',
        }}>
          <span className="section-label block mb-3">/ 02 — Virgo Cluster</span>
          <h2 className="font-display text-2xl sm:text-3xl md:text-6xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
              TECHNOLOGY
            </span>{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              ORBIT
            </span>
          </h2>
          <p className="font-mono text-[0.65rem] tracking-[0.15em] text-white/40 max-w-lg mx-auto leading-relaxed">
            Every system orbits a central core. These are the engines that power the mission.
          </p>
        </div>

        {/* Orbit visualization */}
        <div
          ref={containerRef}
          className="relative flex items-center justify-center mx-auto"
          style={{
            width: '100%',
            maxWidth: `${MAX_ORBIT_DIAMETER}px`,
            height: orbitSize,
            margin: '0 auto',
          }}
        >
          <div
            className="relative"
            style={{
              width: `${MAX_ORBIT_DIAMETER}px`,
              height: `${MAX_ORBIT_DIAMETER}px`,
              transform: `scale(${orbitScale})`,
              transformOrigin: 'center center',
            }}
          >
            {/* Connection line SVG */}
            {active && linePos && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 15 }}>
                <line
                  x1={linePos.x}
                  y1={linePos.y}
                  x2={MAX_ORBIT_DIAMETER}
                  y2={MAX_ORBIT_DIAMETER / 2}
                  stroke={activeTech?.color || '#6ad0ff'}
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                  style={{ animation: 'dash-flow 1s linear infinite', opacity: 0.6 }}
                />
              </svg>
            )}

            {/* Orbit rings */}
            {BASE_RADII.map((r, i) => (
              <div
                key={i}
                className="absolute rounded-full border"
                style={{
                  left: '50%',
                  top: '50%',
                  width: r * 2,
                  height: r * 2,
                  marginLeft: -r,
                  marginTop: -r,
                  borderColor: 'rgba(106,208,255,0.12)',
                  borderStyle: i === 0 ? 'dashed' : 'solid',
                }}
              />
            ))}

            {/* Center core */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 flex items-center justify-center">
              <div
                className="relative w-32 h-32 sm:w-44 sm:h-56 md:w-56 md:h-56 rounded-full flex items-center justify-center"
                style={{
                  background: 'radial-gradient(circle at 35% 35%, rgba(106,208,255,0.3), rgba(176,124,255,0.15), rgba(0,0,20,0.6))',
                  border: '1px solid rgba(106,208,255,0.3)',
                  boxShadow: '0 0 80px rgba(106,208,255,0.3), inset 0 0 40px rgba(106,208,255,0.15)',
                  animation: 'pulse-glow 4s ease-in-out infinite',
                }}
              >
                <div className="text-center">
                  <div className="font-mono text-[0.6rem] sm:text-[0.65rem] tracking-[0.25em] text-cyan-300/60 mb-1">
                    TECH
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white/90">
                    NEXUS
                  </div>
                </div>
                {/* Rotating ring around core */}
                <div
                  className="absolute inset-0 rounded-full border border-cyan-300/20"
                  style={{ animation: 'orbit-spin 8s linear infinite' }}
                />
              </div>
            </div>

            {/* Orbiting tech planets */}
            {TECHS.map((tech) => {
              const radius = BASE_RADII[tech.ring];
              const duration = BASE_SPEEDS[tech.ring];
              const isActive = active === tech.name;
              const isHovered = hovered === tech.name;
              const logo = getTechLogo(tech.name);
              const logoSize = Math.round(tech.size * 0.5);
              return (
                <div
                  key={tech.name}
                  className="absolute"
                  style={{
                    left: '50%',
                    top: '50%',
                    width: radius * 2,
                    height: radius * 2,
                    marginLeft: -radius,
                    marginTop: -radius,
                    animation: `orbit-spin ${duration}s linear infinite`,
                    animationPlayState: isActive ? 'paused' : 'running',
                    animationDelay: `${-(tech.angle / 360) * duration}s`,
                  }}
                >
                  <div
                    ref={(el) => { planetRefs.current[tech.name] = el; }}
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      animation: `orbit-spin-rev ${duration}s linear infinite`,
                      animationPlayState: isActive ? 'paused' : 'running',
                      animationDelay: `${-(tech.angle / 360) * duration}s`,
                    }}
                  >
                    <div
                      onClick={() => handlePlanetClick(tech)}
                      onMouseEnter={() => setHovered(tech.name)}
                      onMouseLeave={() => setHovered(null)}
                      className="relative flex items-center justify-center rounded-full cursor-pointer transition-all duration-500"
                      style={{
                        width: tech.size,
                        height: tech.size,
                        background: `radial-gradient(circle at 30% 30%, ${tech.color}40, ${tech.color}15, rgba(0,0,20,0.7))`,
                        border: `1px solid ${tech.color}50`,
                        boxShadow: isActive
                          ? `0 0 40px ${tech.color}90, inset 0 0 20px ${tech.color}40`
                          : isHovered
                            ? `0 0 30px ${tech.color}80, inset 0 0 15px ${tech.color}30`
                            : `0 0 15px ${tech.color}40, inset 0 0 8px ${tech.color}20`,
                        transform: isActive ? 'scale(1.12)' : isHovered ? 'scale(1.35)' : 'scale(1)',
                        zIndex: isActive ? 20 : isHovered ? 20 : 5,
                        animation: isActive ? 'orbit-pulse 2s ease-in-out infinite' : 'none',
                        pointerEvents: 'auto',
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-full"
                        style={{
                          width: '200%',
                          height: '200%',
                          marginLeft: '-50%',
                          marginTop: '-50%',
                          cursor: 'pointer',
                          zIndex: 1,
                          pointerEvents: 'none',
                        }}
                      />
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: logoSize,
                          height: logoSize,
                          filter: `drop-shadow(0 0 4px ${tech.color}60)`,
                          position: 'relative',
                          zIndex: 2,
                        }}
                        dangerouslySetInnerHTML={{ __html: logo.svg }}
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detail Panel */}
          {activeTech && (
            <div
              className="tech-panel"
              style={{
                position: 'absolute',
                right: '0',
                top: '50%',
                transform: 'translateY(-50%) translateX(0)',
                width: '280px',
                background: 'rgba(10, 15, 30, 0.65)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(106, 208, 255, 0.2)',
                borderRadius: '16px',
                padding: '20px',
                zIndex: 30,
                animation: 'panel-in 0.3s ease-out',
                boxShadow: `0 0 30px ${activeTech.color}20, inset 0 0 20px ${activeTech.color}10`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width: '48px',
                    height: '48px',
                    background: `radial-gradient(circle at 30% 30%, ${activeTech.color}30, ${activeTech.color}10, rgba(0,0,20,0.5))`,
                    border: `1px solid ${activeTech.color}40`,
                    boxShadow: `0 0 20px ${activeTech.color}30`,
                  }}
                >
                  <div
                    style={{
                      width: '24px',
                      height: '24px',
                      filter: `drop-shadow(0 0 3px ${activeTech.color}60)`,
                    }}
                    dangerouslySetInnerHTML={{ __html: getTechLogo(activeTech.name).svg }}
                  />
                </div>
                <div>
                  <div className="font-display text-lg font-bold text-white/90">{activeTech.name}</div>
                  <div className="font-mono text-[0.6rem] tracking-[0.15em] text-white/40">{RING_LABELS[activeTech.ring]}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="font-mono text-[0.55rem] tracking-[0.2em] text-white/30 mb-1">EXPERIENCE</div>
                  <div className="font-mono text-sm text-white/80">{activeTech.years}</div>
                </div>
                <div>
                  <div className="font-mono text-[0.55rem] tracking-[0.2em] text-white/30 mb-1">PRIMARY USAGE</div>
                  <div className="font-mono text-sm text-white/80 leading-relaxed">{activeTech.usage}</div>
                </div>
                <div>
                  <div className="font-mono text-[0.55rem] tracking-[0.2em] text-white/30 mb-1">ORBIT RING</div>
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        background: activeTech.color,
                        boxShadow: `0 0 8px ${activeTech.color}60`,
                      }}
                    />
                    <span className="font-mono text-sm text-white/80">Ring {activeTech.ring + 1}</span>
                  </div>
                </div>
              </div>

              <div
                className="absolute top-3 right-3 w-2 h-2 rounded-full cursor-pointer"
                style={{
                  background: 'rgba(255,255,255,0.2)',
                  boxShadow: '0 0 6px rgba(255,255,255,0.1)',
                }}
                onClick={() => setActive(null)}
              />
            </div>
          )}
        </div>

        {/* Tech legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {TECHS.map((t) => (
            <span
              key={t.name}
              className="font-mono text-[0.65rem] tracking-[0.12em] px-3 py-1.5 rounded-full glass"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              {t.name}
            </span>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes panel-in {
          from { opacity: 0; transform: translateY(-50%) translateX(20px); }
          to { opacity: 1; transform: translateY(-50%) translateX(0); }
        }
        @keyframes orbit-pulse {
          0%, 100% { transform: scale(1.12); }
          50% { transform: scale(1.2); }
        }
        @keyframes dash-flow {
          to { stroke-dashoffset: -20; }
        }
        @media (max-width: 1023px) {
          .tech-panel {
            position: relative !important;
            right: auto !important;
            top: auto !important;
            transform: none !important;
            margin: 16px auto 0;
            width: 100% !important;
            max-width: 400px;
            animation: panel-in-mobile 0.3s ease-out !important;
          }
        }
        @media (max-width: 639px) {
          .tech-panel {
            position: fixed !important;
            bottom: 0 !important;
            left: 0 !important;
            right: 0 !important;
            top: auto !important;
            transform: none !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: none !important;
            border-radius: 20px 20px 0 0 !important;
            animation: panel-in-mobile 0.3s ease-out !important;
          }
        }
        @keyframes panel-in-mobile {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
});

export default CoreEngine;
