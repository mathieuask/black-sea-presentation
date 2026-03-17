import { useCallback, useRef } from 'react'

const ACTORS = [
  {
    flag: '\u{1F1F7}\u{1F1FA}', name: 'Russia', color: 'var(--red)',
    lat: 56, lng: 40, zoom: 2.2,
    desc: 'Neo-imperial ambitions. Fleet relocated to Novorossiysk. TurkStream as leverage.',
  },
  {
    flag: '\u{1F1FA}\u{1F1F8}', name: 'NATO', color: 'var(--accent)',
    lat: 50, lng: 20, zoom: 1.6,
    desc: '8 battlegroups on eastern flank. Trilateral Mine Task Force. US base expansion in Romania.',
  },
  {
    flag: '\u{1F1EA}\u{1F1FA}', name: 'EU', color: 'var(--teal)',
    lat: 48, lng: 15, zoom: 1.6,
    desc: 'First Black Sea Strategy (May 2025). 19 sanctions packages. \u20AC210B frozen assets.',
  },
  {
    flag: '\u{1F1F9}\u{1F1F7}', name: 'Turkey', color: 'var(--amber)',
    lat: 39, lng: 32, zoom: 2.5,
    desc: 'Montreux gatekeeper. Balancing Russia & NATO. 40\u2009% gas dependency. Energy hub ambitions.',
  },
  {
    flag: '\u{1F1E8}\u{1F1F3}', name: 'China', color: 'var(--green)',
    lat: 35, lng: 105, zoom: 1.4,
    desc: '$600M Anaklia port in Georgia. Middle Corridor access. Belt & Road footprint.',
  },
]

// Default globe position for this slide
const DEFAULT = { lat: 43, lng: 35, zoom: 2.0 }

export default function S08_Actors({ isDark, globeRef }) {
  const resetTimer = useRef(null)

  const handleEnter = useCallback((actor) => {
    clearTimeout(resetTimer.current)
    if (globeRef?.current?.pointOfView) {
      globeRef.current.pointOfView({ lat: actor.lat, lng: actor.lng, zoom: actor.zoom })
    }
  }, [globeRef])

  const handleLeave = useCallback(() => {
    clearTimeout(resetTimer.current)
    resetTimer.current = setTimeout(() => {
      if (globeRef?.current?.pointOfView) {
        globeRef.current.pointOfView(DEFAULT)
      }
    }, 400)
  }, [globeRef])

  return (
    <div style={{ maxWidth: '780px', marginRight: 'auto' }}>
      <div className="tag mono fade-element">Key Players</div>
      <h2 className="fade-element">Competing interests</h2>
      <div className="accent-line fade-element"></div>
      <div className="actors-grid">
        {ACTORS.map((a, i) => (
          <div
            key={i}
            className="actor-card card fade-element"
            onMouseEnter={() => handleEnter(a)}
            onMouseLeave={handleLeave}
            style={{ cursor: 'pointer' }}
          >
            <div className="actor-icon" style={{ fontSize: '2em' }}>{a.flag}</div>
            <div className="actor-name">{a.name}</div>
            <div className="actor-desc">{a.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
