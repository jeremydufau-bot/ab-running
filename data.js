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
  {sem:1,mois:'Sept',phase:'Reprise',phaseClass:'phase-reprise',
   mardi:{titre:'Footing + \u00E9ducatifs + 6\u00D730s vif',terrain:'halage',detail:'\u00C9chauffement 15min. \u00C9ducatifs de course : mont\u00E9es genoux, talons fesses, jambes tendues. 6 r\u00E9p\u00E9titions de 30s \u00E0 allure vive, 1min30 r\u00E9cup march\u00E9e. Retour calme 10min. S\u00E9ance identique pour tous niveaux \u2014 le rythme personnel diff\u00E8re, pas la structure. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'8\u00D730s \u00B7 C\u00F4te La Floride',terrain:'floride',detail:'8 mont\u00E9es de 30s sur la c\u00F4te La Floride ou c\u00F4te VW. Descente trottin\u00E9e. Objectif : r\u00E9veiller les appuis, pas s\'\u00E9puiser. Pas de chrono \u2014 sensations. Pour les routards : m\u00EAme s\u00E9ance, excellent cardio. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 En bas de chaque c\u00F4te pendant la r\u00E9cup : \uD83D\uDFE2 8 squats poids corps lents (3s descente) \u2014 fessiers, genoux dans l\'axe \u00B7 \uD83D\uDD35 10 squats + 5 fentes avant chaque jambe \u2014 amplitude maximale \u00B7 \uD83D\uDD34 10 squats saut\u00E9s r\u00E9ception souple + 8 fentes bulgares poids corps. Dur\u00E9e totale PPG : ~90s par r\u00E9cup. La s\u00E9ance allonge de 10 min.'},
   g0:'1h footing route souple',g1:'1h20 trail facile',g2:'2h trail ais\u00E9',decharge:false},
  {sem:2,mois:'Sept',phase:'Reprise',phaseClass:'phase-reprise',
   mardi:{titre:'Footing + 8\u00D730s vif',terrain:'halage',detail:'8 r\u00E9p\u00E9titions de 30s vif sur le halage, r\u00E9cup 1min15. On prend les rep\u00E8res, on \u00E9value son niveau de forme. Allure : chacun g\u00E8re selon ses sensations. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'10\u00D730s \u00B7 C\u00F4te La Floride',terrain:'floride',detail:'10 mont\u00E9es, focus technique : genoux hauts, bras actifs, regard devant. Descente march\u00E9e ou trottin\u00E9e. Total ~1h. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 En bas de chaque c\u00F4te pendant la r\u00E9cup : \uD83D\uDFE2 8 squats poids corps lents (3s descente) \u2014 fessiers, genoux dans l\'axe \u00B7 \uD83D\uDD35 10 squats + 5 fentes avant chaque jambe \u2014 amplitude maximale \u00B7 \uD83D\uDD34 10 squats saut\u00E9s r\u00E9ception souple + 8 fentes bulgares poids corps. Dur\u00E9e totale PPG : ~90s par r\u00E9cup. La s\u00E9ance allonge de 10 min.'},
   g0:'1h10 route ais\u00E9e',g1:'1h20 trail facile',g2:'2h trail avec D+',decharge:false},
  {sem:3,mois:'Sept',phase:'Reprise',phaseClass:'phase-reprise',
   mardi:{titre:'6\u00D71min vif + 4\u00D730s finishers',terrain:'halage',detail:'6 r\u00E9p\u00E9titions de 1min \u00E0 allure soutenue (Z4), r\u00E9cup 2min. Puis 4\u00D730s \u00E0 fond. Retour calme 10min. Les finishers testent la r\u00E9sistance \u00E0 la fatigue. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Fartlek \u00B7 Les Douves \u00B7 45min',terrain:'douves',detail:'Fartlek libre dans Bayonne intra-muros : acc\u00E9l\u00E9rations sur les lignes droites, effort dans les mont\u00E9es des remparts, r\u00E9cup dans les descentes et les portions techniques. 45min hors \u00E9chauffement. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min en fin de s\u00E9ance sur le terrain : \uD83D\uDFE2 10 squats + 10 fentes + 30s planche + 20s gainage lat\u00E9ral \u00B7 \uD83D\uDD35 10 squats saut\u00E9s + 8 step-down (3s) + planche lat\u00E9rale 30s + clamshell 10 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (5s) + 8 fentes bulgares + gainage lat\u00E9ral dynamique. Terrain \u00E9clair\u00E9 = possibilit\u00E9 de faire les exercices au sol sans risque.'},
   g0:'1h15 route',g1:'1h30 trail facile',g2:'2h15 trail D+',decharge:false},
  {sem:4,mois:'Sept',phase:'Reprise',phaseClass:'phase-reprise',
   mardi:{titre:'Footing r\u00E9cup + 4\u00D730s allumage',terrain:'intramuros',detail:'Semaine de d\u00E9charge. Footing confortable 40min, puis 4 acc\u00E9l\u00E9rations de 30s pour entretenir la vivacit\u00E9. Pas d\'\u00E9puisement.'},
   jeudi:{titre:'Footing souple 50min',terrain:'intramuros',detail:'Sortie en endurance fondamentale sur terrain vari\u00E9. Allure conversation obligatoire. On consolide les 3 semaines de reprise.'},
   g0:'50min route r\u00E9cup',g1:'1h trail r\u00E9cup',g2:'1h40 trail',decharge:true},

  {sem:5,mois:'Oct',phase:'Base endurance',phaseClass:'phase-base',
   mardi:{titre:'8\u00D71min Z4 \u00B7 Halage',terrain:'halage',detail:'8 r\u00E9p\u00E9titions de 1min \u00E0 85-90% FC max. R\u00E9cup 2min. Sur le halage : id\u00E9al pour une allure constante et contr\u00F4lable. Cherchez \u00E0 garder la m\u00EAme allure sur les 8 r\u00E9p\u00E9titions. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'10\u00D71min c\u00F4te \u00B7 Puissance',terrain:'voulgre',detail:'10 mont\u00E9es de 1min sur Mousserolles. R\u00E9cup descente trottin\u00E9e (~2min). D\u00E9veloppe la puissance en mont\u00E9e pour les traileurs, le cardio pour les routards. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Entre chaque r\u00E9p\u00E9tition de la Voulgre : \uD83D\uDFE2 10 squats lents + 8 fentes avant + 5 glute bridge unilat\u00E9ral \u00B7 \uD83D\uDD35 8 step-down excentriques (4s) + 8 fentes bulgares + 10 clamshell \u00B7 \uD83D\uDD34 10 step-down excentriques (5s) + 8 fentes bulgares + 8 squats saut\u00E9s + planche lat\u00E9rale 30s.'},
   g0:'1h20 route',g1:'1h30 trail',g2:'2h30 trail D+',decharge:false},
  {sem:6,mois:'Oct',phase:'Base endurance',phaseClass:'phase-base',
   mardi:{titre:'10\u00D71min Z4 \u00B7 Halage',terrain:'halage',detail:'On monte \u00E0 10 r\u00E9p\u00E9titions. R\u00E9cup 1min45. Si les derni\u00E8res r\u00E9p\u00E9titions se d\u00E9gradent : normal. L\'objectif est de tenir l\'allure le plus longtemps possible. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'8\u00D71min30 \u00B7 C\u00F4te VW',terrain:'vw',detail:'8 mont\u00E9es de 1min30. La dur\u00E9e cl\u00E9 des c\u00F4tes VW / Voulgre / La Floride. R\u00E9cup descente. Allure soutenue mais pas maximale \u2014 on peut souffler en haut. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Pendant la r\u00E9cup descente en bas de c\u00F4te : \uD83D\uDFE2 8 fentes avant altern\u00E9es + 8 glute bridge au sol \u00B7 \uD83D\uDD35 10 fentes bulgares + 8 step-down contr\u00F4l\u00E9 (3s descente) sur bordure \u00B7 \uD83D\uDD34 8 step-down excentriques (4s descente) + 8 fentes saut\u00E9es + gainage lat\u00E9ral 30s. Le step-down excentrique est l\'exercice cl\u00E9 anti-douleur genou en descente trail.'},
   g0:'1h30 route',g1:'1h30 trail +D',g2:'2h30 trail gros D+',decharge:false},
  {sem:7,mois:'Oct',phase:'Base endurance',phaseClass:'phase-base',
   mardi:{titre:'Fartlek 6\u00D7(2min vif / 2min r\u00E9cup)',terrain:'halage',detail:'Fartlek structur\u00E9 : 2min \u00E0 allure soutenue, 2min au trot. 6 cycles. Pour les routards : simulation d\'allures en course. Pour les traileurs : adaptation terrain naturel. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Circuit intra-muros : c\u00F4tes + remparts',terrain:'intramuros',detail:'Circuit Bayonne intra-muros : mont\u00E9es des remparts, plat des quais, techniques des rues pav\u00E9es. Fartlek naturel dict\u00E9 par le terrain. 50min hors \u00E9chauffement.'},
   g0:'1h40 route progressive',g1:'1h45 trail',g2:'3h trail pyr\u00E9n\u00E9en',decharge:false},
  {sem:8,mois:'Oct',phase:'Base endurance',phaseClass:'phase-base',
   mardi:{titre:'Footing + 4\u00D71min allumage',terrain:'intramuros',detail:'D\u00E9charge. Footing 35min, quelques acc\u00E9l\u00E9rations l\u00E9g\u00E8res. Volume r\u00E9duit. Le corps absorbe les 3 semaines de travail.'},
   jeudi:{titre:'Footing terrain souple 50min',terrain:'intramuros',detail:'R\u00E9cup\u00E9ration active sur terrain vari\u00E9. Allure conversation. On ne force rien.'},
   g0:'1h route r\u00E9cup',g1:'1h20 r\u00E9cup trail',g2:'2h trail l\u00E9ger',decharge:true},

  {sem:9,mois:'Nov',phase:'D\u00E9veloppement',phaseClass:'phase-dev',
   mardi:{titre:'5\u00D73min seuil \u00B7 Halage',terrain:'halage',detail:'Introduction au travail seuil. 5 r\u00E9p\u00E9titions de 3min \u00E0 80-85% FCmax \u2014 on peut parler par mots, pas par phrases. R\u00E9cup 3min. Pour les routards : allure l\u00E9g\u00E8rement plus rapide que l\'EF. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'6\u00D72min \u00B7 C\u00F4te Voulgre',terrain:'voulgre',detail:'6 c\u00F4tes de 2min en mode force \u2014 effort soutenu, non maximal. Apr\u00E8s : 10min d\'exercices de force debout (fentes, squats unipodaux). Ancrage dans le renforcement sp\u00E9cifique trail et route. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 En bas de la Voulgre pendant les 3 min de r\u00E9cup : \uD83D\uDFE2 10 squats lents (4s descente) + 30s planche frontale \u00B7 \uD83D\uDD35 8 step-down excentriques (4s) + 10 squats + planche lat\u00E9rale 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 step-down excentriques (5s) + 8 squats saut\u00E9s + 8 fentes bulgares + gainage lat\u00E9ral dynamique 30s. Progression : les premi\u00E8res semaines faire uniquement les squats, ajouter les step-down quand l\'adaptation est faite.'},
   g0:'1h40 route cadenc\u00E9e',g1:'1h40 trail',g2:'2h45 trail',decharge:false},
  {sem:10,mois:'Nov',phase:'D\u00E9veloppement',phaseClass:'phase-dev',
   mardi:{titre:'6\u00D73min seuil \u00B7 Halage',terrain:'halage',detail:'6 r\u00E9p\u00E9titions de 3min. La fatigue s\'accumule sur les derni\u00E8res \u2014 c\'est normal et voulu. R\u00E9cup 2min30. La base de tout bon plan marathon ou trail. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'8\u00D71min30 \u00B7 C\u00F4te VW',terrain:'vw',detail:'8 c\u00F4tes intenses. R\u00E9cup descente en trottinant. Focus : maintenir la cadence de pas en fin de r\u00E9p\u00E9tition. Mont\u00E9e et r\u00E9cup : les deux se travaillent. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Pendant la r\u00E9cup descente en bas de c\u00F4te : \uD83D\uDFE2 8 fentes avant altern\u00E9es + 8 glute bridge au sol \u00B7 \uD83D\uDD35 10 fentes bulgares + 8 step-down contr\u00F4l\u00E9 (3s descente) sur bordure \u00B7 \uD83D\uDD34 8 step-down excentriques (4s descente) + 8 fentes saut\u00E9es + gainage lat\u00E9ral 30s. Le step-down excentrique est l\'exercice cl\u00E9 anti-douleur genou en descente trail.'},
   g0:'1h45 route',g1:'1h40 trail',g2:'2h45 trail',decharge:false},
  {sem:11,mois:'Nov',phase:'D\u00E9veloppement',phaseClass:'phase-dev',
   mardi:{titre:'4\u00D75min seuil \u00B7 Halage',terrain:'halage',detail:'Allongement des efforts : 4\u00D75min \u00E0 80-85% FCmax. R\u00E9cup 3min. Plus long = plus dur mentalement. Tenez l\'allure sur toute la dur\u00E9e. S\u00E9ance cl\u00E9 pour route et trail. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Escaliers Biarritz \u00B7 Introduction',terrain:'escaliers',detail:'S\u00E9ance sp\u00E9ciale mensuelle : escaliers de la C\u00F4te des Basques (~200 marches). 3 blocs de 3 allers-retours. Mont\u00E9e : genoux hauts, bras actifs. Descente : march\u00E9e. Total 45min. Ceux qui ne viennent pas : c\u00F4tes VW \u00E0 Bayonne. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Au pied des escaliers entre chaque mont\u00E9e compl\u00E8te : \uD83D\uDFE2 8 squats poids corps lents \u2014 jambes fatigu\u00E9es, aller sur l\'amplitude \u00B7 \uD83D\uDD35 10 fentes avant + 8 calf raises unilat\u00E9raux sur marche du bas \u00B7 \uD83D\uDD34 8 step-down excentriques (5s) sur la marche du bas + foul\u00E9es bondissantes 15s. La descente des escaliers est d\u00E9j\u00E0 un travail excentrique intense \u2014 adapter le volume PPG en cons\u00E9quence.'},
   g0:'1h50 route',g1:'1h45 trail',g2:'3h trail',decharge:false},
  {sem:12,mois:'Nov',phase:'D\u00E9veloppement',phaseClass:'phase-dev',
   mardi:{titre:'Footing + 4\u00D71min30 vivants',terrain:'intramuros',detail:'D\u00E9charge. Footing confortable, 4 acc\u00E9l\u00E9rations de 1min30 sur portions planes. Pas d\'\u00E9puisement.'},
   jeudi:{titre:'Footing r\u00E9cup terrain 45min',terrain:'intramuros',detail:'R\u00E9cup\u00E9ration active sur terrain vari\u00E9. Allure tr\u00E8s douce. Pas de chrono.'},
   g0:'1h30 route r\u00E9cup',g1:'1h30 trail r\u00E9cup',g2:'2h20 trail',decharge:true},

  {sem:13,mois:'D\u00E9c',phase:'Force / D+',phaseClass:'phase-force',
   mardi:{titre:'10\u00D71min vif \u00B7 Halage',terrain:'halage',detail:'Volume de fractionn\u00E9 augment\u00E9. 10 r\u00E9p\u00E9titions de 1min \u00E0 88-92% FCmax. R\u00E9cup 1min30. Court et intense : \u00E9l\u00E9vation de la VMA. B\u00E9n\u00E9fique pour route et trail. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'8\u00D72min \u00B7 C\u00F4te Voulgre',terrain:'voulgre',detail:'8 c\u00F4tes de 2min en mode puissance. Bras tr\u00E8s actifs. Descente en marchant pour r\u00E9cup\u00E9rer pleinement. Apr\u00E8s : 5min de foul\u00E9es bondissantes. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 En bas de la Voulgre pendant les 3 min de r\u00E9cup : \uD83D\uDFE2 10 squats lents (4s descente) + 30s planche frontale \u00B7 \uD83D\uDD35 8 step-down excentriques (4s) + 10 squats + planche lat\u00E9rale 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 step-down excentriques (5s) + 8 squats saut\u00E9s + 8 fentes bulgares + gainage lat\u00E9ral dynamique 30s. Progression : les premi\u00E8res semaines faire uniquement les squats, ajouter les step-down quand l\'adaptation est faite.'},
   g0:'1h45 route sp\u00E9cifique',g1:'1h45 trail D+',g2:'3h trail gros D+',decharge:false},
  {sem:14,mois:'D\u00E9c',phase:'Force / D+',phaseClass:'phase-force',
   mardi:{titre:'6\u00D72min seuil + 4\u00D745s vif',terrain:'halage',detail:'Deux blocs : 6\u00D72min seuil (r\u00E9cup 2min) puis apr\u00E8s 5min, 4\u00D745s \u00E0 fond. Double stimulus endurance + vivacit\u00E9. S\u00E9ance incontournable marathon et trail. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'5\u00D7mont\u00E9e \u00B7 Escaliers Biarritz',terrain:'escaliers',detail:'S\u00E9ance sp\u00E9ciale mensuelle. 5 mont\u00E9es compl\u00E8tes des escaliers (~200 marches). Descente march\u00E9e, r\u00E9cup 3min. ~90s \u00E0 2min par mont\u00E9e. Apr\u00E8s : 10min foul\u00E9es bondissantes. Alternative Mousserolles pour ceux qui restent. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Au pied des escaliers entre chaque mont\u00E9e compl\u00E8te : \uD83D\uDFE2 8 squats poids corps lents \u2014 jambes fatigu\u00E9es, aller sur l\'amplitude \u00B7 \uD83D\uDD35 10 fentes avant + 8 calf raises unilat\u00E9raux sur marche du bas \u00B7 \uD83D\uDD34 8 step-down excentriques (5s) sur la marche du bas + foul\u00E9es bondissantes 15s. La descente des escaliers est d\u00E9j\u00E0 un travail excentrique intense \u2014 adapter le volume PPG en cons\u00E9quence.'},
   g0:'1h50 route',g1:'1h50 trail D+',g2:'3h trail',decharge:false},
  {sem:15,mois:'D\u00E9c',phase:'Force / D+',phaseClass:'phase-force',
   mardi:{titre:'3\u00D710min seuil \u00B7 Halage',terrain:'halage',detail:'Longues r\u00E9p\u00E9titions au seuil : 3\u00D710min \u00E0 80-85% FC. R\u00E9cup 4min. Exigeant mentalement \u2014 tenez l\'allure sur les 10 derni\u00E8res minutes de chaque bloc. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Sortie montagne mensuelle \u00B7 Mondarrain',terrain:'montagne',detail:'Sortie montagne du mois : Mondarrain ou Ursuya. 4 \u00E0 6 mont\u00E9es longues de 3-5min, descente r\u00E9cup. Total 1h30-2h. Groupe B : s\u00E9ance c\u00F4tes normale \u00E0 Mousserolles. Retrouvailles apr\u00E8s pour un verre ensemble. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Le terrain fait d\u00E9j\u00E0 80% du travail. Ajouter entre 2 mont\u00E9es : \uD83D\uDFE2 8 squats lents sur terrain plat + marche active dans la descente \u00B7 \uD83D\uDD35 8 step-down sur rocher plat (4s) + 8 fentes en descente + gainage 30s \u00B7 \uD83D\uDD34 10 step-down excentriques (5s) + 8 fentes bulgares sur le terrain + clamshell 10 chaque c\u00F4t\u00E9. Les descentes techniques sur sentier = travail excentrique intense pour les quadriceps.'},
   g0:'2h route longue',g1:'2h trail D+',g2:'3h30 trail',decharge:false},
  {sem:16,mois:'D\u00E9c',phase:'Force / D+',phaseClass:'phase-force',
   mardi:{titre:'Footing festif + 6\u00D730s allumage',terrain:'intramuros',detail:'Semaine de No\u00EBl. On s\'entra\u00EEne en mode plaisir dans Bayonne. Footing tranquille, 6 petites acc\u00E9l\u00E9rations. L\'essentiel c\'est de bouger.'},
   jeudi:{titre:'Footing + \u00E9ducatifs 40min',terrain:'intramuros',detail:'D\u00E9charge de fin d\'ann\u00E9e. Sortie l\u00E9g\u00E8re, technique. Pas d\'intensit\u00E9. Rechargez les batteries pour janvier.'},
   g0:'1h30 route r\u00E9cup',g1:'1h30 trail r\u00E9cup',g2:'2h30 l\u00E9ger',decharge:true},

  {sem:17,mois:'Jan',phase:'Pr\u00E9pa trail / route',phaseClass:'phase-prepa',
   mardi:{titre:'4\u00D76min seuil \u00B7 Halage',terrain:'halage',detail:'Reprise intensive de janvier. 4\u00D76min au seuil (80-83% FC). R\u00E9cup 3min30. Maintenez une allure constante sur chaque r\u00E9p\u00E9tition. Tr\u00E8s sp\u00E9cifique marathon et semi. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'8\u00D72min \u00B7 C\u00F4te Voulgre',terrain:'voulgre',detail:'8 c\u00F4tes de 2min en puissance. Force sp\u00E9cifique trail et c\u00F4tes de route. Apr\u00E8s 4 c\u00F4tes : 2min de r\u00E9cup compl\u00E8te. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 En bas de la Voulgre pendant les 3 min de r\u00E9cup : \uD83D\uDFE2 10 squats lents (4s descente) + 30s planche frontale \u00B7 \uD83D\uDD35 8 step-down excentriques (4s) + 10 squats + planche lat\u00E9rale 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 step-down excentriques (5s) + 8 squats saut\u00E9s + 8 fentes bulgares + gainage lat\u00E9ral dynamique 30s. Progression : les premi\u00E8res semaines faire uniquement les squats, ajouter les step-down quand l\'adaptation est faite.'},
   g0:'2h route en endurance',g1:'2h trail avec D+',g2:'3h30 trail gros D+',decharge:false},
  {sem:18,mois:'Jan',phase:'Pr\u00E9pa trail / route',phaseClass:'phase-prepa',
   mardi:{titre:'5\u00D76min seuil progressif',terrain:'halage',detail:'5 r\u00E9p\u00E9titions. La 5e sera difficile \u2014 c\'est intentionnel. Allure l\u00E9g\u00E8rement plus haute sur les premi\u00E8res. On construit la r\u00E9sistance \u00E0 la fatigue. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Parc Les Girouettes \u00B7 Fartlek nature 55min',terrain:'girouettes',detail:'Sortie sp\u00E9ciale mensuelle sur Anglet : parc Les Girouettes ou boucle plage + Chiberta. Fartlek naturel 55min. Terrain vari\u00E9, sortie ressour\u00E7ante. Un des plus beaux circuits de la section. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG de 5 min \u00E0 la fin du fartlek avant retour : \uD83D\uDFE2 10 squats + 10 fentes + 30s planche frontale + 30s gainage lat\u00E9ral chaque \u00B7 \uD83D\uDD35 10 squats saut\u00E9s (r\u00E9ception souple) + 10 step-down (3s) + planche lat\u00E9rale dynamique 30s \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + gainage lat\u00E9ral + clamshell 10. Se fait debout, sur le terrain \u2014 pas besoin de s\'allonger.'},
   g0:'2h route longue progressive',g1:'2h trail',g2:'3h30 trail',decharge:false},
  {sem:19,mois:'Jan',phase:'Pr\u00E9pa trail / route',phaseClass:'phase-prepa',
   mardi:{titre:'2\u00D715min seuil \u00B7 Halage',terrain:'halage',detail:'Deux longues plages au seuil, r\u00E9cup 5min entre. Tr\u00E8s exigeant, tr\u00E8s efficace. La s\u00E9ance reine pour d\u00E9velopper l\'endurance de course. Route comme trail en b\u00E9n\u00E9ficient autant. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'10\u00D72min \u00B7 C\u00F4te Voulgre + descente',terrain:'voulgre',detail:'10 c\u00F4tes de 2min. Descente travaill\u00E9e : petits pas rapides, genoux fl\u00E9chis, regard loin. 50% mont\u00E9e / 50% descente technique. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 En bas de la Voulgre pendant les 3 min de r\u00E9cup : \uD83D\uDFE2 10 squats lents (4s descente) + 30s planche frontale \u00B7 \uD83D\uDD35 8 step-down excentriques (4s) + 10 squats + planche lat\u00E9rale 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 step-down excentriques (5s) + 8 squats saut\u00E9s + 8 fentes bulgares + gainage lat\u00E9ral dynamique 30s. Progression : les premi\u00E8res semaines faire uniquement les squats, ajouter les step-down quand l\'adaptation est faite.'},
   g0:'2h10 route',g1:'2h trail',g2:'3h30 trail',decharge:false},
  {sem:20,mois:'Jan',phase:'Pr\u00E9pa trail / route',phaseClass:'phase-prepa',
   mardi:{titre:'Footing 45min + 6\u00D71min souple',terrain:'halage',detail:'D\u00E9charge. Footing facile avec 6 acc\u00E9l\u00E9rations l\u00E9g\u00E8res. Entretien de la vivacit\u00E9 sans fatigue. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Footing terrain souple 50min',terrain:'intramuros',detail:'R\u00E9cup\u00E9ration active sur terrain vari\u00E9. Allure tr\u00E8s douce.'},
   g0:'1h30 route r\u00E9cup',g1:'1h30 r\u00E9cup trail',g2:'2h30 l\u00E9ger',decharge:true},

  {sem:21,mois:'F\u00E9v',phase:'Pr\u00E9-comp\u00E9tition',phaseClass:'phase-precomp',
   mardi:{titre:'3\u00D78min allure course \u00B7 Halage',terrain:'halage',detail:'Simulation allure course pour les routards (semi/marathon), allure cible trail pour les traileurs. 3 blocs de 8min. R\u00E9cup 4min. Tr\u00E8s sp\u00E9cifique selon l\'objectif de chacun. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Fartlek 10\u00D71min \u00B7 Intra-muros',terrain:'intramuros',detail:'10 acc\u00E9l\u00E9rations d\'1min sur terrain vari\u00E9 dans le vieux Bayonne. R\u00E9cup 1min30 trottin\u00E9e. D\u00E9veloppe la capacit\u00E9 \u00E0 relancer, g\u00E9rer les changements de rythme.'},
   g0:'2h route allure marathon',g1:'2h trail D+',g2:'4h trail pyr\u00E9n\u00E9en',decharge:false},
  {sem:22,mois:'F\u00E9v',phase:'Pr\u00E9-comp\u00E9tition',phaseClass:'phase-precomp',
   mardi:{titre:'4\u00D78min allure course',terrain:'halage',detail:'4 r\u00E9p\u00E9titions. R\u00E9cup 3min30. R\u00E9gularit\u00E9 > vitesse. Si la 4e ne tient pas : l\'allure des 3 premi\u00E8res \u00E9tait trop \u00E9lev\u00E9e. On ajuste, on ne force pas. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Sortie montagne mensuelle \u00B7 Ursuya',terrain:'montagne',detail:'Sortie montagne du mois : Ursuya (678m). Mont\u00E9es longues de 5-8min, descente r\u00E9cup. Tr\u00E8s sp\u00E9cifique pour les traileurs pr\u00E9-comp\u00E9tition. Groupe B : s\u00E9ance c\u00F4tes normales + fartlek \u00E0 Bayonne. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Le terrain fait d\u00E9j\u00E0 80% du travail. Ajouter entre 2 mont\u00E9es : \uD83D\uDFE2 8 squats lents sur terrain plat + marche active dans la descente \u00B7 \uD83D\uDD35 8 step-down sur rocher plat (4s) + 8 fentes en descente + gainage 30s \u00B7 \uD83D\uDD34 10 step-down excentriques (5s) + 8 fentes bulgares sur le terrain + clamshell 10 chaque c\u00F4t\u00E9. Les descentes techniques sur sentier = travail excentrique intense pour les quadriceps.'},
   g0:'2h route semi-marathon',g1:'3h trail D+',g2:'4h trail',decharge:false},
  {sem:23,mois:'F\u00E9v',phase:'Pr\u00E9-comp\u00E9tition',phaseClass:'phase-precomp',
   mardi:{titre:'5\u00D76min allure + acc\u00E9l\u00E9ration finale',terrain:'halage',detail:'5\u00D76min avec les 2 derni\u00E8res minutes de chaque bloc l\u00E9g\u00E8rement plus rapides. On apprend \u00E0 finir fort \u2014 capital pour les fins de marathon et de trail. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Fartlek trail 55min \u00B7 Intra-muros',terrain:'intramuros',detail:'Fartlek naturel avec accent sur les mont\u00E9es des remparts. Chaque mont\u00E9e est franchie fort. R\u00E9cup dans les descentes et les plats. 55min sans chrono sur les efforts.'},
   g0:'2h route tempo',g1:'2h trail',g2:'4h trail',decharge:false},
  {sem:24,mois:'F\u00E9v',phase:'Pr\u00E9-comp\u00E9tition',phaseClass:'phase-precomp',
   mardi:{titre:'Footing + 6\u00D745s vivants',terrain:'halage',detail:'D\u00E9charge. Footing facile avec 6 acc\u00E9l\u00E9rations courtes et vives. Entretien de la vivacit\u00E9 sans fatigue.'},
   jeudi:{titre:'Footing l\u00E9ger + \u00E9ducatifs 40min',terrain:'intramuros',detail:'S\u00E9ance l\u00E9g\u00E8re. \u00C9ducatifs de course, foul\u00E9es bondissantes douces. Pas d\'intensit\u00E9. Semaine de soufflage.'},
   g0:'1h30 route r\u00E9cup',g1:'1h30 trail r\u00E9cup',g2:'2h30 l\u00E9ger',decharge:true},

  {sem:25,mois:'Mars',phase:'Objectifs printemps',phaseClass:'phase-senpereko',
   mardi:{titre:'6\u00D71min dynamiques + \u00E9ducatifs',terrain:'vw',detail:'S\u00E9ance de maintien. 6 r\u00E9p\u00E9titions vives avec focus technique. \u00C9ducatifs de course. On garde les jambes \u00E9veill\u00E9es avant les premi\u00E8res courses de printemps. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Apr\u00E8s chaque descente, avant de repartir : \uD83D\uDFE2 8 fentes altern\u00E9es lentes + 30s \u00E9quilibre unipodal \u00B7 \uD83D\uDD35 10 fentes altern\u00E9es + 8 calf raises unilat\u00E9raux sur bordure \u00B7 \uD83D\uDD34 8 fentes bulgares (pied arri\u00E8re sur\u00E9lev\u00E9) + 10 calf raises excentrique (3s descente). Bloc final commun : 2\u00D730s planche frontale apr\u00E8s la derni\u00E8re c\u00F4te.'},
   jeudi:{titre:'Footing l\u00E9g\u00E8rement vallonn\u00E9 40min',terrain:'intramuros',detail:'Sortie de fra\u00EEcheur. Allure conversation. Quelques petites mont\u00E9es pour rappeler aux jambes ce qui les attend.'},
   g0:'Semi ou 10km local \uD83C\uDFC1',g1:'1h30 trail l\u00E9ger',g2:'2h30 trail',event:'Courses de printemps \u2014 mars/avril',decharge:false},
  {sem:26,mois:'Mars',phase:'Objectifs printemps',phaseClass:'phase-senpereko',
   mardi:{titre:'Footing + 4\u00D730s allumage',terrain:'intramuros',detail:'S-1 avant une course ou semaine de gestion. Footing tr\u00E8s facile avec 4 acc\u00E9l\u00E9rations l\u00E9g\u00E8res. Maximum 40min.'},
   jeudi:{titre:'Fartlek trail intra-muros 45min',terrain:'intramuros',detail:'Fartlek dans Bayonne. Plaisir de courir dans la ville. Allure selon les sensations.'},
   g0:'Course route locale \uD83C\uDFC1 ou 2h route',g1:'Trail local \uD83C\uDFC1 ou 2h trail',g2:'Trail D+ \uD83C\uDFC1 ou 3h trail',decharge:false},
  {sem:27,mois:'Mars',phase:'Objectifs printemps',phaseClass:'phase-senpereko',
   mardi:{titre:'Reprise qualit\u00E9 5\u00D73min seuil',terrain:'halage',detail:'On reprend l\'intensit\u00E9 apr\u00E8s une course ou une semaine all\u00E9g\u00E9e. 5\u00D73min au seuil pour relancer la machine. \u00C9valuez les sensations. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'8\u00D71min30 \u00B7 C\u00F4te VW \u00B7 Retour force',terrain:'vw',detail:'Retour sur les c\u00F4tes. 8\u00D71min30, r\u00E9cup descente. Reprise du travail sp\u00E9cifique. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Pendant la r\u00E9cup descente en bas de c\u00F4te : \uD83D\uDFE2 8 fentes avant altern\u00E9es + 8 glute bridge au sol \u00B7 \uD83D\uDD35 10 fentes bulgares + 8 step-down contr\u00F4l\u00E9 (3s descente) sur bordure \u00B7 \uD83D\uDD34 8 step-down excentriques (4s descente) + 8 fentes saut\u00E9es + gainage lat\u00E9ral 30s. Le step-down excentrique est l\'exercice cl\u00E9 anti-douleur genou en descente trail.'},
   g0:'1h45 route r\u00E9cup',g1:'2h trail',g2:'3h30 trail',decharge:false},
  {sem:28,mois:'Mars',phase:'Objectifs printemps',phaseClass:'phase-senpereko',
   mardi:{titre:'Footing r\u00E9cup 40min',terrain:'intramuros',detail:'R\u00E9cup\u00E9ration. Footing tr\u00E8s facile pour \u00E9liminer les toxines. Pas d\'intensit\u00E9.'},
   jeudi:{titre:'Footing r\u00E9cup 45min + \u00E9tirements',terrain:'halage',detail:'R\u00E9cup\u00E9ration sur le halage. Plat = moins de contrainte m\u00E9canique.'},
   g0:'1h30 route r\u00E9cup',g1:'1h30 trail r\u00E9cup',g2:'2h r\u00E9cup trail',decharge:true},

  {sem:29,mois:'Avr',phase:'Construction \u00E9t\u00E9',phaseClass:'phase-euskal',
   mardi:{titre:'5\u00D73min seuil + 4\u00D71min vif',terrain:'halage',detail:'S\u00E9ance double : seuil puis vivacit\u00E9. 5\u00D73min seuil (r\u00E9cup 2min30) puis 4\u00D71min vifs apr\u00E8s 5min de r\u00E9cup. R\u00E9sistance \u00E0 la fatigue. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'6\u00D72min \u00B7 C\u00F4te Voulgre + descente',terrain:'voulgre',detail:'6 c\u00F4tes de 2min + descentes longues et contr\u00F4l\u00E9es. Travail complet mont\u00E9e / descente. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 En bas de la Voulgre pendant les 3 min de r\u00E9cup : \uD83D\uDFE2 10 squats lents (4s descente) + 30s planche frontale \u00B7 \uD83D\uDD35 8 step-down excentriques (4s) + 10 squats + planche lat\u00E9rale 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 step-down excentriques (5s) + 8 squats saut\u00E9s + 8 fentes bulgares + gainage lat\u00E9ral dynamique 30s. Progression : les premi\u00E8res semaines faire uniquement les squats, ajouter les step-down quand l\'adaptation est faite.'},
   g0:'2h route',g1:'2h trail D+',g2:'3h trail',decharge:false},
  {sem:30,mois:'Avr',phase:'Construction \u00E9t\u00E9',phaseClass:'phase-euskal',
   mardi:{titre:'4\u00D78min allure cible \u00B7 Halage',terrain:'halage',detail:'4 blocs de 8min \u00E0 l\'allure cible de chacun : allure semi/marathon pour les routards, allure trail cible pour les traileurs. Important : reproduire exactement l\'allure pr\u00E9vue, pas plus vite. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Sortie montagne mensuelle \u00B7 Mondarrain',terrain:'montagne',detail:'Sortie mensuelle sur le Mondarrain depuis Itxassou. Fartlek en mont\u00E9e, descentes r\u00E9cup. Total 1h45-2h. Groupe B : fartlek intra-muros 50min \u00E0 Bayonne. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Le terrain fait d\u00E9j\u00E0 80% du travail. Ajouter entre 2 mont\u00E9es : \uD83D\uDFE2 8 squats lents sur terrain plat + marche active dans la descente \u00B7 \uD83D\uDD35 8 step-down sur rocher plat (4s) + 8 fentes en descente + gainage 30s \u00B7 \uD83D\uDD34 10 step-down excentriques (5s) + 8 fentes bulgares sur le terrain + clamshell 10 chaque c\u00F4t\u00E9. Les descentes techniques sur sentier = travail excentrique intense pour les quadriceps.'},
   g0:'2h15 route',g1:'2h trail',g2:'4h trail',decharge:false},
  {sem:31,mois:'Avr',phase:'Construction \u00E9t\u00E9',phaseClass:'phase-euskal',
   mardi:{titre:'2\u00D720min seuil \u00B7 Halage',terrain:'halage',detail:'Deux longues plages au seuil, r\u00E9cup 5min entre. La dur\u00E9e la plus longue du programme. Tr\u00E8s formateur pour les efforts longs en route et trail. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'8\u00D72min \u00B7 C\u00F4te Voulgre + descente tech.',terrain:'voulgre',detail:'8 c\u00F4tes de 2min + descentes techniques soign\u00E9es. Mont\u00E9e et descente travaill\u00E9es avec la m\u00EAme exigence. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 En bas de la Voulgre pendant les 3 min de r\u00E9cup : \uD83D\uDFE2 10 squats lents (4s descente) + 30s planche frontale \u00B7 \uD83D\uDD35 8 step-down excentriques (4s) + 10 squats + planche lat\u00E9rale 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 step-down excentriques (5s) + 8 squats saut\u00E9s + 8 fentes bulgares + gainage lat\u00E9ral dynamique 30s. Progression : les premi\u00E8res semaines faire uniquement les squats, ajouter les step-down quand l\'adaptation est faite.'},
   g0:'2h15 route longue',g1:'2h trail D+',g2:'4h trail',decharge:false},
  {sem:32,mois:'Avr',phase:'Construction \u00E9t\u00E9',phaseClass:'phase-euskal',
   mardi:{titre:'Footing 40min + 5\u00D71min vifs',terrain:'halage',detail:'D\u00E9charge. Footing facile avec 5 acc\u00E9l\u00E9rations courtes. On pr\u00E9serve les jambes. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Sortie r\u00E9cup terrain 45min',terrain:'intramuros',detail:'R\u00E9cup\u00E9ration active. Terrain naturel. Allure tr\u00E8s douce.'},
   g0:'1h45 route l\u00E9ger',g1:'1h45 trail l\u00E9ger',g2:'3h l\u00E9ger',decharge:true},

  {sem:33,mois:'Mai',phase:'Objectifs \u00E9t\u00E9',phaseClass:'phase-euskal',
   mardi:{titre:'Footing + 6\u00D745s vivants',terrain:'halage',detail:'S\u00E9ance de maintien l\u00E9g\u00E8re. Footing facile avec 6 acc\u00E9l\u00E9rations courtes. Entretien de la vivacit\u00E9.'},
   jeudi:{titre:'Fartlek Les Girouettes ou Intra-muros 45min',terrain:'girouettes',detail:'Fartlek dans Bayonne ou Anglet, accent technique. Terrain vari\u00E9, allure dict\u00E9e par le terrain. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG de 5 min \u00E0 la fin du fartlek avant retour : \uD83D\uDFE2 10 squats + 10 fentes + 30s planche frontale + 30s gainage lat\u00E9ral chaque \u00B7 \uD83D\uDD35 10 squats saut\u00E9s (r\u00E9ception souple) + 10 step-down (3s) + planche lat\u00E9rale dynamique 30s \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + gainage lat\u00E9ral + clamshell 10. Se fait debout, sur le terrain \u2014 pas besoin de s\'allonger.'},
   g0:'Course route locale \uD83C\uDFC1 ou 1h45 route',g1:'1h30 trail l\u00E9ger',g2:'2h30 trail',event:'Courses de mai \u2014 trails locaux',decharge:false},
  {sem:34,mois:'Mai',phase:'Objectifs \u00E9t\u00E9',phaseClass:'phase-euskal',
   mardi:{titre:'5\u00D73min seuil \u00B7 Halage',terrain:'halage',detail:'Retour au seuil. 5\u00D73min, r\u00E9cup 3min. On recharge les qualit\u00E9s apr\u00E8s une \u00E9ventuelle course ou p\u00E9riode intense. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'8\u00D71min30 \u00B7 C\u00F4te VW \u00B7 Puissance',terrain:'vw',detail:'8 c\u00F4tes de 1min30. Retour au travail de force sp\u00E9cifique. Descente r\u00E9cup trottin\u00E9e. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Pendant la r\u00E9cup descente en bas de c\u00F4te : \uD83D\uDFE2 8 fentes avant altern\u00E9es + 8 glute bridge au sol \u00B7 \uD83D\uDD35 10 fentes bulgares + 8 step-down contr\u00F4l\u00E9 (3s descente) sur bordure \u00B7 \uD83D\uDD34 8 step-down excentriques (4s descente) + 8 fentes saut\u00E9es + gainage lat\u00E9ral 30s. Le step-down excentrique est l\'exercice cl\u00E9 anti-douleur genou en descente trail.'},
   g0:'2h route',g1:'2h trail',g2:'3h30 trail',decharge:false},
  {sem:35,mois:'Mai',phase:'Objectifs \u00E9t\u00E9',phaseClass:'phase-recup',
   mardi:{titre:'Footing r\u00E9cup 40min tr\u00E8s facile',terrain:'intramuros',detail:'R\u00E9cup\u00E9ration douce selon les charges accumul\u00E9es. Footing tr\u00E8s facile. Pas de performance.'},
   jeudi:{titre:'Marche ou footing l\u00E9ger 45min',terrain:'intramuros',detail:'R\u00E9cup\u00E9ration active au choix. Selon les jambes : marche dynamique ou footing tr\u00E8s l\u00E9ger.'},
   g0:'1h30 route r\u00E9cup',g1:'1h30 trail r\u00E9cup',g2:'2h30 r\u00E9cup trail',decharge:false},
  {sem:36,mois:'Mai',phase:'Construction',phaseClass:'phase-recup',
   mardi:{titre:'Footing vallonn\u00E9 50min',terrain:'intramuros',detail:'Retour progressif. Terrain naturel, allure douce. On r\u00E9introduit le d\u00E9nivel\u00E9 pour pr\u00E9parer l\'\u00E9t\u00E9.'},
   jeudi:{titre:'Technique descente \u00B7 C\u00F4te Voulgre 45min',terrain:'voulgre',detail:'Retour sur les c\u00F4tes uniquement pour la descente. Pas d\'intensit\u00E9 en mont\u00E9e. Focus complet sur la technique de descente trail. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Entre chaque r\u00E9p\u00E9tition de la Voulgre (r\u00E9cup active) : \uD83D\uDFE2 10 squats lents + 8 fentes avant + 5 glute bridge unilat\u00E9ral chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD35 8 step-down excentriques (4s) + 8 fentes bulgares + clamshell 10 chaque \u00B7 \uD83D\uDD34 10 step-down excentriques (5s) + 8 fentes bulgares lest\u00E9es + 8 squats saut\u00E9s + planche lat\u00E9rale 30s. Bloc final unique : 2\u00D710 calf raises unilat\u00E9raux sur bordure de trottoir.'},
   g0:'1h30 route',g1:'1h30 trail',g2:'2h30 trail',decharge:false},

  {sem:37,mois:'Juin',phase:'Construction',phaseClass:'phase-base',
   mardi:{titre:'8\u00D72min seuil \u00B7 Halage',terrain:'halage',detail:'Retour aux affaires. 8\u00D72min au seuil, r\u00E9cup 2min. On repart sur une base solide pour l\'\u00E9t\u00E9. Volume et intensit\u00E9 remontent progressivement. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'8\u00D72min c\u00F4te longue',terrain:'voulgre',detail:'8 c\u00F4tes de 2min. Reprise du travail sp\u00E9cifique trail. Volume en hausse. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 En bas de la Voulgre pendant les 3 min de r\u00E9cup : \uD83D\uDFE2 10 squats lents (4s descente) + 30s planche frontale \u00B7 \uD83D\uDD35 8 step-down excentriques (4s) + 10 squats + planche lat\u00E9rale 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 step-down excentriques (5s) + 8 squats saut\u00E9s + 8 fentes bulgares + gainage lat\u00E9ral dynamique 30s. Progression : les premi\u00E8res semaines faire uniquement les squats, ajouter les step-down quand l\'adaptation est faite.'},
   g0:'2h route',g1:'2h trail D+',g2:'4h trail',decharge:false},
  {sem:38,mois:'Juin',phase:'Construction',phaseClass:'phase-base',
   mardi:{titre:'5\u00D75min seuil \u00B7 Halage',terrain:'halage',detail:'5\u00D75min au seuil. On allonge les efforts. D\u00E9veloppe la r\u00E9sistance \u00E0 l\'effort soutenu. R\u00E9cup 3min. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Boucle plage + Chiberta \u00B7 60min',terrain:'plage',detail:'Sortie mensuelle Anglet : boucle plage + Chiberta ou parc Les Girouettes. 60min fartlek nature. Un des circuits les plus agr\u00E9ables de la section, parfait pour l\'\u00E9t\u00E9.'},
   g0:'2h route',g1:'2h trail',g2:'4h trail',decharge:false},
  {sem:39,mois:'Juin',phase:'Construction',phaseClass:'phase-base',
   mardi:{titre:'10\u00D72min seuil intense \u00B7 Halage',terrain:'halage',detail:'Volume de seuil \u00E9lev\u00E9 : 10\u00D72min, r\u00E9cup 1min30. Beaucoup de r\u00E9p\u00E9titions. Accumulation de travail au seuil sans \u00E9puisement. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Sortie montagne mensuelle \u00B7 Ursuya',terrain:'montagne',detail:'Sortie mensuelle de juin sur l\'Ursuya. Tempo trail : 2 blocs de 20min \u00E0 allure soutenue. Total 1h30-2h. Groupe B : fartlek intra-muros 55min. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Le terrain fait d\u00E9j\u00E0 80% du travail. Ajouter entre 2 mont\u00E9es : \uD83D\uDFE2 8 squats lents sur terrain plat + marche active dans la descente \u00B7 \uD83D\uDD35 8 step-down sur rocher plat (4s) + 8 fentes en descente + gainage 30s \u00B7 \uD83D\uDD34 10 step-down excentriques (5s) + 8 fentes bulgares sur le terrain + clamshell 10 chaque c\u00F4t\u00E9. Les descentes techniques sur sentier = travail excentrique intense pour les quadriceps.'},
   g0:'2h route',g1:'2h trail D+',g2:'4h trail',decharge:false},
  {sem:40,mois:'Juin',phase:'Construction',phaseClass:'phase-base',
   mardi:{titre:'Footing + 5\u00D71min30 vivants',terrain:'intramuros',detail:'D\u00E9charge. Footing dans le parc avec 5 acc\u00E9l\u00E9rations. Volume r\u00E9duit.'},
   jeudi:{titre:'Footing r\u00E9cup 50min',terrain:'halage',detail:'R\u00E9cup\u00E9ration active sur le halage. Plat, doux. On consolide le mois.'},
   g0:'1h45 r\u00E9cup route',g1:'1h45 r\u00E9cup trail',g2:'3h l\u00E9ger',decharge:true},

  {sem:41,mois:'Juil',phase:'Bloc montagne',phaseClass:'phase-montagne',
   mardi:{titre:'5\u00D75min seuil \u00B7 Halage',terrain:'halage',detail:'Mont\u00E9e en intensit\u00E9. 5\u00D75min au seuil avec r\u00E9cup 3min. Construction de la base solide avant le bloc estival. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Montagne mensuelle \u00B7 Mondarrain + fartlek',terrain:'montagne',detail:'Sortie montagne intensive. 5-6 mont\u00E9es longues (5-8min) sur le Mondarrain. Descentes r\u00E9cup. Total 2h-2h30. Groupe B : 10\u00D72min c\u00F4tes VW / La Floride. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Le terrain fait d\u00E9j\u00E0 80% du travail. Ajouter entre 2 mont\u00E9es : \uD83D\uDFE2 8 squats lents sur terrain plat + marche active dans la descente \u00B7 \uD83D\uDD35 8 step-down sur rocher plat (4s) + 8 fentes en descente + gainage 30s \u00B7 \uD83D\uDD34 10 step-down excentriques (5s) + 8 fentes bulgares sur le terrain + clamshell 10 chaque c\u00F4t\u00E9. Les descentes techniques sur sentier = travail excentrique intense pour les quadriceps.'},
   g0:'2h30 route longue',g1:'2h30 trail D+',g2:'5h trail ou montagne',decharge:false},
  {sem:42,mois:'Juil',phase:'Bloc montagne',phaseClass:'phase-montagne',
   mardi:{titre:'3\u00D712min seuil \u00B7 Halage',terrain:'halage',detail:'Tr\u00E8s longues r\u00E9p\u00E9titions au seuil. 3\u00D712min r\u00E9cup 4min. La dur\u00E9e la plus longue du programme. Mentalement exigeant. Capital pour le marathon et les longs trails d\'\u00E9t\u00E9. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Escaliers Biarritz \u00B7 10\u00D7mont\u00E9e explosive',terrain:'escaliers',detail:'S\u00E9ance sp\u00E9ciale mensuelle : 10 mont\u00E9es compl\u00E8tes \u00E0 allure maximale soutenue. Descente lente et contr\u00F4l\u00E9e (excentrique). R\u00E9cup 2min. Total 1h15. Alternative : c\u00F4tes VW / La Floride pour ceux qui restent. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Au pied des escaliers entre chaque mont\u00E9e compl\u00E8te : \uD83D\uDFE2 8 squats poids corps lents \u2014 jambes fatigu\u00E9es, aller sur l\'amplitude \u00B7 \uD83D\uDD35 10 fentes avant + 8 calf raises unilat\u00E9raux sur marche du bas \u00B7 \uD83D\uDD34 8 step-down excentriques (5s) sur la marche du bas + foul\u00E9es bondissantes 15s. La descente des escaliers est d\u00E9j\u00E0 un travail excentrique intense \u2014 adapter le volume PPG en cons\u00E9quence.'},
   g0:'2h30 route',g1:'2h30 trail',g2:'5h trail montagne',decharge:false},
  {sem:43,mois:'Juil',phase:'Bloc montagne',phaseClass:'phase-montagne',
   mardi:{titre:'Fartlek Les Douves ou Intra-muros 60min',terrain:'douves',detail:'60min de fartlek avec effort intense en mont\u00E9e des remparts et r\u00E9cup en descente. Simule les relances trail. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min en fin de s\u00E9ance sur le terrain : \uD83D\uDFE2 10 squats + 10 fentes + 30s planche + 20s gainage lat\u00E9ral \u00B7 \uD83D\uDD35 10 squats saut\u00E9s + 8 step-down (3s) + planche lat\u00E9rale 30s + clamshell 10 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (5s) + 8 fentes bulgares + gainage lat\u00E9ral dynamique. Terrain \u00E9clair\u00E9 = possibilit\u00E9 de faire les exercices au sol sans risque.'},
   jeudi:{titre:'Montagne mensuelle \u00B7 Ursuya descentes',terrain:'montagne',detail:'Sortie montagne Ursuya avec focus descentes techniques. 8 mont\u00E9es de 2min + descentes longues \u00E0 vive allure. Groupe B : fartlek intra-muros + descentes techniques c\u00F4tes. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Le terrain fait d\u00E9j\u00E0 80% du travail. Ajouter entre 2 mont\u00E9es : \uD83D\uDFE2 8 squats lents sur terrain plat + marche active dans la descente \u00B7 \uD83D\uDD35 8 step-down sur rocher plat (4s) + 8 fentes en descente + gainage 30s \u00B7 \uD83D\uDD34 10 step-down excentriques (5s) + 8 fentes bulgares sur le terrain + clamshell 10 chaque c\u00F4t\u00E9. Les descentes techniques sur sentier = travail excentrique intense pour les quadriceps.'},
   g0:'2h30 route',g1:'2h30 trail',g2:'5h trail ou weekend montagne',decharge:false},
  {sem:44,mois:'Juil',phase:'Bloc montagne',phaseClass:'phase-montagne',
   mardi:{titre:'Footing + 6\u00D71min vivants',terrain:'halage',detail:'D\u00E9charge. Volume tr\u00E8s r\u00E9duit. R\u00E9cup\u00E9ration compl\u00E8te. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   jeudi:{titre:'Footing r\u00E9cup 50min',terrain:'intramuros',detail:'R\u00E9cup\u00E9ration active. Allure tr\u00E8s douce.'},
   g0:'2h route l\u00E9ger',g1:'2h trail l\u00E9ger',g2:'3h30 l\u00E9ger r\u00E9cup',decharge:true},

  {sem:45,mois:'Ao\u00FBt',phase:'Objectifs \u00E9t\u00E9 / r\u00E9cup',phaseClass:'phase-grp',
   mardi:{titre:'Footing + 6\u00D730s allumage',terrain:'intramuros',detail:'Maintien de la forme. Footing 40min avec 6 petites acc\u00E9l\u00E9rations. On n\'\u00E9puise pas, on entretient avant les objectifs d\'\u00E9t\u00E9.'},
   jeudi:{titre:'Footing l\u00E9ger 45min + 4\u00D71min',terrain:'halage',detail:'Maintien sur le halage. 4 acc\u00E9l\u00E9rations l\u00E9g\u00E8res. L\u00E9ger et efficace. | \uD83C\uDFCB PPG coupl\u00E9e \u2014 Bloc PPG 5 min apr\u00E8s le fractionn\u00E9, avant le retour calme : \uD83D\uDFE2 10 squats + 10 fentes altern\u00E9es + 30s planche frontale \u00B7 \uD83D\uDD35 8 squats saut\u00E9s r\u00E9ception souple + 10 fentes + gainage lat\u00E9ral 30s chaque c\u00F4t\u00E9 \u00B7 \uD83D\uDD34 10 squats saut\u00E9s + 8 step-down excentriques (4s) + 8 fentes bulgares + planche dynamique 40s. Ne pas faire apr\u00E8s le retour calme \u2014 les jambes doivent encore \u00EAtre chaudes pour l\'adaptation musculaire.'},
   g0:'2h route (ou course \uD83C\uDFC1)',g1:'2h trail (ou course trail \uD83C\uDFC1)',g2:'3h trail r\u00E9cup',event:'Objectifs \u00E9t\u00E9 \u2014 trails / routes d\'ao\u00FBt',decharge:false},
  {sem:46,mois:'Ao\u00FBt',phase:'R\u00E9cup\u00E9ration active',phaseClass:'phase-grp',
   mardi:{titre:'Footing + 4\u00D745s vifs',terrain:'intramuros',detail:'Volume r\u00E9duit de 40%. Footing tr\u00E8s facile avec 4 petites acc\u00E9l\u00E9rations. R\u00E9cup\u00E9ration si effort important le weekend.'},
   jeudi:{titre:'Footing r\u00E9cup 35min \u00B7 Halage',terrain:'halage',detail:'Tr\u00E8s l\u00E9ger. Plat. Juste pour bouger les jambes apr\u00E8s un weekend charg\u00E9.'},
   g0:'1h30 route l\u00E9ger',g1:'2h trail l\u00E9ger',g2:'2h30 trail',decharge:false},
  {sem:47,mois:'Ao\u00FBt',phase:'R\u00E9cup\u00E9ration fin saison',phaseClass:'phase-grp',
   mardi:{titre:'Footing + 3\u00D71min frais',terrain:'intramuros',detail:'Fin de saison. Footing l\u00E9ger dans Bayonne avec 3 petites acc\u00E9l\u00E9rations pour garder la vivacit\u00E9.'},
   jeudi:{titre:'Footing r\u00E9cup 30min + \u00E9tirements',terrain:'intramuros',detail:'Minimal. On referme la saison en douceur. La saison prochaine commence en septembre.'},
   g0:'1h route plaisir',g1:'1h30 trail plaisir',g2:'2h trail plaisir',decharge:false},
  {sem:48,mois:'Ao\u00FBt',phase:'Bilan & renouveau',phaseClass:'phase-grp',
   mardi:{titre:'Footing plaisir 40min \u00B7 Bayonne',terrain:'intramuros',detail:'Dernier footing de la saison dans Bayonne. Profitez de la ville, courez sans montre. C\'est la saison prochaine qui commence en septembre.'},
   jeudi:{titre:'Bilan collectif \u00B7 Footing + caf\u00E9',terrain:'intramuros',detail:'S\u00E9ance bilan conviviale. Footing ensemble, puis caf\u00E9 ou bi\u00E8re. On parle de la saison \u00E9coul\u00E9e et on pr\u00E9pare la suivante. Tradition de la section.'},
   g0:'R\u00E9cup libre',g1:'R\u00E9cup libre',g2:'R\u00E9cup compl\u00E8te',decharge:false}
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
