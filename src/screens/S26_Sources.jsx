export default function S26_Sources({ isDark }) {
  return (
    <div style={{ maxWidth: '650px', marginRight: 'auto', marginLeft: '60px', background: 'rgba(8,8,10,0.65)', borderRadius: '16px', backdropFilter: 'blur(12px)', padding: '48px' }}>
      <div className="tag mono">References</div>
      <h2>Key Sources</h2>
      <div className="accent-line"></div>
      <div className="sources-list fade-element" dangerouslySetInnerHTML={{ __html: `
        <strong>Think Tanks</strong><br/>
        Chatham House (2024, 2025) &bull; Atlantic Council (2024, 2025) &bull; RUSI (2025) &bull; German Marshall Fund (2025) &bull; CEPA (2025) &bull; NATO PA (2025) &bull; Marshall Center (2024) &bull; College of Europe (2025)<br/><br/>
        <strong>Official Sources</strong><br/>
        European Commission Black Sea Strategy (May 2025) &bull; EU Consilium Sanctions (2024&ndash;2026) &bull; NATO Strategic Concept (2022) &bull; UN Black Sea Grain Initiative (2022&ndash;23) &bull; UNHCR (2024)<br/><br/>
        <strong>Legal</strong><br/>
        Montreux Convention (1936) &bull; BISI (2025) &bull; US Naval Institute (2022) &bull; West Point Lieber Institute (2024)<br/><br/>
        <strong>Energy</strong><br/>
        Caspian Post (2026) &bull; Turkiye Today (2026) &bull; Interfax (2026) &bull; Atlantic Council Energy (2024, 2025)<br/><br/>
        <strong>Trade &amp; Business</strong><br/>
        S&amp;P Global (2025) &bull; CSIS (2024) &bull; CFR (2024) &bull; Kyiv Post (2025) &bull; OSW (2025) &bull; BCG/WEF (2026) &bull; McKinsey (2024) &bull; EY Romania (2025)<br/><br/>
        <strong>Academic</strong><br/>
        Caldara &amp; Iacoviello, AER (2022) &bull; Cambridge Core (2024) &bull; Small Wars Journal (2025)
      ` }} />
    </div>
  )
}
