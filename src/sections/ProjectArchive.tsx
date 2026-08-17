import { useInView } from '@/hooks/useScroll';
import { memo } from 'react';
import { ExternalLink } from 'lucide-react';

const PROJECTS = [
  {
    name: 'Retail Blitz Service',
    tag: 'RETAIL · ERP · CLOUD',
    desc: 'Enterprise retail management system with inventory tracking, sales analytics dashboards, and multi-store synchronization. Deployed on AWS with PostgreSQL.',
    stack: ['Laravel', 'React', 'Docker', 'AWS', 'PostgreSQL', 'OAuth2'],
    url: null,
    featured: true,
  },
  {
    name: 'Retail Blitz React / MERN',
    tag: 'RETAIL · DASHBOARD · REALTIME',
    desc: 'React-based frontend for retail management. Real-time inventory updates, interactive sales analytics, and multi-store dashboard with role-based access.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    url: null,
    featured: true,
  },
  {
    name: 'VSUIT CRM',
    tag: 'CRM · AUTOMATION · API',
    desc: 'Comprehensive CRM suite for Text-to-speech conversion, SMS/Whatsapp, Landing pages and email analytics. Custom workflow automation, role-based access control, and REST API integrations.',
    stack: ['PHP', 'Node.js', 'MongoDB', 'MySQL', 'RabbitMQ', 'Azure'],
    url: null,
    featured: true,
  },
  {
    name: 'Vinmax Website',
    tag: 'CORPORATE · MARKETING · WEB',
    desc: 'Corporate website and marketing platform with lead generation workflows and campaign management capabilities.',
    stack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    url: null,
    featured: false,
  },
  {
    name: 'EXPEDREVIEW',
    tag: 'REVIEWS · BOOKING · API',
    desc: 'RESTful APIs for adventure expedition review and booking platform. Service Listing integration, Payment integration, and custom content management system.',
    stack: ['Laravel', 'JavaScript', 'MySQL', 'Stripe'],
    url: null,
    featured: true,
  },
  {
    name: 'MINUET',
    tag: 'PRODUCTIVITY · SAAS · PAYMENTS',
    desc: 'Full-stack time management and productivity platform. User authentication, task scheduling, real-time notifications, Stripe payment integration, Google Places API, and analytics.',
    stack: ['Laravel', 'JavaScript', 'MySQL', 'Stripe', 'Google Places API'],
    url: null,
    featured: true,
  },
  {
    name: 'Sani Aktiv',
    tag: 'ERP · INVENTORY · ANALYTICS',
    desc: 'Comprehensive ERP system for inventory management, sales tracking, and customer relationship management. Real-time data analytics with Google Analytics & Tag Manager.',
    stack: ['Symfony', 'React', 'AWS', 'MySQL', 'Google Analytics'],
    url: null,
    featured: true,
  },
  {
    name: 'SyntaxBase',
    tag: 'EDUCATION · AI · COMMUNITY',
    desc: 'Code snippet management and API documentation hub with collaborative editing and version control. AI-powered features for learning and knowledge sharing.',
    stack: ['OpenAI', 'React', 'Symfony', 'MySQL'],
    url: 'https://syntaxbase.online',
    featured: false,
  },
  {
    name: 'Finance Calculator',
    tag: 'FINTECH · TOOL · REACT',
    desc: 'Financial calculation tool for personal and business use. Built with React for interactive UI and real-time computation.',
    stack: ['React', 'JavaScript'],
    url: null,
    featured: false,
  },
  {
    name: 'Giphy GIF Scroll Unlimited',
    tag: 'SEARCH · API · INFINITE SCROLL',
    desc: 'Web application for searching and scrolling through GIFs from the Giphy API with infinite scrolling and responsive design.',
    stack: ['Vue.js', 'MongoDB', 'Node.js', 'Express.js'],
    url: 'https://github.com/pchandra191/Giphy-unlimited_scrolling-VUE',
    featured: false,
  },
  {
    name: 'Upcoming Movies Scroll Unlimited',
    tag: 'ENTERTAINMENT · API · INFINITE SCROLL',
    desc: 'Movie discovery application with infinite scrolling, built to explore movie data APIs and modern frontend patterns.',
    stack: ['Vue.js', 'Node.js', 'Express.js'],
    url: null,
    featured: false,
  },
  {
    name: 'Todo List',
    tag: 'PRODUCTIVITY · CRUD · FULL STACK',
    desc: 'Classic task management application with full CRUD operations, built to demonstrate core full-stack patterns.',
    stack: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    url: null,
    featured: false,
  },
];

