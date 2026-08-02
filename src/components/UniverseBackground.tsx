import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  z: number;
  r: number;
  tw: number;
  twSpeed: number;
  hue: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  r: number;
  hue: number;
}

interface Shooter {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  len: number;
}

interface Nebula {
  x: number;
  y: number;
  r: number;
  hue: number;
  hue2: number;
  drift: number;
}

interface RichNebula {
  x: number;
  y: number;
  lobes: { dx: number; dy: number; r: number; hue: number; hue2: number }[];
  parallax: number;
}

interface Galaxy {
  x: number;
  y: number;
  r: number;
  rot: number;
  rotSpeed: number;
  hue: number;
  arms: number;
  tilt: number;
  parallax: number;
  type: 'spiral' | 'elliptical';
}

interface Planet {
  x: number;
  y: number;
  r: number;
  type: 'ringed' | 'rocky' | 'ice' | 'moon' | 'gasGiant' | 'dwarf';
  hue: number;
  parallax: number;
  ringTilt: number;
}

interface Cluster {
  x: number;
  y: number;
  r: number;
  count: number;
  hue: number;
  parallax: number;
  type: 'open' | 'globular';
}

interface Constellation {
  name: string;
  lines: [number, number][];
  cx: number;
  cy: number;
  scale: number;
  parallax: number;
}

interface Asteroid {
  x: number;
  y: number;
  r: number;
  rot: number;
  rotSpeed: number;
  parallax: number;
  shape: number[];
}

interface Comet {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  tailLen: number;
  hue: number;
}

interface DistantSat {
  x: number;
  y: number;
  parallax: number;
  tw: number;
}

interface Satellite {
  x: number;
  y: number;
  startX: number;
  startY: number;
  ctrlX: number;
  ctrlY: number;
  endX: number;
  endY: number;
  t: number;
  duration: number;
  scale: number;
  trail: { x: number; y: number; life: number; maxLife: number }[];
  flame: number;
  rotation: number;
  rotSpeed: number;
  trailCounter: number;
  phase: 'launch' | 'orbit';
  orbitCx: number;
  orbitCy: number;
  orbitRadius: number;
  orbitAngle: number;
  orbitSpeed: number;
  baseScale: number;
  travelDir: number;
}

const REGIONS = [
  { name: 'OBSERVABLE UNIVERSE', hue: 210, hue2: 270 },
  { name: 'COSMIC WEB', hue: 230, hue2: 290 },
  { name: 'SUPERCLUSTERS', hue: 200, hue2: 260 },
  { name: 'GALAXY CLUSTERS', hue: 190, hue2: 250 },
  { name: 'MILKY WAY', hue: 220, hue2: 280 },
  { name: 'SOLAR SYSTEM', hue: 30, hue2: 200 },
  { name: 'EARTH ORBIT', hue: 195, hue2: 210 },
  { name: 'DIGITAL WORLD', hue: 180, hue2: 260 },
  { name: 'CAREER JOURNEY', hue: 250, hue2: 300 },
  { name: 'MISSION COMPLETE', hue: 40, hue2: 200 },
];

const CONSTELLATIONS: Omit<Constellation, 'cx' | 'cy' | 'scale' | 'parallax'>[] = [
  {
    name: 'Orion',
    lines: [
      [0.0, -0.8], [0.1, -0.6],
      [0.1, -0.6], [0.0, -0.1],
      [0.0, -0.1], [-0.05, 0.0],
      [-0.05, 0.0], [-0.1, 0.1],
      [-0.1, 0.1], [-0.2, 0.5],
      [0.0, -0.8], [-0.2, -0.5],
      [-0.2, -0.5], [-0.05, 0.0],
      [-0.2, 0.5], [0.15, 0.7],
      [0.15, 0.7], [0.1, -0.6],
    ],
  },
  {
    name: 'Ursa Major',
    lines: [
      [-0.8, 0.2], [-0.5, 0.15],
      [-0.5, 0.15], [-0.25, 0.1],
      [-0.25, 0.1], [0.0, 0.05],
      [0.0, 0.05], [0.15, -0.1],
      [0.15, -0.1], [0.3, 0.0],
      [0.3, 0.0], [0.45, -0.05],
      [0.45, -0.05], [0.6, -0.15],
    ],
  },
  {
    name: 'Cassiopeia',
    lines: [
      [-0.7, 0.0], [-0.4, -0.3],
      [-0.4, -0.3], [-0.1, 0.1],
      [-0.1, 0.1], [0.2, -0.2],
      [0.2, -0.2], [0.5, 0.05],
    ],
  },
  {
    name: 'Scorpius',
    lines: [
      [-0.7, -0.5], [-0.5, -0.4],
      [-0.5, -0.4], [-0.3, -0.25],
      [-0.3, -0.25], [-0.1, -0.1],
      [-0.1, -0.1], [0.1, 0.0],
      [0.1, 0.0], [0.25, 0.15],
      [0.25, 0.15], [0.35, 0.35],
      [0.35, 0.35], [0.3, 0.55],
      [0.3, 0.55], [0.15, 0.65],
    ],
  },
  {
    name: 'Cygnus',
    lines: [
      [0.0, -0.7], [0.0, -0.3],
      [0.0, -0.3], [0.0, 0.1],
      [0.0, 0.1], [0.0, 0.5],
      [-0.4, 0.0], [0.0, 0.1],
      [0.0, 0.1], [0.4, 0.0],
    ],
  },
];

