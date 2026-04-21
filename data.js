// ══════════════════════════════════════════════════════════════
// data.js — Données AB Running Loisir
// Modifiable par les coachs via admin.html
// ══════════════════════════════════════════════════════════════

// ── INFOS CLUB (bandeau page accueil) ───────────────────────────
// Chaque message peut avoir : titre, texte, dateFin (optionnel, ISO YYYY-MM-DD)
// Les messages dont dateFin est dépassée ne sont plus affichés
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

// ── SEUILS DE DIFFICULTÉ (système 5 niveaux type piste de ski) ──
// Basés sur le total UA de la séance (RPE × durée incluant échauff + PPG)
const difficulteNiveaux = [
  { key:'vert',   label:'Vert — Facile',         emoji:'🟢', couleur:'#2E8B3E', ua_max:280, description:'Accessible à tous, récupération ou reprise' },
  { key:'bleu',   label:'Bleu — Modéré',         emoji:'🔵', couleur:'#3A7BBF', ua_max:380, description:'Séance standard, intensité modérée' },
  { key:'orange', label:'Orange — Soutenu',       emoji:'🟠', couleur:'#E67E22', ua_max:480, description:'Intensité soutenue, gérer l\'effort' },
  { key:'rouge',  label:'Rouge — Difficile',     emoji:'🔴', couleur:'#C0392B', ua_max:600, description:'Séance exigeante, pour confirmés' },
  { key:'noir',   label:'Noir — Très difficile', emoji:'⚫', couleur:'#1A1A1A', ua_max:9999, description:'Charge maximale, réservé aux séances phares' }
];

// ── TEXTES EXPLICATIFS CALCULATEUR ──────────────────────────────
const calculateurTextes = {
  intro: "Cette page te permet de calculer ta charge d'entraînement hebdomadaire. Remplis simplement la durée et le ressenti (RPE) de chacune de tes séances. Les calculs se font automatiquement pour t'aider à visualiser ta charge et à progresser sans te blesser.",

  rpe_titre: "Qu'est-ce que le RPE ?",
  rpe_texte: "Le RPE (Rating of Perceived Exertion, ou Effort Perçu) est une note de 1 à 10 que tu donnes à ta séance, une minute après l'avoir terminée. Cette note reflète le ressenti global : facilité respiratoire, fatigue musculaire, difficulté mentale.\n\n1-2 : très facile, comme marcher\n3-4 : facile, allure de conversation\n5-6 : modéré, respiration contrôlée\n7-8 : difficile, parler devient compliqué\n9-10 : très difficile, effort maximal",

  ua_titre: "Qu'est-ce que l'UA ?",
  ua_texte: "L'UA (Unité Arbitraire) est une mesure de la charge réelle d'une séance. C'est un simple calcul : UA = RPE × Durée (en minutes).\n\nExemple : une séance de 45 minutes ressentie à 7/10 représente 315 UA.\n\nL'intérêt ? Une semaine avec beaucoup d'UA = charge élevée, une semaine légère = UA bas. En suivant ton total hebdomadaire, tu peux progresser par paliers sans tomber dans le surentraînement.",

  bloc_titre: "La logique du bloc de 4 semaines",
  bloc_texte: "Un cycle d'entraînement bien construit suit une progression sur 4 semaines :\n\nSemaine 1 — Base : charge modérée, on pose les fondations.\nSemaine 2 — Montée : +10 à 15% d'UA par rapport à S1.\nSemaine 3 — Pic : +20 à 25% d'UA par rapport à S1 (semaine la plus dure).\nSemaine 4 — Récupération : -40% d'UA pour assimiler le travail.\n\nCette alternance charge/récupération est indispensable pour progresser sans se blesser."
};

// ── SEUILS CHARGE HEBDOMADAIRE ──────────────────────────────────
const chargeHebdoSeuils = [
  { max:400,  label:'Très légère', couleur:'#2E8B3E', description:'Repos actif, reprise' },
  { max:600,  label:'Débutant',    couleur:'#5FAD4E', description:'2 séances club + 1 sortie' },
  { max:800,  label:'Intermédiaire',couleur:'#3A7BBF', description:'Semaine normale standard' },
  { max:1050, label:'Chargée',     couleur:'#E67E22', description:'Semaine intense (S2/S3 bloc)' },
  { max:9999, label:'Surcharge',   couleur:'#C0392B', description:'À surveiller de près' }
];

const terrainLabel = {
  // Bayonne
  halage:    {icon:'\uD83C\uDF0A',label:'Halage \u00B7 Nive',cls:'tag-sky'},
  floride:   {icon:'\u26F0\uFE0F',label:'C\u00F4te La Floride',cls:'tag-blue'},
  voulgre:   {icon:'\u26F0\uFE0F',label:'C\u00F4te Voulgre',cls:'tag-blue'},
  vw:        {icon:'\u26F0\uFE0F',label:'C\u00F4te VW',cls:'tag-blue'},
  douves:    {icon:'\uD83C\uDF3F',label:'Les Douves',cls:'tag-green'},
  intramuros:{icon:'\uD83C\uDFF0',label:'Intra-muros',cls:'tag-green'},
  stades:    {icon:'\uD83C\uDFDF',label:'Tour stades rugby',cls:'tag-sky'},
  // Anglet
  coteanglet:{icon:'\u26F0\uFE0F',label:'C\u00F4te Anglet',cls:'tag-blue'},
  girouettes:{icon:'\uD83C\uDF3F',label:'Parc Les Girouettes',cls:'tag-green'},
  chiberta:  {icon:'\uD83C\uDF32',label:'For\u00EAt Chiberta',cls:'tag-green'},
  plage:     {icon:'\uD83C\uDFD6',label:'Plage + Chiberta',cls:'tag-sky'},
  // Biarritz & montagne
  escaliers: {icon:'\uD83E\uDE9C',label:'Escaliers Biarritz',cls:'tag-ocre'},
  montagne:  {icon:'\uD83C\uDFD4',label:'Ursuya / Mondarrain',cls:'tag-rouge'},
  vvf:       {icon:'\u26F0\uFE0F',label:'C\u00F4te VVF Anglet',cls:'tag-blue'},
}

const phaseLabels = {
  'phase-reprise':   {label:'Reprise',cls:'phase-reprise'},
  'phase-base':      {label:'Base endurance',cls:'phase-base'},
  'phase-dev':       {label:'D\u00E9veloppement',cls:'phase-dev'},
  'phase-force':     {label:'Force / D+',cls:'phase-force'},
  'phase-prepa':     {label:'Pr\u00E9pa trail',cls:'phase-prepa'},
  'phase-precomp':   {label:'Pr\u00E9-comp\u00E9tition',cls:'phase-precomp'},
  'phase-senpereko': {label:'Objectif course',cls:'phase-event'},
  'phase-euskal':    {label:'Objectif course',cls:'phase-event'},
  'phase-recup':     {label:'R\u00E9cup\u00E9ration',cls:'phase-recup'},
  'phase-grp':       {label:'Bloc montagne',cls:'phase-montagne'},
  'phase-montagne':  {label:'Bloc montagne',cls:'phase-montagne'},
}

