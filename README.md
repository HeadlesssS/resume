# BBK portfolio — Figma → React (Vite, JSX + CSS)

Two modes in one app:

- **Recruiter mode** (default) — the Figma design. Desktop above 768px, mobile at 768px and below.
- **90's mode** — a plain Windows-95-style computer (BBK-95): teal desktop, draggable / minimizable windows, Start menu. Every section is an app, including GitHub (loaded in-window from GitHub's public API) and a playable **Game of Life** (a JavaScript port of GOL.py, in `src/ninety/life.jsx`). Opened with the "Go to the 90's →" button (or `?mode=90s`). Start → Shut Down returns to recruiter mode.

No backend anywhere. Contact opens the visitor's own mail app.

```bash
npm install
npm run dev
```

- Images from Figma are downloaded into `public/assets` on first run (`npm run assets` to refresh).
  Figma links expire after 7 days — **commit `public/assets` once downloaded**.
- Demo videos: `src/videos.js` (points at the `.mp4` files in `public/`, same as before).

- Live demo links: edit `LIVE` in `src/data.js` (Stella is empty until you paste its URL; the button appears automatically).
