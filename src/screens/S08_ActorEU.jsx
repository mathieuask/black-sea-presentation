export default function S08_ActorEU({ isDark }) {
  return (
    <div style={{ maxWidth: '500px', marginRight: 'auto' }}>
      <div className="tag mono fade-element">Key Players — 3/5</div>
      <h2 className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: '0.8em' }}>{'\u{1F1EA}\u{1F1FA}'}</span> European Union
      </h2>
      <div className="accent-line fade-element"></div>
      <div className="fade-element" style={{ marginTop: 20 }}>
        <p style={{ fontSize: '1.05em', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          Launched its first <strong style={{ color: 'var(--text)' }}>Black Sea Strategy</strong> in May 2025.
          Unprecedented sanctions regime against Russia.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          <div className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--teal)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)' }}>19 sanctions packages adopted</span>
          </div>
          <div className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--teal)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)' }}>{'\u20AC'}210B in frozen Russian assets</span>
          </div>
          <div className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--teal)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)' }}>Energy diversification away from Russian gas</span>
          </div>
        </div>
      </div>
    </div>
  )
}
