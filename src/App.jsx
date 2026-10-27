import { useCallback, useEffect, useState } from 'react'
import DesktopHome from './DesktopHome.jsx'
import MobileHome from './MobileHome.jsx'
import NinetiesHome from './NinetiesHome.jsx'

const QUERY = '(max-width: 768px)'

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.matchMedia(QUERY).matches)
  useEffect(() => {
    const mq = window.matchMedia(QUERY)
    const onChange = (e) => setMobile(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return mobile
}

export default function App() {
  const mobile = useIsMobile()
  // ?mode=90s opens the 90's mode directly
  const [mode, setMode] = useState(() =>
    new URLSearchParams(window.location.search).get('mode') === '90s' ? '90s' : 'recruiter'
  )

  const toggle = useCallback(() => {
    setMode((m) => (m === '90s' ? 'recruiter' : '90s'))
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    document.body.dataset.mode = mode
    document.title =
      mode === '90s'
        ? 'BBK-95'
        : 'Bhoj Bahadur Khadka — Web Developer & Designer'
  }, [mode])

  if (mode === '90s') return <NinetiesHome onExit={toggle} />
  return mobile ? <MobileHome onNinety={toggle} /> : <DesktopHome onNinety={toggle} />
}
