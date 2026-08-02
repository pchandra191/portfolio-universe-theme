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

interface Shooter {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  len: number;
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

function SaturnPlanet() {
  return (
    <div
      style={{
        position: 'absolute',
        top: -120,
        right: -140,
        width: 460,
        height: 460,
        opacity: 0.28,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {/* Distant halo / atmospheric scattering */}
      <div
        style={{
          position: 'absolute',
          inset: '-18%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(220,200,160,0.08) 28%, rgba(200,180,140,0.04) 48%, transparent 72%)',
          filter: 'blur(16px)',
        }}
      />

      {/* Back ring layers — C ring (inner, faint) */}
      <div
        style={{
          position: 'absolute',
          inset: '-16px',
          borderRadius: '50%',
          border: '40px solid transparent',
          borderTopColor: 'rgba(170,145,100,0.035)',
          borderBottomColor: 'rgba(170,145,100,0.035)',
          transform: 'rotateX(74deg)',
        }}
      />
      {/* Back B ring */}
      <div
        style={{
          position: 'absolute',
          inset: '-22px',
          borderRadius: '50%',
          border: '24px solid transparent',
          borderTopColor: 'rgba(195,170,125,0.07)',
          borderBottomColor: 'rgba(195,170,125,0.07)',
          transform: 'rotateX(74deg)',
        }}
      />
      {/* Cassini division */}
      <div
        style={{
          position: 'absolute',
          inset: '-20px',
          borderRadius: '50%',
          border: '6px solid transparent',
          borderTopColor: 'rgba(0,0,0,0.14)',
          borderBottomColor: 'rgba(0,0,0,0.14)',
          transform: 'rotateX(74deg)',
        }}
      />
      {/* Back A ring */}
      <div
        style={{
          position: 'absolute',
          inset: '-28px',
          borderRadius: '50%',
          border: '16px solid transparent',
          borderTopColor: 'rgba(185,160,115,0.055)',
          borderBottomColor: 'rgba(185,160,115,0.055)',
          transform: 'rotateX(74deg)',
        }}
      />

      {/* Planet body — ultra-realistic gas giant */}
      <div
        style={{
          position: 'absolute',
          inset: '5%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 24% 24%, rgba(255,248,230,0.97), rgba(245,222,172,0.92), rgba(220,185,135,0.84), rgba(190,150,95,0.74), rgba(150,110,60,0.64), rgba(105,75,32,0.52), rgba(55,35,12,0.4))',
          boxShadow:
            'inset -28px -24px 70px rgba(0,0,0,0.58), ' +
            'inset 10px 10px 35px rgba(255,250,235,0.25), ' +
            '0 0 120px rgba(225,195,145,0.14)',
          overflow: 'hidden',
        }}
      >
        {/* Multi-frequency cloud bands — 4 overlapping frequencies */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'repeating-linear-gradient(0deg, transparent 0px, transparent 4px, rgba(0,0,0,0.055) 4px, rgba(0,0,0,0.055) 6px)' +
              ', repeating-linear-gradient(0deg, transparent 0px, transparent 12px, rgba(255,255,255,0.022) 12px, rgba(255,255,255,0.022) 14px)' +
              ', repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(0,0,0,0.04) 22px, rgba(0,0,0,0.04) 24px)' +
              ', repeating-linear-gradient(0deg, transparent 0px, transparent 38px, rgba(255,255,255,0.014) 38px, rgba(255,255,255,0.014) 40px)',
            animation: 'planet-spin 750s linear infinite',
          }}
        />
        {/* North equatorial bright zone */}
        <div
          style={{
            position: 'absolute',
            top: '26%',
            left: 0,
            right: 0,
            height: '7%',
            background: 'linear-gradient(to bottom, rgba(255,255,255,0.055), transparent 42%, rgba(0,0,0,0.03))',
            borderRadius: '50%',
            filter: 'blur(7px)',
          }}
        />
        {/* South equatorial dark belt */}
        <div
          style={{
            position: 'absolute',
            top: '54%',
            left: 0,
            right: 0,
            height: '11%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.045), transparent 32%, rgba(255,255,255,0.018), transparent 62%, rgba(0,0,0,0.04))',
            borderRadius: '50%',
            filter: 'blur(6px)',
          }}
        />
        {/* Polar flattening and darkening */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 50% 50%, transparent 32%, rgba(0,0,0,0.08) 78%, rgba(0,0,0,0.16) 100%)',
          }}
        />
        {/* Subtle terminator glow — soft day/night boundary */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 72% 68%, rgba(255,225,185,0.07) 0%, transparent 48%)',
          }}
        />
        {/* Faint storm feature */}
        <div
          style={{
            position: 'absolute',
            top: '40%',
            left: '25%',
            width: '22%',
            height: '6%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(255,255,255,0.03), transparent 70%)',
            filter: 'blur(4px)',
          }}
        />
      </div>

      {/* Ring shadow cast onto planet surface */}
      <div
        style={{
          position: 'absolute',
          inset: '5%',
          borderRadius: '50%',
          boxShadow:
            'inset 0 16px 40px -12px rgba(0,0,0,0.35), ' +
            'inset 0 -12px 30px -10px rgba(0,0,0,0.25)',
          pointerEvents: 'none',
        }}
      />

      {/* Front ring layers — A ring */}
      <div
        style={{
          position: 'absolute',
          inset: '-32px',
          borderRadius: '50%',
          border: '16px solid transparent',
          borderTopColor: 'rgba(225,200,155,0.2)',
          borderBottomColor: 'rgba(225,200,155,0.2)',
          transform: 'rotateX(74deg)',
          boxShadow: '0 0 40px rgba(215,185,135,0.1)',
        }}
      />
      {/* Cassini division front */}
      <div
        style={{
          position: 'absolute',
          inset: '-24px',
          borderRadius: '50%',
          border: '5px solid transparent',
          borderTopColor: 'rgba(0,0,0,0.14)',
          borderBottomColor: 'rgba(0,0,0,0.14)',
          transform: 'rotateX(74deg)',
        }}
      />
      {/* B ring front */}
      <div
        style={{
          position: 'absolute',
          inset: '-16px',
          borderRadius: '50%',
          border: '22px solid transparent',
          borderTopColor: 'rgba(205,180,135,0.13)',
          borderBottomColor: 'rgba(205,180,135,0.13)',
          transform: 'rotateX(74deg)',
        }}
      />
      {/* C ring front */}
      <div
        style={{
          position: 'absolute',
          inset: '-8px',
          borderRadius: '50%',
          border: '28px solid transparent',
          borderTopColor: 'rgba(185,160,115,0.06)',
          borderBottomColor: 'rgba(185,160,115,0.06)',
          transform: 'rotateX(74deg)',
        }}
      />
      {/* Faint outer ring */}
      <div
        style={{
          position: 'absolute',
          inset: '-44px',
          borderRadius: '50%',
          border: '8px solid transparent',
          borderTopColor: 'rgba(205,180,135,0.04)',
          borderBottomColor: 'rgba(205,180,135,0.04)',
          transform: 'rotateX(74deg)',
        }}
      />

      {/* Small icy moon — Titan-like */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          animation: 'moon-orbit-saturn 45s linear infinite',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -210,
            right: -20,
            width: 40,
            height: 40,
            opacity: 0.55,
            pointerEvents: 'none',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 28% 28%, rgba(245,240,225,0.96), rgba(210,200,180,0.88), rgba(160,150,130,0.68), rgba(90,85,70,0.48))',
            boxShadow:
              'inset -6px -5px 12px rgba(0,0,0,0.55), ' +
              'inset 4px 4px 8px rgba(255,255,255,0.3), ' +
              '0 0 20px rgba(225,215,195,0.12)',
          }}
        >
          {/* Surface detail on moon */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'repeating-linear-gradient(0deg, transparent 0px, transparent 3px, rgba(0,0,0,0.035) 3px, rgba(0,0,0,0.035) 4px)',
              animation: 'planet-spin 1200s linear infinite',
            }}
          />
        </div>
      </div>

      {/* Tiny asteroid fragments near Saturn */}
      <div
        style={{
          position: 'absolute',
          top: '32%',
          right: '16%',
          width: 2.5,
          height: 2.5,
          borderRadius: '50%',
          background: 'rgba(190,180,160,0.4)',
          boxShadow:
            '5px 3px 0 0 rgba(170,160,140,0.25), ' +
            '-3px 9px 0 0 rgba(150,140,120,0.18), ' +
            '8px -7px 0 0 rgba(160,150,130,0.2), ' +
            '-8px -3px 0 0 rgba(140,130,110,0.15)',
          pointerEvents: 'none',
        }}
      />

      {/* Tiny distant stars partially hidden behind planet */}
      <div
        style={{
          position: 'absolute',
          top: '22%',
          left: '46%',
          width: 1.5,
          height: 1.5,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.55)',
          boxShadow: '0 0 4px rgba(255,255,255,0.3)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '68%',
          left: '40%',
          width: 1,
          height: 1,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.45)',
          boxShadow: '0 0 3px rgba(255,255,255,0.22)',
          pointerEvents: 'none',
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '55%',
          width: 1.2,
          height: 1.2,
          borderRadius: '50%',
          background: 'rgba(255,255,255,0.4)',
          boxShadow: '0 0 2px rgba(255,255,255,0.18)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}

