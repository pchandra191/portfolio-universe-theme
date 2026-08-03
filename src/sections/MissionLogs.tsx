import { useInView } from '@/hooks/useScroll';
import { memo } from 'react';

const MISSIONS = [
  {
    company: 'Sani Aktiv',
    role: 'Full Stack Developer',
    period: '2023 — PRESENT',
    status: 'ACTIVE',
    coords: 'SECTOR 7-G',
    desc: 'Architected and deployed full-stack wellness platforms with Symfony + React. Built AI-assisted recommendation engines and real-time activity tracking systems.',
    stack: ['Symfony', 'React', 'AWS', 'MySQL'],
  },
  {
    company: 'Expedreview',
    role: 'Software Engineer',
    period: '2022 — 2023',
    status: 'COMPLETED',
    coords: 'SECTOR 4-B',
    desc: 'Developed expedition review and booking platform. Implemented multi-language support, payment integration, and a custom content management system.',
    stack: ['Laravel', 'JavaScript', 'MySQL'],
  },
  {
    company: 'VSUIT CRM',
    role: 'Backend Developer',
    period: '2021 — 2022',
    status: 'COMPLETED',
    coords: 'SECTOR 2-A',
    desc: 'Built a comprehensive CRM suite with custom workflow automation, role-based access control, and REST API integrations for third-party services.',
    stack: ['PHP', 'Node.js', 'MongoDB'],
  },
  {
    company: 'Retail Blitz Service',
    role: 'Full Stack Developer',
    period: '2020 — 2021',
    status: 'COMPLETED',
    coords: 'SECTOR 1-D',
    desc: 'Created retail management system with inventory tracking, sales analytics dashboards, and multi-store synchronization. Deployed on AWS with Docker.',
    stack: ['Laravel', 'React', 'Docker', 'AWS'],
  },
];

const MissionLogs = memo(function MissionLogs() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="logs" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-32">
      <div ref={ref} className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="mb-16">
          <span className="section-label block mb-3">/ 03 — MISSION LOGS</span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
              CAREER
            </span>{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              TRAJECTORY
            </span>
          </h2>
          <p className="font-mono text-[0.65rem] tracking-[0.15em] text-white/40 max-w-lg leading-relaxed">
            A chronological record of deployments. Each mission represents a system built, scaled, and delivered.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div
            className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{
              background: 'linear-gradient(to bottom, transparent, rgba(106,208,255,0.3) 10%, rgba(106,208,255,0.3) 90%, transparent)',
            }}
          />

          {MISSIONS.map((m, i) => {
            const left = i % 2 === 0;
            return (
              <div
                key={m.company}
                className="relative mb-12 last:mb-0"
                style={{
                  opacity: inView ? 1 : 0,
                  transform: inView ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 150}ms`,
                }}
              >
                <div className={`flex ${left ? 'sm:justify-start' : 'sm:justify-end'}`}>
                  <div
                    className="glass glass-hover hud-corner rounded-xl p-5 sm:p-6 w-full sm:w-[calc(50%-2rem)] relative"
                  >
                    {/* Node dot */}
                    <div
                      className="absolute top-6 w-3 h-3 rounded-full hidden sm:block"
                      style={{
                        [left ? 'right' : 'left']: 'calc(-2rem - 6px)',
                        background: m.status === 'ACTIVE' ? '#7cffa0' : '#6ad0ff',
                        boxShadow: `0 0 12px ${m.status === 'ACTIVE' ? '#7cffa0' : '#6ad0ff'}`,
                      } as React.CSSProperties}
                    />

                    {/* Header row */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span
                            className="font-mono text-[0.5rem] tracking-[0.2em] px-2 py-0.5 rounded-full"
                            style={{
                              background: m.status === 'ACTIVE' ? 'rgba(124,255,160,0.1)' : 'rgba(106,208,255,0.1)',
                              color: m.status === 'ACTIVE' ? '#7cffa0' : '#6ad0ff',
                              border: `1px solid ${m.status === 'ACTIVE' ? 'rgba(124,255,160,0.3)' : 'rgba(106,208,255,0.3)'}`,
                            }}
                          >
                            {m.status}
                          </span>
                          <span className="font-mono text-[0.5rem] tracking-[0.15em] text-white/30">
                            {m.coords}
                          </span>
                        </div>
                        <h3 className="font-display text-xl sm:text-2xl font-bold text-white/90">
                          {m.company}
                        </h3>
                        <p className="font-mono text-[0.6rem] tracking-[0.12em] text-cyan-300/70 uppercase mt-1">
                          {m.role}
                        </p>
                      </div>
                      <span className="font-mono text-[0.55rem] tracking-[0.1em] text-white/40 whitespace-nowrap">
                        {m.period}
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-white/60 leading-relaxed mb-4">
                      {m.desc}
                    </p>

                    {/* Stack */}
                    <div className="flex flex-wrap gap-1.5">
                      {m.stack.map((s) => (
                        <span
                          key={s}
                          className="font-mono text-[0.5rem] tracking-[0.1em] px-2 py-1 rounded-md text-white/50"
                          style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mobile node dot */}
                <div
                  className="absolute left-4 top-6 w-3 h-3 rounded-full -translate-x-1/2 sm:hidden"
                  style={{
                    background: m.status === 'ACTIVE' ? '#7cffa0' : '#6ad0ff',
                    boxShadow: `0 0 12px ${m.status === 'ACTIVE' ? '#7cffa0' : '#6ad0ff'}`,
                  }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default MissionLogs;
