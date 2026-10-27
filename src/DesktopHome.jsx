import { useState } from 'react'
import { A, DesktopMedia, LiveMedia } from './parts.jsx'
import { LIVE, REPOS, RETAIL, MORE_PROJECTS } from './data.js'

const EXPERIMENTS = [
  { id: 'gaia', n: '01', title: 'GAIA Visualisation', text: "My first attempt at rendering a full Gaia subset — 307,818 rows in a single dataset — using sphere geometry with color mapping. Not very interactive, and performance suffered heavily at this scale; it was the first real signal of how far I'd need to optimize to make this workable. Basic OrbitControls for navigation, with an early attempt at raycasting for per-star selection that didn't end up working reliably. This experiment set the performance ceiling I had to design around for everything that came after." },
  { id: 'space', n: '02', title: 'Moving Through Space', text: "Built while developing Stella's alternate mode. Stars are placed at random positions, and adjusting the star count creates the illusion of stars streaming past — similar to a hyperspace effect — as stars phase in and out. The entire effect comes from randomizing star positions on each count change and letting the animation loop continue, with stars appearing and disappearing as the count shifts." },
  { id: 'twinkle', n: '03', title: 'Twinkling Stars', text: 'A byproduct of a rendering bug: the scene re-renders on every frame, causing stars to be erased and redrawn in a continuous loop. Technically a mistake, but the resulting flicker looked like genuine twinkling, so I kept it. Built on the same base as "Sunday," with this redraw behavior layered on top.' },
  { id: 'sunday', n: '04', title: 'Sunday', text: 'An early version with no true 3D geometry yet — stars are rendered as simple points rather than spheres, except for the currently selected star, which becomes a sphere that grows and shrinks to indicate selection. Includes OrbitControls and the same randomized movement logic that later made it into Stella.' },
  { id: 'tstar', n: '05', title: 'T-Star Close', text: "A focused test of sphere rendering using icosahedron geometry, which I liked enough to carry into Stella. Used here to test different color and lighting setups — specifically, textured icosahedrons with real-time lighting to see how I wanted individual stars to look up close. Stella doesn't use lighting on its stars for performance reasons at scale, so this test represents a visual quality I couldn't fully carry over into the full simulation" },
]

const SKILLS = {
  left: [
    { title: 'Backend Development', tag: 'SERVER SIDE', dark: true, divider: 'skill-divider.svg', items: [
      ['ampersand', 'Django'], ['brackets', 'DRF (Django REST Framework)'], ['chart-network', 'REST APIs'], ['diamond', 'ASP.NET MAUI Hybrid'], ['coffee', 'Java EE'] ] },
    { title: 'DevOps', tag: 'INFRASTRUCTURE', dark: true, divider: 'skill-divider.svg', items: [
      ['triangle', 'Vercel'], ['cuboid', 'Render'], ['circle-x', 'Docker'], ['settings', 'cPanel'], ['leaf', 'Celery'] ] },
  ],
  right: [
    { title: 'Frontend Development', tag: 'CLIENT SIDE', divider: 'skill-divider-2.svg', items: [
      ['atom', 'React'], ['circle-x', 'Three.js'], ['badge', 'JavaScript'], ['badge', 'TypeScript'], ['diamond', 'Figma'], ['bold', 'Bootstrap'] ] },
    { title: 'Data Layer', tag: 'DATABASES', divider: 'skill-divider-2.svg', items: [
      ['circle-x', 'PostgreSQL'], ['circle-x', 'MySQL'], ['feather', 'SQLite'], ['chart-column-stacked', 'Redis'] ] },
  ],
}

const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

