import { useInView } from '@/hooks/useScroll';
import { memo } from 'react';
import { ExternalLink, FileText, Github } from 'lucide-react';

const PROJECTS = [
  {
    name: 'Wellness Platform',
    tag: 'FULL STACK · SaaS',
    desc: 'AI-powered wellness ecosystem with real-time activity tracking, personalized recommendations, and multi-tenant architecture.',
    stack: ['Symfony', 'React', 'AWS', 'MySQL'],
    metrics: { users: '10K+', uptime: '99.9%', scale: 'Multi-tenant' },
  },
  {
    name: 'Expedition Booking',
    tag: 'WEB APP · BOOKING',
    desc: 'Multi-language expedition review and booking platform with integrated payments and custom CMS.',
    stack: ['Laravel', 'JavaScript', 'MySQL'],
    metrics: { langs: '5', bookings: '2K+', rating: '4.8★' },
  },
  {
    name: 'CRM Suite',
    tag: 'ENTERPRISE · CRM',
    desc: 'Comprehensive CRM with workflow automation, role-based access, and REST API integrations.',
    stack: ['PHP', 'Node.js', 'MongoDB'],
    metrics: { workflows: '50+', apis: '20+', teams: '100+' },
  },
  {
    name: 'Retail Manager',
    tag: 'FULL STACK · RETAIL',
    desc: 'Multi-store retail management system with inventory tracking, sales analytics, and real-time sync.',
    stack: ['Laravel', 'React', 'Docker', 'AWS'],
    metrics: { stores: '50+', items: '100K', sync: 'Real-time' },
  },
];

const ProjectArchive = memo(function ProjectArchive() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="archive" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-32">
      <div ref={ref} className="max-w-6xl mx-auto w-full">
        {/* Header */}
        <div className="mb-16 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <span className="section-label block mb-3">/ 04 — PROJECT ARCHIVE</span>
            <h2 className="font-display text-4xl sm:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                DEPLOYED
              </span>{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                SYSTEMS
              </span>
            </h2>
          </div>
          <p className="font-mono text-[0.65rem] tracking-[0.15em] text-white/40 max-w-xs leading-relaxed">
            Production-grade systems. Each one launched, scaled, and maintained in orbit.
          </p>
        </div>

        {/* Project grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((p, i) => (
            <div
              key={p.name}
              className="glass glass-hover hud-corner rounded-2xl p-6 sm:p-7 group relative overflow-hidden"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(106,208,255,0.08), transparent 60%)',
                }}
              />

              {/* Tag + index */}
              <div className="flex items-center justify-between mb-5">
                <span className="font-mono text-[0.5rem] tracking-[0.2em] text-cyan-300/60 px-2.5 py-1 rounded-full border border-cyan-300/20">
                  {p.tag}
                </span>
                <span className="font-mono text-[0.5rem] tracking-[0.15em] text-white/25">
                  {String(i + 1).padStart(3, '0')}
                </span>
              </div>

              {/* Name */}
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white/90 mb-3 group-hover:text-white transition-colors">
                {p.name}
              </h3>

              {/* Desc */}
              <p className="text-sm text-white/55 leading-relaxed mb-5">
                {p.desc}
              </p>

              {/* Metrics */}
              <div className="flex flex-wrap gap-4 mb-5 pb-5 border-b border-white/8">
                {Object.entries(p.metrics).map(([k, v]) => (
                  <div key={k}>
                    <div className="font-mono text-[0.5rem] tracking-[0.15em] text-white/30 uppercase mb-0.5">
                      {k}
                    </div>
                    <div className="font-mono text-xs text-cyan-300/80">
                      {v}
                    </div>
                  </div>
                ))}
              </div>

              {/* Stack */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {p.stack.map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[0.5rem] tracking-[0.1em] px-2 py-1 rounded-md text-white/50"
                    style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}
                  >
                    {s}
                  </span>
                ))}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2">
                <button className="btn-hud text-[0.55rem] py-2 px-3">
                  <ExternalLink size={11} />
                  Launch
                </button>
                <button className="btn-hud text-[0.55rem] py-2 px-3">
                  <FileText size={11} />
                  Details
                </button>
                <button className="btn-hud text-[0.55rem] py-2 px-3">
                  <Github size={11} />
                  Source
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ProjectArchive;
