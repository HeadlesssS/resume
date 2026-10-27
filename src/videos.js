// Demo videos live in /public (same files as before). Edit paths here if you rename them.
// Arrays show a small tab switcher (T-Star Close has three colour variants).
// Accepts direct files (.mp4/.webm) or YouTube links.
export const PLACEHOLDER = 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4'

export const VIDEOS = {
  stella: '/stella.mp4',
  gaia: '/gaia.mp4',
  space: '/move.mp4',
  twinkle: '/blink.mp4',
  sunday: '/sunday.mp4',
  tstar: ['/tstarcloseblue.mp4', '/tstarclosered.mp4', '/tstarcloseorange.mp4'],
  cms: '/SAMD.mp4',
  life: '/GOL.mp4',
}

export const getVideos = (id) => {
  const v = VIDEOS[id]
  const list = (Array.isArray(v) ? v : [v]).filter(Boolean)
  return list.length ? list : [PLACEHOLDER]
}
