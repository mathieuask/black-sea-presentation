export default function S13_Energy({ isDark }) {
  return (
    <div style={{ maxWidth: '520px', marginRight: 'auto' }}>
      <div className="tag mono fade-element" style={{ borderColor: 'var(--amber)', color: 'var(--amber)' }}>Risk 07 // Energy Weapon</div>
      <h2 className="fade-element">TurkStream:<br/>single point of failure</h2>
      <div className="accent-line fade-element" style={{ background: 'linear-gradient(90deg, var(--amber), var(--red))' }}></div>

      <p className="fade-element" style={{ fontSize: '1.05em', lineHeight: 1.7, color: 'var(--text-secondary)', marginTop: 16 }}>
        Europe&apos;s sole remaining Russian gas pipeline after Ukraine transit ended Dec 31, 2024.
      </p>

      {/* Key stats card */}
      <div className="fade-element" style={{
        background: 'var(--card-bg)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12,
        padding: '20px 24px',
        marginTop: 24,
        display: 'flex',
        gap: 32
      }}>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2em', fontWeight: 700, color: 'var(--amber)', lineHeight: 1 }}>31.5</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85em', marginTop: 4 }}>bcm/year capacity</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2em', fontWeight: 700, color: 'var(--red)', lineHeight: 1 }}>98%</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85em', marginTop: 4 }}>utilization rate</div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '2em', fontWeight: 700, color: 'var(--red)', lineHeight: 1 }}>8</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.85em', marginTop: 4 }}>EU states dependent</div>
        </div>
      </div>

      {/* Threat details */}
      <div className="fade-element" style={{
        background: 'var(--card-bg)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12,
        padding: '20px 24px',
        marginTop: 16
      }}>
        <div style={{ fontSize: '0.85em', fontFamily: 'var(--font-mono)', color: 'var(--red)', fontWeight: 600, marginBottom: 12 }}>ACTIVE THREATS</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--red)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.95em', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--text)' }}>March 2026:</strong> 12 drone attacks in two weeks on compressor stations
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--amber)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.95em', lineHeight: 1.6 }}>
              If disrupted, gas prices could spike <strong style={{ color: 'var(--red)' }}>30-50%</strong> within days
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ color: 'var(--amber)', fontSize: '1.2em' }}>&#9679;</span>
            <span style={{ color: 'var(--text-secondary)', fontSize: '0.95em', lineHeight: 1.6 }}>
              EU gas storage at <strong style={{ color: 'var(--red)' }}>24%</strong> vs. 41% seasonal average
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
