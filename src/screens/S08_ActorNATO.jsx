export default function S08_ActorNATO({ isDark }) {
  return (
    <div style={{ maxWidth: '500px', marginRight: 'auto' }}>
      <div className="tag mono fade-element">Key Players — 2/5</div>
      <h2 className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: '0.8em' }}>{'\u{1F1FA}\u{1F1F8}'}</span> NATO
      </h2>
      <div className="accent-line fade-element"></div>
      <div className="fade-element" style={{ marginTop: 20 }}>
        <p style={{ fontSize: '1.05em', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          Massive reinforcement of the eastern flank since 2022. <strong style={{ color: 'var(--text)' }}>8 battlegroups</strong> deployed
          from the Baltics to the Black Sea.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          <div className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--accent)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)' }}>Romania-Turkey-Bulgaria joint naval task force (Jan 2024)</span>
          </div>
          <div className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--accent)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)' }}>US military base expanding in Romania (multi-billion $)</span>
          </div>
          <div className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--accent)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)' }}>Finland & Sweden joining NATO strengthens eastern defense</span>
          </div>
        </div>
      </div>
    </div>
  )
}
