// data.js — AB Running Loisir v4 (saison 2026-2027)
// Architecture compacte. Tout est dérivé des clés séance.

const infosClub = [
  {
    "id": "msg_1777663095763",
    "titre": "🎉 Bienvenue à la section Running",
    "texte": "",
    "type": "info",
    "dateFin": ""
  },
  {
    "id": "msg_1777665830842",
    "titre": "Apéritif premier mardi du mois !",
    "texte": "",
    "type": "info",
    "dateFin": "2026-05-06"
  },
  {
    "id": "msg_1777734964891",
    "titre": "Méthode Foster",
    "texte": "",
    "type": "info",
    "dateFin": ""
  }
];

const calculateurTextes = {
  "intro": "Cette page te permet de calculer ta charge d'entraînement hebdomadaire. Remplis simplement la durée et le ressenti (RPE) de chacune de tes séances. Les calculs se font automatiquement pour t'aider à visualiser ta charge et à progresser sans te blesser.",
  "rpe_titre": "Qu'est-ce que le RPE ?",
  "rpe_texte": "Le RPE (Rating of Perceived Exertion, ou Effort Perçu) est une note de 1 à 10 que tu donnes à ta séance, une minute après l'avoir terminée. Cette note reflète le ressenti global : facilité respiratoire, fatigue musculaire, difficulté mentale.\n\n1-2 : très facile, comme marcher\n3-4 : facile, allure de conversation\n5-6 : modéré, respiration contrôlée\n7-8 : difficile, parler devient compliqué\n9-10 : très difficile, effort maximal",
  "ua_titre": "Qu'est-ce que l'UA ?",
  "ua_texte": "L'UA (Unité Arbitraire) est une mesure de la charge réelle d'une séance. C'est un simple calcul : UA = RPE × Durée (en minutes).\n\nExemple : une séance de 45 minutes ressentie à 7/10 représente 315 UA.\n\nL'intérêt ? Une semaine avec beaucoup d'UA = charge élevée, une semaine légère = UA bas. En suivant ton total hebdomadaire, tu peux progresser par paliers sans tomber dans le surentraînement.",
  "bloc_titre": "La logique du bloc de 4 semaines",
  "bloc_texte": "Un cycle d'entraînement bien construit suit une progression sur 4 semaines :\n\nSemaine 1 — Base : charge modérée, on pose les fondations.\nSemaine 2 — Montée : +10 à 15% d'UA par rapport à S1.\nSemaine 3 — Pic : +20 à 25% d'UA par rapport à S1 (semaine la plus dure).\nSemaine 4 — Récupération : -40% d'UA pour assimiler le travail.\n\nCette alternance charge/récupération est indispensable pour progresser sans se blesser."
};

const chargeHebdoSeuils = [
  {
    "max": 280,
    "label": "Récupération",
    "couleur": "#7BA098",
    "description": "Récup, reprise, décharge"
  },
  {
    "max": 380,
    "label": "Modérée",
    "couleur": "#7BC3E5",
    "description": "Reprise progressive"
  },
  {
    "max": 480,
    "label": "Soutenue",
    "couleur": "#3A7BBF",
    "description": "Décharge ou base modérée"
  },
  {
    "max": 600,
    "label": "Difficile",
    "couleur": "#1B3A6B",
    "description": "Base ou affûtage"
  },
  {
    "max": 800,
    "label": "Très difficile",
    "couleur": "#E67E22",
    "description": "Développement"
  },
  {
    "max": 1050,
    "label": "Pic",
    "couleur": "#C0392B",
    "description": "Semaine la plus dure"
  },
  {
    "max": 9999,
    "label": "Surcharge",
    "couleur": "#7B1212",
    "description": "Au-delà — surveiller"
  }
];

