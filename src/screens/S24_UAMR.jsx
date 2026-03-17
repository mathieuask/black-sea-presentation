export default function S24_UAMR({ isDark }) {
  const steps = [
    { num: '01', title: 'Understand', color: 'var(--accent)', desc: 'Define risk appetite across all 10 GPR types. Map each country: Romania/Bulgaria = stable, Turkey = volatile, Ukraine = high risk.' },
    { num: '02', title: 'Analyse', color: 'var(--teal)', desc: 'Combine GPR Index, insurance data and TurkStream flows. Use scenario planning with think-tank intelligence.' },
    { num: '03', title: 'Mitigate', color: 'var(--amber)', desc: 'Diversify supply chains via Constanta/Danube alternatives. Obtain MIGA insurance. Build surge capacity for rerouting.' },
    { num: '04', title: 'Respond', color: 'var(--red)', desc: 'Plan for failure — activate crisis teams immediately. Capitalize on near misses. Train continuously.' },
  ]

  return (
    <div style={{ maxWidth: '500px', marginRight: 'auto' }}>
      <div className="tag mono fade-element">Risk Management</div>
      <h2 className="fade-element">Four steps to manage GPR</h2>
      <div className="accent-line fade-element"></div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginTop: 24 }}>
        {steps.map((s, i) => (
          <div key={i} className="fade-element" style={{
            display: 'flex', gap: 16, alignItems: 'flex-start',
          }}>
            <span style={{
              fontFamily: 'var(--font-mono)', fontSize: '1.4em', fontWeight: 700,
              color: s.color, lineHeight: 1, minWidth: 32,
            }}>{s.num}</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: '1.05em', color: 'var(--text)', marginBottom: 4 }}>{s.title}</div>
              <div style={{ fontSize: '0.85em', lineHeight: 1.6, color: 'var(--text-secondary)' }}>{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
      <p className="fade-element" style={{ marginTop: 24, fontSize: '0.85em', color: 'var(--text-secondary)' }}>
        BCG &amp; WEF (2026): fewer than <strong style={{ color: 'var(--text)' }}>1 in 5</strong> companies have a dedicated geopolitics department.
      </p>
    </div>
  )
}
