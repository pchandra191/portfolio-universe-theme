import { useEffect, useRef, useState } from 'react';

export function useInView<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.unobserve(entry.target);
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export function useScrollProgress() {
  const ref = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      ref.current = max > 0 ? window.scrollY / max : 0;
    };
    const onScrollThrottled = () => {
      requestAnimationFrame(onScroll);
    };
    window.addEventListener('scroll', onScrollThrottled, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScrollThrottled);
  }, []);
  return ref;
}

export function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0] || '');
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

export function useScrollPct() {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? (window.scrollY / max) * 100 : 0;
      setPct(p);
    };
    const throttled = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onScroll);
    };
    window.addEventListener('scroll', throttled, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', throttled);
      cancelAnimationFrame(raf);
    };
  }, []);
  return pct;
}
