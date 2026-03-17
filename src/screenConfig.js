import { COUNTRIES, label, hl } from './countryRegistry'

import S01_Hero from './screens/S01_Hero'
import S02_Agenda from './screens/S02_Agenda'
import S03_PartIDivider from './screens/S03_PartIDivider'
import S04_KeyStats from './screens/S04_KeyStats'
import S05_Geography from './screens/S05_Geography'
import { createTimelineEvent } from './screens/S06_Timeline'

const S06_TL2008 = createTimelineEvent('2008', 'Russia-Georgia war. Moscow sets a precedent for territorial intervention in the post-Soviet space.')
const S06_TL2014 = createTimelineEvent('2014', 'Annexation of Crimea. Western sanctions begin. Russia gains control of Sevastopol naval base.')
const S06_TL2017 = createTimelineEvent('2017', 'NotPetya cyberattack launched via Ukrainian software M.E.Doc. $10 billion in global damage.')
const S06_TL2022 = createTimelineEvent('2022', 'Full-scale invasion. GPR Index hits 167.3. Turkey invokes Montreux wartime provisions for the first time since WWII.', true)
const S06_TL2024 = createTimelineEvent('2024', '⅓ of Russia\'s Black Sea Fleet destroyed by Ukrainian naval drones. Fleet declared "functionally inactive."')
const S06_TL2025 = createTimelineEvent('2025', 'EU Black Sea Strategy published. TurkStream becomes Europe\'s sole Russian gas pipeline route.')
import S07_PartIIDivider from './screens/S07_PartIIDivider'
import S08_ActorRussia from './screens/S08_ActorRussia'
import S08_ActorNATO from './screens/S08_ActorNATO'
import S08_ActorEU from './screens/S08_ActorEU'
import S08_ActorTurkey from './screens/S08_ActorTurkey'
import S08_ActorChina from './screens/S08_ActorChina'
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

// ─── Preset highlight groups ───

// 6 Black Sea littoral states, each its own distinct color
const BLACK_SEA_6 = {
  [COUNTRIES.RUS.id]: '#D63B3B',  // bold red
  [COUNTRIES.UKR.id]: '#E5A84B',  // gold / amber
  [COUNTRIES.TUR.id]: '#E8715A',  // coral
  [COUNTRIES.GEO.id]: '#5DAE7C',  // sage
  [COUNTRIES.ROU.id]: '#5B9BD5',  // sky
  [COUNTRIES.BGR.id]: '#8B6DB0',  // purple
}

// Globe config per slide:
//   lat/lng    = geographic center to look at
//   zoom       = camera scale (1 = full globe, 2 = region, 3+ = country close-up)
//   autoRotate = slow spin (hero/outro only)
//   highlight  = { isoId: '#hexColor', ... } — which countries to color and how
//   labels     = array of label objects for on-globe annotations

