export default function S21_Shipping({ isDark }) {
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto' }}>
      <div className="tag mono fade-element">Shipping &amp; Trade</div>
      <h2 className="fade-element">Constanta: the new hub</h2>
      <div className="accent-line fade-element"></div>
      <div className="stat-grid cols-2" style={{ marginTop: 24 }}>
        <div className="stat-card card fade-element">
          <div className="stat-num teal-grad" style={{ fontSize: '2.4em' }} data-target="92.7" data-suffix="M t" data-decimals="1">0M t</div>
          <div className="stat-label">Port of Constanta record (2023)</div>
          <div style={{ fontSize: '0.8em', color: 'var(--green)', marginTop: 6 }}>+22.5% year-on-year</div>
        </div>
        <div className="stat-card card fade-element">
          <div className="stat-num teal-grad" style={{ fontSize: '2.4em' }} data-target="990" data-suffix="K TEU">0K TEU</div>
          <div className="stat-label">Container throughput (2024)</div>
          <div style={{ fontSize: '0.8em', color: 'var(--green)', marginTop: 6 }}>+62% from 610K TEU in 2021</div>
        </div>
        <div className="stat-card card fade-element">
          <div className="stat-num" style={{ fontSize: '2.4em', background: 'linear-gradient(135deg, var(--accent), var(--teal))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>90M+</div>
          <div className="stat-label">Tonnes shipped via Ukraine&apos;s<br/>unilateral corridor</div>
        </div>
        <div className="stat-card card fade-element">
          <div className="stat-num" style={{ fontSize: '2.4em', background: 'linear-gradient(135deg, var(--teal), var(--accent))', WebkitBackgroundClip: 'text', backgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>$300M+</div>
          <div className="stat-label">Romania infrastructure<br/>investment committed</div>
        </div>
      </div>
    </div>
  )
}