const niveauxData = {
  '30s': {
    label: 'Efforts 30 secondes (VMA courte)',
    reps:  ['6\u00D7', '10\u00D7', '14\u00D7'],
    recup: ['2min', '1min30', '1min'],
    allure:['allure vive contr\u00F4l\u00E9e', 'allure Z4 soutenue', 'allure VMA proche'],
    notes: 'S\u00E9ance neuromusculaire \u2014 jamais \u00E0 fond d\u00E8s le d\u00E9part',
  },
  '45s': {
    label: 'Efforts 45 secondes',
    reps:  ['6\u00D7', '8\u00D7', '12\u00D7'],
    recup: ['2min', '1min45', '1min30'],
    allure:['allure Z4', 'allure Z4-Z5', 'allure Z5'],
    notes: 'Interm\u00E9diaire entre 30s et 1min \u2014 id\u00E9al en c\u00F4te',
  },
  '1min': {
    label: 'Efforts 1 minute',
    reps:  ['6\u00D7', '10\u00D7', '14\u00D7'],
    recup: ['2min', '1min45', '1min30'],
    allure:['effort per\u00E7u 7/10', '85-90% FCmax', '88-93% FCmax'],
    notes: 'La base du fractionn\u00E9 court \u2014 tenir l\'allure sur toutes les reps',
  },
  '1min30': {
    label: 'Efforts 1min30',
    reps:  ['5\u00D7', '8\u00D7', '12\u00D7'],
    recup: ['3min', '2min', '1min45'],
    allure:['effort soutenu contr\u00F4l\u00E9', '85-90% FCmax', '90-95% FCmax'],
    notes: 'Dur\u00E9e id\u00E9ale pour les c\u00F4tes VW et Voulgre',
  },
  '2min': {
    label: 'Efforts 2 minutes',
    reps:  ['4\u00D7', '6\u00D7', '10\u00D7'],
    recup: ['3min', '2min30', '2min'],
    allure:['effort g\u00E9rable', '85-90% FCmax', '90-93% FCmax'],
    notes: 'Transition vers le seuil \u2014 rythme \u00E0 maintenir sur toutes les reps',
  },
  '3min': {
    label: 'Efforts 3 minutes (seuil)',
    reps:  ['3\u00D7', '5\u00D7', '8\u00D7'],
    recup: ['4min', '3min', '2min30'],
    allure:['allure seuil doux', '80-85% FCmax', '85-90% FCmax'],
    notes: 'Introduction au travail seuil \u2014 peut parler par mots',
  },
  '4min': {
    label: 'Efforts 4 minutes (seuil)',
    reps:  ['3\u00D7', '4\u00D7', '6\u00D7'],
    recup: ['4min', '3min30', '3min'],
    allure:['allure seuil confort', '80-85% FCmax', '85-88% FCmax'],
  },
  '5min': {
    label: 'Efforts 5 minutes (seuil)',
    reps:  ['2\u00D7', '4\u00D7', '6\u00D7'],
    recup: ['4min', '3min30', '3min'],
    allure:['allure seuil', '80-85% FCmax', '85-88% FCmax'],
    notes: 'S\u00E9ance cl\u00E9 marathon et trail \u2014 r\u00E9gularit\u00E9 avant tout',
  },
  '6min': {
    label: 'Efforts 6 minutes (seuil long)',
    reps:  ['2\u00D7', '3\u00D7', '5\u00D7'],
    recup: ['4min', '3min30', '3min'],
    allure:['allure seuil confort', '80-83% FCmax', '83-87% FCmax'],
  },
  '8min': {
    label: 'Efforts 8 minutes (allure course)',
    reps:  ['2\u00D7', '3\u00D7', '4\u00D7'],
    recup: ['5min', '4min', '3min30'],
    allure:['allure semi d\u00E9butant', 'allure cible course', 'l\u00E9g\u00E8rement sous allure course'],
    notes: 'Simulation de course \u2014 reproduire exactement l\'allure cible',
  },
  '10min': {
    label: 'Efforts 10 minutes (tempo)',
    reps:  ['1\u00D7', '2\u00D7', '3\u00D7'],
    recup: ['5min', '5min', '4min'],
    allure:['footing soutenu', 'allure seuil', 'allure seuil+'],
  },
  '12min': {
    label: 'Efforts 12 minutes',
    reps:  ['1\u00D7', '2\u00D7', '3\u00D7'],
    recup: ['\u2014', '5min', '4min'],
    allure:['pas recommand\u00E9 \u2014 faire 2\u00D75min', 'allure seuil', 'allure seuil+'],
  },
  '15min': {
    label: 'Efforts 15 minutes (tempo long)',
    reps:  ['1\u00D7', '2\u00D7', '2\u00D7'],
    recup: ['\u2014', '5min', '4min'],
    allure:['pas recommand\u00E9', 'allure seuil', 'allure seuil'],
    notes: 'S\u00E9ance exigeante mentalement \u2014 pr\u00E9parer les ravitaillements',
  },
  '20min': {
    label: 'Efforts 20 minutes (seuil continu)',
    reps:  ['1\u00D7', '1\u00D7', '2\u00D7'],
    recup: ['\u2014', '\u2014', '5min'],
    allure:['footing soutenu 20min', 'allure EF rapide', 'allure seuil'],
  },
  '3030': {
    label: '30"/30" (VMA courte)',
    reps:  ['6\u00D7', '10\u00D7', '15\u00D7'],
    recup: ['30s r\u00E9cup', '30s r\u00E9cup', '30s r\u00E9cup'],
    allure:['allure 5km+', 'allure VMA -10%', 'allure VMA'],
    notes: 'S\u00E9ance de r\u00E9f\u00E9rence VMA \u2014 r\u00E9cup trottin\u00E9e obligatoire',
  },
  'fartlek': {
    label: 'Fartlek (libre ou structur\u00E9)',
    reps:  ['30min', '45min', '60min'],
    recup: ['libre', 'structur\u00E9', 'intensif'],
    allure:['acc\u00E9l\u00E9rations libres mod\u00E9r\u00E9es', 'Z3-Z4 dans les mont\u00E9es', 'Z4-Z5 intensif'],
    notes: 'Adapter au terrain \u2014 jamais de chrono sur les efforts',
  },
  'fartlek_structure': {
    label: 'Fartlek structur\u00E9 (2min/2min)',
    reps:  ['4 cycles', '6 cycles', '8 cycles'],
    recup: ['2min trot', '1min30 trot', '1min trot'],
    allure:['Z3-Z4', 'Z4', 'Z4-Z5'],
    notes: 'Format : X min vif / X min trot \u2014 conserver l\'allure identique sur tous les blocs',
  },
  'cote': {
    label: 'C\u00F4tes (mont\u00E9e g\u00E9n\u00E9rique)',
    reps:  ['6\u00D7', '10\u00D7', '14\u00D7'],
    recup: ['descente march\u00E9e', 'descente trottin\u00E9e', 'descente rapide'],
    allure:['effort 7/10', 'effort 8/10', 'effort 9/10'],
    notes: 'Adapter \u00E0 la longueur de la c\u00F4te (voir types sp\u00E9cifiques)',
  },
  'cote_30s': {
    label: 'C\u00F4tes courtes 30s (La Floride)',
    reps:  ['6\u00D7', '10\u00D7', '14\u00D7'],
    recup: ['descente march\u00E9e', 'descente trottin\u00E9e', 'descente rapide'],
    allure:['explosif 8/10', 'explosif 9/10', 'max contr\u00F4l\u00E9'],
    notes: 'Genoux hauts, bras actifs \u2014 qualit\u00E9 > quantit\u00E9',
  },
  'cote_1min': {
    label: 'C\u00F4tes 1 minute (VW)',
    reps:  ['5\u00D7', '8\u00D7', '12\u00D7'],
    recup: ['descente march\u00E9e', 'descente trottin\u00E9e', 'descente rapide'],
    allure:['effort soutenu', 'effort 8/10', 'effort 9/10'],
  },
  'cote_1min30': {
    label: 'C\u00F4tes 1min30 (VW ou Voulgre)',
    reps:  ['4\u00D7', '6\u00D7', '10\u00D7'],
    recup: ['3min', '2min30', '2min'],
    allure:['soutenu contr\u00F4l\u00E9', 'effort 8/10', 'effort 9/10'],
    notes: 'Descente travaill\u00E9e : petits pas, genoux fl\u00E9chis',
  },
  'cote_2min': {
    label: 'C\u00F4tes 2 minutes (Voulgre)',
    reps:  ['4\u00D7', '6\u00D7', '8\u00D7'],
    recup: ['3min', '2min30', '2min'],
    allure:['puissance ma\u00EEtris\u00E9e', 'puissance', 'puissance max'],
    notes: 'S\u00E9ance phare trail \u2014 focus sur la descente aussi',
  },
  'cote_long': {
    label: 'C\u00F4tes longues 3-10min (montagne)',
    reps:  ['3\u00D7', '5\u00D7', '6\u00D7'],
    recup: ['r\u00E9cup compl\u00E8te', 'r\u00E9cup trottin\u00E9e', 'r\u00E9cup active'],
    allure:['effort g\u00E9rable Z3-Z4', 'Z4', 'Z4-Z5'],
    notes: 'R\u00E9serv\u00E9 aux sorties montagne \u2014 adapter au d\u00E9nivel\u00E9',
  },
  'descente': {
    label: 'Travail de descente technique',
    reps:  ['5\u00D7', '8\u00D7', '10\u00D7'],
    recup: ['mont\u00E9e r\u00E9cup', 'mont\u00E9e r\u00E9cup', 'mont\u00E9e r\u00E9cup'],
    allure:['allure tr\u00E8s douce \u2014 focus technique', 'contr\u00F4l\u00E9', 'rapide + technique'],
    notes: 'Petits pas, regard loin, genoux fl\u00E9chis \u2014 cl\u00E9 anti-blessure',
  },
  'escaliers': {
    label: 'Escaliers (C\u00F4te des Basques)',
    reps:  ['3 blocs 3 AR', '4 blocs 3 AR', '5 blocs 3 AR'],
    recup: ['descente march\u00E9e', 'descente lente', 'descente contr\u00F4l\u00E9e'],
    allure:['mont\u00E9e genoux hauts', 'mont\u00E9e soutenue', 'mont\u00E9e vive'],
    notes: 'Descente obligatoirement lente \u2014 fort impact excentrique quadriceps',
  },
  'ppg_seance': {
    label: 'S\u00E9ance PPG d\u00E9di\u00E9e (renforcement)',
    reps:  ['2 s\u00E9ries', '3 s\u00E9ries', '4 s\u00E9ries'],
    recup: ['1min r\u00E9cup', '45s r\u00E9cup', '30s r\u00E9cup'],
    allure:['technique \u2014 pas d\'\u00E9chec', 'qualit\u00E9 de mouvement', 'intensit\u00E9 croissante'],
    notes: 'Faire avant la course ou >6h apr\u00E8s \u2014 jamais en r\u00E9cup active',
  },
  'interval_court': {
    label: 'Intervalles courts (15s-20s)',
    reps:  ['8\u00D7', '12\u00D7', '16\u00D7'],
    recup: ['45s r\u00E9cup', '30s r\u00E9cup', '20s r\u00E9cup'],
    allure:['allure VMA', 'allure VMA+', 'allure > VMA'],
    notes: 'Format Tabata adapt\u00E9 \u2014 explosivit\u00E9 neuromusculaire',
  },
  'allure_marathon': {
    label: 'Sorties allure marathon',
    reps:  ['45min', '1h15', '1h30'],
    recup: ['\u2014', '\u2014', '\u2014'],
    allure:['allure marathon +15s/km', 'allure marathon +5s/km', 'allure marathon exacte'],
    notes: 'Pratiquer l\'allure cible en conditions r\u00E9elles',
  },
  'allure_semi': {
    label: 'Sorties allure semi',
    reps:  ['30min', '1h', '1h15'],
    recup: ['\u2014', '\u2014', '\u2014'],
    allure:['allure semi +10s/km', 'allure semi exacte', 'allure semi -5s/km'],
  },
  'sortie_longue': {
    label: 'Sortie longue endurance',
    reps:  ['1h', '1h30', '2h+'],
    recup: ['\u2014', '\u2014', '\u2014'],
    allure:['allure EF (conversation)', 'allure EF', 'allure EF \u00E0 EF+'],
    notes: 'Jamais > 80% FCmax \u2014 base a\u00E9robie fondamentale',
  },
  'sortie_recup': {
    label: 'Sortie r\u00E9cup\u00E9ration active',
    reps:  ['40min', '50min', '1h'],
    recup: ['\u2014', '\u2014', '\u2014'],
    allure:['allure tr\u00E8s douce', 'allure douce', 'allure EF tr\u00E8s basse'],
    notes: 'Lendemain de s\u00E9ance intensive \u2014 jamais de pression',
  },
  'pyramid_1234321': {
    label: 'Pyramide 1\'2\'3\'4\'3\'2\'1\' R=\u00BD temps',
    reps:  ['1 passage complet', '1 passage + 1 extra 1\'2\'3\'', '1 passage + 1 complet'],
    recup: ['R=\u00BD temps effort', 'R=\u00BD temps', 'R=\u00BD temps strict'],
    allure:['Z3 mont\u00E9e, Z2 descente', 'Z4 sur les hauts, Z3 descente', 'Z4-Z5 sur les sommets 4\''],
    notes: 'S\u00E9ance pyramide classique \u2014 monter en intensit\u00E9 sur les longs, redescendre sur les courts. R = la moiti\u00E9 du temps de l\'effort pr\u00E9c\u00E9dent.',
  },
  'pyramid_1246421': {
    label: 'Pyramide 1\'2\'4\'6\'4\'2\'1\' R=\u00BD temps',
    reps:  ['1 passage complet', '1 passage complet', '1 passage + bis 1\'2\''],
    recup: ['R=\u00BD temps', 'R=\u00BD temps', 'R=\u00BD temps strict'],
    allure:['Z3 sur les longs', 'Z4 sur les 4\' et 6\'', 'Z4-Z5 sur les 6\''],
    notes: 'Pyramide longue \u2014 le 6\' est la cl\u00E9. G\u00E9rer l\'effort pour tenir la descente de la pyramide.',
  },
  'pyramid_246642': {
    label: 'Pyramide 2\'4\'6\'6\'4\'2\' R=\u00BD temps',
    reps:  ['1 passage complet', '1 passage complet', '1 passage + r\u00E9p\u00E9tition 2\''],
    recup: ['R=\u00BD temps', 'R=\u00BD temps', 'R=\u00BD temps strict'],
    allure:['Z3 confort', 'Z4 sur les 6\'', 'Z4-Z5'],
    notes: 'Double 6\' au sommet \u2014 s\u00E9ance longue et exigeante. Total effort ~26min sur le passage complet.',
  },
  'pyramid_124641': {
    label: 'Pyramide 1\'2\'4\'6\'4\'1\' R=\u00BD temps',
    reps:  ['1 passage', '1 passage', '1 passage + 1\'2\''],
    recup: ['R=\u00BD temps', 'R=\u00BD temps', 'R=\u00BD temps'],
    allure:['Z3', 'Z4 sur 4\' et 6\'', 'Z4-Z5 sur les sommets'],
    notes: 'Variante asym\u00E9trique \u2014 mont\u00E9e progressive jusqu\'au 6\', descente rapide vers le 1\'.',
  },
  'fartlek_1234441321': {
    label: 'Fartlek 1\'2\'3\'4\'4\'4\'3\'2\'1\' R=\u00BD temps',
    reps:  ['1 passage complet', '1 passage complet', '1 passage + extra 1\'2\'3\''],
    recup: ['R=\u00BD temps', 'R=\u00BD temps', 'R=\u00BD temps strict'],
    allure:['allure progressive Z3-Z4', 'Z4 sur les 4\', Z3 en descente', 'Z4-Z5 sur les 4\''],
    notes: 'Version longue de la pyramide \u2014 3 blocs \u00E0 4\'. Total ~29min d\'effort. G\u00E9rer l\'allure pour ne pas exploser au premier 4\'.',
  },
  'fartlek_10x1_1': {
    label: 'Fartlek 10\u00D71\'/1\' (r\u00E9cup trottin\u00E9e)',
    reps:  ['6\u00D71\'/1\'', '10\u00D71\'/1\'', '12\u00D71\'/1\''],
    recup: ['1min trot', '1min trot', '1min trot vif'],
    allure:['allure Z4 confort', 'allure Z4-Z4+', 'allure Z5'],
    notes: 'Fartlek structur\u00E9 \u2014 r\u00E9cup active obligatoire (trottiner, jamais s\'arr\u00EAter). Tenir la m\u00EAme allure sur toutes les r\u00E9p\u00E9titions.',
  },
  'vitesse_8x100_5x200': {
    label: '8\u00D7100m R3\' + 5\u00D7200m R3\'',
    reps:  ['6\u00D7100m + 3\u00D7200m', '8\u00D7100m + 5\u00D7200m', '8\u00D7100m + 5\u00D7200m'],
    recup: ['3min marche', '3min trottin\u00E9e', '2min30 trottin\u00E9e'],
    allure:['allure confort 800m', 'allure 800m', 'allure 400m-800m'],
    notes: 'S\u00E9ance vitesse en deux blocs \u2014 les 100m d\u00E9veloppent la m\u00E9canique de course, les 200m l\'endurance de vitesse.',
  },
  'vitesse_6x300_4x400': {
    label: '6\u00D7300m + 4\u00D7400m',
    reps:  ['4\u00D7300m + 2\u00D7400m', '6\u00D7300m + 4\u00D7400m', '6\u00D7300m + 4\u00D7400m'],
    recup: ['r\u00E9cup 3-4min', 'r\u00E9cup 3min', 'r\u00E9cup 2min30'],
    allure:['allure 1500m-2000m', 'allure 1500m', 'allure 1000m-1500m'],
    notes: 'S\u00E9ance de r\u00E9f\u00E9rence pour d\u00E9velopper la puissance a\u00E9robie. Tenir l\'allure identique sur tous les 300m, idem sur les 400m.',
  },
  'vitesse_2x6x200': {
    label: '2\u00D7(6\u00D7200m) R=200m r\u00E9cup entre reps, 3-4min entre s\u00E9ries',
    reps:  ['1\u00D7(6\u00D7200m)', '2\u00D7(6\u00D7200m)', '2\u00D7(6\u00D7200m)'],
    recup: ['200m trottin\u00E9 + 3min', '200m trottin\u00E9 + 3min', '200m trottin\u00E9 + 2min30'],
    allure:['allure 1500m', 'allure 1200m', 'allure 1000m'],
    notes: 'Blocs r\u00E9p\u00E9t\u00E9s \u2014 la 2e s\u00E9rie est plus difficile que la 1re. C\'est normal et voulu.',
  },
  'vitesse_6x100_5x200': {
    label: '6\u00D7100m + 5\u00D7200m',
    reps:  ['4\u00D7100m + 3\u00D7200m', '6\u00D7100m + 5\u00D7200m', '6\u00D7100m + 5\u00D7200m'],
    recup: ['3min', '2min30', '2min'],
    allure:['allure 1500m confort', 'allure 1200m', 'allure 1000m'],
    notes: 'S\u00E9ance d\'activation et de vitesse combin\u00E9es \u2014 les 100m pr\u00E9parent le syst\u00E8me neuromusculaire pour les 200m.',
  },
  'vitesse_6x100_4x200_etc': {
    label: '6\u00D7100m + 4\u00D7200m + 2\u00D7300m + 1\u00D7400m (progression)',
    reps:  ['Demi-volume', 'Volume complet', 'Volume complet'],
    recup: ['r\u00E9cup 3min', 'r\u00E9cup 3min', 'r\u00E9cup 2min30'],
    allure:['allure progressive', 'allure 1500m\u21921000m', 'allure 800m\u21921000m'],
    notes: 'S\u00E9ance \u00E0 volume et distance croissants \u2014 difficile de tenir l\'allure sur le 400m final. G\u00E9rer l\'\u00E9nergie d\u00E8s les 100m.',
  },
  'vitesse_5x100_veille': {
    label: '5\u00D7100m (s\u00E9ance veille de course)',
    reps:  ['4\u00D7100m', '5\u00D7100m', '5\u00D7100m'],
    recup: ['4min r\u00E9cup compl\u00E8te', '3min30 r\u00E9cup compl\u00E8te', '3min r\u00E9cup compl\u00E8te'],
    allure:['allure race +5s \u2014 jambes l\u00E9g\u00E8res', 'allure race', 'allure race voire l\u00E9g\u00E8rement au-dessus'],
    notes: 'S\u00E9ance d\'activation pr\u00E9-comp\u00E9tition. Jamais \u00E9puisant \u2014 le but est de r\u00E9veiller les jambes, pas de s\'entra\u00EEner. Rester frais.',
  },
  '3x15_r5': {
    label: '3\u00D715\' R=5\'',
    reps:  ['2\u00D712\' R=5\'', '3\u00D715\' R=5\'', '3\u00D715\' R=4\''],
    recup: ['5min r\u00E9cup active', '5min r\u00E9cup active', '4min r\u00E9cup active'],
    allure:['allure seuil doux Z3', 'allure seuil Z3-Z4', 'allure seuil+'],
    notes: 'S\u00E9ance seuil longue \u2014 la plus exigeante mentalement. Tenir l\'allure sur le 3e bloc est l\'objectif. Si impossible : revenir \u00E0 2\u00D715\'.',
  },
  '8x3_r130': {
    label: '8\u00D73\' R=1\'30"',
    reps:  ['5\u00D73\' R=1\'30"', '8\u00D73\' R=1\'30"', '8\u00D73\' R=1min'],
    recup: ['1min30 trot', '1min30 trot', '1min trot vif'],
    allure:['allure seuil doux', 'allure seuil', 'allure seuil+'],
    notes: 'S\u00E9ance volume au seuil \u2014 r\u00E9cup courte qui impose de g\u00E9rer l\'allure. Si d\u00E9gradation d\u00E8s le 5e bloc : r\u00E9duire \u00E0 6.',
  },
  '10x3030_v2': {
    label: '10\u00D730"/30" (version terrain)',
    reps:  ['6\u00D730"/30"', '10\u00D730"/30"', '15\u00D730"/30"'],
    recup: ['30s trot', '30s trot', '30s trot rapide'],
    allure:['allure 5km+', 'allure VMA -10%', 'allure VMA'],
    notes: 'Variante terrain \u2014 peut se faire en c\u00F4te (30s mont\u00E9e / 30s descente r\u00E9cup). R\u00E9cup ACTIVE obligatoire \u2014 ne jamais s\'arr\u00EAter.',
  },
  '2x8x2020': {
    label: '2\u00D7(8\u00D720"/20") R=2\' entre s\u00E9ries',
    reps:  ['1\u00D7(8\u00D720"/20")', '2\u00D7(8\u00D720"/20")', '2\u00D7(8\u00D720"/20") + 4\u00D7'],
    recup: ['2min entre s\u00E9ries', '2min entre s\u00E9ries', '2min entre s\u00E9ries'],
    allure:['allure VMA', 'allure VMA+ (court = plus vite)', 'allure > VMA'],
    notes: 'Intervalles tr\u00E8s courts en double s\u00E9rie \u2014 le repos de 2min entre s\u00E9ries permet de maintenir la qualit\u00E9. Format plus doux que le 30/30.',
  },
  '30s_r_decrements': {
    label: '30" R= 4\'-3\'-2\' (r\u00E9cup d\u00E9croissante)',
    reps:  ['3\u00D730" R=4\'-3\'-2\'', '5\u00D730" R=4\'-3\'-2\'', '7\u00D730" R=4\'-3\'-2\'-2\'-2\''],
    recup: ['r\u00E9cup d\u00E9croissante', 'r\u00E9cup d\u00E9croissante', 'r\u00E9cup d\u00E9croissante'],
    allure:['allure VMA accessible', 'allure VMA', 'allure VMA+'],
    notes: 'S\u00E9ance sp\u00E9ciale \u2014 la r\u00E9cup diminue au fil des efforts. Les derniers 30" se font avec moins de r\u00E9cup : simulation fin de course.',
  },
  'cote_20s': {
    label: '12\u00D720" c\u00F4te (explosif court)',
    reps:  ['8\u00D720"', '12\u00D720"', '15\u00D720"'],
    recup: ['descente march\u00E9e', 'descente trottin\u00E9e', 'descente rapide'],
    allure:['explosif 8/10 \u2014 d\u00E9part arr\u00EAt\u00E9', 'explosif 9/10', 'max contr\u00F4l\u00E9'],
    notes: 'C\u00F4tes tr\u00E8s courtes \u2014 travail neuromusculaire pur. Chaque effort doit \u00EAtre de qualit\u00E9 : si la puissance baisse, stopper la s\u00E9rie.',
  },
  'circuit_douves': {
    label: '6\u00D7Circuit Les Douves R=1\'30"',
    reps:  ['4\u00D7circuit', '6\u00D7circuit', '6\u00D7circuit + 2\u00D7'],
    recup: ['1min30 r\u00E9cup marche', '1min30 r\u00E9cup trot', '1min r\u00E9cup'],
    allure:['allure EF+ \u00E0 Z3', 'allure Z3-Z4 dans les c\u00F4tes', 'allure Z4 dans les efforts'],
    notes: 'Circuit fartlek naturel sur Les Douves \u2014 le terrain dicte l\'effort. Acc\u00E9l\u00E9rer dans les mont\u00E9es et les lignes droites, r\u00E9cup\u00E9rer dans les descentes et courbes.',
  },
  'cote_vvf_pyramide': {
    label: 'C\u00F4tes VVF Anglet \u2014 Pyramide 3\u00D720" 3\u00D740" 6\u00D71\' 3\u00D740" 3\u00D720"',
    reps:  ['1 passage complet', '1 passage complet', '1 passage + 3\u00D720" bonus'],
    recup: ['descente march\u00E9e', 'descente trottin\u00E9e', 'descente rapide'],
    allure:['explosif 7/10 sur 20", soutenu 7/10 sur 40" et 1\'', 'explosif 8/10 sur 20", soutenu 8/10 sur 40" et 1\'', 'max sur 20", seuil+ sur 40" et 1\''],
    notes: 'Pyramide sur la c\u00F4te du VVF \u00E0 Anglet. Structure : 3\u00D720" / 3\u00D740" / 6\u00D71\' / 3\u00D740" / 3\u00D720". R\u00E9cup = descente trottin\u00E9e/march\u00E9e. Les 20" sont explosifs, les 1\' sont soutenus. Total : 15 mont\u00E9es. La c\u00F4te du VVF permet des efforts longs (1\') et courts (20") sur le m\u00EAme terrain.',
  },
  'cote_45s': {
    label: 'C\u00F4tes 12\u00D745" (Floride / VW)',
    reps:  ['8\u00D745"', '12\u00D745"', '15\u00D745"'],
    recup: ['descente march\u00E9e', 'descente trottin\u00E9e', 'descente rapide'],
    allure:['explosif 7/10', 'explosif 8/10', 'explosif 9/10'],
    notes: 'Dur\u00E9e interm\u00E9diaire entre 30" et 1min \u2014 id\u00E9ale c\u00F4tes VW et La Floride. Chaque mont\u00E9e doit ressembler \u00E0 la pr\u00E9c\u00E9dente.',
  },
  'cote_40s': {
    label: 'C\u00F4tes 10\u00D740" (Floride)',
    reps:  ['6\u00D740"', '10\u00D740"', '12\u00D740"'],
    recup: ['descente march\u00E9e', 'descente trottin\u00E9e', 'descente rapide'],
    allure:['explosif 7/10', 'explosif 8-9/10', 'max contr\u00F4l\u00E9'],
    notes: 'C\u00F4te La Floride \u2014 40" permet de bien sentir la c\u00F4te sans partir en ana\u00E9robie. Bras tr\u00E8s actifs.',
  },
  'cote_8x1_vw': {
    label: 'C\u00F4tes 8\u00D71\' c\u00F4te VW',
    reps:  ['5\u00D71\'', '8\u00D71\'', '10\u00D71\''],
    recup: ['descente march\u00E9e', 'descente trottin\u00E9e', 'descente rapide'],
    allure:['soutenu 7/10', 'soutenu 8/10', 'soutenu 9/10'],
    notes: 'C\u00F4te VW \u2014 1min r\u00E9guli\u00E8re. Maintenir la m\u00EAme allure sur toutes les r\u00E9p\u00E9titions.',
  },
  'cote_10x1_girouettes': {
    label: '10\u00D71\' R=45" circuit Girouettes',
    reps:  ['6\u00D71\'', '10\u00D71\'', '12\u00D71\''],
    recup: ['45s r\u00E9cup', '45s r\u00E9cup trottin\u00E9', '45s strict'],
    allure:['Z3-Z4', 'Z4', 'Z4-Z5'],
    notes: 'Circuit Parc Les Girouettes Anglet \u2014 r\u00E9cup courte de 45". Terrain naturel. Plus exigeant que les c\u00F4tes classiques car r\u00E9cup r\u00E9duite.',
  },
  '45_45_puis_45_30': {
    label: '5\u00D745"/45" + 5\u00D745"/30" (r\u00E9cup d\u00E9croissante)',
    reps:  ['3\u00D745/45 + 3\u00D745/30', '5\u00D745/45 + 5\u00D745/30', '5\u00D745/45 + 5\u00D745/30'],
    recup: ['45s puis 30s trot', '45s puis 30s trot', 'r\u00E9cup strict'],
    allure:['Z4 confort', 'Z4', 'Z4-Z5'],
    notes: 'Double bloc avec r\u00E9cup d\u00E9croissante \u2014 simulation fin de course. Les 45"/30" sont plus difficiles car moins de r\u00E9cup.',
  },
  '8x30_30_r2_6x1_1': {
    label: '8\u00D730"/30" R=2\' + 6\u00D71\'/1\'',
    reps:  ['5\u00D730/30 R2 + 4\u00D71/1', '8\u00D730/30 R2 + 6\u00D71/1', '8\u00D730/30 R2 + 8\u00D71/1'],
    recup: ['r\u00E9cup entre blocs 2min', '2min entre blocs', '2min entre blocs'],
    allure:['Z4', 'Z4-Z5', 'Z5 sur les 30", Z4 sur les 1\''],
    notes: 'Double bloc VMA \u2014 les 30/30 chauffent le syst\u00E8me, les 1\'/1\' maintiennent la charge. Bloc exigeant.',
  },
  '2x8x30_30_r3': {
    label: '2\u00D7(8\u00D730"/30") R=3\' entre s\u00E9ries',
    reps:  ['1\u00D7(8\u00D730/30) R3\'', '2\u00D7(8\u00D730/30) R3\'', '2\u00D7(8\u00D730/30) + extra 4\u00D7'],
    recup: ['3min r\u00E9cup entre s\u00E9ries', '3min r\u00E9cup', '3min r\u00E9cup'],
    allure:['Z4', 'Z4-Z5', 'Z5'],
    notes: 'Double s\u00E9rie avec 3min de r\u00E9cup \u2014 la 2e s\u00E9rie doit \u00EAtre aussi bonne que la 1re. Si impossible : arr\u00EAter \u00E0 1 s\u00E9rie.',
  },
  '2x6x30_30_r130': {
    label: '2\u00D7(6\u00D730"/30") R=1\'30" entre s\u00E9ries',
    reps:  ['1\u00D7(6\u00D730/30) R1\'30"', '2\u00D7(6\u00D730/30) R1\'30"', '2\u00D7(6\u00D730/30) + extra'],
    recup: ['1min30 r\u00E9cup', '1min30 r\u00E9cup', '1min30 r\u00E9cup strict'],
    allure:['Z4', 'Z4-Z5', 'Z5'],
    notes: 'Version plus courte que le 2\u00D78 \u2014 r\u00E9cup de 1\'30" entre s\u00E9ries. Adapt\u00E9 quand moins de temps.',
  },
  '2x8x8s_r2': {
    label: '2\u00D7(8\u00D78") R=2\' entre s\u00E9ries',
    reps:  ['1\u00D7(8\u00D78") R2\'', '2\u00D7(8\u00D78") R2\'', '2\u00D7(8\u00D78") + 4\u00D7'],
    recup: ['2min r\u00E9cup', '2min r\u00E9cup', '2min r\u00E9cup'],
    allure:['explosif max', 'explosif max', '> max'],
    notes: 'Tr\u00E8s court \u2014 travail pur neuromusculaire. 8" = explosion pure. R\u00E9cup compl\u00E8te entre chaque. Format peu courant mais tr\u00E8s efficace pour la vivacit\u00E9.',
  },
  '5x30_8x1_5x30': {
    label: '5\u00D730"/30" + 8\u00D71\'/1\' + 5\u00D730"/30"',
    reps:  ['3\u00D730/30 + 5\u00D71/1 + 3\u00D730/30', '5\u00D730/30 + 8\u00D71/1 + 5\u00D730/30', '5\u00D730/30 + 10\u00D71/1 + 5\u00D730/30'],
    recup: ['r\u00E9cup trot', 'r\u00E9cup trot', 'r\u00E9cup trot'],
    allure:['Z4 sur tout', 'Z4-Z5', 'Z5 courts, Z4 longs'],
    notes: 'Triple bloc sym\u00E9trique \u2014 courts / longs / courts. Les 30" finaux sont les plus difficiles. S\u00E9ance compl\u00E8te VMA.',
  },
  'fartlek_10x2': {
    label: 'Fartlek 10\u00D72\' R~1\'',
    reps:  ['6\u00D72\'', '10\u00D72\'', '12\u00D72\''],
    recup: ['1min trot', '1min trot', '45s trot'],
    allure:['Z3-Z4', 'Z4', 'Z4-Z5'],
    notes: 'Fartlek r\u00E9gulier 2min \u2014 plus exigeant que le 10\u00D71\' car efforts plus longs. R\u00E9cup trottin\u00E9e obligatoire.',
  },
  'fartlek_6x1_x2': {
    label: 'Fartlek 2\u00D7(6\u00D71\'/1\')',
    reps:  ['1\u00D7(6\u00D71/1)', '2\u00D7(6\u00D71/1)', '2\u00D7(6\u00D71/1) + 2\u00D71\''],
    recup: ['r\u00E9cup 2min entre s\u00E9ries', 'r\u00E9cup 2min', 'r\u00E9cup 2min'],
    allure:['Z4', 'Z4-Z5', 'Z5'],
    notes: 'Double s\u00E9rie de 6\u00D71\'/1\' \u2014 le bloc de r\u00E9cup de 2min entre les s\u00E9ries permet de maintenir la qualit\u00E9.',
  },
  'fartlek_2x8x30': {
    label: 'Fartlek 2\u00D7(8\u00D730"/30")',
    reps:  ['1\u00D7(8\u00D730/30)', '2\u00D7(8\u00D730/30)', '2\u00D7(8\u00D730/30) + extra'],
    recup: ['r\u00E9cup 2min', 'r\u00E9cup 2min', 'r\u00E9cup 2min'],
    allure:['Z4', 'Z4-Z5', 'Z5'],
    notes: 'Double s\u00E9rie fartlek 30/30 \u2014 identique au 2\u00D7(8\u00D730/30) R3\' mais avec r\u00E9cup l\u00E9g\u00E8rement plus courte.',
  },
  'fartlek_321_x3': {
    label: 'Fartlek 3\u00D7(3\'2\'1\') \u2014 pyramide inverse en s\u00E9rie',
    reps:  ['2\u00D7(3\'2\'1\')', '3\u00D7(3\'2\'1\')', '3\u00D7(3\'2\'1\') + 1\u00D7'],
    recup: ['r\u00E9cup 2min entre s\u00E9ries', 'r\u00E9cup 2min', 'r\u00E9cup 1min30'],
    allure:['Z3-Z4', 'Z4', 'Z4-Z5'],
    notes: 'Pyramide inverse r\u00E9p\u00E9t\u00E9e \u2014 chaque s\u00E9rie descend (3\'/2\'/1\'). Les 1\' finaux de chaque s\u00E9rie sont vifs. Total effort ~18min.',
  },
  'fartlek_5_10_10': {
    label: 'Fartlek 5\'-10\'-10\' R~\u00BD temps',
    reps:  ['5\'+8\'', '5\'+10\'+10\'', '5\'+10\'+10\'+5\''],
    recup: ['r\u00E9cup \u00BD temps', 'r\u00E9cup \u00BD temps', 'r\u00E9cup \u00BD temps'],
    allure:['Z3', 'Z3-Z4', 'Z4'],
    notes: '3 blocs longs progressifs \u2014 le 5\' sert d\'activation, les deux 10\' sont le c\u0153ur de la s\u00E9ance. R\u00E9cup = environ la moiti\u00E9 du bloc pr\u00E9c\u00E9dent.',
  },
  'fartlek_3_6_6_3': {
    label: 'Fartlek 3\'6\'6\'3\' R~\u00BD temps',
    reps:  ['1 passage', '1 passage + 3\'', '1 passage + 3\'+3\''],
    recup: ['r\u00E9cup \u00BD temps', 'r\u00E9cup \u00BD temps', 'r\u00E9cup \u00BD temps'],
    allure:['Z3 sur tout', 'Z3-Z4 sur les 6\'', 'Z4 sur les 6\''],
    notes: 'Double sommet \u00E0 6\' \u2014 mont\u00E9e et descente sym\u00E9triques. G\u00E9rer le premier 6\' pour tenir le second.',
  },
  'fartlek_5_8_12_r3': {
    label: 'Fartlek progressif 5\'-8\'-12\' R=3\'',
    reps:  ['5\'+8\'', '5\'+8\'+12\'', '5\'+8\'+12\'+5\''],
    recup: ['3min r\u00E9cup', '3min r\u00E9cup', '3min r\u00E9cup'],
    allure:['Z3', 'Z3-Z4 sur le 12\'', 'Z4'],
    notes: 'S\u00E9ance de volume a\u00E9robie croissant \u2014 le 12\' est le bloc cl\u00E9. R\u00E9cup fixe de 3min. Total effort ~25min.',
  },
  'fartlek_pyramid_girouettes': {
    label: 'Pyramide 1\'2\'3\'4\'4\'4\'3\'2\'1\' Girouettes',
    reps:  ['1 passage complet', '1 passage complet', '1 passage + extra 1\'2\''],
    recup: ['r\u00E9cup \u00BD temps', 'r\u00E9cup \u00BD temps', 'r\u00E9cup \u00BD temps'],
    allure:['Z3 mont\u00E9e, Z2 descente', 'Z4 sur les 4\'', 'Z4-Z5 sur les 4\''],
    notes: 'Pyramide longue sur le circuit des Girouettes Anglet \u2014 terrain naturel qui rend la s\u00E9ance plus technique. Les 3 blocs de 4\' sont le sommet.',
  },
  '3x7_r130': {
    label: '3\u00D77\' R=1\'30"',
    reps:  ['2\u00D77\' R=1\'30"', '3\u00D77\' R=1\'30"', '3\u00D77\' R=1min'],
    recup: ['1min30 trot', '1min30 trot', '1min trot'],
    allure:['allure seuil doux Z3', 'allure seuil Z3-Z4', 'allure seuil+'],
    notes: 'Seuil moyen \u2014 effort entre le 5\' et le 10\'. R\u00E9cup courte de 1\'30" qui impose de g\u00E9rer l\'allure d\u00E8s le d\u00E9part.',
  },
  '3x8_r1': {
    label: '3\u00D78\' R=1\'',
    reps:  ['2\u00D78\' R=1\'', '3\u00D78\' R=1\'', '3\u00D78\' R=1\' + 1\u00D74\''],
    recup: ['1min trot', '1min trot', '1min trot'],
    allure:['allure seuil doux', 'allure seuil', 'allure seuil+'],
    notes: 'Seuil long avec r\u00E9cup tr\u00E8s courte \u2014 le 1\' de r\u00E9cup impose une gestion tr\u00E8s fine. Si impossible de tenir : passer \u00E0 R=2\'.',
  },
  'piste_10x400_r200': {
    label: '10\u00D7400m piste R=200m trottin\u00E9',
    reps:  ['6\u00D7400m R200m', '10\u00D7400m R200m', '10\u00D7400m R200m'],
    recup: ['200m trot', '200m trot', '200m trot rapide'],
    allure:['allure 1500m', 'allure 1200m-1500m', 'allure 1000m-1200m'],
    notes: 'S\u00E9ance de r\u00E9f\u00E9rence piste \u2014 10\u00D7400m est la s\u00E9ance classique. Tenir la m\u00EAme allure sur tous les 400m. La r\u00E9cup trottin\u00E9e de 200m est active.',
  },
  'piste_10x300_r100': {
    label: '10\u00D7300m piste R=100m trottin\u00E9',
    reps:  ['6\u00D7300m R100m', '10\u00D7300m R100m', '10\u00D7300m R100m'],
    recup: ['100m trot', '100m trot', '100m trot vif'],
    allure:['allure 1500m', 'allure 1200m', 'allure 1000m'],
    notes: '10\u00D7300m avec r\u00E9cup tr\u00E8s courte \u2014 s\u00E9ance de volume intense. Tenir l\'allure sur les 8 derniers.',
  },
  'piste_10x200_r100': {
    label: '10\u00D7200m piste R=100m trottin\u00E9',
    reps:  ['6\u00D7200m R100m', '10\u00D7200m R100m', '10\u00D7200m R100m'],
    recup: ['100m trot', '100m trot', '100m trot vif'],
    allure:['allure 1500m', 'allure 1200m', 'allure 800m-1000m'],
    notes: '10\u00D7200m \u2014 s\u00E9ance de vitesse-endurance. R\u00E9cup courte qui force \u00E0 g\u00E9rer l\'allure. Attention au d\u00E9part trop rapide.',
  },
  'piste_5x200_5x300_r400': {
    label: '5\u00D7200m + 5\u00D7300m R=400m trottin\u00E9',
    reps:  ['3\u00D7200m + 3\u00D7300m R400m', '5\u00D7200m + 5\u00D7300m R400m', '5\u00D7200m + 5\u00D7300m R400m'],
    recup: ['400m trot', '400m trot', '400m trot vif'],
    allure:['allure 1500m', 'allure 1200m', 'allure 1000m'],
    notes: 'Deux blocs distances croissantes avec grande r\u00E9cup \u2014 les 300m se font avec des jambes d\u00E9j\u00E0 charg\u00E9es.',
  },
  'piste_progression_100_500': {
    label: 'Progression 5\u00D7100 + 4\u00D7200 + 3\u00D7300 + 2\u00D7400 + 1\u00D7500',
    reps:  ['Demi-volume', 'Volume complet', 'Volume complet'],
    recup: ['r\u00E9cup 3-4min', 'r\u00E9cup 3min', 'r\u00E9cup 2min30'],
    allure:['progressive allure 1500m\u21921000m', '1500m\u21921000m\u2192800m', '1200m\u21921000m\u2192800m'],
    notes: 'S\u00E9ance pyramide croissante \u2014 volume total ~3500m. La gestion d\'allure est cl\u00E9 : partir conservateur sur les 100m pour tenir le 500m.',
  },
  'piste_5x100_4x200_3x300_2x400': {
    label: '5\u00D7100 + 4\u00D7200 + 3\u00D7300 + 2\u00D7400',
    reps:  ['Demi-volume', 'Volume complet', 'Volume complet'],
    recup: ['r\u00E9cup 3min', 'r\u00E9cup 3min', 'r\u00E9cup 2min30'],
    allure:['allure progressive', '1500m\u21921000m', '1200m\u21921000m'],
    notes: 'Version sans le 500m final \u2014 plus abordable que la version longue. Id\u00E9ale en milieu de pr\u00E9pa.',
  },
  '5x1000_halage': {
    label: '5\u00D71000m Halage R~2-3\'',
    reps:  ['3\u00D71000m R3\'', '5\u00D71000m R2\'30"', '5\u00D71000m R2\' + 1\u00D7500m'],
    recup: ['3min r\u00E9cup active', '2min30 r\u00E9cup', '2min r\u00E9cup'],
    allure:['allure semi +15s/km', 'allure semi +5s/km', 'allure semi exacte'],
    notes: 'S\u00E9ance reine pour le semi et le marathon \u2014 5\u00D71000m sur le Halage avec marquage km. Tenir exactement la m\u00EAme allure sur tous les 1000m.',
  },
  '4x2000_r2': {
    label: '4\u00D72000m R=2\'',
    reps:  ['2\u00D72000m R3\'', '4\u00D72000m R2\'', '4\u00D72000m R2\' + 1\u00D71000m'],
    recup: ['3min r\u00E9cup', '2min r\u00E9cup', '2min r\u00E9cup'],
    allure:['allure semi +20s/km', 'allure semi +10s/km', 'allure semi'],
    notes: 'S\u00E9ance longue seuil \u2014 chaque 2000m dure ~8-10min. Tr\u00E8s exigeant mentalement. R\u00E9server aux phases de pr\u00E9pa comp\u00E9tition.',
  },
  '8x50s_vma': {
    label: '8\u00D750" (VMA interm\u00E9diaire)',
    reps:  ['5\u00D750"', '8\u00D750"', '10\u00D750"'],
    recup: ['2min30 r\u00E9cup', '2min r\u00E9cup', '1min45 r\u00E9cup'],
    allure:['allure VMA -10%', 'allure VMA', 'allure VMA+'],
    notes: 'Dur\u00E9e interm\u00E9diaire entre 30" et 1min \u2014 permet un effort plus long que le 30" tout en restant court. Id\u00E9al pour ceux qui peinent sur les 1min.',
  },
};