function SkillCard({ card }) {
  return (
    <div className={`d-skill-card${card.dark ? ' d-skill-card--dark' : ''}`}>
      <div className="d-skill-card__head">
        <p className="d-skill-card__title">{card.title}</p>
        <p className="d-skill-card__tag">[ {card.tag} ]</p>
      </div>
      <div className="d-skill-list">
        {card.items.map(([icon, label], i) => (
          <div className="d-skill-item" key={label + i}>
            <div className="d-skill-row">
              <img src={A(`${icon}.svg`)} alt="" width="20" height="20" />
              <p>{label}</p>
            </div>
            {i < card.items.length - 1 && <img className="d-skill-divider" src={A(card.divider)} alt="" />}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function DesktopHome({ onNinety }) {
  const [thingsOpen, setThingsOpen] = useState(true)
  return (
    <div className="d-page">
      {/* NAV */}
      <header className="d-nav">
        <button className="d-nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>B.B.K</button>
        <nav className="d-nav__links">
          <button onClick={() => go('projects')}>Projects</button>
          <button onClick={() => go('contact')}>Contact Me</button>
          <button type="button" className="d-nav__pill" onClick={onNinety}>Go to the 90's →</button>
        </nav>
      </header>

      {/* HERO */}
      <section className="d-hero">
        <img className="d-hero__band" src={A('hero-band.png')} alt="" />
        <div className="d-hero__paper" />
        <p className="d-hero__bhoj">BHOJ</p>
        <p className="d-hero__khadka" aria-label="KHADKA"><span>KHA</span><span>DKA</span></p>
        <p className="d-hero__bahadur">Bahadur</p>
        <div className="d-hero__desc">
          <div className="line"><img src={A('line-hero.svg')} alt="" /></div>
          <p>Architecting interactive systems from database performance to high-fidelity frontend visualizations.</p>
        </div>
        <div className="d-hero__person">
          <img src={A('person-cutout.png')} alt="Bhoj Bahadur Khadka" />
          <div className="d-hero__roles">
            <p className="b">Web Developer &amp; Designer </p>
            <p className="dot">·</p>
            <p className="b">DJANGO / REACT</p>
          </div>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="d-statement">
        <div className="d-statement__grid">
          <div className="d-marker">
            <p className="d-marker__tag">[ MISSION STATEMENT ]</p>
            <p className="d-marker__title">VISUALIZING MATH</p>
          </div>
          <p className="d-statement__quote">
            I'm drawn to the visualization side taking data or abstract concepts and making them something you can actually see and interact with. The interesting constraint for me isn't usually the code, it's the Math underneath: how you map data to visual space, how you handle large datasets without destroying performance.
          </p>
        </div>
      </section>

      {/* PROJECTS (header / CMS / Life are sticky) */}
      <div className="d-projects" id="projects">
        <section className="d-projects__header">
          <div className="d-meta-row">
            <p className="blue">[ 01-04 ]</p>
            <p>SYSTEM DESIGN · CREATIVE DEVELOPMENT · PORTFOLIO</p>
          </div>
          <h2 className="d-projects__title">PROJECTS</h2>
          <div className="d-intro">
            <p className="d-intro__tag">[ INTRODUCTION &amp; PHILOSOPHY ]</p>
            <p>My focus is web development  mostly Django, React, DRF, Three.js but that sits inside a broader range: game dev projects, 3D work in Blender, some IoT experiments, and other stacks like Java EE and .NET MAUI when a project calls for them. Web development is where most of that overlaps , since it's usually the place where data, logic, and visual design all have to come together.</p>
            <p>This section will expand to cover more of that range over time. For now, here's the web-focused part of it.</p>
          </div>
        </section>

        <section className="d-stella">
          <div className="d-stella__title-block">
            <div className="d-stella__meta">
              <p className="d-stella__idx">01 / STELLA</p>
              <p className="d-stella__feat">[ FEATURED PLATFORM ]</p>
            </div>
            <p className="d-stella__name">[ Stella]</p>
            <p className="d-stella__sub">[3D navigable Galaxy with social media features]</p>
            <div className="d-stella__stack">
              <p className="b">TECHNOLOGY STACK:</p>
              <p className="m">Django, React, Three.js</p>
            </div>
          </div>
          <DesktopMedia id="stella" image="gaia.png" gridSrc="line-stella.svg" stella />
          <div className="d-arch">
            <p className="d-arch__title">[ SYSTEM ARCHITECTURE &amp; PERFORMANCE FEATURES ]</p>
            <ul>
              <li>Renders 10,000+ real stars from the Gaia EDR3 catalog in a fully navigable 3D field, built with React and Three.js. The simulation runs in two distinct modes: a galactic rotation curve model for large-scale structure, and a separate N-body gravity simulation (O(n²) pairwise force calculation with softening) for close-range dynamics — kept as separate systems rather than one shared model, since the two operate at completely different scales and force regimes.</li>
            </ul>
            <ul>
              <li>Beyond the simulation layer, Stella has a full social layer built on top: posts, comments, likes, bookmarks, personalized profiles, and AI-assisted interactions that respond to whichever star is currently selected.</li>
            </ul>
          </div>
          <div className="d-btnrow">
            {LIVE.stella && <a className="d-btn d-btn--solid" href={LIVE.stella} target="_blank" rel="noreferrer">[ LIVE DEMO ↗ ]</a>}
            <a className="d-btn" href={REPOS.stella} target="_blank" rel="noreferrer">[ VIEW ALGORITHM CODE ]</a>
          </div>
        </section>

        <section className="d-things">
          <div className="d-things__head">
            <div>
              <h2>THINGS MADE WHILE BUILDING STELLA</h2>
              <p>[ EXPERIMENTAL SUB-SYSTEMS &amp; INTERACTIVE MATH DEMOS ]</p>
            </div>
            <button type="button" className="d-toggle" aria-expanded={thingsOpen} aria-controls="d-things-grid" onClick={() => setThingsOpen((v) => !v)}>
              {thingsOpen ? '[ − MINIMIZE ]' : '[ + EXPAND ]'}
            </button>
          </div>
          <div id="d-things-grid" className={`d-collapse${thingsOpen ? ' is-open' : ''}`}><div className="d-collapse__inner">
          <div className="d-things__grid">
            {EXPERIMENTS.map((e, i) => (
              <article className={`d-exp${i % 2 ? ' d-exp--flip' : ''}`} key={e.n}>
                <DesktopMedia id={e.id} />
                <div className="d-exp__text">
                  <p className="d-exp__n">[ EXP. {e.n} ]</p>
                  <h3>[ {e.title} ]</h3>
                  <p className="d-exp__p">{e.text}</p>
                </div>
              </article>
            ))}
          </div>
          </div></div>
        </section>

        <section className="d-proj d-proj--cms">
          <div className="d-proj__meta">
            <p className="idx">02 / CMS</p>
            <p className="tag">[ ENTERACTIVE DATA PLATFORM ]</p>
          </div>
          <div className="d-proj__content">
            <DesktopMedia id="cms" />
            <div className="d-proj__text">
              <div>
                <h3>[ Content Management System ]</h3>
                <p className="stack">[ Tech Stack:  Django, HTML , CSS , JS, PostgreSQL ]</p>
              </div>
              <p className="d-proj__p">Built a Django-based e-learning platform with student and teacher portals, authentication, course management, and subscription/payment flow with esewa along with role-based access, templates, and database-backed content handling.</p>
              <a className="d-btn" href="https://github.com/HeadlesssS/CMS-Course-Management-System-" target="_blank" rel="noreferrer">Github</a>
            </div>
          </div>
        </section>

        <section className="d-proj d-proj--life">
          <div className="d-proj__meta">
            <p className="idx">03 / CONWAY'S LIFE</p>
            <p className="tag">[ ALGORITHMIC MATHEMATICAL SIMULATION ]</p>
          </div>
          <div className="d-proj__content">
            <DesktopMedia id="life" />
            <div className="d-proj__text">
              <div>
                <h3>[ Conway's Game of Life ]</h3>
                <p className="stack">[ Tech Stack: Python, Pygame ]</p>
              </div>
              <div className="d-proj__p">
                <p>The Game of Life, also known as Conway's Game of Life or simply Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970. It is a zero-player game, meaning that its evolution is determined by its initial state, requiring no further input. One interacts with the Game of Life by creating an initial configuration and observing how it evolves.<br />At each step in time of the game, the following transitions occur:</p>
                <ul>
                  <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
                  <li>Any live cell with two or three live neighbours lives on. More than three dies, as if by overpopulation.</li>
                  <li>Any dead cell with exactly three live neighbours becomes alive, as if by reproduction.</li>
                </ul>
                <a className="wiki" href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life" target="_blank" rel="noreferrer">Wiki</a>
              </div>
              <a className="d-btn" href="https://github.com/HeadlesssS/Game-Of-Life" target="_blank" rel="noreferrer">[ VIEW ALGORITHM CODE ]</a>
            </div>
          </div>
        </section>

        <section className="d-proj d-proj--retail">
          <div className="d-proj__meta">
            <p className="idx">04 / 3D RETAIL</p>
            <p className="tag">[ {RETAIL.tag} ]</p>
          </div>
          <div className="d-proj__content">
            <LiveMedia href={LIVE.retail} />
            <div className="d-proj__text">
              <div>
                <h3>[ {RETAIL.title} ]</h3>
                <p className="stack">[ Tech Stack: {RETAIL.stack} ]</p>
              </div>
              <p className="d-proj__p">{RETAIL.text}</p>
              <div className="d-btnrow">
                <a className="d-btn d-btn--solid" href={LIVE.retail} target="_blank" rel="noreferrer">[ LIVE DEMO ↗ ]</a>
              </div>
            </div>
          </div>
        </section>

        <section className="d-more">
          <div className="d-things__head">
            <div>
              <h2>MORE PROJECTS</h2>
              <p>[ OTHER THINGS I HAVE BUILT ]</p>
            </div>
          </div>
          <div className="d-more__grid">
            {MORE_PROJECTS.map((m) => (
              <article className="d-card" key={m.title}>
                <h3>{m.title}</h3>
                <p className="stack">{m.stack}</p>
                <p className="p">{m.text}</p>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* SKILLS */}
      <section className="d-skills">
        <div className="d-skills__head">
          <h2>SKILLS</h2>
          <p>[ TECHNICAL CAPABILITIES ]</p>
        </div>
        <div className="d-skills__grid">
          <div className="d-skills__col">{SKILLS.left.map((c) => <SkillCard card={c} key={c.title} />)}</div>
          <div className="d-skills__col">{SKILLS.right.map((c) => <SkillCard card={c} key={c.title} />)}</div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="d-contact" id="contact">
        <div className="d-contact__title">
          <p className="l1">LET'S MAKE</p>
          <div className="l2">
            <p className="blue">SOMETHING</p>
            <p className="script">together</p>
          </div>
        </div>
        <div className="d-contact__footer">
          <a href="https://github.com/HeadlesssS" target="_blank" rel="noreferrer">github.com/HeadlesssS</a>
          <a href="mailto:aaryanarju@gmail.com">aaryanarju@gmail.com</a>
          <a href="tel:+9779746205336">+977 9746205336</a>
        </div>
      </section>
    </div>
  )
}
