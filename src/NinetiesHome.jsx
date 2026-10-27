import { useCallback, useEffect, useRef, useState } from 'react'
import Icon from './ninety/icons.jsx'
import { AboutApp, FolderApp, ProjectApp, MediaApp, MoreApp, SkillsApp, BrowserApp } from './ninety/apps.jsx'
import GitHubApp from './ninety/github.jsx'
import LifeApp from './ninety/life.jsx'
import './ninety.css'

/* ───────── app registry ───────── */
const PROJECT_ITEMS = [
  { app: 'stella', icon: 'star', label: 'Stella.exe' },
  { app: 'retail', icon: 'shop', label: '3DRetail.exe' },
  { app: 'cms', icon: 'school', label: 'CMS.exe' },
  { app: 'life', icon: 'grid', label: 'GameOfLife.exe' },
  { app: 'exps', icon: 'cd', label: 'Stella Experiments' },
  { app: 'more', icon: 'folder', label: 'More Projects' },
]

const APPS = {
  computer: { title: 'System Properties', icon: 'computer', label: 'My Computer', w: 400, h: 360 },
  about: { title: 'About Me - Notepad', icon: 'notepad', label: 'About Me', w: 420, h: 420 },
  projects: { title: 'Projects', icon: 'folder', label: 'My Projects', w: 500, h: 340 },
  stella: { title: 'Stella.exe', icon: 'star', label: 'Stella', w: 540, h: 560 },
  retail: { title: '3DRetail.exe', icon: 'shop', label: '3D Retail', w: 500, h: 400 },
  cms: { title: 'CMS.exe', icon: 'school', label: 'CMS', w: 520, h: 520 },
  life: { title: 'GameOfLife.exe', icon: 'grid', label: 'Game of Life', w: 520, h: 520 },
  exps: { title: 'Stella Experiments - Media Player', icon: 'cd', label: 'Experiments', w: 680, h: 480 },
  more: { title: 'More Projects', icon: 'folder', label: 'More Projects', w: 620, h: 320 },
  github: { title: 'GitHub', icon: 'github', label: 'GitHub', w: 780, h: 540 },
  browser: { title: 'Live Demo', icon: 'globe', label: 'Live Demo', w: 760, h: 520 },
  gol: { title: 'Game of Life', icon: 'grid', label: 'Game of Life', w: 700, h: 500 },
}
const DESKTOP = ['computer', 'about', 'projects', 'github', 'gol']

function renderApp(w, open) {
  switch (w.app) {
    case 'computer': return <SkillsApp />
    case 'about': return <AboutApp open={open} />
    case 'projects': return <FolderApp path="C:\Bhoj\Projects" items={PROJECT_ITEMS} open={open} />
    case 'stella': case 'retail': case 'cms': case 'life': return <ProjectApp id={w.app} open={open} />
    case 'exps': return <MediaApp />
    case 'more': return <MoreApp />
    case 'github': return <GitHubApp repo={w.props.repo} nonce={w.props.nonce} />
    case 'browser': return <BrowserApp url={w.props.url} />
    case 'gol': return <LifeApp />
    default: return null
  }
}

/* ───────── helpers ───────── */
function useMedia(q) {
  const [m, setM] = useState(() => window.matchMedia(q).matches)
  useEffect(() => {
    const mq = window.matchMedia(q)
    const f = (e) => setM(e.matches)
    mq.addEventListener('change', f)
    return () => mq.removeEventListener('change', f)
  }, [q])
  return m
}

function useClock() {
  const fmt = () => new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  const [t, setT] = useState(fmt)
  useEffect(() => { const id = setInterval(() => setT(fmt()), 15000); return () => clearInterval(id) }, [])
  return t
}

/* ───────── boot + shutdown ───────── */
const BOOT = [
  'BBK BIOS v1.0',
  'Memory Test: 16384K OK',
  'Starting BBK-95...',
]

function Boot({ onDone }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => (n < BOOT.length ? setN(n + 1) : onDone()), n === 0 ? 200 : 450)
    return () => clearTimeout(t)
  }, [n, onDone])
  useEffect(() => {
    const k = () => onDone()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onDone])
  return (
    <div className="n-boot" onClick={onDone} role="presentation">
      <pre>{BOOT.slice(0, n).join('\n')}<span className="blink">_</span></pre>
    </div>
  )
}

