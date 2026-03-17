export default function S16_Quote({ isDark }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', minHeight: '80vh', maxWidth: '600px', marginRight: 'auto', textShadow: '0 1px 20px rgba(0,0,0,0.3)' }}>
      <div>
        <div className="tag mono">Key Insight</div>
        <div className="quote-block fade-element">
          &ldquo;A drone strike on TurkStream triggers an energy spike, which raises inflation, which pressures governments on sanctions, which reshapes compliance obligations.&rdquo;
        </div>
        <div className="quote-attribution fade-element">
          &mdash; The compounding risk logic of the Black Sea
        </div>
      </div>
    </div>
  )
}
