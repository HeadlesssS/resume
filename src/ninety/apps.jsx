import { useState } from 'react'
import { getVideos } from '../videos.js'
import { MORE_PROJECTS } from '../data.js'
import { EXPERIMENTS, SKILLS, PROJECT_APPS } from './content.js'
import Icon from './icons.jsx'

function Vid({ src }) {
  return <video className="n-video" key={src} src={src} controls loop muted playsInline preload="metadata" />
}

/* ───────── About Me (Notepad) ───────── */
export function AboutApp({ open }) {
  return (
    <div className="n-notepad">
      <div className="n-menubar"><span>File</span><span>Edit</span><span>Search</span><span>Help</span></div>
      <pre className="n-sunken n-notepad__text">{`Bhoj Bahadur Khadka
Full Stack Developer
Django / React / Three.js
Based in Nepal

I'm drawn to the visualization side:
taking data or abstract concepts and
making them something you can actually
see and interact with.

The interesting constraint for me isn't
usually the code, it's the math
underneath: how you map data to visual
space, how you handle large datasets
without destroying performance.

------------------------------------
Email : `}<a href="mailto:aaryanarju@gmail.com">aaryanarju@gmail.com</a>{`
Phone : +977 9746205336
GitHub: `}<a href="#gh" onClick={(e) => { e.preventDefault(); open('github') }}>github.com/HeadlesssS</a>{`
`}</pre>
    </div>
  )
}

/* ───────── Explorer-style folder ───────── */
export function FolderApp({ path, items, open }) {
  const go = (it) => open(it.app, it.props)
  return (
    <div className="n-explorer">
      <div className="n-menubar"><span>File</span><span>Edit</span><span>View</span><span>Help</span></div>
      <div className="n-addr"><span>Address</span><div className="n-sunken">{path}</div></div>
      <div className="n-sunken n-explorer__list">
        {items.map((it) => (
          <button type="button" key={it.app} className="n-file" onDoubleClick={() => go(it)} onClick={() => { if (window.matchMedia('(pointer: coarse)').matches) go(it) }} onKeyDown={(e) => e.key === 'Enter' && go(it)}>
            <Icon name={it.icon} /><span>{it.label}</span>
          </button>
        ))}
      </div>
      <div className="n-statusrow"><span>{items.length} object(s)</span></div>
    </div>
  )
}

/* ───────── Project window ───────── */
export function ProjectApp({ id, open }) {
  const p = PROJECT_APPS[id]
  return (
    <div className="n-doc">
      {p.video ? <Vid src={getVideos(p.video)[0]} /> : (
        <div className="n-novideo n-sunken">
          <Icon name={p.icon} size={48} />
          <p>No video for this one. Press Run to launch it.</p>
        </div>
      )}
      <h2>{p.title}</h2>
      <p className="n-sub">{p.sub}</p>
      <p><b>Tech:</b> {p.stack}</p>
      <ul>{p.bullets.map((b) => <li key={b}>{b}</li>)}</ul>
      <div className="n-btnrow">
        {p.live && <button type="button" className="n-btn n-btn--def" onClick={() => open('browser', { url: p.live, title: p.title })}>Run live demo</button>}
        {p.play && <button type="button" className="n-btn n-btn--def" onClick={() => open('gol')}>Play it</button>}
        {p.repoName && <button type="button" className="n-btn" onClick={() => open('github', { repo: p.repoName })}>View source</button>}
      </div>
    </div>
  )
}

/* ───────── Stella experiments (Media Player) ───────── */
export function MediaApp() {
  const [i, setI] = useState(0)
  const [c, setC] = useState(0)
  const e = EXPERIMENTS[i]
  const list = getVideos(e.id)
  return (
    <div className="n-player">
      <div className="n-player__main">
        <div className="n-player__screen"><Vid src={list[Math.min(c, list.length - 1)]} /></div>
        {list.length > 1 && (
          <div className="n-btnrow">
            {list.map((s, k) => {
              const m = s.match(/tstarclose(\w+?)\.mp4/i)
              return <button type="button" key={s} className={`n-btn${k === c ? ' n-btn--def' : ''}`} onClick={() => setC(k)}>{m ? m[1].toUpperCase() : `#${k + 1}`}</button>
            })}
          </div>
        )}
        <div className="n-sunken n-player__text">
          <b>EXP. {e.n}: {e.title}</b>
          <p>{e.text}</p>
        </div>
      </div>
      <ol className="n-sunken n-playlist">
        {EXPERIMENTS.map((x, k) => (
          <li key={x.id}>
            <button type="button" className={k === i ? 'on' : ''} onClick={() => { setI(k); setC(0) }}>{x.n}. {x.title}</button>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* ───────── More projects (details view) ───────── */
export function MoreApp() {
  return (
    <div className="n-explorer">
      <div className="n-menubar"><span>File</span><span>Edit</span><span>View</span><span>Help</span></div>
      <div className="n-sunken n-explorer__list n-details">
        <table>
          <thead><tr><th>Name</th><th>Tech</th><th>About</th></tr></thead>
          <tbody>
            {MORE_PROJECTS.map((m) => (
              <tr key={m.title}><td><Icon name="folder" size={16} /> {m.title}</td><td>{m.stack}</td><td>{m.text}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="n-statusrow"><span>{MORE_PROJECTS.length} object(s)</span></div>
    </div>
  )
}

/* ───────── My Computer → System Properties (skills) ───────── */
export function SkillsApp() {
  const [t, setT] = useState(0)
  return (
    <div className="n-props">
      <div className="n-tabs" role="tablist">
        {SKILLS.map(([name], k) => (
          <button type="button" role="tab" aria-selected={k === t} key={name} className={k === t ? 'on' : ''} onClick={() => setT(k)}>{name}</button>
        ))}
      </div>
      <div className="n-tabpage">
        <p><b>{SKILLS[t][0]}</b> installed components:</p>
        <ul className="n-sunken n-checklist">
          {SKILLS[t][1].map((s) => <li key={s}><span>☑</span> {s}</li>)}
        </ul>
      </div>
    </div>
  )
}

/* ───────── Internet (iframe browser for the live demos) ───────── */
export function BrowserApp({ url }) {
  const [loading, setLoading] = useState(true)
  return (
    <div className="n-browser">
      <div className="n-addr"><span>Address</span><div className="n-sunken">{url}</div></div>
      <div className="n-browser__view">
        {loading && <p className="n-browser__load">Connecting to host...</p>}
        <iframe title={url} src={url} onLoad={() => setLoading(false)} allow="fullscreen; autoplay; pointer-lock" />
      </div>
    </div>
  )
}
