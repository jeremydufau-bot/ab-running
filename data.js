// data.js — AB Running Loisir v4 (saison 2026-2027)
// Architecture compacte. Tout est dérivé des clés séance.

const infosClub = [
  {
    id: 'msg1',
    titre: '🎉 Bienvenue à la nouvelle section Running Loisir !',
    texte: "La section AB Running Loisir ouvre ses portes à tous les coureurs qui souhaitent pratiquer dans une ambiance conviviale. Mardi et jeudi 18h15 au stade La Floride. Inscriptions ouvertes.",
    dateFin: '',
    type: 'info'
  },
  {
    id: 'msg2',
    titre: '📢 Sortie montagne le 15 du mois',
    texte: "Prochaine sortie montagne prévue le 15. Départ en covoiturage depuis La Floride à 8h. Plus d'infos dans l'onglet Sorties.",
    dateFin: '',
    type: 'event'
  }
];

const calculateurTextes = {
  intro: "Cette page te permet de calculer ta charge d'entraînement hebdomadaire. Remplis simplement la durée et le ressenti (RPE) de chacune de tes séances. Les calculs se font automatiquement pour t'aider à visualiser ta charge et à progresser sans te blesser.",

  rpe_titre: "Qu'est-ce que le RPE ?",
  rpe_texte: "Le RPE (Rating of Perceived Exertion, ou Effort Perçu) est une note de 1 à 10 que tu donnes à ta séance, une minute après l'avoir terminée. Cette note reflète le ressenti global : facilité respiratoire, fatigue musculaire, difficulté mentale.\n\n1-2 : très facile, comme marcher\n3-4 : facile, allure de conversation\n5-6 : modéré, respiration contrôlée\n7-8 : difficile, parler devient compliqué\n9-10 : très difficile, effort maximal",

  ua_titre: "Qu'est-ce que l'UA ?",
  ua_texte: "L'UA (Unité Arbitraire) est une mesure de la charge réelle d'une séance. C'est un simple calcul : UA = RPE × Durée (en minutes).\n\nExemple : une séance de 45 minutes ressentie à 7/10 représente 315 UA.\n\nL'intérêt ? Une semaine avec beaucoup d'UA = charge élevée, une semaine légère = UA bas. En suivant ton total hebdomadaire, tu peux progresser par paliers sans tomber dans le surentraînement.",

  bloc_titre: "La logique du bloc de 4 semaines",
  bloc_texte: "Un cycle d'entraînement bien construit suit une progression sur 4 semaines :\n\nSemaine 1 — Base : charge modérée, on pose les fondations.\nSemaine 2 — Montée : +10 à 15% d'UA par rapport à S1.\nSemaine 3 — Pic : +20 à 25% d'UA par rapport à S1 (semaine la plus dure).\nSemaine 4 — Récupération : -40% d'UA pour assimiler le travail.\n\nCette alternance charge/récupération est indispensable pour progresser sans se blesser."
};

