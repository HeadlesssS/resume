import { useState } from 'react'
import { A, MobileMedia, MobileLive } from './parts.jsx'
import { LIVE, REPOS, RETAIL, MORE_PROJECTS } from './data.js'

const EXPERIMENTS = [
  { id: 'gaia', n: '01', title: 'GAIA Visualisation', text: 'My first attempt at rendering a full Gaia subset — 307,818 rows in a single dataset — using sphere geometry with color mapping. Performance suffered heavily at this scale; it set the performance ceiling for everything that came after.' },
  { id: 'space', n: '02', title: 'Moving Through Space', text: "Built while developing Stella's alternate mode. Randomized star positions and a shifting star count create the illusion of streaming through space." },
  { id: 'twinkle', n: '03', title: 'Twinkling Stars', text: 'A rendering bug erased and redrew stars every frame. The resulting flicker looked like genuine twinkling, so I kept it.' },
  { id: 'sunday', n: '04', title: 'Sunday', text: 'An early version with stars rendered as simple points, except for the selected star. Includes OrbitControls and randomized movement logic.' },
  { id: 'tstar', n: '05', title: 'T-Star Close', text: 'A focused test of textured icosahedron geometry, color and real-time lighting for individual stars viewed up close.' },
]

const SKILLS = [
  ['Backend Development', 'SERVER SIDE', 'Django · DRF (Django REST Framework) · REST APIs · ASP.NET MAUI Hybrid · Java EE'],
  ['Frontend Development', 'CLIENT SIDE', 'React · Three.js · JavaScript · TypeScript · Figma · Bootstrap'],
  ['DevOps', 'INFRASTRUCTURE', 'Vercel · Render · Docker · cPanel · Celery'],
  ['Data Layer', 'DATABASES', 'PostgreSQL · MySQL · SQLite · Redis'],
]

function SimpleProject({ id, idx, title, stack, text }) {
  return (
    <section className="m-project">
      <p className="m-project__idx">{idx}</p>
      <MobileMedia id={id} variant="dark" />
      <h3>{title}</h3>
      <p className="m-project__stack">{stack}</p>
      <p className="m-project__p">{text}</p>
    </section>
  )
}