export const screens = [
  // --- HERO ---
  { component: S01_Hero,
    globe: { lat: 44, lng: 35, zoom: 1.6, autoRotate: true,
      highlight: BLACK_SEA_6 },
    transition: 'fade' },

  // --- AGENDA ---
  { component: S02_Agenda,
    globe: { lat: 43, lng: 33, zoom: 2.0, autoRotate: false,
      highlight: BLACK_SEA_6 },
    transition: 'slide' },

  // --- PART I: THE REGION ---
  { component: S03_PartIDivider,
    globe: { lat: 44, lng: 38, zoom: 1.8, autoRotate: false,
      highlight: BLACK_SEA_6,
      labels: [
        label('RUS', '#D63B3B'),
        label('UKR', '#E5A84B'),
        label('ROU', '#5B9BD5'),
        label('BGR', '#8B6DB0'),
        label('TUR', '#E8715A'),
        label('GEO', '#5DAE7C'),
        { name: 'Black Sea', lat: 43, lng: 35, offsetY: -22 },
      ] },
    transition: 'dramatic' },

  // Key Stats — Black Sea overview
  { component: S04_KeyStats,
    globe: { lat: 43, lng: 34, zoom: 2.2, autoRotate: false,
      highlight: BLACK_SEA_6 },
    transition: 'slide' },

  // Geography — "Six nations. One sea. One chokepoint."
  { component: S05_Geography,
    globe: { lat: 44, lng: 34, zoom: 2.0, autoRotate: false,
      highlight: BLACK_SEA_6,
      labels: [
        label('RUS', '#D63B3B'),
        label('UKR', '#E5A84B'),
        label('TUR', '#E8715A'),
        label('ROU', '#5B9BD5'),
        label('BGR', '#8B6DB0'),
        label('GEO', '#5DAE7C'),
        { name: 'Bosphorus', lat: 41, lng: 29, color: '#E8715A', offsetY: -28 },
        { name: 'Crimea', lat: 45, lng: 34, color: '#D63B3B', offsetY: -20 },
      ] },
    transition: 'slide' },

  // Timeline — one slide per event, globe focuses on the relevant region

  // 2008: Russia-Georgia war → focus Georgia + Russia
  { component: S06_TL2008,
    globe: { lat: 42, lng: 44, zoom: 2.4, autoRotate: false,
      highlight: { ...hl(['RUS'], '#D63B3B'), ...hl(['GEO'], '#5DAE7C') },
      labels: [
        label('RUS', '#D63B3B'),
        label('GEO', '#5DAE7C'),
        { name: 'Tbilisi', lat: 41.7, lng: 44.8, color: '#5DAE7C', offsetY: -24 },
      ] },
    transition: 'slide' },

  // 2014: Annexation of Crimea → zoom on Crimea/Ukraine
  { component: S06_TL2014,
    globe: { lat: 45, lng: 34, zoom: 2.4, autoRotate: false,
      highlight: { ...hl(['UKR'], '#E5A84B'), ...hl(['RUS'], '#D63B3B') },
      labels: [
        label('UKR', '#E5A84B'),
        { name: 'Crimea', lat: 45, lng: 34, color: '#D63B3B', offsetY: -26 },
        { name: 'Sevastopol', lat: 44.6, lng: 33.5, color: '#D63B3B', offsetY: -20 },
      ] },
    transition: 'slide' },

  // 2017: NotPetya → focus Ukraine
  { component: S06_TL2017,
    globe: { lat: 50, lng: 31, zoom: 2.2, autoRotate: false,
      highlight: hl(['UKR'], '#E5A84B'),
      labels: [
        { name: '🇺🇦 Ukraine', lat: 47, lng: 34, color: '#E5A84B', offsetY: -32 },
        { name: 'Kyiv', lat: 50.4, lng: 30.5, color: '#E5A84B', offsetY: -20 },
      ] },
    transition: 'slide' },

  // 2022: Full-scale invasion → Ukraine + Russia, wide view
  { component: S06_TL2022,
    globe: { lat: 48, lng: 36, zoom: 2.0, autoRotate: false,
      highlight: { ...hl(['UKR'], '#E5A84B'), ...hl(['RUS'], '#D63B3B') },
      labels: [
        label('UKR', '#E5A84B'),
        label('RUS', '#D63B3B'),
      ] },
    transition: 'slide' },

  // 2024: Fleet destroyed → Black Sea focus
  { component: S06_TL2024,
    globe: { lat: 45, lng: 34, zoom: 2.0, autoRotate: false,
      highlight: { ...hl(['UKR'], '#E5A84B'), ...hl(['RUS'], '#D63B3B') },
      labels: [
        { name: 'Crimea', lat: 45, lng: 34, color: '#D63B3B', offsetY: -26 },
        { name: 'Sevastopol', lat: 44.6, lng: 33.5, color: '#D63B3B', offsetY: -16 },
        { name: 'Black Sea', lat: 42.5, lng: 35, offsetY: -22 },
      ] },
    transition: 'slide' },

  // 2025: EU Strategy + TurkStream → Turkey/Black Sea
  { component: S06_TL2025,
    globe: { lat: 43, lng: 32, zoom: 2.2, autoRotate: false,
      highlight: { ...hl(['TUR'], '#E8715A'), ...BLACK_SEA_6 },
      labels: [
        label('TUR', '#E8715A'),
        { name: 'TurkStream', lat: 42, lng: 30, color: '#E8715A', offsetY: -24 },
      ] },
    transition: 'slide' },

  // --- PART II: ACTORS ---
  { component: S07_PartIIDivider,
    globe: { lat: 43, lng: 34, zoom: 1.4, autoRotate: false,
      highlight: BLACK_SEA_6 },
    transition: 'dramatic' },

  // Actors — one slide per key player
  { component: S08_ActorRussia,
    globe: { lat: 56, lng: 40, zoom: 2.2, autoRotate: false,
      highlight: hl(['RUS'], '#D63B3B'),
      labels: [
        label('RUS', '#D63B3B'),
        { name: 'Moscow', lat: 55.8, lng: 37.6, color: '#D63B3B', offsetY: -30 },
      ] },
    transition: 'slide' },
  { component: S08_ActorNATO,
    globe: { lat: 44, lng: 28, zoom: 1.8, autoRotate: false,
      highlight: hl(['ROU', 'BGR', 'TUR'], '#5B9BD5'),
      labels: [
        label('ROU', '#5B9BD5'),
        label('BGR', '#5B9BD5'),
        label('TUR', '#5B9BD5'),
      ] },
    transition: 'slide' },
  { component: S08_ActorEU,
    globe: { lat: 44, lng: 24, zoom: 1.8, autoRotate: false,
      highlight: hl(['ROU', 'BGR'], '#5DAE7C'),
      labels: [
        label('ROU', '#5DAE7C'),
        label('BGR', '#5DAE7C'),
      ] },
    transition: 'slide' },
  { component: S08_ActorTurkey,
    globe: { lat: 39, lng: 32, zoom: 2.5, autoRotate: false,
      highlight: hl(['TUR'], '#E8715A'),
      labels: [
        label('TUR', '#E8715A'),
        { name: 'Bosphorus', lat: 41, lng: 29, color: '#E8715A', offsetY: -28 },
      ] },
    transition: 'slide' },
  { component: S08_ActorChina,
    globe: { lat: 35, lng: 80, zoom: 1.2, autoRotate: false,
      highlight: hl(['CHN', 'GEO'], '#5DAE7C'),
      labels: [
        label('CHN', '#5DAE7C'),
        label('GEO', '#5DAE7C'),
      ] },
    transition: 'slide' },

  // --- PART III: TEN RISKS ---
  { component: S09_PartIIIDivider,
    globe: { lat: 43, lng: 34, zoom: 1.4, autoRotate: false,
      highlight: BLACK_SEA_6 },
    transition: 'dramatic' },

  // Ten Risks overview
  { component: S10_TenRisks,
    globe: { lat: 43, lng: 34, zoom: 2.0, autoRotate: false,
      highlight: BLACK_SEA_6 },
    transition: 'slide' },

  // Wars — ZOOM INTO UKRAINE
  { component: S11_Wars,
    globe: { lat: 46, lng: 34, zoom: 2.8, autoRotate: false,
      highlight: { ...hl(['UKR'], '#E5A84B'), ...hl(['RUS'], '#D63B3B') },
      labels: [
        label('UKR', '#E5A84B'),
        label('RUS', '#D63B3B'),
      ] },
    transition: 'country-focus' },

  // Expropriation — ZOOM INTO RUSSIA
  { component: S12_Expropriation,
    globe: { lat: 56, lng: 40, zoom: 2.2, autoRotate: false,
      highlight: hl(['RUS'], '#D63B3B'),
      labels: [label('RUS', '#D63B3B')] },
    transition: 'country-focus' },

  // Energy — ZOOM INTO TURKEY/TURKSTREAM
  { component: S13_Energy,
    globe: { lat: 43, lng: 33, zoom: 2.5, autoRotate: false,
      highlight: { ...hl(['TUR'], '#E8715A'), ...hl(['RUS'], '#D63B3B') },
      labels: [
        label('TUR', '#E8715A'),
        { name: 'TurkStream', lat: 42, lng: 30, color: '#E8715A', offsetY: -24 },
        { name: 'Bosphorus', lat: 41, lng: 29, color: '#E8715A', offsetY: -16 },
      ] },
    transition: 'country-focus' },

  // Food — Black Sea region (grain routes)
  { component: S14_Food,
    globe: { lat: 44, lng: 33, zoom: 2.2, autoRotate: false,
      highlight: { ...hl(['UKR'], '#E5A84B'), ...hl(['RUS'], '#D63B3B') },
      labels: [
        label('UKR', '#E5A84B'),
        { name: 'Odesa', lat: 46.5, lng: 30.7, color: '#E5A84B', offsetY: -22 },
      ] },
    transition: 'country-focus' },

  // Cyber — pull back (NotPetya was global)
  { component: S15_Cyber,
    globe: { lat: 48, lng: 32, zoom: 1.6, autoRotate: false,
      highlight: BLACK_SEA_6 },
    transition: 'slide' },

  // Quote — Black Sea centered
  { component: S16_Quote,
    globe: { lat: 43, lng: 34, zoom: 2.5, autoRotate: false,
      highlight: BLACK_SEA_6 },
    transition: 'zoom-in' },

  // --- PART IV: MEASURING RISK ---
  { component: S17_PartIVDivider,
    globe: { lat: 43, lng: 34, zoom: 1.4, autoRotate: false,
      highlight: BLACK_SEA_6 },
    transition: 'dramatic' },

  // GPR Chart — overview
  { component: S18_GPRChart,
    globe: { lat: 43, lng: 34, zoom: 2.0, autoRotate: false,
      highlight: BLACK_SEA_6 },
    transition: 'slide' },

  // Ratings — see all rated countries
  { component: S19_Ratings,
    globe: { lat: 43, lng: 34, zoom: 2.2, autoRotate: false,
      highlight: BLACK_SEA_6 },
    transition: 'slide' },

  // --- PART V: BUSINESS IMPACT ---
  { component: S20_PartVDivider,
    globe: { lat: 43, lng: 34, zoom: 1.4, autoRotate: false,
      highlight: BLACK_SEA_6 },
    transition: 'dramatic' },

  // Shipping — Constanta & Danube Corridor
  { component: S21_Shipping,
    globe: { lat: 45, lng: 28, zoom: 2.4, autoRotate: false,
      highlight: { ...hl(['ROU'], '#5B9BD5'), ...hl(['UKR'], '#E5A84B') },
      labels: [
        label('ROU', '#5B9BD5'),
        { name: 'Constanta', lat: 44.2, lng: 28.6, color: '#5B9BD5', offsetY: -22 },
        { name: 'Danube Corridor', lat: 45.3, lng: 29.5, color: '#5B9BD5', offsetY: -18 },
      ] },
    transition: 'country-focus' },

  // FDI — ZOOM INTO ROMANIA/BULGARIA
  { component: S22_FDI,
    globe: { lat: 44, lng: 27, zoom: 2.8, autoRotate: false,
      highlight: { ...hl(['ROU'], '#5B9BD5'), ...hl(['BGR'], '#8B6DB0') },
      labels: [
        label('ROU', '#5B9BD5'),
        label('BGR', '#8B6DB0'),
      ] },
    transition: 'country-focus' },

  // --- PART VI: UAMR FRAMEWORK ---
  { component: S23_PartVIDivider,
    globe: { lat: 43, lng: 34, zoom: 1.4, autoRotate: false,
      highlight: BLACK_SEA_6 },
    transition: 'dramatic' },

  // UAMR Framework — overview
  { component: S24_UAMR,
    globe: { lat: 43, lng: 34, zoom: 1.8, autoRotate: false,
      highlight: BLACK_SEA_6 },
    transition: 'slide' },

  // Conclusion — Black Sea centered
  { component: S25_Conclusion,
    globe: { lat: 43, lng: 34, zoom: 2.2, autoRotate: false,
      highlight: BLACK_SEA_6 },
    transition: 'slide' },

  // Sources — pull back
  { component: S26_Sources,
    globe: { lat: 43, lng: 34, zoom: 1.4, autoRotate: false,
      highlight: BLACK_SEA_6 },
    transition: 'slide' },

  // --- THANK YOU ---
  { component: S27_ThankYou,
    globe: { lat: 42, lng: 34, zoom: 1.2, autoRotate: true,
      highlight: BLACK_SEA_6 },
    transition: 'zoom-in' },
]