function makeAsteroidShape(): number[] {
  const pts: number[] = [];
  const n = 6 + Math.floor(Math.random() * 3);
  for (let i = 0; i < n; i++) {
    pts.push(0.7 + Math.random() * 0.5);
  }
  return pts;
}

export default function UniverseBackground({
  scrollProgress,
  onNetworkComplete,
}: {
  scrollProgress: React.MutableRefObject<number>;
  onNetworkComplete?: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const onNetworkCompleteRef = useRef(onNetworkComplete);
  onNetworkCompleteRef.current = onNetworkComplete;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.scale(dpr, dpr);

    const STAR_COUNT = Math.min(700, Math.floor((w * h) / 2200));
    const stars: Star[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const z = Math.random();
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h * 3,
        z,
        r: z * 1.6 + 0.2,
        tw: Math.random() * Math.PI * 2,
        twSpeed: 0.01 + Math.random() * 0.03,
        hue: 200 + Math.random() * 80,
      });
    }

    const nebulae: Nebula[] = [];
    for (let i = 0; i < 7; i++) {
      nebulae.push({
        x: Math.random() * w,
        y: Math.random() * h * 3,
        r: 200 + Math.random() * 300,
        hue: 200 + Math.random() * 120,
        hue2: 260 + Math.random() * 100,
        drift: 0.1 + Math.random() * 0.2,
      });
    }

    // Rich multi-lobe nebulae — Orion, Eagle, Carina, Pillars inspired
    const richNebulae: RichNebula[] = [
      {
        // Orion Nebula — blue-green with pink core
        x: w * 0.2, y: h * 0.4, parallax: 0.18,
        lobes: [
          { dx: 0, dy: 0, r: 180, hue: 200, hue2: 280 },
          { dx: 40, dy: -30, r: 120, hue: 170, hue2: 300 },
          { dx: -30, dy: 40, r: 100, hue: 320, hue2: 200 },
          { dx: 60, dy: 20, r: 80, hue: 280, hue2: 220 },
        ],
      },
      {
        // Eagle Nebula — golden pillars
        x: w * 0.75, y: h * 1.1, parallax: 0.2,
        lobes: [
          { dx: 0, dy: 0, r: 160, hue: 30, hue2: 200 },
          { dx: 30, dy: -50, r: 100, hue: 200, hue2: 30 },
          { dx: -20, dy: 30, r: 90, hue: 45, hue2: 180 },
          { dx: 50, dy: 10, r: 70, hue: 190, hue2: 40 },
        ],
      },
      {
        // Carina Nebula — pink and teal
        x: w * 0.3, y: h * 1.7, parallax: 0.22,
        lobes: [
          { dx: 0, dy: 0, r: 170, hue: 320, hue2: 180 },
          { dx: -40, dy: -20, r: 110, hue: 190, hue2: 300 },
          { dx: 35, dy: 35, r: 95, hue: 280, hue2: 170 },
          { dx: -15, dy: 50, r: 75, hue: 330, hue2: 200 },
        ],
      },
      {
        // Pillars of Creation — dusty columns, deep teal and amber
        x: w * 0.7, y: h * 2.2, parallax: 0.16,
        lobes: [
          { dx: 0, dy: 0, r: 150, hue: 180, hue2: 30 },
          { dx: 25, dy: -40, r: 90, hue: 40, hue2: 190 },
          { dx: -35, dy: 25, r: 100, hue: 190, hue2: 40 },
          { dx: 45, dy: 30, r: 65, hue: 30, hue2: 200 },
        ],
      },
      {
        // Extra violet nebula
        x: w * 0.5, y: h * 2.7, parallax: 0.2,
        lobes: [
          { dx: 0, dy: 0, r: 200, hue: 260, hue2: 200 },
          { dx: 50, dy: -30, r: 130, hue: 220, hue2: 280 },
          { dx: -40, dy: 40, r: 110, hue: 290, hue2: 210 },
        ],
      },
    ];

    // Spiral + elliptical galaxies
    const galaxies: Galaxy[] = [];
    for (let i = 0; i < 6; i++) {
      galaxies.push({
        x: Math.random() * w,
        y: Math.random() * h * 3,
        r: 60 + Math.random() * 80,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: 0.0003 + Math.random() * 0.0004,
        hue: 200 + Math.random() * 80,
        arms: 2 + Math.floor(Math.random() * 2),
        tilt: 0.3 + Math.random() * 0.5,
        parallax: 0.15 + Math.random() * 0.15,
        type: 'spiral',
      });
    }
    // Elliptical galaxies — smooth glowing ovals
    for (let i = 0; i < 4; i++) {
      galaxies.push({
        x: Math.random() * w,
        y: Math.random() * h * 3,
        r: 40 + Math.random() * 50,
        rot: 0,
        rotSpeed: 0,
        hue: 200 + Math.random() * 60,
        arms: 0,
        tilt: 0.5 + Math.random() * 0.3,
        parallax: 0.12 + Math.random() * 0.08,
        type: 'elliptical',
      });
    }

    // Extremely distant galaxies — tiny faint glows
    const distantGalaxies: { x: number; y: number; r: number; hue: number; parallax: number }[] = [];
    for (let i = 0; i < 12; i++) {
      distantGalaxies.push({
        x: Math.random() * w,
        y: Math.random() * h * 3,
        r: 8 + Math.random() * 14,
        hue: 200 + Math.random() * 100,
        parallax: 0.08 + Math.random() * 0.06,
      });
    }

    // Planets — varied types, partially off-screen for scale
    const planets: Planet[] = [
      { x: -40, y: h * 0.25, r: 90, type: 'ringed', hue: 35, parallax: 0.55, ringTilt: -0.35 },
      { x: w + 30, y: h * 0.7, r: 70, type: 'rocky', hue: 15, parallax: 0.5, ringTilt: 0 },
      { x: w - 60, y: h * 1.4, r: 85, type: 'ice', hue: 200, parallax: 0.6, ringTilt: 0 },
      { x: -30, y: h * 1.8, r: 60, type: 'rocky', hue: 25, parallax: 0.5, ringTilt: 0 },
      { x: w + 40, y: h * 2.3, r: 95, type: 'ringed', hue: 30, parallax: 0.55, ringTilt: 0.3 },
      { x: -50, y: h * 2.6, r: 75, type: 'ice', hue: 195, parallax: 0.58, ringTilt: 0 },
      // Jupiter-like gas giant
      { x: w + 60, y: h * 0.45, r: 110, type: 'gasGiant', hue: 30, parallax: 0.52, ringTilt: 0 },
      // Small moons
      { x: w * 0.15, y: h * 1.0, r: 22, type: 'moon', hue: 210, parallax: 0.65, ringTilt: 0 },
      { x: w * 0.85, y: h * 1.6, r: 18, type: 'moon', hue: 40, parallax: 0.62, ringTilt: 0 },
      { x: w * 0.4, y: h * 2.5, r: 25, type: 'moon', hue: 200, parallax: 0.6, ringTilt: 0 },
      // Distant dwarf planet
      { x: w * 0.6, y: h * 0.35, r: 14, type: 'dwarf', hue: 20, parallax: 0.45, ringTilt: 0 },
      { x: w * 0.25, y: h * 2.8, r: 12, type: 'dwarf', hue: 190, parallax: 0.42, ringTilt: 0 },
    ];

    // Star clusters — pre-compute star positions so they don't flicker
    const clusters: (Cluster & { stars: { dx: number; dy: number; r: number; hueOff: number; a: number }[] })[] = [];
    for (let i = 0; i < 4; i++) {
        const stars: { dx: number; dy: number; r: number; hueOff: number; a: number }[] = [];
        const count = 25 + Math.floor(Math.random() * 20);
        for (let j = 0; j < count; j++) {
          stars.push({
            dx: (Math.random() - 0.5) * 70,
            dy: (Math.random() - 0.5) * 70,
            r: 0.4 + Math.random() * 1.2,
            hueOff: Math.random() * 30,
            a: 0.4 + Math.random() * 0.4,
          });
        }
        clusters.push({
          x: Math.random() * w,
          y: h * (0.5 + i * 0.6) + Math.random() * h * 0.3,
          r: 35 + Math.random() * 25,
          count,
          hue: i % 2 === 0 ? 210 : 45,
          parallax: 0.3 + Math.random() * 0.2,
          type: 'open',
          stars,
        });
    }
    for (let i = 0; i < 4; i++) {
        const stars: { dx: number; dy: number; r: number; hueOff: number; a: number }[] = [];
        const count = 60 + Math.floor(Math.random() * 40);
        for (let j = 0; j < count; j++) {
          const ang = Math.random() * Math.PI * 2;
          const dist = Math.pow(Math.random(), 0.5) * (18 + Math.random() * 12);
          stars.push({
            dx: Math.cos(ang) * dist,
            dy: Math.sin(ang) * dist,
            r: 0.3 + Math.random() * 0.8,
            hueOff: Math.random() * 30,
            a: 0.3 + Math.random() * 0.4,
          });
        }
        clusters.push({
          x: Math.random() * w,
          y: h * (0.8 + i * 0.6) + Math.random() * h * 0.3,
          r: 18 + Math.random() * 12,
          count,
          hue: 30 + Math.random() * 30,
          parallax: 0.2 + Math.random() * 0.1,
          type: 'globular',
          stars,
        });
    }

    // Constellations
    const constellations: Constellation[] = CONSTELLATIONS.map((c, i) => ({
      ...c,
      cx: (0.15 + (i * 0.19) + Math.random() * 0.05) * w,
      cy: h * (0.3 + i * 0.55) + Math.random() * h * 0.2,
      scale: 80 + Math.random() * 50,
      parallax: 0.25 + Math.random() * 0.15,
    }));

    // Asteroids
    const asteroids: Asteroid[] = [];
    for (let i = 0; i < 14; i++) {
      asteroids.push({
        x: Math.random() * w,
        y: h * (0.5 + Math.random() * 2.5),
        r: 1.5 + Math.random() * 3,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 0.01,
        parallax: 0.4 + Math.random() * 0.3,
        shape: makeAsteroidShape(),
      });
    }

    // Milky Way band — pre-compute star positions
    const mwStars: { bx: number; by: number; r: number; hue: number; dist: number }[] = [];
    for (let i = 0; i < 200; i++) {
      const by = (Math.random() - 0.5) * 200;
      const dist = 1 - Math.abs(by) / 100;
      if (dist < 0) continue;
      mwStars.push({
        bx: (Math.random() - 0.5) * w * 1.8,
        by,
        r: 0.4 + Math.random() * dist * 0.6,
        hue: 200 + Math.random() * 60,
        dist,
      });
    }

    // Comets
    const comets: Comet[] = [];
    let lastComet = 0;

    const shooters: Shooter[] = [];
    let lastShooter = 0;
    let t = 0;

    // Interactive satellites — up to 20, each with independent orbit
    const satellites: Satellite[] = [];
    const MAX_SATELLITES = 20;
    let networkCompleteFired = false;

    const launchSatellite = (sx: number, sy: number) => {
      if (satellites.length >= MAX_SATELLITES) return;

      // Gentle orbital trajectory — slow curved arc toward deep space
      const dirX = (Math.random() - 0.5) * 0.35;
      const dirY = -0.5 - Math.random() * 0.2;
      const dist = Math.max(w, h) * 0.85;
      const endX = sx + dirX * dist;
      const endY = sy + dirY * dist;
      // Control point creates a graceful orbital curve
      const ctrlX = sx + dirX * dist * 0.35 + (Math.random() - 0.5) * w * 0.25;
      const ctrlY = sy + dirY * dist * 0.5 + (Math.random() - 0.3) * h * 0.15;

      // Unique orbital parameters per satellite
      const orbitRadius = 80 + Math.random() * 140;
      const orbitSpeed = 0.0003 + Math.random() * 0.0005;

      satellites.push({
        x: sx,
        y: sy,
        startX: sx,
        startY: sy,
        ctrlX,
        ctrlY,
        endX,
        endY,
        t: 0,
        duration: 14000,
        scale: 1,
        trail: [],
        flame: 1,
        rotation: 0,
        rotSpeed: 0.002 + (Math.random() - 0.5) * 0.002,
        trailCounter: 0,
        phase: 'launch',
        orbitCx: endX,
        orbitCy: endY,
        orbitRadius,
        orbitAngle: 0,
        orbitSpeed,
        baseScale: 0.45 + Math.random() * 0.2,
        travelDir: 0,
      });

      if (satellites.length >= MAX_SATELLITES && !networkCompleteFired) {
        networkCompleteFired = true;
        onNetworkCompleteRef.current?.();
      }
    };

    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // Don't launch if clicking on interactive elements
      if (target.closest('button, a, [data-cursor="hover"], .glass, nav, input, textarea')) {
        return;
      }
      launchSatellite(e.clientX, e.clientY);
    };
    window.addEventListener('click', onClick);

    const handleResize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.scale(dpr, dpr);
    };
    window.addEventListener('resize', handleResize);

    const render = (now: number) => {
      t += 0.016;
      const sp = scrollProgress.current;
      const regionIdx = Math.min(
        REGIONS.length - 1,
        Math.floor(sp * REGIONS.length)
      );
      const nextIdx = Math.min(REGIONS.length - 1, regionIdx + 1);
      const blend = sp * REGIONS.length - regionIdx;
      const r1 = REGIONS[regionIdx];
      const r2 = REGIONS[nextIdx];
      const curHue = r1.hue + (r2.hue - r1.hue) * blend;
      const curHue2 = r1.hue2 + (r2.hue2 - r1.hue2) * blend;

      // Deep space base gradient — never pure black
      const bgGrad = ctx.createLinearGradient(0, 0, 0, h);
      bgGrad.addColorStop(0, `hsl(${curHue}, 60%, 4%)`);
      bgGrad.addColorStop(0.5, `hsl(${curHue2}, 50%, 3%)`);
      bgGrad.addColorStop(1, `hsl(${curHue}, 70%, 5%)`);
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      const scrollOffset = sp * h * 2.5;

      // Volumetric space fog
      const fogGrad = ctx.createLinearGradient(0, 0, w, h);
      fogGrad.addColorStop(0, `hsla(${curHue + 10}, 50%, 15%, 0.06)`);
      fogGrad.addColorStop(0.5, `hsla(${curHue2 - 20}, 40%, 12%, 0.03)`);
      fogGrad.addColorStop(1, `hsla(${curHue + 30}, 50%, 18%, 0.05)`);
      ctx.fillStyle = fogGrad;
      ctx.fillRect(0, 0, w, h);

      // Extremely distant galaxies
      for (const dg of distantGalaxies) {
        const ny = ((dg.y - scrollOffset * dg.parallax) % (h * 3) + h * 3) % (h * 3) - h;
        const grad = ctx.createRadialGradient(dg.x, ny, 0, dg.x, ny, dg.r);
        grad.addColorStop(0, `hsla(${dg.hue}, 50%, 70%, 0.1)`);
        grad.addColorStop(0.5, `hsla(${dg.hue}, 40%, 50%, 0.03)`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(dg.x, ny, dg.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Galaxies — spiral and elliptical
      for (const g of galaxies) {
        g.rot += g.rotSpeed;
        const ny = ((g.y - scrollOffset * g.parallax) % (h * 3) + h * 3) % (h * 3) - h;
        const nx = g.x + Math.sin(t * 0.03 + g.x * 0.01) * 5;

        if (g.type === 'elliptical') {
          ctx.save();
          ctx.translate(nx, ny);
          ctx.rotate(t * 0.005 + g.x * 0.01);
          ctx.scale(1, g.tilt);
          const eGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, g.r);
          eGrad.addColorStop(0, `hsla(${g.hue}, 50%, 80%, 0.15)`);
          eGrad.addColorStop(0.3, `hsla(${g.hue}, 45%, 60%, 0.07)`);
          eGrad.addColorStop(0.7, `hsla(${g.hue}, 40%, 40%, 0.02)`);
          eGrad.addColorStop(1, 'transparent');
          ctx.fillStyle = eGrad;
          ctx.beginPath();
          ctx.arc(0, 0, g.r, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
          continue;
        }

        ctx.save();
        ctx.translate(nx, ny);
        ctx.rotate(g.rot);
        ctx.scale(1, g.tilt);

        const coreGrad = ctx.createRadialGradient(0, 0, 0, 0, 0, g.r * 0.4);
        coreGrad.addColorStop(0, `hsla(${g.hue}, 60%, 85%, 0.2)`);
        coreGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = coreGrad;
        ctx.beginPath();
        ctx.arc(0, 0, g.r * 0.4, 0, Math.PI * 2);
        ctx.fill();

        for (let arm = 0; arm < g.arms; arm++) {
          const armOffset = (arm / g.arms) * Math.PI * 2;
          for (let p = 0; p < 40; p++) {
            const frac = p / 40;
            const angle = armOffset + frac * Math.PI * 3;
            const dist = frac * g.r;
            const px = Math.cos(angle) * dist;
            const py = Math.sin(angle) * dist;
            const pr = (1 - frac) * 1.5 + 0.3;
            const pa = (1 - frac) * 0.18;
            ctx.beginPath();
            ctx.arc(px, py, pr, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${g.hue + frac * 30}, 70%, 80%, ${pa})`;
            ctx.fill();
          }
        }

        const haloGrad = ctx.createRadialGradient(0, 0, g.r * 0.3, 0, 0, g.r);
        haloGrad.addColorStop(0, `hsla(${g.hue}, 50%, 60%, 0.03)`);
        haloGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = haloGrad;
        ctx.beginPath();
        ctx.arc(0, 0, g.r, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
      }

      // Rich multi-lobe nebulae — Orion, Eagle, Carina, Pillars inspired
      for (const rn of richNebulae) {
        const ny = ((rn.y - scrollOffset * rn.parallax) % (h * 3) + h * 3) % (h * 3) - h;
        const nx = rn.x + Math.sin(t * 0.15 + rn.x * 0.01) * 15;
        for (const lobe of rn.lobes) {
          const lx = nx + lobe.dx;
          const ly = ny + lobe.dy;
          const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, lobe.r);
          grad.addColorStop(0, `hsla(${lobe.hue}, 70%, 50%, 0.08)`);
          grad.addColorStop(0.3, `hsla(${lobe.hue}, 60%, 40%, 0.04)`);
          grad.addColorStop(0.6, `hsla(${lobe.hue2}, 55%, 35%, 0.02)`);
          grad.addColorStop(1, 'transparent');
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(lx, ly, lobe.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Nebula clouds — original drifting nebulae
      for (const n of nebulae) {
        const ny = ((n.y - scrollOffset * (0.3 + n.drift * 0.1)) % (h * 3) + h * 3) % (h * 3) - h;
        const nx = n.x + Math.sin(t * 0.2 + n.x) * 30;
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.r);
        grad.addColorStop(0, `hsla(${n.hue + curHue * 0.1}, 70%, 50%, 0.09)`);
        grad.addColorStop(0.4, `hsla(${n.hue2}, 60%, 40%, 0.04)`);
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(nx, ny, n.r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Milky Way band
      const mwStrength = Math.max(0, Math.sin(sp * Math.PI) * 0.8);
      if (mwStrength > 0.02) {
        ctx.save();
        ctx.translate(w * 0.5, h * 0.5);
        ctx.rotate(-0.25);
        const mwGrad = ctx.createLinearGradient(0, -120, 0, 120);
        mwGrad.addColorStop(0, 'transparent');
        mwGrad.addColorStop(0.5, `hsla(${curHue + 15}, 50%, 60%, ${0.04 * mwStrength})`);
        mwGrad.addColorStop(1, 'transparent');
        ctx.fillStyle = mwGrad;
        ctx.fillRect(-w, -120, w * 2, 240);
        for (const ms of mwStars) {
          ctx.beginPath();
          ctx.arc(ms.bx, ms.by, ms.r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${ms.hue}, 70%, 85%, ${0.25 * ms.dist * mwStrength})`;
          ctx.fill();
        }
        ctx.restore();
      }

      // Stars with parallax depth
      for (const s of stars) {
        s.tw += s.twSpeed;
        const parallax = 0.2 + s.z * 1.8;
        const sy = ((s.y - scrollOffset * parallax) % (h * 3) + h * 3) % (h * 3) - h;
        const sx = s.x + Math.sin(t * 0.05 + s.y * 0.001) * (s.z * 8);
        const twinkle = 0.5 + Math.sin(s.tw) * 0.5;
        const alpha = (0.3 + s.z * 0.7) * twinkle;
        ctx.beginPath();
        ctx.arc(sx, sy, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue}, 80%, 85%, ${alpha})`;
        ctx.fill();
      }

      // Constellations
      for (const c of constellations) {
        const ny = ((c.cy - scrollOffset * c.parallax) % (h * 3) + h * 3) % (h * 3) - h;
        const nx = c.cx;

        ctx.strokeStyle = 'rgba(180, 210, 255, 0.06)';
        ctx.lineWidth = 0.6;
        for (let i = 0; i < c.lines.length; i += 2) {
          if (i + 1 >= c.lines.length) break;
          const [x1, y1] = c.lines[i];
          const [x2, y2] = c.lines[i + 1];
          ctx.beginPath();
          ctx.moveTo(nx + x1 * c.scale, ny + y1 * c.scale);
          ctx.lineTo(nx + x2 * c.scale, ny + y2 * c.scale);
          ctx.stroke();
        }

        for (let i = 0; i < c.lines.length; i++) {
          const [px, py] = c.lines[i];
          const sx = nx + px * c.scale;
          const sy = ny + py * c.scale;
          ctx.beginPath();
          ctx.arc(sx, sy, 1, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(200, 220, 255, 0.35)';
          ctx.fill();
        }
      }

      // Star clusters
      for (const cl of clusters) {
        const ny = ((cl.y - scrollOffset * cl.parallax) % (h * 3) + h * 3) % (h * 3) - h;
        const nx = cl.x;

        for (const st of cl.stars) {
          const px = nx + st.dx;
          const py = ny + st.dy;
          ctx.beginPath();
          ctx.arc(px, py, st.r, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${cl.hue + st.hueOff}, 70%, 85%, ${st.a})`;
          ctx.fill();
        }
      }

      // Planets
      for (const p of planets) {
        const ny = ((p.y - scrollOffset * p.parallax) % (h * 3) + h * 3) % (h * 3) - h;
        const nx = p.x;

        const pg = ctx.createRadialGradient(
          nx - p.r * 0.3, ny - p.r * 0.3, 0,
          nx, ny, p.r
        );
        if (p.type === 'ringed') {
          pg.addColorStop(0, `hsla(${p.hue}, 40%, 55%, 0.5)`);
          pg.addColorStop(0.6, `hsla(${p.hue}, 35%, 30%, 0.4)`);
          pg.addColorStop(1, `hsla(${p.hue}, 30%, 12%, 0.3)`);
        } else if (p.type === 'rocky') {
          pg.addColorStop(0, `hsla(${p.hue}, 50%, 45%, 0.45)`);
          pg.addColorStop(0.6, `hsla(${p.hue}, 45%, 28%, 0.35)`);
          pg.addColorStop(1, `hsla(${p.hue}, 40%, 10%, 0.25)`);
        } else if (p.type === 'ice') {
          pg.addColorStop(0, `hsla(${p.hue}, 60%, 60%, 0.4)`);
          pg.addColorStop(0.6, `hsla(${p.hue}, 55%, 35%, 0.3)`);
          pg.addColorStop(1, `hsla(${p.hue}, 50%, 15%, 0.2)`);
        } else if (p.type === 'gasGiant') {
          pg.addColorStop(0, `hsla(${p.hue}, 45%, 55%, 0.45)`);
          pg.addColorStop(0.4, `hsla(${p.hue + 10}, 40%, 42%, 0.4)`);
          pg.addColorStop(0.7, `hsla(${p.hue - 5}, 38%, 30%, 0.35)`);
          pg.addColorStop(1, `hsla(${p.hue}, 35%, 15%, 0.25)`);
        } else if (p.type === 'dwarf') {
          pg.addColorStop(0, `hsla(${p.hue}, 30%, 45%, 0.35)`);
          pg.addColorStop(0.7, `hsla(${p.hue}, 25%, 25%, 0.25)`);
          pg.addColorStop(1, `hsla(${p.hue}, 20%, 10%, 0.15)`);
        } else {
          pg.addColorStop(0, `hsla(${p.hue}, 20%, 55%, 0.35)`);
          pg.addColorStop(1, `hsla(${p.hue}, 15%, 25%, 0.2)`);
        }
        ctx.fillStyle = pg;
        ctx.beginPath();
        ctx.arc(nx, ny, p.r, 0, Math.PI * 2);
        ctx.fill();

        // Gas giant bands
        if (p.type === 'gasGiant') {
          ctx.save();
          ctx.beginPath();
          ctx.arc(nx, ny, p.r, 0, Math.PI * 2);
          ctx.clip();
          for (let b = -3; b <= 3; b++) {
            const by = ny + b * p.r * 0.25;
            ctx.strokeStyle = `hsla(${p.hue + b * 5}, 35%, 38%, 0.12)`;
            ctx.lineWidth = p.r * 0.12;
            ctx.beginPath();
            ctx.moveTo(nx - p.r, by);
            ctx.lineTo(nx + p.r, by);
            ctx.stroke();
          }
          ctx.restore();
        }

        // Rings
        if (p.type === 'ringed') {
          ctx.save();
          ctx.translate(nx, ny);
          ctx.rotate(p.ringTilt);
          ctx.scale(1, 0.25);
          ctx.strokeStyle = `hsla(${p.hue + 10}, 40%, 60%, 0.25)`;
          ctx.lineWidth = 3;
          ctx.beginPath();
          ctx.arc(0, 0, p.r * 1.6, 0, Math.PI * 2);
          ctx.stroke();
          ctx.strokeStyle = `hsla(${p.hue + 5}, 35%, 50%, 0.15)`;
          ctx.lineWidth = 6;
          ctx.beginPath();
          ctx.arc(0, 0, p.r * 1.85, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Atmosphere glow for ice planets
        if (p.type === 'ice') {
          const ag = ctx.createRadialGradient(nx, ny, p.r * 0.9, nx, ny, p.r * 1.15);
          ag.addColorStop(0, 'transparent');
          ag.addColorStop(0.5, `hsla(${p.hue}, 70%, 60%, 0.06)`);
          ag.addColorStop(1, 'transparent');
          ctx.fillStyle = ag;
          ctx.beginPath();
          ctx.arc(nx, ny, p.r * 1.15, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Asteroids
      for (const a of asteroids) {
        a.rot += a.rotSpeed;
        const ny = ((a.y - scrollOffset * a.parallax) % (h * 3) + h * 3) % (h * 3) - h;
        const nx = a.x;
        ctx.save();
        ctx.translate(nx, ny);
        ctx.rotate(a.rot);
        ctx.beginPath();
        for (let i = 0; i < a.shape.length; i++) {
          const ang = (i / a.shape.length) * Math.PI * 2;
          const rad = a.r * a.shape[i];
          const px = Math.cos(ang) * rad;
          const py = Math.sin(ang) * rad;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fillStyle = 'rgba(120, 120, 140, 0.25)';
        ctx.fill();
        ctx.strokeStyle = 'rgba(160, 160, 180, 0.1)';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
      }

      // Comets
      if (now - lastComet > 8000 + Math.random() * 10000) {
        lastComet = now;
        const fromTop = Math.random() > 0.5;
        comets.push({
          x: Math.random() * w,
          y: fromTop ? -30 : h + 30,
          vx: (Math.random() - 0.5) * 1.5,
          vy: fromTop ? 0.8 + Math.random() * 0.6 : -(0.8 + Math.random() * 0.6),
          life: 0,
          maxLife: 300 + Math.random() * 200,
          tailLen: 120 + Math.random() * 80,
          hue: 180 + Math.random() * 60,
        });
      }
      for (let i = comets.length - 1; i >= 0; i--) {
        const cm = comets[i];
        cm.x += cm.vx;
        cm.y += cm.vy;
        cm.life++;
        const a = Math.sin((cm.life / cm.maxLife) * Math.PI) * 0.4;
        if (cm.life > cm.maxLife) {
          comets.splice(i, 1);
          continue;
        }
        const tailX = cm.x - cm.vx * (cm.tailLen / 2);
        const tailY = cm.y - cm.vy * (cm.tailLen / 2);
        const tGrad = ctx.createLinearGradient(cm.x, cm.y, tailX, tailY);
        tGrad.addColorStop(0, `hsla(${cm.hue}, 80%, 85%, ${a})`);
        tGrad.addColorStop(0.5, `hsla(${cm.hue}, 70%, 70%, ${a * 0.3})`);
        tGrad.addColorStop(1, 'transparent');
        ctx.strokeStyle = tGrad;
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(cm.x, cm.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(cm.x, cm.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${cm.hue}, 80%, 85%, ${a})`;
        ctx.fill();
      }

      // Shooting stars
      if (now - lastShooter > 10000 + Math.random() * 12000) {
        lastShooter = now;
        const fromLeft = Math.random() > 0.5;
        shooters.push({
          x: fromLeft ? -50 : w + 50,
          y: Math.random() * h * 0.6,
          vx: (fromLeft ? 1 : -1) * (6 + Math.random() * 4),
          vy: 3 + Math.random() * 2,
          life: 0,
          maxLife: 80,
          len: 80 + Math.random() * 60,
        });
      }
      for (let i = shooters.length - 1; i >= 0; i--) {
        const sh = shooters[i];
        sh.x += sh.vx;
        sh.y += sh.vy;
        sh.life++;
        const a = Math.sin((sh.life / sh.maxLife) * Math.PI);
        const tailX = sh.x - sh.vx * (sh.len / 8);
        const tailY = sh.y - sh.vy * (sh.len / 8);
        const grad = ctx.createLinearGradient(sh.x, sh.y, tailX, tailY);
        grad.addColorStop(0, `hsla(${curHue2}, 90%, 90%, ${a})`);
        grad.addColorStop(1, 'transparent');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(sh.x, sh.y);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(sh.x, sh.y, 1, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${curHue2}, 80%, 85%, ${a * 0.7})`;
        ctx.fill();
        if (sh.life > sh.maxLife) shooters.splice(i, 1);
      }

      // Interactive satellites — launched on background clicks
      for (let si = 0; si < satellites.length; si++) {
        const sat = satellites[si];
        sat.t += 16;

        if (sat.phase === 'launch') {
          const progress = Math.min(1, sat.t / sat.duration);
          const inv = 1 - progress;
          // Quadratic bezier — gentle orbital arc
          sat.x = inv * inv * sat.startX + 2 * inv * progress * sat.ctrlX + progress * progress * sat.endX;
          sat.y = inv * inv * sat.startY + 2 * inv * progress * sat.ctrlY + progress * progress * sat.endY;
          // Slowly shrink only as it moves into deep space
          sat.scale = 1 - progress * (1 - sat.baseScale);

          // Direction of travel from bezier tangent
          const tdx = 2 * inv * (sat.ctrlX - sat.startX) + 2 * progress * (sat.endX - sat.ctrlX);
          const tdy = 2 * inv * (sat.ctrlY - sat.startY) + 2 * progress * (sat.endY - sat.ctrlY);
          sat.travelDir = Math.atan2(tdy, tdx);

          // Slow roll/yaw rotation
          sat.rotation += sat.rotSpeed;

          // Flame fades after initial boost (first ~18% of journey)
          if (progress > 0.18) {
            sat.flame = Math.max(0, sat.flame - 0.015);
          }

          // Spawn ion trail particles — sparse, fading
          sat.trailCounter++;
          if (sat.trailCounter % 2 === 0 && progress < 0.98) {
            sat.trail.push({ x: sat.x, y: sat.y, life: 0, maxLife: 100 });
          }

          // Transition to orbital drift
          if (progress >= 1) {
            sat.phase = 'orbit';
            sat.scale = sat.baseScale;
            sat.orbitAngle = sat.travelDir + Math.PI / 2;
          }
        } else {
          // Orbital drift — slow circular path, unique per satellite
          sat.orbitAngle += sat.orbitSpeed;
          sat.x = sat.orbitCx + Math.cos(sat.orbitAngle) * sat.orbitRadius;
          sat.y = sat.orbitCy + Math.sin(sat.orbitAngle) * sat.orbitRadius;
          sat.travelDir = sat.orbitAngle + Math.PI / 2;
          sat.rotation += sat.rotSpeed;
          sat.flame = 0;

          // Faint ion trail in orbit
          sat.trailCounter++;
          if (sat.trailCounter % 4 === 0) {
            sat.trail.push({ x: sat.x, y: sat.y, life: 0, maxLife: 80 });
          }
        }

        // Draw ion trail — faint blue-white, gradually disappearing
        for (let i = sat.trail.length - 1; i >= 0; i--) {
          const tp = sat.trail[i];
          tp.life++;
          if (tp.life > tp.maxLife) {
            sat.trail.splice(i, 1);
            continue;
          }
          const lifeFrac = tp.life / tp.maxLife;
          const ta = (1 - lifeFrac) * 0.35;
          ctx.beginPath();
          ctx.arc(tp.x, tp.y, 1.2 * (1 - lifeFrac * 0.4), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(170, 210, 255, ${ta})`;
          ctx.fill();
        }

        // Draw satellite (only if still visible)
        if (sat.scale > 0.05) {
          const sz = 10 * sat.scale;
          ctx.save();
          ctx.translate(sat.x, sat.y);
          ctx.rotate(sat.travelDir + Math.PI / 2 + sat.rotation);

          const bodyW = sz;
          const bodyH = sz * 0.65;
          const panelW = sz * 1.6;
          const panelH = sz * 0.45;
          const panelGap = sz * 0.2;

          // Solar panels — left
          ctx.fillStyle = '#1a2a4a';
          ctx.fillRect(-(bodyW / 2 + panelGap + panelW), -panelH / 2, panelW, panelH);
          ctx.strokeStyle = 'rgba(70, 110, 190, 0.5)';
          ctx.lineWidth = 0.5;
          for (let g = 1; g < 4; g++) {
            const gx = -(bodyW / 2 + panelGap + panelW) + (panelW / 4) * g;
            ctx.beginPath();
            ctx.moveTo(gx, -panelH / 2);
            ctx.lineTo(gx, panelH / 2);
            ctx.stroke();
          }
          // Panel highlight
          ctx.fillStyle = 'rgba(100, 150, 220, 0.15)';
          ctx.fillRect(-(bodyW / 2 + panelGap + panelW), -panelH / 2, panelW, panelH * 0.35);

          // Solar panels — right
          ctx.fillStyle = '#1a2a4a';
          ctx.fillRect(bodyW / 2 + panelGap, -panelH / 2, panelW, panelH);
          ctx.strokeStyle = 'rgba(70, 110, 190, 0.5)';
          for (let g = 1; g < 4; g++) {
            const gx = bodyW / 2 + panelGap + (panelW / 4) * g;
            ctx.beginPath();
            ctx.moveTo(gx, -panelH / 2);
            ctx.lineTo(gx, panelH / 2);
            ctx.stroke();
          }
          ctx.fillStyle = 'rgba(100, 150, 220, 0.15)';
          ctx.fillRect(bodyW / 2 + panelGap, -panelH / 2, panelW, panelH * 0.35);

          // Connecting struts
          ctx.strokeStyle = '#999';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(-bodyW / 2, 0);
          ctx.lineTo(-(bodyW / 2 + panelGap), 0);
          ctx.moveTo(bodyW / 2, 0);
          ctx.lineTo(bodyW / 2 + panelGap, 0);
          ctx.stroke();

          // Central body — metallic silver and dark blue
          const bodyGrad = ctx.createLinearGradient(-bodyW / 2, -bodyH / 2, bodyW / 2, bodyH / 2);
          bodyGrad.addColorStop(0, '#c0c8d0');
          bodyGrad.addColorStop(0.5, '#3a4a6a');
          bodyGrad.addColorStop(1, '#889098');
          ctx.fillStyle = bodyGrad;
          ctx.fillRect(-bodyW / 2, -bodyH / 2, bodyW, bodyH);
          ctx.strokeStyle = '#aab0b8';
          ctx.lineWidth = 0.5;
          ctx.strokeRect(-bodyW / 2, -bodyH / 2, bodyW, bodyH);

          // Antenna dish on top (facing travel direction)
          ctx.beginPath();
          ctx.arc(0, -bodyH / 2 - sz * 0.18, sz * 0.22, 0, Math.PI, true);
          ctx.fillStyle = '#aab0b8';
          ctx.fill();
          ctx.strokeStyle = '#777';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(0, -bodyH / 2);
          ctx.lineTo(0, -bodyH / 2 - sz * 0.18);
          ctx.stroke();

          // Thruster glow at rear — small, blue, fades after boost
          if (sat.flame > 0.01) {
            const flameSize = sz * 0.6 * sat.flame;
            const flameY = bodyH / 2 + flameSize * 0.2;
            const flameGrad = ctx.createRadialGradient(0, flameY, 0, 0, flameY, flameSize);
            flameGrad.addColorStop(0, `rgba(120, 180, 255, ${0.45 * sat.flame})`);
            flameGrad.addColorStop(0.4, `rgba(80, 140, 220, ${0.15 * sat.flame})`);
            flameGrad.addColorStop(1, 'transparent');
            ctx.fillStyle = flameGrad;
            ctx.beginPath();
            ctx.arc(0, flameY, flameSize, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }

      }

      // Subtle vignette
      const vGrad = ctx.createRadialGradient(w / 2, h / 2, h * 0.3, w / 2, h / 2, h * 0.9);
      vGrad.addColorStop(0, 'transparent');
      vGrad.addColorStop(1, 'rgba(0,0,5,0.5)');
      ctx.fillStyle = vGrad;
      ctx.fillRect(0, 0, w, h);

      rafRef.current = requestAnimationFrame(render);
    };
    rafRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('click', onClick);
    };
  }, [scrollProgress]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