const chargeHebdoSeuils = [
  {max:280,label:'Récupération',couleur:'#7BA098',description:'Récup, reprise, décharge'},
  {max:380,label:'Modérée',couleur:'#7BC3E5',description:'Reprise progressive'},
  {max:480,label:'Soutenue',couleur:'#3A7BBF',description:'Décharge ou base modérée'},
  {max:600,label:'Difficile',couleur:'#1B3A6B',description:'Base ou affûtage'},
  {max:800,label:'Très difficile',couleur:'#E67E22',description:'Développement'},
  {max:1050,label:'Pic',couleur:'#C0392B',description:'Semaine la plus dure'},
  {max:9999,label:'Surcharge',couleur:'#7B1212',description:'Au-delà — surveiller'},
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
  'sortie_recup':{l:'Sortie récup active',c:'Récup',rpe:'2-3',rn:3,d:50,lieu:'halage',r:'50min très douce route',p:'—',t:'50min très douce sentier',v:'40min reprise · 50min standard · 1h forme',n:'JAMAIS de pression. Sortie sociale.'},
  'sortie_longue':{l:'Sortie longue endurance',c:'Endurance',rpe:'3-4',rn:4,d:90,lieu:'chiberta',r:'1h30 EF route',p:'—',t:'1h30 EF Chiberta/Douves',v:'1h reprise · 1h30 standard · 2h+ forme',n:'JAMAIS > 80% FCmax. Conversation possible.'},
  'fartlek':{l:'Fartlek libre',c:'Mixte',rpe:'5-7',rn:6,d:45,lieu:'halage',r:'45min libre Halage',p:'—',t:'45min libre sentier',v:'30min reprise · 45min standard · 60min forme',n:'Adapter au terrain et à la sensation.'},
  'fartlek_structure':{l:'Fartlek structuré 2\'/2\'',c:'VMA/Seuil',rpe:'6-8',rn:7,d:45,lieu:'halage',r:'6×(2\' vif/2\' trot) Halage',p:'6×(2\'/2\') piste',t:'6×(2\'/2\') sentier',v:'4 reprise · 6 standard · 8 forme',n:'Allure identique tous les blocs.'},
  'fartlek_10x1_1':{l:'Fartlek 10×1\'/1\'',c:'VMA',rpe:'7-8',rn:8,d:45,lieu:'halage',r:'10×(1\'/1\') Halage',p:'10×(1\'/1\') piste',t:'10×(1\'/1\') sentier',v:'6 reprise · 10 standard · 12 forme',n:'Récup ACTIVE obligatoire.'},
  'fartlek_10x2':{l:'Fartlek 10×2\' R~1\'',c:'VMA/Seuil',rpe:'7-8',rn:8,d:50,lieu:'halage',r:'10×(2\'/1\') Halage',p:'10×(2\'/1\') piste',t:'10×(2\'/1\') sentier',v:'6 reprise · 10 standard · 12 forme',n:'Plus exigeant que 10×1\'.'},
  'fartlek_6x1_x2':{l:'2×(6×1\'/1\')',c:'VMA',rpe:'7-8',rn:8,d:45,lieu:'halage',r:'2×(6×1\'/1\') R=2\' Halage',p:'2×(6×1\'/1\') piste',t:'2×(6×1\'/1\') sentier',v:'1 série reprise · 2 standard',n:'Double série — R=2min.'},
  'fartlek_2x8x30':{l:'2×(8×30"/30")',c:'VMA',rpe:'8',rn:8,d:40,lieu:'halage',r:'2×(8×30"/30") R=2\' Halage',p:'2×(8×30"/30") piste',t:'2×(8×30"/30") sentier',v:'1 série reprise · 2 standard',n:'Qualité sur la 2e série.'},
  'fartlek_321_x3':{l:'3×(3\'2\'1\') R=2\'',c:'VMA/Seuil',rpe:'7-8',rn:8,d:50,lieu:'halage',r:'3×(3\'2\'1\') Halage',p:'3×(3\'2\'1\') piste',t:'3×(3\'2\'1\') sentier',v:'2 séries reprise · 3 standard',n:'Pyramide inverse répétée.'},
  'fartlek_5_8_12_r3':{l:'Fartlek 5\'-8\'-12\' R=3\'',c:'Seuil',rpe:'7',rn:7,d:50,lieu:'halage',r:'5\'+8\'+12\' Halage',p:'5\'+8\'+12\' piste',t:'5\'+8\'+12\' sentier',v:'Standard · + 5\' final forme',n:'Le 12\' est le bloc clé.'},
  'fartlek_3_6_6_3':{l:'Fartlek 3\'6\'6\'3\' R~½t',c:'Seuil',rpe:'7',rn:7,d:45,lieu:'halage',r:'1 passage Halage',p:'1 passage piste',t:'1 passage sentier',v:'Standard · + 3\' forme',n:'Double sommet à 6\'.'},
  'fartlek_1234441321':{l:'Fartlek 1-2-3-4-4-4-3-2-1',c:'VMA/Seuil',rpe:'7-8',rn:8,d:55,lieu:'halage',r:'1 passage Halage',p:'1 passage piste',t:'1 passage sentier',v:'Standard · + 1\'2\'3\' forme',n:'Triple bloc à 4\'. ~29min.'},
  'fartlek_5_10_10':{l:'Fartlek 5\'-10\'-10\'',c:'Seuil',rpe:'6-7',rn:7,d:50,lieu:'halage',r:'5\'+10\'+10\' Halage',p:'5\'+10\'+10\' piste',t:'5\'+10\'+10\' sentier',v:'Standard · + 5\' final forme',n:'3 blocs longs progressifs.'},
  '30s':{l:'30"/30" VMA courte',c:'VMA courte',rpe:'8-9',rn:9,d:40,lieu:'halage',r:'10×30"/30" Halage',p:'10×100m/100m piste',t:'10×30"/30" sentier',v:'6 reprise · 10 standard · 15 forme',n:'Récup trottinée OBLIGATOIRE.'},
  '3030':{l:'30"/30" classique',c:'VMA courte',rpe:'8-9',rn:9,d:40,lieu:'halage',r:'10×30"/30" Halage',p:'10×100m/100m piste',t:'10×30"/30" sentier',v:'6 reprise · 10 standard · 15 forme',n:'Référence VMA.'},
  '45s':{l:'Efforts 45 secondes',c:'VMA courte',rpe:'8-9',rn:9,d:40,lieu:'halage',r:'8×45" R=1\'45" Halage',p:'8×150m R=200m piste',t:'8×45" sentier',v:'6 reprise · 8 standard · 12 forme',n:'Intermédiaire 30s↔1min.'},
  '1min':{l:'Efforts 1 minute',c:'VMA courte',rpe:'7-8',rn:8,d:45,lieu:'halage',r:'10×1\' R=1\'45" Halage',p:'10×400m R=200m piste',t:'10×1\' sentier',v:'6 reprise · 10 standard · 14 forme',n:'Base du fractionné court.'},
  '8x50s_vma':{l:'8×50" VMA',c:'VMA courte',rpe:'8',rn:8,d:40,lieu:'halage',r:'8×50" R=2\' Halage',p:'8×200m R=200m piste',t:'8×50" sentier',v:'5 reprise · 8 standard · 10 forme',n:'Durée intermédiaire.'},
  '10x3030_v2':{l:'10×30"/30" terrain',c:'VMA',rpe:'8',rn:8,d:40,lieu:'halage',r:'10×30"/30" Halage',p:'10×100m/100m piste',t:'10×30"/30" côte',v:'6 reprise · 10 standard · 15 forme',n:'Variante : peut se faire en côte.'},
  'interval_court':{l:'Intervalles courts 15-20s',c:'VMA explosive',rpe:'9',rn:9,d:40,lieu:'halage',r:'12×20" R=45" Halage',p:'12×200m R=200m piste',t:'12×20" Chiberta',v:'8 reprise · 12 standard · 16 forme',n:'Format Tabata adapté.'},
  '2x8x8s_r2':{l:'2×(8×8") R=2\'',c:'VMA explosive',rpe:'9',rn:9,d:40,lieu:'stades',r:'—',p:'2×(8×8") piste R=2\'',t:'—',v:'8 standard · 12 forme',n:'Neuromusculaire pur.'},
  '30s_r_decrements':{l:'30" R=décroissante',c:'VMA',rpe:'8-9',rn:9,d:40,lieu:'halage',r:'5×30" R↓ Halage',p:'5×100m R↓ piste',t:'5×30" R↓ sentier',v:'3 reprise · 5 standard · 7 forme',n:'Simulation fin de course.'},
  '45_45_puis_45_30':{l:'5×45"/45" + 5×45"/30"',c:'VMA',rpe:'8',rn:8,d:45,lieu:'halage',r:'5+5 Halage',p:'5+5 piste',t:'5+5 sentier',v:'3+3 reprise · 5+5 standard',n:'Double bloc récup décroissante.'},
  '8x30_30_r2_6x1_1':{l:'8×30"/30" + 6×1\'/1\'',c:'VMA',rpe:'8',rn:8,d:50,lieu:'halage',r:'8+6 Halage',p:'8+6 piste',t:'8+6 sentier',v:'5+4 reprise · 8+6 standard',n:'Double bloc VMA.'},
  '2x8x30_30_r3':{l:'2×(8×30"/30") R=3\'',c:'VMA',rpe:'8',rn:8,d:40,lieu:'halage',r:'2×(8×30"/30") Halage',p:'2×(8×30"/30") piste',t:'2×(8×30"/30") sentier',v:'1 série reprise · 2 standard',n:'2e série = aussi bonne.'},
  '2x6x30_30_r130':{l:'2×(6×30"/30") R=1\'30"',c:'VMA',rpe:'8',rn:8,d:35,lieu:'halage',r:'2×(6×30"/30") Halage',p:'2×(6×30"/30") piste',t:'2×(6×30"/30") sentier',v:'1 série reprise · 2 standard',n:'Version courte du 2×8.'},
  '2x8x2020':{l:'2×(8×20"/20") R=2\'',c:'VMA',rpe:'8-9',rn:9,d:35,lieu:'halage',r:'2×(8×20"/20") Halage',p:'2×(8×20"/20") piste',t:'2×(8×20"/20") sentier',v:'1 série reprise · 2 standard',n:'Intervalles très courts.'},
  '5x30_8x1_5x30':{l:'5×30" + 8×1\' + 5×30"',c:'VMA',rpe:'8',rn:8,d:50,lieu:'halage',r:'5+8+5 Halage',p:'5+8+5 piste',t:'5+8+5 sentier',v:'3+5+3 reprise · 5+8+5 standard',n:'Triple bloc symétrique.'},
  '1min30':{l:'Efforts 1min30',c:'VMA longue',rpe:'7-8',rn:8,d:50,lieu:'halage',r:'10×1\'30 R=1\'30 Halage',p:'10×400m R=200m piste',t:'10×1\'30 sentier',v:'5 reprise · 10 standard · 12 forme',n:'Idéal aussi pour côtes VW.'},
  '2min':{l:'Efforts 2 minutes',c:'VMA longue',rpe:'7-8',rn:8,d:50,lieu:'halage',r:'8×2\' R=2\' Halage',p:'8×600m R=300m piste',t:'8×2\' sentier',v:'4 reprise · 8 standard · 10 forme',n:'Transition VMA→seuil.'},
  '3min':{l:'Efforts 3 minutes',c:'Seuil',rpe:'7',rn:7,d:50,lieu:'halage',r:'6×3\' R=2\' Halage',p:'6×800m R=400m piste',t:'6×3\' sentier',v:'3 reprise · 6 standard · 8 forme',n:'Intro travail seuil.'},
  '4min':{l:'Efforts 4 minutes',c:'Seuil',rpe:'6-7',rn:7,d:50,lieu:'halage',r:'5×4\' R=2\' Halage',p:'5×1000m R=400m piste',t:'5×4\' sentier',v:'3 reprise · 5 standard · 6 forme',n:'Allure seuil confort.'},
  '5min':{l:'Efforts 5 minutes',c:'Seuil',rpe:'6-7',rn:7,d:55,lieu:'halage',r:'5×5\' R=2\'30 Halage',p:'5×1200m R=400m piste',t:'5×5\' sentier',v:'2 reprise · 5 standard · 6 forme',n:'Séance clé marathon/trail.'},
  '6min':{l:'Efforts 6 minutes',c:'Seuil',rpe:'6-7',rn:7,d:55,lieu:'halage',r:'4×6\' R=3\' Halage',p:'4×1500m R=500m piste',t:'4×6\' sentier',v:'2 reprise · 4 standard · 5 forme',n:'Gestion allure essentielle.'},
  '8min':{l:'Efforts 8 minutes',c:'Seuil',rpe:'6',rn:6,d:55,lieu:'halage',r:'3×8\' R=3\' Halage',p:'3×2000m R=600m piste',t:'3×8\' sentier',v:'2 reprise · 3 standard · 4 forme',n:'Simulation course.'},
  '10min':{l:'Efforts 10 minutes',c:'Seuil',rpe:'6',rn:6,d:55,lieu:'halage',r:'3×10\' R=3\' Halage',p:'3×2500m R=600m piste',t:'3×10\' sentier',v:'2 reprise · 3 standard · 4 forme',n:'Allure semi-marathon.'},
  '12min':{l:'Efforts 12 minutes',c:'Seuil',rpe:'6',rn:6,d:55,lieu:'halage',r:'2×12\' R=4\' Halage',p:'2×3000m R=800m piste',t:'2×12\' sentier',v:'2 standard · 3 forme',n:'Concentration mentale clé.'},
  '15min':{l:'Efforts 15 minutes',c:'Seuil',rpe:'5-6',rn:6,d:60,lieu:'halage',r:'2×15\' R=5\' Halage',p:'2×3500m R=800m piste',t:'2×15\' sentier',v:'2 standard',n:'Exigeant mentalement.'},
  '20min':{l:'20 minutes continu',c:'Seuil',rpe:'5-6',rn:6,d:55,lieu:'halage',r:'1×20\' Halage',p:'1×5000m piste',t:'1×20\' sentier',v:'1×20\' standard · 2×20\' forme',n:'Référence préparation semi.'},
  '3x15_r5':{l:'3×15\' R=5\'',c:'Seuil long',rpe:'6-7',rn:7,d:65,lieu:'halage',r:'3×15\' R=5\' Halage',p:'3×15\' R=5\' piste',t:'3×15\' sentier',v:'2×12\' reprise · 3×15\' standard',n:'La plus exigeante mentalement.'},
  '8x3_r130':{l:'8×3\' R=1\'30"',c:'Seuil',rpe:'7',rn:7,d:55,lieu:'halage',r:'8×3\' R=1\'30" Halage',p:'8×800m R=400m piste',t:'8×3\' sentier',v:'5 reprise · 8 standard',n:'Volume seuil récup courte.'},
  '3x7_r130':{l:'3×7\' R=1\'30"',c:'Seuil',rpe:'7',rn:7,d:50,lieu:'halage',r:'3×7\' R=1\'30" Halage',p:'3×1800m R=400m piste',t:'3×7\' sentier',v:'2 reprise · 3 standard',n:'Seuil moyen récup courte.'},
  '3x8_r1':{l:'3×8\' R=1\'',c:'Seuil',rpe:'7',rn:7,d:50,lieu:'halage',r:'3×8\' R=1\' Halage',p:'3×2000m R=300m piste',t:'3×8\' sentier',v:'2 reprise · 3 standard',n:'Récup TRÈS courte.'},
  '5x1000_halage':{l:'5×1000m R~2-3\'',c:'Seuil',rpe:'6-7',rn:7,d:55,lieu:'halage',r:'5×1000m R=2\'30" Halage',p:'5×1000m R=2\'30" piste',t:'5×1000m Chiberta',v:'3 reprise · 5 standard',n:'Séance reine semi/marathon.'},
  '4x2000_r2':{l:'4×2000m R=2\'',c:'Seuil long',rpe:'6-7',rn:7,d:60,lieu:'halage',r:'4×2000m R=2\' Halage',p:'4×2000m R=2\' piste',t:'4×2000m Chiberta',v:'2 reprise · 4 standard',n:'Chaque 2000m dure ~8-10min.'},
  'pyramid_1234321':{l:'Pyramide 1-2-3-4-3-2-1',c:'VMA/Seuil',rpe:'7-8',rn:8,d:50,lieu:'halage',r:'1 passage Halage',p:'1 passage piste',t:'1 passage sentier',v:'1 standard · + 1\'2\'3\' forme',n:'Monter en intensité sur les longs.'},
  'pyramid_1246421':{l:'Pyramide 1-2-4-6-4-2-1',c:'VMA/Seuil',rpe:'7-8',rn:8,d:55,lieu:'halage',r:'1 passage Halage',p:'1 passage piste',t:'1 passage sentier',v:'1 standard · + 1\'2\' forme',n:'Le 6\' est la clé.'},
  'pyramid_246642':{l:'Pyramide 2-4-6-6-4-2',c:'Seuil',rpe:'7',rn:7,d:55,lieu:'halage',r:'1 passage Halage',p:'1 passage piste',t:'1 passage sentier',v:'1 standard · + 2\' forme',n:'Double 6\' au sommet (~26min).'},
  'pyramid_124641':{l:'Pyramide 1-2-4-6-4-1',c:'VMA/Seuil',rpe:'7-8',rn:8,d:50,lieu:'halage',r:'1 passage Halage',p:'1 passage piste',t:'1 passage sentier',v:'1 standard · + 1\'2\' forme',n:'Montée progressive, descente rapide.'},
  'allure_marathon':{l:'Sortie allure marathon',c:'Spécifique',rpe:'6-7',rn:7,d:75,lieu:'halage',r:'1h15 allure marathon Halage',p:'—',t:'—',v:'45min reprise · 1h15 standard · 1h30 forme',n:'Allure cible conditions réelles.'},
  'allure_semi':{l:'Sortie allure semi',c:'Spécifique',rpe:'7',rn:7,d:60,lieu:'halage',r:'1h allure semi Halage',p:'—',t:'—',v:'30min reprise · 1h standard · 1h15 forme',n:'Halage marqué au km.'},
  'vitesse_5x100_veille':{l:'5×100m veille course',c:'Activation',rpe:'6-7',rn:6,d:30,lieu:'stades',r:'—',p:'5×100m piste',t:'—',v:'4 reprise · 5 standard',n:'JAMAIS épuisant. Réveiller les jambes.'},
  'vitesse_8x100_5x200':{l:'8×100m + 5×200m',c:'Vitesse',rpe:'8-9',rn:9,d:45,lieu:'stades',r:'—',p:'8×100m + 5×200m piste',t:'—',v:'6+3 reprise · 8+5 standard',n:'Mécanique + endurance vitesse.'},
  'vitesse_6x300_4x400':{l:'6×300m + 4×400m',c:'Vitesse/VMA',rpe:'8',rn:8,d:50,lieu:'stades',r:'—',p:'6×300m + 4×400m piste',t:'—',v:'4+2 reprise · 6+4 standard',n:'Référence puissance aérobie.'},
  'vitesse_2x6x200':{l:'2×(6×200m) R=3-4\'',c:'Vitesse',rpe:'8-9',rn:9,d:45,lieu:'stades',r:'—',p:'2×(6×200m) piste',t:'—',v:'1 série reprise · 2 standard',n:'2e série plus difficile. Normal.'},
  'vitesse_6x100_5x200':{l:'6×100m + 5×200m',c:'Vitesse',rpe:'8-9',rn:9,d:45,lieu:'stades',r:'—',p:'6×100m + 5×200m piste',t:'—',v:'4+3 reprise · 6+5 standard',n:'100m active le neuromusculaire.'},
  'vitesse_6x100_4x200_etc':{l:'6×100+4×200+2×300+1×400',c:'Vitesse/VMA',rpe:'8',rn:8,d:50,lieu:'stades',r:'—',p:'Progression piste',t:'—',v:'Demi-vol reprise · complet standard',n:'Volume et distance croissants.'},
  'piste_10x400_r200':{l:'10×400m R=200m trot',c:'VMA',rpe:'7-8',rn:8,d:50,lieu:'stades',r:'—',p:'10×400m R=200m piste',t:'—',v:'6 reprise · 10 standard',n:'Référence piste. Même allure.'},
  'piste_10x300_r100':{l:'10×300m R=100m trot',c:'VMA',rpe:'8',rn:8,d:45,lieu:'stades',r:'—',p:'10×300m R=100m piste',t:'—',v:'6 reprise · 10 standard',n:'Récup très courte.'},
  'piste_10x200_r100':{l:'10×200m R=100m trot',c:'Vitesse-end',rpe:'8-9',rn:9,d:40,lieu:'stades',r:'—',p:'10×200m R=100m piste',t:'—',v:'6 reprise · 10 standard',n:'Vitesse-endurance.'},
  'piste_5x200_5x300_r400':{l:'5×200 + 5×300 R=400m',c:'Vitesse/VMA',rpe:'8',rn:8,d:50,lieu:'stades',r:'—',p:'5×200 + 5×300 piste',t:'—',v:'3+3 reprise · 5+5 standard',n:'Distances croissantes.'},
  'piste_progression_100_500':{l:'5×100+4×200+3×300+2×400+1×500',c:'Vitesse/VMA',rpe:'8',rn:8,d:50,lieu:'stades',r:'—',p:'Progression piste',t:'—',v:'Demi-vol reprise · complet standard',n:'Pyramide ~3500m.'},
  'piste_5x100_4x200_3x300_2x400':{l:'5×100+4×200+3×300+2×400',c:'Vitesse/VMA',rpe:'8',rn:8,d:45,lieu:'stades',r:'—',p:'Progression piste',t:'—',v:'Demi-vol reprise · complet standard',n:'Sans le 500m final.'},
  'cote':{l:'Côtes générique',c:'Force aérobie',rpe:'7-9',rn:8,d:50,lieu:'floride',r:'—',p:'—',t:'Selon côte choisie',v:'6 reprise · 10 standard · 14 forme',n:'PPG OBLIGATOIRE avant.'},
  'cote_20s':{l:'12×20" côte explosif',c:'VMA explosive',rpe:'9',rn:9,d:40,lieu:'floride',r:'—',p:'—',t:'12×20" Floride section basse',v:'8 reprise · 12 standard · 15 forme',n:'Si puissance baisse → stopper.'},
  'cote_30s':{l:'Côtes 30s — Floride',c:'Force-vitesse',rpe:'9',rn:9,d:45,lieu:'floride',r:'—',p:'—',t:'10×30" Côte La Floride',v:'6 reprise · 10 standard · 14 forme',n:'Genoux hauts, bras actifs.'},
  'cote_40s':{l:'Côtes 10×40" — Floride',c:'Force-vitesse',rpe:'8-9',rn:9,d:45,lieu:'floride',r:'—',p:'—',t:'10×40" Côte La Floride',v:'6 reprise · 10 standard · 12 forme',n:'PPG avant.'},
  'cote_45s':{l:'Côtes 12×45" Floride/VW',c:'Force-vitesse',rpe:'8-9',rn:9,d:50,lieu:'floride',r:'—',p:'—',t:'12×45" Floride OU VW',v:'8 reprise · 12 standard · 15 forme',n:'Côte UNIQUE par séance.'},
  'cote_1min':{l:'Côtes 1\' — VW',c:'Force aérobie',rpe:'8-9',rn:9,d:50,lieu:'vw',r:'—',p:'—',t:'8×1\' Côte VW',v:'5 reprise · 8 standard · 10 forme',n:'Même allure toutes les reps.'},
  'cote_8x1_vw':{l:'Côtes 8×1\' VW variante',c:'Force aérobie',rpe:'8-9',rn:9,d:50,lieu:'vw',r:'—',p:'—',t:'8×1\' Côte VW',v:'5 reprise · 8 standard · 10 forme',n:'Focus VW.'},
  'cote_10x1_girouettes':{l:'10×1\' R=45" Girouettes',c:'Force aérobie',rpe:'8',rn:8,d:50,lieu:'girouettes',r:'—',p:'—',t:'10×1\' Parc Girouettes',v:'6 reprise · 10 standard · 12 forme',n:'Circuit naturel récup courte.'},
  'cote_1min30':{l:'Côtes 1\'30 VW/Voulgre',c:'Force aérobie',rpe:'8',rn:8,d:50,lieu:'voulgre',r:'—',p:'—',t:'6×1\'30 VW OU Voulgre',v:'4 reprise · 6 standard · 10 forme',n:'Descente : petits pas, genoux fléchis.'},
  'cote_2min':{l:'Côtes 2\' — Voulgre',c:'Force aérobie',rpe:'7-8',rn:8,d:50,lieu:'voulgre',r:'—',p:'—',t:'6×2\' Côte Voulgre',v:'4 reprise · 6 standard · 8 forme',n:'Phare trail — focus descente.'},
  'cote_long':{l:'Côtes longues 3-10min',c:'Force aérobie',rpe:'6-8',rn:7,d:60,lieu:'montagne',r:'—',p:'—',t:'Côtes Ursuya/Mondarrain',v:'3 reprise · 5 standard · 6 forme',n:'Réservé montagne.'},
  'cote_vvf_pyramide':{l:'Pyramide VVF Anglet',c:'Force-vitesse',rpe:'8-9',rn:9,d:55,lieu:'vvf',r:'—',p:'—',t:'3×20" 3×40" 6×1\' 3×40" 3×20"',v:'1 passage standard',n:'15 montées. PPG avant.'},
  'escaliers':{l:'Escaliers Côte des Basques',c:'Force-vitesse',rpe:'8',rn:8,d:50,lieu:'escaliers',r:'—',p:'—',t:'Escaliers Biarritz',v:'3 reprise · 4 standard · 5 forme',n:'Descente LENTE obligatoire.'},
  'circuit_douves':{l:'6×Circuit Les Douves',c:'Trail spécifique',rpe:'7-8',rn:8,d:55,lieu:'douves',r:'—',p:'—',t:'6× Douves Bayonne',v:'4 reprise · 6 standard',n:'Fartlek naturel terrain.'},
  'fartlek_pyramid_girouettes':{l:'Pyramide Girouettes',c:'Trail spécifique',rpe:'7-8',rn:8,d:55,lieu:'girouettes',r:'—',p:'—',t:'Pyramide Girouettes Anglet',v:'1 passage standard',n:'Terrain naturel technique.'},
  'descente':{l:'Travail descente technique',c:'Technique trail',rpe:'5-6',rn:6,d:45,lieu:'chiberta',r:'—',p:'—',t:'Descentes Chiberta/Voulgre',v:'5 reprise · 8 standard · 10 forme',n:'Petits pas, regard loin.'},
  'ppg_seance':{l:'Séance PPG dédiée',c:'Renforcement',rpe:'5-6',rn:6,d:40,lieu:'floride',r:'—',p:'—',t:'—',v:'2 séries reprise · 3 standard · 4 forme',n:'Voir onglet PPG.'},
};