const terrainLabel = {
  halage:{icon:'🏞️',label:'Halage Adour',cls:'tag-sky'},
  stades:{icon:'🏟️',label:'Stade / Piste',cls:'tag-blue'},
  intramuros:{icon:'🏘️',label:'Intra-muros',cls:'tag-blue'},
  plage:{icon:'🏖️',label:'Plage',cls:'tag-ocre'},
  chiberta:{icon:'🌲',label:'Forêt Chiberta',cls:'tag-green'},
  floride:{icon:'⛰️',label:'Côte La Floride',cls:'tag-rouge'},
  voulgre:{icon:'⛰️',label:'Côte du Voulgre',cls:'tag-rouge'},
  vw:{icon:'⛰️',label:'Côte VW Anglet',cls:'tag-rouge'},
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

// l=label c=cat rpe=display rn=numeric(for UA) d=durée(min) r=route p=piste t=trail v=volume n=notes
const seancesData = {
  "3030": {
    "l": "30\"/30\" classique",
    "c": "VMA courte",
    "rpe": "8-9",
    "rn": 9,
    "d": 70,
    "lieu": "halage",
    "r": "10×30\"/30\" Halage",
    "p": "10×100m/100m piste",
    "t": "10×30\"/30\" sentier",
    "v": "6 reprise · 10 standard · 15 forme",
    "n": "Référence VMA."
  },
  "sortie_recup": {
    "l": "Sortie récup active",
    "c": "Récup",
    "rpe": "2-3",
    "rn": 3,
    "d": 50,
    "lieu": "halage",
    "r": "50min très douce route",
    "p": "—",
    "t": "50min très douce sentier",
    "v": "40min reprise · 50min standard · 1h forme",
    "n": "JAMAIS de pression. Sortie sociale."
  },
  "sortie_longue": {
    "l": "Sortie longue endurance",
    "c": "Endurance",
    "rpe": "3-4",
    "rn": 4,
    "d": 90,
    "lieu": "chiberta",
    "r": "1h30 EF route",
    "p": "—",
    "t": "1h30 EF Chiberta/Douves",
    "v": "1h reprise · 1h30 standard · 2h+ forme",
    "n": "JAMAIS > 80% FCmax. Conversation possible."
  },
  "fartlek": {
    "l": "Fartlek libre",
    "c": "Mixte",
    "rpe": "5-7",
    "rn": 6,
    "d": 45,
    "lieu": "halage",
    "r": "45min libre Halage",
    "p": "—",
    "t": "45min libre sentier",
    "v": "30min reprise · 45min standard · 60min forme",
    "n": "Adapter au terrain et à la sensation."
  },
  "fartlek_structure": {
    "l": "Fartlek structuré 2'/2'",
    "c": "VMA/Seuil",
    "rpe": "6-8",
    "rn": 7,
    "d": 45,
    "lieu": "halage",
    "r": "6×(2' vif/2' trot) Halage",
    "p": "6×(2'/2') piste",
    "t": "6×(2'/2') sentier",
    "v": "4 reprise · 6 standard · 8 forme",
    "n": "Allure identique tous les blocs."
  },
  "fartlek_10x1_1": {
    "l": "Fartlek 10×1'/1'",
    "c": "VMA",
    "rpe": "7-8",
    "rn": 8,
    "d": 45,
    "lieu": "halage",
    "r": "10×(1'/1') Halage",
    "p": "10×(1'/1') piste",
    "t": "10×(1'/1') sentier",
    "v": "6 reprise · 10 standard · 12 forme",
    "n": "Récup ACTIVE obligatoire."
  },
  "fartlek_10x2": {
    "l": "Fartlek 10×2' R~1'",
    "c": "VMA/Seuil",
    "rpe": "7-8",
    "rn": 8,
    "d": 50,
    "lieu": "halage",
    "r": "10×(2'/1') Halage",
    "p": "10×(2'/1') piste",
    "t": "10×(2'/1') sentier",
    "v": "6 reprise · 10 standard · 12 forme",
    "n": "Plus exigeant que 10×1'."
  },
  "fartlek_6x1_x2": {
    "l": "2×(6×1'/1')",
    "c": "VMA",
    "rpe": "7-8",
    "rn": 8,
    "d": 45,
    "lieu": "halage",
    "r": "2×(6×1'/1') R=2' Halage",
    "p": "2×(6×1'/1') piste",
    "t": "2×(6×1'/1') sentier",
    "v": "1 série reprise · 2 standard",
    "n": "Double série — R=2min."
  },
  "fartlek_2x8x30": {
    "l": "2×(8×30\"/30\")",
    "c": "VMA",
    "rpe": "8",
    "rn": 8,
    "d": 40,
    "lieu": "halage",
    "r": "2×(8×30\"/30\") R=2' Halage",
    "p": "2×(8×30\"/30\") piste",
    "t": "2×(8×30\"/30\") sentier",
    "v": "1 série reprise · 2 standard",
    "n": "Qualité sur la 2e série."
  },
  "fartlek_321_x3": {
    "l": "3×(3'2'1') R=2'",
    "c": "VMA/Seuil",
    "rpe": "7-8",
    "rn": 8,
    "d": 50,
    "lieu": "halage",
    "r": "3×(3'2'1') Halage",
    "p": "3×(3'2'1') piste",
    "t": "3×(3'2'1') sentier",
    "v": "2 séries reprise · 3 standard",
    "n": "Pyramide inverse répétée."
  },
  "fartlek_5_8_12_r3": {
    "l": "Fartlek 5'-8'-12' R=3'",
    "c": "Seuil",
    "rpe": "7",
    "rn": 7,
    "d": 50,
    "lieu": "halage",
    "r": "5'+8'+12' Halage",
    "p": "5'+8'+12' piste",
    "t": "5'+8'+12' sentier",
    "v": "Standard · + 5' final forme",
    "n": "Le 12' est le bloc clé."
  },
  "fartlek_3_6_6_3": {
    "l": "Fartlek 3'6'6'3' R~½t",
    "c": "Seuil",
    "rpe": "7",
    "rn": 7,
    "d": 45,
    "lieu": "halage",
    "r": "1 passage Halage",
    "p": "1 passage piste",
    "t": "1 passage sentier",
    "v": "Standard · + 3' forme",
    "n": "Double sommet à 6'."
  },
  "fartlek_1234441321": {
    "l": "Fartlek 1-2-3-4-4-4-3-2-1",
    "c": "VMA/Seuil",
    "rpe": "7-8",
    "rn": 8,
    "d": 55,
    "lieu": "halage",
    "r": "1 passage Halage",
    "p": "1 passage piste",
    "t": "1 passage sentier",
    "v": "Standard · + 1'2'3' forme",
    "n": "Triple bloc à 4'. ~29min."
  },
  "fartlek_5_10_10": {
    "l": "Fartlek 5'-10'-10'",
    "c": "Seuil",
    "rpe": "6-7",
    "rn": 7,
    "d": 50,
    "lieu": "halage",
    "r": "5'+10'+10' Halage",
    "p": "5'+10'+10' piste",
    "t": "5'+10'+10' sentier",
    "v": "Standard · + 5' final forme",
    "n": "3 blocs longs progressifs."
  },
  "30s": {
    "l": "30\"/30\" VMA courte",
    "c": "VMA courte",
    "rpe": "8-9",
    "rn": 9,
    "d": 40,
    "lieu": "halage",
    "r": "10×30\"/30\" Halage",
    "p": "10×100m/100m piste",
    "t": "10×30\"/30\" sentier",
    "v": "6 reprise · 10 standard · 15 forme",
    "n": "Récup trottinée OBLIGATOIRE."
  },
  "45s": {
    "l": "Efforts 45 secondes",
    "c": "VMA courte",
    "rpe": "8-9",
    "rn": 9,
    "d": 40,
    "lieu": "halage",
    "r": "8×45\" R=1'45\" Halage",
    "p": "8×150m R=200m piste",
    "t": "8×45\" sentier",
    "v": "6 reprise · 8 standard · 12 forme",
    "n": "Intermédiaire 30s↔1min."
  },
  "1min": {
    "l": "Efforts 1 minute",
    "c": "VMA courte",
    "rpe": "7-8",
    "rn": 8,
    "d": 45,
    "lieu": "halage",
    "r": "10×1' R=1'45\" Halage",
    "p": "10×400m R=200m piste",
    "t": "10×1' sentier",
    "v": "6 reprise · 10 standard · 14 forme",
    "n": "Base du fractionné court."
  },
  "8x50s_vma": {
    "l": "8×50\" VMA",
    "c": "VMA courte",
    "rpe": "8",
    "rn": 8,
    "d": 40,
    "lieu": "halage",
    "r": "8×50\" R=2' Halage",
    "p": "8×200m R=200m piste",
    "t": "8×50\" sentier",
    "v": "5 reprise · 8 standard · 10 forme",
    "n": "Durée intermédiaire."
  },
  "10x3030_v2": {
    "l": "10×30\"/30\" terrain",
    "c": "VMA",
    "rpe": "8",
    "rn": 8,
    "d": 40,
    "lieu": "halage",
    "r": "10×30\"/30\" Halage",
    "p": "10×100m/100m piste",
    "t": "10×30\"/30\" côte",
    "v": "6 reprise · 10 standard · 15 forme",
    "n": "Variante : peut se faire en côte."
  },
  "interval_court": {
    "l": "Intervalles courts 15-20s",
    "c": "VMA explosive",
    "rpe": "9",
    "rn": 9,
    "d": 40,
    "lieu": "halage",
    "r": "12×20\" R=45\" Halage",
    "p": "12×200m R=200m piste",
    "t": "12×20\" Chiberta",
    "v": "8 reprise · 12 standard · 16 forme",
    "n": "Format Tabata adapté."
  },
  "2x8x8s_r2": {
    "l": "2×(8×8\") R=2'",
    "c": "VMA explosive",
    "rpe": "9",
    "rn": 9,
    "d": 40,
    "lieu": "stades",
    "r": "—",
    "p": "2×(8×8\") piste R=2'",
    "t": "—",
    "v": "8 standard · 12 forme",
    "n": "Neuromusculaire pur."
  },
  "30s_r_decrements": {
    "l": "30\" R=décroissante",
    "c": "VMA",
    "rpe": "8-9",
    "rn": 9,
    "d": 40,
    "lieu": "halage",
    "r": "5×30\" R↓ Halage",
    "p": "5×100m R↓ piste",
    "t": "5×30\" R↓ sentier",
    "v": "3 reprise · 5 standard · 7 forme",
    "n": "Simulation fin de course."
  },
  "45_45_puis_45_30": {
    "l": "5×45\"/45\" + 5×45\"/30\"",
    "c": "VMA",
    "rpe": "8",
    "rn": 8,
    "d": 45,
    "lieu": "halage",
    "r": "5+5 Halage",
    "p": "5+5 piste",
    "t": "5+5 sentier",
    "v": "3+3 reprise · 5+5 standard",
    "n": "Double bloc récup décroissante."
  },
  "8x30_30_r2_6x1_1": {
    "l": "8×30\"/30\" + 6×1'/1'",
    "c": "VMA",
    "rpe": "8",
    "rn": 8,
    "d": 50,
    "lieu": "halage",
    "r": "8+6 Halage",
    "p": "8+6 piste",
    "t": "8+6 sentier",
    "v": "5+4 reprise · 8+6 standard",
    "n": "Double bloc VMA."
  },
  "2x8x30_30_r3": {
    "l": "2×(8×30\"/30\") R=3'",
    "c": "VMA",
    "rpe": "8",
    "rn": 8,
    "d": 40,
    "lieu": "halage",
    "r": "2×(8×30\"/30\") Halage",
    "p": "2×(8×30\"/30\") piste",
    "t": "2×(8×30\"/30\") sentier",
    "v": "1 série reprise · 2 standard",
    "n": "2e série = aussi bonne."
  },
  "2x6x30_30_r130": {
    "l": "2×(6×30\"/30\") R=1'30\"",
    "c": "VMA",
    "rpe": "8",
    "rn": 8,
    "d": 35,
    "lieu": "halage",
    "r": "2×(6×30\"/30\") Halage",
    "p": "2×(6×30\"/30\") piste",
    "t": "2×(6×30\"/30\") sentier",
    "v": "1 série reprise · 2 standard",
    "n": "Version courte du 2×8."
  },
  "2x8x2020": {
    "l": "2×(8×20\"/20\") R=2'",
    "c": "VMA",
    "rpe": "8-9",
    "rn": 9,
    "d": 35,
    "lieu": "halage",
    "r": "2×(8×20\"/20\") Halage",
    "p": "2×(8×20\"/20\") piste",
    "t": "2×(8×20\"/20\") sentier",
    "v": "1 série reprise · 2 standard",
    "n": "Intervalles très courts."
  },
  "5x30_8x1_5x30": {
    "l": "5×30\" + 8×1' + 5×30\"",
    "c": "VMA",
    "rpe": "8",
    "rn": 8,
    "d": 50,
    "lieu": "halage",
    "r": "5+8+5 Halage",
    "p": "5+8+5 piste",
    "t": "5+8+5 sentier",
    "v": "3+5+3 reprise · 5+8+5 standard",
    "n": "Triple bloc symétrique."
  },
  "1min30": {
    "l": "Efforts 1min30",
    "c": "VMA longue",
    "rpe": "7-8",
    "rn": 8,
    "d": 50,
    "lieu": "halage",
    "r": "10×1'30 R=1'30 Halage",
    "p": "10×400m R=200m piste",
    "t": "10×1'30 sentier",
    "v": "5 reprise · 10 standard · 12 forme",
    "n": "Idéal aussi pour côtes VW."
  },
  "2min": {
    "l": "Efforts 2 minutes",
    "c": "VMA longue",
    "rpe": "7-8",
    "rn": 8,
    "d": 50,
    "lieu": "halage",
    "r": "8×2' R=2' Halage",
    "p": "8×600m R=300m piste",
    "t": "8×2' sentier",
    "v": "4 reprise · 8 standard · 10 forme",
    "n": "Transition VMA→seuil."
  },
  "3min": {
    "l": "Efforts 3 minutes",
    "c": "Seuil",
    "rpe": "7",
    "rn": 7,
    "d": 50,
    "lieu": "halage",
    "r": "6×3' R=2' Halage",
    "p": "6×800m R=400m piste",
    "t": "6×3' sentier",
    "v": "3 reprise · 6 standard · 8 forme",
    "n": "Intro travail seuil."
  },
  "4min": {
    "l": "Efforts 4 minutes",
    "c": "Seuil",
    "rpe": "6-7",
    "rn": 7,
    "d": 50,
    "lieu": "halage",
    "r": "5×4' R=2' Halage",
    "p": "5×1000m R=400m piste",
    "t": "5×4' sentier",
    "v": "3 reprise · 5 standard · 6 forme",
    "n": "Allure seuil confort."
  },
  "5min": {
    "l": "Efforts 5 minutes",
    "c": "Seuil",
    "rpe": "6-7",
    "rn": 7,
    "d": 55,
    "lieu": "halage",
    "r": "5×5' R=2'30 Halage",
    "p": "5×1200m R=400m piste",
    "t": "5×5' sentier",
    "v": "2 reprise · 5 standard · 6 forme",
    "n": "Séance clé marathon/trail."
  },
  "6min": {
    "l": "Efforts 6 minutes",
    "c": "Seuil",
    "rpe": "6-7",
    "rn": 7,
    "d": 55,
    "lieu": "halage",
    "r": "4×6' R=3' Halage",
    "p": "4×1500m R=500m piste",
    "t": "4×6' sentier",
    "v": "2 reprise · 4 standard · 5 forme",
    "n": "Gestion allure essentielle."
  },
  "8min": {
    "l": "Efforts 8 minutes",
    "c": "Seuil",
    "rpe": "6",
    "rn": 6,
    "d": 55,
    "lieu": "halage",
    "r": "3×8' R=3' Halage",
    "p": "3×2000m R=600m piste",
    "t": "3×8' sentier",
    "v": "2 reprise · 3 standard · 4 forme",
    "n": "Simulation course."
  },
  "10min": {
    "l": "Efforts 10 minutes",
    "c": "Seuil",
    "rpe": "6",
    "rn": 6,
    "d": 55,
    "lieu": "halage",
    "r": "3×10' R=3' Halage",
    "p": "3×2500m R=600m piste",
    "t": "3×10' sentier",
    "v": "2 reprise · 3 standard · 4 forme",
    "n": "Allure semi-marathon."
  },
  "12min": {
    "l": "Efforts 12 minutes",
    "c": "Seuil",
    "rpe": "6",
    "rn": 6,
    "d": 55,
    "lieu": "halage",
    "r": "2×12' R=4' Halage",
    "p": "2×3000m R=800m piste",
    "t": "2×12' sentier",
    "v": "2 standard · 3 forme",
    "n": "Concentration mentale clé."
  },
  "15min": {
    "l": "Efforts 15 minutes",
    "c": "Seuil",
    "rpe": "5-6",
    "rn": 6,
    "d": 60,
    "lieu": "halage",
    "r": "2×15' R=5' Halage",
    "p": "2×3500m R=800m piste",
    "t": "2×15' sentier",
    "v": "2 standard",
    "n": "Exigeant mentalement."
  },
  "20min": {
    "l": "20 minutes continu",
    "c": "Seuil",
    "rpe": "5-6",
    "rn": 6,
    "d": 55,
    "lieu": "halage",
    "r": "1×20' Halage",
    "p": "1×5000m piste",
    "t": "1×20' sentier",
    "v": "1×20' standard · 2×20' forme",
    "n": "Référence préparation semi."
  },
  "3x15_r5": {
    "l": "3×15' R=5'",
    "c": "Seuil long",
    "rpe": "6-7",
    "rn": 7,
    "d": 65,
    "lieu": "halage",
    "r": "3×15' R=5' Halage",
    "p": "3×15' R=5' piste",
    "t": "3×15' sentier",
    "v": "2×12' reprise · 3×15' standard",
    "n": "La plus exigeante mentalement."
  },
  "8x3_r130": {
    "l": "8×3' R=1'30\"",
    "c": "Seuil",
    "rpe": "7",
    "rn": 7,
    "d": 55,
    "lieu": "halage",
    "r": "8×3' R=1'30\" Halage",
    "p": "8×800m R=400m piste",
    "t": "8×3' sentier",
    "v": "5 reprise · 8 standard",
    "n": "Volume seuil récup courte."
  },
  "3x7_r130": {
    "l": "3×7' R=1'30\"",
    "c": "Seuil",
    "rpe": "7",
    "rn": 7,
    "d": 50,
    "lieu": "halage",
    "r": "3×7' R=1'30\" Halage",
    "p": "3×1800m R=400m piste",
    "t": "3×7' sentier",
    "v": "2 reprise · 3 standard",
    "n": "Seuil moyen récup courte."
  },
  "3x8_r1": {
    "l": "3×8' R=1'",
    "c": "Seuil",
    "rpe": "7",
    "rn": 7,
    "d": 50,
    "lieu": "halage",
    "r": "3×8' R=1' Halage",
    "p": "3×2000m R=300m piste",
    "t": "3×8' sentier",
    "v": "2 reprise · 3 standard",
    "n": "Récup TRÈS courte."
  },
  "5x1000_halage": {
    "l": "5×1000m R~2-3'",
    "c": "Seuil",
    "rpe": "6-7",
    "rn": 7,
    "d": 55,
    "lieu": "halage",
    "r": "5×1000m R=2'30\" Halage",
    "p": "5×1000m R=2'30\" piste",
    "t": "5×1000m Chiberta",
    "v": "3 reprise · 5 standard",
    "n": "Séance reine semi/marathon."
  },
  "4x2000_r2": {
    "l": "4×2000m R=2'",
    "c": "Seuil long",
    "rpe": "6-7",
    "rn": 7,
    "d": 60,
    "lieu": "halage",
    "r": "4×2000m R=2' Halage",
    "p": "4×2000m R=2' piste",
    "t": "4×2000m Chiberta",
    "v": "2 reprise · 4 standard",
    "n": "Chaque 2000m dure ~8-10min."
  },
  "pyramid_1234321": {
    "l": "Pyramide 1-2-3-4-3-2-1",
    "c": "VMA/Seuil",
    "rpe": "7-8",
    "rn": 8,
    "d": 50,
    "lieu": "halage",
    "r": "1 passage Halage",
    "p": "1 passage piste",
    "t": "1 passage sentier",
    "v": "1 standard · + 1'2'3' forme",
    "n": "Monter en intensité sur les longs."
  },
  "pyramid_1246421": {
    "l": "Pyramide 1-2-4-6-4-2-1",
    "c": "VMA/Seuil",
    "rpe": "7-8",
    "rn": 8,
    "d": 55,
    "lieu": "halage",
    "r": "1 passage Halage",
    "p": "1 passage piste",
    "t": "1 passage sentier",
    "v": "1 standard · + 1'2' forme",
    "n": "Le 6' est la clé."
  },
  "pyramid_246642": {
    "l": "Pyramide 2-4-6-6-4-2",
    "c": "Seuil",
    "rpe": "7",
    "rn": 7,
    "d": 55,
    "lieu": "halage",
    "r": "1 passage Halage",
    "p": "1 passage piste",
    "t": "1 passage sentier",
    "v": "1 standard · + 2' forme",
    "n": "Double 6' au sommet (~26min)."
  },
  "pyramid_124641": {
    "l": "Pyramide 1-2-4-6-4-1",
    "c": "VMA/Seuil",
    "rpe": "7-8",
    "rn": 8,
    "d": 50,
    "lieu": "halage",
    "r": "1 passage Halage",
    "p": "1 passage piste",
    "t": "1 passage sentier",
    "v": "1 standard · + 1'2' forme",
    "n": "Montée progressive, descente rapide."
  },
  "allure_marathon": {
    "l": "Sortie allure marathon",
    "c": "Spécifique",
    "rpe": "6-7",
    "rn": 7,
    "d": 75,
    "lieu": "halage",
    "r": "1h15 allure marathon Halage",
    "p": "—",
    "t": "—",
    "v": "45min reprise · 1h15 standard · 1h30 forme",
    "n": "Allure cible conditions réelles."
  },
  "allure_semi": {
    "l": "Sortie allure semi",
    "c": "Spécifique",
    "rpe": "7",
    "rn": 7,
    "d": 60,
    "lieu": "halage",
    "r": "1h allure semi Halage",
    "p": "—",
    "t": "—",
    "v": "30min reprise · 1h standard · 1h15 forme",
    "n": "Halage marqué au km."
  },
  "vitesse_5x100_veille": {
    "l": "5×100m veille course",
    "c": "Activation",
    "rpe": "6-7",
    "rn": 6,
    "d": 30,
    "lieu": "stades",
    "r": "—",
    "p": "5×100m piste",
    "t": "—",
    "v": "4 reprise · 5 standard",
    "n": "JAMAIS épuisant. Réveiller les jambes."
  },
  "vitesse_8x100_5x200": {
    "l": "8×100m + 5×200m",
    "c": "Vitesse",
    "rpe": "8-9",
    "rn": 9,
    "d": 45,
    "lieu": "stades",
    "r": "8x30\"+5x1' r 45\"",
    "p": "8×100m + 5×200m piste r100m",
    "t": "8x30\"+5x1' r 45\"",
    "v": "6+3 reprise · 8+5 standard",
    "n": "Mécanique + endurance vitesse."
  },
  "vitesse_6x300_4x400": {
    "l": "6×300m + 4×400m",
    "c": "Vitesse/VMA",
    "rpe": "8",
    "rn": 8,
    "d": 50,
    "lieu": "stades",
    "r": "—",
    "p": "6×300m + 4×400m piste",
    "t": "—",
    "v": "4+2 reprise · 6+4 standard",
    "n": "Référence puissance aérobie."
  },
  "vitesse_2x6x200": {
    "l": "2×(6×200m) R=3-4'",
    "c": "Vitesse",
    "rpe": "8-9",
    "rn": 9,
    "d": 45,
    "lieu": "stades",
    "r": "—",
    "p": "2×(6×200m) piste",
    "t": "—",
    "v": "1 série reprise · 2 standard",
    "n": "2e série plus difficile. Normal."
  },
  "vitesse_6x100_5x200": {
    "l": "6×100m + 5×200m",
    "c": "Vitesse",
    "rpe": "8-9",
    "rn": 9,
    "d": 45,
    "lieu": "stades",
    "r": "—",
    "p": "6×100m + 5×200m piste",
    "t": "—",
    "v": "4+3 reprise · 6+5 standard",
    "n": "100m active le neuromusculaire."
  },
  "vitesse_6x100_4x200_etc": {
    "l": "6×100+4×200+2×300+1×400",
    "c": "Vitesse/VMA",
    "rpe": "8",
    "rn": 8,
    "d": 50,
    "lieu": "stades",
    "r": "—",
    "p": "Progression piste",
    "t": "—",
    "v": "Demi-vol reprise · complet standard",
    "n": "Volume et distance croissants."
  },
  "piste_10x400_r200": {
    "l": "10×400m R=200m trot",
    "c": "VMA",
    "rpe": "7-8",
    "rn": 8,
    "d": 50,
    "lieu": "stades",
    "r": "10x2' r 1'",
    "p": "10×400m R=200m piste",
    "t": "—",
    "v": "6 reprise · 10 standard",
    "n": "Référence piste. Même allure."
  },
  "piste_10x300_r100": {
    "l": "10×300m R=100m trot",
    "c": "VMA",
    "rpe": "8",
    "rn": 8,
    "d": 45,
    "lieu": "stades",
    "r": "10x1'30 r 45\"",
    "p": "10×300m R=100m piste",
    "t": "—",
    "v": "6 reprise · 10 standard",
    "n": "Récup très courte."
  },
  "piste_10x200_r100": {
    "l": "10×200m R=100m trot",
    "c": "Vitesse-end",
    "rpe": "8-9",
    "rn": 9,
    "d": 40,
    "lieu": "stades",
    "r": "—",
    "p": "10×200m R=100m piste",
    "t": "—",
    "v": "6 reprise · 10 standard",
    "n": "Vitesse-endurance."
  },
  "piste_5x200_5x300_r400": {
    "l": "5×200 + 5×300 R=400m",
    "c": "Vitesse/VMA",
    "rpe": "8",
    "rn": 8,
    "d": 50,
    "lieu": "stades",
    "r": "—",
    "p": "5×200 + 5×300 piste",
    "t": "—",
    "v": "3+3 reprise · 5+5 standard",
    "n": "Distances croissantes."
  },
  "piste_progression_100_500": {
    "l": "5×100+4×200+3×300+2×400+1×500",
    "c": "Vitesse/VMA",
    "rpe": "8",
    "rn": 8,
    "d": 50,
    "lieu": "stades",
    "r": "—",
    "p": "Progression piste",
    "t": "—",
    "v": "Demi-vol reprise · complet standard",
    "n": "Pyramide ~3500m."
  },
  "piste_5x100_4x200_3x300_2x400": {
    "l": "5×100+4×200+3×300+2×400",
    "c": "Vitesse/VMA",
    "rpe": "8",
    "rn": 8,
    "d": 45,
    "lieu": "stades",
    "r": "—",
    "p": "Progression piste",
    "t": "—",
    "v": "Demi-vol reprise · complet standard",
    "n": "Sans le 500m final."
  },
  "cote": {
    "l": "Côtes générique",
    "c": "Force aérobie",
    "rpe": "7-9",
    "rn": 8,
    "d": 50,
    "lieu": "floride",
    "r": "—",
    "p": "—",
    "t": "Selon côte choisie",
    "v": "6 reprise · 10 standard · 14 forme",
    "n": "PPG OBLIGATOIRE avant."
  },
  "cote_20s": {
    "l": "12×20\" côte explosif",
    "c": "VMA explosive",
    "rpe": "9",
    "rn": 9,
    "d": 40,
    "lieu": "floride",
    "r": "—",
    "p": "—",
    "t": "12×20\" Floride section basse",
    "v": "8 reprise · 12 standard · 15 forme",
    "n": "Si puissance baisse → stopper."
  },
  "cote_30s": {
    "l": "Côtes 30s — Floride",
    "c": "Force-vitesse",
    "rpe": "9",
    "rn": 9,
    "d": 45,
    "lieu": "floride",
    "r": "—",
    "p": "—",
    "t": "10×30\" Côte La Floride",
    "v": "6 reprise · 10 standard · 14 forme",
    "n": "Genoux hauts, bras actifs."
  },
  "cote_40s": {
    "l": "Côtes 10×40\" — Floride",
    "c": "Force-vitesse",
    "rpe": "8-9",
    "rn": 9,
    "d": 45,
    "lieu": "floride",
    "r": "—",
    "p": "—",
    "t": "10×40\" Côte La Floride",
    "v": "6 reprise · 10 standard · 12 forme",
    "n": "PPG avant."
  },
  "cote_45s": {
    "l": "Côtes 12×45\" Floride/VW",
    "c": "Force-vitesse",
    "rpe": "8-9",
    "rn": 9,
    "d": 50,
    "lieu": "floride",
    "r": "—",
    "p": "—",
    "t": "12×45\" Floride OU VW",
    "v": "8 reprise · 12 standard · 15 forme",
    "n": "Côte UNIQUE par séance."
  },
  "cote_1min": {
    "l": "Côtes 1' — VW",
    "c": "Force aérobie",
    "rpe": "8-9",
    "rn": 9,
    "d": 50,
    "lieu": "vw",
    "r": "—",
    "p": "—",
    "t": "8×1' Côte VW",
    "v": "5 reprise · 8 standard · 10 forme",
    "n": "Même allure toutes les reps."
  },
  "cote_8x1_vw": {
    "l": "Côtes 8×1' VW variante",
    "c": "Force aérobie",
    "rpe": "8-9",
    "rn": 9,
    "d": 50,
    "lieu": "vw",
    "r": "—",
    "p": "—",
    "t": "8×1' Côte VW",
    "v": "5 reprise · 8 standard · 10 forme",
    "n": "Focus VW."
  },
  "cote_10x1_girouettes": {
    "l": "10×1' R=45\" Girouettes",
    "c": "Force aérobie",
    "rpe": "8",
    "rn": 8,
    "d": 50,
    "lieu": "girouettes",
    "r": "—",
    "p": "—",
    "t": "10×1' Parc Girouettes",
    "v": "6 reprise · 10 standard · 12 forme",
    "n": "Circuit naturel récup courte."
  },
  "cote_1min30": {
    "l": "Côtes 1'30 VW/Voulgre",
    "c": "Force aérobie",
    "rpe": "8",
    "rn": 8,
    "d": 50,
    "lieu": "voulgre",
    "r": "—",
    "p": "—",
    "t": "6×1'30 VW OU Voulgre",
    "v": "4 reprise · 6 standard · 10 forme",
    "n": "Descente : petits pas, genoux fléchis."
  },
  "cote_2min": {
    "l": "Côtes 2' — Voulgre",
    "c": "Force aérobie",
    "rpe": "7-8",
    "rn": 8,
    "d": 50,
    "lieu": "voulgre",
    "r": "—",
    "p": "—",
    "t": "6×2' Côte Voulgre",
    "v": "4 reprise · 6 standard · 8 forme",
    "n": "Phare trail — focus descente."
  },
  "cote_long": {
    "l": "Côtes longues 3-10min",
    "c": "Force aérobie",
    "rpe": "6-8",
    "rn": 7,
    "d": 60,
    "lieu": "montagne",
    "r": "—",
    "p": "—",
    "t": "Côtes Ursuya/Mondarrain",
    "v": "3 reprise · 5 standard · 6 forme",
    "n": "Réservé montagne."
  },
  "cote_vvf_pyramide": {
    "l": "Pyramide VVF Anglet",
    "c": "Force-vitesse",
    "rpe": "8-9",
    "rn": 9,
    "d": 55,
    "lieu": "vvf",
    "r": "3×20\" 3×40\" 6×1' 3×40\" 3×20\"",
    "p": "—",
    "t": "3×20\" 3×40\" 6×1' 3×40\" 3×20\"",
    "v": "1 passage standard",
    "n": "15 montées. PPG avant."
  },
  "escaliers": {
    "l": "Escaliers Côte des Basques",
    "c": "Force-vitesse",
    "rpe": "8",
    "rn": 8,
    "d": 50,
    "lieu": "escaliers",
    "r": "—",
    "p": "—",
    "t": "Escaliers Biarritz",
    "v": "3 reprise · 4 standard · 5 forme",
    "n": "Descente LENTE obligatoire."
  },
  "circuit_douves": {
    "l": "6×Circuit Les Douves",
    "c": "Trail spécifique",
    "rpe": "7-8",
    "rn": 8,
    "d": 55,
    "lieu": "douves",
    "r": "6x1000m",
    "p": "—",
    "t": "6× Douves Bayonne",
    "v": "4 reprise · 6 standard",
    "n": "Fartlek naturel terrain."
  },
  "fartlek_pyramid_girouettes": {
    "l": "Pyramide Girouettes",
    "c": "Trail spécifique",
    "rpe": "7-8",
    "rn": 8,
    "d": 55,
    "lieu": "girouettes",
    "r": "—",
    "p": "—",
    "t": "Pyramide Girouettes Anglet",
    "v": "1 passage standard",
    "n": "Terrain naturel technique."
  },
  "descente": {
    "l": "Travail descente technique",
    "c": "Technique trail",
    "rpe": "5-6",
    "rn": 6,
    "d": 45,
    "lieu": "chiberta",
    "r": "—",
    "p": "—",
    "t": "Descentes Chiberta/Voulgre",
    "v": "5 reprise · 8 standard · 10 forme",
    "n": "Petits pas, regard loin."
  },
  "ppg_seance": {
    "l": "Séance PPG dédiée",
    "c": "Renforcement",
    "rpe": "5-6",
    "rn": 6,
    "d": 40,
    "lieu": "floride",
    "r": "—",
    "p": "—",
    "t": "—",
    "v": "2 séries reprise · 3 standard · 4 forme",
    "n": "Voir onglet PPG."
  }
};

// s=sem p=phase m=mardi j=jeudi wr=we_route wt=we_trail ua d=décharge n=notes
const programme = [
  {
    "s": 1,
    "p": "Reprise",
    "m": "sortie_recup",
    "j": "fartlek",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 450,
    "d": 1,
    "n": "Accueil nouveaux licenciés. Pas d'intensité."
  },
  {
    "s": 2,
    "p": "Base",
    "m": "30s",
    "j": "sortie_recup",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 650,
    "d": 0,
    "n": "Réintroduction VMA très progressive."
  },
  {
    "s": 3,
    "p": "Base",
    "m": "cote_30s",
    "j": "5min",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 780,
    "d": 0,
    "n": "Intro côtes Floride. PPG obligatoire."
  },
  {
    "s": 4,
    "p": "Décharge",
    "m": "sortie_recup",
    "j": "fartlek",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 470,
    "d": 1,
    "n": "Assimilation. Intensité coupée."
  },
  {
    "s": 5,
    "p": "Développement",
    "m": "1min",
    "j": "5min",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 830,
    "d": 0,
    "n": "Bloc spécifique marathon. VMA + seuil."
  },
  {
    "s": 6,
    "p": "Développement",
    "m": "cote_45s",
    "j": "6min",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 860,
    "d": 0,
    "n": "Côtes Floride/VW + seuil long."
  },
  {
    "s": 7,
    "p": "Développement",
    "m": "3030",
    "j": "8min",
    "wr": "allure_marathon",
    "wt": "sortie_longue",
    "ua": 920,
    "d": 0,
    "n": "VMA + allure spécifique marathon."
  },
  {
    "s": 8,
    "p": "Décharge",
    "m": "fartlek",
    "j": "sortie_recup",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 480,
    "d": 1,
    "n": "Décharge mi-bloc."
  },
  {
    "s": 9,
    "p": "Spécifique",
    "m": "5x1000_halage",
    "j": "cote_1min30",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 950,
    "d": 0,
    "n": "Séance reine 5×1000m."
  },
  {
    "s": 10,
    "p": "Spécifique",
    "m": "8x3_r130",
    "j": "10min",
    "wr": "allure_marathon",
    "wt": "sortie_longue",
    "ua": 980,
    "d": 0,
    "n": "Volume seuil max. Test allure marathon."
  },
  {
    "s": 11,
    "p": "Affûtage",
    "m": "3x15_r5",
    "j": "fartlek_structure",
    "wr": "allure_marathon",
    "wt": "sortie_longue",
    "ua": 870,
    "d": 0,
    "n": "Début affûtage."
  },
  {
    "s": 12,
    "p": "Affûtage",
    "m": "5x1000_halage",
    "j": "fartlek",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 640,
    "d": 0,
    "n": "Volume divisé par 2."
  },
  {
    "s": 13,
    "p": "Compétition",
    "m": "vitesse_5x100_veille",
    "j": "—",
    "wr": "—",
    "wt": "—",
    "ua": 420,
    "d": 1,
    "n": "Activation mardi."
  },
  {
    "s": 14,
    "p": "Récupération",
    "m": "—",
    "j": "sortie_recup",
    "wr": "sortie_recup",
    "wt": "sortie_recup",
    "ua": 320,
    "d": 1,
    "n": "Post-marathon. Aucune intensité."
  },
  {
    "s": 15,
    "p": "Reprise",
    "m": "sortie_recup",
    "j": "fartlek",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 500,
    "d": 1,
    "n": "Reprise progressive."
  },
  {
    "s": 16,
    "p": "Base",
    "m": "30s",
    "j": "5min",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 720,
    "d": 0,
    "n": "Prépa cross."
  },
  {
    "s": 17,
    "p": "Trêve Noël",
    "m": "—",
    "j": "—",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 300,
    "d": 1,
    "n": "🎄 Pas d'entraînement club."
  },
  {
    "s": 18,
    "p": "Trêve Noël",
    "m": "—",
    "j": "—",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 300,
    "d": 1,
    "n": "🎄 Reprise douce fin de semaine."
  },
  {
    "s": 19,
    "p": "Bloc cross",
    "m": "cote_30s",
    "j": "3030",
    "wr": "sortie_longue",
    "wt": "circuit_douves",
    "ua": 870,
    "d": 0,
    "n": "Post-Noël. Trail : Douves."
  },
  {
    "s": 20,
    "p": "Bloc cross",
    "m": "1min",
    "j": "cote_45s",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 900,
    "d": 0,
    "n": "VMA + côtes. Cross régionaux."
  },
  {
    "s": 21,
    "p": "Bloc cross",
    "m": "fartlek_10x1_1",
    "j": "cote_1min",
    "wr": "sortie_longue",
    "wt": "circuit_douves",
    "ua": 920,
    "d": 0,
    "n": "Fartlek + côtes VW."
  },
  {
    "s": 22,
    "p": "Décharge",
    "m": "sortie_recup",
    "j": "fartlek",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 490,
    "d": 1,
    "n": "Assimilation bloc cross."
  },
  {
    "s": 23,
    "p": "Bloc cross",
    "m": "2x8x30_30_r3",
    "j": "cote_45s",
    "wr": "sortie_longue",
    "wt": "fartlek_pyramid_girouettes",
    "ua": 940,
    "d": 0,
    "n": "Double VMA + côtes."
  },
  {
    "s": 24,
    "p": "Bloc cross",
    "m": "piste_10x400_r200",
    "j": "3x7_r130",
    "wr": "sortie_longue",
    "wt": "circuit_douves",
    "ua": 970,
    "d": 0,
    "n": "Piste 10×400 + seuil."
  },
  {
    "s": 25,
    "p": "Bloc cross",
    "m": "fartlek_321_x3",
    "j": "cote_1min30",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 920,
    "d": 0,
    "n": "Pyramide inverse + côtes."
  },
  {
    "s": 26,
    "p": "Affûtage",
    "m": "piste_10x300_r100",
    "j": "fartlek_structure",
    "wr": "sortie_longue",
    "wt": "circuit_douves",
    "ua": 730,
    "d": 0,
    "n": "Volume ↓."
  },
  {
    "s": 27,
    "p": "Compétition",
    "m": "vitesse_5x100_veille",
    "j": "sortie_recup",
    "wr": "—",
    "wt": "—",
    "ua": 430,
    "d": 1,
    "n": "Activation mardi."
  },
  {
    "s": 28,
    "p": "Compétition",
    "m": "sortie_recup",
    "j": "vitesse_5x100_veille",
    "wr": "—",
    "wt": "—",
    "ua": 440,
    "d": 1,
    "n": "Récup post-cross."
  },
  {
    "s": 29,
    "p": "Récupération",
    "m": "sortie_recup",
    "j": "fartlek",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 500,
    "d": 1,
    "n": "Pas d'intensité."
  },
  {
    "s": 30,
    "p": "Base route",
    "m": "1min30",
    "j": "5min",
    "wr": "allure_semi",
    "wt": "sortie_longue",
    "ua": 830,
    "d": 0,
    "n": "Pivot vers route."
  },
  {
    "s": 31,
    "p": "Spécifique",
    "m": "5x1000_halage",
    "j": "cote_1min",
    "wr": "allure_semi",
    "wt": "sortie_longue",
    "ua": 950,
    "d": 0,
    "n": "5×1000m. Côtes pour la force."
  },
  {
    "s": 32,
    "p": "Spécifique",
    "m": "4x2000_r2",
    "j": "fartlek_5_8_12_r3",
    "wr": "allure_marathon",
    "wt": "sortie_longue",
    "ua": 1000,
    "d": 0,
    "n": "Pic charge — 4×2000m."
  },
  {
    "s": 33,
    "p": "Compétition",
    "m": "8x3_r130",
    "j": "vitesse_5x100_veille",
    "wr": "—",
    "wt": "—",
    "ua": 580,
    "d": 0,
    "n": "Affûtage avant Semi."
  },
  {
    "s": 34,
    "p": "Transition",
    "m": "fartlek_structure",
    "j": "5x1000_halage",
    "wr": "allure_marathon",
    "wt": "sortie_longue",
    "ua": 760,
    "d": 0,
    "n": "Dernière allure marathon."
  },
  {
    "s": 35,
    "p": "Compétition",
    "m": "fartlek",
    "j": "vitesse_5x100_veille",
    "wr": "—",
    "wt": "—",
    "ua": 490,
    "d": 1,
    "n": "Affûtage pur."
  },
  {
    "s": 36,
    "p": "Compétition",
    "m": "sortie_recup",
    "j": "vitesse_5x100_veille",
    "wr": "—",
    "wt": "—",
    "ua": 420,
    "d": 1,
    "n": "Récup + activation."
  },
  {
    "s": 37,
    "p": "Récupération",
    "m": "—",
    "j": "sortie_recup",
    "wr": "sortie_recup",
    "wt": "sortie_recup",
    "ua": 330,
    "d": 1,
    "n": "Récup totale."
  },
  {
    "s": 38,
    "p": "Base trail",
    "m": "cote_45s",
    "j": "fartlek",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 720,
    "d": 0,
    "n": "Reprise trail."
  },
  {
    "s": 39,
    "p": "Développement",
    "m": "cote_1min30",
    "j": "5min",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 870,
    "d": 0,
    "n": "Côtes VW/Voulgre."
  },
  {
    "s": 40,
    "p": "Spécifique trail",
    "m": "cote_2min",
    "j": "fartlek_pyramid_girouettes",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 940,
    "d": 0,
    "n": "Côtes Voulgre + Girouettes."
  },
  {
    "s": 41,
    "p": "Décharge",
    "m": "fartlek",
    "j": "sortie_recup",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 490,
    "d": 1,
    "n": "Décharge mi-bloc."
  },
  {
    "s": 42,
    "p": "Spécifique trail",
    "m": "cote_long",
    "j": "circuit_douves",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 960,
    "d": 0,
    "n": "Montagne + Douves."
  },
  {
    "s": 43,
    "p": "Spécifique trail",
    "m": "escaliers",
    "j": "fartlek_pyramid_girouettes",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 900,
    "d": 0,
    "n": "Escaliers + Girouettes."
  },
  {
    "s": 44,
    "p": "Compétition",
    "m": "fartlek",
    "j": "vitesse_5x100_veille",
    "wr": "—",
    "wt": "—",
    "ua": 510,
    "d": 1,
    "n": "Forme optimale."
  },
  {
    "s": 45,
    "p": "Décharge",
    "m": "sortie_recup",
    "j": "fartlek",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 490,
    "d": 1,
    "n": "Fin de saison."
  },
  {
    "s": 46,
    "p": "Reprise",
    "m": "cote_45s",
    "j": "fartlek_structure",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 720,
    "d": 0,
    "n": "Maintien de forme."
  },
  {
    "s": 47,
    "p": "Décharge",
    "m": "fartlek",
    "j": "sortie_recup",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 470,
    "d": 1,
    "n": "Avant Fêtes."
  },
  {
    "s": 48,
    "p": "Coupure",
    "m": "—",
    "j": "—",
    "wr": "—",
    "wt": "—",
    "ua": 200,
    "d": 1,
    "n": "🎉 Fêtes de Bayonne."
  },
  {
    "s": 49,
    "p": "Reprise",
    "m": "—",
    "j": "sortie_recup",
    "wr": "sortie_recup",
    "wt": "sortie_recup",
    "ua": 300,
    "d": 1,
    "n": "Post-fêtes."
  },
  {
    "s": 50,
    "p": "Base",
    "m": "sortie_recup",
    "j": "fartlek",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 500,
    "d": 1,
    "n": "Reprise progressive."
  },
  {
    "s": 51,
    "p": "Base",
    "m": "30s",
    "j": "5min",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 650,
    "d": 0,
    "n": "Réintroduction VMA + seuil."
  },
  {
    "s": 52,
    "p": "Base",
    "m": "cote_30s",
    "j": "fartlek_10x1_1",
    "wr": "sortie_longue",
    "wt": "sortie_longue",
    "ua": 780,
    "d": 0,
    "n": "Fin de saison → nouvelle S1."
  }
];

const objectifs = [
  {
    "s": 46,
    "nom": "Course des Fêtes de Bayonnes",
    "date": "2026-07-15",
    "type": "route"
  },
  {
    "s": 13,
    "nom": "Marathon La Rochelle",
    "date": "2026-11-29",
    "type": "route"
  },
  {
    "s": 27,
    "nom": "France de Cross",
    "date": "2027-03-07",
    "type": "cross"
  },
  {
    "s": 28,
    "nom": "Senpereko Trail",
    "date": "2027-03-14",
    "type": "trail"
  },
  {
    "s": 33,
    "nom": "Semi-Marathon Saint-Sébastien",
    "date": "2027-04-18",
    "type": "route"
  },
  {
    "s": 35,
    "nom": "Marathon Biarritz",
    "date": "2027-05-02",
    "type": "route"
  },
  {
    "s": 36,
    "nom": "Euskal Raid Ascension",
    "date": "2027-05-08",
    "type": "trail"
  },
  {
    "s": 44,
    "nom": "Saison Trails Pays Basque",
    "date": "2027-06-28",
    "type": "trail"
  }
];

const calFixed = [
  {
    "id": "f1",
    "date": "2026-09-07",
    "type": "social",
    "titre": "Reprise collective + BBQ",
    "desc": "Reprise de saison au stade La Floride. Footing d'accueil + BBQ de rentrée. Anciens et nouveaux membres bienvenus."
  },
  {
    "id": "f2",
    "date": "2026-09-21",
    "type": "trail",
    "titre": "Sortie trail La Floride → Anglet",
    "desc": "Sortie groupe trail mixte. Départ La Floride → Mousserolles → Les Girouettes → retour. ~2h. Tous niveaux."
  },
  {
    "id": "f3",
    "date": "2026-10-05",
    "type": "route",
    "titre": "Sortie longue route — Bayonne → Biarritz",
    "desc": "Sortie longue dimanche matin. Bayonne → Anglet → Biarritz par la côte → retour. ~2h. Allure EF."
  },
  {
    "id": "f4",
    "date": "2026-10-12",
    "type": "montagne",
    "titre": "🏔 Sortie montagne — Ursuya",
    "desc": "Groupe A : Ursuya depuis Sare (678m). Groupe B : côtes VW + fartlek Bayonne. Retrouvailles au café."
  },
  {
    "id": "f5",
    "date": "2026-10-26",
    "type": "rando",
    "titre": "Rando Rhune — familles bienvenues",
    "desc": "Rando conviviale sur la Rhune. Ouvert aux familles. Pique-nique au sommet. 3h30 aller-retour."
  },
  {
    "id": "f6",
    "date": "2026-11-02",
    "type": "trail",
    "titre": "Trail nocturne intra-muros Bayonne",
    "desc": "Sortie nocturne dans Bayonne illuminée. Lampes frontales obligatoires. Remparts → quais → citadelle. 1h30."
  },
  {
    "id": "f7",
    "date": "2026-11-09",
    "type": "montagne",
    "titre": "🏔 Sortie montagne — Mondarrain",
    "desc": "Mondarrain depuis Itxassou (749m). Groupe A : montées techniques. Groupe B : footing Bayonne."
  },
  {
    "id": "f8",
    "date": "2026-12-07",
    "type": "montagne",
    "titre": "🏔 Sortie montagne hivernale — Ursuya",
    "desc": "Ursuya en hiver. Équipement adapté requis. Brouillard basque et vues dégagées si chance."
  },
  {
    "id": "f9",
    "date": "2026-12-21",
    "type": "social",
    "titre": "Footing de Noël + repas section",
    "desc": "Footing festif dans Bayonne illuminée. Puis repas de section. Une tradition."
  },
  {
    "id": "f10",
    "date": "2027-01-11",
    "type": "montagne",
    "titre": "🏔 Sortie montagne — Jaizkibel côté espagnol",
    "desc": "Monte Jaizkibel depuis Fontarrabie. Vue sur le Txingudi. ~3h. Covoiturage depuis La Floride (~35 min)."
  },
  {
    "id": "f11",
    "date": "2027-01-25",
    "type": "route",
    "titre": "Sortie longue allure semi",
    "desc": "Sortie pour ceux qui préparent un semi-marathon de printemps. 1h45 allure progressive."
  },
  {
    "id": "f12",
    "date": "2027-02-08",
    "type": "montagne",
    "titre": "🏔 Sortie montagne — Artzamendi",
    "desc": "Artzamendi depuis Itxassou. Circuit trail varié. ~2h30. Montée régulière, descente technique."
  },
  {
    "id": "f13",
    "date": "2027-02-22",
    "type": "rando",
    "titre": "Trek 2 jours — Voie de la Bidassoa",
    "desc": "Weekend rando : vendredi soir → dimanche. Itinéraire sur la Bidassoa. Hébergement gîte."
  },
  {
    "id": "f14",
    "date": "2027-03-22",
    "type": "montagne",
    "titre": "🏔 Sortie montagne — Mondarrain lever de soleil",
    "desc": "Montée au Mondarrain pour le solstice de printemps. Départ 7h. Café thermos obligatoire."
  },
  {
    "id": "f15",
    "date": "2027-04-19",
    "type": "montagne",
    "titre": "🏔 Sortie Pyrénées — La Rhune",
    "desc": "La Rhune depuis Col de Saint-Ignace. ~3h aller-retour. Vue Atlantique et Pyrénées. Tous niveaux trail."
  },
  {
    "id": "f16",
    "date": "2027-06-06",
    "type": "social",
    "titre": "Course d'orientation intra-muros",
    "desc": "Organisation interne : course d'orientation dans le vieux Bayonne. Équipes mixtes, ouvert aux familles."
  },
  {
    "id": "f17",
    "date": "2027-06-21",
    "type": "montagne",
    "titre": "🏔 Mondarrain au coucher de soleil",
    "desc": "Montée pour le solstice d'été. Départ 18h, coucher de soleil au sommet. Pique-nique partagé."
  },
  {
    "id": "f18",
    "date": "2027-07-05",
    "type": "montagne",
    "titre": "🏔 Sortie Pyrénées — Pic d'Orhy",
    "desc": "Sortie niveau confirmé : Pic d'Orhy (2017m) depuis Larrau. ~5h AR. Covoiturage Bayonne."
  },
  {
    "id": "f19",
    "date": "2027-07-19",
    "type": "rando",
    "titre": "Trek 2 jours — Haute Soule",
    "desc": "Bivouac 2 jours. Larrau → Iraty. Nuit en cabane. Inscription via boîte à idées."
  }
];
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
