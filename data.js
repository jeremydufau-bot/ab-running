// data.js — AB Running Loisir (configuration statique)
// Les données dynamiques (programme, séances, infosClub, objectifs,
// calFixed, socleConfig) sont stockées dans Firebase Firestore.

// ── Variables globales (remplies par Firebase + main.js) ──
let programme = [
  // ── REPRISE (S1–S4, fin août–sept. 2026) ─────────────────────────────────
  // Méthode Foster. UA cible : 1450 → 1770 → 1975 → 1150 (décharge)
  // Mardi: VC→VC→VL  |  Jeudi: Côtes→Côtes→VL  |  Sam S2 opt, S3 obligatoire
  {s:1,  p:'Reprise',          m:'S107', j:'S043',                                    wr:'SR090', wt:'TM090'},
  {s:2,  p:'Reprise',          m:'S108', j:'S046',            sam:'M04',              wr:'SR090', wt:'TM120'},
  {s:3,  p:'Reprise',          m:'S116', j:'S020',            sam:'trail_montagne_decouverte', wr:'SR090', wt:'TM120'},
  {s:4,  p:'Reprise',          m:'S107', j:'S043',                                    wr:'sortie_recup', wt:'sortie_recup', d:true},
  // ── BASE ROUTE (S5–S8, oct. 2026) ────────────────────────────────────────
  // UA cible : 1770 → 2040 → 2345 → 1240 (décharge)
  // Mardi: VC→VC→VL  |  Jeudi: VL→VL→Seuil  |  Sam S2 opt, S3 obligatoire
  {s:5,  p:'Base route',       m:'S101', j:'S117',                                    wr:'SR090', wt:'TM120'},
  {s:6,  p:'Base route',       m:'S102', j:'S021',            sam:'M02',              wr:'SR120', wt:'TM150'},
  {s:7,  p:'Base route',       m:'S021', j:'S134',            sam:'sortie_trail_col', wr:'SR090', wt:'TM120'},
  {s:8,  p:'Base route',       m:'S108', j:'S020',                                    wr:'sortie_recup', wt:'sortie_recup', d:true},
  // ── BASE (S9–S12, oct.–nov. 2026) ────────────────────────────────────────
  // UA cible : 1985 → 2298 → 2620 → 1310 (décharge)
  // Mardi: VC→VC→VL  |  Jeudi: VL→VL→Seuil  |  Sam S2 opt, S3 obligatoire
  {s:9,  p:'Base',             m:'S005', j:'S117',                                    wr:'SR120', wt:'TM150'},
  {s:10, p:'Base',             m:'S012', j:'S021',            sam:'M03',              wr:'SR120', wt:'TM180'},
  {s:11, p:'Base',             m:'S027', j:'S134',            sam:'seuil_montagne_bloc', wr:'SR150', wt:'TM240'},
  {s:12, p:'Base',             m:'S102', j:'S116',                                    wr:'sortie_recup', wt:'sortie_recup', d:true},
  // ── BASE (S13–S16, nov.–déc. 2026) ───────────────────────────────────────
  // UA cible : 2444 → 2760 → 2975 → 1280 (décharge)
  // Mardi: VC→VC→Seuil  |  Jeudi: Seuil→VL→VL→Côtes  |  Sam S2 opt, S3 obligatoire
  {s:13, p:'Base',             m:'S001', j:'S135',                                    wr:'SR150', wt:'TM210'},
  {s:14, p:'Base',             m:'S012', j:'S022',            sam:'M01',              wr:'SR150', wt:'TM270'},
  {s:15, p:'Base',             m:'S035', j:'S023',            sam:'seuil_montagne_bloc', wr:'SR150', wt:'TM300'},
  {s:16, p:'Base',             m:'S101', j:'S046',                                    wr:'sortie_recup', wt:'sortie_recup', d:true},
  // ── TRÊVE NOËL (S17, déc. 2026) ──────────────────────────────────────────
  {s:17, p:'Trêve Noël',       m:'sortie_recup', j:'sortie_recup',                    wr:'SR060', wt:'TM090', d:true, n:'Trêve de Noël — entraînement libre'},
  // ── BASE HIVER (S18–S20, jan. 2027) ──────────────────────────────────────
  // UA cible : 2210 → 2600 → 2865 — bloc 3 semaines, reprise progressive post-trêve
  // Mardi: VC→VC→Seuil  |  Jeudi: VL→VL→Seuil  |  Sam S2 opt, S3 obligatoire
  {s:18, p:'Base',             m:'S011', j:'S020',                                    wr:'SR150', wt:'TM210'},
  {s:19, p:'Base',             m:'S002', j:'S117',            sam:'M02',              wr:'SR150', wt:'TM240'},
  {s:20, p:'Base',             m:'S036', j:'S135',            sam:'X03',              wr:'SR180', wt:'TM270'},
  // ── BLOC CROSS (S21–S24, jan.–fév. 2027) ──────────────────────────────────
  // UA cible : 2385 → 2760 → 3035 → 1270 (décharge)
  // Mardi: Côtes→Côtes→VL(pyramide)  |  Jeudi: Côtes→Côtes→Seuil
  // S22 sam opt: Descente Technique  |  S23 sam obligatoire: KV Simulation
  {s:21, p:'Bloc cross',       m:'S044', j:'S047',                                    wr:'SR150', wt:'TM210'},
  {s:22, p:'Bloc cross',       m:'S045', j:'S048',            sam:'D01',              wr:'SR150', wt:'TM240'},
  {s:23, p:'Bloc cross',       m:'S026', j:'S134',            sam:'kv_simulation',    wr:'SR150', wt:'TM330'},
  {s:24, p:'Bloc cross',       m:'S043', j:'S046',                                    wr:'sortie_recup', wt:'sortie_recup', d:true},
  // ── SPÉCIFIQUE 1 (S25–S28, fév.–mars 2027) ───────────────────────────────
  // UA cible : 2764 → 3015 → 3275 → 1425 (décharge)
  // Mardi: VC→VC→VL(pyramide)  |  Jeudi: Seuil→Seuil→AM
  // S26 sam opt: Descente Technique  |  S27 sam obligatoire: Seuil Montagne
  {s:25, p:'Spécifique',       m:'S001', j:'S035',                                    wr:'SR150', wt:'TM270'},
  {s:26, p:'Spécifique',       m:'S003', j:'S036',            sam:'D01',              wr:'SR150', wt:'TM300'},
  {s:27, p:'Spécifique',       m:'S026', j:'S038',            sam:'seuil_montagne_bloc', wr:'SR180', wt:'TM360'},
  {s:28, p:'Spécifique',       m:'S001', j:'S034',                                    wr:'sortie_recup', wt:'sortie_recup', d:true},
  // ── SPÉCIFIQUE 2 (S29–S32, mars–avr. 2027) ───────────────────────────────
  // UA cible : 3115 → 3400 → 3695 → 1370 (décharge)
  // Mardi: VC→VL→VC(vol+)  |  Jeudi: AM→AM→Seuil
  // S30 sam opt: Relance Crête  |  S31 sam obligatoire: Descente Engagée
  {s:29, p:'Spécifique',       m:'S008', j:'S039',                                    wr:'SR180', wt:'TM300'},
  {s:30, p:'Spécifique',       m:'S026', j:'S040',            sam:'X01',              wr:'SR180', wt:'TM330'},
  {s:31, p:'Spécifique',       m:'S013', j:'S036',            sam:'D02',              wr:'SR180', wt:'TM420'},
  {s:32, p:'Spécifique',       m:'S005', j:'S029',                                    wr:'sortie_recup', wt:'sortie_recup', d:true},
  // ── AFFÛTAGE (S33–S34, avr. 2027) ────────────────────────────────────────
  {s:33, p:'Affûtage',         m:'S035', j:'S041',                                    wr:'SR180', wt:'TM300'},
  {s:34, p:'Affûtage',         m:'vitesse_5x100_veille', j:'S034',                    wr:'sortie_recup', wt:'sortie_recup', d:true},
  // ── COMPÉTITION (S35–S40, avr.–mai 2027) ─────────────────────────────────
  {s:35, p:'Compétition',      m:'S005', j:'S041',                                    wr:'SR120', wt:'TM240'},
  {s:36, p:'Compétition',      m:'vitesse_5x100_veille', j:'sortie_recup',            wr:'—', wt:'—', d:true, n:'Course le weekend'},
  {s:37, p:'Compétition',      m:'S012', j:'S029',                                    wr:'SR150', wt:'TM270'},
  {s:38, p:'Compétition',      m:'S107', j:'sortie_recup',                            wr:'sortie_recup', wt:'sortie_recup', d:true},
  {s:39, p:'Compétition',      m:'S005', j:'S034',                                    wr:'SR150', wt:'TM300'},
  {s:40, p:'Compétition',      m:'vitesse_5x100_veille', j:'sortie_recup',            wr:'—', wt:'—', d:true, n:'Course le weekend'},
  // ── DÉVELOPPEMENT (S41–S44, mai–juin 2027) ───────────────────────────────
  // UA cible : 3194 → 3530 → 3995 → 1310 (décharge)
  // Mardi: VC→VC→Côtes  |  Jeudi: Seuil→Seuil→Côtes
  // S42 sam opt: Relance Crête  |  S43 sam obligatoire: Descente Engagée (CHOC)
  {s:41, p:'Développement',    m:'S001', j:'S135',                                    wr:'SR180', wt:'TM360'},
  {s:42, p:'Développement',    m:'S002', j:'S033',            sam:'X01',              wr:'SR180', wt:'TM420'},
  {s:43, p:'Développement',    m:'S047', j:'S050',            sam:'D02',              wr:'SR180', wt:'TM480'},
  {s:44, p:'Développement',    m:'S011', j:'S020',                                    wr:'sortie_recup', wt:'sortie_recup', d:true},
  // ── SPÉCIFIQUE TRAIL (S45–S48, juin–juil. 2027) ──────────────────────────
  // UA cible : 3322 → 3635 → 3950 → 1360 (décharge) — PIC SAISON juillet
  // Mardi: Côtes→Côtes→Seuil  |  Jeudi: Trail→Trail→Côtes
  // S46 sam opt: Terrain Vallonn  |  S47 sam obligatoire: Descente Engagée (PEAK)
  {s:45, p:'Spécifique trail', m:'S050', j:'circuit_douves',                          wr:'SR180', wt:'TM390'},
  {s:46, p:'Spécifique trail', m:'S049', j:'fartlek_pyramid_girouettes', sam:'X02',   wr:'SR180', wt:'TM420'},
  {s:47, p:'Spécifique trail', m:'S035', j:'S050',            sam:'D03',              wr:'SR180', wt:'TM480'},
  {s:48, p:'Spécifique trail', m:'S043', j:'circuit_douves',                          wr:'sortie_recup', wt:'sortie_recup', d:true},
  // ── AFFÛTAGE TRAIL (S49–S50, juil. 2027) ─────────────────────────────────
  {s:49, p:'Affûtage',         m:'S044', j:'cote_1min30',                             wr:'SR120', wt:'TM240'},
  {s:50, p:'Affûtage',         m:'vitesse_5x100_veille', j:'sortie_recup',            wr:'sortie_recup', wt:'sortie_recup', d:true},
  // ── COUPURE (S51–S52, août 2027) ─────────────────────────────────────────
  {s:51, p:'Coupure',          m:'sortie_recup', j:'sortie_recup',                    wr:'SR060', wt:'TM090', d:true},
  {s:52, p:'Coupure',          m:'sortie_recup', j:'sortie_recup',                    wr:'SR060', wt:'TM090', d:true},
];
let seancesData = {};
let socleConfig = { lundi:{dur:60,rpe:4}, mercredi:{dur:50,rpe:3}, weRoute:{dur:60,rpe:4}, weTrail:{dur:90,rpe:4} };

