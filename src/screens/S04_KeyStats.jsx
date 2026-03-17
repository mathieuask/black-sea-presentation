export default function S04_KeyStats({ isDark }) {
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto' }}>
      <div className="tag mono fade-element">Key Figures</div>
      <h2 className="fade-element">The scale of disruption</h2>
      <div className="accent-line fade-element"></div>
      <div className="stat-grid cols-2">
        <div className="stat-card card fade-element">
          <div className="stat-num" data-target="167" data-prefix="$" data-suffix="B">$0B</div>
          <div className="stat-label">Foreign assets lost<br/>in Russia since 2022</div>
        </div>
        <div className="stat-card card fade-element">
          <div className="stat-num" data-target="34" data-suffix="%">0%</div>
          <div className="stat-label">Of global wheat exports<br/>from this region</div>
        </div>
        <div className="stat-card card fade-element">
          <div className="stat-num" data-target="40" data-suffix="x">0x</div>
          <div className="stat-label">Surge in shipping<br/>war-risk insurance</div>
        </div>
        <div className="stat-card card fade-element">
          <div className="stat-num teal-grad" data-target="5.9" data-suffix="M" data-decimals="1">0M</div>
          <div className="stat-label">Ukrainian refugees<br/>displaced since 2022</div>
        </div>
      </div>
    </div>
  )
}
