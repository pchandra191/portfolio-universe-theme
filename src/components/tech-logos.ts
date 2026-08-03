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
    svg: `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(-2, 8) scale(0.4)">
        <path fill="#FFF" d="M46.644 12.219c-3.297.115-6.175 1.932-8.317 4.446-2.372 2.756-3.95 6.025-5.087 9.362-2.034-1.667-3.603-3.825-6.866-4.766-2.522-.724-5.171-.425-7.607 1.39-1.154.862-1.949 2.165-2.327 3.39-.979 3.183 1.029 6.016 1.941 7.033l1.994 2.137c.411.419 1.401 1.512.917 3.079-.523 1.704-2.577 2.807-4.684 2.157-.941-.287-2.293-.988-1.99-1.975.125-.404.414-.706.569-1.055.142-.3.21-.525.253-.657.385-1.257-.141-2.892-1.487-3.307-1.256-.385-2.541-.08-3.039 1.537-.565 1.837.314 5.171 5.023 6.623 5.517 1.695 10.184-1.309 10.846-5.227.417-2.454-.691-4.277-2.721-6.622l-1.654-1.829c-1.002-1.001-1.346-2.707-.309-4.018.875-1.106 2.121-1.578 4.162-1.023 2.979.809 4.307 2.876 6.523 4.543-.915 3.001-1.513 6.013-2.054 8.714l-.33 2.014c-1.584 8.308-2.793 12.87-5.935 15.489-.633.45-1.538 1.124-2.902 1.171-.715.022-.946-.47-.956-.684-.017-.502.406-.732.687-.958.42-.229 1.055-.609 1.012-1.826-.046-1.438-1.237-2.685-2.959-2.628-1.29.044-3.256 1.258-3.182 3.48.077 2.295 2.216 4.015 5.441 3.906 1.724-.059 5.574-.761 9.368-5.271 4.416-5.17 5.651-11.097 6.58-15.435l1.037-5.727c.576.069 1.192.115 1.862.131 5.5.116 8.251-2.733 8.292-4.805.027-1.254-.823-2.488-2.013-2.46-.852.024-1.922.591-2.179 1.769-.251 1.156 1.75 2.199.186 3.212-1.111.719-3.103 1.226-5.908.814l.51-2.819c1.041-5.346 2.325-11.922 7.196-12.082.355-.018 1.654.016 1.684.875.009.287-.062.36-.398 1.017-.342.512-.471.948-.455 1.449.047 1.365 1.085 2.262 2.586 2.208 2.01-.065 2.588-2.022 2.555-3.027-.081-2.361-2.57-3.853-5.865-3.745z"/>
      </g>
    </svg>`
  },
  'Laravel': {
    color: '#ff2d20',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L4 8v8l8 6 8-6V8l-8-6z" fill="#ff2d20" opacity="0.15"/>
      <text x="12" y="16" font-family="system-ui, sans-serif" font-size="7" font-weight="700" fill="#ff2d20" text-anchor="middle">L</text>
    </svg>`
  },
  'CSS': {
    color: '#ffd27a',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 3h16l-1.5 17L12 22l-6.5-2L4 3z" fill="#ffd27a" opacity="0.15"/>
      <path d="M4 3l6.5 2L12 6.5l1.5-3.5L19 3" stroke="#ffd27a" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="12" y="17" font-family="system-ui, sans-serif" font-size="7" font-weight="800" fill="#ffd27a" text-anchor="middle">CSS</text>
    </svg>`
  },
  'HTML': {
    color: '#ffd27a',
    svg: `<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4 3h16l-1.5 17L12 22l-6.5-2L4 3z" fill="#ffd27a" opacity="0.15"/>
      <path d="M4 3l6.5 2L12 6.5l1.5-3.5L19 3" stroke="#ffd27a" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="12" y="16.5" font-family="system-ui, sans-serif" font-size="6.5" font-weight="800" fill="#ffd27a" text-anchor="middle">HTML</text>
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
