export default function S12_Expropriation({ isDark }) {
  const losses = [
    { company: 'BP', amount: '$25.5B', note: 'Rosneft stake write-down' },
    { company: 'TotalEnergies', amount: '$14.8B', note: 'Arctic LNG & Novatek' },
    { company: 'Shell', amount: '$5.0B', note: 'Sakhalin-2 seizure' },
    { company: 'ExxonMobil', amount: '$3.4B', note: 'Sakhalin-1 exit' },
    { company: 'Renault', amount: '\u20AC2.2B', note: 'AvtoVAZ nationalized' },
  ]
  return (
    <div style={{ maxWidth: '520px', marginRight: 'auto' }}>
      <div className="tag mono fade-element" style={{ borderColor: 'var(--red)', color: 'var(--red)' }}>Risk 04 // Expropriation</div>
      <h2 className="fade-element">The corporate exodus</h2>
      <div className="accent-line fade-element" style={{ background: 'linear-gradient(90deg, var(--red), var(--amber))' }}></div>

      <p className="fade-element" style={{ fontSize: '1.05em', lineHeight: 1.7, color: 'var(--text-secondary)', marginTop: 16 }}>
        Russia systematically seized foreign assets. No legal criteria, presidential discretion only.
      </p>

      {/* Key stat */}
      <div className="fade-element" style={{
        background: 'var(--card-bg)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12,
        padding: '20px 24px',
        marginTop: 24,
        display: 'flex',
        alignItems: 'baseline',
        gap: 16
      }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '2.2em', fontWeight: 700, color: 'var(--red)', lineHeight: 1 }}>$50.9B</span>
        <span style={{ color: 'var(--text-secondary)', fontSize: '0.95em' }}>total Western corporate losses</span>
      </div>

      {/* Company list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 20 }}>
        {losses.map((l, i) => (
          <div key={i} className="fade-element" style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: '1.1em', fontWeight: 600, color: 'var(--amber)', minWidth: 72, textAlign: 'right' }}>{l.amount}</span>
            <span style={{ color: 'var(--text)', fontWeight: 600 }}>{l.company}</span>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.85em' }}>- {l.note}</span>
          </div>
        ))}
      </div>

      {/* 2024-2025 escalation */}
      <div className="fade-element" style={{
        background: 'var(--card-bg)',
        border: '1px solid rgba(255,255,255,0.06)',
        borderRadius: 12,
        padding: '16px 24px',
        marginTop: 20
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ color: 'var(--red)', fontSize: '1.2em' }}>&#9679;</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.95em', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text)' }}>2024:</strong> 157 companies worth 1.1T roubles nationalized
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 8 }}>
          <span style={{ color: 'var(--red)', fontSize: '1.2em' }}>&#9679;</span>
          <span style={{ color: 'var(--text-secondary)', fontSize: '0.95em', lineHeight: 1.6 }}>
            <strong style={{ color: 'var(--text)' }}>Q1 2025:</strong> another 50 entities worth 800B roubles seized
          </span>
        </div>
      </div>
    </div>
  )
}