// ── Progression des sorties longues sur mesure ──────────────────────────────
// Durée (minutes) et D+ trail par semaine de saison.
// La durée augmente progressivement : ~2h en sept → 5-6h en juillet.
// Semaines de décharge (d:true) n'ont pas d'entrée → elles utilisent sortie_recup.
// dur_r = durée route (min), dur_t = durée trail (min), dplus_t = D+ trail (m)
const slProgression = {
  // ── REPRISE (S1–S3, sept. 2026) ── 1h30 route · 2h→2h30 trail ──────────────────
  1:  { dur_r:  90, dur_t: 120, dplus_t:  200, note: 'Reprise — 1h30 route · 2h trail' },
  2:  { dur_r:  90, dur_t: 150, dplus_t:  300, note: '1h30 route · 2h30 trail' },
  3:  { dur_r:  90, dur_t: 150, dplus_t:  400, note: '1h30 route · 2h30 trail' },
  // ── BASE ROUTE (S5–S6, oct. 2026) ── 1h45 route · 2h30→3h trail ─────────────────
  5:  { dur_r: 105, dur_t: 150, dplus_t:  400, note: '1h45 route · 2h30 trail' },
  6:  { dur_r: 105, dur_t: 180, dplus_t:  500, note: '1h45 route · 3h trail' },
  // ── DÉVELOPPEMENT AUTOMNE (S9–S11, nov. 2026) ── 2h route · 3h→3h30 trail ───────
  9:  { dur_r: 105, dur_t: 180, dplus_t:  500, note: 'Reprise — 1h45 route · 3h trail' },
  10: { dur_r: 120, dur_t: 180, dplus_t:  600, note: '2h route · 3h trail' },
  11: { dur_r: 120, dur_t: 210, dplus_t:  700, note: 'Choc — 2h route · 3h30 trail' },
  // ── TRANSITION HIVER (S13–S14, déc. 2026) ── 2h route · 3h→3h30 trail ──────────
  13: { dur_r: 105, dur_t: 180, dplus_t:  600, note: 'Retour post-décharge — 1h45 route · 3h trail' },
  14: { dur_r: 120, dur_t: 210, dplus_t:  700, note: '2h route · 3h30 trail' },
  // ── CONSTRUCTION HIVER (S17–S18, janv. 2027) ── 2h route · 3h30→4h trail ────────
  17: { dur_r: 120, dur_t: 210, dplus_t:  700, note: 'Reprise janvier — 2h route · 3h30 trail' },
  18: { dur_r: 120, dur_t: 240, dplus_t:  800, note: '2h route · 4h trail' },
  // ── PRÉPA PRINTEMPS (S21–S23, fév. 2027) ── 2h→2h30 route · 3h30→4h30 trail ────
  21: { dur_r: 120, dur_t: 210, dplus_t:  800, note: 'Prépa printemps — 2h route · 3h30 trail' },
  22: { dur_r: 135, dur_t: 240, dplus_t:  900, note: '2h15 route · 4h trail' },
  23: { dur_r: 150, dur_t: 270, dplus_t: 1000, note: 'Choc — 2h30 route · 4h30 trail' },
  // ── PRÉPA TRAIL PRINTEMPS (S25–S26, mars 2027) ── 2h30 route · 4h30→5h trail ────
  25: { dur_r: 150, dur_t: 270, dplus_t: 1000, note: '2h30 route · 4h30 trail' },
  26: { dur_r: 150, dur_t: 300, dplus_t: 1200, note: '2h30 route · 5h trail' },
  // ── DÉVELOPPEMENT TRAIL (S29–S30, avr. 2027) ── 2h30→2h45 route · 5h→5h30 trail ─
  29: { dur_r: 150, dur_t: 300, dplus_t: 1200, note: '2h30 route · 5h trail' },
  30: { dur_r: 165, dur_t: 330, dplus_t: 1400, note: '2h45 route · 5h30 trail' },
  // ── MONTÉE EN PUISSANCE (S33–S34, mai 2027) ── 2h45 route · 5h30→6h trail ───────
  33: { dur_r: 165, dur_t: 330, dplus_t: 1500, note: 'Montée en puissance — 2h45 route · 5h30 trail' },
  34: { dur_r: 165, dur_t: 360, dplus_t: 1800, note: 'CHOC — 2h45 route · 6h trail, 1800m D+' },
  // ── PRÉ-PEAK (S37–S38, juin 2027) ── 2h45→3h route · 6h30→7h trail, 2000m+ D+ ───
  37: { dur_r: 165, dur_t: 390, dplus_t: 2000, note: 'Pré-peak — 2h45 route · 6h30 trail, 2000m D+' },
  38: { dur_r: 180, dur_t: 420, dplus_t: 2200, note: 'CHOC — 3h route · 7h trail, 2200m D+' },
  // ── PEAK TRAIL (S41–S42, juil. 2027) ── 3h route · 7h→8h trail — MAXIMUM ─────────
  41: { dur_r: 180, dur_t: 420, dplus_t: 2200, note: 'Peak — 3h route · 7h trail, 2200m D+' },
  42: { dur_r: 180, dur_t: 480, dplus_t: 2500, note: '🏆 CHOC MAXIMUM — 3h route · 8h trail, 2500m D+' },
  // ── POST-PEAK / RELÂCHE (S45–S47, août 2027) ── descente progressive ──────────────
  45: { dur_r: 150, dur_t: 330, dplus_t: 1500, note: 'Post-peak — 2h30 route · 5h30 trail' },
  46: { dur_r: 120, dur_t: 240, dplus_t: 1000, note: 'Récupération — 2h route · 4h trail' },
  47: { dur_r:  90, dur_t: 180, dplus_t:  600, note: 'Allègement — 1h30 route · 3h trail' },
  // ── FIN DE SAISON (S49–S51, août–sept. 2027) ── coupure progressive ───────────────
  49: { dur_r:  90, dur_t: 150, dplus_t:  500, note: 'Relâche — 1h30 route · 2h30 trail' },
  50: { dur_r:  90, dur_t: 120, dplus_t:  400, note: 'Récupération active' },
  51: { dur_r:  90, dur_t:  90, dplus_t:  200, note: 'Coupure fin de saison — 1h30 route · 1h30 trail' },
};
let infosClub = [
  { id:'msg_default_1', titre:'Bienvenue saison 2025-2026 !', texte:'Entraînements mardi et jeudi à 18h30 au halage. Bonne saison à tous !', type:'info', dateFin:'' }
];
let objectifs = [
  { s:36, nom:'Semi-marathon de Bayonne',       date:'2026-05-10', type:'route' },
  { s:38, nom:'Corrida de Biarritz',             date:'2026-05-24', type:'route' },
  { s:40, nom:'10km du Pays Basque',             date:'2026-06-07', type:'route' },
  { s:46, nom:'Trail des Contrebandiers',        date:'2026-07-19', type:'trail' },
  { s:48, nom:'Kross de Chiberta',               date:'2026-08-02', type:'cross' },
];
let calFixed = [];
let calculateurTextes = {};
let chargeHebdoSeuils = [];

