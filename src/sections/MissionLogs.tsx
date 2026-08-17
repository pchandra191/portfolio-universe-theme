import { useInView } from '@/hooks/useScroll';
import { memo } from 'react';
import { Stars } from 'lucide-react';

const CAREER = [
  {
    year: '2017',
    company: 'Think N Apply',
    role: 'PHP Web Developer',
    period: 'Jun 2017 — Aug 2017',
    coords: 'Ahmedabad, GJ',
    desc: 'Foundation mission. Built PHP-based web applications with a focus on database design, server-side logic, and frontend integration.',
    projects: [],
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
    type: 'origin',
  },
  {
    year: '2020',
    company: 'URSAG Information Technology Services',
    role: 'Full Stack Software Developer',
    period: 'Mar 2020 — Aug 2022',
    coords: 'Ahmedabad, GJ',
    desc: 'First major galaxy. Built retail management systems and cloud-deployed applications serving multiple stores with real-time synchronization.',
    projects: [
      { name: 'Retail Blitz Service', desc: 'Retail management system with inventory tracking, sales analytics dashboards, and multi-store synchronization. Deployed on AWS.' },
      { name: 'Retail Blitz React / MERN', desc: 'React-based frontend for retail management with real-time inventory updates and interactive analytics dashboards.' },
    ],
    tech: ['Laravel', 'React', 'Docker', 'AWS', 'PostgreSQL', 'OAuth2'],
    type: 'galaxy',
  },
  {
    year: '2022',
    company: 'Vinbox Martech Pvt. Ltd.',
    role: 'Full Stack Software Developer',
    period: 'Aug 2022 — Sep 2023',
    coords: 'Gurgaon, HR',
    desc: 'Marketing technology galaxy. Built CRM infrastructure for text-to-speech, messaging automation, and campaign analytics at scale.',
    projects: [
      { name: 'VSUIT CRM', desc: 'Comprehensive CRM suite for Text-to-speech conversion, SMS/Whatsapp, Landing pages and email analytics integration with custom workflow automation, role-based access control, and REST API integrations for third-party services.' },
      { name: 'Vinmax Website', desc: 'Corporate website and marketing platform with lead generation workflows and campaign management.' },
    ],
    tech: ['PHP', 'Node.js', 'MongoDB', 'MySQL', 'RabbitMQ', 'Azure'],
    type: 'galaxy',
  },
  {
    year: '2023',
    company: 'Qodic Technosoft',
    role: 'Full Stack Software Developer',
    period: 'Oct 2023 — Jan 2025',
    coords: 'Ahmedabad, GJ',
    desc: 'Product development galaxy. Shipped two major platforms: an expedition review system and a productivity suite with payment infrastructure.',
    projects: [
      { name: 'EXPEDREVIEW', desc: 'RESTful APIs for a review and booking platform for adventure expeditions. Implemented Service Listing integration, Payment integration, and a custom content management system.' },
      { name: 'MINUET', desc: 'Full-stack web application for time management and productivity. Implemented user authentication, task scheduling, real-time notifications, Stripe payment integration, and third-party APIs for Google Places and analytics.' },
    ],
    tech: ['Laravel', 'JavaScript', 'MySQL', 'Stripe', 'Google Places API'],
    type: 'galaxy',
  },
  {
    year: '2025',
    company: 'DRC Systems',
    role: 'Full Stack Software Developer',
    period: 'Apr 2025 — Dec 2025',
    coords: 'GIFT City, GJ',
    desc: 'Enterprise ERP galaxy. Developed comprehensive resource planning system for inventory, sales, and customer relationship management.',
    projects: [
      { name: 'Sani Aktiv', desc: 'Comprehensive ERP system for inventory management, sales tracking, and customer relationship management. Real-time data analytics with Google Analytics & Tag Manager for insights and reporting.' },
    ],
    tech: ['Symfony', 'React', 'AWS', 'MySQL', 'Google Analytics'],
    type: 'galaxy',
  },
];