export default function MobileHome({ onNinety }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="m-page">
      <header className="m-nav">
        <button className="m-nav__logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>B.B.K</button>
        <button type="button" className="m-nav__pill" onClick={onNinety}>90's →</button>
      </header>

      {/* HERO */}
      <section className="m-hero">
        <div className="m-hero__comp">
          <img className="m-hero__mountain" src={A('mountain.png')} alt="" />
          <img className="m-hero__person" src={A('person-m.png')} alt="Bhoj Bahadur Khadka" />
          <p className="m-hero__bhoj">BHOJ</p>
          <p className="m-hero__bahadur">Bahadur</p>
          <p className="m-hero__khadka" aria-label="KHADKA"><span>KHA</span><span>DKA</span></p>
        </div>
        <div className="m-hero__details">
          <p className="m-hero__roles">Web Developer &amp; Designer · DJANGO / REACT</p>
          <img className="m-hero__divider" src={A('m-divider.svg')} alt="" />
          <p className="m-hero__desc">Architecting interactive systems from database performance to high-fidelity frontend visualizations.</p>
        </div>
      </section>

      {/* STATEMENT */}
      <section className="m-statement">
        <div className="m-marker">
          <p className="tag">[ MISSION STATEMENT ]</p>
          <p className="title">VISUALIZING MATH</p>
        </div>
        <p className="m-statement__quote">I'm drawn to the visualization side taking data or abstract concepts and making them something you can actually see and interact with. The interesting constraint for me isn't usually the code, it's the Math underneath: how you map data to visual space, how you handle large datasets without destroying performance.</p>
      </section>

      {/* PROJECTS (header / Stella / things / CMS / Life stack with sticky) */}
      <div className="m-projects">
        <section className="m-projects__header">
          <p className="tag">[ 01-04 ] · SYSTEM DESIGN · CREATIVE DEVELOPMENT</p>
          <h2>PROJECTS</h2>
          <div className="m-intro">
            <p className="tag">[ INTRODUCTION &amp; PHILOSOPHY ]</p>
            <p>My focus is web development mostly Django, React, DRF, Three.js — where data, logic, and visual design all have to come together.</p>
          </div>
        </section>

        <section className="m-stella">
          <p className="idx">01 / STELLA</p>
          <p className="tag">[ FEATURED PLATFORM ]</p>
          <p className="name">[ Stella ]</p>
          <p className="sub">[3D navigable Galaxy with social media features]</p>
          <p className="stack">TECHNOLOGY STACK: Django, React, Three.js</p>
          <MobileMedia id="stella" image="stella-demo-m.png" variant="light" />
          <div className="m-arch">
            <p className="m-arch__title">[ SYSTEM ARCHITECTURE &amp; PERFORMANCE FEATURES ]</p>
            <p className="m-arch__p">Renders 10,000+ Gaia EDR3 stars in a navigable 3D field with separate galactic rotation and N-body gravity modes, plus posts, comments, likes, bookmarks and AI-assisted interactions.</p>
          </div>
          <div className="m-btnrow">
            {LIVE.stella && <a className="m-btn m-btn--solid" href={LIVE.stella} target="_blank" rel="noreferrer">LIVE DEMO ↗</a>}
            <a className="m-btn" href={REPOS.stella} target="_blank" rel="noreferrer">VIEW CODE</a>
          </div>
        </section>

        <section className="m-things">
          <h2>THINGS MADE WHILE BUILDING STELLA</h2>
          <p className="tag">[ EXPERIMENTAL SUB-SYSTEMS &amp; INTERACTIVE MATH DEMOS ]</p>
          <button
            type="button"
            className="m-toggle"
            aria-expanded={open}
            aria-controls="m-experiments"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="label">{open ? 'Read less about the development' : 'Read more about the development'}</span>
            <span className="sign">{open ? '−' : '+'}</span>
          </button>
          <div id="m-experiments" className={`m-exps${open ? ' is-open' : ''}`}>
            <div className="m-exps__inner">
              <div className="m-exps__list">
                {EXPERIMENTS.map((e) => (
                  <article className="m-exp" key={e.n}>
                    <MobileMedia id={e.id} image="stella-demo-m.png" variant="light" />
                    <div className="m-exp__details">
                      <p className="n">[ EXP. {e.n} ]</p>
                      <h3>[ {e.title} ]</h3>
                      <p className="p">{e.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <div className="m-sticky m-sticky--cms">
          <SimpleProject
            id="cms"
            idx="02 / CMS"
            title="[ Content Management System ]"
            stack="[ Tech Stack: Django, HTML, CSS, JS, PostgreSQL ]"
            text="A Django-based e-learning platform with student and teacher portals, authentication, course management, subscriptions, payments and role-based access."
          />
        </div>
        <div className="m-sticky m-sticky--life">
          <SimpleProject
            id="life"
            idx="03 / CONWAY'S LIFE"
            title="[ Conway's Game of Life ]"
            stack="[ Tech Stack: Python, Pygame ]"
            text="A zero-player cellular automaton whose evolution is determined by its initial state, demonstrating underpopulation, survival, overpopulation and reproduction."
          />
        </div>
        <div className="m-sticky m-sticky--retail">
          <section className="m-project">
            <p className="m-project__idx">04 / 3D RETAIL</p>
            <MobileLive href={LIVE.retail} />
            <h3>[ {RETAIL.title} ]</h3>
            <p className="m-project__stack">[ Tech Stack: {RETAIL.stack} ]</p>
            <p className="m-project__p">{RETAIL.text}</p>
            <div className="m-btnrow">
              <a className="m-btn m-btn--solid" href={LIVE.retail} target="_blank" rel="noreferrer">LIVE DEMO ↗</a>
            </div>
          </section>
        </div>

        <section className="m-more">
          <h2>MORE PROJECTS</h2>
          <p className="tag">[ OTHER THINGS I HAVE BUILT ]</p>
          {MORE_PROJECTS.map((m) => (
            <article className="m-card" key={m.title}>
              <h3>{m.title}</h3>
              <p className="stack">{m.stack}</p>
              <p className="p">{m.text}</p>
            </article>
          ))}
        </section>
      </div>

      {/* SKILLS */}
      <section className="m-skills">
        <h2>SKILLS</h2>
        <p className="tag">[ TECHNICAL CAPABILITIES ]</p>
        {SKILLS.map(([title, tag, list]) => (
          <div className="m-skill" key={title}>
            <p className="m-skill__title">{title}</p>
            <p className="tag">[ {tag} ]</p>
            <p className="m-skill__list">{list}</p>
          </div>
        ))}
      </section>

      {/* CONTACT */}
      <section className="m-contact">
        <div className="m-contact__title">
          <p className="l1">LET'S MAKE</p>
          <p className="l2">SOMETHING</p>
          <p className="l3">together</p>
        </div>
        <div className="m-contact__links">
          <a href="https://github.com/HeadlesssS" target="_blank" rel="noreferrer">github.com/HeadlesssS</a>
          <a href="mailto:aaryanarju@gmail.com">aaryanarju@gmail.com</a>
          <a href="tel:+9779746205336">+977 9746205336</a>
        </div>
      </section>
    </div>
  )
}