function NeptunePlanet() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '42%',
        left: '4%',
        width: 140,
        height: 140,
        opacity: 0.2,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {/* Atmospheric scattering layers */}
      <div
        style={{
          position: 'absolute',
          inset: '-18%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(120,190,255,0.1) 25%, rgba(80,150,220,0.05) 45%, transparent 68%)',
          filter: 'blur(8px)',
        }}
      />
      <div
        style={{
          position: 'absolute',
          inset: '-10%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(100,170,240,0.08) 30%, rgba(60,120,200,0.03) 55%, transparent 72%)',
          filter: 'blur(4px)',
        }}
      />

      {/* Planet body — deep blue ice giant */}
      <div
        style={{
          position: 'absolute',
          inset: '3%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 26% 26%, rgba(175,225,250,0.96), rgba(120,195,235,0.9), rgba(70,150,200,0.82), rgba(35,105,155,0.72), rgba(18,65,105,0.62), rgba(8,35,60,0.48))',
          boxShadow:
            'inset -14px -12px 32px rgba(0,0,0,0.48), ' +
            'inset 5px 5px 16px rgba(160,220,255,0.16), ' +
            '0 0 50px rgba(90,160,230,0.12)',
          overflow: 'hidden',
        }}
      >
        {/* Thin cloud bands — multiple frequencies */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'repeating-linear-gradient(0deg, transparent 0px, transparent 10px, rgba(255,255,255,0.028) 10px, rgba(255,255,255,0.028) 12px)' +
              ', repeating-linear-gradient(0deg, transparent 0px, transparent 22px, rgba(0,0,0,0.03) 22px, rgba(0,0,0,0.03) 24px)' +
              ', repeating-linear-gradient(0deg, transparent 0px, transparent 35px, rgba(255,255,255,0.012) 35px, rgba(255,255,255,0.012) 37px)',
            animation: 'planet-spin 650s linear infinite',
          }}
        />
        {/* Great Dark Spot — storm feature */}
        <div
          style={{
            position: 'absolute',
            top: '44%',
            left: '30%',
            width: '24%',
            height: '14%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 40% 40%, rgba(0,0,0,0.18), rgba(0,0,0,0.08) 45%, transparent 72%)',
            filter: 'blur(4px)',
          }}
        />
        {/* Subtle companion storm */}
        <div
          style={{
            position: 'absolute',
            top: '52%',
            left: '55%',
            width: '12%',
            height: '7%',
            borderRadius: '50%',
            background: 'radial-gradient(ellipse, rgba(0,0,0,0.1), transparent 70%)',
            filter: 'blur(3px)',
          }}
        />
        {/* Soft terminator */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 68% 65%, rgba(140,210,255,0.06) 0%, transparent 45%)',
          }}
        />
      </div>

      {/* Tiny distant moon — Triton-like */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          animation: 'moon-orbit-neptune 30s linear infinite reverse',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -50,
            right: -12,
            width: 24,
            height: 24,
            opacity: 0.45,
            pointerEvents: 'none',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 32% 32%, rgba(220,215,200,0.92), rgba(170,165,150,0.7), rgba(100,95,80,0.45))',
            boxShadow:
              'inset -3px -3px 7px rgba(0,0,0,0.48), ' +
              'inset 2px 2px 4px rgba(255,255,255,0.22), ' +
              '0 0 10px rgba(200,195,180,0.08)',
          }}
        />
      </div>
    </div>
  );
}

