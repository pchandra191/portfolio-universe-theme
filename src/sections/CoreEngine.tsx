import { useState } from 'react';
import { useInView } from '@/hooks/useScroll';

const TECHS = [
  { name: 'Symfony', angle: 0, ring: 0, color: '#6ad0ff', size: 38 },
  { name: 'Laravel', angle: 51, ring: 0, color: '#ff7c7c', size: 34 },
  { name: 'React', angle: 103, ring: 0, color: '#6ad0ff', size: 40 },
  { name: 'JavaScript', angle: 154, ring: 0, color: '#ffd27a', size: 36 },
  { name: 'Node.js', angle: 205, ring: 0, color: '#7cffa0', size: 34 },
  { name: 'PHP', angle: 257, ring: 0, color: '#b07cff', size: 32 },
  { name: 'AWS', angle: 309, ring: 0, color: '#ffd27a', size: 36 },
  { name: 'MySQL', angle: 25, ring: 1, color: '#7cd0ff', size: 30 },
  { name: 'MongoDB', angle: 90, ring: 1, color: '#7cffa0', size: 30 },
  { name: 'Linux', angle: 155, ring: 1, color: '#ffd27a', size: 28 },
  { name: 'Docker', angle: 220, ring: 1, color: '#6ad0ff', size: 30 },
  { name: 'Git', angle: 285, ring: 1, color: '#ff7c7c', size: 28 },
  { name: 'REST APIs', angle: 340, ring: 1, color: '#b07cff', size: 32 },
];

const RING_RADII = [180, 280];
const RING_SPEEDS = [40, 55];

export default function CoreEngine() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section id="engine" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-32">
      <div ref={ref} className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-12 text-center">
          <span className="section-label block mb-3">/ 02 — CORE ENGINE</span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold leading-tight mb-4">
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
        <div className="relative flex items-center justify-center" style={{ height: '640px' }}>
          {/* Orbit rings */}
          {RING_RADII.map((r, i) => (
            <div
              key={i}
              className="absolute rounded-full border"
              style={{
                width: r * 2,
                height: r * 2,
                borderColor: 'rgba(106,208,255,0.12)',
                borderStyle: i === 0 ? 'dashed' : 'solid',
              }}
            />
          ))}

          {/* Center core */}
          <div className="absolute z-10 flex items-center justify-center">
            <div
              className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(circle at 35% 35%, rgba(106,208,255,0.3), rgba(176,124,255,0.15), rgba(0,0,20,0.6))',
                border: '1px solid rgba(106,208,255,0.3)',
                boxShadow: '0 0 60px rgba(106,208,255,0.3), inset 0 0 30px rgba(106,208,255,0.15)',
                animation: 'pulse-glow 4s ease-in-out infinite',
              }}
            >
              <div className="text-center">
                <div className="font-mono text-[0.5rem] tracking-[0.25em] text-cyan-300/60 mb-1">
                  CORE
                </div>
                <div className="font-display text-lg sm:text-xl font-bold text-white/90">
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
            const radius = RING_RADII[tech.ring];
            const duration = RING_SPEEDS[tech.ring];
            const isHovered = hovered === tech.name;
            return (
              <div
                key={tech.name}
                className="absolute"
                style={{
                  width: radius * 2,
                  height: radius * 2,
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
                    <span
                      className="font-mono text-[0.5rem] sm:text-[0.55rem] font-medium tracking-tight text-center px-1 leading-tight transition-all"
                      style={{ color: isHovered ? '#fff' : 'rgba(255,255,255,0.75)' }}
                    >
                      {tech.name}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tech legend */}
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {TECHS.map((t) => (
            <span
              key={t.name}
              className="font-mono text-[0.55rem] tracking-[0.12em] px-3 py-1.5 rounded-full glass"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              {t.name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
