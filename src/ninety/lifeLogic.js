/* Conway's Game of Life rules (port of GOL.py). Cells are stored as numbers: col * 100 + row. */
export const TILE = 20
export const W = 960
export const H = 540
export const COLS = W / TILE // 48
export const ROWS = H / TILE // 27

export const key = (c, r) => c * 100 + r

export function nextGen(cells) {
  const counts = new Map()
  for (const k of cells) {
    const c = Math.floor(k / 100), r = k % 100
    for (let dc = -1; dc <= 1; dc++) {
      for (let dr = -1; dr <= 1; dr++) {
        if (dc === 0 && dr === 0) continue
        const nc = c + dc, nr = r + dr
        if (nc < 0 || nc >= COLS || nr < 0 || nr >= ROWS) continue
        const nk = key(nc, nr)
        counts.set(nk, (counts.get(nk) || 0) + 1)
      }
    }
  }
  const next = new Set()
  for (const [k, n] of counts) {
    if (n === 3 || (n === 2 && cells.has(k))) next.add(k)
  }
  return next
}

/* Same as gen(random.randrange(4, 20) * GRID_WIDTH) */
export function randomCells() {
  const n = (4 + Math.floor(Math.random() * 16)) * COLS
  const s = new Set()
  for (let i = 0; i < n; i++) s.add(key(Math.floor(Math.random() * COLS), Math.floor(Math.random() * ROWS)))
  return s
}
