export default function S02_Agenda({ isDark }) {
  const items = [
    { num: 'I', text: 'Strategic Context & Why It Matters', color: 'var(--accent)', numColor: 'var(--accent)' },
    { num: 'II', text: 'Key Actors & Competing Interests', color: 'var(--accent)', numColor: 'var(--accent)' },
    { num: 'III', text: 'Ten Types of Geopolitical Risk', color: 'var(--teal)', numColor: 'var(--teal)' },
    { num: 'IV', text: 'Measuring Geopolitical Risk', color: 'var(--teal)', numColor: 'var(--teal)' },
    { num: 'V', text: 'Implications for International Business', color: 'var(--amber)', numColor: 'var(--amber)' },
    { num: 'VI', text: 'The UAMR Framework', color: 'var(--amber)', numColor: 'var(--amber)' },
    { num: 'VII', text: 'Conclusion', color: 'var(--red)', numColor: 'var(--red)' },
  ]
  return (
    <div style={{ maxWidth: '440px', marginRight: 'auto' }}>
      <div className="tag mono fade-element">Roadmap</div>
      <h2 className="fade-element">Agenda</h2>
      <div className="accent-line fade-element"></div>
      <div className="agenda-grid" style={{ gridTemplateColumns: '1fr' }}>
        {items.map((item, i) => (
          <div key={i} className="agenda-item fade-element">
            <span className="agenda-num" style={{ color: item.numColor }}>{item.num}</span>
            <span className="agenda-text">{item.text}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
