import { useEffect, useRef, useState } from 'react'
import { TILE, W, H, COLS, ROWS, key, nextGen, randomCells } from './lifeLogic.js'

const STEP_MS = (40 / 60) * 1000 // the original updates every 40 frames at 60 FPS

export default function LifeApp() {
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const sim = useRef({ cells: new Set(), playing: false, acc: 0, gen: 0 })
  const [ui, setUi] = useState({ playing: false, gen: 0, cells: 0 })

  const sync = () => setUi({ playing: sim.current.playing, gen: sim.current.gen, cells: sim.current.cells.size })
  const toggle = () => { sim.current.playing = !sim.current.playing; sim.current.acc = 0; sync() }
  const clear = () => { sim.current = { cells: new Set(), playing: false, acc: 0, gen: 0 }; sync() }
  const random = () => { sim.current.cells = randomCells(); sim.current.gen = 0; sync() }

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d')
    let raf, last = performance.now()
    const helpLines = ['GAME OF LIFE - CONTROLS', '', '[SPACE]  Start/Pause', '[C]      Clear grid', '[G]      Generate random cells', '[Click]  Flip cell alive/dead']

    const draw = () => {
      const s = sim.current
      ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, W, H)
      ctx.fillStyle = '#808080'
      for (const k of s.cells) ctx.fillRect(Math.floor(k / 100) * TILE, (k % 100) * TILE, TILE, TILE)
      ctx.strokeStyle = '#000'; ctx.lineWidth = 1
      ctx.beginPath()
      for (let r = 0; r <= ROWS; r++) { ctx.moveTo(0, r * TILE + 0.5); ctx.lineTo(W, r * TILE + 0.5) }
      for (let c = 0; c <= COLS; c++) { ctx.moveTo(c * TILE + 0.5, 0); ctx.lineTo(c * TILE + 0.5, H) }
      ctx.stroke()
      if (!s.playing) {
        ctx.font = 'bold 20px Consolas, "Courier New", monospace'
        const lh = 24, pad = 14
        const bw = Math.max(...helpLines.map((l) => ctx.measureText(l).width)) + pad * 2
        const bh = helpLines.length * lh + pad * 2
        ctx.fillStyle = 'rgba(40,40,40,0.8)'; ctx.fillRect(20, 20, bw, bh)
        ctx.textBaseline = 'top'
        helpLines.forEach((l, i) => { ctx.fillStyle = i === 0 ? 'rgb(20,200,180)' : 'rgb(255,140,0)'; ctx.fillText(l, 20 + pad, 20 + pad + i * lh) })
      }
    }

    const frame = (now) => {
      const s = sim.current
      if (s.playing) {
        s.acc += now - last
        if (s.acc >= STEP_MS) { s.acc = 0; s.cells = nextGen(s.cells); s.gen += 1; setUi({ playing: true, gen: s.gen, cells: s.cells.size }) }
      }
      last = now
      draw()
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    wrapRef.current?.focus()
    return () => cancelAnimationFrame(raf)
  }, [])

  const onPointerDown = (e) => {
    wrapRef.current?.focus()
    const rect = canvasRef.current.getBoundingClientRect()
    const col = Math.floor(((e.clientX - rect.left) * (W / rect.width)) / TILE)
    const row = Math.floor(((e.clientY - rect.top) * (H / rect.height)) / TILE)
    if (col < 0 || row < 0 || col >= COLS || row >= ROWS) return
    const k = key(col, row)
    const cells = sim.current.cells
    if (cells.has(k)) cells.delete(k); else cells.add(k)
    sync()
  }

  const onKeyDown = (e) => {
    if (e.code === 'Space') { e.preventDefault(); toggle() }
    else if (e.code === 'KeyC') clear()
    else if (e.code === 'KeyG') random()
  }

  return (
    <div className="n-life" ref={wrapRef} tabIndex={0} onKeyDown={onKeyDown} aria-label="Conway's Game of Life. Space to start or pause, C to clear, G for random cells.">
      <canvas ref={canvasRef} width={W} height={H} className="n-life__canvas" onPointerDown={onPointerDown} />
      <div className="n-life__bar">
        <button type="button" className="n-btn" onClick={toggle}>{ui.playing ? 'Pause' : 'Start'} (Space)</button>
        <button type="button" className="n-btn" onClick={clear}>Clear (C)</button>
        <button type="button" className="n-btn" onClick={random}>Random (G)</button>
      </div>
      <div className="n-statusrow"><span>{ui.playing ? 'Playing' : 'Paused'}</span><span>Generation {ui.gen}</span><span>{ui.cells} cells alive</span></div>
    </div>
  )
}
