import GPRChart from '../components/GPRChart'

export default function S18_GPRChart({ isDark }) {
  return (
    <div style={{ maxWidth: '850px', marginRight: 'auto' }}>
      <div className="tag mono fade-element">Quantitative Analysis</div>
      <h2 className="fade-element">Geopolitical Risk Index</h2>
      <div className="accent-line fade-element"></div>
      <p className="fade-element" style={{ fontSize: '0.85em' }}>
        Peaked at <strong style={{ color: 'var(--red)' }}>167.3</strong> in March 2022 &mdash; the highest reading in 50 years. A shock of this magnitude reduces world GDP by ~1.7%.
      </p>
      <div className="chart-wrap fade-element" style={{
        minHeight: '420px',
        borderRadius: 16,
        padding: '16px 12px',
        background: isDark ? 'rgba(232,113,90,0.03)' : 'rgba(232,113,90,0.02)',
        boxShadow: isDark
          ? '0 0 40px rgba(232,113,90,0.08), 0 0 80px rgba(232,113,90,0.04)'
          : '0 0 30px rgba(232,113,90,0.06)',
      }}>
        <GPRChart isDark={isDark} />
      </div>
    </div>
  )
}
