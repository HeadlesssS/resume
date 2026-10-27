const P = { fill: 'none', stroke: '#000', strokeWidth: 1 }

const ICONS = {
  folder: <><path d="M2 9h11l3 3h14v16H2z" fill="#ffd84a" stroke="#000" /><path d="M2 14h28" stroke="#b8860b" /></>,
  notepad: <><rect x="6" y="3" width="20" height="26" fill="#fff" stroke="#000" /><rect x="6" y="3" width="20" height="5" fill="#000080" /><path d="M9 13h14M9 17h14M9 21h10" {...P} /></>,
  star: <><rect x="2" y="2" width="28" height="28" fill="#000040" stroke="#000" /><path d="M16 6l3 7 7 .6-5.3 4.6 1.7 7L16 21.5 9.6 25.2l1.7-7L6 13.6 13 13z" fill="#ffee00" stroke="#000" strokeWidth=".8" /></>,
  shop: <><rect x="4" y="13" width="24" height="15" fill="#fff" stroke="#000" /><path d="M3 13l2-8h22l2 8z" fill="#e02020" stroke="#000" /><path d="M9 5v8M15 5v8M21 5v8" stroke="#fff" /><rect x="13" y="18" width="6" height="10" fill="#7a4a1a" stroke="#000" /></>,
  cd: <><circle cx="16" cy="16" r="13" fill="#c8c8d8" stroke="#000" /><circle cx="16" cy="16" r="4" fill="#fff" stroke="#000" /><path d="M16 5a11 11 0 0 1 11 11" stroke="#fff" strokeWidth="2" fill="none" /></>,
  computer: <><rect x="4" y="4" width="24" height="17" fill="#d4d0c8" stroke="#000" /><rect x="7" y="7" width="18" height="11" fill="#008080" stroke="#000" /><rect x="11" y="23" width="10" height="3" fill="#d4d0c8" stroke="#000" /><rect x="7" y="26" width="18" height="3" fill="#d4d0c8" stroke="#000" /></>,
  book: <><rect x="6" y="3" width="20" height="26" fill="#a00000" stroke="#000" /><rect x="9" y="7" width="14" height="8" fill="#fff" stroke="#000" /><path d="M9 20h14" stroke="#ffd84a" strokeWidth="2" /></>,
  mail: <><rect x="3" y="7" width="26" height="18" fill="#fff" stroke="#000" /><path d="M3 8l13 10L29 8" {...P} /></>,
  globe: <><circle cx="16" cy="16" r="13" fill="#2a6fdb" stroke="#000" /><path d="M8 10c4-3 7 0 6 4s-5 2-7 5zM18 18c3-1 6 1 6 4s-4 4-6 2z" fill="#2fa83a" /></>,
  grid: <><rect x="3" y="3" width="26" height="26" fill="#000" stroke="#000" /><g fill="#00ff00"><rect x="8" y="8" width="5" height="5" /><rect x="14" y="14" width="5" height="5" /><rect x="20" y="8" width="5" height="5" /><rect x="8" y="20" width="5" height="5" /><rect x="20" y="20" width="5" height="5" /></g></>,
  school: <><rect x="5" y="14" width="22" height="14" fill="#fff" stroke="#000" /><path d="M2 14L16 5l14 9z" fill="#000080" stroke="#000" /><rect x="13" y="19" width="6" height="9" fill="#7a4a1a" stroke="#000" /></>,
  flag: <><rect x="3" y="4" width="12" height="11" fill="#e02020" /><rect x="17" y="3" width="12" height="11" fill="#2fa83a" /><rect x="3" y="17" width="12" height="11" fill="#2a6fdb" /><rect x="17" y="16" width="12" height="11" fill="#ffd800" /></>,
  github: <><circle cx="16" cy="16" r="13" fill="#24292e" stroke="#000" /><text x="16" y="20.5" textAnchor="middle" fontSize="11" fontFamily="Arial, sans-serif" fontWeight="bold" fill="#fff">GH</text></>,
  bike: <><rect x="2" y="2" width="28" height="28" fill="#5ba3ff" stroke="#000" /><rect x="2" y="18" width="28" height="12" fill="#6b6b6b" /><rect x="14" y="8" width="5" height="9" fill="#c00000" stroke="#000" /><rect x="13" y="17" width="7" height="9" fill="#111" /><rect x="12" y="12" width="9" height="5" fill="#ffd84a" stroke="#000" /></>,
  power: <><circle cx="16" cy="17" r="10" fill="#c0c0c0" stroke="#000" /><path d="M16 5v11" stroke="#a00000" strokeWidth="3" /></>,
}

export default function Icon({ name, size = 32 }) {
  return (
    <svg className="n-ico" width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges" aria-hidden="true">
      {ICONS[name] || ICONS.folder}
    </svg>
  )
}
