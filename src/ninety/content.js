import { LIVE, REPOS, RETAIL } from '../data.js'

const repoName = (u) => u.split('/').pop()

export const EXPERIMENTS = [
  { id: 'gaia', n: '01', title: 'GAIA Visualisation', text: 'My first try at rendering a full Gaia subset: 307,818 rows in ONE dataset, sphere geometry plus colour mapping. It lagged like crazy and showed me how far I had to optimise. Basic OrbitControls, and a raycaster for picking stars that never worked reliably.' },
  { id: 'space', n: '02', title: 'Moving Through Space', text: "Made while building Stella's alternate mode. Stars get random positions, and as you change the star count they phase in and out like a hyperspace jump." },
  { id: 'twinkle', n: '03', title: 'Twinkling Stars', text: 'A bug! The scene re-rendered every frame so stars were erased and redrawn in a loop. It looked like real twinkling, so I kept it.' },
  { id: 'sunday', n: '04', title: 'Sunday', text: 'Early version with no real 3D yet. Stars are plain points, except the selected one, which becomes a sphere that grows and shrinks.' },
  { id: 'tstar', n: '05', title: 'T-Star Close', text: 'A test of icosahedron spheres with texture and real-time lighting, to see how I wanted stars to look up close. Pick a colour above.' },
]

export const SKILLS = [
  ['Backend', ['Django', 'DRF (Django REST Framework)', 'REST APIs', 'ASP.NET MAUI Hybrid', 'Java EE']],
  ['Frontend', ['React', 'Three.js', 'JavaScript', 'TypeScript', 'Figma', 'Bootstrap']],
  ['DevOps', ['Vercel', 'Render', 'Docker', 'cPanel', 'Celery']],
  ['Databases', ['PostgreSQL', 'MySQL', 'SQLite', 'Redis']],
]

export const PROJECT_APPS = {
  stella: { title: 'Stella', icon: 'star', sub: '3D navigable Galaxy with social media features', stack: 'Django, React, Three.js', video: 'stella', repoName: repoName(REPOS.stella), live: LIVE.stella,
    bullets: ['Renders 10,000+ real stars from the Gaia EDR3 catalog in a fully navigable 3D field.', 'Two separate modes: a galactic rotation curve model, and an N-body gravity simulation (O(n²) pairwise force with softening).', 'Social layer: posts, comments, likes, bookmarks, profiles and AI-assisted interactions about the star you selected.'] },
  retail: { title: RETAIL.title, icon: 'shop', sub: 'Walk around a store in your browser', stack: RETAIL.stack, video: null, repoName: null, live: LIVE.retail,
    bullets: ['Built from a Blender store scene.', 'Rearrange products between shelf slots, fill a basket and check out.', 'Working vending machine. Built as a mockup to pitch to retail stores.'] },
  cms: { title: 'Content Management System', icon: 'school', sub: 'E-learning platform', stack: 'Django, HTML, CSS, JS, PostgreSQL', video: 'cms', repoName: repoName(REPOS.cms), live: '',
    bullets: ['Student and teacher portals with authentication and role-based access.', 'Course management, plus subscription and eSewa payment flow.'] },
  life: { title: "Conway's Game of Life", icon: 'grid', sub: 'Cellular automaton simulation', stack: 'Python, Pygame', video: 'life', repoName: repoName(REPOS.life), live: '', play: true,
    bullets: ['Live cell with fewer than 2 live neighbours dies (underpopulation).', 'Live cell with 2 or 3 live neighbours lives on; more than 3 dies.', 'Dead cell with exactly 3 live neighbours becomes alive.'] },
}