// s=sem p=phase m=mardi j=jeudi wr=we_route wt=we_trail ua d=décharge n=notes
const programme = [
  {s:1,p:'Reprise',m:'sortie_recup',j:'fartlek',wr:'sortie_longue',wt:'sortie_longue',ua:450,d:1,n:'Accueil nouveaux licenciés. Pas d\'intensité.'},
  {s:2,p:'Base',m:'30s',j:'sortie_recup',wr:'sortie_longue',wt:'sortie_longue',ua:650,d:0,n:'Réintroduction VMA très progressive.'},
  {s:3,p:'Base',m:'cote_30s',j:'5min',wr:'sortie_longue',wt:'sortie_longue',ua:780,d:0,n:'Intro côtes Floride. PPG obligatoire.'},
  {s:4,p:'Décharge',m:'sortie_recup',j:'fartlek',wr:'sortie_longue',wt:'sortie_longue',ua:470,d:1,n:'Assimilation. Intensité coupée.'},
  {s:5,p:'Développement',m:'1min',j:'5min',wr:'sortie_longue',wt:'sortie_longue',ua:830,d:0,n:'Bloc spécifique marathon. VMA + seuil.'},
  {s:6,p:'Développement',m:'cote_45s',j:'6min',wr:'sortie_longue',wt:'sortie_longue',ua:860,d:0,n:'Côtes Floride/VW + seuil long.'},
  {s:7,p:'Développement',m:'3030',j:'8min',wr:'allure_marathon',wt:'sortie_longue',ua:920,d:0,n:'VMA + allure spécifique marathon.'},
  {s:8,p:'Décharge',m:'fartlek',j:'sortie_recup',wr:'sortie_longue',wt:'sortie_longue',ua:480,d:1,n:'Décharge mi-bloc.'},
  {s:9,p:'Spécifique',m:'5x1000_halage',j:'cote_1min30',wr:'sortie_longue',wt:'sortie_longue',ua:950,d:0,n:'Séance reine 5×1000m.'},
  {s:10,p:'Spécifique',m:'8x3_r130',j:'10min',wr:'allure_marathon',wt:'sortie_longue',ua:980,d:0,n:'Volume seuil max. Test allure marathon.'},
  {s:11,p:'Affûtage',m:'3x15_r5',j:'fartlek_structure',wr:'allure_marathon',wt:'sortie_longue',ua:870,d:0,n:'Début affûtage.'},
  {s:12,p:'Affûtage',m:'5x1000_halage',j:'fartlek',wr:'sortie_longue',wt:'sortie_longue',ua:640,d:0,n:'Volume divisé par 2.'},
  {s:13,p:'Compétition',m:'vitesse_5x100_veille',j:'—',wr:'—',wt:'—',ua:420,d:1,n:'Activation mardi.'},
  {s:14,p:'Récupération',m:'—',j:'sortie_recup',wr:'sortie_recup',wt:'sortie_recup',ua:320,d:1,n:'Post-marathon. Aucune intensité.'},
  {s:15,p:'Reprise',m:'sortie_recup',j:'fartlek',wr:'sortie_longue',wt:'sortie_longue',ua:500,d:1,n:'Reprise progressive.'},
  {s:16,p:'Base',m:'30s',j:'5min',wr:'sortie_longue',wt:'sortie_longue',ua:720,d:0,n:'Prépa cross.'},
  {s:17,p:'Trêve Noël',m:'—',j:'—',wr:'sortie_longue',wt:'sortie_longue',ua:300,d:1,n:'🎄 Pas d\'entraînement club.'},
  {s:18,p:'Trêve Noël',m:'—',j:'—',wr:'sortie_longue',wt:'sortie_longue',ua:300,d:1,n:'🎄 Reprise douce fin de semaine.'},
  {s:19,p:'Bloc cross',m:'cote_30s',j:'3030',wr:'sortie_longue',wt:'circuit_douves',ua:870,d:0,n:'Post-Noël. Trail : Douves.'},
  {s:20,p:'Bloc cross',m:'1min',j:'cote_45s',wr:'sortie_longue',wt:'sortie_longue',ua:900,d:0,n:'VMA + côtes. Cross régionaux.'},
  {s:21,p:'Bloc cross',m:'fartlek_10x1_1',j:'cote_1min',wr:'sortie_longue',wt:'circuit_douves',ua:920,d:0,n:'Fartlek + côtes VW.'},
  {s:22,p:'Décharge',m:'sortie_recup',j:'fartlek',wr:'sortie_longue',wt:'sortie_longue',ua:490,d:1,n:'Assimilation bloc cross.'},
  {s:23,p:'Bloc cross',m:'2x8x30_30_r3',j:'cote_45s',wr:'sortie_longue',wt:'fartlek_pyramid_girouettes',ua:940,d:0,n:'Double VMA + côtes.'},
  {s:24,p:'Bloc cross',m:'piste_10x400_r200',j:'3x7_r130',wr:'sortie_longue',wt:'circuit_douves',ua:970,d:0,n:'Piste 10×400 + seuil.'},
  {s:25,p:'Bloc cross',m:'fartlek_321_x3',j:'cote_1min30',wr:'sortie_longue',wt:'sortie_longue',ua:920,d:0,n:'Pyramide inverse + côtes.'},
  {s:26,p:'Affûtage',m:'piste_10x300_r100',j:'fartlek_structure',wr:'sortie_longue',wt:'circuit_douves',ua:730,d:0,n:'Volume ↓.'},
  {s:27,p:'Compétition',m:'vitesse_5x100_veille',j:'sortie_recup',wr:'—',wt:'—',ua:430,d:1,n:'Activation mardi.'},
  {s:28,p:'Compétition',m:'sortie_recup',j:'vitesse_5x100_veille',wr:'—',wt:'—',ua:440,d:1,n:'Récup post-cross.'},
  {s:29,p:'Récupération',m:'sortie_recup',j:'fartlek',wr:'sortie_longue',wt:'sortie_longue',ua:500,d:1,n:'Pas d\'intensité.'},
  {s:30,p:'Base route',m:'1min30',j:'5min',wr:'allure_semi',wt:'sortie_longue',ua:830,d:0,n:'Pivot vers route.'},
  {s:31,p:'Spécifique',m:'5x1000_halage',j:'cote_1min',wr:'allure_semi',wt:'sortie_longue',ua:950,d:0,n:'5×1000m. Côtes pour la force.'},
  {s:32,p:'Spécifique',m:'4x2000_r2',j:'fartlek_5_8_12_r3',wr:'allure_marathon',wt:'sortie_longue',ua:1000,d:0,n:'Pic charge — 4×2000m.'},
  {s:33,p:'Compétition',m:'8x3_r130',j:'vitesse_5x100_veille',wr:'—',wt:'—',ua:580,d:0,n:'Affûtage avant Semi.'},
  {s:34,p:'Transition',m:'fartlek_structure',j:'5x1000_halage',wr:'allure_marathon',wt:'sortie_longue',ua:760,d:0,n:'Dernière allure marathon.'},
  {s:35,p:'Compétition',m:'fartlek',j:'vitesse_5x100_veille',wr:'—',wt:'—',ua:490,d:1,n:'Affûtage pur.'},
  {s:36,p:'Compétition',m:'sortie_recup',j:'vitesse_5x100_veille',wr:'—',wt:'—',ua:420,d:1,n:'Récup + activation.'},
  {s:37,p:'Récupération',m:'—',j:'sortie_recup',wr:'sortie_recup',wt:'sortie_recup',ua:330,d:1,n:'Récup totale.'},
  {s:38,p:'Base trail',m:'cote_45s',j:'fartlek',wr:'sortie_longue',wt:'sortie_longue',ua:720,d:0,n:'Reprise trail.'},
  {s:39,p:'Développement',m:'cote_1min30',j:'5min',wr:'sortie_longue',wt:'sortie_longue',ua:870,d:0,n:'Côtes VW/Voulgre.'},
  {s:40,p:'Spécifique trail',m:'cote_2min',j:'fartlek_pyramid_girouettes',wr:'sortie_longue',wt:'sortie_longue',ua:940,d:0,n:'Côtes Voulgre + Girouettes.'},
  {s:41,p:'Décharge',m:'fartlek',j:'sortie_recup',wr:'sortie_longue',wt:'sortie_longue',ua:490,d:1,n:'Décharge mi-bloc.'},
  {s:42,p:'Spécifique trail',m:'cote_long',j:'circuit_douves',wr:'sortie_longue',wt:'sortie_longue',ua:960,d:0,n:'Montagne + Douves.'},
  {s:43,p:'Spécifique trail',m:'escaliers',j:'fartlek_pyramid_girouettes',wr:'sortie_longue',wt:'sortie_longue',ua:900,d:0,n:'Escaliers + Girouettes.'},
  {s:44,p:'Compétition',m:'fartlek',j:'vitesse_5x100_veille',wr:'—',wt:'—',ua:510,d:1,n:'Forme optimale.'},
  {s:45,p:'Décharge',m:'sortie_recup',j:'fartlek',wr:'sortie_longue',wt:'sortie_longue',ua:490,d:1,n:'Fin de saison.'},
  {s:46,p:'Reprise',m:'cote_45s',j:'fartlek_structure',wr:'sortie_longue',wt:'sortie_longue',ua:720,d:0,n:'Maintien de forme.'},
  {s:47,p:'Décharge',m:'fartlek',j:'sortie_recup',wr:'sortie_longue',wt:'sortie_longue',ua:470,d:1,n:'Avant Fêtes.'},
  {s:48,p:'Coupure',m:'—',j:'—',wr:'—',wt:'—',ua:200,d:1,n:'🎉 Fêtes de Bayonne.'},
  {s:49,p:'Reprise',m:'—',j:'sortie_recup',wr:'sortie_recup',wt:'sortie_recup',ua:300,d:1,n:'Post-fêtes.'},
  {s:50,p:'Base',m:'sortie_recup',j:'fartlek',wr:'sortie_longue',wt:'sortie_longue',ua:500,d:1,n:'Reprise progressive.'},
  {s:51,p:'Base',m:'30s',j:'5min',wr:'sortie_longue',wt:'sortie_longue',ua:650,d:0,n:'Réintroduction VMA + seuil.'},
  {s:52,p:'Base',m:'cote_30s',j:'fartlek_10x1_1',wr:'sortie_longue',wt:'sortie_longue',ua:780,d:0,n:'Fin de saison → nouvelle S1.'},
];