// ── Config statique terrains et phases ──

const terrainLabel = {
  // Catégories génériques v3
  Route:{icon:'🛣️',label:'Route',cls:'tag-sky'},
  Piste:{icon:'🏟️',label:'Piste',cls:'tag-blue'},
  Trail:{icon:'🌲',label:'Trail',cls:'tag-green'},
  // Terrains spécifiques v2 (fallback)
  halage:{icon:'🏞️',label:'Halage',cls:'tag-sky'},
  stades:{icon:'🏟️',label:'Stade / Piste',cls:'tag-blue'},
  intramuros:{icon:'🏘️',label:'Intra-muros',cls:'tag-blue'},
  plage:{icon:'🏖️',label:'Plage',cls:'tag-ocre'},
  chiberta:{icon:'🌲',label:'Forêt Chiberta',cls:'tag-green'},
  floride:{icon:'⛰️',label:'Côte La Floride',cls:'tag-rouge'},
  voulgre:{icon:'⛰️',label:'Côte du Voulgre',cls:'tag-rouge'},
  vw:{icon:'⛰️',label:'Côte VW',cls:'tag-rouge'},
  vvf:{icon:'⛰️',label:'Côte VVF Anglet',cls:'tag-rouge'},
  escaliers:{icon:'🪜',label:'Escaliers Biarritz',cls:'tag-rouge'},
  girouettes:{icon:'🌿',label:'Parc Girouettes',cls:'tag-green'},
  douves:{icon:'🏰',label:'Les Douves',cls:'tag-green'},
  montagne:{icon:'🏔️',label:'Montagne',cls:'tag-ocre'},
};

const phaseMap = {
  'Reprise':{l:'Reprise',c:'rep'},'Base':{l:'Base',c:'base'},'Base route':{l:'Base route',c:'base'},
  'Base trail':{l:'Base trail',c:'prepa'},'Développement':{l:'Développement',c:'dev'},
  'Bloc cross':{l:'Bloc cross',c:'force'},'Spécifique':{l:'Spécifique',c:'precomp'},
  'Spécifique trail':{l:'Spécifique trail',c:'prepa'},'Affûtage':{l:'Affûtage',c:'precomp'},
  'Compétition':{l:'Compétition',c:'event'},'Récupération':{l:'Récupération',c:'recup'},
  'Décharge':{l:'Décharge',c:'recup'},'Transition':{l:'Transition',c:'base'},
  'Trêve Noël':{l:'Trêve Noël',c:'recup'},'Coupure':{l:'Coupure',c:'recup'},
};
const typeLabel = {course:'Course',social:'Social',trail:'Trail',rando:'Rando',interne:'Interne'};
const typeCls = {course:'type-course',social:'type-social',trail:'type-trail',rando:'type-rando',interne:'type-interne'};


// ── DESCRIPTIONS DES PHASES ──
const phaseMusculaireDesc = {
  fondamental: {
    titre: "Phase fondamentale — Sept à Nov",
    desc: "Objectif : apprendre les mouvements, construire une base solide.",
    duree: "45 min",
    freq: "2×/sem"
  },
  force: {
    titre: "Phase force — Déc à Fév",
    desc: "Objectif : développer la force maximale des membres inférieurs.",
    duree: "55–60 min",
    freq: "2×/sem"
  },
  specifique: {
    titre: "Phase spécifique — Mars à Mai",
    desc: "Objectif : transférer la force en puissance trail.",
    duree: "50 min",
    freq: "1–2×/sem"
  },
  competition: {
    titre: "Phase compétition — Juin à Août",
    desc: "Objectif : entretien des acquis sans créer de fatigue.",
    duree: "30–40 min",
    freq: "1×/sem"
  }
};

// ── CIRCUITS D'EXERCICES ──
const circuits = {
  fondamental: {
    corpo: [
      {
        bloc: "Exemple de bloc d'activation",
        exos: [
          { id: "glute_bridge", dose: "3×15" },
          { id: "planche", dose: "3×40 sec" }
        ]
      }
    ],
    elastiques: [],
    salle: []
  },
  force: { corpo: [], elastiques: [], salle: [] },
  specifique: { corpo: [], elastiques: [], salle: [] },
  competition: {
    corpo: [
      {
        bloc: "Entretien léger",
        exos: [
          { id: "squat_pc", dose: "3×10" }
        ]
      }
    ],
    elastiques: [],
    salle: []
  }
};

