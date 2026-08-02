import { useInView } from '@/hooks/useScroll';
import { FlaskConical, ArrowUpRight } from 'lucide-react';

const EXPERIMENTS = [
  {
    name: 'EduPulse AI',
    tag: 'AI · EDUCATION',
    desc: 'Adaptive learning platform powered by AI. Generates personalized study paths and real-time performance analytics.',
    status: 'ACTIVE',
    accent: '#6ad0ff',
  },
  {
    name: 'SyntaxBase',
    tag: 'DEV TOOLS · SaaS',
    desc: 'Code snippet management and API documentation hub with collaborative editing and version control.',
    status: 'ACTIVE',
    accent: '#b07cff',
  },
  {
    name: 'Giphy Infinite Scroll',
    tag: 'OPEN SOURCE · UI',
    desc: 'Lightweight infinite scroll library for Giphy integration. Optimized for performance with lazy loading.',
    status: 'SHIPPED',
    accent: '#7cffa0',
  },
  {
    name: 'Future Experiments',
    tag: 'INCOMING · CLASSIFIED',
    desc: 'Systems currently in development. More missions will be declassified as they reach stable orbit.',
    status: 'PENDING',
    accent: '#ffd27a',
  },
];

export default function CosmicExperiments() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="experiments" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-32">
      <div ref={ref} className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-16 text-center">
          <span className="section-label block mb-3">/ 05 — COSMIC EXPERIMENTS</span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
              SIDE
            </span>{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              MISSIONS
            </span>
          </h2>
          <p className="font-mono text-[0.65rem] tracking-[0.15em] text-white/40 max-w-lg mx-auto leading-relaxed">
            Experiments launched beyond the main trajectory. Exploration is the engine of discovery.
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
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
              }}
            >
              {/* Accent glow */}
              <div
                className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-500"
                style={{ background: `radial-gradient(circle, ${e.accent}40, transparent 70%)` }}
              />

              {/* Icon */}
              <div className="flex items-center justify-between mb-6 relative">
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle at 30% 30%, ${e.accent}30, transparent)`,
                    border: `1px solid ${e.accent}40`,
                  }}
                >
                  <FlaskConical size={18} style={{ color: e.accent }} />
                </div>
                <span
                  className="font-mono text-[0.45rem] tracking-[0.2em] px-2 py-0.5 rounded-full"
                  style={{
                    color: e.accent,
                    border: `1px solid ${e.accent}40`,
                    background: `${e.accent}10`,
                  }}
                >
                  {e.status}
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
              <div className="flex items-center gap-1.5 font-mono text-[0.55rem] tracking-[0.15em] text-white/40 group-hover:text-cyan-300 transition-colors">
                <span>EXPLORE</span>
                <ArrowUpRight size={11} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
