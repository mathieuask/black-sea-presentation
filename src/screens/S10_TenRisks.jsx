export default function S10_TenRisks({ isDark }) {
  const risks = [
    { idx: '01', title: 'Interstate Wars', ex: 'Fleet destroyed, ports bombed' },
    { idx: '02', title: 'Humanitarian Crises', ex: '5.9M refugees, food crisis' },
    { idx: '03', title: 'Laws & Regulations', ex: '19 EU sanctions packages' },
    { idx: '04', title: 'Expropriation', ex: '$167B assets seized' },
    { idx: '05', title: 'Corruption', ex: 'Moldova/Georgia elections' },
    { idx: '06', title: 'Extraterritoriality', ex: 'EU Article 8a, OFAC' },
    { idx: '07', title: 'Resource Manipulation', ex: 'Gas & grain weaponized' },
    { idx: '08', title: 'Social Activism', ex: '400+ companies exited Russia' },
    { idx: '09', title: 'Political Violence', ex: 'Nord Stream, TurkStream attacks' },
    { idx: '10', title: 'Cyber Threats', ex: 'NotPetya ($10B), GPS spoofing' },
  ]
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto' }}>
      <div className="tag mono fade-element">Risk Mapping</div>
      <h2 className="fade-element">All ten risks, one region</h2>
      <div className="accent-line fade-element"></div>
      <div className="risk-list">
        {risks.map((r, i) => (
          <div key={i} className="risk-item fade-element">
            <span className="risk-idx">{r.idx}</span>
            <span className="risk-title">{r.title}</span>
            <span className="risk-ex">&bull; {r.ex}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
