export default function S08_ActorRussia({ isDark }) {
  return (
    <div style={{ maxWidth: '500px', marginRight: 'auto' }}>
      <div className="tag mono fade-element">Key Players, 1/5</div>
      <h2 className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
        <span style={{ fontSize: '0.8em' }}>{'\u{1F1F7}\u{1F1FA}'}</span> Russia
      </h2>
      <div className="accent-line fade-element"></div>
      <div className="fade-element" style={{ marginTop: 20 }}>
        <p style={{ fontSize: '1.05em', lineHeight: 1.7, color: 'var(--text-secondary)' }}>
          Neo-imperial ambitions in the Black Sea region. The Russian Navy fleet has been relocated to <strong style={{ color: 'var(--text)' }}>Novorossiysk</strong> after
          the loss of Sevastopol as a viable base.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 24 }}>
          <div className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--red)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)' }}>TurkStream pipeline as economic weapon</span>
          </div>
          <div className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--red)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)' }}>Grain blockade used as food weapon (2022-2023)</span>
          </div>
          <div className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--red)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)' }}>Control over Crimea & Sea of Azov for power projection</span>
          </div>
        </div>
      </div>
    </div>
  )
}
