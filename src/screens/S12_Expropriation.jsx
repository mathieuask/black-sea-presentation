export default function S12_Expropriation({ isDark }) {
  const bars = [
    { company: 'BP', width: '82%', text: '$25.5B write-down', style: {} },
    { company: 'TotalEnergies', width: '47%', text: '$14.8B loss', style: {} },
    { company: 'Shell', width: '16%', text: '$5.0B loss', style: { background: 'linear-gradient(to right, var(--amber), #fbbf24)' } },
    { company: 'ExxonMobil', width: '11%', text: '$3.4B loss', style: { background: 'linear-gradient(to right, var(--amber), #fbbf24)' } },
    { company: 'Renault', width: '15%', text: '\u20AC2.2B', style: { background: 'var(--text-muted)' } },
  ]
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto', marginLeft: '60px', background: 'rgba(8,8,10,0.65)', borderRadius: '16px', backdropFilter: 'blur(12px)', padding: '48px' }}>
      <div className="tag mono fade-element" style={{ borderColor: 'var(--red)', color: 'var(--red)' }}>Risk 04 // Expropriation</div>
      <h2 className="fade-element">The corporate exodus</h2>
      <div className="accent-line fade-element" style={{ background: 'linear-gradient(90deg, var(--red), var(--amber))' }}></div>
      <p className="fade-element" style={{ fontSize: '0.85em' }}>
        Russia systematically seized foreign assets. No legal criteria. Presidential discretion only.
      </p>
      <div style={{ marginTop: 24 }}>
        {bars.map((b, i) => (
          <div key={i} className="loss-bar-row fade-element">
            <span className="loss-company">{b.company}</span>
            <div className="loss-bar" style={{ width: b.width, ...b.style }}>{b.text}</div>
          </div>
        ))}
      </div>
      <p className="fade-element" style={{ marginTop: 16, fontSize: '0.8em', color: 'var(--red)' }}>
        In 2024: 157 companies worth 1.1 trillion roubles nationalized. Q1 2025: another 50 entities worth 800B roubles.
      </p>
    </div>
  )
}