function MarsPlanet() {
  return (
    <div
      style={{
        position: 'absolute',
        top: '65%',
        right: '4%',
        width: 120,
        height: 120,
        opacity: 0.18,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {/* Atmospheric scattering */}
      <div
        style={{
          position: 'absolute',
          inset: '-12%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(210,150,110,0.1) 32%, rgba(170,110,70,0.05) 52%, transparent 72%)',
          filter: 'blur(6px)',
        }}
      />

      {/* Planet body — detailed rocky surface */}
      <div
        style={{
          position: 'absolute',
          inset: '3%',
          borderRadius: '50%',
          background: 'radial-gradient(circle at 28% 28%, rgba(245,190,150,0.96), rgba(220,150,100,0.9), rgba(195,115,65,0.82), rgba(165,80,35,0.72), rgba(130,50,20,0.62), rgba(85,28,8,0.48))',
          boxShadow:
            'inset -14px -12px 32px rgba(0,0,0,0.48), ' +
            'inset 5px 5px 14px rgba(255,210,170,0.14), ' +
            '0 0 40px rgba(190,110,65,0.08)',
          overflow: 'hidden',
        }}
      >
        {/* Surface texture — regolith and dust */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background:
              'repeating-linear-gradient(0deg, transparent 0px, transparent 4px, rgba(0,0,0,0.04) 4px, rgba(0,0,0,0.04) 5px)' +
              ', repeating-linear-gradient(0deg, transparent 0px, transparent 11px, rgba(255,255,255,0.015) 11px, rgba(255,255,255,0.015) 12px)',
            animation: 'planet-spin 500s linear infinite',
          }}
        />
        {/* Mountain range hints */}
        <div
          style={{
            position: 'absolute',
            top: '18%',
            left: '10%',
            right: '10%',
            height: '8%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.06), transparent 60%, rgba(255,200,160,0.02))',
            borderRadius: '50%',
            filter: 'blur(3px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '72%',
            left: '15%',
            right: '15%',
            height: '6%',
            background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.04) 40%, rgba(255,180,140,0.015))',
            borderRadius: '50%',
            filter: 'blur(2px)',
          }}
        />
        {/* Valley / canyon hint */}
        <div
          style={{
            position: 'absolute',
            top: '42%',
            left: '20%',
            width: '35%',
            height: '3%',
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.05), transparent)',
            borderRadius: '50%',
            filter: 'blur(2px)',
            transform: 'rotate(-8deg)',
          }}
        />
        {/* Large craters — Olympus Mons region */}
        <div
          style={{
            position: 'absolute',
            width: '32%',
            height: '32%',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 32% 32%, rgba(0,0,0,0.2), rgba(0,0,0,0.09) 48%, transparent 72%)',
            top: '16%',
            left: '14%',
            boxShadow: 'inset -3px -3px 6px rgba(0,0,0,0.35)',
          }}
        />
        {/* Medium crater */}
        <div
          style={{
            position: 'absolute',
            width: '20%',
            height: '20%',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 32% 32%, rgba(0,0,0,0.17), rgba(0,0,0,0.07) 48%, transparent 72%)',
            top: '48%',
            left: '42%',
            boxShadow: 'inset -2px -2px 4px rgba(0,0,0,0.28)',
          }}
        />
        {/* Small crater cluster */}
        <div
          style={{
            position: 'absolute',
            width: '12%',
            height: '12%',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 32% 32%, rgba(0,0,0,0.14), rgba(0,0,0,0.05) 48%, transparent 72%)',
            top: '28%',
            left: '56%',
            boxShadow: 'inset -1px -1px 2px rgba(0,0,0,0.22)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '8%',
            height: '8%',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 32% 32%, rgba(0,0,0,0.12), transparent 72%)',
            top: '62%',
            left: '22%',
          }}
        />
        {/* Dust storm region — Hellas Planitia */}
        <div
          style={{
            position: 'absolute',
            top: '58%',
            left: '8%',
            width: '40%',
            height: '28%',
            background: 'radial-gradient(ellipse, rgba(180,100,60,0.1), rgba(200,130,80,0.05) 50%, transparent 72%)',
            borderRadius: '50%',
            filter: 'blur(5px)',
          }}
        />
        {/* Northern polar ice cap */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '18%',
            right: '18%',
            height: '16%',
            background: 'linear-gradient(to bottom, rgba(240,235,225,0.3), rgba(230,220,210,0.15) 50%, transparent)',
            borderRadius: '50%',
            filter: 'blur(3px)',
          }}
        />
        {/* Southern polar cap hint */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '25%',
            right: '25%',
            height: '10%',
            background: 'linear-gradient(to top, rgba(235,230,220,0.18), transparent)',
            borderRadius: '50%',
            filter: 'blur(2px)',
          }}
        />
        {/* Soft terminator */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            background: 'radial-gradient(ellipse at 65% 60%, rgba(255,200,150,0.05) 0%, transparent 42%)',
          }}
        />
      </div>

      {/* Small moon — Phobos-like */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 0,
          height: 0,
          animation: 'moon-orbit-mars 20s linear infinite',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: -40,
            right: -8,
            width: 16,
            height: 16,
            opacity: 0.5,
            pointerEvents: 'none',
            borderRadius: '50%',
            background: 'radial-gradient(circle at 30% 30%, rgba(200,195,180,0.9), rgba(150,145,130,0.65), rgba(80,75,60,0.4))',
            boxShadow:
              'inset -2px -2px 4px rgba(0,0,0,0.45), ' +
              'inset 1px 1px 2px rgba(255,255,255,0.2), ' +
              '0 0 8px rgba(180,170,150,0.06)',
          }}
        >
          {/* Irregular shape hint on Phobos */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: '50%',
              background: 'repeating-linear-gradient(45deg, transparent 0px, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 3px)',
              animation: 'planet-spin 900s linear infinite',
            }}
          />
        </div>
      </div>
    </div>
  );
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
  const saturnRef = useRef<HTMLDivElement>(null);
  const neptuneRef = useRef<HTMLDivElement>(null);
  const marsRef = useRef<HTMLDivElement>(null);
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

    // Two very subtle nebula clouds — blue and purple, NASA-inspired
    const subtleNebulae: { x: number; y: number; r: number; hue: number; hue2: number; parallax: number }[] = [
      {
        x: w * 0.15,
        y: h * 1.2,
        r: 350,
        hue: 210,
        hue2: 200,
        parallax: 0.12,
      },
      {
        x: w * 0.8,
        y: h * 2.1,
        r: 300,
        hue: 265,
        hue2: 260,
        parallax: 0.1,
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
      const orbitSpeed = 0.0001 + Math.random() * 0.0002;

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

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, w, h);

      const scrollOffset = sp * h * 2.5;

      if (saturnRef.current) saturnRef.current.style.transform = `translateY(${-scrollOffset * 0.55}px)`;
      if (neptuneRef.current) neptuneRef.current.style.transform = `translateY(${-scrollOffset * 0.62}px)`;
      if (marsRef.current) marsRef.current.style.transform = `translateY(${-scrollOffset * 0.52}px)`;

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

      // Subtle nebula clouds — blue and purple, extremely low opacity
      for (const n of subtleNebulae) {
        const ny = ((n.y - scrollOffset * n.parallax) % (h * 3) + h * 3) % (h * 3) - h;
        const nx = n.x + Math.sin(t * 0.08 + n.x * 0.01) * 20;
        const grad = ctx.createRadialGradient(nx, ny, 0, nx, ny, n.r);
        grad.addColorStop(0, `hsla(${n.hue}, 60%, 25%, 0.025)`);
        grad.addColorStop(0.5, `hsla(${n.hue2}, 50%, 20%, 0.015)`);
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
    <div className="fixed inset-0 w-full h-full pointer-events-none" style={{ zIndex: 0 }}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />
      <div ref={saturnRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <SaturnPlanet />
      </div>
      <div ref={neptuneRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <NeptunePlanet />
      </div>
      <div ref={marsRef} style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}>
        <MarsPlanet />
      </div>
    </div>
  );
}
