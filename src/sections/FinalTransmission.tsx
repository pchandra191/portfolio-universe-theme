import { useInView } from '@/hooks/useScroll';
import { memo } from 'react';
import { Mail, Github, Linkedin, FileText, Radio } from 'lucide-react';

const FinalTransmission = memo(function FinalTransmission() {
  const { ref, inView } = useInView<HTMLDivElement>(0.15);

  return (
    <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 py-32">
        <div ref={ref} className="max-w-3xl mx-auto w-full text-center">
         {/* Terminal header */}
         <div className="glass rounded-2xl overflow-hidden mb-8" style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)' }}>
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-white/8" style={{ background: 'rgba(255,255,255,0.02)' }}>
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            <span className="font-mono text-[0.5rem] tracking-[0.2em] text-white/40 ml-2">
              TRANSMISSION_TERMINAL · v5.0
            </span>
            <Radio size={11} className="text-emerald-400 ml-auto" style={{ animation: 'blink 1.5s ease-in-out infinite' }} />
          </div>

          {/* Terminal body */}
          <div className="p-6 sm:p-10 text-left">
            <p className="font-mono text-[0.6rem] tracking-[0.15em] text-emerald-400/70 mb-2">
              {'>'} ESTABLISHING CONNECTION...
            </p>
            <p className="font-mono text-[0.6rem] tracking-[0.15em] text-white/40 mb-1">
              {'>'} SIGNAL ACQUIRED.
            </p>
            <p className="font-mono text-[0.6rem] tracking-[0.15em] text-white/40 mb-6">
              {'>'} TRANSMISSION READY.
            </p>

            <div
              className="transition-all duration-1000"
              style={{ opacity: inView ? 1 : 0, transform: inView ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.8s cubic-bezier(0.22,1,0.36,1)' }}
            >
              <h2 className="font-display text-3xl sm:text-5xl font-bold leading-tight mb-2">
                <span className="bg-gradient-to-b from-white to-white/50 bg-clip-text text-transparent">
                  MISSION COMPLETE.
                </span>
              </h2>
              <p className="font-mono text-xs sm:text-sm tracking-[0.2em] text-cyan-300/80 uppercase mb-6">
                Ready for the next challenge.
              </p>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-8 text-balance">
                Let's build something{' '}
                <span className="bg-gradient-to-r from-cyan-300 to-indigo-400 bg-clip-text text-transparent font-medium">
                  extraordinary.
                </span>
              </p>
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
              <a href="mailto:pchandra114@hotmail.com" className="btn-hud flex-col h-auto py-4 gap-2">
                <Mail size={18} />
                <span className="text-[0.55rem]">Email</span>
              </a>
              <a href="https://github.com/pchandra191" target="_blank" rel="noopener noreferrer" className="btn-hud flex-col h-auto py-4 gap-2">
                <Github size={18} />
                <span className="text-[0.55rem]">GitHub</span>
              </a>
              <a href="https://linkedin.com/in/prabhatchandra114" target="_blank" rel="noopener noreferrer" className="btn-hud flex-col h-auto py-4 gap-2">
                <Linkedin size={18} />
                <span className="text-[0.55rem]">LinkedIn</span>
              </a>
              <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-hud flex-col h-auto py-4 gap-2">
                <FileText size={18} />
                <span className="text-[0.55rem]">Resume</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col items-center gap-3 mt-12">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: 'blink 2s ease-in-out infinite' }} />
            <span className="font-mono text-[0.55rem] tracking-[0.2em] text-white/40">
              SIGNAL MAINTAINED DUE TO GRAVITY
            </span>
          </div>
          <p className="font-mono text-[0.5rem] tracking-[0.15em] text-white/25">
            PRABHAT CHANDRA · FULL STACK SOFTWARE DEVELOPER · 2026
          </p>
        </div>
      </div>
    </section>
  );
});

export default FinalTransmission;