const objectifs = [
  {s:13,nom:'Marathon La Rochelle',date:'2026-11-29',type:'route'},
  {s:27,nom:'France de Cross',date:'2027-03-07',type:'cross'},
  {s:28,nom:'Senpereko Trail',date:'2027-03-14',type:'trail'},
  {s:33,nom:'Semi-Marathon Saint-Sébastien',date:'2027-04-18',type:'route'},
  {s:35,nom:'Marathon Biarritz',date:'2027-05-02',type:'route'},
  {s:36,nom:'Euskal Raid Ascension',date:'2027-05-08',type:'trail'},
  {s:44,nom:'Saison Trails Pays Basque',date:'2027-06-28',type:'trail'},
];

const calFixed = [
  {id:'f1', date:'2026-09-07',type:'social',   titre:'Reprise collective + BBQ',desc:'Reprise de saison au stade La Floride. Footing d\'accueil + BBQ de rentr\u00E9e. Anciens et nouveaux membres bienvenus.'},
  {id:'f2', date:'2026-09-21',type:'trail',    titre:'Sortie trail La Floride \u2192 Anglet',desc:'Sortie groupe trail mixte. D\u00E9part La Floride \u2192 Mousserolles \u2192 Les Girouettes \u2192 retour. ~2h. Tous niveaux.'},
  {id:'f3', date:'2026-10-05',type:'route',    titre:'Sortie longue route \u2014 Bayonne \u2192 Biarritz',desc:'Sortie longue dimanche matin. Bayonne \u2192 Anglet \u2192 Biarritz par la c\u00F4te \u2192 retour. ~2h. Allure EF.'},
  {id:'f4', date:'2026-10-12',type:'montagne', titre:'\uD83C\uDFD4 Sortie montagne \u2014 Ursuya',desc:'Groupe A : Ursuya depuis Sare (678m). Groupe B : c\u00F4tes VW + fartlek Bayonne. Retrouvailles au caf\u00E9.'},
  {id:'f5', date:'2026-10-26',type:'rando',    titre:'Rando Rhune \u2014 familles bienvenues',desc:'Rando conviviale sur la Rhune. Ouvert aux familles. Pique-nique au sommet. 3h30 aller-retour.'},
  {id:'f6', date:'2026-11-02',type:'trail',    titre:'Trail nocturne intra-muros Bayonne',desc:'Sortie nocturne dans Bayonne illumin\u00E9e. Lampes frontales obligatoires. Remparts \u2192 quais \u2192 citadelle. 1h30.'},
  {id:'f7', date:'2026-11-09',type:'montagne', titre:'\uD83C\uDFD4 Sortie montagne \u2014 Mondarrain',desc:'Mondarrain depuis Itxassou (749m). Groupe A : mont\u00E9es techniques. Groupe B : footing Bayonne.'},
  {id:'f8', date:'2026-12-07',type:'montagne', titre:'\uD83C\uDFD4 Sortie montagne hivernale \u2014 Ursuya',desc:'Ursuya en hiver. \u00C9quipement adapt\u00E9 requis. Brouillard basque et vues d\u00E9gag\u00E9es si chance.'},
  {id:'f9', date:'2026-12-21',type:'social',   titre:'Footing de No\u00EBl + repas section',desc:'Footing festif dans Bayonne illumin\u00E9e. Puis repas de section. Une tradition.'},
  {id:'f10',date:'2027-01-11',type:'montagne', titre:'\uD83C\uDFD4 Sortie montagne \u2014 Jaizkibel c\u00F4t\u00E9 espagnol',desc:'Monte Jaizkibel depuis Fontarrabie. Vue sur le Txingudi. ~3h. Covoiturage depuis La Floride (~35 min).'},
  {id:'f11',date:'2027-01-25',type:'route',    titre:'Sortie longue allure semi',desc:'Sortie pour ceux qui pr\u00E9parent un semi-marathon de printemps. 1h45 allure progressive.'},
  {id:'f12',date:'2027-02-08',type:'montagne', titre:'\uD83C\uDFD4 Sortie montagne \u2014 Artzamendi',desc:'Artzamendi depuis Itxassou. Circuit trail vari\u00E9. ~2h30. Mont\u00E9e r\u00E9guli\u00E8re, descente technique.'},
  {id:'f13',date:'2027-02-22',type:'rando',    titre:'Trek 2 jours \u2014 Voie de la Bidassoa',desc:'Weekend rando : vendredi soir \u2192 dimanche. Itin\u00E9raire sur la Bidassoa. H\u00E9bergement g\u00EEte.'},
  {id:'f14',date:'2027-03-22',type:'montagne', titre:'\uD83C\uDFD4 Sortie montagne \u2014 Mondarrain lever de soleil',desc:'Mont\u00E9e au Mondarrain pour le solstice de printemps. D\u00E9part 7h. Caf\u00E9 thermos obligatoire.'},
  {id:'f15',date:'2027-04-19',type:'montagne', titre:'\uD83C\uDFD4 Sortie Pyr\u00E9n\u00E9es \u2014 La Rhune',desc:'La Rhune depuis Col de Saint-Ignace. ~3h aller-retour. Vue Atlantique et Pyr\u00E9n\u00E9es. Tous niveaux trail.'},
  {id:'f16',date:'2027-06-06',type:'social',   titre:'Course d\'orientation intra-muros',desc:'Organisation interne : course d\'orientation dans le vieux Bayonne. \u00C9quipes mixtes, ouvert aux familles.'},
  {id:'f17',date:'2027-06-21',type:'montagne', titre:'\uD83C\uDFD4 Mondarrain au coucher de soleil',desc:'Mont\u00E9e pour le solstice d\'\u00E9t\u00E9. D\u00E9part 18h, coucher de soleil au sommet. Pique-nique partag\u00E9.'},
  {id:'f18',date:'2027-07-05',type:'montagne', titre:'\uD83C\uDFD4 Sortie Pyr\u00E9n\u00E9es \u2014 Pic d\'Orhy',desc:'Sortie niveau confirm\u00E9 : Pic d\'Orhy (2017m) depuis Larrau. ~5h AR. Covoiturage Bayonne.'},
  {id:'f19',date:'2027-07-19',type:'rando',    titre:'Trek 2 jours \u2014 Haute Soule',desc:'Bivouac 2 jours. Larrau \u2192 Iraty. Nuit en cabane. Inscription via bo\u00EEte \u00E0 id\u00E9es.'},
]

