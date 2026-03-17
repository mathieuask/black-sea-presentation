import S01_Hero from './screens/S01_Hero'
import S02_Agenda from './screens/S02_Agenda'
import S03_PartIDivider from './screens/S03_PartIDivider'
import S04_KeyStats from './screens/S04_KeyStats'
import S05_Geography from './screens/S05_Geography'
import S06_Timeline from './screens/S06_Timeline'
import S07_PartIIDivider from './screens/S07_PartIIDivider'
import S08_Actors from './screens/S08_Actors'
import S09_PartIIIDivider from './screens/S09_PartIIIDivider'
import S10_TenRisks from './screens/S10_TenRisks'
import S11_Wars from './screens/S11_Wars'
import S12_Expropriation from './screens/S12_Expropriation'
import S13_Energy from './screens/S13_Energy'
import S14_Food from './screens/S14_Food'
import S15_Cyber from './screens/S15_Cyber'
import S16_Quote from './screens/S16_Quote'
import S17_PartIVDivider from './screens/S17_PartIVDivider'
import S18_GPRChart from './screens/S18_GPRChart'
import S19_Ratings from './screens/S19_Ratings'
import S20_PartVDivider from './screens/S20_PartVDivider'
import S21_Shipping from './screens/S21_Shipping'
import S22_FDI from './screens/S22_FDI'
import S23_PartVIDivider from './screens/S23_PartVIDivider'
import S24_UAMR from './screens/S24_UAMR'
import S25_Conclusion from './screens/S25_Conclusion'
import S26_Sources from './screens/S26_Sources'
import S27_ThankYou from './screens/S27_ThankYou'

// Globe config per slide:
//   lat/lng = geographic center to look at
//   zoom   = COBE scale (1 = full globe, 2 = region, 3+ = country close-up)
//   autoRotate = slow spin (hero/outro only)

