export default function S14_Food({ isDark }) {
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto' }}>
      <div className="tag mono fade-element" style={{ borderColor: 'var(--amber)', color: 'var(--amber)' }}>Risk 02 // Food Security</div>
      <h2 className="fade-element">The grain blockade</h2>
      <div className="accent-line fade-element" style={{ background: 'linear-gradient(90deg, var(--amber), var(--red))' }}></div>
      <div className="split-layout" style={{ marginTop: 20 }}>
        <div>
          <p className="fade-element">
            Russia and Ukraine supply <strong>34% of global wheat exports</strong>. The 2022 blockade trapped 25M tonnes and pushed <strong style={{ color: 'var(--red)' }}>47 million people</strong> into severe hunger.
          </p>
          <p className="fade-element" style={{ marginTop: 14 }}>
            Wheat prices surged <strong style={{ color: 'var(--red)' }}>+58%</strong> in March 2022. The FAO Food Price Index hit its <strong>all-time high</strong>.
          </p>
          <p className="fade-element" style={{ marginTop: 14, fontSize: '0.85em' }}>
            Ukraine&apos;s unilateral corridor has since shipped 90M+ tonnes to 55 countries &mdash; but Russian strikes cut monthly shipments by up to 30% in 2025.
          </p>
        </div>
        <div>
          <div className="stat-grid cols-2" style={{ marginTop: 0 }}>
            <div className="stat-card card fade-element">
              <div className="stat-num" style={{ fontSize: '2em' }}>+58%</div>
              <div className="stat-label">Wheat price surge<br/>March 2022</div>
            </div>
            <div className="stat-card card fade-element">
              <div className="stat-num teal-grad" style={{ fontSize: '2em' }}>90M+</div>
              <div className="stat-label">Tonnes shipped via<br/>unilateral corridor</div>
            </div>
            <div className="stat-card card fade-element">
              <div className="stat-num" style={{ fontSize: '2em' }}>47M</div>
              <div className="stat-label">People pushed into<br/>severe hunger</div>
            </div>
            <div className="stat-card card fade-element">
              <div className="stat-num teal-grad" style={{ fontSize: '2em' }}>55</div>
              <div className="stat-label">Countries receiving<br/>grain exports</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
