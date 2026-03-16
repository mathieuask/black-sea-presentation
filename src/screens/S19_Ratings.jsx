export default function S19_Ratings({ isDark }) {
  const rows = [
    { country: 'Romania', moodys: "Baa3 (Neg.)", sp: "BBB- (Neg.)", fitch: 'BBB-', grade: 'Investment', color: 'var(--green)' },
    { country: 'Bulgaria', moodys: 'Baa1', sp: 'BBB+', fitch: 'BBB', grade: 'Investment', color: 'var(--green)' },
    { country: 'Turkey', moodys: 'Ba3', sp: 'BB-', fitch: 'BB-', grade: 'Speculative', color: 'var(--amber)' },
    { country: 'Georgia', moodys: 'Ba2', sp: 'BB', fitch: 'BB', grade: 'Speculative', color: 'var(--amber)' },
    { country: 'Ukraine', moodys: 'Ca', sp: 'SD', fitch: 'CCC', grade: 'Default', color: 'var(--red)' },
    { country: 'Russia', moodys: 'W/D', sp: 'W/D', fitch: 'W/D', grade: 'Withdrawn', color: 'var(--red)' },
  ]
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto', marginLeft: '60px', background: 'rgba(8,8,10,0.65)', borderRadius: '16px', backdropFilter: 'blur(12px)', padding: '48px' }}>
      <div className="tag mono fade-element">Sovereign Ratings</div>
      <h2 className="fade-element">Credit risk stratification</h2>
      <div className="accent-line fade-element"></div>
      <table className="data-table fade-element">
        <thead>
          <tr><th>Country</th><th>Moody&apos;s</th><th>S&amp;P</th><th>Fitch</th><th>Grade</th></tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.country}</td>
              <td>{r.moodys}</td>
              <td>{r.sp}</td>
              <td>{r.fitch}</td>
              <td style={{ color: r.color }}>{r.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="fade-element" style={{ marginTop: 18, fontSize: '0.85em' }}>
        Russia collapsed from investment grade (Baa3) to complete ratings withdrawal within <strong>10 days</strong> of the Feb 2022 invasion &mdash; historically unprecedented.
      </p>
    </div>
  )
}
