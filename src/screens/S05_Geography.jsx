export default function S05_Geography({ isDark }) {
  return (
    <div style={{ maxWidth: '420px', marginRight: 'auto' }}>
      <div className="tag mono fade-element">Strategic Geography</div>
      <h2 className="fade-element">Six nations. One sea.<br/>One chokepoint.</h2>
      <div className="accent-line fade-element"></div>
      <p className="fade-element" style={{ marginTop: 16 }}><strong>Turkey, Russia, Ukraine, Romania, Bulgaria, Georgia.</strong></p>
      <p className="fade-element" style={{ marginTop: 14 }}>
        The only exit runs through the <strong style={{ color: 'var(--teal)' }}>Bosporus Strait</strong>, governed by the <strong style={{ color: 'var(--teal)' }}>Montreux Convention (1936)</strong>, giving Turkey sole discretion over warship transit.
      </p>
      <p className="fade-element" style={{ marginTop: 14 }}>
        On Feb 27, 2022, Turkey invoked Montreux&apos;s wartime provisions for the <strong>first time since WWII</strong>, freezing the military balance entirely.
      </p>
      <p className="fade-element" style={{ marginTop: 14 }}>
        <strong style={{ color: 'var(--red)' }}>TurkStream</strong> is now Europe&apos;s sole Russian gas pipeline, operating at <strong>98%</strong> capacity.
      </p>
    </div>
  )
}
