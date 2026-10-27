import { useEffect, useMemo, useState } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import 'github-markdown-css/github-markdown-light.css'

/* GitHub, drawn inside the desktop. Data comes from GitHub's public REST API, called straight
   from the visitor's browser (CORS is allowed), so there is no backend. */
const GH = 'HeadlesssS'

const LANG = {
  Python: '#3572A5', JavaScript: '#f1e05a', TypeScript: '#3178c6', HTML: '#e34c26', CSS: '#563d7c',
  Java: '#b07219', 'C#': '#178600', 'C++': '#f34b7d', C: '#555555', 'Jupyter Notebook': '#DA5B0B',
  Shell: '#89e051', Vue: '#41b883', Go: '#00ADD8', Rust: '#dea584', Kotlin: '#A97BFF', Dart: '#00B4AB',
}

async function ghFetch(path, raw) {
  const key = `gh:${raw ? 'raw:' : ''}${path}`
  try { const c = sessionStorage.getItem(key); if (c) return raw ? c : JSON.parse(c) } catch { /* no cache */ }
  const res = await fetch(`https://api.github.com${path}`, raw ? { headers: { Accept: 'application/vnd.github.raw+json' } } : undefined)
  if (!res.ok) throw new Error(String(res.status))
  const data = raw ? await res.text() : await res.json()
  try { sessionStorage.setItem(key, raw ? data : JSON.stringify(data)) } catch { /* quota */ }
  return data
}

