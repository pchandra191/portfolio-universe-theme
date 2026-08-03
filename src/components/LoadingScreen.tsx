import { useEffect, useRef, useState, memo } from 'react';

interface BootLine {
  msg: string;
  done: string;
}

const BOOT_LINES: BootLine[] = [
  { msg: 'Establishing Deep Space Link...', done: '✓ Complete' },
  { msg: 'Initializing Navigation Systems...', done: '✓ Complete' },
  { msg: 'Calibrating Technology Orbit...', done: '✓ Complete' },
  { msg: 'Loading Mission Logs...', done: '✓ Complete' },
  { msg: 'Deploying Universe...', done: '✓ Complete' },
  { msg: 'Signal Acquired...', done: '✓ Complete' },
];

const LoadingScreen = memo(function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [phase, setPhase] = useState<'boot' | 'ready' | 'done'>('boot');
  const [typed, setTyped] = useState('');
  const [progress, setProgress] = useState(0);
  const lineIdxRef = useRef(0);
  const charIdxRef = useRef(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);
  const progressRef = useRef(0);
  const lastTickRef = useRef<number>(0);

  const TYPING_SPEED = 18;

  useEffect(() => {
    startTimeRef.current = performance.now();
    progressRef.current = 0;

    const BOOT_MS = 1800;
    const FADE_MS = 500;

    const tick = (ts: number) => {
      const elapsed = ts - startTimeRef.current;

      if (phase === 'boot') {
        const targetProgress = Math.min(72, (elapsed / BOOT_MS) * 72);
        progressRef.current += (targetProgress - progressRef.current) * 0.12;
        setProgress(progressRef.current);

        const line = BOOT_LINES[lineIdxRef.current];
        if (charIdxRef.current < line.msg.length) {
          if (ts - lastTickRef.current > TYPING_SPEED) {
            lastTickRef.current = ts;
            charIdxRef.current++;
            setTyped(line.msg.slice(0, charIdxRef.current));
          }
        } else if (elapsed > (lineIdxRef.current + 1) * (BOOT_MS / BOOT_LINES.length)) {
          lineIdxRef.current++;
          charIdxRef.current = 0;
          if (lineIdxRef.current >= BOOT_LINES.length) {
            setPhase('ready');
          }
        }
      } else if (phase === 'ready') {
        progressRef.current += (100 - progressRef.current) * 0.1;
        setProgress(progressRef.current);
        if (progressRef.current > 99) {
          setProgress(100);
          setTimeout(() => {
            setPhase('done');
            setTimeout(() => {
              setVisible(false);
              setTimeout(onComplete, FADE_MS);
            }, 200);
          }, 200);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [phase, onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: '#000000',
        opacity: visible ? 1 : 0,
        transition: `opacity ${phase === 'done' ? '0.7s' : '0s'} ease-out`,
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      <div className="w-full max-w-md mx-auto px-6">
        <div className="text-center mb-10">
          <h1 className="font-display text-2xl sm:text-3xl font-bold text-white/90 tracking-wide mb-2">
            PRABHAT CHANDRA
          </h1>
          <p className="font-mono text-[0.6rem] tracking-[0.25em] text-cyan-300/60 uppercase">
            Mission Initializing
          </p>
        </div>

        <div className="space-y-3 mb-10">
          {BOOT_LINES.map((line, i) => {
            const isActive = i === lineIdxRef.current && phase === 'boot';
            const isDone = i < lineIdxRef.current;
            return (
              <div key={i} className="flex items-center justify-between">
                <span className="font-mono text-[0.6rem] tracking-[0.1em] text-white/40">
                  {isActive ? typed : line.msg}
                  {isActive && <span className="inline-block w-1.5 h-3 bg-cyan-400 ml-0.5 align-middle" style={{ animation: 'blink 0.8s step-end infinite' }} />}
                </span>
                {isDone && <span className="font-mono text-[0.6rem] text-emerald-400/70">{line.done}</span>}
              </div>
            );
          })}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-mono text-[0.55rem] tracking-[0.2em] text-white/30 uppercase">
              {phase === 'ready' ? 'Mission Ready' : 'Loading...'}
            </span>
            <span className="font-mono text-[0.55rem] tabular-nums text-white/50">
              {Math.floor(progress)}%
            </span>
          </div>
          <div className="h-px w-full bg-white/10 overflow-hidden">
            <div
              className="h-full origin-left"
              style={{
                transform: `scaleX(${progress / 100})`,
                background: 'linear-gradient(90deg, #6ad0ff, #b07cff)',
                boxShadow: '0 0 8px rgba(106,208,255,0.6)',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
});

export default LoadingScreen;