const ProjectArchive = memo(function ProjectArchive() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="archive" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-32">
      <div ref={ref} className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="mb-20 sm:mb-28">
          <span className="section-label block mb-3">/ 03 — Project Archive</span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
              SYSTEMS
            </span>{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              BUILT
            </span>
          </h2>
          <p className="font-mono text-[0.65rem] tracking-[0.15em] text-white/40 max-w-lg leading-relaxed">
            Each project is a distinct stellar object — from enterprise platforms to experimental missions.
          </p>
        </div>

        {/* Projects */}
        <div className="space-y-16 sm:space-y-24">
          {PROJECTS.map((p, i) => (
            <div
              key={p.name}
              className="group"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(40px)',
                transition: `all 1s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms`,
              }}
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-12">
                {/* Left: Title + meta */}
                <div className="lg:w-1/3">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-mono text-[0.5rem] tracking-[0.2em] text-cyan-300/60 px-2.5 py-1 rounded-full border border-cyan-300/20">
                      {p.tag}
                    </span>
                  </div>
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white/90 mb-3 group-hover:text-white transition-colors leading-tight">
                    {p.name}
                  </h3>
                  <p className="text-sm sm:text-base text-white/55 leading-relaxed mb-4">
                    {p.desc}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.stack.map((s) => (
                      <span
                        key={s}
                        className="font-mono text-[0.6rem] sm:text-xs tracking-[0.08em] px-2.5 py-1 rounded-md text-white/50"
                        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  {p.url && (
                    <button className="btn-hud text-[0.55rem] py-2 px-3" onClick={() => window.open(p.url, '_blank')}>
                      <ExternalLink size={11} />
                      Launch System
                    </button>
                  )}
                </div>

                {/* Right: Visual representation / details */}
                <div className="lg:w-2/3 glass rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                  <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
                    background: 'linear-gradient(135deg, rgba(106,208,255,0.06), transparent 60%)',
                  }} />
                  
                  <div className="font-mono text-[0.55rem] tracking-[0.2em] text-white/30 mb-4">
                    SYSTEM ARCHITECTURE
                  </div>
                  
                  <div className="space-y-4">
                    {p.stack.map((tech, idx) => (
                      <div key={tech} className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-cyan-300/40" style={{
                          boxShadow: '0 0 8px rgba(106,208,255,0.3)',
                        }} />
                        <span className="font-mono text-sm text-white/70">{tech}</span>
                        <span className="font-mono text-[0.55rem] text-white/20 ml-auto">
                          {['Core', 'Runtime', 'Data', 'Deploy'][idx % 4]}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/8">
                    <div className="font-mono text-[0.55rem] tracking-[0.15em] text-white/30 mb-2">
                      KEY CAPABILITIES
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.name.includes('Retail Blitz') && ['Inventory', 'Sales Analytics', 'Multi-Store Sync', 'AWS Deploy'].map(f => (
                        <span key={f} className="font-mono text-[0.6rem] text-white/40 px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.02)' }}>{f}</span>
                      ))}
                      {p.name.includes('VSUIT') && ['CRM', 'TTS', 'SMS/WhatsApp', 'Email Analytics', 'RBAC'].map(f => (
                        <span key={f} className="font-mono text-[0.6rem] text-white/40 px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.02)' }}>{f}</span>
                      ))}
                      {(p.name === 'Vinmax Website') && ['Corporate', 'Lead Gen', 'Campaigns', 'Marketing'].map(f => (
                        <span key={f} className="font-mono text-[0.6rem] text-white/40 px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.02)' }}>{f}</span>
                      ))}
                      {p.name.includes('EXPEDREVIEW') && ['REST API', 'Bookings', 'Payments', 'CMS'].map(f => (
                        <span key={f} className="font-mono text-[0.6rem] text-white/40 px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.02)' }}>{f}</span>
                      ))}
                      {p.name.includes('MINUET') && ['Auth', 'Task Scheduling', 'Notifications', 'Stripe', 'Google Places'].map(f => (
                        <span key={f} className="font-mono text-[0.6rem] text-white/40 px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.02)' }}>{f}</span>
                      ))}
                      {p.name.includes('Sani Aktiv') && ['ERP', 'Inventory', 'Sales Tracking', 'CRM', 'Analytics'].map(f => (
                        <span key={f} className="font-mono text-[0.6rem] text-white/40 px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.02)' }}>{f}</span>
                      ))}
                      {p.name.includes('SyntaxBase') && ['AI Docs', 'Collaboration', 'Version Control'].map(f => (
                        <span key={f} className="font-mono text-[0.6rem] text-white/40 px-2 py-1 rounded" style={{ background: 'rgba(255,255,255,0.02)' }}>{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Divider */}
              {i < PROJECTS.length - 1 && (
                <div className="mt-16 sm:mt-24 w-full h-px" style={{
                  background: 'linear-gradient(to right, transparent, rgba(106,208,255,0.15) 50%, transparent)',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default ProjectArchive;
