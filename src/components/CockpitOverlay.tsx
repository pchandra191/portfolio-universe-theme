export default function CockpitOverlay() {
  return (
    <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
      {/* ── Windshield glass ── */}
      {/* Glass tint — almost invisible, slightly darker at edges for thickness */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 80% at center, transparent 55%, rgba(8,12,22,0.12) 85%, rgba(8,12,22,0.22) 100%)',
        }}
      />
      {/* Faint diagonal reflection */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(135deg, rgba(180,210,255,0.018) 0%, transparent 25%, transparent 75%, rgba(180,210,255,0.01) 100%)',
        }}
      />
      {/* Glass scratches — extremely faint */}
      <svg className="absolute inset-0 w-full h-full" style={{ opacity: 0.035 }}>
        <line x1="18%" y1="14%" x2="20%" y2="17%" stroke="white" strokeWidth="0.5" />
        <line x1="72%" y1="22%" x2="75%" y2="19%" stroke="white" strokeWidth="0.3" />
        <line x1="38%" y1="58%" x2="41%" y2="62%" stroke="white" strokeWidth="0.4" />
        <line x1="86%" y1="68%" x2="89%" y2="66%" stroke="white" strokeWidth="0.3" />
        <line x1="55%" y1="35%" x2="56%" y2="38%" stroke="white" strokeWidth="0.3" />
        <line x1="12%" y1="75%" x2="14%" y2="78%" stroke="white" strokeWidth="0.3" />
      </svg>
      {/* Glass dust — tiny particles */}
      <div className="absolute top-[18%] left-[14%] w-0.5 h-0.5 rounded-full bg-white/[0.06]" />
      <div className="absolute top-[32%] left-[78%] w-0.5 h-0.5 rounded-full bg-white/[0.05]" />
      <div className="absolute top-[62%] left-[28%] w-0.5 h-0.5 rounded-full bg-white/[0.06]" />
      <div className="absolute top-[52%] left-[62%] w-0.5 h-0.5 rounded-full bg-white/[0.04]" />
      <div className="absolute top-[78%] left-[44%] w-0.5 h-0.5 rounded-full bg-white/[0.05]" />
      <div className="absolute top-[25%] left-[50%] w-px h-px rounded-full bg-white/[0.04]" />

      {/* ── Top frame ── */}
      <div
        className="absolute top-0 left-0 right-0 h-9"
        style={{
          background: 'linear-gradient(180deg, #15171c 0%, #26292e 45%, #1c1e22 70%, #121418 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 3px 12px rgba(0,0,0,0.5)',
        }}
      >
        {/* Brushed metal texture */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.012) 2px, rgba(255,255,255,0.012) 3px)',
          }}
        />
        {/* Top edge highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.12), transparent)' }}
        />

        {/* Screws */}
        <Screw className="absolute top-1/2 left-3 -translate-y-1/2" />
        <Screw className="absolute top-1/2 right-3 -translate-y-1/2" />

        {/* LEDs */}
        <div className="absolute top-1/2 left-8 -translate-y-1/2 flex gap-1.5">
          <span
            className="w-1 h-1 rounded-full bg-cyan-400"
            style={{ animation: 'led-pulse 3s ease-in-out infinite', boxShadow: '0 0 5px rgba(106,208,255,0.6)' }}
          />
          <span
            className="w-1 h-1 rounded-full bg-emerald-400"
            style={{ animation: 'led-pulse 2.5s ease-in-out infinite 0.5s', boxShadow: '0 0 5px rgba(52,211,153,0.5)' }}
          />
          <span
            className="w-1 h-1 rounded-full bg-amber-400/70"
            style={{ animation: 'led-pulse 4s ease-in-out infinite 1s', boxShadow: '0 0 4px rgba(251,191,36,0.3)' }}
          />
        </div>

        {/* Warning label */}
        <div className="absolute top-1/2 right-8 -translate-y-1/2 font-mono text-[0.42rem] tracking-[0.22em] text-white/[0.18] hidden sm:block">
          OBS-DECK-01 · CAUTION · OBSERVATION WINDOW
        </div>

        {/* Tiny tick marks */}
        <div className="absolute bottom-0 left-1/4 flex gap-2 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-px h-1 bg-cyan-300/40" />
          ))}
        </div>
        <div className="absolute bottom-0 right-1/4 flex gap-2 opacity-20">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="w-px h-1 bg-cyan-300/40" />
          ))}
        </div>
      </div>

      {/* Glass edge highlight — top (where glass meets frame) */}
      <div
        className="absolute top-9 left-3 right-3 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(106,208,255,0.07) 20%, rgba(106,208,255,0.07) 80%, transparent)' }}
      />

      {/* ── Left pillar ── */}
      <div
        className="absolute top-9 bottom-10 left-0 w-2.5 sm:w-3"
        style={{
          background: 'linear-gradient(90deg, #15171c 0%, #26292e 50%, #1c1e22 100%)',
          borderRight: '1px solid rgba(255,255,255,0.04)',
          boxShadow: '2px 0 8px rgba(0,0,0,0.3)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.01) 4px, rgba(255,255,255,0.01) 5px)',
          }}
        />
        <Screw className="absolute top-5 left-1/2 -translate-x-1/2" />
        <Screw className="absolute bottom-5 left-1/2 -translate-x-1/2" />
        {/* Tiny LED */}
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-cyan-400/60"
          style={{ animation: 'led-pulse 3.5s ease-in-out infinite 0.8s', boxShadow: '0 0 4px rgba(106,208,255,0.4)' }}
        />
      </div>

      {/* ── Right pillar ── */}
      <div
        className="absolute top-9 bottom-10 right-0 w-2.5 sm:w-3"
        style={{
          background: 'linear-gradient(90deg, #1c1e22 0%, #26292e 50%, #15171c 100%)',
          borderLeft: '1px solid rgba(255,255,255,0.04)',
          boxShadow: '-2px 0 8px rgba(0,0,0,0.3)',
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(255,255,255,0.01) 4px, rgba(255,255,255,0.01) 5px)',
          }}
        />
        <Screw className="absolute top-5 left-1/2 -translate-x-1/2" />
        <Screw className="absolute bottom-5 left-1/2 -translate-x-1/2" />
        <span
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-emerald-400/50"
          style={{ animation: 'led-pulse 2.8s ease-in-out infinite 1.2s', boxShadow: '0 0 4px rgba(52,211,153,0.3)' }}
        />
      </div>

      {/* Glass edge highlights — sides */}
      <div
        className="absolute top-9 bottom-10 left-3 w-px"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(106,208,255,0.04) 20%, rgba(106,208,255,0.04) 80%, transparent)' }}
      />
      <div
        className="absolute top-9 bottom-10 right-3 w-px"
        style={{ background: 'linear-gradient(180deg, transparent, rgba(106,208,255,0.04) 20%, rgba(106,208,255,0.04) 80%, transparent)' }}
      />

      {/* ── Bottom dashboard ── */}
      <div
        className="absolute bottom-0 left-2.5 right-2.5 sm:left-3 sm:right-3 h-10"
        style={{
          background: 'linear-gradient(0deg, #121418 0%, #1c1e22 30%, #26292e 55%, #15171c 100%)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 -3px 12px rgba(0,0,0,0.5)',
        }}
      >
        {/* Brushed metal */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.01) 2px, rgba(255,255,255,0.01) 3px)',
          }}
        />
        {/* Top edge highlight */}
        <div
          className="absolute top-0 left-0 right-0 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
        />

        {/* Vents — left */}
        <div className="absolute left-4 top-1/2 -translate-y-1/2 flex gap-0.5">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-px h-3.5 bg-white/[0.06]" />
          ))}
        </div>
        {/* Vents — right */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-0.5">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="w-px h-3.5 bg-white/[0.06]" />
          ))}
        </div>

        {/* Center label */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-mono text-[0.42rem] tracking-[0.25em] text-white/[0.15] hidden sm:block">
          FORWARD OBSERVATION · ALL SYSTEMS NOMINAL
        </div>

        {/* LEDs */}
        <div className="absolute top-1/2 left-16 -translate-y-1/2 flex gap-1.5">
          <span
            className="w-1 h-1 rounded-full bg-cyan-400"
            style={{ animation: 'led-pulse 2s ease-in-out infinite 0.3s', boxShadow: '0 0 5px rgba(106,208,255,0.5)' }}
          />
        </div>
        <div className="absolute top-1/2 right-16 -translate-y-1/2 flex gap-1.5">
          <span
            className="w-1 h-1 rounded-full bg-amber-400/60"
            style={{ animation: 'led-pulse 3s ease-in-out infinite 1s', boxShadow: '0 0 4px rgba(251,191,36,0.3)' }}
          />
        </div>

        {/* Screws */}
        <Screw className="absolute top-1/2 left-24 -translate-y-1/2 hidden sm:block" />
        <Screw className="absolute top-1/2 right-24 -translate-y-1/2 hidden sm:block" />
      </div>

      {/* Glass edge highlight — bottom */}
      <div
        className="absolute bottom-10 left-3 right-3 h-px"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(106,208,255,0.05) 20%, rgba(106,208,255,0.05) 80%, transparent)' }}
      />

      {/* ── Tiny HUD reticle markings on glass — extremely faint ── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.06]">
        <div className="w-6 h-px bg-cyan-300" />
        <div className="w-px h-6 bg-cyan-300 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>
    </div>
  );
}

function Screw({ className }: { className?: string }) {
  return (
    <div
      className={`w-2 h-2 rounded-full ${className ?? ''}`}
      style={{
        background: 'radial-gradient(circle at 30% 30%, #5580, #2a2d33 60%, #15171c 100%)',
        boxShadow: 'inset 0 0 2px rgba(0,0,0,0.6), 0 0 1px rgba(255,255,255,0.05)',
      }}
    >
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-px"
        style={{ background: 'rgba(0,0,0,0.4)' }}
      />
    </div>
  );
}
