import { useInView } from '@/hooks/useScroll';
import { memo } from 'react';
import { ExternalLink, Sparkles, Brain, BarChart3, GraduationCap, Zap, ShieldCheck } from 'lucide-react';

const FEATURES = [
  { icon: Brain, title: 'AI-Powered Coaching', desc: 'Intelligent tutoring system that adapts to individual student learning patterns.' },
  { icon: BarChart3, title: 'Performance Analytics', desc: 'Real-time student performance tracking with actionable insights for educators.' },
  { icon: GraduationCap, title: 'Teacher Workflows', desc: 'Streamlined tools for creating, assigning, and grading assessments at scale.' },
  { icon: Zap, title: 'AI Test Generation', desc: 'Automatically generate practice tests and quizzes from curriculum content.' },
  { icon: ShieldCheck, title: 'Personalized Learning', desc: 'Weak-topic identification and customized learning paths for each student.' },
];

const EduPulseAI = memo(function EduPulseAI() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section id="edupulse" className="relative min-h-screen flex flex-col justify-center px-4 sm:px-6 py-32">
      <div ref={ref} className="max-w-5xl mx-auto w-full">
        {/* Header */}
        <div className="mb-16 sm:mb-20" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.22,1,0.36,1)',
        }}>
          <span className="section-label block mb-3">/ 06 — New Galaxy</span>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-4">
            <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
              EDUPULSE
            </span>{' '}
            <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent">
              AI
            </span>
          </h2>
          <p className="font-mono text-[0.65rem] tracking-[0.15em] text-white/40 max-w-lg leading-relaxed">
            A new galaxy forming. AI-powered education platform built from scratch.
          </p>
        </div>

        {/* Hero statement */}
        <div className="mb-16 sm:mb-20 glass rounded-2xl p-8 sm:p-10 relative overflow-hidden" style={{
          opacity: inView ? 1 : 0,
          transform: inView ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 1s cubic-bezier(0.22,1,0.36,1) 150ms',
        }}>
          <div className="absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" style={{
            background: 'linear-gradient(135deg, rgba(106,208,255,0.08), transparent 60%)',
          }} />
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={20} className="text-cyan-300/70" />
            <span className="font-mono text-[0.6rem] tracking-[0.2em] text-cyan-300/60 uppercase">
              Founder & Builder
            </span>
          </div>
          <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-3xl">
            EduPulse AI is an AI-powered coaching platform designed to transform how students learn and teachers teach. 
            From student performance analytics to automated test generation, the platform personalizes education 
            at scale using modern AI and full-stack engineering.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            <a href="https://syntaxbase.online/edupulseai" target="_blank" rel="noopener noreferrer" className="btn-hud btn-hud-primary text-[0.55rem] py-2 px-3">
              <ExternalLink size={11} />
              Visit Platform
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="mb-16 sm:mb-20">
          <div className="font-mono text-[0.55rem] tracking-[0.2em] text-white/30 uppercase mb-6">
            Platform Capabilities
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {FEATURES.map((f, i) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="glass glass-hover hud-corner rounded-xl p-5 sm:p-6 group"
                  style={{
                    opacity: inView ? 1 : 0,
                    transform: inView ? 'translateY(0)' : 'translateY(20px)',
                    transition: `all 0.8s cubic-bezier(0.22,1,0.36,1) ${i * 70}ms`,
                  }}
                >
                  <Icon size={18} className="text-cyan-300/70 mb-3" />
                  <h4 className="font-display text-base font-bold text-white/90 mb-1">
                    {f.title}
                  </h4>
                  <p className="text-xs text-white/55 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tech stack */}
        <div>
          <div className="font-mono text-[0.55rem] tracking-[0.2em] text-white/30 uppercase mb-4">
            Powering the platform
          </div>
          <div className="flex flex-wrap gap-2">
            {['React', 'Symfony', 'PostgreSQL', 'OpenAI', 'Multi-tenant', 'REST API'].map((t) => (
              <span
                key={t}
                className="font-mono text-xs tracking-[0.08em] px-3 py-1.5 rounded-full text-white/60"
                style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

export default EduPulseAI;