const exos = {
  // ─── JAMBES ───
  squat_pc: {
    nom:'Squat poids du corps', cat:'jambes', emoji:'🦵',
    muscles:'Quadriceps, fessiers, ischio-jambiers',
    equips:['corpo'],
    description:'Pieds à largeur d\'épaules, orteils légèrement ouverts. Descente en poussant les genoux dans l\'axe des orteils, dos droit, regard devant. Descendre jusqu\'à ce que les cuisses soient parallèles au sol. Remonter en poussant dans le sol.',
    erreurs:'Genoux qui rentrent vers l\'intérieur. Talons qui décollent. Dos qui s\'arrondit.',
    progressions:['Corps : 3×15 lent', 'Corps : 3×12 avec pause 2s en bas', 'Corps : 4×10 lent excentrique (4s descente)', 'KB : goblet squat 3×10 avec kettlebell', 'Barre : back squat 4×8'],
  },
  squat_unipodal: {
    nom:'Squat unipodal (pistol)', cat:'jambes', emoji:'🦵',
    muscles:'Quadriceps, fessiers, stabilisateurs genou',
    equips:['corpo','elastiques','salle'],
    description:'Debout sur une jambe, l\'autre tendue devant. Descendre en contrôle en fléchissant la jambe d\'appui. Dos droit, genou dans l\'axe. Remonter en poussant dans le sol. Commencer avec aide d\'un mur ou TRX.',
    erreurs:'Genou qui s\'effondre vers l\'intérieur. Trop grande inclinaison du tronc. Descente trop rapide.',
    progressions:['Squat assisté avec chaise', 'Box squat unipodal (s\'asseoir sur banc)', 'Pistol partiel', 'Pistol complet poids corps', 'Pistol avec KB ou gilet lesté'],
  },
  fentes: {
    nom:'Fentes avant', cat:'jambes', emoji:'🦵',
    muscles:'Quadriceps, fessiers, ischio-jambiers',
    equips:['corpo','elastiques','salle'],
    description:'Grand pas en avant, genou arrière qui s\'approche du sol sans le toucher. Genou avant dans l\'axe du pied. Remonter en poussant avec la jambe avant. Variante : fentes marchées, fentes bulgares (pied arrière surélevé).',
    erreurs:'Genou avant qui dépasse largement les orteils. Tronc qui s\'incline trop en avant. Manque d\'amplitude.',
    progressions:['Corps : 3×10 chaque', 'Fentes bulgares poids corps', 'Fentes avec haltères ou KB', 'Fentes bulgares avec KB ou barre', 'Fentes marchées avec barre'],
  },
  step_up: {
    nom:'Step-up sur marche', cat:'jambes', emoji:'🦵',
    muscles:'Quadriceps, fessiers, stabilité genou',
    equips:['corpo','elastiques','salle'],
    description:'Poser un pied sur une marche ou un banc (40-50 cm). Monter en poussant uniquement avec cette jambe. La jambe d\'appui au sol ne pousse pas. Contrôler la descente. Excellent pour la proprioception et la force unilatérale.',
    erreurs:'La jambe au sol aide à la montée. Genou qui s\'effondre en descente. Hauteur de marche trop importante au début.',
    progressions:['Marche basse 20cm', 'Marche 40cm', 'Avec haltères ou KB', 'Avec gilet lesté', 'Avec barre'],
  },
  step_down: {
    nom:'Step-down excentrique', cat:'jambes', emoji:'🦵',
    muscles:'Quadriceps (excentrique), genou, contrôle descente',
    equips:['corpo','elastiques','salle'],
    description:'Debout sur une marche sur une jambe. Descendre l\'autre jambe vers le sol EN CONTRÔLE sur 4 secondes. Genoux dans l\'axe. Ne pas poser le pied — remonter dès qu\'il effleure le sol. C\'est LA séance préparation descente trail.',
    erreurs:'Descente trop rapide. Genou qui s\'effondre. Tronc qui bascule excessivement.',
    progressions:['Marche basse 15cm · 3s descente', 'Marche 30cm · 4s descente', 'Marche 40cm · 5s descente', 'Poids cheville · 4s descente', 'KB tenu devant · 4s'],
  },
  rdl_unipodal: {
    nom:'RDL unipodal (soulevé de terre jambe tendue)', cat:'jambes', emoji:'🦵',
    muscles:'Ischio-jambiers, chaîne postérieure, équilibre',
    equips:['corpo','elastiques','salle'],
    description:'Debout sur une jambe. Pencher le tronc en avant en levant la jambe libre en arrière, dos parfaitement droit (colonne neutre). Descendre jusqu\'à sentir l\'étirement des ischios. Remonter lentement. Idéal pour la chaîne postérieure et la proprioception.',
    erreurs:'Dos qui s\'arrondit. Rotation du bassin. Amplitude insuffisante.',
    progressions:['Poids corps · toucher cheville', 'Avec haltère ou KB léger', 'KB moyen chaque main', 'KB lourd unilatéral', 'Barre 2 mains'],
  },
  leg_press: {
    nom:'Leg press', cat:'jambes', emoji:'🦵',
    muscles:'Quadriceps, fessiers, ischio-jambiers',
    equips:['salle'],
    description:'Machine leg press. Pieds à largeur d\'épaules sur la plateforme. Descente contrôlée jusqu\'à 90°, remontée puissante sans verrouiller les genoux. Variante unilatérale très efficace pour les traileurs.',
    erreurs:'Genoux qui s\'effondrent. Dos qui décolle du siège. Amplitude insuffisante.',
    progressions:['Bilatéral · 4×12', 'Bilatéral lourd · 4×8', 'Unilatéral · 3×10', 'Unilatéral lourd · 4×8'],
  },

  // ─── FESSIERS / HANCHES ───
  glute_bridge: {
    nom:'Glute bridge unilatéral', cat:'fessiers', emoji:'🍑',
    muscles:'Fessiers, chaîne postérieure, stabilité bassin',
    equips:['corpo','elastiques','salle'],
    description:'Allongé sur le dos, un pied à plat sur le sol, l\'autre jambe tendue. Pousser le bassin vers le haut en serrant les fessiers. Tenir 1 seconde en haut. Descendre sans poser le bassin. La jambe tendue reste dans l\'axe.',
    erreurs:'Bassin qui penche d\'un côté. Lombaires qui s\'arquent excessivement. Fessier pas contracté en haut.',
    progressions:['Corps : 3×15', 'Corps : pied sur banc', 'Poids sur bassin', 'Hip thrust avec barre et banc', 'Hip thrust lourd'],
  },
  clamshell: {
    nom:'Clamshell (palourde)', cat:'fessiers', emoji:'🍑',
    muscles:'Abducteurs, moyen fessier, stabilité hanche',
    equips:['corpo','elastiques'],
    description:'Allongé sur le côté, hanches et genoux fléchis à 45°. Ouvrir le genou du dessus comme une palourde en gardant les pieds joints. Tenir 1s en haut, descendre en contrôle. Muscle clé pour la stabilité en course et la prévention des douleurs de genou.',
    erreurs:'Bassin qui bascule en arrière. Amplitude trop faible. Mouvement trop rapide.',
    progressions:['Corps : 3×15', 'Élastique léger aux genoux : 3×12', 'Élastique moyen : 3×12', 'Élastique fort : 3×10'],
  },
  abducteurs_debout: {
    nom:'Abduction debout', cat:'fessiers', emoji:'🍑',
    muscles:'Abducteurs, moyen fessier',
    equips:['elastiques','salle'],
    description:'Debout, élastique autour des chevilles ou machine. Lever la jambe sur le côté en gardant le tronc droit. Contrôle du mouvement dans les deux sens. Fondamental pour la stabilité latérale en descente trail.',
    erreurs:'Tronc qui bascule en compensation. Jambe d\'appui qui se fléchit. Amplitude trop faible.',
    progressions:['Élastique cheville · 3×15', 'Élastique moyen · 3×12', 'Machine abducteurs', 'Machine avec charge'],
  },
  monster_walk: {
    nom:'Monster walk (marche latérale)', cat:'fessiers', emoji:'🍑',
    muscles:'Abducteurs, moyen fessier, stabilité dynamique',
    equips:['elastiques'],
    description:'Élastique autour des chevilles ou juste au-dessus des genoux. Semi-squat maintenu tout au long du mouvement. Pas latéraux en gardant la tension dans l\'élastique. 10 pas d\'un côté, 10 de l\'autre. Excellent pour l\'activation avant séance.',
    erreurs:'Élastique qui se relâche. Dos qui se redresse. Amplitude de pas trop faible.',
    progressions:['Élastique léger au-dessus genoux', 'Élastique moyen aux chevilles', 'Combinaison : élastique genoux + chevilles', 'Avec poids cheville'],
  },
  hip_thrust: {
    nom:'Hip thrust avec barre', cat:'fessiers', emoji:'🍑',
    muscles:'Grand fessier, chaîne postérieure',
    equips:['salle'],
    description:'Épaules appuyées sur un banc, barre posée sur le bassin (avec pad). Pieds à plat, largeur d\'épaules. Poussée vers le haut jusqu\'à alignement épaules-hanches-genoux. Serrer les fessiers en haut. Un des meilleurs exercices fessiers qui existe.',
    erreurs:'Lombaires qui s\'arquent. Genoux qui s\'effondrent. Ne pas tenir la contraction en haut.',
    progressions:['Poids corps sur banc', 'Barre vide : 4×12', 'Chargé modéré : 4×10', 'Lourd : 4×8', 'Max : 5×5'],
  },

  // ─── GAINAGE ───
  planche: {
    nom:'Planche frontale', cat:'gainage', emoji:'🧱',
    muscles:'Transverse abdominal, ceinture scapulaire, stabilisation globale',
    equips:['corpo','elastiques','salle'],
    description:'Avant-bras au sol, corps en ligne droite des talons aux épaules. Serrer les abdos, les fessiers. Ne pas laisser les hanches s\'affaisser ni monter. Respiration lente et contrôlée. La qualité prime sur la durée.',
    erreurs:'Hanches qui s\'affaissent. Fessiers trop hauts. Apnée. Regard trop relevé (cervicales).',
    progressions:['20 sec', '40 sec', '60 sec', 'Planche avec déplacement de bras', 'Planche sur bosu ou instabilité'],
  },
  planche_lat: {
    nom:'Planche latérale', cat:'gainage', emoji:'🧱',
    muscles:'Obliques, quadratus lumborum, stabilité latérale',
    equips:['corpo','elastiques','salle'],
    description:'Sur l\'avant-bras et le côté du pied, corps en ligne droite. Hanches levées, pas d\'affaissement. Regard droit devant. Variante évoluée : soulever la hanche en mouvement (dips latéraux).',
    erreurs:'Hanches qui tombent. Rotation du bassin vers l\'avant. Corps non aligné.',
    progressions:['Genoux au sol · 25 sec', 'Pieds · 35 sec', 'Pieds · 50 sec', 'Avec dips latéraux · 10 reps', 'Avec poids cheville sur le côté'],
  },
  dead_bug: {
    nom:'Dead bug', cat:'gainage', emoji:'🧱',
    muscles:'Transverse abdominal, coordination neuro-musculaire',
    equips:['corpo','elastiques','salle'],
    description:'Allongé sur le dos, bras tendus au plafond, hanches et genoux à 90°. Allonger simultanément le bras gauche et la jambe droite sans que le bas du dos se décolle. Revenir. Alterner. Garder les lombaires collées au sol en permanence.',
    erreurs:'Bas du dos qui se soulève. Mouvement trop rapide. Apnée.',
    progressions:['Jambe seule · 3×10', 'Bras + jambe · 3×8', 'Avec KB tenu par la jambe opposée', 'Élastique en résistance'],
  },
  bird_dog: {
    nom:'Bird dog', cat:'gainage', emoji:'🧱',
    muscles:'Érecteurs du rachis, fessiers, stabilité lombaire',
    equips:['corpo','elastiques','salle'],
    description:'À quatre pattes, dos plat (colonne neutre). Allonger simultanément le bras droit et la jambe gauche en maintenant la stabilité du bassin. Tenir 2s. Revenir sans poser, alterner. Le bassin ne doit PAS bouger.',
    erreurs:'Bassin qui bascule d\'un côté. Dos qui s\'arrondit ou se creuse. Montée de la jambe trop haute.',
    progressions:['3×8 alternés lents', '3×10 avec pause 2s', 'Avec poids cheville', 'Avec haltère dans la main'],
  },
  pallof_press: {
    nom:'Pallof press', cat:'gainage', emoji:'🧱',
    muscles:'Anti-rotation du tronc, obliques, gainage global',
    equips:['elastiques','salle'],
    description:'Élastique ou câble fixé sur le côté à hauteur de poitrine. Debout de profil, tenir l\'élastique à 2 mains devant le sternum. Pousser les bras en avant (résistance à la rotation), maintenir 2s, revenir. L\'enjeu est de NE PAS tourner.',
    erreurs:'Rotation du tronc pendant l\'extension. Corps qui penche vers la source de résistance. Mouvement trop rapide.',
    progressions:['Élastique léger · 3×10', 'Élastique moyen · 3×10', 'Câble · 3×10', 'Câble avec rotation ajoutée'],
  },
  gainage_dynamique: {
    nom:'Gainage dynamique (mountain climbers)', cat:'gainage', emoji:'🧱',
    muscles:'Abdos, fléchisseurs de hanche, cardio-musculaire',
    equips:['corpo'],
    description:'Position de pompe. Ramener alternativement les genoux vers la poitrine. Version lente : proprioception et gainage pur. Version rapide : cardio. Pour les traileurs : version lente contrôlée, pas sprint.',
    erreurs:'Hanches qui montent. Dos qui s\'arrondit. Perte d\'alignement.',
    progressions:['Lent : 3×20 sec', 'Modéré : 3×30 sec', 'Avec glissière sous les pieds', 'Avec bosu'],
  },

  // ─── MOLLETS / CHEVILLES ───
  calf_raises: {
    nom:'Calf raises unilatéraux', cat:'mollets', emoji:'👟',
    muscles:'Soléaire, gastrocnémien, tendon d\'Achille',
    equips:['corpo','elastiques','salle'],
    description:'Sur le bord d\'une marche sur une jambe. Descendre le talon le plus bas possible (étirement), puis monter sur la pointe de pied le plus haut possible. Mouvement lent et complet. Essentiel pour prévenir les tendinites achilléennes et les blessures de pied.',
    erreurs:'Mouvement trop rapide. Amplitude incomplète. Ne pas utiliser de marche (amplitude réduite).',
    progressions:['Sol plat · 3×20', 'Marche poids corps · 3×15', 'Marche avec poids cheville', 'Marche avec KB · 3×12', 'Machine debout chargée · 4×12'],
  },
  tibialis: {
    nom:'Renforcement tibial (tibia raises)', cat:'mollets', emoji:'👟',
    muscles:'Tibial antérieur, prévention périostite',
    equips:['corpo','elastiques','salle'],
    description:'Dos au mur, pieds à 30cm du mur. Soulever les avant-pieds le plus haut possible en gardant les talons au sol. Mouvement complet. Souvent négligé, crucial pour prévenir les périostites et les douleurs de shin splints.',
    erreurs:'Amplitude insuffisante. Mouvement trop rapide. Oublier cet exercice.',
    progressions:['3×20 poids corps', 'Élastique sur le dessus du pied · 3×15', 'Machine assis', 'Avec disque sur le pied'],
  },
  cheville_proprio: {
    nom:'Proprioception cheville', cat:'mollets', emoji:'👟',
    muscles:'Stabilisateurs cheville, propriocepteurs',
    equips:['corpo','elastiques'],
    description:'Debout sur une jambe. Fermer les yeux. Tenir 30 secondes. Variante : dessin de l\'alphabet avec la cheville de la jambe libre. Sur surface instable (coussin, bosu) si disponible. La prévention d\'entorse numéro un.',
    erreurs:'Yeux ouverts au début (progression trop rapide). Ne pas faire cet exercice.',
    progressions:['Yeux ouverts · 20s', 'Yeux fermés · 30s', 'Sur coussin yeux ouverts', 'Sur coussin yeux fermés', 'Sur bosu yeux fermés'],
  },

  // ─── PLIOMÉTRIE ───
  squat_jump: {
    nom:'Squat jump', cat:'pliometrie', emoji:'⚡',
    muscles:'Quadriceps, fessiers, développement puissance',
    equips:['corpo','salle'],
    description:'Squat normal, puis explosion vers le haut en sautant le plus haut possible. Réception souple et silencieuse, absorber le choc en fléchissant les genoux. Immédiatement enchaîner le suivant. Simule les appuis en montée.',
    erreurs:'Réception rigide (genoux tendus). Pas d\'amplitude en descente. Bruit à la réception.',
    progressions:['3×8 bas', '4×10 puissant', 'Avec gilet lesté léger', 'Depth jump depuis box'],
  },
  box_jump: {
    nom:'Box jump', cat:'pliometrie', emoji:'⚡',
    muscles:'Explosivité globale membres inférieurs',
    equips:['salle'],
    description:'Debout devant une box (30-60cm). Flexion rapide puis saut explosif sur la box. Réception souple à deux pieds, genoux fléchis. Redescendre en marchant, pas en sautant (protection genou). Variante unilatérale : single-leg box jump.',
    erreurs:'Box trop haute au départ. Redescente en saut. Réception rigide.',
    progressions:['Box 30cm · 3×8', 'Box 40cm · 3×8', 'Box 50cm · 4×6', 'Unilatéral · 3×6'],
  },
  bounding: {
    nom:'Bounding latéral', cat:'pliometrie', emoji:'⚡',
    muscles:'Abducteurs, stabilité d\'atterrissage, puissance latérale',
    equips:['corpo'],
    description:'Saut latéral sur une jambe. Pousser sur la jambe gauche pour sauter vers la droite. Réception sur la jambe droite en absorbant. Tenir 1 seconde stable. Puis repartir. Simule les changements de direction et les traversées de pente.',
    erreurs:'Réception instable. Genou qui s\'effondre à la réception. Amplitude trop faible.',
    progressions:['Amplitude courte · 3×8', 'Amplitude plus grande · 3×10', 'Avec maintien 2s réception', 'En série rapide'],
  },
  drop_jump: {
    nom:'Drop jump (atterrissage depuis hauteur)', cat:'pliometrie', emoji:'⚡',
    muscles:'Réponse élastique, quadriceps excentriques, préparation descente',
    equips:['salle'],
    description:'Se laisser tomber d\'une box (pas sauter, juste lâcher). Atterrissage souple et silencieux, absorber sur 4-5cm de flexion de cheville/genou/hanche. Variante évoluée : enchaîner avec un saut vertical immédiatement après l\'atterrissage (depth jump).',
    erreurs:'Box trop haute. Rigidité à l\'atterrissage. Flexion excessive.',
    progressions:['Box 20cm · 3×8', 'Box 30cm · 3×8', 'Depth jump · 3×6'],
  },

  // ─── ÉTIREMENTS ───
  psoas: {
    nom:'Psoas / fléchisseurs de hanche', cat:'etirements', emoji:'🌿',
    muscles:'Psoas, illiaque, rectus femoris',
    equips:['corpo'],
    description:'En fente basse, genou arrière au sol. Pousser le bassin en avant et légèrement vers le bas. Bras levés ou mains sur le genou avant. Tenir 60 secondes minimum. Un des muscles les plus raccourcis chez les coureurs.',
    erreurs:'Durée trop courte. Dos qui s\'arrondit. Bassin qui ne descend pas.',
    progressions:['60 sec · chaque côté', '90 sec · avec bras levés', 'Sur élévation (pied arrière surélevé)'],
  },
  ischios: {
    nom:'Ischio-jambiers allongé', cat:'etirements', emoji:'🌿',
    muscles:'Ischio-jambiers, nerf sciatique',
    equips:['corpo','elastiques'],
    description:'Allongé sur le dos. Ramener une jambe vers soi en tenant derrière la cuisse (pas le pied). Jambe au sol restant à plat. Tenir 60-90 secondes. Très lent. Respiration profonde pour relâcher la tension.',
    erreurs:'Tenir derrière le mollet ou le pied (trop de tension). Jambe d\'appui qui se lève. Durée trop courte.',
    progressions:['Tenu derrière cuisse', 'Avec élastique au pied', 'Jambe sur mur (legs up the wall)'],
  },
  piriforme: {
    nom:'Piriforme (figure 4)', cat:'etirements', emoji:'🌿',
    muscles:'Piriforme, pelvis, prévention syndrome piriformis',
    equips:['corpo'],
    description:'Allongé. Croiser la cheville droite sur le genou gauche. Tirer la jambe gauche vers la poitrine. Tenir 60 secondes. Le piriforme est souvent à l\'origine des douleurs fessières et sciatiques chez les coureurs.',
    erreurs:'Ne pas maintenir la flexion de hanche. Durée insuffisante. Sauter cet exercice.',
    progressions:['Allongé · 60s', 'Assis au sol', 'Assis sur chaise (facilement faisable au bureau)'],
  },
  mollets_etirement: {
    nom:'Étirement mollets et Achille', cat:'etirements', emoji:'🌿',
    muscles:'Gastrocnémien, soléaire, tendon d\'Achille',
    equips:['corpo'],
    description:'Au mur, jambe arrière tendue (gastrocnémien) ou légèrement fléchie (soléaire + Achille). Les deux variantes sont nécessaires. Tenir 60 secondes chacune. Après chaque séance trail/course.',
    erreurs:'Ne faire qu\'une des deux variantes. Talon qui décolle. Durée trop courte.',
    progressions:['Jambe tendue · 60s', 'Jambe fléchie · 60s', 'Sur marche avec talon qui descend (excentrique + étirement)'],
  },
  bandelette: {
    nom:'Bandelette ilio-tibiale (rouleau)', cat:'etirements', emoji:'🌿',
    muscles:'TFL, bandelette ilio-tibiale, prévention syndrome de l\'essuie-glace',
    equips:['corpo'],
    description:'Allongé sur le côté avec un foam roller sous la cuisse (entre le genou et la hanche latérale). Rouler doucement sur les zones tendues. Pas sur les os. 60-90 secondes par jambe. Douloureux si tendu — c\'est normal et bénéfique.',
    erreurs:'Rouler trop vite. Passer sur le genou directement. Arrêter trop tôt.',
    progressions:['Foam roller · 60s', 'Lacrosse ball sur zones précises', 'Avec plus de poids du corps'],
  },
};