/* ───────── desktop ───────── */
export default function NinetiesHome({ onExit }) {
  const mobile = useMedia('(max-width: 768px)')
  const reduce = useMedia('(prefers-reduced-motion: reduce)')
  const [booted, setBooted] = useState(reduce)
  const [wins, setWins] = useState([])
  const [order, setOrder] = useState([])
  const [startOpen, setStartOpen] = useState(false)
  const [sel, setSel] = useState(null)
  const [down, setDown] = useState(false)
  const clock = useClock()
  const firstRun = useRef(true)

  const focus = useCallback((id) => setOrder((o) => [...o.filter((x) => x !== id), id]), [])

  const open = useCallback((app, props = {}) => {
    const id = props.url ? `${app}:${props.url}` : app
    setWins((ws) => {
      if (ws.some((w) => w.id === id)) {
        return ws.map((w) => (w.id === id ? { ...w, min: false, props: { ...w.props, ...props, nonce: Date.now() } } : w))
      }
      const def = APPS[app]
      const n = ws.length
      const w = Math.min(def.w, window.innerWidth - 16)
      const h = Math.min(def.h, window.innerHeight - 60)
      return [...ws, {
        id, app, props, title: props.title ? `${props.title} - Live Demo` : def.title,
        x: Math.max(8, Math.min(110 + n * 26, window.innerWidth - w - 8)),
        y: Math.max(8, Math.min(20 + n * 26, window.innerHeight - h - 44)),
        w, h, min: false, max: window.innerWidth <= 768,
      }]
    })
    focus(id)
    setStartOpen(false)
  }, [focus])

  const close = (id) => { setWins((ws) => ws.filter((w) => w.id !== id)); setOrder((o) => o.filter((x) => x !== id)) }
  const patch = (id, p) => setWins((ws) => ws.map((w) => (w.id === id ? { ...w, ...p } : w)))

  const visible = order.filter((id) => wins.find((w) => w.id === id && !w.min))
  const activeId = visible[visible.length - 1]

  useEffect(() => {
    if (booted && firstRun.current) { firstRun.current = false; open('about') }
  }, [booted, open])

  const startDrag = (e, w) => {
    if (e.button !== 0 || e.target.closest('button') || w.max || mobile) return
    focus(w.id)
    const sx = e.clientX, sy = e.clientY, ox = w.x, oy = w.y
    const move = (ev) => patch(w.id, {
      x: Math.min(Math.max(ox + ev.clientX - sx, -w.w + 90), window.innerWidth - 90),
      y: Math.min(Math.max(oy + ev.clientY - sy, 0), window.innerHeight - 70),
    })
    const up = () => window.removeEventListener('pointermove', move)
    window.addEventListener('pointermove', move)
    window.addEventListener('pointerup', up, { once: true })
  }

  const shutDown = () => { setStartOpen(false); setDown(true); setTimeout(onExit, 1400) }

  const taskClick = (w) => {
    if (w.min) { patch(w.id, { min: false }); focus(w.id) }
    else if (w.id === activeId) patch(w.id, { min: true })
    else focus(w.id)
  }

  if (down) return <div className="n-os n-shutdown"><p>Windows is shutting down...</p></div>
  if (!booted) return <div className="n-os"><Boot onDone={() => setBooted(true)} /></div>

  return (
    <div className="n-os" onPointerDown={(e) => { if (!e.target.closest('.n-start, .n-startbtn')) setStartOpen(false) }}>
      <div className="n-desk" onClick={(e) => { if (e.target === e.currentTarget || e.target.classList.contains('n-icons')) setSel(null) }}>
        <div className="n-icons">
          {DESKTOP.map((id) => (
            <button
              type="button" key={id}
              className={`n-dicon${sel === id ? ' sel' : ''}`}
              onClick={(e) => { e.stopPropagation(); if (mobile || window.matchMedia('(pointer: coarse)').matches) open(id); else setSel(id) }}
              onDoubleClick={() => open(id)}
              onKeyDown={(e) => e.key === 'Enter' && open(id)}
            >
              <Icon name={APPS[id].icon} /><span>{APPS[id].label}</span>
            </button>
          ))}
        </div>

        {wins.map((w) => (
          <div
            key={w.id}
            className={`n-win${w.id === activeId ? ' active' : ''}${w.max ? ' is-max' : ''}${w.min ? ' is-min' : ''}`}
            style={{ left: w.x, top: w.y, width: w.w, height: w.h, zIndex: order.indexOf(w.id) + 10 }}
            onPointerDown={() => focus(w.id)}
            role="dialog" aria-label={w.title}
          >
            <div className="n-win__bar" onPointerDown={(e) => startDrag(e, w)} onDoubleClick={() => !mobile && patch(w.id, { max: !w.max })}>
              <Icon name={APPS[w.app].icon} size={16} />
              <span className="n-win__title">{w.title}</span>
              <div className="n-win__btns">
                <button type="button" aria-label="Minimize" onClick={() => patch(w.id, { min: true })}>_</button>
                {!mobile && <button type="button" aria-label="Maximize" onClick={() => patch(w.id, { max: !w.max })}>□</button>}
                <button type="button" aria-label="Close" onClick={() => close(w.id)}>×</button>
              </div>
            </div>
            <div className="n-win__body">{renderApp(w, open)}</div>
          </div>
        ))}
      </div>

      {startOpen && (
        <div className="n-start" role="menu">
          <div className="n-start__list">
            {['projects', 'about', 'computer', 'github', 'gol'].map((id) => (
              <button type="button" key={id} onClick={() => open(id)}><Icon name={APPS[id].icon} size={24} />{APPS[id].label}</button>
            ))}
            <hr />
            <button type="button" onClick={shutDown}><Icon name="power" size={24} />Shut Down...</button>
          </div>
        </div>
      )}

      <div className="n-task">
        <button type="button" className={`n-startbtn${startOpen ? ' on' : ''}`} onClick={() => setStartOpen((v) => !v)}><Icon name="flag" size={18} /><b>Start</b></button>
        <div className="n-task__list">
          {wins.map((w) => (
            <button type="button" key={w.id} className={`n-taskbtn${w.id === activeId ? ' on' : ''}`} onClick={() => taskClick(w)} title={w.title}>
              <Icon name={APPS[w.app].icon} size={16} /><span>{w.title}</span>
            </button>
          ))}
        </div>
        <div className="n-tray">{clock}</div>
      </div>
    </div>
  )
}
