export default function S08_Actors({ isDark }) {
  const actors = [
    { icon: '\u2694', name: 'Russia', desc: 'Neo-imperial ambitions. Fleet relocated to Novorossiysk. TurkStream as leverage.', color: 'var(--red)' },
    { icon: '\u2616', name: 'NATO', desc: '8 battlegroups on eastern flank. Trilateral Mine Task Force. US base expansion in Romania.', color: 'var(--accent)' },
    { icon: '\u2691', name: 'EU', desc: 'First Black Sea Strategy (May 2025). 19 sanctions packages. \u20AC210B frozen assets.', color: 'var(--teal)' },
    { icon: '\u2696', name: 'Turkey', desc: 'Montreux gatekeeper. Balancing Russia & NATO. 40% gas dependency. Energy hub ambitions.', color: 'var(--amber)' },
    { icon: '\u2693', name: 'China', desc: '$600M Anaklia port in Georgia. Middle Corridor access. Belt & Road footprint.', color: 'var(--green)' },
  ]
  return (
    <div style={{ maxWidth: '780px', marginRight: 'auto' }}>
      <div className="tag mono fade-element">Key Players</div>
      <h2 className="fade-element">Competing interests</h2>
      <div className="accent-line fade-element"></div>
      <div className="actors-grid">
        {actors.map((a, i) => (
          <div key={i} className="actor-card card fade-element">
            <div className="actor-icon" style={{ color: a.color }}>{a.icon}</div>
            <div className="actor-name">{a.name}</div>
            <div className="actor-desc">{a.desc}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