// ── ROUTINES MATIN ──

const joursReveil = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
const joursEmoji = ['🌅','⚡','🌿','🔥','💧','🏔','☀️'];
const joursFocus = ['Mobilité hanche & colonne','Activation & vivacité','Récupération active','Force & stabilité','Cheville & pied','Full body trail','Douceur & étirements'];

const routinesReveil = {
  corpo: [
    // LUNDI — Mobilité hanche & colonne
    [
      { nom:'Cat-cow (chat-vache)', dose:'10 cycles lents', desc:'À quatre pattes. Inspirez en creusant le dos (vache), expirez en arrondissant la colonne et rentrant le menton (chat). Mouvement fluide, vertèbre par vertèbre. Idéal pour déverrouiller la colonne au réveil.' },
      { nom:'Rotation thoracique en position enfant', dose:'8 × chaque côté', desc:'Genoux au sol, bras tendus devant, front au sol. Glisser un bras sous le corps en rotation en suivant la main du regard. Maintenir 2 secondes. La thoracique est souvent bloquée chez les coureurs.' },
      { nom:'World\'s greatest stretch', dose:'5 × chaque côté', desc:'Fente basse, pied avant à plat. Main intérieure au sol. Rotation du bras supérieur vers le plafond, suivre du regard. Puis redresser, talon arrière au sol. L\'exercice de mobilité le plus complet qui existe.' },
      { nom:'Cercles de hanche debout', dose:'10 × chaque sens', desc:'Debout, mains sur les hanches. Grands cercles lents avec le bassin. Maximiser l\'amplitude. Déverrouille progressivement les hanches et les fléchisseurs.' },
      { nom:'Fentes latérales alternées', dose:'10 × chaque côté', desc:'Grand pas latéral, genou fléchi, jambe opposée tendue. Garder le dos droit. Alterner. Étirement de l\'intérieur de la cuisse (adducteurs) souvent négligé.' },
      { nom:'Glute bridge lent × 2', dose:'2×10 · 2s en haut', desc:'Allongé sur le dos, pieds à plat. Monter le bassin lentement, serrer les fessiers 2 secondes, descendre en contrôle. Activer la chaîne postérieure en douceur.' },
    ],
    // MARDI — Activation & vivacité
    [
      { nom:'Jumping jacks légers', dose:'30 secondes', desc:'Sauts légers avec ouverture bras/jambes. Allure modérée. Objectif : faire monter le cœur doucement et réveiller la coordination. Pas d\'intensité.' },
      { nom:'Montées de genoux sur place', dose:'20 secondes × 3', desc:'Alterner les jambes en levant les genoux à hauteur de hanche. Bras qui balancent naturellement. Pause 10s entre chaque. Réveille les fléchisseurs de hanche.' },
      { nom:'Squat sauté bas (demi-squat)', dose:'3×6', desc:'Petit saut depuis demi-squat, réception souple et silencieuse. Amplitude réduite (pas un squat jump plein). Juste pour allumer les réflexes neuromusculaires.' },
      { nom:'Foulées bondissantes sur place', dose:'15 secondes × 2', desc:'Sur place, simuler une foulée de course en exagérant la montée de genou et la poussée de cheville. Bras actifs. Réveille le pattern de course.' },
      { nom:'Talons-fesses', dose:'20 secondes × 2', desc:'Trottiner sur place en ramenant les talons aux fessiers. Focus sur la rapidité de la jambe arrière. Prépare les ischio-jambiers à la contraction rapide.' },
      { nom:'Pompes lentes (ou genoux)', dose:'2×8', desc:'Pompes complètes (ou genoux au sol). Descente en 3 secondes, remontée explosive. Réveil du haut du corps, des triceps, des pectoraux et du gainage.' },
    ],
    // MERCREDI — Récupération active
    [
      { nom:'Rotation de la nuque', dose:'5 × chaque sens', desc:'Lents cercles de la tête. Demi-cercles seulement (pas en arrière complètement). Relâche les tensions cervicales de la nuit et des séances précédentes.' },
      { nom:'Figure 4 au sol (piriforme)', dose:'60 sec × chaque côté', desc:'Allongé sur le dos. Croiser la cheville sur le genou opposé. Tirer la cuisse vers la poitrine. Respirer profondément dans l\'étirement. Muscle clé pour prévenir les douleurs fessières et la sciatique.' },
      { nom:'Torsion lombaire au sol', dose:'45 sec × chaque côté', desc:'Allongé sur le dos, genoux fléchis. Faire tomber les genoux d\'un côté, bras en croix. Épaules qui restent au sol. Déverrouille la jonction lombo-sacrée souvent comprimée après l\'effort.' },
      { nom:'Psoas en fente basse', dose:'60 sec × chaque côté', desc:'Genou arrière au sol, bassin poussé en avant et vers le bas. Bras levés amplifient l\'étirement. Prend du temps à déverrouiller — ne pas raccourcir la durée.' },
      { nom:'Chien tête en bas (downward dog)', dose:'45 secondes × 2', desc:'Position V inversé. Talons qui poussent vers le sol (sans forcer). Tête relâchée. Alterne en fléchissant un genou puis l\'autre. Étire simultanément mollets, ischios, épaules et dos.' },
      { nom:'Papillon assis (adducteurs)', dose:'60 secondes', desc:'Assis, plantes des pieds jointes, genoux vers le sol. Incliner légèrement le tronc en avant. Pression douce des coudes sur les cuisses. Adducteurs souvent négligés en trail.' },
    ],
    // JEUDI — Force & stabilité
    [
      { nom:'Planche frontale progressive', dose:'3 × 30–45 sec', desc:'Avant-bras au sol, corps aligné. Serrer abdos et fessiers. Si facile, soulever alternativement un bras 5 secondes. Récup 20s entre séries.' },
      { nom:'Squat isométrique (chaise)', dose:'3 × 30 sec', desc:'Dos au mur, cuisses parallèles au sol. Tenir sans bouger. Intensité modifiable en changeant l\'angle des genoux. Brûle les quadriceps progressivement.' },
      { nom:'Glute bridge pulsé', dose:'3×15 pulsations rapides', desc:'En position glute bridge haute, faire de petits pulsations vers le haut. Les fessiers restent contractés en permanence. Plus dynamique qu\'un bridge normal, réveille mieux les fibres rapides.' },
      { nom:'Dead bug', dose:'2×10 alternés lents', desc:'Allongé, bras plafond, hanches et genoux à 90°. Étendre bras+jambe opposés en gardant le bas du dos collé au sol. Respiration lente. Le meilleur exercice de gainage fonctionnel.' },
      { nom:'Superman', dose:'2×12 · 2s tenu', desc:'Allongé sur le ventre, bras devant. Soulever simultanément bras et jambes du sol. Tenir 2 secondes. Travaille les extenseurs du dos et les fessiers, souvent sous-sollicités.' },
      { nom:'Step-down poids corps × cheville', dose:'2×8 chaque · lent', desc:'Sur une marche, descente contrôlée sur une jambe en 4 secondes. Protection des genoux en descente. Peut être fait sur une simple marche d\'escalier.' },
    ],
    // VENDREDI — Cheville & pied
    [
      { nom:'Alphabet avec la cheville', dose:'1 × chaque pied', desc:'Assis, tracer les lettres A à Z dans l\'air avec la cheville. Mouvements lents et précis dans toutes les directions. Excellent pour la mobilité et la proprioception de la cheville.' },
      { nom:'Relevés de billes avec les orteils', dose:'2×20 chaque pied', desc:'Assis pieds à plat. Soulever les orteils sans bouger le talon, puis les baisser. Ou ramasser des billes/froissé de papier avec les orteils. Active les muscles intrinsèques du pied.' },
      { nom:'Calf raises bilatéraux', dose:'2×20 · amplitude max', desc:'Debout sur le bord d\'une marche (ou sol). Descendre les talons le plus bas possible, monter le plus haut possible. Mouvement complet et lent. Prévention tendinite achilléenne.' },
      { nom:'Tibial raises (relevé de pied)', dose:'3×20', desc:'Dos au mur, pieds à 30cm. Soulever les avant-pieds le plus haut possible en gardant les talons. Souvent négligé, fondamental contre les périostites (shin splints).' },
      { nom:'Proprioception yeux fermés', dose:'2×30 sec chaque pied', desc:'Debout sur une jambe. Fermer les yeux. Maintenir l\'équilibre 30 secondes. Si trop facile : micro-mouvements de la cheville libre. Protection contre les entorses.' },
      { nom:'Massage plantaire au rouleau', dose:'60 sec chaque pied', desc:'Balle de tennis ou bouteille sous le pied. Rouler lentement de l\'avant vers l\'arrière en appuyant avec le poids du corps. Relâche les fascias plantaires et prévient la fasciite.' },
    ],
    // SAMEDI — Full body trail
    [
      { nom:'Squat sauté puissant', dose:'3×8', desc:'Squat complet, explosion vers le haut, réception souple. Vraie intention dans le saut. La séance la plus dynamique de la semaine — parfaite avant une sortie longue.' },
      { nom:'Fentes marchées', dose:'2×10 chaque jambe', desc:'Fentes en avançant, genou arrière proche du sol. Bras qui balancent en opposition. Amplitude maximale. Simule la foulée de montée en trail.' },
      { nom:'Pompes explosives', dose:'3×8', desc:'Pompes avec poussée explosive — les mains décollent légèrement du sol. Si trop difficile : pompes normales rapides. Réveil du haut du corps et du gainage.' },
      { nom:'Mountain climbers rapides', dose:'3×20 sec', desc:'Position de pompe. Alterner les genoux vers la poitrine rapidement. Cardio et gainage simultanément. Simule les appuis trail rapides.' },
      { nom:'Glute bridge + extension jambe', dose:'2×10 chaque', desc:'En glute bridge, étendre une jambe tendue dans l\'alignement du corps. Tenir 2s. La hanche doit rester haute. Travaille la chaîne postérieure unilatéralement.' },
      { nom:'Gainage latéral + rotation', dose:'2×8 chaque côté', desc:'En planche latérale, passer le bras libre sous le corps en rotation. Amplitude maximale. Gainage + mobilité thoracique combinés.' },
    ],
    // DIMANCHE — Douceur & étirements
    [
      { nom:'Étirement du matin (étoile)', dose:'2 minutes', desc:'Allongé sur le dos, bras et jambes en étoile. Respiration profonde. Juste prendre conscience du corps. Aucun effort musculaire. Permettre aux articulations de se déposer.' },
      { nom:'Genoux à la poitrine', dose:'45 sec × chaque côté', desc:'Allongé sur le dos, ramener un genou vers la poitrine avec les deux mains. Petits cercles du genou. Relâche les lombaires et les hanches après la semaine.' },
      { nom:'Torsion en position couchée', dose:'60 sec × chaque côté', desc:'Genoux fléchis qui tombent d\'un côté, bras en croix. Épaules au sol. Respiration. Déverrouillage de toute la colonne de façon passive.' },
      { nom:'Chien tête en bas tenu', dose:'90 secondes', desc:'V inversé, talons vers le sol. Pas de mouvement. Juste tenir et respirer dans l\'étirement. Progressive : si les talons ne touchent pas, fléchir légèrement les genoux.' },
      { nom:'Psoas passif long', dose:'90 sec × chaque côté', desc:'La version la plus longue du psoas : genou arrière au sol, bassin très bas. Fermer les yeux, respirer dans l\'étirement. Le psoas met 90 secondes à vraiment relâcher.' },
      { nom:'Enfant (child\'s pose)', dose:'2 minutes', desc:'Genoux écartés, bras tendus devant, front au sol. Respiration abdominale profonde. Décompression du bas du dos. La meilleure position finale de toute routine.' },
    ],
  ],
  elastiques: [
    // LUNDI — Mobilité hanche + activation hanches élastique
    [
      { nom:'Cat-cow avec résistance', dose:'10 cycles lents', desc:'À quatre pattes, élastique autour des cuisses. Cat-cow normal mais l\'élastique crée une légère résistance à l\'abduction — active le moyen fessier pendant le mouvement de mobilité.' },
      { nom:'World\'s greatest stretch', dose:'5 × chaque côté', desc:'Fente basse, pied avant à plat. Rotation du bras supérieur vers le plafond. L\'exercice de mobilité le plus complet : hip flexor, thoracique, adducteurs en un seul mouvement.' },
      { nom:'Monster walk activation', dose:'2×10 pas chaque sens', desc:'Élastique au-dessus des genoux, semi-squat maintenu. Pas latéraux. Active le moyen fessier avant toute autre chose. Fondamental pour stabiliser les genoux en descente.' },
      { nom:'Clamshell élastique', dose:'2×15 chaque côté', desc:'Allongé sur le côté, élastique aux genoux. Ouvrir et fermer. Résistance de l\'élastique intensifie le travail du moyen fessier, muscle souvent faible chez les coureurs.' },
      { nom:'Fentes latérales', dose:'10 × chaque côté', desc:'Grand pas latéral, genou fléchi, jambe opposée tendue. Avec élastique aux chevilles si disponible. Adducteurs + fessiers en même temps.' },
      { nom:'Glute bridge + élastique', dose:'2×12', desc:'Allongé, élastique au-dessus des genoux. Bridge normal mais pousser les genoux vers l\'extérieur contre l\'élastique pendant tout le mouvement. Double stimulus fessiers.' },
    ],
    // MARDI — Activation & vivacité
    [
      { nom:'Jumping jacks avec élastique aux chevilles', dose:'20 secondes × 2', desc:'Élastique léger aux chevilles. Les sauts sont plus petits mais la résistance active davantage les abducteurs. Récup 15s entre.' },
      { nom:'Montées de genoux résistées', dose:'20 sec × 3', desc:'Élastique autour des chevilles. Montées de genoux en tirant contre la résistance. Renforce les fléchisseurs de hanche — muscles de montée en trail.' },
      { nom:'Squat jump', dose:'3×6', desc:'Sans élastique pour la pliométrie. Petit saut depuis demi-squat, réception souple. Réveil des fibres rapides.' },
      { nom:'Kick-back debout résisté', dose:'2×15 chaque jambe', desc:'Élastique aux chevilles, debout. Étendre la jambe vers l\'arrière contre résistance. Contracté fessiers. Renforce la chaîne postérieure debout, très spécifique montée trail.' },
      { nom:'Abduction debout élastique', dose:'2×15 chaque côté', desc:'Élastique aux chevilles, lever la jambe sur le côté. Contrôle total. Moyen fessier = stabilité du bassin en course = prévention douleurs genou.' },
      { nom:'Pompes normales', dose:'2×10', desc:'Sans élastique. Descente 3s, remontée normale. Réveil du haut du corps.' },
    ],
    // MERCREDI — Récupération active
    [
      { nom:'Figure 4 au sol', dose:'60 sec × chaque côté', desc:'Sans élastique. Piriforme, position allongée. Respirer dans l\'étirement. Récupération passive.' },
      { nom:'Torsion lombaire', dose:'45 sec × chaque côté', desc:'Allongé, genoux tombent d\'un côté. Épaules au sol. Déverrouillage doux.' },
      { nom:'Psoas en fente basse', dose:'60 sec × chaque côté', desc:'Genou arrière au sol. 60 secondes minimum. Le psoas est le muscle qui raccourcit le plus avec la course et la position assise.' },
      { nom:'Mobilité cheville avec élastique', dose:'2 min × chaque cheville', desc:'Élastique autour du bas de jambe fixé bas (porte, pied de meuble). Fente avant pour créer une traction sur la cheville et ouvrir la mobilité antérieure. Très efficace après une longue sortie.' },
      { nom:'Étirement ischio élastique', dose:'60 sec × chaque côté', desc:'Allongé, élastique sous le pied. Tirer la jambe vers le haut tendue. Bien plus efficace que l\'étirement debout car détendu.' },
      { nom:'Chien tête en bas', dose:'60 secondes × 2', desc:'V inversé. Talons vers le sol. Respiration dans l\'étirement. Récup des mollets et ischios.' },
    ],
    // JEUDI — Force & stabilité
    [
      { nom:'Planche frontale', dose:'3 × 40 sec', desc:'Avant-bras au sol, corps aligné. Avec élastique aux chevilles pour intensifier : soulever alternativement une jambe 5 secondes.' },
      { nom:'Squat isométrique avec abduction', dose:'3 × 30 sec', desc:'Chaise au mur, élastique au-dessus des genoux. Pousser les genoux vers l\'extérieur contre l\'élastique pendant tout le maintien. Quadriceps + moyen fessier simultanément.' },
      { nom:'Bird dog avec poids cheville', dose:'2×10 alternés', desc:'À quatre pattes, poids cheville sur la jambe libre. Bird dog standard mais avec résistance sur la jambe. Travail des extenseurs de hanche plus prononcé.' },
      { nom:'Glute bridge unilatéral + élastique', dose:'2×12 chaque', desc:'Un seul pied au sol. Élastique sur les cuisses, pousser vers l\'extérieur. Chaîne postérieure unilatérale + abducteurs = combo parfait trail.' },
      { nom:'Superman avec poids cheville', dose:'2×10 · 2s tenu', desc:'Allongé ventre, poids cheville. Soulever bras et jambes simultanément. Les poids rendent le travail des extenseurs de hanche nettement plus exigeant.' },
      { nom:'Pallof hold (anti-rotation élastique)', dose:'2×20 sec chaque côté', desc:'Élastique fixé sur le côté. Tenir les bras tendus devant sans se laisser tourner. L\'un des meilleurs exercices de gainage fonctionnel trail.' },
    ],
    // VENDREDI — Cheville & pied
    [
      { nom:'Tibial raises avec élastique', dose:'3×20', desc:'Élastique autour du dessus du pied, fixé au sol. Relever le pied contre résistance. Tibial antérieur = prévention périostite numéro un.' },
      { nom:'Alphabet cheville', dose:'1 × chaque pied', desc:'Tracer A à Z dans l\'air avec la cheville. Mobilité complète sans résistance.' },
      { nom:'Calf raises avec résistance élastique', dose:'3×15 chaque', desc:'Élastique autour du pied fixé au sol. Sur la pointe du pied, l\'élastique résiste à la remontée. Amplitude max. Travail du tendon d\'Achille plus intense.' },
      { nom:'Abduction de cheville résistée', dose:'2×20 chaque sens', desc:'Élastique aux chevilles. Mouvements d\'inversion/éversion de la cheville contre résistance. Renforce tous les ligaments latéraux. Prévention entorse.' },
      { nom:'Proprioception yeux fermés', dose:'2×30 sec chaque', desc:'Sur une jambe, yeux fermés. 30 secondes. La meilleure prévention d\'entorse qui existe.' },
      { nom:'Étirement mollets avec élastique', dose:'60 sec × 2 variantes × chaque', desc:'Élastique sous le pied, jambe tendue. Tirer l\'avant du pied vers soi. Variante 1 : jambe tendue (gastro). Variante 2 : genou légèrement fléchi (soléaire + Achille).' },
    ],
    // SAMEDI — Full body trail
    [
      { nom:'Squat sauté puissant', dose:'3×8', desc:'Pas d\'élastique pour la pliométrie. Squat complet, saut explosif, réception souple et silencieuse.' },
      { nom:'Fentes marchées avec élastique', dose:'2×10 chaque jambe', desc:'Élastique autour des cuisses ou chevilles. Fentes marchées normales mais l\'élastique active les abducteurs à chaque pas. Amplitude maximale.' },
      { nom:'Monster walk + squat', dose:'2 × aller-retour 10m', desc:'Monster walk en avançant, puis squat toutes les 3 foulées. Séquence dynamique qui réchauffe tout le bas du corps.' },
      { nom:'Kick-back + abduction combo', dose:'2×10 chaque jambe', desc:'Élastique aux chevilles. Extension de hanche vers l\'arrière, puis abduction latérale. Un seul mouvement par jambe. Très complet pour les fessiers.' },
      { nom:'Pompes explosives', dose:'3×8', desc:'Poussée explosive, mains qui décollent. Si trop difficile : pompes normales rapides. Réveil du haut du corps.' },
      { nom:'Gainage latéral + rotation + poids cheville', dose:'2×8 chaque', desc:'Planche latérale, poids cheville sur la jambe libre. Rotation du bras libre sous le corps. Gainage + mobilité thoracique + résistance = combo avancé.' },
    ],
    // DIMANCHE — Douceur & étirements
    [
      { nom:'Étirement du matin (étoile)', dose:'2 minutes', desc:'Allongé en étoile. Respiration profonde. Aucun effort. Conscience du corps.' },
      { nom:'Genoux à la poitrine', dose:'45 sec × chaque', desc:'Allongé, un genou vers la poitrine. Petits cercles. Lombaires et hanches.' },
      { nom:'Étirement ischio élastique long', dose:'90 sec × chaque côté', desc:'Allongé, élastique sous le pied. Jambe tendue vers le plafond. 90 secondes réelles — les ischios prennent du temps à relâcher en profondeur.' },
      { nom:'Mobilité cheville élastique', dose:'90 sec × chaque côté', desc:'Élastique à la cheville pour traction. Fente avant pour ouvrir la mobilité antérieure. Excellent après une semaine chargée.' },
      { nom:'Psoas passif long', dose:'90 sec × chaque côté', desc:'Genou arrière au sol, bassin très bas. Yeux fermés, respirer. 90 secondes minimum.' },
      { nom:'Enfant (child\'s pose)', dose:'2 minutes', desc:'Genoux écartés, bras tendus, front au sol. Respiration abdominale. Décompression finale.' },
    ],
  ]
};