export default function S25_Conclusion({ isDark }) {
  const items = [
    { title: 'Energy fragility', color: 'var(--red)', desc: "TurkStream at 98% \u2014 a single point of failure. If sabotaged, Europe loses its last Russian pipeline at dangerously low storage levels." },
    { title: "China's entry", color: 'var(--amber)', desc: "Anaklia port signals the Black Sea's integration into US-China rivalry via Belt & Road's Middle Corridor. Beyond the NATO-Russia binary." },
    { title: 'Expropriation precedent', color: 'var(--accent)', desc: '$167B in losses \u2014 seizures at presidential discretion without legal criteria. This has permanently altered FDI risk calculus globally.' },
  ]
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto' }}>
      <div className="tag mono" style={{ borderColor: 'var(--red)', color: 'var(--red)' }}>Conclusion</div>
      <h2>Compounding risk,<br/>not a single threat</h2>
      <div className="accent-line" style={{ background: 'linear-gradient(90deg, var(--red), var(--amber))' }}></div>
      <div className="conclusion-grid">
        {items.map((item, i) => (
          <div key={i} className="card fade-element" style={{ borderTop: `3px solid ${item.color}` }}>
            <div style={{ fontFamily: "'Space Grotesk'", fontSize: '1.05em', marginBottom: 10 }}>{item.title}</div>
            <p style={{ fontSize: '0.8em', maxWidth: '100%' }}>{item.desc}</p>
          </div>
        ))}
      </div>
      <p className="fade-element" style={{ marginTop: 28, color: 'var(--text)', fontWeight: 500, fontSize: '0.95em' }}>
        In a world of compounding geopolitical risk, <em>optionality</em> is the most valuable corporate asset.
      </p>
    </div>
  )
}