const MissionLogs = memo(function MissionLogs() {
  const { ref, inView } = useInView<HTMLDivElement>(0.1);

  return (
    <section id="logs" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-32">
      <div ref={ref} className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="mb-24 sm:mb-32">
          <span className="section-label block mb-3">/ 02 — Career Trajectory</span>
          <h2 className="font-display text-4xl sm:text-6xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
              OBSERVABLE
            </span>{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              CAREER
            </span>
          </h2>
          <p className="font-mono text-[0.65rem] tracking-[0.15em] text-white/40 max-w-lg leading-relaxed">
            A continuous journey through companies, projects, and technologies — each one a galaxy in the software cosmos.
          </p>
        </div>

        {/* Career journey */}
        <div className="relative">
          {CAREER.map((m, i) => (
            <div
              key={m.company}
              className="relative mb-24 sm:mb-32 last:mb-0"
              style={{
                opacity: inView ? 1 : 0,
                transform: inView ? 'translateY(0)' : 'translateY(30px)',
                transition: `all 1s cubic-bezier(0.22,1,0.36,1) ${i * 120}ms`,
              }}
            >
              {/* Year marker */}
              <div className="flex items-start gap-6 sm:gap-10 mb-8">
                <div className="shrink-0 w-16 sm:w-24">
                  <div className="font-display text-4xl sm:text-6xl font-bold bg-gradient-to-b from-white/80 to-white/20 bg-clip-text text-transparent leading-none">
                    {m.year}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-mono text-[0.5rem] tracking-[0.2em] text-white/30 uppercase">
                      {m.type === 'origin' ? 'ORIGIN POINT' : 'GALAXY'}
                    </span>
                    <span className="font-mono text-[0.5rem] tracking-[0.15em] text-white/20">
                      {m.coords}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl sm:text-4xl font-bold text-white/90 mb-1">
                    {m.company}
                  </h3>
                  <p className="font-mono text-[0.6rem] sm:text-xs tracking-[0.12em] text-cyan-300/70 uppercase">
                    {m.role}
                  </p>
                  <p className="font-mono text-[0.55rem] tracking-[0.1em] text-white/30 mt-1">
                    {m.period}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm sm:text-base text-white/55 leading-relaxed mb-8 max-w-3xl ml-0 sm:ml-28">
                {m.desc}
              </p>

              {/* Projects */}
              {m.projects.length > 0 && (
                <div className="ml-0 sm:ml-28 space-y-4 mb-8">
                  {m.projects.map((p) => (
                    <div
                      key={p.name}
                      className="glass glass-hover hud-corner rounded-xl p-5 sm:p-6 group relative overflow-hidden"
                      style={{
                        opacity: inView ? 1 : 0,
                        transform: inView ? 'translateX(0)' : 'translateX(-10px)',
                        transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) 300ms`,
                      }}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-display text-lg sm:text-xl font-bold text-white/90 group-hover:text-white transition-colors">
                          {p.name}
                        </h4>
                        <Stars size={14} className="text-cyan-300/50 mt-1 shrink-0" />
                      </div>
                      <p className="text-xs sm:text-sm text-white/55 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Technology constellation */}
              <div className="ml-0 sm:ml-28">
                <div className="font-mono text-[0.5rem] tracking-[0.2em] text-white/30 uppercase mb-3">
                  Technologies in this galaxy
                </div>
                <div className="flex flex-wrap gap-2">
                  {m.tech.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[0.6rem] sm:text-xs tracking-[0.1em] px-3 py-1.5 rounded-full text-white/60 transition-colors hover:text-cyan-300"
                      style={{
                        background: 'rgba(255,255,255,0.03)',
                        border: '1px solid rgba(255,255,255,0.08)',
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Divider */}
              {i < CAREER.length - 1 && (
                <div className="mt-16 sm:mt-24 ml-0 sm:ml-28 w-full h-px" style={{
                  background: 'linear-gradient(to right, rgba(106,208,255,0.2), transparent 80%)',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
});

export default MissionLogs;
