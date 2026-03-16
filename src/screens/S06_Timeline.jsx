export default function S06_Timeline({ isDark }) {
  const events = [
    { year: '2008', text: 'Russia-Georgia war. Moscow sets a precedent for territorial intervention.', critical: false, side: 'left' },
    { year: '2014', text: 'Annexation of Crimea. Western sanctions begin.', critical: false, side: 'right' },
    { year: '2017', text: 'NotPetya cyberattack via Ukrainian software M.E.Doc. $10B global damage.', critical: false, side: 'left' },
    { year: '2022', critical: true, side: 'right' },
    { year: '2024', text: '1/3 of Black Sea Fleet destroyed by drones. Fleet declared "functionally inactive."', critical: false, side: 'left' },
    { year: '2025', text: 'EU Black Sea Strategy published. TurkStream becomes sole pipeline route.', critical: false, side: 'right' },
  ]

  const renderContent = (e) => (
    <div className="tl-content" style={e.critical ? { borderColor: 'rgba(220,38,38,0.3)' } : {}}>
      <div className="tl-year">{e.year}</div>
      <div className="tl-text">
        {e.critical ? (
          <><strong style={{ color: 'var(--red)' }}>Full-scale invasion.</strong> GPR Index hits 167.3. Montreux wartime provisions invoked.</>
        ) : e.text}
      </div>
    </div>
  )

  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto', marginLeft: '60px', background: 'rgba(8,8,10,0.65)', borderRadius: '16px', backdropFilter: 'blur(12px)', padding: '48px' }}>
      <div className="tag mono fade-element">Historical Escalation</div>
      <h2 className="fade-element">From tension to war</h2>
      <div className="accent-line fade-element"></div>
      <div className="timeline">
        {events.map((e, i) => (
          <div key={i} className={`tl-entry fade-element ${e.critical ? 'critical' : ''}`}>
            {e.side === 'left' ? (
              <>
                {renderContent(e)}
                <div className="tl-dot"></div>
                <div style={{ width: '44%' }}></div>
              </>
            ) : (
              <>
                <div style={{ width: '44%' }}></div>
                <div className="tl-dot"></div>
                {renderContent(e)}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
