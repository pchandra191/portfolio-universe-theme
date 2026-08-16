import { useEffect, useRef, memo, type MutableRefObject } from 'react';

type Rgba = readonly [number, number, number, number];

const PHASES: { glow: Rgba; base: Rgba; y: number }[] = [
  { glow: [56, 189, 248, 0.15], base: [2, 6, 23, 1], y: 30 },
  { glow: [168, 85, 247, 0.15], base: [9, 13, 22, 1], y: 50 },
  { glow: [20, 184, 166, 0.15], base: [2, 6, 23, 1], y: 70 },
];

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpRgba(from: Rgba, to: Rgba, t: number): [number, number, number, number] {
  return [
    lerp(from[0], to[0], t),
    lerp(from[1], to[1], t),
    lerp(from[2], to[2], t),
    lerp(from[3], to[3], t),
  ];
}

function toRgba(c: [number, number, number, number]) {
  return `rgba(${Math.round(c[0])},${Math.round(c[1])},${Math.round(c[2])},${c[3]})`;
}

function sample(s: number): { glow: string; base: string; y: number } {
  const clamped = Math.min(1, Math.max(0, s));
  const seg = clamped < 0.5 ? 0 : 1;
  const t = clamped < 0.5 ? clamped * 2 : (clamped - 0.5) * 2;
  const a = PHASES[seg];
  const b = PHASES[seg + 1];
  return {
    glow: toRgba(lerpRgba(a.glow, b.glow, t)),
    base: toRgba(lerpRgba(a.base, b.base, t)),
    y: lerp(a.y, b.y, t),
  };
}

function computeScrollProgress(): number {
  const doc = document.documentElement;
  const max = doc.scrollHeight - window.innerHeight;
  return max > 0 ? window.scrollY / max : 0;
}

const ScrollBackgroundGlow = memo(function ScrollBackgroundGlow({
  scrollProgress,
}: {
  scrollProgress?: MutableRefObject<number>;
}) {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node) return;

    const apply = (s: number) => {
      const { glow, base, y } = sample(s);
      node.style.setProperty('--bg-color-1', glow);
      node.style.setProperty('--bg-color-2', base);
      node.style.setProperty('--glow-y', `${y}%`);
    };

    let last = -1;
    const update = () => {
      const s = scrollProgress ? scrollProgress.current : computeScrollProgress();
      // Skip redundant writes when the scroll fraction hasn't meaningfully changed.
      if (Math.abs(s - last) < 0.005) return;
      last = s;
      apply(s);
    };

    // rAF-throttled scroll handler for smooth, lag-free updates
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          update();
          ticking = false;
        });
      }
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', update);
    };
  }, [scrollProgress]);

  return <div ref={el} className="scroll-bg-glow" />;
});

export default ScrollBackgroundGlow;