const typeLabel = {
  trail:'\uD83C\uDF3F Trail', route:'\uD83C\uDFC3 Route', rando:'\uD83E\uDD7E Rando',
  montagne:'\uD83C\uDFD4 Montagne', social:'\uD83C\uDF89 Section'
};

const typeCls = {
  trail:'type-trail', route:'type-route', rando:'type-rando',
  montagne:'type-montagne', social:'type-social'
};

const programme = [
  {
    "sem": 1,
    "mois": "Sept",
    "phase": "Reprise",
    "phaseClass": "phase-reprise",
    "mardi": {
      "titre": "Footing 40min + 6×30s vif",
      "terrain": "halage",
      "detail": "Première séance de la saison — on reprend en douceur. Échauffement 10min. 6 répétitions de 30s allure vive (RPE 7), récup 1min30 marchée. Retour calme 10min. Objectif : réveiller la mécanique sans épuiser. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "6×30s · Côte La Floride",
      "terrain": "floride",
      "detail": "Premier contact avec les côtes. 6 montées de 30s (RPE 7), descente trottinée. Focus : genoux hauts, bras actifs. 🏋 PPG en haut de côte — En haut de chaque côte : 8 squats poids corps lents (3s descente) + 5 fentes avant par jambe. Total ~60s par récup. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "g0": "50min footing route souple",
    "g1": "1h15 trail facile",
    "g2": "1h45 trail aisé",
    "decharge": false
  },
  {
    "sem": 2,
    "mois": "Sept",
    "phase": "Reprise",
    "phaseClass": "phase-reprise",
    "mardi": {
      "titre": "Fartlek libre 45min · Halage",
      "terrain": "halage",
      "detail": "On prend les repères. 45min de fartlek libre : accélérations aux bornes kilométriques, retours souples entre. Durée d'accélération libre (30s à 2min). Apprendre à jouer avec l'allure. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "8×30s · Côte La Floride",
      "terrain": "floride",
      "detail": "On monte à 8 répétitions. 8 montées de 30s (RPE 7-8), descente trottinée. Allure identique sur les 8. 🏋 PPG en haut de côte — En haut : 8 squats + 5 fentes par jambe. La PPG en côte renforce le quadriceps sans risque de blessure. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "g0": "1h route aisée",
    "g1": "1h30 trail facile",
    "g2": "2h trail avec D+",
    "decharge": false
  },
  {
    "sem": 3,
    "mois": "Sept",
    "phase": "Reprise",
    "phaseClass": "phase-reprise",
    "mardi": {
      "titre": "6×1min Z4 · Halage",
      "terrain": "halage",
      "detail": "Premier fractionné structuré. 6×1min à RPE 7 (85% FCmax), récup 2min trottinée. Objectif : tenir la même allure sur les 6 répétitions. Sur le halage, l'absence de dénivelé permet de caler une allure régulière — c'est le but. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "10×30s · Côte La Floride",
      "terrain": "floride",
      "detail": "Semaine pic du bloc reprise. 10 montées de 30s (RPE 8). Descente trottinée. Maintenir la qualité sur toute la série. 🏋 PPG en haut de côte — En haut : 8 squats + 5 fentes/jambe + 20s gainage frontal. Total ~90s. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "g0": "1h15 route progressive",
    "g1": "1h45 trail",
    "g2": "2h15 trail pyrénéen",
    "decharge": false
  },
  {
    "sem": 4,
    "mois": "Sept",
    "phase": "Reprise",
    "phaseClass": "phase-reprise",
    "mardi": {
      "titre": "Footing récup + 4×30s allumage",
      "terrain": "intramuros",
      "detail": "Semaine décharge : on récupère. 35min footing RPE 3, puis 4 accélérations de 30s à RPE 7 pour entretenir la vivacité. Retour calme 10min. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Footing souple 50min · Bayonne",
      "terrain": "intramuros",
      "detail": "Footing terrain varié, allure conversation. 50min de footing à RPE 3-4 dans Bayonne. On consolide les 3 semaines de reprise. Zéro intensité. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "50min footing récup",
    "g1": "1h trail récup",
    "g2": "1h30 trail léger",
    "decharge": true
  },
  {
    "sem": 5,
    "mois": "Oct",
    "phase": "Foncier",
    "phaseClass": "phase-base",
    "mardi": {
      "titre": "8×1min Z4 · Halage",
      "terrain": "halage",
      "detail": "Premier bloc foncier — on structure le travail. 8×1min à RPE 7-8 (85-90% FCmax), récup 2min. Sur le halage : idéal pour une allure constante. Tenir la même allure sur les 8. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "10×1min · Côte Voulgre",
      "terrain": "voulgre",
      "detail": "Séance puissance sur la Voulgre. 10 montées de 1min (RPE 8). Récup descente trottinée (~2min). 🏋 PPG en haut de côte — En haut de chaque côte : 10 squats lents (3s descente) + 8 fentes/jambe. Fessiers + quadriceps bien sollicités. Cette séance vaut largement une séance de musculation salle. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "g0": "1h20 route",
    "g1": "1h30 trail",
    "g2": "2h30 trail D+",
    "decharge": false
  },
  {
    "sem": 6,
    "mois": "Oct",
    "phase": "Foncier",
    "phaseClass": "phase-base",
    "mardi": {
      "titre": "10×1min Z4 + 4×30s · Halage",
      "terrain": "halage",
      "detail": "Volume qualité en montée. 10×1min à RPE 8 (récup 1min45), puis 4×30s finishers à RPE 8-9. Retour calme 10min. Les finishers testent la résistance à la fatigue. Objectif : garder la même cadence sur les 4 derniers 30s. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "8×1min30 · Côte VW",
      "terrain": "vw",
      "detail": "Côte VW — durée phare pour la puissance. 8 montées de 1min30 (RPE 8). Descente trottinée complète. Focus : tenir la cadence de pas en fin de montée. 🏋 PPG en haut de côte — En haut : 10 step-down excentriques (4s descente) sur bordure + 5 fentes bulgares/jambe. Le step-down = anti-douleur genou en descente trail. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "g0": "1h30 route",
    "g1": "1h30 trail +D",
    "g2": "2h30 trail gros D+",
    "decharge": false
  },
  {
    "sem": 7,
    "mois": "Oct",
    "phase": "Foncier",
    "phaseClass": "phase-base",
    "mardi": {
      "titre": "Fartlek 6×(2min vif / 2min récup)",
      "terrain": "halage",
      "detail": "Fartlek structuré sur le halage. 6 cycles de 2min RPE 7 / 2min trot. Allure soutenue sur les 2min, vraie récup sur les 2min de trot. Apprendre à gérer les bascules d'allure. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "6×2min · Côte Voulgre",
      "terrain": "voulgre",
      "detail": "Semaine pic foncier — séance exigeante. 6 montées de 2min (RPE 8). Récup descente complète (~3min). Gérer l'effort pour tenir la dernière comme la première. 🏋 PPG en haut de côte — En haut : 10 squats + 10 fentes + 30s gainage frontal. Bloc PPG complet qui profite de la fatigue musculaire déjà installée. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "g0": "1h40 route progressive",
    "g1": "1h45 trail",
    "g2": "3h trail pyrénéen",
    "decharge": false
  },
  {
    "sem": 8,
    "mois": "Oct",
    "phase": "Foncier",
    "phaseClass": "phase-base",
    "mardi": {
      "titre": "Footing 40min + 4×1min",
      "terrain": "intramuros",
      "detail": "Décharge — volume réduit. 40min footing RPE 3-4 dans Bayonne. Puis 4×1min RPE 7 pour entretenir. Pas d'épuisement. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Footing 50min · terrain varié",
      "terrain": "chiberta",
      "detail": "Récupération active sur terrain souple. 50min footing Forêt de Chiberta. Allure conversation. Zéro pression. Profiter du terrain. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h route récup",
    "g1": "1h20 trail récup",
    "g2": "2h trail léger",
    "decharge": true
  },
  {
    "sem": 9,
    "mois": "Nov",
    "phase": "VMA courte",
    "phaseClass": "phase-dev",
    "mardi": {
      "titre": "10×(30s/30s) · Halage",
      "terrain": "halage",
      "detail": "Entrée en VMA — la séance de référence. Échauffement 15min + 2 lignes droites. 10×30s à VMA (RPE 8-9) / 30s trot. Retour calme 10min. Sur plat : on cherche la vitesse pure. Aucune charge musculaire additionnelle — on reste léger pour atteindre sa VMA. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Fartlek nature Chiberta 50min",
      "terrain": "chiberta",
      "detail": "Fartlek libre 50min en forêt de Chiberta. Accélérations aux envies (30s à 1min), récup trottinée. RPE 6. Volume aérobie sans surcharge après le 10×30/30 de mardi."
    },
    "g0": "1h15 route EF",
    "g1": "1h30 trail",
    "g2": "2h trail progressif",
    "decharge": false
  },
  {
    "sem": 10,
    "mois": "Nov",
    "phase": "VMA courte",
    "phaseClass": "phase-dev",
    "mardi": {
      "titre": "15×(30s/30s) · Halage",
      "terrain": "halage",
      "detail": "On monte à 15 répétitions. 15×30s/30s (RPE 8-9). Tenir l'allure sur toutes les reps — c'est l'objectif. Si dégradation dès la 10ème : revenir à 12. Sur plat, la foulée doit rester légère et rebondissante. Raideur tendineuse maximale = efficacité de course. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Tempo 25min + foncier · Halage",
      "terrain": "halage",
      "detail": "Échauffement 15min. Tempo 25min à RPE 6 (seuil aérobie modéré). Retour calme 10min. Travail foncier seuil pour équilibrer la semaine."
    },
    "g0": "1h30 route",
    "g1": "1h30 trail",
    "g2": "2h30 trail D+",
    "decharge": false
  },
  {
    "sem": 11,
    "mois": "Nov",
    "phase": "VMA courte",
    "phaseClass": "phase-dev",
    "mardi": {
      "titre": "2×(8×30s/30s) R=3min",
      "terrain": "halage",
      "detail": "Double bloc VMA — pic du bloc courte. 2 séries de 8×30s/30s, récup 3min entre séries. La 2ème série doit ressembler à la 1ère. Sur plat : glycogène préservé pour la qualité. Aucune charge additionnelle. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Sortie longue foncier 1h15 · Halage",
      "terrain": "halage",
      "detail": "Sortie foncière 1h15 sur le halage. Allure EF (RPE 4-5), conversation possible. Objectif pur volume aérobie après le 2×(8×30/30) de mardi. Récup active."
    },
    "g0": "1h45 route",
    "g1": "1h45 trail",
    "g2": "2h45 trail",
    "decharge": false
  },
  {
    "sem": 12,
    "mois": "Nov",
    "phase": "VMA courte",
    "phaseClass": "phase-dev",
    "mardi": {
      "titre": "Test VMA 6min + footing",
      "terrain": "stades",
      "detail": "Test VMA — bilan du bloc. Échauffement 15min + lignes droites. Test 6min : parcourir la plus grande distance possible. VMA = distance parcourue × 10. Footing 15min retour calme. Noter la distance pour calibrer les allures du prochain bloc. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Footing 50min · Chiberta",
      "terrain": "chiberta",
      "detail": "Décharge — récupération active. 50min footing en forêt RPE 3. Terrain souple obligatoire après le test VMA. Profiter, discuter. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h route récup",
    "g1": "1h20 trail récup",
    "g2": "2h trail léger",
    "decharge": true
  },
  {
    "sem": 13,
    "mois": "Dec",
    "phase": "VMA longue",
    "phaseClass": "phase-dev",
    "mardi": {
      "titre": "8×400m · Piste (stades)",
      "terrain": "stades",
      "detail": "VMA longue — fractions 400m. Échauffement 15min + gammes. 8×400m à 100% VMA (RPE 8), récup 200m trottinée (~1min30). Tenir l'allure cible calibrée par le test VMA. Piste plate = précision chronométrique. Aucune charge musculaire — priorité à l'allure. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Fartlek forêt Chiberta 55min",
      "terrain": "chiberta",
      "detail": "Fartlek libre 55min en forêt. Accélérations variées aux envies, terrain souple. RPE 6 moyen. Volume aérobie qualité — équilibre avec les 8×400m piste de mardi."
    },
    "g0": "1h30 route",
    "g1": "1h45 trail",
    "g2": "2h30 trail D+",
    "decharge": false
  },
  {
    "sem": 14,
    "mois": "Dec",
    "phase": "VMA longue",
    "phaseClass": "phase-dev",
    "mardi": {
      "titre": "10×400m · Piste",
      "terrain": "stades",
      "detail": "On monte à 10 répétitions. 10×400m à 100% VMA (RPE 8-9), récup 200m trottinée. Séance de référence piste. Objectif : tenir la même allure sur les 10. Dégradation au 8ème = normal. Au 5ème = charge trop élevée. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Circuit Les Douves · 6 tours",
      "terrain": "douves",
      "detail": "Fartlek naturel sur les remparts. 6 tours du circuit des Douves (~6min par tour). Allure soutenue dans les montées et lignes droites, récup dans les descentes et courbes. RPE 8 moyen. 🏋 PPG en haut de côte — Entre chaque tour : 8 squats + 5 fentes. Les Douves offrent un terrain naturel parfait pour le travail en contraste. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "g0": "1h40 route",
    "g1": "2h trail",
    "g2": "3h trail",
    "decharge": false
  },
  {
    "sem": 15,
    "mois": "Dec",
    "phase": "VMA longue",
    "phaseClass": "phase-dev",
    "mardi": {
      "titre": "5×1000m · Halage",
      "terrain": "halage",
      "detail": "Première séance 1000m — travail seuil-VMA. 5×1000m à 95% VMA (RPE 8), récup 2min30 trottinée. Sur le halage, allure régulière calibrée. Tenir exactement la même allure sur les 5. Si variation > 5s/km entre le 1er et le 5ème : partir plus prudent la prochaine fois. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Fartlek nature · Chiberta · 1h",
      "terrain": "chiberta",
      "detail": "Fartlek libre en forêt de Chiberta sur 1h. Accélérations aux envies (30s à 2min), récup trottinée. RPE 6 moyen. Séance volume ludique pour équilibrer avec le 5×1000m mardi."
    },
    "g0": "1h30 route",
    "g1": "1h45 trail",
    "g2": "2h30 trail",
    "decharge": false
  },
  {
    "sem": 16,
    "mois": "Dec",
    "phase": "Trêve Noël",
    "phaseClass": "phase-recup",
    "mardi": {
      "titre": "Footing 40min plaisir",
      "terrain": "intramuros",
      "detail": "Avant-dernière séance avant Noël — on lâche prise. 40min footing RPE 3-4. Pas de montre. On profite de Bayonne illuminée. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Footing 50min + marché Noël",
      "terrain": "intramuros",
      "detail": "Footing + esprit des fêtes. 50min footing tranquille, passage par le marché de Noël. Une séance qui clôture le bloc VMA. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h route plaisir",
    "g1": "1h15 trail plaisir",
    "g2": "1h45 trail plaisir",
    "decharge": true,
    "event": "Trêve de Noël approche"
  },
  {
    "sem": 17,
    "mois": "Dec",
    "phase": "Trêve Noël",
    "phaseClass": "phase-recup",
    "mardi": {
      "titre": "TRÊVE · Footing libre",
      "terrain": "intramuros",
      "detail": "Programme suspendu — trêve de Noël. Chacun gère. Un simple footing de 20-30min à RPE 2-3 suffit à maintenir les acquis (principe de réversibilité). Rappel : après 10 jours d'arrêt total, la VO2max commence à diminuer. Mieux vaut 2 footings courts qu'un arrêt complet. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "TRÊVE · Repos ou footing",
      "terrain": "intramuros",
      "detail": "Repos total ou footing court selon envie. Profitez des fêtes. Le corps et la tête en ont besoin. Reprise programme S18. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "Footing libre",
    "g1": "Trail libre",
    "g2": "Sortie nature libre",
    "decharge": true,
    "event": "🎄 Trêve de Noël"
  },
  {
    "sem": 18,
    "mois": "Jan",
    "phase": "Seuil",
    "phaseClass": "phase-force",
    "mardi": {
      "titre": "Reprise · Tempo 20min + 4×400m",
      "terrain": "halage",
      "detail": "Reprise après trêve — progression graduelle. Échauffement 15min. Tempo 20min RPE 6 (80% FCmax). Récup 3min. 4×400m RPE 8. Retour calme 10min. Première séance seuil : ne pas chercher à tout rattraper. Le corps a perdu un peu, il va se souvenir vite. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Fartlek structuré 8×2min",
      "terrain": "chiberta",
      "detail": "Reprise terrain forêt. Échauffement 15min. 8 cycles de 2min RPE 7 / 1min trot en forêt. Terrain souple, allure soutenue. Pas de côtes cette semaine — on laisse les jambes remonter en puissance progressivement. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h15 route EF",
    "g1": "1h30 trail facile",
    "g2": "2h trail progressif",
    "decharge": false
  },
  {
    "sem": 19,
    "mois": "Jan",
    "phase": "Seuil",
    "phaseClass": "phase-force",
    "mardi": {
      "titre": "Tempo 30min · Halage",
      "terrain": "halage",
      "detail": "Tempo long — cœur du travail seuil. Échauffement 15min + 2 lignes droites. Tempo continu 30min à RPE 6-7 (85% FCmax). L'allure où vous pouvez dire 2-3 mots mais pas une phrase. 'Confortablement dur'. C'est LA clé du 10km et du semi. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "8×1min · Côte VW",
      "terrain": "vw",
      "detail": "Force spécifique VW. 8 montées de 1min (RPE 8). Descente trottinée. 🏋 PPG en haut de côte — En haut : 10 squats + 8 fentes/jambe + 20s gainage frontal. Bloc PPG standard en côte. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "g0": "1h30 route",
    "g1": "1h30 trail +D",
    "g2": "2h30 trail D+",
    "decharge": false
  },
  {
    "sem": 20,
    "mois": "Jan",
    "phase": "Seuil",
    "phaseClass": "phase-force",
    "mardi": {
      "titre": "4×1000m R=2min30 · Halage",
      "terrain": "halage",
      "detail": "Intervalles longs seuil. Échauffement 15min. 4×1000m à 90% VMA (RPE 7-8), récup 2min30 trottinée. Sur le halage, les bornes 100m/km permettent un calage précis. Même allure sur les 4 kilomètres. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "10×1min R=45s · Girouettes",
      "terrain": "girouettes",
      "detail": "Circuit Les Girouettes — récup courte. 10×1min (RPE 8) avec récup 45s seulement. Terrain naturel technique. Plus exigeant qu'une côte classique. 🏋 PPG en haut de côte — En haut des 5 dernières : 8 squats + 5 fentes. Récup courte + PPG = simulation fin de course trail. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "g0": "1h45 route",
    "g1": "1h45 trail",
    "g2": "2h45 trail D+",
    "decharge": false
  },
  {
    "sem": 21,
    "mois": "Jan",
    "phase": "Seuil",
    "phaseClass": "phase-force",
    "mardi": {
      "titre": "Tempo progressif 35min",
      "terrain": "halage",
      "detail": "Pic du bloc seuil. Échauffement 15min. Tempo 35min PROGRESSIF : 10min RPE 6, 15min RPE 7, 10min RPE 8. L'art de gérer l'allure : ne pas partir trop vite sur la 1ère portion, garder des ressources pour la 3ème. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "6×1min30 · Côte Voulgre",
      "terrain": "voulgre",
      "detail": "Voulgre long — force + cardio. 6 montées de 1min30 (RPE 8-9). Descente trottinée complète. 🏋 PPG en haut de côte — En haut : 10 fentes bulgares + 8 step-down excentriques + 20s gainage latéral. Bloc PPG complet. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "g0": "1h45 route progressive",
    "g1": "2h trail",
    "g2": "3h trail pyrénéen",
    "decharge": false
  },
  {
    "sem": 22,
    "mois": "Jan",
    "phase": "Seuil",
    "phaseClass": "phase-force",
    "mardi": {
      "titre": "Footing 40min + 4×400m",
      "terrain": "intramuros",
      "detail": "Décharge — volume réduit. Footing 40min RPE 3. 4×400m RPE 7 pour entretenir la vivacité. Retour calme 10min. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Footing terrain souple 50min",
      "terrain": "chiberta",
      "detail": "Forêt de Chiberta — récupération active. 50min footing terrain souple. Allure conversation obligatoire. Profiter du paysage. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h route récup",
    "g1": "1h20 trail récup",
    "g2": "2h trail léger",
    "decharge": true
  },
  {
    "sem": 23,
    "mois": "Fev",
    "phase": "Seuil",
    "phaseClass": "phase-force",
    "mardi": {
      "titre": "3×2000m R=2min · Halage",
      "terrain": "halage",
      "detail": "Intervalles longs — cœur du seuil. Échauffement 15min. 3×2000m à allure 10km (RPE 7-8), récup 2min trottinée. Chaque 2000m dure ~8-10min. Très exigeant mentalement. C'est la séance qui prépare le 10km ou le semi. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Sortie longue foncier 1h15",
      "terrain": "halage",
      "detail": "Sortie foncière 1h15 pure sur le halage. Allure EF (RPE 4), aucune intensité. Volume aérobie pour équilibrer le 3×2000m de mardi."
    },
    "g0": "1h45 route allure semi +20s",
    "g1": "2h trail",
    "g2": "3h trail",
    "decharge": false
  },
  {
    "sem": 24,
    "mois": "Fev",
    "phase": "Seuil",
    "phaseClass": "phase-force",
    "mardi": {
      "titre": "Pyramide 1000-2000-3000-2000-1000",
      "terrain": "halage",
      "detail": "Pyramide seuil — séance polyvalente. 1000m (RPE 8) / 2000m (RPE 7) / 3000m (RPE 7) / 2000m (RPE 7) / 1000m (RPE 8). Récup 2min entre chaque. Gestion d'allure clé : ne pas exploser sur le 1er 1000m. Le 3000m du milieu est le cœur de la séance. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Sortie longue foncier 1h15 · Chiberta",
      "terrain": "chiberta",
      "detail": "Sortie longue foncier RPE 4-5 dans la forêt. Terrain souple obligatoire après la pyramide seuil de mardi. Objectif : volume aérobie et récupération active."
    },
    "g0": "1h30 route allure semi",
    "g1": "1h45 trail",
    "g2": "2h30 trail technique",
    "decharge": false
  },
  {
    "sem": 25,
    "mois": "Fev",
    "phase": "Seuil",
    "phaseClass": "phase-force",
    "mardi": {
      "titre": "5×1000m · Halage · Allure 10km",
      "terrain": "halage",
      "detail": "Allure spécifique 10km. Échauffement 15min. 5×1000m à allure 10km cible (RPE 8), récup 2min30. Pratiquer l'allure qu'on visera en course. Ressenti = exactement celui du jour J. La piste parfaite pour ça. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Circuit Les Douves · 8 tours",
      "terrain": "douves",
      "detail": "Fartlek remparts de Bayonne. 8 tours du circuit Les Douves (~6min/tour). Accélérations dans montées et lignes droites, récup dans descentes. RPE 7-8. 🏋 PPG en haut de côte — Entre les tours 4 et 5, puis 6 et 7 : 10 squats + 8 fentes. La fatigue cumulée rend la PPG redoutable. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "g0": "1h45 route progressive",
    "g1": "1h45 trail",
    "g2": "2h45 trail D+",
    "decharge": false
  },
  {
    "sem": 26,
    "mois": "Fev",
    "phase": "Seuil",
    "phaseClass": "phase-force",
    "mardi": {
      "titre": "Footing 40min + 4×1min",
      "terrain": "intramuros",
      "detail": "Décharge février. Footing 40min RPE 3. 4×1min RPE 7. Retour calme 10min. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Footing 50min · Chiberta",
      "terrain": "chiberta",
      "detail": "Récupération active forêt. 50min allure EF dans la forêt. Zéro chrono, focus sensations. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h route récup",
    "g1": "1h30 trail récup",
    "g2": "2h trail léger",
    "decharge": true
  },
  {
    "sem": 27,
    "mois": "Mars",
    "phase": "Spécifique route",
    "phaseClass": "phase-prepa",
    "mardi": {
      "titre": "5×1000m allure semi · Halage",
      "terrain": "halage",
      "detail": "Séance reine pour le semi. Échauffement 15min. 5×1000m à allure semi cible (RPE 7-8), récup 2min30. Tenir EXACTEMENT la même allure sur les 5 kilomètres. Simulation de course parfaite. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Fartlek forêt Chiberta · 50min",
      "terrain": "chiberta",
      "detail": "Fartlek libre 50min en forêt. Accélérations courtes aux envies, récup trottinée. RPE 6. Terrain souple. Volume qualité modéré."
    },
    "g0": "1h45 allure marathon +5s/km",
    "g1": "2h trail",
    "g2": "2h30 trail",
    "decharge": false
  },
  {
    "sem": 28,
    "mois": "Mars",
    "phase": "Spécifique route",
    "phaseClass": "phase-prepa",
    "mardi": {
      "titre": "Tempo 40min allure marathon",
      "terrain": "halage",
      "detail": "Tempo long à allure cible. Échauffement 15min + 2 lignes droites. 40min continus à allure marathon (RPE 6-7). La séance qui enseigne la gestion marathon : tenir longtemps une allure qui pourrait paraître 'pas si dure' au début. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Sortie progressive 1h30",
      "terrain": "halage",
      "detail": "Sortie 1h30 progressive sur le halage : 30min RPE 4, 30min RPE 5, 30min RPE 6. Travail de gestion d'allure long, pas d'intensité haute. Objectif : spécificité endurance marathon."
    },
    "g0": "2h allure marathon exacte",
    "g1": "2h trail",
    "g2": "2h30 trail soutenu",
    "decharge": false
  },
  {
    "sem": 29,
    "mois": "Mars",
    "phase": "Spécifique route",
    "phaseClass": "phase-prepa",
    "mardi": {
      "titre": "3×15min R=5min · Halage",
      "terrain": "halage",
      "detail": "Séance seuil longue — pic du bloc. 3×15min à RPE 7 (allure seuil), récup 5min marche/trot. La plus exigeante mentalement. Tenir l'allure sur le 3ème bloc est l'objectif. Si impossible : revenir à 2×15min. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Sortie foncier 1h15 · Halage",
      "terrain": "halage",
      "detail": "Sortie foncière 1h15 RPE 4-5 sur le halage. Après la séance seuil de mardi (la plus dure de la saison), récupération active exigée. Allure conversation obligatoire."
    },
    "g0": "2h allure marathon",
    "g1": "2h trail soutenu",
    "g2": "3h trail",
    "decharge": false
  },
  {
    "sem": 30,
    "mois": "Mars",
    "phase": "Spécifique route",
    "phaseClass": "phase-prepa",
    "mardi": {
      "titre": "Footing 40min + 4×400m",
      "terrain": "intramuros",
      "detail": "Décharge — on se prépare à la compétition. Footing 40min RPE 3-4. 4×400m RPE 7 pour entretenir la vitesse. Retour calme 10min. On bascule vers la phase d'affûtage. Le corps se reconstruit. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Footing souple 45min",
      "terrain": "chiberta",
      "detail": "Récupération active. 45min allure EF sur terrain varié. Dernière semaine avant affûtage. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h10 route EF",
    "g1": "1h20 trail récup",
    "g2": "1h45 trail léger",
    "decharge": true
  },
  {
    "sem": 31,
    "mois": "Avr",
    "phase": "Compétitions route",
    "phaseClass": "phase-precomp",
    "mardi": {
      "titre": "Pré-affûtage · 4×1000m",
      "terrain": "halage",
      "detail": "Dernière séance quali avant course — pré-affûtage. 4×1000m à allure semi (RPE 7-8), récup 2min30. Volume réduit vs les semaines précédentes. On maintient l'intensité, on baisse le volume. Le corps doit sortir un pic de forme dans 10 jours. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Footing 45min + 4 lignes droites",
      "terrain": "halage",
      "detail": "Activation douce. 45min EF (RPE 3-4) sur le halage. 4 lignes droites progressives à la fin. Pas de côtes cette semaine — jambes fraîches obligatoires avant la course. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h20 allure marathon confort",
    "g1": "1h30 trail facile",
    "g2": "1h45 trail léger",
    "decharge": false,
    "event": "Semi-marathon dans 10 jours"
  },
  {
    "sem": 32,
    "mois": "Avr",
    "phase": "Compétitions route",
    "phaseClass": "phase-precomp",
    "mardi": {
      "titre": "AFFÛTAGE · 30min + 3×600m",
      "terrain": "halage",
      "detail": "Affûtage — semaine clé. 30min footing EF (RPE 3-4). Puis 3×600m à allure semi (RPE 7-8) avec récup 3min complète. Footing 15min retour. Volume réduit de 30-50%, intensité maintenue. Les cuisses doivent se vider de fatigue et se charger en glycogène. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "ACTIVATION · 20min + 4 lignes",
      "terrain": "intramuros",
      "detail": "Activation finale — 2 jours avant course. 20min footing très facile (RPE 2-3). 4 lignes droites progressives de 100m. Étirements doux. Objectif : réveiller les jambes, pas s'entraîner. Rester frais. La course est dans 2 jours. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "Course semi-marathon !",
    "g1": "Course 10km ou repos",
    "g2": "Sortie découverte 1h",
    "decharge": true,
    "event": "🏁 Semi-Marathon"
  },
  {
    "sem": 33,
    "mois": "Avr",
    "phase": "Compétitions route",
    "phaseClass": "phase-precomp",
    "mardi": {
      "titre": "Récupération active · Footing 30min",
      "terrain": "intramuros",
      "detail": "Post-course — récupération. 30min footing très lent (RPE 2-3). Bayonne intra-muros. Zéro intensité. Le corps a encaissé l'effort course. Il faut 7-10 jours pour récupérer totalement. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Footing 45min · Chiberta",
      "terrain": "chiberta",
      "detail": "Trottinade forêt. 45min footing terrain souple RPE 3. Allure conversation obligatoire. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h route souple",
    "g1": "1h15 trail récup",
    "g2": "1h30 trail léger",
    "decharge": true
  },
  {
    "sem": 34,
    "mois": "Avr",
    "phase": "Compétitions route",
    "phaseClass": "phase-precomp",
    "mardi": {
      "titre": "Footing 50min + 6×30s",
      "terrain": "halage",
      "detail": "Reprise post-compétition. 50min footing EF (RPE 4). 6×30s à RPE 7 pour réveiller la vivacité. Retour calme 10min. Retour progressif à l'entraînement structuré. Prochain bloc : transition trail. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Fartlek libre 45min · Halage",
      "terrain": "halage",
      "detail": "Fartlek sensations. 45min de fartlek libre sur le halage. Accélérations libres quand l'envie vient. RPE 6 moyen. Ressourcement mental avant de redémarrer un cycle structuré. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h30 route",
    "g1": "1h45 trail",
    "g2": "2h15 trail",
    "decharge": false
  },
  {
    "sem": 35,
    "mois": "Mai",
    "phase": "Transition trail",
    "phaseClass": "phase-prepa",
    "mardi": {
      "titre": "10×1min30 · Côte VW",
      "terrain": "vw",
      "detail": "Bascule vers le trail — VW force. 10 montées de 1min30 (RPE 8). Descente trottinée. 🏋 PPG en haut de côte — En haut : 10 squats + 10 fentes + 30s gainage frontal. On réveille le pattern côte après 2 mois de route. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "jeudi": {
      "titre": "Fartlek terrain Chiberta · 60min",
      "terrain": "chiberta",
      "detail": "Fartlek forêt — retour à la nature. 60min en forêt. Accélérations libres dans les faux-plats, récup dans les portions techniques. RPE 6-7. On se réadapte au terrain irrégulier. Vigilance pose de pied. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h30 route",
    "g1": "2h trail",
    "g2": "2h30 trail D+",
    "decharge": false
  },
  {
    "sem": 36,
    "mois": "Mai",
    "phase": "Transition trail",
    "phaseClass": "phase-prepa",
    "mardi": {
      "titre": "Escaliers Côte des Basques",
      "terrain": "escaliers",
      "detail": "Excentrique pur — préparation descente. Échauffement 15min. 5 blocs × 3 aller-retour escaliers. Montée soutenue, descente LENTE et contrôlée. RPE 8. 🏋 PPG en haut de côte — En bas de chaque bloc : 8 step-down excentriques (5s descente) + 5 fentes bulgares. Cette séance = bouclier anti-douleur genoux en trail. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "jeudi": {
      "titre": "Sortie trail forêt 1h15",
      "terrain": "chiberta",
      "detail": "Sortie trail 1h15 en forêt avec quelques relances. RPE 5-6. Terrain souple, récupération active après les escaliers de mardi."
    },
    "g0": "1h30 route",
    "g1": "2h trail D+",
    "g2": "2h45 trail Ursuya",
    "decharge": false
  },
  {
    "sem": 37,
    "mois": "Mai",
    "phase": "Transition trail",
    "phaseClass": "phase-prepa",
    "mardi": {
      "titre": "Pyramide VVF 20s-40s-1min",
      "terrain": "vvf",
      "detail": "Pyramide multi-durées VVF. 3×20s / 3×40s / 6×1min / 3×40s / 3×20s. Les 20s explosifs (RPE 9), les 1min soutenus (RPE 8). Descente trottinée entre chaque. 🏋 PPG en haut de côte — En haut des 6×1min (sommet de séance) : 8 squats + 5 fentes. Pic de charge du bloc transition. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "jeudi": {
      "titre": "Sortie dénivelé · 1h30",
      "terrain": "montagne",
      "detail": "Sortie nature avec D+ — simulation trail. 1h30 en trail avec du dénivelé (500-700m D+). Allure EF à Z3 (RPE 4-6). Pas de PPG programmée — la sortie en elle-même travaille la force. Fin de séance : 5min étirements quadriceps. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h45 route progressive",
    "g1": "2h30 trail D+",
    "g2": "3h trail montagne",
    "decharge": false
  },
  {
    "sem": 38,
    "mois": "Mai",
    "phase": "Transition trail",
    "phaseClass": "phase-prepa",
    "mardi": {
      "titre": "Footing 45min + 4×1min",
      "terrain": "intramuros",
      "detail": "Décharge avant prépa trail finale. 45min footing RPE 3-4. 4×1min RPE 7. Retour calme 10min. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Footing terrain souple 50min",
      "terrain": "chiberta",
      "detail": "Récupération forêt. 50min EF Chiberta. Zéro intensité. Préparer le corps à la prépa trail du mois prochain. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h route récup",
    "g1": "1h30 trail récup",
    "g2": "2h trail léger",
    "decharge": true
  },
  {
    "sem": 39,
    "mois": "Juin",
    "phase": "Trail compétition",
    "phaseClass": "phase-precomp",
    "mardi": {
      "titre": "Côtes VVF multi-durées",
      "terrain": "vvf",
      "detail": "Spécifique trail — multi-formats. Échauffement 15min. 6×40s + 4×1min30 + 6×40s (RPE 8-9). Descente trottinée. 🏋 PPG en haut de côte — En haut des 4×1min30 (pic de séance) : 10 squats + 8 fentes bulgares. Charge PPG ciblée sur le pic. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "jeudi": {
      "titre": "Sortie spécifique Ursuya",
      "terrain": "montagne",
      "detail": "Sortie simulation trail. 2h en montagne avec D+ (700-1000m). Allure EF sur montée, attentif en descente (RPE 4-5). Reconnaissance de terrain si Trail des Colombes passe par Ursuya. Hydratation, ravito, gestion effort. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h45 route",
    "g1": "2h30 trail D+",
    "g2": "3h30 trail montagne",
    "decharge": false
  },
  {
    "sem": 40,
    "mois": "Juin",
    "phase": "Trail compétition",
    "phaseClass": "phase-precomp",
    "mardi": {
      "titre": "6×1min30 · Côte Voulgre",
      "terrain": "voulgre",
      "detail": "Pré-affûtage trail — on garde la qualité. 6 montées de 1min30 (RPE 8). Descente trottinée complète. 🏋 PPG en haut de côte — En haut : 8 squats + 5 fentes/jambe. On baisse le volume PPG par rapport aux semaines pic. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "jeudi": {
      "titre": "Fartlek forêt 45min + D+",
      "terrain": "chiberta",
      "detail": "Fartlek terrain naturel. 45min fartlek en forêt avec les faux-plats. Allure variable RPE 5-7. Se caler mentalement sur le trail à venir. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h30 route",
    "g1": "1h45 trail",
    "g2": "2h30 trail",
    "decharge": false,
    "event": "Trail des Colombes dans 10 jours"
  },
  {
    "sem": 41,
    "mois": "Juin",
    "phase": "Trail compétition",
    "phaseClass": "phase-precomp",
    "mardi": {
      "titre": "AFFÛTAGE trail · 30min + 4×1min",
      "terrain": "douves",
      "detail": "Affûtage trail — dernière quali. 30min EF sur les remparts (RPE 4). 4×1min (RPE 7) pour entretenir. Retour calme. Volume réduit. Intensité conservée. Le trail est dimanche. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "ACTIVATION · 20min + 4 lignes",
      "terrain": "intramuros",
      "detail": "Activation finale — 2 jours avant trail. 20min footing facile. 4 lignes droites progressives. Étirements légers. Rester frais. La course est dimanche. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "Trail des Colombes !",
    "g1": "Trail des Colombes !",
    "g2": "Trail des Colombes ou long",
    "decharge": true,
    "event": "🏔 Trail des Colombes"
  },
  {
    "sem": 42,
    "mois": "Juin",
    "phase": "Trail compétition",
    "phaseClass": "phase-precomp",
    "mardi": {
      "titre": "Récup active · Footing 30min",
      "terrain": "intramuros",
      "detail": "Post-trail — récupération. 30min footing très lent (RPE 2-3). Bayonne. Zéro intensité. Le trail engage plus que la route (excentrique intense). 10-14 jours pour récupérer totalement. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Footing 40min · Chiberta",
      "terrain": "chiberta",
      "detail": "Trottinade forêt. 40min footing souple. Apprécier la forêt. Pas d'intensité. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "45min récup",
    "g1": "1h trail récup",
    "g2": "1h30 trail léger",
    "decharge": true
  },
  {
    "sem": 43,
    "mois": "Juil",
    "phase": "Relâche Fêtes",
    "phaseClass": "phase-recup",
    "mardi": {
      "titre": "Footing plaisir 45min",
      "terrain": "halage",
      "detail": "Ambiance d'été — programme allégé. 45min footing halage au calme. Allure EF. Profiter de la lumière longue. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Fartlek libre 45min",
      "terrain": "intramuros",
      "detail": "Fartlek libre Bayonne intra-muros. 45min. Accélérations quand l'envie, marche quand utile. RPE 5-6. Plaisir avant tout. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h30 plage + Chiberta",
    "g1": "1h45 trail",
    "g2": "2h15 trail aisé",
    "decharge": false
  },
  {
    "sem": 44,
    "mois": "Juil",
    "phase": "Relâche Fêtes",
    "phaseClass": "phase-recup",
    "mardi": {
      "titre": "FÊTES · Footing santé 30min",
      "terrain": "intramuros",
      "detail": "Semaine des Fêtes — adaptation culturelle. 30min footing très facile (RPE 2-3). Programme club suspendu. La charge physique des Fêtes se substitue à l'entraînement. Principe du Guide : la charge liée à l'événement (marche, chaleur, manque de sommeil) est une charge réelle. Pas de surcharge additionnelle. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "FÊTES · Repos ou marche",
      "terrain": "intramuros",
      "detail": "Repos total ou marche selon envie. Profiter des Fêtes. Reprise douce la semaine prochaine. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "Libre / repos",
    "g1": "Libre / marche",
    "g2": "Libre / repos",
    "decharge": true,
    "event": "🎊 Fêtes de Bayonne"
  },
  {
    "sem": 45,
    "mois": "Juil",
    "phase": "Relâche Fêtes",
    "phaseClass": "phase-recup",
    "mardi": {
      "titre": "Reprise · Footing 40min",
      "terrain": "halage",
      "detail": "Reprise post-Fêtes — tout en douceur. 40min footing halage RPE 3-4. Apprécier le retour à la course. Aucune intensité. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Footing 45min · terrain varié",
      "terrain": "chiberta",
      "detail": "Reprise forêt. 45min footing Chiberta ou plage. Allure conversation. Jambes qui se remettent. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h footing plaisir",
    "g1": "1h30 trail souple",
    "g2": "1h45 trail aisé",
    "decharge": false
  },
  {
    "sem": 46,
    "mois": "Juil",
    "phase": "Relâche Fêtes",
    "phaseClass": "phase-recup",
    "mardi": {
      "titre": "Footing 50min + 6×30s",
      "terrain": "halage",
      "detail": "Retour progressif à la qualité. 50min footing EF. 6×30s à RPE 7 pour réveiller la mécanique. Retour calme 10min. On prépare doucement la reprise structurée d'août. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Fartlek Les Douves · 50min",
      "terrain": "douves",
      "detail": "Fartlek urbain remparts. 50min fartlek sur les remparts. Accélérations libres, terrain varié. RPE 5-7. Zéro PPG — on reste sur du plaisir pour cette période de transition. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h30 route",
    "g1": "1h45 trail",
    "g2": "2h15 trail",
    "decharge": false
  },
  {
    "sem": 47,
    "mois": "Août",
    "phase": "Pré-reprise",
    "phaseClass": "phase-recup",
    "mardi": {
      "titre": "Footing 50min · Halage",
      "terrain": "halage",
      "detail": "Pré-reprise — volume sans intensité. 50min footing halage RPE 4. Quelques accélérations spontanées possibles, mais jamais forcées. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "6×1min · Côte La Floride",
      "terrain": "floride",
      "detail": "Réveil des côtes en douceur. 6 montées de 1min (RPE 7-8). Descente trottinée. Volume réduit vs saison active. 🏋 PPG en haut de côte — En haut : 8 squats + 5 fentes/jambe. On remet le pattern PPG-côte en marche pour la rentrée. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "g0": "1h15 route",
    "g1": "1h30 trail",
    "g2": "2h trail",
    "decharge": false
  },
  {
    "sem": 48,
    "mois": "Août",
    "phase": "Pré-reprise",
    "phaseClass": "phase-recup",
    "mardi": {
      "titre": "Fartlek structuré 8×(1min/1min)",
      "terrain": "halage",
      "detail": "Fartlek structuré — reprise qualité. 8 cycles de 1min RPE 7 / 1min trot sur le halage. Retour calme. Pas de PPG — séance plat qualité. Préparation rentrée. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "8×1min · Côte Voulgre",
      "terrain": "voulgre",
      "detail": "Côte Voulgre — on remet le bleu de travail. 8 montées de 1min (RPE 8). Descente trottinée. 🏋 PPG en haut de côte — En haut : 8 squats + 5 fentes. Volume PPG modéré — reprise progressive. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "g0": "1h30 route",
    "g1": "1h45 trail",
    "g2": "2h15 trail D+",
    "decharge": false
  },
  {
    "sem": 49,
    "mois": "Août",
    "phase": "Pré-reprise",
    "phaseClass": "phase-recup",
    "mardi": {
      "titre": "5×1000m · Halage",
      "terrain": "halage",
      "detail": "Réveil du seuil. 5×1000m à RPE 7 (allure seuil modérée), récup 2min30. Retour calme 10min. Allure sur le halage, on remet en place les repères chronométriques. Pas de PPG. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Fartlek terrain Girouettes",
      "terrain": "girouettes",
      "detail": "Circuit Girouettes — fartlek naturel. 50min circuit. Accélérations dans les montées, récup dans les descentes. RPE 7 moyen. 🏋 PPG en haut de côte — Sur 3 des montées : 8 squats + 5 fentes. Reprise PPG-côte mesurée. 📍 Principe : fatigue musculaire sécurisée en côte (aucun impact articulaire) + recrutement fibres profondes + spécificité trail."
    },
    "g0": "1h45 route progressive",
    "g1": "2h trail",
    "g2": "2h30 trail D+",
    "decharge": false
  },
  {
    "sem": 50,
    "mois": "Août",
    "phase": "Pré-reprise",
    "phaseClass": "phase-recup",
    "mardi": {
      "titre": "Footing 45min + 4×400m",
      "terrain": "intramuros",
      "detail": "Décharge avant rentrée. Footing 45min RPE 3-4. 4×400m RPE 7 pour entretenir. Retour calme 10min. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Footing récup 50min · Chiberta",
      "terrain": "chiberta",
      "detail": "Avant-dernière de la saison. 50min EF forêt. Savourer la fin de saison. Préparer mentalement la rentrée. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h footing libre",
    "g1": "1h15 trail plaisir",
    "g2": "1h45 trail plaisir",
    "decharge": true
  },
  {
    "sem": 51,
    "mois": "Août",
    "phase": "Pré-reprise",
    "phaseClass": "phase-recup",
    "mardi": {
      "titre": "Footing plaisir 40min",
      "terrain": "halage",
      "detail": "Dernière séance libre de la saison. 40min footing halage. Zéro pression. Profiter. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Footing Bayonne 45min",
      "terrain": "intramuros",
      "detail": "Footing dans la ville. 45min footing Bayonne intra-muros. Allure conversation. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "1h route plaisir",
    "g1": "1h30 trail plaisir",
    "g2": "2h trail plaisir",
    "decharge": false
  },
  {
    "sem": 52,
    "mois": "Août",
    "phase": "Pré-reprise",
    "phaseClass": "phase-recup",
    "mardi": {
      "titre": "Footing 40min + activation",
      "terrain": "halage",
      "detail": "Dernière semaine — activation finale saison. 40min footing RPE 3-4. 4 lignes droites progressives en fin. Préparer la rentrée de saison. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "jeudi": {
      "titre": "Bilan collectif + footing",
      "terrain": "intramuros",
      "detail": "Bilan de saison — moment convivial. Footing ensemble 40min RPE 3, puis café/verre en terrasse. Tradition de la section. On parle de la saison écoulée et on prépare la nouvelle. ⚡ Pas de PPG — on protège la foulée et le glycogène pour la qualité."
    },
    "g0": "Récup active libre",
    "g1": "Récup active libre",
    "g2": "Récup complète avant rentrée",
    "decharge": false,
    "event": "🏆 Bilan de saison"
  }
]

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
