const TechLogos: Record<string, { svg: string; color: string }> = {
  'React': {
    color: '#61dafb',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="2.5" fill="#61dafb"/>
      <ellipse cx="12" cy="12" rx="11" ry="4.5" stroke="#61dafb" stroke-width="1.2" opacity="0.9"/>
      <ellipse cx="12" cy="12" rx="11" ry="4.5" stroke="#61dafb" stroke-width="1.2" opacity="0.9" transform="rotate(60 12 12)"/>
      <ellipse cx="12" cy="12" rx="11" ry="4.5" stroke="#61dafb" stroke-width="1.2" opacity="0.9" transform="rotate(120 12 12)"/>
    </svg>`
  },
  'JavaScript': {
    color: '#f7df1e',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="2" width="20" height="20" rx="3" fill="#f7df1e"/>
      <text x="12" y="16.5" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#000" text-anchor="middle">JS</text>
    </svg>`
  },
  'Node.js': {
    color: '#68a063',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 7v10l9 5 9-5V7l-9-5z" fill="#68a063" opacity="0.15"/>
      <path d="M12 2L3 7l9 5 9-5-9-5z" fill="#68a063"/>
      <path d="M12 22V12" stroke="#68a063" stroke-width="1.5"/>
      <text x="12" y="16.5" font-family="system-ui, sans-serif" font-size="7" font-weight="700" fill="#fff" text-anchor="middle">N</text>
    </svg>`
  },
  'PHP': {
    color: '#777bb3',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <ellipse cx="12" cy="12" rx="10" ry="5" fill="#777bb3" opacity="0.2" transform="rotate(-20 12 12)"/>
      <text x="12" y="16" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#777bb3" text-anchor="middle">php</text>
    </svg>`
  },
  'AWS': {
    color: '#ff9900',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5 18h14v2H5z" fill="#ff9900" opacity="0.15"/>
      <text x="12" y="16" font-family="system-ui, sans-serif" font-size="7" font-weight="700" fill="#ff9900" text-anchor="middle">aws</text>
    </svg>`
  },
  'MySQL': {
    color: '#4479a1',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 8c0-2 2-4 4-4h8c2 0 4 2 4 4v10c0 2-2 4-4 4H8c-2 0-4-2-4-4V8z" fill="#4479a1" opacity="0.15"/>
      <text x="12" y="16" font-family="system-ui, sans-serif" font-size="6.5" font-weight="700" fill="#4479a1" text-anchor="middle">mysql</text>
    </svg>`
  },
  'MongoDB': {
    color: '#4db33d',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8 2 4 6 4 12c0 4 2 8 8 10 6-2 8-6 8-10 0-6-4-10-8-10z" fill="#4db33d" opacity="0.2"/>
      <text x="12" y="16" font-family="system-ui, sans-serif" font-size="6" font-weight="700" fill="#4db33d" text-anchor="middle">mongo</text>
    </svg>`
  },
  'Linux': {
    color: '#fcc624',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="10" r="5" fill="#fcc624" opacity="0.15"/>
      <text x="12" y="13.5" font-family="system-ui, sans-serif" font-size="7" font-weight="700" fill="#fcc624" text-anchor="middle">TUX</text>
    </svg>`
  },
  'Docker': {
    color: '#2496ed',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="14" width="4" height="4" rx="0.8" fill="#2496ed" opacity="0.3"/>
      <rect x="8" y="11" width="4" height="7" rx="0.8" fill="#2496ed" opacity="0.4"/>
      <rect x="13" y="8" width="4" height="10" rx="0.8" fill="#2496ed" opacity="0.5"/>
      <rect x="18" y="12" width="3" height="6" rx="0.6" fill="#2496ed" opacity="0.35"/>
    </svg>`
  },
  'Git': {
    color: '#f05032',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="9" cy="12" r="2.5" fill="#f05032"/>
      <circle cx="15" cy="16" r="2.5" fill="#f05032"/>
      <path d="M9 12L15 16" stroke="#f05032" stroke-width="1.8"/>
      <path d="M15 16c2-1 3-3 2-5" stroke="#f05032" stroke-width="1.8" stroke-linecap="round"/>
      <path d="M9 12c-2 1-3 3-2 5" stroke="#f05032" stroke-width="1.8" stroke-linecap="round"/>
    </svg>`
  },
  'Symfony': {
    color: '#000000',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <text x="12" y="16" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#000" text-anchor="middle">S</text>
    </svg>`
  },
  'Laravel': {
    color: '#ff2d20',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 8v8l8 6 8-6V8l-8-6z" fill="#ff2d20" opacity="0.15"/>
      <text x="12" y="16" font-family="system-ui, sans-serif" font-size="7" font-weight="700" fill="#ff2d20" text-anchor="middle">L</text>
    </svg>`
  },
  'REST APIs': {
    color: '#6ad0ff',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="6" width="18" height="12" rx="2" stroke="#6ad0ff" stroke-width="1.5" fill="none"/>
      <path d="M7 12h10M7 8h6M7 16h4" stroke="#6ad0ff" stroke-width="1.5" stroke-linecap="round"/>
    </svg>`
  }
};

export function getTechLogo(name: string): { svg: string; color: string } {
  return TechLogos[name] || { color: '#6ad0ff', svg: `<text x="12" y="16" font-family="system-ui, sans-serif" font-size="7" font-weight="700" fill="#6ad0ff" text-anchor="middle">${name.charAt(0)}</text>` };
}

export default TechLogos;
