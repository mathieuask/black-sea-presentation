// Factory: creates a timeline event slide component
// Each event = one slide with big date + short text, globe shows relevant region
export function createTimelineEvent(year, text, isCritical = false) {
  return function TimelineEvent({ isDark }) {
    return (
      <div style={{ maxWidth: 520, marginRight: 'auto' }}>
        <div className="tag mono fade-element">Historical Escalation</div>
        <div className="fade-element" style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '4.5em',
          fontWeight: 700,
          color: isCritical ? 'var(--red, #D63B3B)' : 'var(--coral, #E8715A)',
          lineHeight: 1,
          marginTop: 8,
        }}>
          {year}
        </div>
        <div className="accent-line fade-element" />
        <p className="fade-element" style={{
          fontSize: '1.2em',
          lineHeight: 1.7,
          marginTop: 20,
          color: 'var(--text)',
          opacity: 0.92,
          fontFamily: 'var(--font-body)',
        }}>
          {text}
        </p>
      </div>
    )
  }
}

// Keep default export for backwards compatibility
export default createTimelineEvent('—', '...')
