export default function S11_Wars({ isDark }) {
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto' }}>
      <div className="tag mono fade-element" style={{ borderColor: 'var(--red)', color: 'var(--red)' }}>Risk 01 // Interstate Wars</div>
      <h2 className="fade-element">Ukraine&apos;s asymmetric<br/>naval victory</h2>
      <div className="accent-line fade-element" style={{ background: 'linear-gradient(90deg, var(--red), var(--amber))' }}></div>
      <p className="fade-element" style={{ marginTop: 16 }}>
        <strong>29 of 80 Russian vessels destroyed</strong> by MAGURA V5 naval drones costing $50K-$250K each, against warships worth tens of millions.
      </p>
      <p className="fade-element" style={{ marginTop: 14 }}>
        War risk insurance surged from <strong>0.025%</strong> to <strong>1.0-1.5%</strong> of vessel value, a <strong>40-fold increase</strong>, adding ~$1M per voyage for a $100M vessel.
      </p>
      <div className="stat-grid cols-3" style={{ marginTop: 28 }}>
        <div className="stat-card card fade-element">
          <div className="stat-num" style={{ fontSize: '2.2em' }}>29/80</div>
          <div className="stat-label">Vessels destroyed<br/>by naval drones</div>
        </div>
        <div className="stat-card card fade-element">
          <div className="stat-num" style={{ fontSize: '2.2em' }}>40x</div>
          <div className="stat-label">War risk insurance<br/>premium surge</div>
        </div>
        <div className="stat-card card fade-element">
          <div className="stat-num teal-grad" style={{ fontSize: '2.2em' }}>$50K</div>
          <div className="stat-label">Cost per drone vs.<br/>$100M+ warship</div>
        </div>
      </div>
    </div>
  )
}
