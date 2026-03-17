export default function S08_ActorChina({ isDark }) {
  return (
    <div style={{ maxWidth: '500px', marginRight: 'auto' }}>
      <div className="tag mono fade-element">Key Players — 5/5</div>
      <h2 className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: '0.8em' }}>{'\u{1F1E8}\u{1F1F3}'}</span> China
      </h2>
      <div className="accent-line fade-element"></div>
      <div className="fade-element" style={{ marginTop: 20 }}>
        <p style={{ fontSize: '1.05em', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          Growing footprint in the Black Sea region through the <strong style={{ color: 'var(--text)' }}>Belt & Road Initiative</strong> and
          the Middle Corridor trade route.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          <div className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--green)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)' }}>$600M Anaklia deep-water port in Georgia</span>
          </div>
          <div className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--green)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)' }}>Middle Corridor bypassing Russia</span>
          </div>
          <div className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--green)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)' }}>Strategic port investments across the region</span>
          </div>
        </div>
      </div>
    </div>
  )
}
