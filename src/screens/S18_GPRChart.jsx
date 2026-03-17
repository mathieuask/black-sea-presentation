import GPRChart from '../components/GPRChart'

export default function S18_GPRChart({ isDark }) {
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto' }}>
      <div className="tag mono fade-element">Quantitative Analysis</div>
      <h2 className="fade-element">Geopolitical Risk Index</h2>
      <div className="accent-line fade-element"></div>
      <p className="fade-element" style={{ fontSize: '0.85em' }}>
        Peaked at <strong style={{ color: 'var(--red)' }}>167.3</strong> in March 2022 &mdash; the highest reading in 50 years. A shock of this magnitude reduces world GDP by ~1.7%.
      </p>
      <div className="chart-wrap fade-element">
        <GPRChart isDark={isDark} />
      </div>
    </div>
  )
}
