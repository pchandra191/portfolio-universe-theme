import { useEffect, useState, useCallback, memo } from 'react';

const NAV_ITEMS = [
  { id: 'hero', label: 'ORIGIN', idx: '00' },
  { id: 'profile', label: 'PROFILE', idx: '01' },
  { id: 'engine', label: 'TECHNOLOGY', idx: '02' },
  { id: 'logs', label: 'EXPERIENCE', idx: '03' },
  { id: 'archive', label: 'PROJECTS', idx: '04' },
  { id: 'experiments', label: 'LAB', idx: '05' },
  { id: 'edupulse', label: 'EDUPULSE AI', idx: '06' },
  { id: 'contact', label: 'CONTACT', idx: '07' },
];

const REGIONS = [
  'OBSERVABLE UNIVERSE',
  'COSMIC WEB',
  'SUPERCLUSTERS',
  'GALAXY CLUSTERS',
  'MILKY WAY',
  'SOLAR SYSTEM',
  'EARTH ORBIT',
  'DIGITAL WORLD',
  'CAREER JOURNEY',
  'MISSION COMPLETE',
];

const HudNav = memo(function HudNav({
  activeSection,
  scrollPct,
}: {
  activeSection: string;
  scrollPct: number;
}) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setCoords({
          x: Math.floor((e.clientX / window.innerWidth) * 360),
          y: Math.floor((e.clientY / window.innerHeight) * 180),
        });
      });
    };
    window.addEventListener('mousemove', onMove);
    return () => {
      window.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  const regionIdx = Math.min(
    REGIONS.length - 1,
    Math.floor((scrollPct / 100) * REGIONS.length)
  );

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Mobile top nav */}
      <nav className="lg:hidden fixed top-0 left-0 right-0 z-50 px-4 pt-[env(safe-area-inset-top)] pb-3">
        <div className="glass rounded-full px-3 py-2 flex items-center justify-between gap-2 overflow-hidden">
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" style={{ animation: 'blink 2s ease-in-out infinite' }} />
            <span className="font-mono text-[0.5rem] tracking-[0.15em] text-emerald-300/90">ACTIVE</span>
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            <div className="w-12 h-1 rounded-full bg-white/10 overflow-hidden shrink-0">
              <div
                className="h-full rounded-full origin-left"
                style={{
                  transform: `scaleX(${scrollPct / 100})`,
                  background: 'linear-gradient(90deg, #6ad0ff, #b07cff)',
                  boxShadow: '0 0 6px rgba(106,208,255,0.5)',
                }}
              />
            </div>
            <span className="font-mono text-[0.5rem] tabular-nums text-white/60 w-7 text-right shrink-0 inline-block overflow-hidden">
              {scrollPct.toFixed(0)}%
            </span>
          </div>
        </div>
      </nav>

      {/* Mobile bottom nav */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-50 px-4 pb-[env(safe-area-inset-bottom)] pt-3">
        <div className="glass rounded-full px-3 py-2 flex items-center justify-between gap-1 overflow-x-auto">
          {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="shrink-0 px-2.5 py-1 font-mono text-[0.55rem] tracking-[0.15em] transition-colors"
                style={{ color: activeSection === item.id ? '#6ad0ff' : 'rgba(255,255,255,0.35)' }}
              >
                {item.idx}
              </button>
          ))}
        </div>
      </nav>

      {/* Desktop top nav */}
      <nav className="hidden lg:block fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3" style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
        <div className="glass rounded-full px-4 sm:px-6 py-2.5 flex items-center gap-4 overflow-hidden" style={{ transform: 'translateZ(0)', backfaceVisibility: 'hidden' }}>
          {/* Left: status */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 min-w-0">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" style={{ animation: 'blink 2s ease-in-out infinite' }} />
              <span className="font-mono text-[0.6rem] sm:text-[0.65rem] tracking-[0.2em] text-emerald-300/90 truncate">
                SYSTEM ACTIVE
              </span>
            </div>
            <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-white/10 shrink-0">
              <span className="font-mono text-[0.6rem] tracking-[0.15em] text-white/40">XY</span>
              <span className="font-mono text-[0.6rem] tracking-[0.1em] text-cyan-300/80 tabular-nums">
                {coords.x.toString().padStart(3, '0')}° · {coords.y.toString().padStart(3, '0')}°
              </span>
            </div>
          </div>

          {/* Center: nav items */}
          <div className="flex-1 flex justify-center min-w-0">
            <div className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="group relative px-3 py-1.5 font-mono text-[0.62rem] tracking-[0.18em] transition-colors whitespace-nowrap"
                  style={{
                    color: activeSection === item.id ? '#6ad0ff' : 'rgba(255,255,255,0.4)',
                  }}
                >
                  <span className="opacity-50 mr-1.5">{item.idx}</span>
                  {item.label}
                  {activeSection === item.id && (
                    <span
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-px bg-cyan-400"
                      style={{ width: '70%', boxShadow: '0 0 8px #6ad0ff' }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right: progress + region */}
          <div className="flex items-center gap-3 sm:gap-4 shrink-0 min-w-0">
            <div className="hidden sm:flex flex-col items-end min-w-0 w-28">
              <span className="font-mono text-[0.55rem] tracking-[0.15em] text-white/40 leading-none mb-1 truncate">
                REGION
              </span>
              <span className="font-mono text-[0.6rem] tracking-[0.12em] text-cyan-300/80 leading-none truncate">
                {REGIONS[regionIdx]}
              </span>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <div className="w-16 sm:w-24 h-1 rounded-full bg-white/10 overflow-hidden shrink-0">
                <div
                  className="h-full rounded-full origin-left"
                  style={{
                    transform: `scaleX(${scrollPct / 100})`,
                    background: 'linear-gradient(90deg, #6ad0ff, #b07cff)',
                    boxShadow: '0 0 8px rgba(106,208,255,0.6)',
                  }}
                />
              </div>
              <span className="font-mono text-[0.6rem] tabular-nums text-white/60 w-10 text-right shrink-0 inline-block overflow-hidden">
                {scrollPct.toFixed(0)}%
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Side coordinate ruler */}
      <div className="hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-2 pointer-events-none">
        <span className="font-mono text-[0.5rem] tracking-[0.2em] text-white/30 rotate-90 mb-8 whitespace-nowrap">
          DEEP SPACE NAV
        </span>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            className="group flex items-center gap-2 pointer-events-auto"
          >
            <span
              className="block h-px transition-all duration-300"
              style={{
                width: activeSection === item.id ? '24px' : '12px',
                background: activeSection === item.id ? '#6ad0ff' : 'rgba(255,255,255,0.25)',
              }}
            />
          </button>
        ))}
      </div>
    </>
  );
});

export default HudNav;
