import { useEffect, useRef, useState, memo } from 'react';

const LoadingScreen = memo(function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [visible, setVisible] = useState(true);
  const [starsOpacity, setStarsOpacity] = useState(0);
  const [textOpacity, setTextOpacity] = useState(0);
  const [textBrightness, setTextBrightness] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    startTimeRef.current = performance.now();

    const FADE_IN_MS = 400;
    const STARS_DELAY_MS = 400;
    const BRIGHTEN_DELAY_MS = 1000;
    const FADE_OUT_START_MS = 1500;
    const FADE_OUT_DURATION_MS = 400;

    const tick = (ts: number) => {
      const elapsed = ts - startTimeRef.current;

      if (elapsed < FADE_IN_MS) {
        const t = elapsed / FADE_IN_MS;
        setTextOpacity(t);
      } else if (elapsed < STARS_DELAY_MS) {
        setTextOpacity(1);
      } else if (elapsed < BRIGHTEN_DELAY_MS) {
        const t = (elapsed - STARS_DELAY_MS) / (BRIGHTEN_DELAY_MS - STARS_DELAY_MS);
        setStarsOpacity(t);
        setTextOpacity(1);
      } else if (elapsed < FADE_OUT_START_MS) {
        setStarsOpacity(1);
        setTextOpacity(1);
        setTextBrightness((elapsed - BRIGHTEN_DELAY_MS) / (FADE_OUT_START_MS - BRIGHTEN_DELAY_MS));
      } else if (elapsed < FADE_OUT_START_MS + FADE_OUT_DURATION_MS) {
        const t = (elapsed - FADE_OUT_START_MS) / FADE_OUT_DURATION_MS;
        setStarsOpacity(1 - t);
        setTextOpacity(1 - t);
        setTextBrightness(1);
      } else {
        setVisible(false);
        setTimeout(() => onComplete(), 600);
        return;
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [onComplete]);

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{
        background: '#000000',
        opacity: visible ? 1 : 0,
        transition: visible ? 'opacity 0s' : 'opacity 0.6s ease-out',
        pointerEvents: visible ? 'auto' : 'none',
      }}
    >
      {visible && (
        <div className="relative w-full h-full">
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(1px 1px at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 100%), radial-gradient(1px 1px at 40% 70%, rgba(255,255,255,0.2) 0%, transparent 100%), radial-gradient(1px 1px at 60% 20%, rgba(255,255,255,0.25) 0%, transparent 100%), radial-gradient(1px 1px at 80% 50%, rgba(255,255,255,0.2) 0%, transparent 100%), radial-gradient(1px 1px at 10% 80%, rgba(255,255,255,0.15) 0%, transparent 100%), radial-gradient(1px 1px at 70% 90%, rgba(255,255,255,0.2) 0%, transparent 100%), radial-gradient(1px 1px at 90% 10%, rgba(255,255,255,0.25) 0%, transparent 100%), radial-gradient(1px 1px at 30% 50%, rgba(255,255,255,0.15) 0%, transparent 100%)',
              opacity: starsOpacity,
              transition: 'opacity 0.8s ease-out',
            }}
          />
          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <div
              className="text-center transition-opacity duration-500"
              style={{
                opacity: textOpacity,
                filter: `brightness(${0.7 + textBrightness * 0.3})`,
              }}
            >
              <h1 className="font-display text-3xl sm:text-5xl font-bold text-white/90 tracking-wider mb-3">
                ENTERING
              </h1>
              <h2 className="font-display text-2xl sm:text-4xl font-bold text-white/80 tracking-wider mb-8">
                THE SOFTWARE COSMOS
              </h2>
              <p className="font-mono text-[0.65rem] tracking-[0.2em] text-white/50 uppercase">
                Preparing Prabhat Chandra's software universe...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default LoadingScreen;
