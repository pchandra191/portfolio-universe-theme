import { useInView } from '@/hooks/useScroll';
import { memo } from 'react';
import { Briefcase, Code2, Target, MapPin, Layers } from 'lucide-react';

const STATS = [
  { icon: Briefcase, label: 'YEARS EXPERIENCE', value: '5+', sub: 'FULL STACK' },
  { icon: Code2, label: 'COMPANIES', value: '6', sub: 'INDUSTRY' },
  { icon: Layers, label: 'CORE STACK', value: 'PHP', sub: 'SYMFONY / LARAVEL / REACT' },
  { icon: Target, label: 'CURRENT FOCUS', value: 'EDUPULSE AI', sub: 'FOUNDER & BUILDER' },
];

const MissionProfile = memo(() => {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);

  return (
    <section id="profile" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-32">
      <div ref={ref} className="max-w-6xl mx-auto w-full">
        {/* Section header */}
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)',
        }}>
          <div>
            <span className="section-label block mb-3">/ 01 — Profile</span>
            <h2 className="font-display text-4xl sm:text-6xl font-bold leading-tight text-balance">
              <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                PRABHAT
              </span>
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                CHANDRA
              </span>
            </h2>
          </div>
          <p className="font-mono text-[0.65rem] tracking-[0.15em] text-white/40 max-w-xs leading-relaxed">
            Full Stack Software Developer specializing in PHP, Symfony, Laravel, React, and AWS. Based in India.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {STATS.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.label}
                className="glass glass-hover hud-corner rounded-xl p-5 sm:p-6 group"
                style={{
                  transitionDelay: `${i * 70}ms`,
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(20px)',
                  transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)',
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <Icon size={18} className="text-cyan-300/70 group-hover:text-cyan-300 transition-colors" />
                  <span className="font-mono text-[0.5rem] tracking-[0.2em] text-white/30">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="font-display text-3xl sm:text-4xl font-bold mb-2 bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                  {s.value}
                </div>
                <div className="font-mono text-[0.55rem] tracking-[0.15em] text-white/50 uppercase mb-1">
                  {s.label}
                </div>
                <div className="font-mono text-[0.5rem] tracking-[0.12em] text-cyan-300/50 uppercase">
                  {s.sub}
                </div>
              </div>
            );
          })}
        </div>

        {/* Location + focus bar */}
        <div className="mt-6 glass rounded-xl p-5 sm:p-6 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <div className="flex items-center gap-4 flex-1">
            <MapPin size={20} className="text-cyan-300/70 shrink-0" />
            <div>
              <div className="font-mono text-[0.55rem] tracking-[0.2em] text-white/40 uppercase mb-1">
                Base of Operations
              </div>
              <div className="font-display text-lg sm:text-xl text-white/90">
                Ahmedabad, India
              </div>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/10" />
          <div className="flex items-center gap-4 flex-1">
            <Target size={20} className="text-cyan-300/70 shrink-0" />
            <div>
              <div className="font-mono text-[0.55rem] tracking-[0.2em] text-white/40 uppercase mb-1">
                Current Mission
              </div>
              <div className="font-display text-lg sm:text-xl text-white/90">
                EduPulse AI
              </div>
            </div>
          </div>
          <div className="hidden md:block w-px h-12 bg-white/10" />
          <div className="flex items-center gap-4 flex-1">
            <Code2 size={20} className="text-cyan-300/70 shrink-0" />
            <div>
              <div className="font-mono text-[0.55rem] tracking-[0.2em] text-white/40 uppercase mb-1">
                Languages
              </div>
              <div className="font-display text-lg sm:text-xl text-white/90">
                English · Hindi
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default MissionProfile;