export const screens = [
  // --- HERO ---
  { component: S01_Hero,
    globe: { lat: 44, lng: 35, zoom: 1.6, autoRotate: true },
    transition: 'fade' },

  // --- AGENDA ---
  { component: S02_Agenda,
    globe: { lat: 43, lng: 33, zoom: 2.0, autoRotate: false },
    transition: 'slide' },

  // --- PART I: THE REGION ---
  { component: S03_PartIDivider,
    globe: { lat: 44, lng: 38, zoom: 1.8, autoRotate: false, labels: [
      { name: 'Russia', lat: 58, lng: 42, color: '#e8715a', offsetY: -50 },
      { name: 'Ukraine', lat: 50, lng: 31, color: '#e8715a', offsetY: -40 },
      { name: 'Romania', lat: 46, lng: 24, color: '#5b9bd5', offsetY: -32 },
      { name: 'Bulgaria', lat: 43, lng: 24, color: '#5dae7c', offsetY: -28 },
      { name: 'Turkey', lat: 39, lng: 33, color: '#e5a84b', offsetY: -38 },
      { name: 'Georgia', lat: 42.3, lng: 44, color: '#5dae7c', offsetY: -30 },
      { name: 'Black Sea', lat: 43, lng: 35, color: 'rgba(255,255,255,0.4)', offsetY: -22 },
    ] },
    transition: 'dramatic' },

  // Key Stats — Black Sea overview
  { component: S04_KeyStats,
    globe: { lat: 43, lng: 34, zoom: 2.2, autoRotate: false },
    transition: 'slide' },

  // Geography — zoom into the Black Sea itself
  { component: S05_Geography,
    globe: { lat: 42, lng: 32, zoom: 2.6, autoRotate: false },
    transition: 'slide' },

  // Timeline — pull back slightly
  { component: S06_Timeline,
    globe: { lat: 44, lng: 34, zoom: 2.0, autoRotate: false },
    transition: 'slide' },

  // --- PART II: ACTORS ---
  { component: S07_PartIIDivider,
    globe: { lat: 43, lng: 34, zoom: 1.4, autoRotate: false },
    transition: 'dramatic' },

  // Actors — see all countries around the sea
  { component: S08_Actors,
    globe: { lat: 43, lng: 35, zoom: 2.0, autoRotate: false },
    transition: 'slide' },

  // --- PART III: TEN RISKS ---
  { component: S09_PartIIIDivider,
    globe: { lat: 43, lng: 34, zoom: 1.4, autoRotate: false },
    transition: 'dramatic' },

  // Ten Risks overview
  { component: S10_TenRisks,
    globe: { lat: 43, lng: 34, zoom: 2.0, autoRotate: false },
    transition: 'slide' },

  // Wars — ZOOM INTO UKRAINE (central Ukraine)
  { component: S11_Wars,
    globe: { lat: 46, lng: 34, zoom: 2.8, autoRotate: false },
    transition: 'country-focus' },

  // Expropriation — ZOOM INTO RUSSIA (Moscow area)
  { component: S12_Expropriation,
    globe: { lat: 56, lng: 40, zoom: 2.5, autoRotate: false },
    transition: 'country-focus' },

  // Energy — ZOOM INTO TURKEY/TURKSTREAM (Bosphorus)
  { component: S13_Energy,
    globe: { lat: 43, lng: 33, zoom: 2.5, autoRotate: false },
    transition: 'country-focus' },

  // Food — ZOOM INTO UKRAINE (grain ports: Odesa region)
  { component: S14_Food,
    globe: { lat: 46, lng: 31, zoom: 3.0, autoRotate: false },
    transition: 'country-focus' },

  // Cyber — pull back (NotPetya was global)
  { component: S15_Cyber,
    globe: { lat: 48, lng: 32, zoom: 1.6, autoRotate: false },
    transition: 'slide' },

  // Quote — Black Sea centered
  { component: S16_Quote,
    globe: { lat: 43, lng: 34, zoom: 2.5, autoRotate: false },
    transition: 'zoom-in' },

  // --- PART IV: MEASURING RISK ---
  { component: S17_PartIVDivider,
    globe: { lat: 43, lng: 34, zoom: 1.4, autoRotate: false },
    transition: 'dramatic' },

  // GPR Chart — overview
  { component: S18_GPRChart,
    globe: { lat: 43, lng: 34, zoom: 1.8, autoRotate: false },
    transition: 'slide' },

  // Ratings — see all rated countries
  { component: S19_Ratings,
    globe: { lat: 43, lng: 34, zoom: 2.2, autoRotate: false },
    transition: 'slide' },

  // --- PART V: BUSINESS IMPACT ---
  { component: S20_PartVDivider,
    globe: { lat: 43, lng: 34, zoom: 1.4, autoRotate: false },
    transition: 'dramatic' },

  // Shipping — ZOOM INTO CONSTANTA PORT (Romania)
  { component: S21_Shipping,
    globe: { lat: 44, lng: 29, zoom: 3.0, autoRotate: false },
    transition: 'country-focus' },

  // FDI — ZOOM INTO ROMANIA/BULGARIA
  { component: S22_FDI,
    globe: { lat: 44, lng: 27, zoom: 2.8, autoRotate: false },
    transition: 'country-focus' },

  // --- PART VI: UAMR FRAMEWORK ---
  { component: S23_PartVIDivider,
    globe: { lat: 43, lng: 34, zoom: 1.4, autoRotate: false },
    transition: 'dramatic' },

  // UAMR Framework — overview
  { component: S24_UAMR,
    globe: { lat: 43, lng: 34, zoom: 1.8, autoRotate: false },
    transition: 'slide' },

  // Conclusion — Black Sea centered
  { component: S25_Conclusion,
    globe: { lat: 43, lng: 34, zoom: 2.2, autoRotate: false },
    transition: 'slide' },

  // Sources — pull back
  { component: S26_Sources,
    globe: { lat: 43, lng: 34, zoom: 1.4, autoRotate: false },
    transition: 'slide' },

  // --- THANK YOU ---
  { component: S27_ThankYou,
    globe: { lat: 42, lng: 34, zoom: 1.2, autoRotate: true },
    transition: 'zoom-in' },
]
