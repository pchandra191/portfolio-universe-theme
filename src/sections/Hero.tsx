import { useEffect, useState, useRef, memo } from 'react';
import { Rocket, ChevronDown } from 'lucide-react';

const OPENING_LINES = [
  'Some journeys begin with a single line of code...',
  'Others span galaxies.',
];

const Hero = memo(function Hero() {
  const [typed, setTyped] = useState('');
  const [done, setDone] = useState(false);
  const lineIdxRef = useRef(0);
  const typedRef = useRef('');
  const rafRef = useRef<number>(0);
  const lastTickRef = useRef<number>(0);

  useEffect(() => {
    const TICK_MS = 35;
    const LINE_DELAY_MS = 1400;
    const LOOP_DELAY_MS = 3000;

    const tick = (ts: number) => {
      if (ts - lastTickRef.current >= TICK_MS) {
        lastTickRef.current = ts;
        const idx = lineIdxRef.current;
        const full = OPENING_LINES[idx];
        const current = typedRef.current;

        if (current.length < full.length) {
          typedRef.current = full.slice(0, current.length + 1);
          setTyped(typedRef.current);
        } else {
          if (idx < OPENING_LINES.length - 1) {
            setTimeout(() => {
              lineIdxRef.current = idx + 1;
              typedRef.current = '';
              setTyped('');
            }, LINE_DELAY_MS);
          } else {
            setDone(true);
            setTimeout(() => {
              lineIdxRef.current = 0;
              typedRef.current = '';
              setTyped('');
              setDone(false);
            }, LOOP_DELAY_MS);
          }
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const scrollToNext = () => {
    document.getElementById('profile')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-4 sm:px-6"
    >
      {/* Mission badge */}
      <div className="glass rounded-full px-4 py-1.5 mb-8 flex items-center gap-2.5 reveal in-view">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" style={{ animation: 'blink 2s ease-in-out infinite' }} />
        <span className="font-mono text-[0.6rem] sm:text-[0.65rem] tracking-[0.25em] text-white/60">
          MISSION 001 · DEEP SPACE TRAVERSAL
        </span>
      </div>

      {/* Opening cinematic text */}
      <div className="h-8 sm:h-9 flex items-center justify-center mb-8">
        <p className="font-mono text-[0.7rem] sm:text-xs tracking-[0.15em] text-cyan-300/70 text-center max-w-md">
          {typed}
          <span className="inline-block w-1.5 h-3 bg-cyan-400 ml-0.5 align-middle" style={{ animation: 'blink 0.8s step-end infinite' }} />
        </p>
      </div>

      {/* Massive title */}
      <h1
        className="font-display text-center leading-[0.95] text-balance px-2"
        style={{
          fontSize: 'clamp(2.75rem, 11vw, 9rem)',
          fontWeight: 700,
          textShadow: '0 0 80px rgba(106,208,255,0.25)',
        }}
      >
        <span className="block bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent">
          PRABHAT
        </span>
        <span className="block bg-gradient-to-b from-cyan-200 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
          CHANDRA
        </span>
      </h1>

      {/* Subtitle */}
      <div
        className="mt-8 flex flex-col items-center gap-3 transition-all duration-1000"
        style={{ opacity: done ? 1 : 0, transform: done ? 'translateY(0)' : 'translateY(10px)' }}
      >
        <p className="font-mono text-xs sm:text-sm tracking-[0.3em] text-white/70 uppercase">
          Full Stack Software Developer
        </p>
        <p className="font-mono text-[0.6rem] sm:text-[0.65rem] tracking-[0.2em] text-white/40 uppercase">
          5+ Years Building Digital Worlds
        </p>
      </div>

      {/* CTA */}
      <div
        className="mt-12 flex flex-col sm:flex-row items-center gap-4 transition-all duration-1000"
        style={{ opacity: done ? 1 : 0, transform: done ? 'translateY(0)' : 'translateY(10px)' }}
      >
        <button onClick={scrollToNext} className="btn-hud btn-hud-primary group">
          <Rocket size={14} />
          Begin Mission
        </button>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="font-mono text-[0.55rem] tracking-[0.25em] text-white/30">SCROLL TO TRAVERSE</span>
        <ChevronDown
          size={18}
          className="text-white/40"
          style={{ animation: 'pulse-glow 2s ease-in-out infinite' }}
        />
      </div>

      {/* Corner HUD decorations */}

      <div className="absolute top-24 right-4 sm:right-6 hidden md:block text-right">
        <div className="font-mono text-[0.55rem] tracking-[0.2em] text-white/30 leading-relaxed">
          <div>EARTH</div>
          <div>EST. ~4.54 BILLION YRS</div>
          <div>HUMAN · ~650,000 YRS</div>
          <div>STATUS · WORKING</div>
        </div>
      </div>
      <div className="absolute top-24 left-4 sm:left-6 hidden md:block">
        <div className="font-mono text-[0.55rem] tracking-[0.2em] text-white/30 leading-relaxed">
          <div>OBSERVABLE UNIVERSE</div>
          <div>RADIUS · 46.5 BILLION light-years</div>
          <div>VELOCITY · 70 km/s/Mpc</div>
          <div>AGE · ~13.8 BILLION YRS</div>
        </div>
      </div>
      {/* <div className="absolute top-24 middle right-4 sm:  right-6 hidden md:block text-right">
        <div className="font-mono text-[0.55rem] tracking-[0.2em] text-white/30 leading-relaxed">
          <div>CODING</div>
          <div>EST. ~4.54 BILLION YRS</div>
          <div>HUMAN · ~650,000 YRS</div>
          <div>STATUS · WORKING</div>
        </div>
      </div> */}
    </section>
  );
});

export default Hero;
