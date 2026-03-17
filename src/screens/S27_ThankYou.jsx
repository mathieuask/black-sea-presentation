export default function S27_ThankYou({ isDark }) {
  return (
    <div className="closing-content" style={{ maxWidth: '600px', marginRight: 'auto' }}>
      <div className="hero-marker fade-element" style={{ marginLeft: 'auto', marginRight: 'auto' }}></div>
      <h2 className="fade-element" style={{ fontSize: 'clamp(2.5em, 5vw, 3.8em)' }}>Thank you</h2>
      <h3 className="fade-element" style={{ color: 'var(--text-secondary)', fontFamily: "'Inter',sans-serif", fontWeight: 300, marginTop: 16 }}>
        Questions &amp; Discussion
      </h3>
      <p className="fade-element" style={{ marginTop: 48, fontSize: '0.8em', color: 'var(--text-muted)', fontFamily: "'JetBrains Mono',monospace" }}>
        NEOMA Business School &nbsp;&bull;&nbsp; Companies &amp; Geopolitical Risks &nbsp;&bull;&nbsp; 2025&ndash;2026
      </p>
    </div>
  )
}
