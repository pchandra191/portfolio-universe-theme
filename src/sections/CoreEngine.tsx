import { useState, useEffect, memo } from 'react';
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
  { name: 'Symfony', angle: 0, ring: 0, color: '#6ad0ff', size: 51, years: '4+ Years', usage: 'Enterprise Applications • APIs' },
  { name: 'Laravel', angle: 51, ring: 0, color: '#ff7c7c', size: 46, years: '5+ Years', usage: 'Full-Stack Apps • SaaS' },
  { name: 'React', angle: 103, ring: 0, color: '#6ad0ff', size: 54, years: '5+ Years', usage: 'SPA • Dashboard • UI' },
  { name: 'JavaScript', angle: 154, ring: 0, color: '#ffd27a', size: 49, years: '6+ Years', usage: 'Frontend • Backend • Scripting' },
  { name: 'Node.js', angle: 205, ring: 0, color: '#7cffa0', size: 46, years: '5+ Years', usage: 'APIs • Microservices • Real-time' },
  { name: 'PHP', angle: 257, ring: 0, color: '#b07cff', size: 43, years: '6+ Years', usage: 'Backend • CMS • E-commerce' },
  { name: 'AWS', angle: 309, ring: 0, color: '#ffd27a', size: 49, years: '4+ Years', usage: 'Cloud • Deployment • Scaling' },
  { name: 'MySQL', angle: 25, ring: 1, color: '#7cd0ff', size: 41, years: '6+ Years', usage: 'Relational Data • Replication' },
  { name: 'MongoDB', angle: 90, ring: 1, color: '#7cffa0', size: 41, years: '4+ Years', usage: 'NoSQL • Document Stores' },
  { name: 'Linux', angle: 155, ring: 1, color: '#ffd27a', size: 38, years: '6+ Years', usage: 'Servers • Scripting • DevOps' },
  { name: 'Docker', angle: 220, ring: 1, color: '#6ad0ff', size: 41, years: '4+ Years', usage: 'Containers • CI/CD • Deployment' },
  { name: 'Git', angle: 285, ring: 1, color: '#ff7c7c', size: 38, years: '6+ Years', usage: 'Version Control • Collaboration' },
  { name: 'REST APIs', angle: 340, ring: 1, color: '#b07cff', size: 43, years: '5+ Years', usage: 'Design • Integration • Testing' },
];

const BASE_RADII = [245, 380];
const BASE_SPEEDS = [40, 55];
const MAX_ORBIT_DIAMETER = 760;
const VIEWPORT_PADDING = 32;

const CoreEngine = memo(function CoreEngine() {
  const { ref } = useInView<HTMLDivElement>(0.15);
  const [hovered, setHovered] = useState<string | null>(null);
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

  return (
    <section id="engine" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-16 sm:py-24 md:py-32">
      <div ref={ref} className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center">
          <span className="section-label block mb-3">/ 02 — CORE ENGINE</span>
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
                    CORE
                  </div>
                  <div className="font-display text-xl sm:text-2xl font-bold text-white/90">
                    ENGINE
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
                    animationDelay: `${-(tech.angle / 360) * duration}s`,
                  }}
                >
                  <div
                    className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    style={{
                      animation: `orbit-spin-rev ${duration}s linear infinite`,
                      animationDelay: `${-(tech.angle / 360) * duration}s`,
                    }}
                  >
                    <div
                      onMouseEnter={() => setHovered(tech.name)}
                      onMouseLeave={() => setHovered(null)}
                      className="relative flex items-center justify-center rounded-full cursor-pointer transition-all duration-500"
                      style={{
                        width: tech.size,
                        height: tech.size,
                        background: `radial-gradient(circle at 30% 30%, ${tech.color}40, ${tech.color}15, rgba(0,0,20,0.7))`,
                        border: `1px solid ${tech.color}50`,
                        boxShadow: isHovered
                          ? `0 0 30px ${tech.color}80, inset 0 0 15px ${tech.color}30`
                          : `0 0 15px ${tech.color}40, inset 0 0 8px ${tech.color}20`,
                        transform: isHovered ? 'scale(1.35)' : 'scale(1)',
                        zIndex: isHovered ? 20 : 5,
                      }}
                    >
                      <div
                        className="flex items-center justify-center"
                        style={{
                          width: logoSize,
                          height: logoSize,
                          filter: `drop-shadow(0 0 4px ${tech.color}60)`,
                        }}
                        dangerouslySetInnerHTML={{ __html: logo.svg }}
                      />
                      {isHovered && (
                        <div
                          className="absolute -bottom-16 left-1/2 -translate-x-1/2 glass rounded-lg px-3 py-2 whitespace-nowrap pointer-events-none z-30"
                          style={{
                            border: `1px solid ${tech.color}30`,
                            boxShadow: `0 0 20px ${tech.color}25`,
                            backdropFilter: 'blur(12px)',
                          }}
                        >
                          <div className="font-mono text-[0.65rem] font-semibold tracking-tight text-white/90">
                            {tech.name}
                          </div>
                          <div className="font-mono text-[0.6rem] text-white/50 mt-0.5">
                            {tech.years}
                          </div>
                          <div className="font-mono text-[0.55rem] text-white/40 mt-0.5">
                            {tech.usage}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
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
    </section>
  );
});

export default CoreEngine;
