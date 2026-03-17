// ─── Centralized country registry (pure data, NO colors) ───

export const COUNTRIES = {
  // ── Black Sea littoral states (6) ──
  RUS: { id: '643', name: 'Russia',       flag: '🇷🇺', lat: 58,   lng: 42,   offsetY: -50 },
  UKR: { id: '804', name: 'Ukraine',      flag: '🇺🇦', lat: 50,   lng: 31,   offsetY: -40 },
  TUR: { id: '792', name: 'Turkey',       flag: '🇹🇷', lat: 39.5, lng: 33,   offsetY: -38 },
  GEO: { id: '268', name: 'Georgia',      flag: '🇬🇪', lat: 42.3, lng: 44,   offsetY: -30 },
  ROU: { id: '642', name: 'Romania',      flag: '🇷🇴', lat: 46,   lng: 24,   offsetY: -32 },
  BGR: { id: '100', name: 'Bulgaria',     flag: '🇧🇬', lat: 43,   lng: 24,   offsetY: -28 },
  // ── Extended region ──
  MDA: { id: '498', name: 'Moldova',      flag: '🇲🇩', lat: 47,   lng: 29,   offsetY: -26 },
  ARM: { id: '051', name: 'Armenia',      flag: '🇦🇲', lat: 40,   lng: 45,   offsetY: -26 },
  AZE: { id: '031', name: 'Azerbaijan',   flag: '🇦🇿', lat: 40.5, lng: 50,   offsetY: -28 },
  GRC: { id: '300', name: 'Greece',       flag: '🇬🇷', lat: 39,   lng: 22,   offsetY: -28 },
  // ── NATO / EU members nearby ──
  POL: { id: '616', name: 'Poland',       flag: '🇵🇱', lat: 52,   lng: 20,   offsetY: -30 },
  HUN: { id: '348', name: 'Hungary',      flag: '🇭🇺', lat: 47,   lng: 19,   offsetY: -28 },
  HRV: { id: '191', name: 'Croatia',      flag: '🇭🇷', lat: 45,   lng: 16,   offsetY: -26 },
  SVK: { id: '703', name: 'Slovakia',     flag: '🇸🇰', lat: 48.7, lng: 19.7, offsetY: -26 },
  CZE: { id: '203', name: 'Czechia',      flag: '🇨🇿', lat: 49.8, lng: 15.5, offsetY: -26 },
  SVN: { id: '705', name: 'Slovenia',     flag: '🇸🇮', lat: 46,   lng: 15,   offsetY: -24 },
  ALB: { id: '008', name: 'Albania',      flag: '🇦🇱', lat: 41,   lng: 20,   offsetY: -24 },
  MNE: { id: '499', name: 'Montenegro',   flag: '🇲🇪', lat: 42.5, lng: 19.3, offsetY: -24 },
  MKD: { id: '807', name: 'N. Macedonia', flag: '🇲🇰', lat: 41.5, lng: 22,   offsetY: -24 },
  // ── Major powers ──
  USA: { id: '840', name: 'United States', flag: '🇺🇸', lat: 39,  lng: -98,  offsetY: -40 },
  CHN: { id: '156', name: 'China',        flag: '🇨🇳', lat: 36,   lng: 104,  offsetY: -40 },
  // ── Western Europe (EU/NATO context) ──
  DEU: { id: '276', name: 'Germany',      flag: '🇩🇪', lat: 51,   lng: 10,   offsetY: -28 },
  FRA: { id: '250', name: 'France',       flag: '🇫🇷', lat: 46.5, lng: 2.5,  offsetY: -30 },
  GBR: { id: '826', name: 'United Kingdom', flag: '🇬🇧', lat: 54, lng: -2,   offsetY: -30 },
  ITA: { id: '380', name: 'Italy',        flag: '🇮🇹', lat: 42,   lng: 12.5, offsetY: -28 },
  ESP: { id: '724', name: 'Spain',        flag: '🇪🇸', lat: 40,   lng: -4,   offsetY: -28 },
  // ── Nordic (NATO new members) ──
  FIN: { id: '246', name: 'Finland',      flag: '🇫🇮', lat: 64,   lng: 26,   offsetY: -30 },
  SWE: { id: '752', name: 'Sweden',       flag: '🇸🇪', lat: 62,   lng: 16,   offsetY: -30 },
  NOR: { id: '578', name: 'Norway',       flag: '🇳🇴', lat: 64,   lng: 10,   offsetY: -28 },
  // ── Baltics ──
  EST: { id: '233', name: 'Estonia',      flag: '🇪🇪', lat: 59,   lng: 25,   offsetY: -24 },
  LVA: { id: '428', name: 'Latvia',       flag: '🇱🇻', lat: 57,   lng: 24.5, offsetY: -24 },
  LTU: { id: '440', name: 'Lithuania',    flag: '🇱🇹', lat: 55.5, lng: 24,   offsetY: -24 },
}

// Helper: get label object from registry key + color
export const label = (key, color) => ({
  name: `${COUNTRIES[key].flag} ${COUNTRIES[key].name}`,
  lat: COUNTRIES[key].lat,
  lng: COUNTRIES[key].lng,
  color,
  offsetY: COUNTRIES[key].offsetY,
})

// Helper: build highlight map from array of keys + single color
export const hl = (keys, color) =>
  Object.fromEntries(keys.map(k => [COUNTRIES[k].id, color]))

// Set of all registry ISO IDs (for globe geometry pre-building)
export const ALL_IDS = new Set(Object.values(COUNTRIES).map(c => c.id))
