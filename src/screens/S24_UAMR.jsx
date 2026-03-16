export default function S24_UAMR({ isDark }) {
  const cards = [
    { icon: '\uD83D\uDC41', title: 'Understand', cls: '', desc: "Define risk appetite across all 10 GPR types. Romania/Bulgaria = stable. Turkey = volatile. Ukraine = high risk. Make GPR everyone's business." },
    { icon: '\uD83D\uDD0D', title: 'Analyse', cls: 'c2', desc: 'Combine GPR Index, insurance data, TurkStream flows with think-tank intelligence. Use scenario planning. Avoid groupthink via the nine-dot principle.' },
    { icon: '\uD83D\uDEE1', title: 'Mitigate', cls: 'c3', desc: 'Diversify supply chains. Invest in Constanta/Danube alternatives. Obtain MIGA insurance. Build flexible surge capacity for logistics rerouting.' },
    { icon: '\u26A1', title: 'Respond', cls: 'c4', desc: 'Plan for failure. Activate crisis teams. Capitalize on near misses. Train continuously. Reward courageous decisions.' },
  ]
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto', marginLeft: '60px', background: 'rgba(8,8,10,0.65)', borderRadius: '16px', backdropFilter: 'blur(12px)', padding: '48px' }}>
      <div className="tag mono">Risk Management</div>
      <h2>Four steps to manage GPR</h2>
      <div className="accent-line"></div>
      <div className="uamr-grid">
        {cards.map((c, i) => (
          <div key={i} className={`uamr-card ${c.cls} card fade-element`}>
            <h4>{c.icon} {c.title}</h4>
            <p>{c.desc}</p>
          </div>
        ))}
      </div>
      <p className="fade-element" style={{ marginTop: 20, fontSize: '0.85em' }}>
        BCG &amp; WEF (2026): fewer than <strong>1 in 5</strong> companies have a dedicated geopolitics department.
      </p>
    </div>
  )
}
