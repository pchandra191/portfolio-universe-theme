import { useInView } from '@/hooks/useScroll';
import { memo } from 'react';
import { ExternalLink, FileText } from 'lucide-react';

const PROJECTS = [
  {
    name: 'EduPulse AI',
    tag: 'AI · EDUCATION SaaS · B2B and B2C',
    desc: 'A CRM platform with adaptive learning platform powered by AI.',
    stack: ['Agentic AI', 'React', 'Symfony', 'PostgreSQL'],
    metrics: { users: '0', Status: 'Under development', scale: 'Multi-tenant' },
    url: 'https://syntaxbase.online/edupulseai',
    logo: '/logos/edupulse-ai.webp'

  },
  {
    name: 'TruFin',
    tag: 'FINANCE SaaS · B2B',
    desc: 'AI-driven financial analytics platform for SMEs.',
    stack: ['React', 'MongoDB', 'Express.js'],
    metrics: { users: '0', Status: 'Under development', scale: 'Multi-tenant' },
    url: 'https://truefin.tech',
    logo: '/logos/trufin.webp'

  },
  {
    name: 'SyntaxBase',
    tag: 'AI · PROGRAMMING EDUCATION · COMMUNITY PLATFORM · B2C',
    desc: 'Code snippet management and API documentation hub with collaborative editing and version control.',
    stack: ['OpenAI', 'React', 'Symfony', 'MySQL'],
    metrics: { users: '200+', Status: 'Active', scale: '2K+'},
    url: 'https://syntaxbase.online',
    logo: '/logos/syntaxbase.webp'

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
            <span className="section-label block mb-3">/ 04 — COSMIC EXPANSION</span>
            <h2 className="font-display text-4xl sm:text-6xl font-bold leading-tight">
              <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                OWNED
              </span>{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                SYSTEMS
              </span>
            </h2>
          </div>
          <p className="font-mono text-[0.65rem] tracking-[0.15em] text-white/40 max-w-xs leading-relaxed">
            Lost in the Cosmos. Each one is built, scaled, and maintained in orbit.
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
                transform: inView ? 'translateY(0)' : 'translateY(20px)',
                transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms`,
              }}
            >
              {/* Glow on hover */}
              <div
                className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(106,208,255,0.08), transparent 60%)',
                }}
              />

              {/* Header */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-3">
                  <div
                    className="flex items-center justify-center shrink-0 overflow-hidden"
                  >
                    <img
                      src={p.logo}
                      alt={p.name}
                      className="w-12 h-12 object-contain"
                      loading="lazy"
                    />
                  </div>
                  <span className="font-mono text-[0.5rem] tracking-[0.2em] text-cyan-300/60 px-2.5 py-1 rounded-full border border-cyan-300/20">
                    {p.tag}
                  </span>
                </div>
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
                <button className="btn-hud text-[0.55rem] py-2 px-3" onClick={() => window.open(p.url, '_blank')}>
                  <ExternalLink size={11} />
                  Launch
                </button>
                <button className="btn-hud text-[0.55rem] py-2 px-3">
                  <FileText size={11} />
                  Details
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
