export default function S08_ActorTurkey({ isDark }) {
  return (
    <div style={{ maxWidth: '500px', marginRight: 'auto' }}>
      <div className="tag mono fade-element">Key Players — 4/5</div>
      <h2 className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: '0.8em' }}>{'\u{1F1F9}\u{1F1F7}'}</span> Turkey
      </h2>
      <div className="accent-line fade-element"></div>
      <p className="fade-element" style={{
        marginTop: 16, fontSize: '1.15em', lineHeight: 1.6,
        fontFamily: 'var(--font-heading)', fontStyle: 'italic',
        color: 'var(--text-secondary)',
      }}>
        Six nations. One sea. One chokepoint.
      </p>
      <div className="fade-element" style={{ marginTop: 16 }}>
        <p style={{ fontSize: '1.05em', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          The only exit runs through the <strong style={{ color: 'var(--text)' }}>Bosphorus Strait</strong>, governed by
          the <strong style={{ color: 'var(--amber)' }}>Montreux Convention (1936)</strong>, giving Turkey sole discretion over warship transit.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          <div className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--amber)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)' }}>Feb 27, 2022: Turkey invoked Montreux's wartime provisions — first time since WWII</span>
          </div>
          <div className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--amber)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)' }}>Froze the military balance in the Black Sea entirely</span>
          </div>
          <div className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--amber)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)' }}>TurkStream: Europe's sole Russian gas pipeline — operating at 98% capacity</span>
          </div>
        </div>
      </div>
    </div>
  )
}
