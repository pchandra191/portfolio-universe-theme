import { useEffect } from 'react';
import { Satellite, Radio, CheckCircle2 } from 'lucide-react';

export default function SatelliteNetworkNotification({
  show,
  onComplete,
}: {
  show: boolean;
  onComplete: () => void;
}) {
  useEffect(() => {
    if (!show) return;
    const timer = setTimeout(onComplete, 6500);
    return () => clearTimeout(timer);
  }, [show, onComplete]);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-6 pointer-events-none">
      <div
        className="relative"
        style={{ animation: 'hud-notification 6.5s cubic-bezier(0.22, 1, 0.36, 1) forwards' }}
      >
        {/* Outer glow */}
        <div
          className="absolute -inset-8 rounded-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(106,208,255,0.12), transparent 70%)',
          }}
        />

        {/* Main panel */}
        <div
          className="relative glass rounded-lg px-10 py-8"
          style={{
            minWidth: '380px',
            borderColor: 'rgba(106,208,255,0.4)',
            boxShadow:
              '0 0 80px -10px rgba(106,208,255,0.3), inset 0 0 40px -10px rgba(106,208,255,0.1)',
          }}
        >
          {/* Corner brackets */}
          <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-cyan-300/60 rounded-tl" />
          <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-300/60 rounded-tr" />
          <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-cyan-300/60 rounded-bl" />
          <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-cyan-300/60 rounded-br" />

          {/* Scan line */}
          <div className="absolute inset-0 overflow-hidden rounded-lg pointer-events-none">
            <div
              className="absolute left-0 right-0 h-px"
              style={{
                background:
                  'linear-gradient(90deg, transparent, rgba(106,208,255,0.6), transparent)',
                animation: 'scan-line 2s linear infinite',
              }}
            />
          </div>

          {/* Content */}
          <div className="relative text-center">
            {/* Icon */}
            <div className="flex justify-center mb-4">
              <div
                className="relative w-16 h-16 rounded-full flex items-center justify-center"
                style={{
                  background:
                    'radial-gradient(circle, rgba(106,208,255,0.2), rgba(176,124,255,0.1))',
                  border: '1px solid rgba(106,208,255,0.4)',
                }}
              >
                <Satellite className="w-8 h-8 text-cyan-300" />
                {/* Orbiting dot */}
                <div
                  className="absolute inset-0 rounded-full"
                  style={{ animation: 'orbit-spin 3s linear infinite' }}
                >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-cyan-300/80" />
                </div>
              </div>
            </div>

            {/* Label */}
            <div className="font-mono text-[0.6rem] tracking-[0.3em] text-cyan-300/60 mb-2">
              ORBITAL DEPLOYMENT SYSTEM
            </div>

            {/* Title */}
            <h3 className="font-display text-lg font-bold tracking-wider text-white mb-5">
              SATELLITE MISSION COMPLETED
            </h3>

            {/* Progress bar */}
            <div className="mb-5">
              <div className="flex items-center justify-between font-mono text-[0.6rem] tracking-[0.15em] text-white/60 mb-2">
                <span>DEPLOYMENT STATUS</span>
                <span className="text-cyan-300">5 / 5</span>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: '100%',
                    background:
                      'linear-gradient(90deg, rgba(106,208,255,0.8), rgba(176,124,255,0.8))',
                    boxShadow: '0 0 10px rgba(106,208,255,0.5)',
                  }}
                />
              </div>
            </div>

            {/* Status lines */}
            <div className="space-y-1.5 font-mono text-[0.6rem] tracking-[0.15em]">
              <div className="flex items-center justify-center gap-2 text-white/70">
                <CheckCircle2 className="w-3 h-3 text-green-400" />
                <span>5 / 5 SATELLITES DEPLOYED</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/70">
                <CheckCircle2 className="w-3 h-3 text-green-400" />
                <span>GLOBAL ORBITAL COVERAGE ACHIEVED</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-white/70">
                <Radio className="w-3 h-3 text-cyan-300" />
                <span>ALL SYSTEMS NOMINAL</span>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-5 pt-3 border-t border-white/10">
              <div className="font-mono text-[0.55rem] tracking-[0.25em] text-cyan-300/50">
                MISSION SUCCESSFUL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
