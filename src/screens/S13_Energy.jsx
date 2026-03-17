export default function S13_Energy({ isDark }) {
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto' }}>
      <div className="tag mono fade-element" style={{ borderColor: 'var(--amber)', color: 'var(--amber)' }}>Risk 07 // Energy Weapon</div>
      <h2 className="fade-element">TurkStream:<br/>single point of failure</h2>
      <div className="accent-line fade-element" style={{ background: 'linear-gradient(90deg, var(--amber), var(--red))' }}></div>
      <div className="split-layout" style={{ marginTop: 20 }}>
        <div>
          <p className="fade-element">
            <strong>31.5 bcm/year capacity</strong> &mdash; Europe&apos;s sole remaining Russian gas pipeline after Ukraine transit ended Dec 31, 2024.
          </p>
          <p className="fade-element" style={{ marginTop: 14 }}>
            <strong style={{ color: 'var(--red)' }}>March 2026:</strong> 12 drone attacks in two weeks on compressor stations. If disrupted, gas prices could spike <strong style={{ color: 'var(--red)' }}>30&ndash;50%</strong> within days.
          </p>
          <div className="gauge-row fade-element">
            <div className="gauge-container">
              <svg className="gauge-svg" width="100" height="100" viewBox="0 0 100 100">
                <circle className="gauge-bg" cx="50" cy="50" r="45"/>
                <circle className="gauge-fill danger" cx="50" cy="50" r="45" data-percent="98"/>
                <text className="gauge-value" x="50" y="50" style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}>98%</text>
              </svg>
              <div className="gauge-label-text">TurkStream<br/>utilization</div>
            </div>
            <div className="gauge-container">
              <svg className="gauge-svg" width="100" height="100" viewBox="0 0 100 100">
                <circle className="gauge-bg" cx="50" cy="50" r="45"/>
                <circle className="gauge-fill warning" cx="50" cy="50" r="45" data-percent="24"/>
                <text className="gauge-value" x="50" y="50" style={{ transform: 'rotate(90deg)', transformOrigin: 'center' }}>24%</text>
              </svg>
              <div className="gauge-label-text">EU gas storage<br/><span style={{ color: 'var(--red)' }}>vs. 41% avg</span></div>
            </div>
          </div>
        </div>
        <div className="fade-element" style={{ textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div className="card" style={{ padding: 30 }}>
            <p style={{ fontSize: '1em', color: 'var(--amber)', fontFamily: "'JetBrains Mono',monospace", fontWeight: 600 }}>&#9889; ALERT</p>
            <p style={{ marginTop: 12, fontSize: '0.85em' }}>
              A TurkStream disruption would leave 8 EU member states without their primary gas supply route within 48 hours.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
