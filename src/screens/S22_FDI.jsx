export default function S22_FDI({ isDark }) {
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto' }}>
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
            <ul style={{ fontSize: '0.8em', color: 'var(--text-muted)', marginTop: 8, paddingLeft: 16, lineHeight: 1.7 }}>
              <li>FDI projects surged from 60 to 94 in 2024</li>
              <li>Transport &amp; Logistics: 9th to 3rd place</li>
              <li>Ranked 2nd in CEE for FDI attractiveness (EY 2025)</li>
            </ul>
          </div>
          <div className="card fade-element">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <span style={{ fontFamily: "'Space Grotesk'", fontSize: '1.05em' }}>Bulgaria</span>
              <span className="mono" style={{ color: 'var(--green)', fontWeight: 600 }}>+48.4%</span>
            </div>
            <ul style={{ fontSize: '0.8em', color: 'var(--text-muted)', marginTop: 8, paddingLeft: 16, lineHeight: 1.7 }}>
              <li>FDI inflows grew 48.4% in Jan-Sep 2023</li>
              <li>Only investment-grade Black Sea state alongside Romania</li>
            </ul>
          </div>
        </div>
        <div>
          <div className="card fade-element" style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--green)', flexShrink: 0 }}></span>
              <span style={{ fontFamily: "'Space Grotesk'", fontSize: '1.05em' }}>Danube Corridor</span>
            </div>
            <ul style={{ fontSize: '0.8em', color: 'var(--text-muted)', marginTop: 8, paddingLeft: 16, lineHeight: 1.7 }}>
              <li>Emergency alternative matured into permanent logistics asset</li>
              <li>Freight costs fell from <strong>$100/t</strong> (2023) to <strong>&euro;10/t</strong></li>
            </ul>
          </div>
          <div className="card fade-element">
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--red)', flexShrink: 0 }}></span>
              <span style={{ fontFamily: "'Space Grotesk'", fontSize: '1.05em' }}>Insurance Market</span>
            </div>
            <ul style={{ fontSize: '0.8em', color: 'var(--text-muted)', marginTop: 8, paddingLeft: 16, lineHeight: 1.7 }}>
              <li>Global war-risk premium market approaching <strong>$1 billion</strong></li>
              <li>Insurers reviewing Black Sea terms every 24 hours post-March 2026</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
