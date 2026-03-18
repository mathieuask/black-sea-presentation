export default function S14_Food({ isDark }) {
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto' }}>
      <div className="tag mono fade-element" style={{ borderColor: 'var(--amber)', color: 'var(--amber)' }}>Risk 02 // Food Security</div>
      <h2 className="fade-element">The grain blockade</h2>
      <div className="accent-line fade-element" style={{ background: 'linear-gradient(90deg, var(--amber), var(--red))' }}></div>
      <ul className="fade-element" style={{
        listStyle: 'none', padding: 0, margin: '24px 0 0', display: 'flex',
        flexDirection: 'column', gap: 16, fontFamily: 'var(--font-body)', fontSize: '1.05em',
        lineHeight: 1.7, color: 'var(--text)'
      }}>
        <li style={{ paddingLeft: 8 }}>
          Russia and Ukraine supply <strong>34% of global wheat exports</strong>. The 2022 blockade trapped 25M tonnes in Ukrainian ports
        </li>
        <li style={{ paddingLeft: 8 }}>
          Wheat prices surged <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral, #E8715A)' }}>+58%</strong> in March 2022; FAO Food Price Index hit its all-time high
        </li>
        <li style={{ paddingLeft: 8 }}>
          <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--coral, #E8715A)' }}>47 million people</strong> pushed into severe hunger across Africa and the Middle East
        </li>
        <li style={{ paddingLeft: 8 }}>
          Ukraine's unilateral corridor has since shipped <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--sage, #5DAE7C)' }}>90M+ tonnes</strong> to <strong style={{ fontFamily: 'var(--font-mono)' }}>55 countries</strong>
        </li>
        <li style={{ paddingLeft: 8 }}>
          Russian strikes continue to cut monthly shipments by up to <strong style={{ fontFamily: 'var(--font-mono)' }}>30%</strong> as of 2025
        </li>
      </ul>
    </div>
  )
}
