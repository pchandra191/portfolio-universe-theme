import { useEffect, useRef, useState } from 'react';

interface TrailDot {
  x: number;
  y: number;
  life: number;
  maxLife: number;
  r: number;
}

const TRAIL_POOL_SIZE = 120;

export default function StarCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const poolRef = useRef<TrailDot[]>([]);
  const poolIdxRef = useRef(0);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(hover: none)');
    setEnabled(!mq.matches);
    const handler = (e: MediaQueryListEvent) => setEnabled(!e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const canvas = canvasRef.current;
    if (!dot || !ring || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    let mx = w / 2;
    let my = h / 2;
    let dx = mx;
    let dy = my;
    let rx = mx;
    let ry = my;
    let hovering = false;
    let hoverScale = 1;

    const pool: TrailDot[] = [];
    for (let i = 0; i < TRAIL_POOL_SIZE; i++) {
      pool.push({ x: 0, y: 0, life: 1, maxLife: 1, r: 0 });
    }
    poolRef.current = pool;
    poolIdxRef.current = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      const target = e.target as HTMLElement;
      const interactive = target.closest('a, button, [data-cursor="hover"]');
      hovering = !!interactive;
    };

    const onResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('resize', onResize);

    const render = () => {
      dx += (mx - dx) * 0.35;
      dy += (my - dy) * 0.35;
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;

      hoverScale += ((hovering ? 1.8 : 1) - hoverScale) * 0.15;

      if (dot) {
        dot.style.transform = `translate3d(${dx - 4}px, ${dy - 4}px, 0) scale(${hoverScale})`;
      }
      if (ring) {
        ring.style.transform = `translate3d(${rx - 16}px, ${ry - 16}px, 0) scale(${hovering ? 1.4 : 1})`;
        ring.style.opacity = hovering ? '0.9' : '0.5';
      }

      const speed = Math.hypot(mx - dx, my - dy);
      if (speed > 1) {
        const count = Math.min(3, Math.floor(speed / 4));
        for (let i = 0; i < count; i++) {
          const idx = poolIdxRef.current;
          poolRef.current[idx].x = dx + (Math.random() - 0.5) * 6;
          poolRef.current[idx].y = dy + (Math.random() - 0.5) * 6;
          poolRef.current[idx].life = 0;
          poolRef.current[idx].maxLife = 30 + Math.floor(Math.random() * 30);
          poolRef.current[idx].r = 1 + Math.random() * 2;
          poolIdxRef.current = (idx + 1) % TRAIL_POOL_SIZE;
        }
      }

      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < TRAIL_POOL_SIZE; i++) {
        const p = poolRef.current[i];
        if (p.life >= p.maxLife || p.maxLife <= 0) continue;
        p.life++;
        const a = Math.sin((p.life / p.maxLife) * Math.PI) * 0.7;
        const radius = Math.max(0, p.r * (1 - p.life / p.maxLife));
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(150, 210, 255, ${a})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('resize', onResize);
    };
  }, [enabled]);

  return enabled ? (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none"
        style={{ zIndex: 9998 }}
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none transition-opacity duration-300"
        style={{
          zIndex: 9999,
          border: '1px solid rgba(106,208,255,0.5)',
          boxShadow: '0 0 12px rgba(106,208,255,0.4)',
        }}
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full pointer-events-none"
        style={{
          zIndex: 10000,
          background: '#fff',
          boxShadow: '0 0 10px #6ad0ff, 0 0 20px rgba(106,208,255,0.6)',
        }}
      />
    </>
  ) : null;
}
