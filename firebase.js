// ══════════════════════════════════════════════════
// firebase.js — Configuration et accès Firestore
// ══════════════════════════════════════════════════
//
// ÉTAPES DE CONFIGURATION :
// 1. Firebase Console → Project Settings → Vos applications
// 2. Cliquez "Ajouter une appli" → Web, puis copiez la config
// 3. Remplacez les valeurs TODO ci-dessous
// ══════════════════════════════════════════════════

const firebaseConfig = {
  apiKey:            "AIzaSyBmKsHSsdBWIVjdO050VKUIWWT3-AG6l_U",
  authDomain:        "ab-running-e8c95.firebaseapp.com",
  projectId:         "ab-running-e8c95",
  storageBucket:     "ab-running-e8c95.firebasestorage.app",
  messagingSenderId: "452828499029",
  appId:             "1:452828499029:web:61f0a592ccb3315fa398dc"
};

if (!firebase.apps || !firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db   = firebase.firestore();
const auth = firebase.auth();

// ══════════════════════════════════════════════════
// CHARGEMENT DES DONNÉES (pages publiques)
// ══════════════════════════════════════════════════

async function fbLoadProgramme() {
  const doc = await db.collection('config').doc('programme').get();
  return doc.exists ? (doc.data().weeks || []) : [];
}

async function fbLoadSeances() {
  try {
    const snap = await db.collection('seances_v3').get();
    if (snap.empty) return {};
    const result = {};
    snap.docs.forEach(d => {
      const v = d.data();
      const id = v.id_original || d.id;
      result[id] = {
        // Champs compatibles v2 (utilisés par le reste du site)
        l:           v.title         || '',
        c:           v.category      || '',
        rpe:         v.rpe_foster    || 0,
        ua:          v.totalUA       || 0,
        d:           v.totalDuration || 0,
        lieu:        v.terrain       || 'Route',
        desc:        v.description   || '',
        // Champs v3 pour affichage enrichi (seanceBlock, modal détail)
        series:      v.series        || [],
        warmupSec:   v.warmupSec     || 0,
        cooldownSec: v.cooldownSec   || 0,
        id_original: id
      };
    });
    return result;
  } catch(e) {
    console.error('fbLoadSeances → seances_v3 :', e);
    return {};
  }
}

async function fbLoadSocle() {
  const doc = await db.collection('config').doc('socle').get();
  return doc.exists ? doc.data() : {
    lundi:    { label: 'Renforcement musculaire', dur: 60,  rpe: 4 },
    mercredi: { label: 'Footing récupération',    dur: 50,  rpe: 3 },
    weRoute:  { label: 'Sortie longue route',     dur: 60,  rpe: 4 },
    weTrail:  { label: 'Sortie longue trail',     dur: 90,  rpe: 4 }
  };
}

async function fbLoadInfosClub() {
  const snap = await db.collection('infosClub').get();
  return snap.docs.map(d => d.data());
}

async function fbLoadObjectifs() {
  try {
    const snap = await db.collection('objectifs').orderBy('date').get();
    return snap.docs.map(d => d.data());
  } catch(e) {
    const snap = await db.collection('objectifs').get();
    return snap.docs.map(d => d.data()).sort((a, b) => (a.date < b.date ? -1 : 1));
  }
}

async function fbLoadCalFixed() {
  try {
    const snap = await db.collection('calFixed').orderBy('date').get();
    return snap.docs.map(d => d.data());
  } catch(e) {
    const snap = await db.collection('calFixed').get();
    return snap.docs.map(d => d.data()).sort((a, b) => (a.date < b.date ? -1 : 1));
  }
}

async function fbLoadCalculateur() {
  const doc = await db.collection('config').doc('calculateur').get();
  return doc.exists ? doc.data() : {};
}

async function fbLoadSeuils() {
  const doc = await db.collection('config').doc('seuils').get();
  return doc.exists ? (doc.data().seuils || []) : [];
}

// Chargement groupé (pages publiques)
async function fbLoadPageData(needed) {
  const tasks = {};
  const all = !needed;
  if (all || needed.includes('programme'))  tasks.programme  = fbLoadProgramme();
  if (all || needed.includes('seances'))    tasks.seances    = fbLoadSeances();
  if (all || needed.includes('socle'))      tasks.socle      = fbLoadSocle();
  if (all || needed.includes('infosClub'))  tasks.infosClub  = fbLoadInfosClub();
  if (all || needed.includes('objectifs'))  tasks.objectifs  = fbLoadObjectifs();
  if (all || needed.includes('calFixed'))   tasks.calFixed   = fbLoadCalFixed();
  if (all || needed.includes('calculateur'))tasks.calculateur= fbLoadCalculateur();
  if (all || needed.includes('seuils'))     tasks.seuils     = fbLoadSeuils();

  const keys = Object.keys(tasks);
  const vals = await Promise.all(keys.map(k => tasks[k]));
  const result = {};
  keys.forEach((k, i) => result[k] = vals[i]);
  return result;
}

// ══════════════════════════════════════════════════
// SAUVEGARDE DES DONNÉES (admin uniquement)
// ══════════════════════════════════════════════════

async function fbSaveProgramme(weeks) {
  await db.collection('config').doc('programme').set({ weeks });
}

async function fbSaveSeances(data) {
  await db.collection('config').doc('seances').set({ data });
}

async function fbSaveSocle(socle) {
  await db.collection('config').doc('socle').set(socle);
}

async function fbSaveInfosClub(messages) {
  const batch = db.batch();
  const existing = await db.collection('infosClub').get();
  existing.docs.forEach(d => batch.delete(d.ref));
  messages.forEach(m => {
    const id = m.id || ('msg_' + Date.now() + '_' + Math.floor(Math.random()*9999));
    batch.set(db.collection('infosClub').doc(id), { ...m, id });
  });
  await batch.commit();
}

async function fbSaveObjectifs(objectifs) {
  const batch = db.batch();
  const existing = await db.collection('objectifs').get();
  existing.docs.forEach(d => batch.delete(d.ref));
  objectifs.forEach((o, i) => {
    const id = 'obj_' + (o.date || i).toString().replace(/[^a-zA-Z0-9]/g, '_');
    batch.set(db.collection('objectifs').doc(id), o);
  });
  await batch.commit();
}

async function fbSaveCalFixed(events) {
  const batch = db.batch();
  const existing = await db.collection('calFixed').get();
  existing.docs.forEach(d => batch.delete(d.ref));
  events.forEach(e => {
    const id = e.id || ('cal_' + Date.now() + '_' + Math.floor(Math.random()*9999));
    batch.set(db.collection('calFixed').doc(id), { ...e, id });
  });
  await batch.commit();
}

async function fbSaveCalculateur(textes) {
  await db.collection('config').doc('calculateur').set(textes);
}

async function fbSaveSeuils(seuils) {
  await db.collection('config').doc('seuils').set({ seuils });
}

// ══════════════════════════════════════════════════
// SEANCES_V3 — Planificateur
// ══════════════════════════════════════════════════

async function fbLoadSeancesV3() {
  try {
    const snap = await db.collection('seances_v3').orderBy('id_original').get();
    return snap.docs.map(d => ({ _docId: d.id, ...d.data() }));
  } catch(e) {
    const snap = await db.collection('seances_v3').get();
    return snap.docs.map(d => ({ _docId: d.id, ...d.data() }))
      .sort((a, b) => (a.id_original || '').localeCompare(b.id_original || ''));
  }
}

async function fbSaveSeanceV3(id, data) {
  await db.collection('seances_v3').doc(id).set(data);
}

async function fbDeleteSeanceV3(id) {
  await db.collection('seances_v3').doc(id).delete();
}

// Import séances_v3 depuis un tableau JSON (utilise id_original comme doc ID)
async function fbImportSeancesV3(workouts, onProgress) {
  const CHUNK = 490; // limite batch Firestore = 500
  let done = 0;
  for (let i = 0; i < workouts.length; i += CHUNK) {
    const chunk = workouts.slice(i, i + CHUNK);
    const batch = db.batch();
    chunk.forEach(w => {
      const ref = db.collection('seances_v3').doc(w.id_original);
      batch.set(ref, w);
    });
    await batch.commit();
    done += chunk.length;
    if (onProgress) onProgress(done, workouts.length);
  }
}

// Publication complète — pousse tout L vers Firestore
async function fbPublishAll(L, socleData) {
  await Promise.all([
    fbSaveProgramme(L.programme),
    fbSaveSeances(L.seances),
    fbSaveSocle(socleData),
    fbSaveInfosClub(L.infosClub),
    fbSaveObjectifs(L.objectifs),
    fbSaveCalFixed(L.calFixed),
    fbSaveCalculateur(L.calcTextes || {}),
    fbSaveSeuils(L.chargeSeuils || [])
  ]);
}
