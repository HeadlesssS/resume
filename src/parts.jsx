import { useState } from 'react'
import { getVideos } from './videos.js'

export const A = (name) => `/assets/${name}`

function youTubeId(url) {
  const m = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]{11})/)
  return m ? m[1] : null
}

const tabLabel = (src, k) => {
  const m = src.match(/tstarclose(\w+?)\.mp4/i)
  return m ? m[1].toUpperCase() : `#${k + 1}`
}

/* Video layer shown inside a media box after PLAY DEMO is pressed */
export function DemoLayer({ id, onClose }) {
  const list = getVideos(id)
  const [i, setI] = useState(0)
  const src = list[i]
  const yt = youTubeId(src)
  return (
    <div className="demo">
      {yt ? (
        <iframe
          key={src}
          src={`https://www.youtube.com/embed/${yt}?autoplay=1&rel=0`}
          title="Demo video"
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
        />
      ) : (
        <video key={src} src={src} controls autoPlay loop playsInline preload="metadata" />
      )}
      {list.length > 1 && (
        <div className="demo__tabs">
          {list.map((s, k) => (
            <button type="button" key={s} className={k === i ? 'on' : ''} onClick={() => setI(k)}>{tabLabel(s, k)}</button>
          ))}
        </div>
      )}
      <button type="button" className="demo__close" onClick={onClose}>CLOSE ✕</button>
    </div>
  )
}

/* Desktop "PLAY DEMO" pill */
export function TechPlay({ onClick }) {
  return (
    <button type="button" className="d-play" onClick={onClick}>
      <img src={A('play.svg')} alt="" width="12" height="12" />
      <span>PLAY DEMO</span>
    </button>
  )
}

/* Desktop blueprint grid: 5 horizontal guide lines */
export function BlueprintGrid({ src = 'line-grid.svg' }) {
  return (
    <div className="d-grid" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => (
        <div className="line" key={i}>
          <img src={A(src)} alt="" />
        </div>
      ))}
    </div>
  )
}

/* Desktop media box with video */
export function DesktopMedia({ id, image, gridSrc, stella }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className={`d-media${stella ? ' d-media--stella' : ''}`}>
      {image && <img className="d-media__img" src={A(image)} alt="" />}
      <BlueprintGrid src={gridSrc} />
      <TechPlay onClick={() => setPlaying(true)} />
      {playing && <DemoLayer id={id} onClose={() => setPlaying(false)} />}
    </div>
  )
}

/* Mobile play pill. variant: "light" (on image) | "dark" (on plain media) */
export function MobilePlay({ variant, onClick }) {
  const light = variant === 'light'
  const icon = <img src={A(light ? 'm-play-white.svg' : 'm-play-dark.svg')} alt="" width="10" height="10" />
  return (
    <button type="button" className={`m-play m-play--${variant}`} onClick={onClick}>
      {light ? (<><span>PLAY DEMO</span>{icon}</>) : (<>{icon}<span>PLAY DEMO</span></>)}
    </button>
  )
}

export function MobileMedia({ id, image, variant }) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className={`m-media${image ? ' m-media--image' : ''}`}>
      {image && <img className="m-media__img" src={A(image)} alt="" />}
      <div className="m-guide"><img src={A('m-guide.svg')} alt="" /></div>
      <MobilePlay variant={variant} onClick={() => setPlaying(true)} />
      {playing && <DemoLayer id={id} onClose={() => setPlaying(false)} />}
    </div>
  )
}

/* Desktop media box that links out to a live demo (no video) */
export function LiveMedia({ href }) {
  return (
    <div className="d-media">
      <BlueprintGrid />
      {href && (
        <a className="d-play" href={href} target="_blank" rel="noreferrer">
          <img src={A('play.svg')} alt="" width="12" height="12" />
          <span>LIVE DEMO ↗</span>
        </a>
      )}
    </div>
  )
}

/* Mobile media box that links out to a live demo (no video) */
export function MobileLive({ href }) {
  return (
    <div className="m-media">
      <div className="m-guide"><img src={A('m-guide.svg')} alt="" /></div>
      {href && (
        <a className="m-play m-play--dark" href={href} target="_blank" rel="noreferrer">
          <img src={A('m-play-dark.svg')} alt="" width="10" height="10" />
          <span>LIVE DEMO ↗</span>
        </a>
      )}
    </div>
  )
}