const circuits = {
  fondamental: {
    corpo: [
      { bloc:'\uD83D\uDD25 Activation (8 min)', exos:[
        {id:'squat_pc', dose:'2\u00D715 \u00B7 allure lente'},
        {id:'clamshell', dose:'2\u00D715 chaque c\u00F4t\u00E9'},
        {id:'cheville_proprio', dose:'2\u00D730 sec chaque'},
        {id:'planche', dose:'2\u00D730 sec'},
      ]},
      { bloc:'\uD83E\uDDB5 Force jambes (15 min)', exos:[
        {id:'step_up', dose:'3\u00D710 chaque \u00B7 3s descente'},
        {id:'step_down', dose:'3\u00D78 chaque \u00B7 4s descente'},
        {id:'fentes', dose:'3\u00D710 chaque'},
        {id:'glute_bridge', dose:'3\u00D712 chaque'},
      ]},
      { bloc:'\uD83E\uDDF1 Gainage (10 min)', exos:[
        {id:'dead_bug', dose:'3\u00D78 altern\u00E9s lents'},
        {id:'bird_dog', dose:'3\u00D78 altern\u00E9s \u00B7 pause 2s'},
        {id:'planche_lat', dose:'3\u00D730 sec chaque'},
      ]},
      { bloc:'\uD83D\uDC5F Mollets / cheville (7 min)', exos:[
        {id:'calf_raises', dose:'3\u00D715 \u00B7 complet'},
        {id:'tibialis', dose:'3\u00D720'},
      ]},
      { bloc:'\uD83C\uDF3F \u00C9tirements (5 min)', exos:[
        {id:'psoas', dose:'60 sec chaque'},
        {id:'ischios', dose:'60 sec chaque'},
        {id:'mollets_etirement', dose:'60 sec \u00D7 2 variantes'},
      ]}
    ],
    elastiques: [
      { bloc:'\uD83D\uDD25 Activation (8 min)', exos:[
        {id:'monster_walk', dose:'3\u00D710 pas chaque sens'},
        {id:'clamshell', dose:'3\u00D712 \u00B7 \u00E9lastique l\u00E9ger'},
        {id:'cheville_proprio', dose:'2\u00D730 sec chaque'},
      ]},
      { bloc:'\uD83E\uDDB5 Force jambes (15 min)', exos:[
        {id:'step_up', dose:'3\u00D710 chaque \u00B7 poids cheville'},
        {id:'step_down', dose:'3\u00D710 chaque \u00B7 4s \u00B7 poids cheville'},
        {id:'rdl_unipodal', dose:'3\u00D710 \u00B7 KB l\u00E9ger ou halt\u00E8re'},
        {id:'glute_bridge', dose:'3\u00D712 \u00B7 \u00E9lastique sur cuisses'},
      ]},
      { bloc:'\uD83E\uDDF1 Gainage (12 min)', exos:[
        {id:'dead_bug', dose:'3\u00D710 \u00B7 \u00E9lastique sur pied'},
        {id:'pallof_press', dose:'3\u00D710 chaque c\u00F4t\u00E9'},
        {id:'planche_lat', dose:'3\u00D735 sec chaque'},
        {id:'bird_dog', dose:'3\u00D710 \u00B7 poids cheville'},
      ]},
      { bloc:'\uD83D\uDC5F Mollets (7 min)', exos:[
        {id:'calf_raises', dose:'3\u00D715 \u00B7 marche \u00B7 poids cheville'},
        {id:'tibialis', dose:'3\u00D715 \u00B7 \u00E9lastique'},
        {id:'abducteurs_debout', dose:'3\u00D715 chaque \u00B7 \u00E9lastique'},
      ]},
      { bloc:'\uD83C\uDF3F \u00C9tirements (5 min)', exos:[
        {id:'psoas', dose:'60 sec chaque'},
        {id:'piriforme', dose:'60 sec chaque'},
        {id:'mollets_etirement', dose:'60 sec \u00D7 2 variantes'},
      ]}
    ],
    salle: [
      { bloc:'\uD83D\uDD25 Activation (8 min)', exos:[
        {id:'monster_walk', dose:'3\u00D710 pas \u00B7 \u00E9lastique fort'},
        {id:'abducteurs_debout', dose:'3\u00D715 chaque \u00B7 machine'},
        {id:'cheville_proprio', dose:'2\u00D730 sec chaque'},
      ]},
      { bloc:'\uD83E\uDDB5 Force jambes (20 min)', exos:[
        {id:'squat_pc', dose:'4\u00D712 \u00B7 goblet squat KB'},
        {id:'fentes', dose:'4\u00D710 chaque \u00B7 halt\u00E8res'},
        {id:'step_up', dose:'3\u00D710 chaque \u00B7 KB ou halt\u00E8res'},
        {id:'rdl_unipodal', dose:'3\u00D710 \u00B7 KB moyen'},
        {id:'leg_press', dose:'3\u00D712 unilat\u00E9ral'},
      ]},
      { bloc:'\uD83E\uDDF1 Gainage (12 min)', exos:[
        {id:'pallof_press', dose:'3\u00D710 chaque c\u00F4t\u00E9 \u00B7 c\u00E2ble'},
        {id:'dead_bug', dose:'3\u00D710 \u00B7 KB tenu'},
        {id:'planche_lat', dose:'3\u00D735 sec chaque'},
      ]},
      { bloc:'\uD83D\uDC5F Mollets (8 min)', exos:[
        {id:'calf_raises', dose:'4\u00D715 \u00B7 KB lourd \u00B7 marche'},
        {id:'tibialis', dose:'3\u00D715 \u00B7 machine ou disque'},
        {id:'glute_bridge', dose:'4\u00D712 \u00B7 hip thrust barre l\u00E9g\u00E8re'},
      ]},
      { bloc:'\uD83C\uDF3F \u00C9tirements (5 min)', exos:[
        {id:'psoas', dose:'60 sec chaque'},
        {id:'piriforme', dose:'60 sec chaque'},
        {id:'bandelette', dose:'60 sec chaque \u00B7 foam roller'},
      ]}
    ]
  },
  force: {
    corpo: [
      { bloc:'\uD83D\uDD25 Activation (8 min)', exos:[
        {id:'clamshell', dose:'2\u00D715 \u00B7 lent'},
        {id:'monster_walk', dose:'2\u00D710 pas chaque sens'},
        {id:'squat_pc', dose:'2\u00D710 \u00B7 3s descente excentrique'},
      ]},
      { bloc:'\uD83E\uDDB5 Force maximale (20 min)', exos:[
        {id:'squat_unipodal', dose:'4\u00D78 chaque \u00B7 4s descente'},
        {id:'step_down', dose:'4\u00D710 chaque \u00B7 5s excentrique'},
        {id:'fentes', dose:'4\u00D78 chaque \u00B7 3s excentrique'},
        {id:'rdl_unipodal', dose:'3\u00D710 chaque \u00B7 lent'},
      ]},
      { bloc:'\uD83E\uDDF1 Gainage lourd (12 min)', exos:[
        {id:'planche', dose:'4\u00D750 sec'},
        {id:'planche_lat', dose:'3\u00D740 sec + 10 dips'},
        {id:'pallof_press', dose:'Sans \u00E9quip : planche rotative'},
      ]},
      { bloc:'\uD83D\uDC5F Mollets intensif (8 min)', exos:[
        {id:'calf_raises', dose:'4\u00D720 \u00B7 amplitude max'},
        {id:'tibialis', dose:'3\u00D720'},
      ]},
      { bloc:'\uD83C\uDF3F \u00C9tirements (5 min)', exos:[
        {id:'psoas', dose:'90 sec chaque'},
        {id:'ischios', dose:'90 sec chaque'},
        {id:'piriforme', dose:'60 sec chaque'},
      ]}
    ],
    elastiques: [
      { bloc:'\uD83D\uDD25 Activation (8 min)', exos:[
        {id:'monster_walk', dose:'3\u00D712 \u00B7 \u00E9lastique fort aux chevilles'},
        {id:'clamshell', dose:'3\u00D712 \u00B7 \u00E9lastique fort'},
        {id:'abducteurs_debout', dose:'3\u00D712 chaque \u00B7 \u00E9lastique'},
      ]},
      { bloc:'\uD83E\uDDB5 Force (20 min)', exos:[
        {id:'squat_unipodal', dose:'4\u00D78 \u00B7 4s excentrique \u00B7 poids cheville'},
        {id:'step_down', dose:'4\u00D710 \u00B7 5s \u00B7 poids cheville'},
        {id:'rdl_unipodal', dose:'4\u00D710 \u00B7 KB moyen'},
        {id:'fentes', dose:'4\u00D78 chaque \u00B7 poids cheville'},
      ]},
      { bloc:'\uD83E\uDDF1 Gainage (12 min)', exos:[
        {id:'pallof_press', dose:'4\u00D710 chaque \u00B7 \u00E9lastique fort'},
        {id:'dead_bug', dose:'3\u00D712 \u00B7 poids cheville'},
        {id:'planche_lat', dose:'3\u00D745 sec + dips'},
      ]},
      { bloc:'\uD83D\uDC5F Mollets (8 min)', exos:[
        {id:'calf_raises', dose:'4\u00D715 \u00B7 poids cheville \u00B7 marche'},
        {id:'tibialis', dose:'3\u00D720 \u00B7 \u00E9lastique'},
        {id:'glute_bridge', dose:'3\u00D712 \u00B7 \u00E9lastique sur cuisses \u00B7 poids sur bassin'},
      ]},
      { bloc:'\uD83C\uDF3F \u00C9tirements', exos:[
        {id:'psoas', dose:'90 sec chaque'},
        {id:'ischios', dose:'\u00E9lastique \u00B7 90 sec chaque'},
        {id:'bandelette', dose:'60 sec chaque'},
      ]}
    ],
    salle: [
      { bloc:'\uD83D\uDD25 Activation (8 min)', exos:[
        {id:'monster_walk', dose:'3\u00D712 \u00B7 \u00E9lastique fort'},
        {id:'hip_thrust', dose:'2\u00D715 \u00B7 barre l\u00E9g\u00E8re \u00B7 activation'},
      ]},
      { bloc:'\uD83E\uDDB5 Force maximale (25 min)', exos:[
        {id:'squat_pc', dose:'5\u00D75 \u00B7 back squat charg\u00E9 \u00B7 3s excentrique'},
        {id:'fentes', dose:'4\u00D78 chaque \u00B7 barre ou KB lourds'},
        {id:'step_down', dose:'4\u00D710 \u00B7 5s \u00B7 KB lourd'},
        {id:'rdl_unipodal', dose:'4\u00D78 \u00B7 barre ou KB lourd'},
        {id:'leg_press', dose:'4\u00D710 \u00B7 charg\u00E9 \u00B7 unilat\u00E9ral'},
      ]},
      { bloc:'\uD83C\uDF51 Fessiers (10 min)', exos:[
        {id:'hip_thrust', dose:'4\u00D710 \u00B7 barre charg\u00E9e'},
        {id:'abducteurs_debout', dose:'3\u00D715 \u00B7 machine'},
      ]},
      { bloc:'\uD83D\uDC5F Mollets (8 min)', exos:[
        {id:'calf_raises', dose:'5\u00D715 \u00B7 machine charg\u00E9e'},
        {id:'tibialis', dose:'3\u00D715 \u00B7 machine'},
      ]},
      { bloc:'\uD83C\uDF3F \u00C9tirements', exos:[
        {id:'psoas', dose:'90 sec chaque'},
        {id:'ischios', dose:'90 sec chaque'},
        {id:'bandelette', dose:'foam roller \u00B7 90 sec chaque'},
      ]}
    ]
  },
  specifique: {
    corpo: [
      { bloc:'\uD83D\uDD25 Activation (8 min)', exos:[
        {id:'squat_jump', dose:'2\u00D76 \u00B7 l\u00E9ger \u00B7 allumage'},
        {id:'clamshell', dose:'2\u00D712 \u00B7 lent'},
        {id:'cheville_proprio', dose:'2\u00D730 sec'},
      ]},
      { bloc:'\u26A1 Pliom\u00E9trie trail (15 min)', exos:[
        {id:'squat_jump', dose:'4\u00D78 \u00B7 puissants'},
        {id:'bounding', dose:'4\u00D710 aller-retour'},
        {id:'drop_jump', dose:'3\u00D78 \u00B7 box 20cm'},
      ]},
      { bloc:'\uD83E\uDDB5 Force unilat\u00E9rale (12 min)', exos:[
        {id:'squat_unipodal', dose:'3\u00D78 chaque \u00B7 lent'},
        {id:'step_down', dose:'3\u00D710 \u00B7 5s excentrique'},
        {id:'rdl_unipodal', dose:'3\u00D710 chaque'},
      ]},
      { bloc:'\uD83D\uDC5F Mollets & cheville (8 min)', exos:[
        {id:'calf_raises', dose:'3\u00D720 \u00B7 amplitude max'},
        {id:'cheville_proprio', dose:'3\u00D730 sec \u00B7 yeux ferm\u00E9s'},
      ]},
      { bloc:'\uD83C\uDF3F \u00C9tirements (7 min)', exos:[
        {id:'psoas', dose:'60 sec chaque'},
        {id:'piriforme', dose:'60 sec chaque'},
        {id:'mollets_etirement', dose:'60 sec \u00D7 2 variantes'},
      ]}
    ],
    elastiques: [
      { bloc:'\uD83D\uDD25 Activation (8 min)', exos:[
        {id:'monster_walk', dose:'3\u00D710 pas \u00B7 \u00E9lastique'},
        {id:'bounding', dose:'2\u00D78 \u00B7 activation'},
      ]},
      { bloc:'\u26A1 Pliom\u00E9trie (15 min)', exos:[
        {id:'squat_jump', dose:'4\u00D78'},
        {id:'bounding', dose:'4\u00D710 AR \u00B7 poids cheville'},
        {id:'drop_jump', dose:'3\u00D78'},
      ]},
      { bloc:'\uD83E\uDDB5 Force (12 min)', exos:[
        {id:'squat_unipodal', dose:'3\u00D78 \u00B7 poids cheville'},
        {id:'step_down', dose:'3\u00D710 \u00B7 poids cheville \u00B7 5s'},
        {id:'rdl_unipodal', dose:'3\u00D710 \u00B7 KB'},
      ]},
      { bloc:'\uD83E\uDDF1 Gainage anti-rotation (8 min)', exos:[
        {id:'pallof_press', dose:'4\u00D710 chaque \u00B7 \u00E9lastique'},
        {id:'planche_lat', dose:'3\u00D740 sec + dips'},
      ]},
      { bloc:'\uD83C\uDF3F \u00C9tirements', exos:[
        {id:'psoas', dose:'60 sec chaque'},
        {id:'ischios', dose:'\u00E9lastique \u00B7 60 sec chaque'},
        {id:'bandelette', dose:'60 sec chaque'},
      ]}
    ],
    salle: [
      { bloc:'\uD83D\uDD25 Activation (8 min)', exos:[
        {id:'monster_walk', dose:'3\u00D712 \u00B7 fort'},
        {id:'hip_thrust', dose:'2\u00D715 \u00B7 activation l\u00E9g\u00E8re'},
      ]},
      { bloc:'\u26A1 Pliom\u00E9trie (15 min)', exos:[
        {id:'box_jump', dose:'4\u00D76 \u00B7 box 40cm'},
        {id:'squat_jump', dose:'3\u00D78 \u00B7 gilet lest\u00E9 l\u00E9ger'},
        {id:'drop_jump', dose:'3\u00D76 \u00B7 box 30cm'},
        {id:'bounding', dose:'3\u00D710 AR'},
      ]},
      { bloc:'\uD83E\uDDB5 Force sp\u00E9cifique (15 min)', exos:[
        {id:'squat_unipodal', dose:'3\u00D78 \u00B7 KB \u00B7 4s excentrique'},
        {id:'rdl_unipodal', dose:'3\u00D710 \u00B7 KB lourd'},
        {id:'hip_thrust', dose:'3\u00D710 \u00B7 barre charg\u00E9e'},
      ]},
      { bloc:'\uD83D\uDC5F Mollets (8 min)', exos:[
        {id:'calf_raises', dose:'4\u00D715 \u00B7 machine charg\u00E9e'},
        {id:'tibialis', dose:'3\u00D715 \u00B7 machine'},
      ]},
      { bloc:'\uD83C\uDF3F \u00C9tirements', exos:[
        {id:'psoas', dose:'60 sec chaque'},
        {id:'piriforme', dose:'60 sec chaque'},
        {id:'bandelette', dose:'foam roller \u00B7 90 sec'},
      ]}
    ]
  },
  competition: {
    corpo: [
      { bloc:'\u26A1 Activation + vivacit\u00E9 (10 min)', exos:[
        {id:'squat_jump', dose:'2\u00D76 \u00B7 l\u00E9ger'},
        {id:'bounding', dose:'2\u00D78 aller-retour'},
        {id:'clamshell', dose:'2\u00D712 chaque'},
        {id:'cheville_proprio', dose:'2\u00D730 sec'},
      ]},
      { bloc:'\uD83E\uDDB5 Entretien force (12 min)', exos:[
        {id:'step_down', dose:'3\u00D78 \u00B7 4s excentrique'},
        {id:'glute_bridge', dose:'3\u00D710 chaque'},
        {id:'rdl_unipodal', dose:'3\u00D78 \u00B7 l\u00E9ger'},
      ]},
      { bloc:'\uD83D\uDC5F Mollets & pr\u00E9vention (8 min)', exos:[
        {id:'calf_raises', dose:'3\u00D715'},
        {id:'tibialis', dose:'3\u00D720'},
        {id:'cheville_proprio', dose:'2\u00D730 sec yeux ferm\u00E9s'},
      ]},
      { bloc:'\uD83C\uDF3F \u00C9tirements (10 min)', exos:[
        {id:'psoas', dose:'90 sec chaque'},
        {id:'ischios', dose:'90 sec chaque'},
        {id:'piriforme', dose:'60 sec chaque'},
        {id:'mollets_etirement', dose:'60 sec \u00D7 2'},
      ]}
    ],
    elastiques: [
      { bloc:'\u26A1 Activation (10 min)', exos:[
        {id:'monster_walk', dose:'2\u00D710 \u00B7 \u00E9lastique l\u00E9ger'},
        {id:'squat_jump', dose:'2\u00D76'},
        {id:'bounding', dose:'2\u00D78 AR'},
      ]},
      { bloc:'\uD83E\uDDB5 Entretien (12 min)', exos:[
        {id:'step_down', dose:'3\u00D78 \u00B7 poids cheville \u00B7 4s'},
        {id:'rdl_unipodal', dose:'3\u00D78 \u00B7 KB l\u00E9ger'},
        {id:'clamshell', dose:'3\u00D712 \u00B7 \u00E9lastique'},
      ]},
      { bloc:'\uD83D\uDC5F Mollets (8 min)', exos:[
        {id:'calf_raises', dose:'3\u00D715 \u00B7 poids cheville'},
        {id:'cheville_proprio', dose:'3\u00D730 sec'},
      ]},
      { bloc:'\uD83C\uDF3F \u00C9tirements', exos:[
        {id:'psoas', dose:'90 sec chaque'},
        {id:'piriforme', dose:'60 sec chaque'},
        {id:'bandelette', dose:'foam roller \u00B7 60 sec'},
      ]}
    ],
    salle: [
      { bloc:'\u26A1 Activation + pliom\u00E9trie l\u00E9g\u00E8re (10 min)', exos:[
        {id:'box_jump', dose:'2\u00D75 \u00B7 box basse'},
        {id:'monster_walk', dose:'2\u00D710 \u00B7 fort'},
        {id:'bounding', dose:'2\u00D78 AR'},
      ]},
      { bloc:'\uD83E\uDDB5 Entretien force (15 min)', exos:[
        {id:'squat_unipodal', dose:'3\u00D76 \u00B7 KB \u00B7 mod\u00E9r\u00E9'},
        {id:'rdl_unipodal', dose:'3\u00D78 \u00B7 KB moyen'},
        {id:'hip_thrust', dose:'3\u00D710 \u00B7 mod\u00E9r\u00E9'},
      ]},
      { bloc:'\uD83D\uDC5F Mollets (8 min)', exos:[
        {id:'calf_raises', dose:'3\u00D715 \u00B7 machine charg\u00E9e'},
        {id:'tibialis', dose:'3\u00D715'},
      ]},
      { bloc:'\uD83C\uDF3F \u00C9tirements', exos:[
        {id:'psoas', dose:'90 sec chaque'},
        {id:'ischios', dose:'90 sec chaque'},
        {id:'bandelette', dose:'foam roller \u00B7 90 sec'},
      ]}
    ]
  }
}