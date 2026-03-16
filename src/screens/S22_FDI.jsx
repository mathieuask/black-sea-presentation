export default function S22_FDI({ isDark }) {
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto', marginLeft: '60px', background: 'rgba(8,8,10,0.65)', borderRadius: '16px', backdropFilter: 'blur(12px)', padding: '48px' }}>
      <div className="tag mono fade-element" style={{ borderColor: 'var(--green)', color: 'var(--green)' }}>FDI &amp; Nearshoring</div>
      <h2 className="fade-element">Winners in the crisis</h2>
      <div className="accent-line fade-element" style={{ background: 'linear-gradient(90deg, var(--green), var(--teal))' }}></div>
      <div className="split-layout" style={{ marginTop: 24, alignItems: 'start' }}>
        <div>
          <div className="card fade-element" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: "'Space Grotesk'", fontSize: '1.05em' }}>Romania</span>
              <span className="mono" style={{ color: 'var(--green)', fontWeight: 600 }}>+57%</span>
            </div>
            <div style={{ fontSize: '0.8em', color: 'var(--text-muted)', marginTop: 8 }}>
              FDI projects surged from 60 to 94 in 2024. Transport &amp; Logistics rose from 9th to 3rd place. Ranked 2nd in CEE for FDI attractiveness (EY 2025).
            </div>
          </div>
          <div className="card fade-element">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: "'Space Grotesk'", fontSize: '1.05em' }}>Bulgaria</span>
              <span className="mono" style={{ color: 'var(--green)', fontWeight: 600 }}>+48.4%</span>
            </div>
            <div style={{ fontSize: '0.8em', color: 'var(--text-muted)', marginTop: 8 }}>
              FDI inflows grew 48.4% in Jan-Sep 2023. Only investment-grade Black Sea state alongside Romania.
            </div>
          </div>
        </div>
        <div>
          <div className="card fade-element" style={{ marginBottom: 16, borderLeft: '3px solid var(--green)' }}>
            <div style={{ fontFamily: "'Space Grotesk'", fontSize: '1.05em' }}>Danube Corridor</div>
            <div style={{ fontSize: '0.8em', color: 'var(--text-muted)', marginTop: 8 }}>
              Emergency alternative matured into permanent logistics asset. Freight costs fell from <strong>$100/t</strong> (2023) to <strong>&euro;10/t</strong>.
            </div>
          </div>
          <div className="card fade-element" style={{ borderLeft: '3px solid var(--red)' }}>
            <div style={{ fontFamily: "'Space Grotesk'", fontSize: '1.05em' }}>Insurance Market</div>
            <div style={{ fontSize: '0.8em', color: 'var(--text-muted)', marginTop: 8 }}>
              Global war-risk premium market approaching <strong>$1 billion</strong>. Insurers reviewing Black Sea terms every 24 hours post-March 2026 attacks.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