/* markdown -> sanitized HTML, with relative images/links pointed at the repo */
function renderReadme(md, repo) {
  const clean = DOMPurify.sanitize(marked.parse(md))
  const doc = new DOMParser().parseFromString(clean, 'text/html')
  const raw = `https://raw.githubusercontent.com/${GH}/${repo}/HEAD/`
  const blob = `https://github.com/${GH}/${repo}/blob/HEAD/`
  doc.querySelectorAll('img').forEach((img) => {
    const s = img.getAttribute('src') || ''
    if (!/^(https?:|data:)/i.test(s)) img.setAttribute('src', raw + s.replace(/^\.?\//, ''))
  })
  doc.querySelectorAll('a').forEach((a) => {
    const h = a.getAttribute('href') || ''
    if (!h || h.startsWith('#')) return
    if (!/^(https?:|mailto:)/i.test(h)) a.setAttribute('href', blob + h.replace(/^\.?\//, ''))
    a.setAttribute('target', '_blank'); a.setAttribute('rel', 'noopener noreferrer')
  })
  return doc.body.innerHTML
}

const fmtDate = (iso) => {
  const d = new Date(iso)
  const sameYear = d.getFullYear() === new Date().getFullYear()
  return d.toLocaleDateString('en-US', sameYear ? { month: 'short', day: 'numeric' } : { month: 'short', day: 'numeric', year: 'numeric' })
}

const Mark = ({ size = 24 }) => (
  <svg viewBox="0 0 16 16" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M8 0c4.42 0 8 3.58 8 8a8.013 8.013 0 0 1-5.45 7.59c-.4.08-.55-.17-.55-.38 0-.27.01-1.13.01-2.2 0-.75-.25-1.23-.54-1.48 1.78-.2 3.65-.88 3.65-3.95 0-.88-.31-1.59-.82-2.15.08-.2.36-1.02-.08-2.12 0 0-.67-.22-2.2.82-.64-.18-1.32-.27-2-.27-.68 0-1.36.09-2 .27-1.53-1.03-2.2-.82-2.2-.82-.44 1.1-.16 1.92-.08 2.12-.51.56-.82 1.28-.82 2.15 0 3.06 1.86 3.75 3.64 3.95-.23.2-.44.55-.51 1.07-.46.21-1.61.55-2.33-.66-.15-.24-.6-.83-1.23-.82-.67.01-.27.38.01.53.34.19.73.9.82 1.13.16.45.68 1.31 2.69.94 0 .67.01 1.3.01 1.49 0 .21-.15.45-.55.38A7.995 7.995 0 0 1 0 8c0-4.42 3.58-8 8-8Z" />
  </svg>
)
const Star = () => <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M8 .25a.75.75 0 0 1 .673.418l1.882 3.815 4.21.612a.75.75 0 0 1 .416 1.279l-3.046 2.97.719 4.192a.751.751 0 0 1-1.088.791L8 12.347l-3.766 1.98a.75.75 0 0 1-1.088-.79l.72-4.194L.818 6.374a.75.75 0 0 1 .416-1.28l4.21-.611L7.327.668A.75.75 0 0 1 8 .25Z" /></svg>
const Fork = () => <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M5 5.372v.878c0 .414.336.75.75.75h4.5a.75.75 0 0 0 .75-.75v-.878a2.25 2.25 0 1 1 1.5 0v.878a2.25 2.25 0 0 1-2.25 2.25h-1.5v2.128a2.251 2.251 0 1 1-1.5 0V8.5h-1.5A2.25 2.25 0 0 1 3.5 6.25v-.878a2.25 2.25 0 1 1 1.5 0ZM5 3.25a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Zm6.75.75a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm-3 8.75a.75.75 0 1 0-1.5 0 .75.75 0 0 0 1.5 0Z" /></svg>
const Book = () => <svg viewBox="0 0 16 16" width="16" height="16" fill="currentColor" aria-hidden="true"><path d="M0 1.75A.75.75 0 0 1 .75 1h4.253c1.227 0 2.317.59 3 1.501A3.743 3.743 0 0 1 11.006 1h4.245a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-.75.75h-4.507a2.25 2.25 0 0 0-1.591.659l-.622.621a.75.75 0 0 1-1.06 0l-.622-.621A2.25 2.25 0 0 0 5.258 13H.75a.75.75 0 0 1-.75-.75Zm7.251 10.324.004-5.073-.002-2.253A2.25 2.25 0 0 0 5.003 2.5H1.5v9h3.757a3.75 3.75 0 0 1 1.994.574ZM8.755 4.75l-.004 7.322a3.752 3.752 0 0 1 1.992-.572H14.5v-9h-3.495a2.25 2.25 0 0 0-2.25 2.25Z" /></svg>

function Lang({ name }) {
  if (!name) return null
  return <span className="gh-meta"><i className="gh-dot" style={{ background: LANG[name] || '#8b949e' }} />{name}</span>
}

export default function GitHubApp({ repo, nonce }) {
  const [view, setView] = useState(repo || null)
  const [user, setUser] = useState(null)
  const [repos, setRepos] = useState(null)
  const [readme, setReadme] = useState(null)
  const [err, setErr] = useState('')

  useEffect(() => { setView(repo || null) }, [repo, nonce])

  useEffect(() => {
    let live = true
    Promise.all([ghFetch(`/users/${GH}`), ghFetch(`/users/${GH}/repos?sort=pushed&per_page=50`)])
      .then(([u, r]) => { if (live) { setUser(u); setRepos(r) } })
      .catch(() => { if (live) setErr('Could not reach GitHub (offline, or the hourly request limit was hit). Try again later.') })
    return () => { live = false }
  }, [])

  useEffect(() => {
    if (!view) return undefined
    let live = true
    setReadme(null)
    ghFetch(`/repos/${GH}/${view}/readme`, true)
      .then((t) => { if (live) setReadme(t) })
      .catch(() => { if (live) setReadme('') })
    return () => { live = false }
  }, [view])

  const html = useMemo(() => (readme ? renderReadme(readme, view) : ''), [readme, view])
  const meta = view && repos ? repos.find((r) => r.name === view) : null

  return (
    <div className="gh">
      <header className="gh-top">
        <Mark size={28} />
        <span className="gh-crumbs">
          <a href="#user" onClick={(e) => { e.preventDefault(); setView(null) }}>{GH}</a>
          {view && <> <span className="gh-sep">/</span> <b>{view}</b></>}
        </span>
      </header>

      {err && <div className="gh-flash">{err}</div>}

      {!view ? (
        <div className="gh-page">
          <aside className="gh-side">
            {user ? <img className="gh-avatar" src={user.avatar_url} alt="" /> : <div className="gh-avatar gh-avatar--empty" />}
            <h1 className="gh-name">{user?.name || GH}</h1>
            <p className="gh-login">{GH}</p>
            {user?.bio && <p className="gh-bio">{user.bio}</p>}
            {user && <p className="gh-small"><b>{user.followers}</b> followers · <b>{user.following}</b> following</p>}
            {user?.location && <p className="gh-small">{user.location}</p>}
            {user?.blog && <p className="gh-small">{user.blog}</p>}
          </aside>
          <section className="gh-main">
            <nav className="gh-tabs"><span className="on">Repositories {user && <i className="gh-count">{user.public_repos}</i>}</span></nav>
            {!repos && !err && <p className="gh-muted">Loading...</p>}
            <ul className="gh-repos">
              {(repos || []).map((r) => (
                <li key={r.id}>
                  <h3><a href={`#${r.name}`} onClick={(e) => { e.preventDefault(); setView(r.name) }}>{r.name}</a><span className="gh-badge">Public</span></h3>
                  {r.description && <p className="gh-desc">{r.description}</p>}
                  <p className="gh-metas">
                    <Lang name={r.language} />
                    {r.stargazers_count > 0 && <span className="gh-meta"><Star />{r.stargazers_count}</span>}
                    {r.forks_count > 0 && <span className="gh-meta"><Fork />{r.forks_count}</span>}
                    <span className="gh-meta">Updated on {fmtDate(r.pushed_at || r.updated_at)}</span>
                  </p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : (
        <div className="gh-repo">
          <h1 className="gh-title"><Book /> <a href="#user" onClick={(e) => { e.preventDefault(); setView(null) }}>{GH}</a> <span className="gh-sep">/</span> <b>{view}</b> <span className="gh-badge">Public</span></h1>
          {meta?.description && <p className="gh-desc gh-desc--lg">{meta.description}</p>}
          {meta && (
            <p className="gh-metas">
              <Lang name={meta.language} />
              <span className="gh-meta"><Star />{meta.stargazers_count} stars</span>
              <span className="gh-meta"><Fork />{meta.forks_count} forks</span>
            </p>
          )}
          <div className="gh-box">
            <div className="gh-box__head"><Book /> README</div>
            <div className="gh-box__body">
              {readme === null ? <p className="gh-muted">Loading...</p>
                : readme === '' ? <p className="gh-muted">This repository doesn't have a README, or GitHub could not be reached.</p>
                : <article className="markdown-body" dangerouslySetInnerHTML={{ __html: html }} />}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
