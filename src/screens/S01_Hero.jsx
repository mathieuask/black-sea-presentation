export default function S01_Hero({ isDark }) {
  return (
    <div className="hero-content" style={{ maxWidth: '600px', marginRight: 'auto', marginLeft: '60px' }}>
      <div className="tag mono fade-element">NEOMA Business School &bull; Companies &amp; Geopolitical Risks</div>
      <div className="hero-marker fade-element"></div>
      <h1 className="fade-element">The <span className="highlight">Black Sea</span><br/>Competition</h1>
      <h3 className="fade-element" style={{ marginTop: 12, color: 'var(--text-secondary)', fontFamily: "'Inter',sans-serif", fontWeight: 300, fontSize: '1.2em' }}>
        Implications and Risks for International Business
      </h3>
      <p className="fade-element" style={{ marginTop: 48, fontSize: '0.8em', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace" }}>
        Professor Yassine OMRI &nbsp;&bull;&nbsp; Academic Year 2025&ndash;2026
      </p>
    </div>
  )
}
