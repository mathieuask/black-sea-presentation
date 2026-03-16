export default function S15_Cyber({ isDark }) {
  const attacks = [
    { name: 'Maersk', cost: '$300M', label: 'All 150 domain\ncontrollers destroyed', color: 'var(--red)' },
    { name: 'FedEx', cost: '$400M', label: 'TNT Express\nparalyzed', color: 'var(--red)' },
    { name: 'Merck', cost: '$870M', label: 'Production halted\nglobally', color: 'var(--red)' },
  ]
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto', marginLeft: '60px', background: 'rgba(8,8,10,0.65)', borderRadius: '16px', backdropFilter: 'blur(12px)', padding: '48px' }}>
      <div className="tag mono fade-element" style={{ borderColor: 'var(--accent)', color: 'var(--accent)' }}>Risk 10 // Cyber Threats</div>
      <h2 className="fade-element">NotPetya: $10 billion<br/>in 45 minutes</h2>
      <div className="accent-line fade-element"></div>
      <p className="fade-element">Launched June 2017 through Ukrainian software M.E.Doc. The most destructive cyberattack in history.</p>
      <div className="stat-grid cols-3" style={{ marginTop: 24 }}>
        {attacks.map((a, i) => (
          <div key={i} className="stat-card card fade-element">
            <div style={{ fontFamily: "'Space Grotesk'", fontSize: '1.2em', color: 'var(--text)' }}>{a.name}</div>
            <div className="mono" style={{ color: a.color, fontSize: '1.2em', marginTop: 6, fontWeight: 600 }}>{a.cost}</div>
            <div className="stat-label">{a.label.split('\n').map((l, j) => <span key={j}>{l}<br/></span>)}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
