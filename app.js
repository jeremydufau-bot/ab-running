
// ══════════════════════════════════════════════
// INFOS CLUB (bandeau accueil)
// ══════════════════════════════════════════════
function renderInfosClub(){
  const el = document.getElementById('infosClubSection');
  if(!el) return;
  if(typeof infosClub === 'undefined' || !infosClub || !infosClub.length){
    el.innerHTML = '';
    return;
  }
  const today = new Date(); today.setHours(0,0,0,0);
  const actifs = infosClub.filter(m => {
    if(!m.dateFin) return true;
    const fin = new Date(m.dateFin + 'T23:59:59');
    return fin >= today;
  });
  if(!actifs.length){ el.innerHTML = ''; return; }

  el.innerHTML = actifs.map(m => {
    const cls = `type-${m.type || 'info'}`;
    const dateStr = m.dateFin ? `Jusqu'au ${new Date(m.dateFin+'T12:00:00').toLocaleDateString('fr-FR',{day:'numeric',month:'short'})}` : '';
    return `<div class="infos-club-card ${cls}">
      <div class="ic-header">
        <div class="ic-title">${m.titre || ''}</div>
        ${dateStr ? `<div class="ic-date-tag">${dateStr}</div>` : ''}
      </div>
      <div class="ic-text">${m.texte || ''}</div>
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════════
// DIFFICULTÉ (système piste de ski, basé sur UA)
// ══════════════════════════════════════════════
// Estimation de la charge UA d'une séance mardi/jeudi à partir de son titre
// Retourne { ua, rpe, duree, diff_key, diff_label, diff_color }
function estimateSessionCharge(titre){
  const t = (titre || '').toLowerCase();
  let rpe = 7, duree = 50; // défaut séance fractionné standard

  // Ajustement RPE selon type de séance
  if(/récup|recup|repos/.test(t))         { rpe = 3; duree = 45; }
  else if(/footing souple|allure souple/.test(t)) { rpe = 4; duree = 50; }
  else if(/footing|endurance/.test(t))    { rpe = 5; duree = 55; }
  else if(/fartlek\s+libre/.test(t))      { rpe = 6; duree = 50; }
  else if(/fartlek/.test(t))              { rpe = 7; duree = 50; }
  else if(/tempo|seuil/.test(t))          { rpe = 7; duree = 55; }
  else if(/côte|cote|escaliers/.test(t))  { rpe = 8; duree = 50; }
  else if(/30["']?\s*\/\s*30|vma/.test(t)){ rpe = 8; duree = 45; }
  else if(/pyramid/.test(t))              { rpe = 8; duree = 55; }
  else if(/3x15|4x2000|5x1000/.test(t))   { rpe = 8; duree = 70; }
  else if(/×\s*[12]min|×1min|×2min/.test(t))      { rpe = 8; duree = 50; }
  else if(/×\s*3min|×3min/.test(t))        { rpe = 7; duree = 50; }
  else if(/×\s*4min|×\s*5min/.test(t))    { rpe = 7; duree = 55; }

  // Charge séance principale
  const ua_seance = rpe * duree;
  // Échauff 30min × RPE 3 = 90
  const ua_echauff = 90;
  // PPG 15min × RPE 4 = 60
  const ua_ppg = 60;
  const ua = ua_seance + ua_echauff + ua_ppg;

  // Déterminer le niveau de difficulté
  const niveaux = (typeof difficulteNiveaux !== 'undefined' && difficulteNiveaux.length)
    ? difficulteNiveaux
    : [
        { key:'vert',   label:'Vert',   couleur:'#2E8B3E', ua_max:280 },
        { key:'bleu',   label:'Bleu',   couleur:'#3A7BBF', ua_max:380 },
        { key:'orange', label:'Orange', couleur:'#E67E22', ua_max:480 },
        { key:'rouge',  label:'Rouge',  couleur:'#C0392B', ua_max:600 },
        { key:'noir',   label:'Noir',   couleur:'#1A1A1A', ua_max:9999 }
      ];
  const niv = niveaux.find(n => ua <= n.ua_max) || niveaux[niveaux.length-1];

  return {
    ua, rpe, duree,
    diff_key:   niv.key,
    diff_label: niv.label,
    diff_color: niv.couleur
  };
}

// Rendu d'une pastille difficulté
function diffBadge(ch){
  return `<span class="diff-pill diff-${ch.diff_key}">
    <span class="diff-dot diff-${ch.diff_key}"></span>
    ${ch.diff_label}
  </span>
  <span class="ua-badge" title="RPE × durée estimée">${ch.ua} UA · ${ch.rpe}/10</span>`;
}

// ══════════════════════════════════════════════
// NAV & MODAL
// ══════════════════════════════════════════════
function showPage(id,btn){
  document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(b=>b.classList.remove('active'));
  document.getElementById(id).classList.add('active');
  btn.classList.add('active');
  window.scrollTo({top:document.querySelector('nav').offsetTop,behavior:'smooth'});
  // Refresh pages that depend on dynamic data
  if(id==='calendrier') renderCal();
  if(id==='suggestions') renderSuggestions();
  if(id==='accueil'){ renderAccueilGrid(); renderAccueilEvents(); }
  if(id==='calculateur') renderCalculateur();
  if(id==='terrains') renderTerrains();
}
function closeModal(){
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow='';
}
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

// ══════════════════════════════════════════════
// PROGRAMME DATA
// ══════════════════════════════════════════════
// ══════════════════════════════════════════════
// PROGRAMME — État
// ══════════════════════════════════════════════
let currentLevel = 0;
let currentPhase = '';
let currentNiveau = 0; // 0=débutant 1=intermédiaire 2=confirmé



function setLevel(lvl, btn){
  currentLevel = lvl;
  document.querySelectorAll('.level-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const labels = ['Weekend · Route 🏃','Weekend · Trail loisir 🌿','Weekend · Trail montagne 🏔'];
  document.getElementById('col-weekend-label').textContent = labels[lvl];
  buildTable();
}
function setPhase(ph, btn){
  currentPhase = ph;
  document.querySelectorAll('.phase-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  buildTable();
}
function setNiveau(n, btn){
  currentNiveau = n;
  document.querySelectorAll('.niveau-sel-btn').forEach((b,i)=>{
    b.classList.remove('active','niv0','niv1','niv2');
    if(i===n){ b.classList.add('active','niv'+n); }
  });
  buildTable();
}

function terrainTag(t){
  const d = terrainLabel[t] || {icon:'📍',label:t,cls:'tag-blue'};
  return `<span class="terrain-tag tag ${d.cls}" title="${d.label}">${d.icon} ${d.label}</span>`;
}

// Données de niveau par type de séance
function getNiveauBlock(titre){
  // Detect type from title
  const t = titre.toLowerCase();
  if(/30"\/30"|30'30|30s.30s/.test(t)) return niveauxData['3030'];
  const m = t.match(/(\d+)×(\d+)min|(\d+)min/);
  if(m){
    const mins = m[2]||m[3];
    if(mins && niveauxData[mins+'min']) return niveauxData[mins+'min'];
  }
  if(/30s/.test(t)) return niveauxData['30s'];
  if(/1min30|1'30/.test(t)) return niveauxData['1min30'];
  if(/2min/.test(t)) return niveauxData['2min'];
  if(/1min/.test(t)) return niveauxData['1min'];
  if(/côte|cote/.test(t)) return niveauxData['cote'];
  if(/fartlek/.test(t)) return niveauxData['fartlek'];
  return null;
}

function buildTable(){
  const tbody = document.getElementById('progBody');
  const gKeys = ['g0','g1','g2'];
  const rows = programme.filter(s => !currentPhase || s.phaseClass === currentPhase);
  const nLabels = ['🟢 Débutant','🔵 Intermédiaire','🔴 Confirmé'];

  tbody.innerHTML = rows.map(s => {
    const ph = phaseLabels[s.phaseClass] || {label:s.phase,cls:'phase-base'};
    const wknd = s[gKeys[currentLevel]] || '—';
    const isEvent = s.event;
    const dc = s.decharge;

    const mardiKey = `${s.sem}_mardi`;
    const jeudiKey = `${s.sem}_jeudi`;
    const mardi = s.mardi;
    const jeudi = s.jeudi;

    // Niveau detail for current session type
    const niv = niveauxData['cote']; // placeholder, shown in detail
    const nivBadge = `<span class="niveau-badge niv-${currentNiveau}">${nLabels[currentNiveau]}</span>`;

    return `<tr class="${dc?'decharge':''} ${isEvent?'has-event':''}" onclick="openDetail(${s.sem})">
      <td>
        <div class="sem-num">S${s.sem}</div>
        <div class="mois-lbl">${s.mois}</div>
      </td>
      <td>
        <span class="phase-badge ${ph.cls}">${ph.label}</span>
        ${dc?'<span class="decharge-badge">🟢 Décharge</span>':''}
        ${isEvent?`<div style="font-size:.68rem;color:var(--ab-blue);font-weight:600;margin-top:.2rem">📌 ${s.event}</div>`:''}
      </td>
      <td>
        <div class="seance-titre">${mardi.titre}</div>
        <div class="seance-meta">
          ${terrainTag(mardi.terrain)}
          ${diffBadge(estimateSessionCharge(mardi.titre))}
        </div>
      </td>
      <td>
        <div class="seance-titre">${jeudi.titre}</div>
        <div class="seance-meta">
          ${terrainTag(jeudi.terrain)}
          ${diffBadge(estimateSessionCharge(jeudi.titre))}
        </div>
      </td>
      <td style="color:var(--muted);font-size:.78rem;line-height:1.5">${wknd}</td>
    </tr>`;
  }).join('');
}
buildTable();

// ══════════════════════════════════════════════
// ACCUEIL — 3 semaines dynamiques
// ══════════════════════════════════════════════
let accLevel = 0;   // 0=Route 1=Trail loisir 2=Trail montagne
let accNiveau = 0;  // 0=Débutant 1=Intermédiaire 2=Confirmé

function setAccLevel(lvl, btn){
  accLevel = lvl;
  document.querySelectorAll('.acc-sel-btn').forEach((b,i) => {
    b.classList.remove('active');
    b.classList.toggle('active', i === lvl);
  });
  renderAccueilGrid();
}
function setAccNiveau(n, btn){
  accNiveau = n;
  document.querySelectorAll('.acc-niv-btn').forEach((b,i) => {
    b.classList.remove('active');
    b.classList.toggle('active', i === n);
  });
  renderAccueilGrid();
}

// S1 = semaine contenant le 1er septembre de la saison
function getSemaineSaison(){
  const today = new Date();
  const yr = today.getFullYear();
  const saisonAnnee = today.getMonth() >= 8 ? yr : yr - 1;
  const sep1 = new Date(saisonAnnee, 8, 1);
  const j = sep1.getDay();
  const lundiS1 = new Date(saisonAnnee, 8, 1 + (j === 0 ? -6 : 1 - j));
  const ja = today.getDay();
  const lundiAuj = new Date(today.getFullYear(), today.getMonth(), today.getDate() + (ja === 0 ? -6 : 1 - ja));
  const semNum = Math.floor(Math.round((lundiAuj - lundiS1) / 86400000) / 7) + 1;
  return { semNum, lundiAuj, saisonAnnee };
}

function fmtWR(lundi){
  const dim = new Date(+lundi + 6*86400000);
  const o = {day:'numeric',month:'short'};
  return lundi.toLocaleDateString('fr-FR',o) + ' – ' + dim.toLocaleDateString('fr-FR',o);
}

// Extrait uniquement le texte principal (avant le bloc PPG)
function mainDetail(text){
  const idx = text.indexOf(' | 🏋 PPG');
  return (idx === -1 ? text : text.substring(0, idx)).trim();
}

// Extrait la prescription PPG pour un niveau donné
function ppgForLevel(text, nLvl){
  const idx = text.indexOf(' | 🏋 PPG');
  if(idx === -1) return '';
  const ppgRaw = text.substring(idx + ' | 🏋 PPG'.length + 1);
  const patterns = [/🟢\s*([^🔵🔴]+)/, /🔵\s*([^🔴]+)/, /🔴\s*([^.⚠💡]+\.?)/];
  const m = ppgRaw.match(patterns[nLvl]);
  return m ? m[1].replace(/\s*·\s*$/, '').trim() : '';
}

// Prescription de répétitions selon niveau
function nivDetails(titre, nLvl){
  const nd = getNiveauBlock(titre);
  if(!nd) return '';
  const cols = ['var(--mousse)','var(--ab-blue2)','var(--rouge)'];
  return `<div style="font-family:'Syne',sans-serif;font-size:.7rem;color:${cols[nLvl]};font-weight:700;margin-top:.3rem">
    ${nd.reps[nLvl]} rép · récup ${nd.recup[nLvl]} · ${nd.allure[nLvl]}
  </div>`;
}

function renderAccueilInit(){
  const { semNum, saisonAnnee } = getSemaineSaison();
  const semData = programme.find(s => s.sem === semNum);
  document.getElementById('acc-sem-num').textContent = semNum >= 1 && semNum <= 48 ? 'S'+semNum : '—';
  document.getElementById('acc-sem-phase').textContent = semData ? semData.phase : 'Hors saison';
  document.getElementById('acc-saison-lbl').textContent = 'Saison '+saisonAnnee+'–'+(saisonAnnee+1)+' · S1 = semaine du 1er septembre';
  renderAccueilGrid();
  renderAccueilEvents();
}

function renderAccueilGrid(){
  const { semNum, lundiAuj } = getSemaineSaison();
  const gKeys = ['g0','g1','g2'];
  const gLabels = ['Route 🏃','Trail loisir 🌿','Trail montagne 🏔'];
  const weekLabels = ['Cette semaine','Semaine prochaine','Dans 2 semaines'];
  const nivColors = ['var(--mousse)','var(--ab-blue2)','var(--rouge)'];
  const nivLabels = ['🟢 Débutant','🔵 Intermédiaire','🔴 Confirmé'];
  const grid = document.getElementById('acc-grid');
  grid.innerHTML = '';

  for(let i = 0; i < 3; i++){
    const sn = semNum + i;
    const base = programme.find(x => x.sem === sn);
    const lundiSem = new Date(+lundiAuj + i*7*86400000);
    const mardi = new Date(+lundiSem + 86400000);
    const jeudi = new Date(+lundiSem + 3*86400000);
    const isCur = i === 0;

    if(!base || sn < 1 || sn > 48){
      grid.innerHTML += `<div class="card" style="opacity:.4">
        <span style="font-family:'Syne',sans-serif;font-size:.62rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)">${weekLabels[i]} · S${sn}</span>
        <p style="font-size:.82rem;color:var(--muted);margin-top:.4rem">Hors saison.</p>
      </div>`; continue;
    }

    // Apply overrides (same as programme page)
    const s_mardi = base.mardi;
    const s_jeudi = base.jeudi;
    const wkndVal = base[gKeys[accLevel]] || '—';

    const ph = phaseLabels[base.phaseClass] || {label:base.phase,cls:'phase-base'};
    const tM = terrainLabel[s_mardi.terrain] || {icon:'📍',label:s_mardi.terrain};
    const tJ = terrainLabel[s_jeudi.terrain] || {icon:'📍',label:s_jeudi.terrain};
    const fmtM = mardi.toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'long'});
    const fmtJ = jeudi.toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'long'});

    const detM = mainDetail(s_mardi.detail);
    const detJ = mainDetail(s_jeudi.detail);
    const ppgM = ppgForLevel(s_mardi.detail, accNiveau);
    const ppgJ = ppgForLevel(s_jeudi.detail, accNiveau);
    const modM = '';
    const modJ = '';

    const hdrBg = isCur ? 'var(--ab-blue)' : 'var(--surface2)';
    const snCol = isCur ? 'var(--ab-sky)' : 'var(--ab-blue)';
    const lblCol = isCur ? 'rgba(255,255,255,.5)' : 'var(--muted)';
    const rngCol = isCur ? 'rgba(255,255,255,.88)' : 'var(--text)';
    const border = isCur ? 'var(--ab-light)' : 'var(--border)';

    grid.innerHTML += `
    <div style="background:var(--surface);border:1.5px solid ${border};border-radius:14px;overflow:hidden;box-shadow:${isCur?'0 4px 20px rgba(74,122,204,.18)':'0 2px 8px rgba(27,58,107,.05)'}">
      <div style="background:${hdrBg};padding:.8rem 1.3rem;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem">
        <div style="display:flex;align-items:center;gap:.8rem">
          <span style="font-family:'Bebas Neue',sans-serif;font-size:2rem;line-height:1;color:${snCol}">S${sn}</span>
          <div>
            <div style="font-family:'Syne',sans-serif;font-size:.58rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${lblCol}">${weekLabels[i]}</div>
            <div style="font-family:'Syne',sans-serif;font-size:.68rem;font-weight:600;color:${rngCol}">${fmtWR(lundiSem)}</div>
          </div>
        </div>
        <div style="display:flex;align-items:center;gap:.35rem;flex-wrap:wrap">
          <span class="phase-badge ${ph.cls}">${ph.label}</span>
          ${base.decharge?'<span class="decharge-badge">🟢 Décharge</span>':''}
          ${base.event?`<span style="font-family:'Syne',sans-serif;font-size:.57rem;font-weight:700;color:${isCur?'rgba(255,255,255,.8)':'var(--ab-blue2)'}">📌 ${base.event}</span>`:''}
        </div>
      </div>

      <div style="display:grid;grid-template-columns:1fr 1fr">
        <div style="padding:.95rem 1.2rem;border-right:1px solid var(--border)">
          <div style="font-family:'Syne',sans-serif;font-size:.55rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--ab-blue);margin-bottom:.3rem">📅 ${fmtM}</div>
          <div style="font-family:'Syne',sans-serif;font-size:.82rem;font-weight:800;color:var(--text);line-height:1.3;margin-bottom:.3rem">${s_mardi.titre}${modM}</div>
          <span class="tag tag-sky" style="font-size:.56rem">${tM.icon} ${tM.label}</span>
          <span class="tag tag-blue" style="font-size:.56rem">18h15 · La Floride</span>
          ${nivDetails(s_mardi.titre, accNiveau)}
          <div style="font-size:.73rem;color:var(--muted);line-height:1.65;margin-top:.4rem">${detM.length>120?detM.substring(0,120)+'…':detM}</div>
          ${ppgM?`<div style="margin-top:.4rem;padding:.4rem .6rem;background:rgba(27,58,107,.04);border:1px solid rgba(27,58,107,.1);border-radius:6px;font-size:.7rem;color:var(--ab-blue2)"><span style="font-family:'Syne',sans-serif;font-size:.55rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--ab-blue);display:block;margin-bottom:.15rem">🏋 PPG ${nivLabels[accNiveau]}</span>${ppgM.length>100?ppgM.substring(0,100)+'…':ppgM}</div>`:''}
        </div>
        <div style="padding:.95rem 1.2rem">
          <div style="font-family:'Syne',sans-serif;font-size:.55rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--mousse);margin-bottom:.3rem">📅 ${fmtJ}</div>
          <div style="font-family:'Syne',sans-serif;font-size:.82rem;font-weight:800;color:var(--text);line-height:1.3;margin-bottom:.3rem">${s_jeudi.titre}${modJ}</div>
          <span class="tag tag-green" style="font-size:.56rem">${tJ.icon} ${tJ.label}</span>
          <span class="tag tag-sky" style="font-size:.56rem">18h15 · La Floride</span>
          ${nivDetails(s_jeudi.titre, accNiveau)}
          <div style="font-size:.73rem;color:var(--muted);line-height:1.65;margin-top:.4rem">${detJ.length>120?detJ.substring(0,120)+'…':detJ}</div>
          ${ppgJ?`<div style="margin-top:.4rem;padding:.4rem .6rem;background:rgba(27,58,107,.04);border:1px solid rgba(27,58,107,.1);border-radius:6px;font-size:.7rem;color:var(--ab-blue2)"><span style="font-family:'Syne',sans-serif;font-size:.55rem;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--ab-blue);display:block;margin-bottom:.15rem">🏋 PPG ${nivLabels[accNiveau]}</span>${ppgJ.length>100?ppgJ.substring(0,100)+'…':ppgJ}</div>`:''}
        </div>
      </div>

      <div style="padding:.5rem 1.2rem;border-top:1px solid var(--border);background:var(--bg2);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:.5rem">
        <span style="font-size:.72rem;color:var(--muted);font-family:'Syne',sans-serif">🏃 ${gLabels[accLevel]} — ${wkndVal}</span>
        <button onclick="openDetail(${sn})" style="background:none;border:none;font-family:'Syne',sans-serif;font-size:.65rem;font-weight:700;color:var(--ab-blue2);cursor:pointer;letter-spacing:.04em">Détail complet →</button>
      </div>
    </div>`;
  }
}

function renderAccueilEvents(){
  const today = new Date(); today.setHours(0,0,0,0);
  const deleted = getDeletedFixed ? getDeletedFixed() : [];
  const memberEvents = getCalEvents ? getCalEvents() : [];
  const allEvents = [
    ...calFixed.filter(e => !deleted.includes(e.id)),
    ...memberEvents
  ];
  const prochains = allEvents
    .map(e => ({...e, _d: new Date(e.date+'T12:00:00')}))
    .filter(e => e._d >= today)
    .sort((a,b) => a._d - b._d)
    .slice(0, 4);

  const el = document.getElementById('acc-events');
  if(!prochains.length){ el.innerHTML='<p style="color:var(--muted);font-size:.85rem">Aucun événement à venir.</p>'; return; }
  el.innerHTML = prochains.map(e => {
    const dLeft = Math.round((e._d - today)/86400000);
    const dLbl = dLeft===0?"Aujourd'hui !":dLeft===1?'Demain':`Dans ${dLeft} jours`;
    const fmtD = e._d.toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'long'});
    return `<div class="cal-event">
      <div style="text-align:center;min-width:48px">
        <div class="cal-event-date">${e._d.getDate()}</div>
        <div class="cal-event-month">${e._d.toLocaleDateString('fr-FR',{month:'short'}).replace('.','')}</div>
      </div>
      <div class="cal-event-info">
        <div class="cal-event-titre">${e.titre}</div>
        <div class="cal-event-desc">${fmtD} · <span style="color:var(--ab-light);font-weight:600">${dLbl}</span></div>
      </div>
      <span class="cal-event-type ${typeCls[e.type]||'type-social'}">${typeLabel[e.type]||e.type}</span>
    </div>`;
  }).join('');
}

function formatDetailAndPPG(text, nLvl){
  // Séparer texte principal et bloc PPG
  const SEP = ' | 🏋 PPG';
  const ppgIdx = text.indexOf(SEP);
  if(ppgIdx === -1){
    return `<p style="font-size:.85rem;color:var(--muted);line-height:1.8">${text}</p>`;
  }

  const mainText = text.substring(0, ppgIdx);
  const ppgRaw   = text.substring(ppgIdx + SEP.length + 1); // skip ' | 🏋 PPG '

  // Parser les niveaux : chercher 🟢 🔵 🔴 comme délimiteurs
  // Format : "Titre — intro : 🟢 exo_deb · 🔵 exo_int · 🔴 exo_conf. Suffix."
  const niv0Match = ppgRaw.match(/🟢\s*([^🔵🔴]+)/);
  const niv1Match = ppgRaw.match(/🔵\s*([^🔴]+)/);
  const niv2Match = ppgRaw.match(/🔴\s*([^.⚠💡]+\.?)/);

  const niv0 = niv0Match ? niv0Match[1].replace(/\s*·\s*$/, '').trim() : '';
  const niv1 = niv1Match ? niv1Match[1].replace(/\s*·\s*$/, '').trim() : '';
  const niv2 = niv2Match ? niv2Match[1].replace(/\s*·?\s*$/, '').trim() : '';

  // Intro = tout ce qui précède le premier 🟢
  const firstNivIdx = ppgRaw.search(/[🟢🔵🔴]/u);
  let intro = '';
  if(firstNivIdx > 0){
    intro = ppgRaw.substring(0, firstNivIdx)
      .replace(/^[^—]*—\s*/, '')  // enlever "PPG couplée — "
      .replace(/:\s*$/, '')
      .trim();
  }

  // Suffix = ce qui suit le dernier niveau
  const lastRedMatch = ppgRaw.match(/🔴[^.]+\.\s*(.+)$/s);
  const suffix = lastRedMatch ? lastRedMatch[1].trim() : '';

  const colors  = ['#3d8b5c','#2351a0','#c04040'];
  const bgs     = ['rgba(74,138,90,.08)','rgba(27,58,107,.07)','rgba(192,64,64,.07)'];
  const borders = ['rgba(74,138,90,.22)','rgba(27,58,107,.15)','rgba(192,64,64,.15)'];
  const labels  = ['🟢 Débutant','🔵 Intermédiaire','🔴 Confirmé'];
  const tips    = [
    '💡 Technique et récup complète. Si fatigue résiduelle : enlever 2 répétitions.',
    '💡 Régularité sur toutes les répétitions. La dernière doit ressembler à la première.',
    '⚡ Volume élevé. Bien s\'échauffer, écouter les sensations — pas de forcing.'
  ];
  const texts = [niv0, niv1, niv2];

  const ppgHtml = `
    <div style="background:rgba(27,58,107,.04);border:1px solid rgba(27,58,107,.12);border-radius:8px;padding:1rem;margin-top:.8rem">
      <div style="font-family:'Syne',sans-serif;font-size:.62rem;font-weight:800;letter-spacing:.15em;text-transform:uppercase;color:#1b3a6b;margin-bottom:.5rem">🏋 PPG COUPLÉE</div>
      ${intro ? `<p style="font-size:.79rem;color:#6b7a9a;margin-bottom:.6rem;font-style:italic">${intro}</p>` : ''}
      <div style="display:flex;flex-direction:column;gap:.4rem">
        ${texts.map((t,i) => !t.trim() ? '' : `
          <div style="padding:.55rem .8rem;border-radius:7px;
            background:${i===nLvl ? bgs[i] : 'rgba(0,0,0,.02)'};
            border:1px solid ${i===nLvl ? borders[i] : 'rgba(0,0,0,.06)'}">
            <div style="font-family:'Syne',sans-serif;font-size:.67rem;font-weight:800;color:${colors[i]};margin-bottom:.2rem">
              ${labels[i]}${i===nLvl ? ' <span style="font-size:.55rem;opacity:.7">← votre niveau</span>' : ''}
            </div>
            <div style="font-size:.82rem;color:#1a2540;line-height:1.6;font-weight:${i===nLvl?'500':'400'}">${t}</div>
            ${i===nLvl ? `<div style="font-size:.72rem;color:${colors[i]};margin-top:.25rem;opacity:.8">${tips[i]}</div>` : ''}
          </div>`).join('')}
      </div>
      ${suffix ? `<p style="font-size:.74rem;color:#9a8e82;margin-top:.6rem;font-style:italic">⚠️ ${suffix}</p>` : ''}
    </div>`;

  return `<p style="font-size:.85rem;color:#6b7a9a;line-height:1.8">${mainText}</p>${ppgHtml}`;
}

function openDetail(sem){
  const s = programme.find(x=>x.sem===sem);
  if(!s) return;
  const gKeys = ['g0','g1','g2'];
  const wknd = s[gKeys[currentLevel]] || '—';
  const mardi = s.mardi;
  const jeudi = s.jeudi;
  const nLvl = currentNiveau;

  function niveauSection(seance){
    const nd = getNiveauBlock(seance.titre);
    if(!nd) return '';
    return `
      <div style="background:rgba(27,58,107,.05);border:1px solid rgba(27,58,107,.1);border-radius:8px;padding:.8rem;margin-top:.6rem">
        <div style="font-family:'Syne',sans-serif;font-size:.6rem;font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--ab-blue);margin-bottom:.5rem">R\u{E9}p\u{E9}titions &amp; intensit\u{E9} par niveau</div>
        <div class="niveau-tabs">
          <button class="niveau-tab ${nLvl===0?'active':''}" onclick="switchNivTab(0,this)">\u{1F7E2} D\u{E9}butant</button>
          <button class="niveau-tab ${nLvl===1?'active':''}" onclick="switchNivTab(1,this)">\u{1F535} Interm.</button>
          <button class="niveau-tab ${nLvl===2?'active':''}" onclick="switchNivTab(2,this)">\u{1F534} Confirm\u{E9}</button>
        </div>
        <div class="niveau-block ${nLvl===0?'active':''}" data-niv="0">
          <strong style="font-size:.82rem;color:var(--text)">${nd.reps[0]}</strong>
          <span style="font-size:.78rem;color:var(--muted)"> reps \u{B7} Récup <strong>${nd.recup[0]}</strong> \u{B7} ${nd.allure[0]}</span>
          <div style="font-size:.74rem;color:var(--mousse);margin-top:.25rem">\u{1F4A1} Technique et r\u{E9}cup compl\u{E8}te. Si fatigue : -2 r\u{E9}p\u{E9}titions.</div>
        </div>
        <div class="niveau-block ${nLvl===1?'active':''}" data-niv="1">
          <strong style="font-size:.82rem;color:var(--text)">${nd.reps[1]}</strong>
          <span style="font-size:.78rem;color:var(--muted)"> reps \u{B7} Récup <strong>${nd.recup[1]}</strong> \u{B7} ${nd.allure[1]}</span>
          <div style="font-size:.74rem;color:var(--ab-blue);margin-top:.25rem">\u{1F4A1} R\u{E9}gularit\u{E9} sur toutes les r\u{E9}p\u{E9}titions. La derni\u{E8}re = la premi\u{E8}re.</div>
        </div>
        <div class="niveau-block ${nLvl===2?'active':''}" data-niv="2">
          <strong style="font-size:.82rem;color:var(--text)">${nd.reps[2]}</strong>
          <span style="font-size:.78rem;color:var(--muted)"> reps \u{B7} Récup <strong>${nd.recup[2]}</strong> \u{B7} ${nd.allure[2]}</span>
          <div style="font-size:.74rem;color:var(--rouge);margin-top:.25rem">\u{26A1} Volume \u{E9}lev\u{E9} \u{2014} bien s'\u{E9}chauffer, \u{E9}couter les sensations.</div>
        </div>
      </div>`;
  }

  document.getElementById('mTitle').innerHTML = `Semaine ${s.sem} \u{2014} ${s.mois} \u{B7} ${s.phase}`;
  document.getElementById('mBody').innerHTML = `
    ${s.event?`<div style="background:rgba(27,58,107,.07);border:1px solid rgba(27,58,107,.12);border-radius:6px;padding:.6rem 1rem;margin-bottom:.8rem;font-family:'Syne',sans-serif;font-size:.74rem;font-weight:700;color:var(--ab-blue2)">\u{1F4CC} ${s.event}</div>`:''}
    ${s.decharge?`<div style="background:rgba(74,138,90,.08);border:1px solid rgba(74,138,90,.2);border-radius:6px;padding:.5rem 1rem;margin-bottom:.8rem;font-family:'Syne',sans-serif;font-size:.72rem;color:var(--mousse)">\u{1F7E2} Semaine de d\u{E9}charge \u{2014} volume -35%, pas d'intensit\u{E9} haute.</div>`:''}
    <h4>\u{1F4C5} Mardi \u{2014} ${mardi.titre}</h4>
    <p style="margin-top:.25rem">${terrainTag(mardi.terrain)}</p>
    ${formatDetailAndPPG(mardi.detail, nLvl)}
    ${niveauSection(mardi)}
    <h4 style="margin-top:1.2rem">\u{1F4C5} Jeudi \u{2014} ${jeudi.titre}</h4>
    <p style="margin-top:.25rem">${terrainTag(jeudi.terrain)}</p>
    ${formatDetailAndPPG(jeudi.detail, nLvl)}
    ${niveauSection(jeudi)}
    <h4 style="margin-top:1.2rem">\u{1F3C3} Weekend \u{2014} ${['Route \u{1F3C3}','Trail loisir \u{1F33F}','Trail montagne \u{1F3D4}'][currentLevel]}</h4>
    <p style="font-size:.85rem;color:var(--muted)">${wknd}</p>
  `;
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow='hidden';
}

function switchNivTab(n, btn){
  const modal = document.getElementById('mBody');
  modal.querySelectorAll('.niveau-tab').forEach((b,i)=>b.classList.toggle('active',i===n));
  modal.querySelectorAll('.niveau-block').forEach(b=>b.classList.toggle('active',+b.dataset.niv===n));
}


// ══════════════════════════════════════════════
// CALENDRIER — unifié avec sorties des membres
// ══════════════════════════════════════════════
let currentCalFilter = 'all';

// Sorties fixes de la section (avec id unique)
// Type labels
function getCalEvents(){ return JSON.parse(localStorage.getItem('ab-cal-events')||'[]'); }
function saveCalEvents(evts){ localStorage.setItem('ab-cal-events', JSON.stringify(evts)); }
function getDeletedFixed(){ return JSON.parse(localStorage.getItem('ab-cal-deleted')||'[]'); }
function saveDeletedFixed(d){ localStorage.setItem('ab-cal-deleted', JSON.stringify(d)); }

function filterCal(type, btn){
  currentCalFilter = type;
  document.querySelectorAll('#calFilterBtns .filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderCal();
}

function renderCal(){
  const deleted = getDeletedFixed();
  const memberEvents = getCalEvents();
  const today = new Date(); today.setHours(0,0,0,0);

  let allEvents = [
    ...calFixed.filter(e => !deleted.includes(e.id)),
    ...memberEvents
  ];
  if(currentCalFilter !== 'all'){
    allEvents = allEvents.filter(e => e.type === currentCalFilter);
  }
  allEvents.sort((a,b) => new Date(a.date) - new Date(b.date));

  if(allEvents.length === 0){
    document.getElementById('calContent').innerHTML = `
      <div style="text-align:center;padding:3rem;color:var(--muted);font-family:'Syne',sans-serif;font-size:.85rem">
        Aucune sortie pour ce filtre.
      </div>`;
    return;
  }

  const byMonth = {};
  allEvents.forEach(e => {
    const d = new Date(e.date + 'T12:00:00');
    const key = d.toLocaleDateString('fr-FR',{month:'long',year:'numeric'});
    if(!byMonth[key]) byMonth[key]=[];
    byMonth[key].push(e);
  });

  const isFixed = e => !!calFixed.find(f=>f.id===e.id);

  document.getElementById('calContent').innerHTML = Object.entries(byMonth).map(([mois, evts]) => `
    <div class="cal-month">
      <div class="cal-month-title">${mois.charAt(0).toUpperCase()+mois.slice(1)}</div>
      <div class="cal-events">
        ${evts.map(e => {
          const d = new Date(e.date+'T12:00:00');
          const isPast = d < today;
          const member = !isFixed(e);
          return `<div class="cal-event" style="${isPast?'opacity:.5':''}">
            <div style="text-align:center;min-width:48px">
              <div class="cal-event-date">${d.getDate()}</div>
              <div class="cal-event-month">${d.toLocaleDateString('fr-FR',{month:'short'}).replace('.','')}</div>
            </div>
            <div class="cal-event-info">
              <div class="cal-event-titre">${e.titre}${member&&e.auteur?`<span style="font-family:'Syne',sans-serif;font-size:.58rem;color:var(--ab-light);margin-left:.4rem">par ${e.auteur}</span>`:''}
              </div>
              <div class="cal-event-desc">${e.desc}</div>
            </div>
            <span class="cal-event-type ${typeCls[e.type]||'type-social'}">${typeLabel[e.type]||e.type}</span>
            <button class="cal-del-btn" onclick="deleteCalEvent('${e.id}',${member})" title="Supprimer">✕</button>
          </div>`;
        }).join('')}
      </div>
    </div>
  `).join('');
}
renderCal();
renderAccueilInit();

function deleteCalEvent(id, isMember){
  if(!confirm('Supprimer cette sortie du calendrier ?')) return;
  if(isMember){
    const evts = getCalEvents().filter(e=>e.id!==id);
    saveCalEvents(evts);
  } else {
    const del = getDeletedFixed();
    del.push(id);
    saveDeletedFixed(del);
  }
  renderCal();
}

function openSuggest(){
  showPage('suggestions', document.querySelector('nav button:nth-child(5)'));
}

// ══════════════════════════════════════════════
// SUGGESTIONS
// ══════════════════════════════════════════════

// Données de démo avec vraies dates ISO (YYYY-MM-DD) pour le tri chronologique
const suggestionsDefaut = [
  {pseudo:'Anne',       cat:'event',        date:'2025-12-20', text:'Un repas de Noël de la section avec un thème basque — txistorra, piperade, ossau-iraty. Un beau moment de cohésion en dehors du sport.', votes:11, id:'s4'},
  {pseudo:'Julien',     cat:'sortie-trail',  date:'2026-01-17', text:'Sortie nocturne à Biarritz — départ au coucher du soleil depuis la plage de la Côte des Basques, montée des escaliers avec frontales, puis fartlek sur le front de mer illuminé.', votes:7, id:'s5'},
  {pseudo:'Marc',       cat:'sport',         date:'2026-03-14', text:'Organiser une course d\'orientation dans Bayonne intra-muros — en équipes mixtes, ouvert aux familles aussi. On a le terrain idéal avec les remparts !', votes:8, id:'s1'},
  {pseudo:'Sophie',     cat:'rando',         date:'2026-07-04', text:'Un weekend bivouac de 2 nuits en Haute Soule. Pas trop technique, mais avec de beaux panoramas. On pourrait faire une nuit en cabane et une en tente.', votes:6, id:'s2'},
  {pseudo:'Txomin',     cat:'montagne',      date:'2026-09-12', text:'Sortie sur le Pic du Midi d\'Ossau (2884m) pour les confirmés. Nécessite une bonne condition physique et du matériel adapté. Qui est partant ?', votes:5, id:'s3'},
];

function getSuggestions(){
  const stored = localStorage.getItem('ab-rm-suggestions');
  return stored ? JSON.parse(stored) : suggestionsDefaut;
}
function saveSuggestions(sugs){ localStorage.setItem('ab-rm-suggestions', JSON.stringify(sugs)); }
function getVoted(){ return JSON.parse(localStorage.getItem('ab-rm-voted') || '[]'); }
function addVoted(id){ const v=getVoted(); v.push(id); localStorage.setItem('ab-rm-voted', JSON.stringify(v)); }

const catLabels = {
  'sortie-trail':'🌿 Sortie trail', 'sortie-route':'🏃 Route / course',
  'rando':'🥾 Rando / trek', 'montagne':'🏔 Montagne',
  'event':'🎉 Événement', 'organisation':'⚙️ Organisation',
  'sport':'⚡ Activité alternative'
};
const catCls = {
  'sortie-trail':'tag-green', 'sortie-route':'tag-blue', 'rando':'tag-ocre',
  'montagne':'tag-rouge', 'event':'tag-white', 'organisation':'tag-white', 'sport':'tag-sky'
};

// Formate une date ISO en "Sam. 14 mars 2026"
function formatDate(iso){
  if(!iso) return '';
  const d = new Date(iso + 'T12:00:00');
  if(isNaN(d)) return iso;
  return d.toLocaleDateString('fr-FR', {weekday:'short', day:'numeric', month:'long', year:'numeric'});
}

// Indique si une date ISO est dans le passé (jour entier passé)
function isPast(iso){
  if(!iso) return false;
  const today = new Date(); today.setHours(0,0,0,0);
  const d = new Date(iso + 'T12:00:00');
  return d < today;
}

// Anime le toggle switch CSS custom
function updateToggleStyle(){
  const cb = document.getElementById('hidePastToggle');
  if(!cb) return;
  const track = document.getElementById('toggleTrack');
  const thumb = document.getElementById('toggleThumb');
  if(cb.checked){
    track.style.background = 'var(--ab-blue)';
    thumb.style.transform = 'translateX(16px)';
  } else {
    track.style.background = 'var(--border-strong)';
    thumb.style.transform = 'translateX(0)';
  }
}

function renderSuggestions(){
  updateToggleStyle();
  const hidePast = document.getElementById('hidePastToggle')?.checked || false;
  const today = new Date(); today.setHours(0,0,0,0);

  let sugs = getSuggestions();

  // Filtrer les passées si toggle actif
  if(hidePast) sugs = sugs.filter(s => !isPast(s.date));

  // Tri chronologique
  sugs.sort((a, b) => {
    const da = a.date ? new Date(a.date + 'T12:00:00') : new Date('9999-12-31');
    const db = b.date ? new Date(b.date + 'T12:00:00') : new Date('9999-12-31');
    return da - db;
  });

  const voted = getVoted();
  const allSugs = getSuggestions();
  const totalPast = allSugs.filter(s => isPast(s.date)).length;

  if(sugs.length === 0){
    document.getElementById('suggestionsContainer').innerHTML = `
      <div style="text-align:center;padding:2.5rem;color:var(--muted);font-family:'Syne',sans-serif;font-size:.82rem">
        Aucune proposition à venir — soyez le premier à en ajouter une !
      </div>`;
    return;
  }

  // Regrouper par statut : à venir / passées
  const aVenir = sugs.filter(s => !isPast(s.date));
  const passees = hidePast ? [] : sugs.filter(s => isPast(s.date));

  let html = '';

  if(aVenir.length){
    html += aVenir.map(s => renderSugCard(s, voted)).join('');
  }

  if(passees.length){
    html += `<div style="font-family:'Syne',sans-serif;font-size:.65rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--muted);padding:.6rem 0;margin-top:1rem;border-top:1px solid var(--border)">
      Dates passées (${passees.length})
    </div>`;
    html += passees.map(s => renderSugCard(s, voted, true)).join('');
  }

  document.getElementById('suggestionsContainer').innerHTML = html;

  // Info sur les passées masquées
  if(hidePast && totalPast > 0){
    document.getElementById('suggestionsContainer').innerHTML +=
      `<div style="font-family:'Syne',sans-serif;font-size:.72rem;color:var(--muted);margin-top:.8rem;text-align:center">
        ${totalPast} proposition${totalPast>1?'s':''} passée${totalPast>1?'s':''} masquée${totalPast>1?'s':''}
      </div>`;
  }
}

function renderSugCard(s, voted, past=false){
  const dateStr = s.date ? formatDate(s.date) : '';
  const sortieCats = ['sortie-trail','sortie-route','rando','montagne','event'];
  const goesToCal = sortieCats.includes(s.cat);
  const titreDisplay = s.titre && s.titre !== s.text ? s.titre : '';
  return `
    <div class="suggestion-card" style="${past?'opacity:.55;':''}">
      <div class="sug-header">
        <span class="sug-cat tag ${catCls[s.cat]||'tag-white'}">${catLabels[s.cat]||s.cat}</span>
        ${dateStr ? `<span class="sug-date" style="${past?'text-decoration:line-through;':''}" title="${s.date}">📅 ${dateStr}</span>` : ''}
        ${goesToCal && !past ? `<span style="font-family:'Syne',sans-serif;font-size:.58rem;font-weight:700;color:var(--mousse);background:rgba(74,138,90,.1);padding:.1rem .4rem;border-radius:3px">📅 Dans Sorties</span>` : ''}
        <span style="margin-left:auto;display:flex;align-items:center;gap:.4rem">
          <button class="vote-btn ${voted.includes(s.id)?'voted':''}" onclick="vote('${s.id}',this)" ${past?'disabled title="Date passée"':''}>
            👍 ${s.votes}
          </button>
        </span>
      </div>
      ${titreDisplay ? `<div style="font-family:'Syne',sans-serif;font-size:.88rem;font-weight:700;color:var(--text);margin-bottom:.3rem">${titreDisplay}</div>` : ''}
      <div class="sug-text">${s.text}</div>
      <div class="sug-author">Proposé par ${s.pseudo}</div>
    </div>`;
}

function vote(id, btn){
  const voted = getVoted();
  if(voted.includes(id)) return;
  const sugs = getSuggestions();
  const s = sugs.find(x => x.id === id);
  if(s){ s.votes++; saveSuggestions(sugs); }
  addVoted(id);
  btn.classList.add('voted');
  btn.textContent = `👍 ${s.votes}`;
}

// Show/hide cal badge when category changes
document.addEventListener('DOMContentLoaded', () => {
  const catEl = document.getElementById('sug-cat');
  if(catEl) catEl.addEventListener('change', updateCalBadge);
});
function updateCalBadge(){
  const cat = document.getElementById('sug-cat')?.value || '';
  const badge = document.getElementById('sug-cal-badge');
  if(!badge) return;
  const sortieCats = ['sortie-trail','sortie-route','rando','montagne'];
  badge.style.display = sortieCats.includes(cat) ? 'block' : 'none';
}

function submitSuggestion(){
  const pseudo   = document.getElementById('sug-pseudo').value.trim() || 'Anonyme';
  const text     = document.getElementById('sug-text').value.trim();
  const titre    = document.getElementById('sug-titre')?.value.trim() || '';
  const cat      = document.getElementById('sug-cat').value;
  const dateVal  = document.getElementById('sug-date-souhait').value;
  const errEl    = document.getElementById('sug-date-error');

  if(!dateVal){
    errEl.textContent = '⚠️ La date est obligatoire.';
    document.getElementById('sug-date-souhait').focus();
    return;
  }
  errEl.textContent = '';

  const today = new Date(); today.setHours(0,0,0,0);
  const picked = new Date(dateVal + 'T12:00:00');
  if(picked < today){
    errEl.textContent = '⚠️ La date doit être dans le futur.';
    document.getElementById('sug-date-souhait').focus();
    return;
  }
  if(!text && !titre){
    document.getElementById('sug-text').focus();
    return;
  }

  const id = 's' + Date.now();

  // Add to suggestions
  const sugs = getSuggestions();
  const titreAuto = titre || text.split(/[.\n]/)[0].trim().substring(0, 80);
  sugs.push({ pseudo, cat, date: dateVal, titre: titreAuto, text, votes: 0, id });
  saveSuggestions(sugs);

  // Si c'est une sortie → alimenter aussi le calendrier
  const sortieCats = ['sortie-trail','sortie-route','rando','montagne','event'];
  if(sortieCats.includes(cat)){
    const calTypeMap = {
      'sortie-trail':'trail', 'sortie-route':'route',
      'rando':'rando', 'montagne':'montagne', 'event':'social'
    };
    const calEvts = getCalEvents();
    calEvts.push({
      id, date: dateVal,
      type: calTypeMap[cat] || 'social',
      titre: titreAuto,
      desc: text || titreAuto,
      auteur: pseudo
    });
    saveCalEvents(calEvts);
  }

  // Reset form
  document.getElementById('sug-text').value = '';
  document.getElementById('sug-pseudo').value = '';
  document.getElementById('sug-date-souhait').value = '';
  if(document.getElementById('sug-titre')) document.getElementById('sug-titre').value = '';
  errEl.textContent = '';
  updateCalBadge();

  renderSuggestions();

  // Feedback visuel
  const btn = document.querySelector('.btn-submit');
  const orig = btn.textContent;
  const sortieCatsForMsg = ['sortie-trail','sortie-route','rando','montagne'];
  const msg = sortieCatsForMsg.includes(cat)
    ? '✓ Envoyé — visible dans Sorties !'
    : '✓ Proposition envoyée !';
  btn.textContent = msg;
  btn.style.background = 'var(--mousse)';
  setTimeout(()=>{ btn.textContent = orig; btn.style.background = ''; }, 3000);
}

document.getElementById('hidePastToggle').addEventListener('change', updateToggleStyle);
renderSuggestions();

// ══ MUSCU & RÉVEIL ══
let currentEquip = 'corpo';
let currentPhaseMuscu = 'fondamental';
let currentExoFilter = 'all';

// ── EXERCICE DATABASE ──
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

// ── CIRCUITS PAR PHASE & ÉQUIPEMENT ──
const phaseMusculaireDesc = {
  fondamental: {
    titre:'Phase fondamentale — Sept à Nov',
    desc:'Objectif : apprendre les mouvements, construire une base solide, activer les muscles stabilisateurs. Priorité à la technique irréprochable sur chaque exercice plutôt qu\'aux charges. 2 séances par semaine.',
    duree:'45 min',
    freq:'2×/sem'
  },
  force: {
    titre:'Phase force — Déc à Fév',
    desc:'Objectif : développer la force maximale des membres inférieurs pour la puissance en montée et la résistance en descente. Les charges augmentent, les répétitions diminuent. Contractions excentriques lentes (4s).',
    duree:'55–60 min',
    freq:'2×/sem'
  },
  specifique: {
    titre:'Phase spécifique — Mars à Mai',
    desc:'Objectif : transférer la force en puissance trail. Introduction de la pliométrie. Exercices qui simulent les efforts des courses (Senpereko, Euskal Raid). Travail unilatéral dominant.',
    duree:'50 min',
    freq:'1–2×/sem'
  },
  competition: {
    titre:'Phase compétition — Juin à Août',
    desc:'Objectif : entretien des acquis sans créer de fatigue. Volumes réduits, focus sur la proprioception et la prévention. Ne pas compromettre les séances de course. Écouter son corps.',
    duree:'30–40 min',
    freq:'1×/sem'
  }
};

// ── MUSCU UI FUNCTIONS ──
function setEquip(e, btn) {
  currentEquip = e;
  document.querySelectorAll('.eq-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderMuscu();
}

function setPhaseMuscu(p, btn) {
  currentPhaseMuscu = p;
  document.querySelectorAll('.phase-eq-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderMuscu();
}

function renderMuscu() {
  const pd = phaseMusculaireDesc[currentPhaseMuscu];
  document.getElementById('phaseMusculaire').innerHTML = `
    <strong style="color:var(--text);font-family:'Syne',sans-serif">${pd.titre}</strong>
    <span style="display:inline-block;margin-left:1rem;font-family:'Syne',sans-serif;font-size:.72rem;color:var(--ab-blue)">⏱ ${pd.duree}</span>
    <span style="display:inline-block;margin-left:.7rem;font-family:'Syne',sans-serif;font-size:.72rem;color:var(--mousse)">📅 ${pd.freq}</span>
    <br><span style="font-size:.85rem">${pd.desc}</span>
  `;

  const circuit = circuits[currentPhaseMuscu][currentEquip];
  const container = document.getElementById('circuitDisplay');
  container.innerHTML = circuit.map(bloc => `
    <div class="circuit-block">
      <div class="circuit-block-head">
        <h3>${bloc.bloc}</h3>
        <span class="meta">${bloc.exos.length} exercices</span>
      </div>
      ${bloc.exos.map(e => {
        const ex = exos[e.id];
        if (!ex) return '';
        const equipMin = ex.equips[0];
        const equipLabels = {'corpo':'🏠 Corps','elastiques':'🔴 Élastiques / poids','salle':'🏋️ Salle'};
        return `<div class="exo-card" onclick="openExoModal('${e.id}')">
          <div class="exo-card-left">
            <div class="exo-card-name">${ex.emoji} ${ex.nom}</div>
            <div class="exo-card-sub">${ex.muscles}</div>
          </div>
          <div class="exo-card-right">
            <div class="exo-card-dose">${e.dose}</div>
            <span class="exo-card-equip eq-${equipMin}">${equipLabels[equipMin]}</span>
          </div>
        </div>`;
      }).join('')}
    </div>
  `).join('');
}

function filterExos(cat, btn) {
  currentExoFilter = cat;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderLibrary();
}

function renderLibrary() {
  const grid = document.getElementById('exoGrid');
  const catColors = {
    jambes:'rgba(27,58,107,.12)', fessiers:'rgba(196,90,74,.12)',
    gainage:'rgba(74,138,90,.12)', mollets:'rgba(74,122,204,.12)',
    pliometrie:'rgba(122,106,154,.12)', etirements:'rgba(74,138,90,.1)'
  };
  const catTextColors = {
    jambes:' color:var(--ab-light)', fessiers:' color:#E08070',
    gainage:' color:var(--mousse)', mollets:' color:var(--ab-sky)',
    pliometrie:' color:#B8A8D4', etirements:' color:var(--mousse)'
  };
  const catLabels = {
    jambes:'🦵 Jambes', fessiers:'🍑 Fessiers / Hanches',
    gainage:'🧱 Gainage', mollets:'👟 Mollets / Chevilles',
    pliometrie:'⚡ Pliométrie', etirements:'🌿 Étirements'
  };
  const equipIcons = {'corpo':'🏠','elastiques':'🔴','salle':'🏋️'};

  const filtered = Object.entries(exos).filter(([id,ex]) =>
    currentExoFilter === 'all' || ex.cat === currentExoFilter
  );

  grid.innerHTML = filtered.map(([id,ex]) => `
    <div class="lib-card" onclick="openExoModal('${id}')">
      <div class="lib-card-cat" style="background:${catColors[ex.cat]};${catTextColors[ex.cat]}">${catLabels[ex.cat]}</div>
      <div class="lib-card-name">${ex.emoji} ${ex.nom}</div>
      <div class="lib-card-desc">${ex.muscles}</div>
      <div class="lib-card-equips">
        ${ex.equips.map(e=>`<span class="exo-card-equip eq-${e}">${equipIcons[e]} ${e==='corpo'?'Corps':e==='elastiques'?'Élastiques':e==='salle'?'Salle':e}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

function openExoModal(id) {
  const ex = exos[id];
  if (!ex) return;
  const equipFull = {'corpo':'🏠 Poids du corps uniquement','elastiques':'🔴 Élastiques, poids chevilles, kettlebell','salle':'🏋️ Salle avec barres et poids'};
  document.getElementById('mTitle').innerHTML = `${ex.emoji} ${ex.nom}`;
  document.getElementById('mBody').innerHTML = `
    <h4>Muscles ciblés</h4>
    <p>${ex.muscles}</p>
    <h4>Équipement minimum</h4>
    <p>${ex.equips.map(e=>equipFull[e]).join('<br>')}</p>
    <h4>Description technique</h4>
    <p>${ex.description}</p>
    <h4>Erreurs classiques à éviter</h4>
    <p style="color:var(--rouge)">${ex.erreurs}</p>
    <h4>Progression (du plus facile au plus exigeant)</h4>
    <ul>${ex.progressions.map(p=>`<li>${p}</li>`).join('')}</ul>
  `;
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

// Init muscu on page load
renderMuscu();
renderLibrary();

// ══════════════════════════════════════════════
// ROUTINES RÉVEIL
// ══════════════════════════════════════════════
let currentReveilEquip = 'corpo';

const joursReveil = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
const joursEmoji  = ['🌅','⚡','🌿','🔥','💧','🏔','☀️'];
const joursFocus  = [
  'Mobilité hanche & colonne',
  'Activation & vivacité',
  'Récupération active',
  'Force & stabilité',
  'Cheville & pied',
  'Full body trail',
  'Douceur & étirements',
];

// Chaque routine : tableau d'exercices { nom, durée/reps, desc, equip:'corpo'|'elastiques' }
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

const joursTheme = [
  { color:'var(--ciel)', bg:'rgba(74,122,204,.08)', border:'rgba(74,122,204,.2)' },
  { color:'var(--ab-light)', bg:'rgba(27,58,107,.08)', border:'rgba(27,58,107,.2)' },
  { color:'var(--mousse)', bg:'rgba(74,138,90,.08)', border:'rgba(74,138,90,.2)' },
  { color:'var(--ab-blue)', bg:'rgba(27,58,107,.1)', border:'rgba(27,58,107,.25)' },
  { color:'var(--ciel)', bg:'rgba(74,122,204,.08)', border:'rgba(74,122,204,.2)' },
  { color:'#b03030', bg:'rgba(192,64,64,.06)', border:'rgba(192,64,64,.18)' },
  { color:'var(--mousse)', bg:'rgba(74,138,90,.08)', border:'rgba(74,138,90,.15)' },
];

function setReveilEquip(e, btn) {
  currentReveilEquip = e;
  document.querySelectorAll('#rev-eq-corpo,#rev-eq-elast').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderReveil();
}

function renderReveil() {
  const routines = routinesReveil[currentReveilEquip];
  const grid = document.getElementById('reveilGrid');
  grid.innerHTML = joursReveil.map((jour, i) => {
    const th = joursTheme[i];
    const exoList = routines[i].map((ex, j) => `
      <div class="rev-exo" onclick="openReveilModal(${i},${j})" style="display:flex;align-items:flex-start;justify-content:space-between;padding:.7rem 1.2rem;border-bottom:1px solid rgba(27,58,107,.04);cursor:pointer;transition:background .15s;gap:.8rem" onmouseover="this.style.background='rgba(27,58,107,.03)'" onmouseout="this.style.background=''">
        <div style="flex:1">
          <div style="font-size:.84rem;color:var(--text);font-weight:500">${ex.nom}</div>
          <div style="font-size:.72rem;color:var(--muted);margin-top:.1rem;line-height:1.4">${ex.desc.substring(0,60)}…</div>
        </div>
        <div style="font-family:'Syne',sans-serif;font-size:.74rem;font-weight:700;color:${th.color};white-space:nowrap;flex-shrink:0">${ex.dose}</div>
      </div>
    `).join('');

    return `
      <div style="background:var(--surface);border:1px solid ${th.border};border-radius:12px;overflow:hidden">
        <div style="padding:1rem 1.2rem;background:${th.bg};border-bottom:1px solid ${th.border};display:flex;align-items:center;gap:.8rem">
          <span style="font-size:1.6rem">${joursEmoji[i]}</span>
          <div>
            <div style="font-family:'Syne',sans-serif;font-size:1rem;font-weight:800;color:${th.color}">${jour}</div>
            <div style="font-size:.72rem;color:var(--muted);margin-top:.1rem">${joursFocus[i]}</div>
          </div>
          <div style="margin-left:auto;font-family:'Syne',sans-serif;font-size:.68rem;font-weight:700;color:${th.color};background:${th.bg};border:1px solid ${th.border};padding:.2rem .6rem;border-radius:3px">15 min</div>
        </div>
        ${exoList}
      </div>
    `;
  }).join('');
}

function openReveilModal(jourIdx, exoIdx) {
  const ex = routinesReveil[currentReveilEquip][jourIdx][exoIdx];
  const th = joursTheme[jourIdx];
  document.getElementById('mTitle').innerHTML = `${joursEmoji[jourIdx]} ${ex.nom}`;
  document.getElementById('mBody').innerHTML = `
    <div style="display:inline-block;background:rgba(27,58,107,.1);border:1px solid rgba(27,58,107,.25);border-radius:4px;padding:.2rem .7rem;font-family:'Syne',sans-serif;font-size:.72rem;font-weight:700;color:var(--ab-light);margin-bottom:1.2rem">${joursReveil[jourIdx]} · ${joursFocus[jourIdx]}</div>
    <h4>Prescription</h4>
    <p style="font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;color:${th.color}">${ex.dose}</p>
    <h4>Description complète</h4>
    <p>${ex.desc}</p>
    <h4>Dans la routine du matin</h4>
    <p>Cet exercice est le ${exoIdx+1}e sur ${routinesReveil[currentReveilEquip][jourIdx].length} de votre séance du ${joursReveil[jourIdx]}. 
    ${exoIdx === 0 ? 'C\'est l\'exercice d\'ouverture — prenez le temps de bien vous y installer.' :
      exoIdx === routinesReveil[currentReveilEquip][jourIdx].length-1 ? 'C\'est le dernier exercice de la séance — finissez bien.' :
      'Enchaînez avec le suivant après 15-20 secondes de transition.'}
    </p>
    <h4>Conseil de progression</h4>
    <p>${ex.desc.includes('élastique') || ex.desc.includes('poids') ?
      'Commencez avec l\'équipement le plus léger disponible. Augmentez la résistance uniquement quand la technique est parfaite.' :
      'Commencez par maîtriser le mouvement lentement. Une fois fluide, travaillez l\'amplitude puis l\'intensité. Jamais l\'inverse.'
    }</p>
  `;
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

renderReveil();

// ══════════════════════════════════════════════════════════════
// CALCULATEUR — explications + 4 semaines + synthèse bloc
// ══════════════════════════════════════════════════════════════
let calcDataInitialized = false;

function renderCalculateur(){
  // Textes explicatifs (depuis data.js, variable calculateurTextes)
  const txt = (typeof calculateurTextes !== 'undefined') ? calculateurTextes : {
    intro:'', rpe_titre:'RPE', rpe_texte:'', ua_titre:'UA', ua_texte:'',
    bloc_titre:'Bloc 4 semaines', bloc_texte:''
  };

  // Intro
  const introEl = document.getElementById('calc-intro-zone');
  if(introEl){
    introEl.innerHTML = `
      <div class="calc-explainer calc-intro" style="margin-bottom:1.5rem">
        <p style="font-size:.92rem;color:var(--text);line-height:1.75;white-space:pre-line">${txt.intro}</p>
      </div>`;
  }

  // Explainers
  const explEl = document.getElementById('calc-explainers');
  if(explEl){
    explEl.innerHTML = `
      <div class="calc-explainer">
        <h3>💪 ${txt.rpe_titre}</h3>
        <p>${txt.rpe_texte}</p>
      </div>
      <div class="calc-explainer">
        <h3>📊 ${txt.ua_titre}</h3>
        <p>${txt.ua_texte}</p>
      </div>
      <div class="calc-explainer">
        <h3>🧱 ${txt.bloc_titre}</h3>
        <p>${txt.bloc_texte}</p>
      </div>`;
  }

  // Seuils charge hebdo
  const seuilsEl = document.getElementById('calc-seuils');
  if(seuilsEl){
    const seuils = (typeof chargeHebdoSeuils !== 'undefined' && chargeHebdoSeuils.length)
      ? chargeHebdoSeuils
      : [
          { max:400, label:'Très légère', couleur:'#2E8B3E', description:'Repos actif' },
          { max:600, label:'Débutant',    couleur:'#5FAD4E', description:'Semaine normale débutant' },
          { max:800, label:'Intermédiaire',couleur:'#3A7BBF', description:'Semaine standard' },
          { max:1050,label:'Chargée',     couleur:'#E67E22', description:'Semaine intense' },
          { max:9999,label:'Surcharge',   couleur:'#C0392B', description:'À surveiller' }
        ];
    seuilsEl.innerHTML = seuils.map((s, i) => {
      const prev = i > 0 ? seuils[i-1].max : 0;
      const range = s.max >= 9999 ? `> ${prev} UA` : `${prev} – ${s.max} UA`;
      return `<div class="calc-seuil-row">
        <div class="calc-seuil-dot" style="background:${s.couleur}"></div>
        <div class="calc-seuil-range">${range}</div>
        <div class="calc-seuil-label">${s.label}</div>
        <div class="calc-seuil-desc">${s.description}</div>
      </div>`;
    }).join('');
  }

  // Les 4 semaines (si pas déjà générées)
  const semEl = document.getElementById('calc-semaines');
  if(semEl && !calcDataInitialized){
    const jours = ['Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi','Dimanche'];
    const semTitres = ['S1 — Base','S2 — Montée','S3 — Pic','S4 — Récupération'];
    const semSubs   = ['charge modérée, poser les fondations','+10 à 15% d\'UA par rapport à S1','+20 à 25% — semaine la plus dure','-40% — assimilation, récupération'];

    semEl.innerHTML = [0,1,2,3].map(w => `
      <div class="calc-semaine" data-week="${w}">
        <div class="calc-sem-header">
          <div>
            <div class="calc-sem-title">${semTitres[w]}
              <small>${semSubs[w]}</small>
            </div>
          </div>
          <div class="calc-sem-total">
            <span class="calc-sem-total-label">Total</span>
            <span class="calc-sem-total-value" id="total-w${w}">0 UA</span>
            <span class="calc-sem-badge" id="badge-w${w}" style="background:rgba(255,255,255,.2)">—</span>
          </div>
        </div>
        <table class="calc-table">
          <thead>
            <tr>
              <th style="min-width:100px">Jour</th>
              <th style="width:110px">Durée (min)</th>
              <th style="width:110px">RPE (1-10)</th>
              <th style="width:90px;text-align:right">UA</th>
            </tr>
          </thead>
          <tbody>
            ${jours.map((j, i) => `
              <tr>
                <td class="calc-jour-label">${j}</td>
                <td>
                  <input type="number" min="0" max="300" step="5" class="calc-input"
                    data-week="${w}" data-day="${i}" data-field="duree"
                    oninput="calcUpdate(${w})" placeholder="0">
                </td>
                <td>
                  <input type="number" min="0" max="10" step="1" class="calc-input"
                    data-week="${w}" data-day="${i}" data-field="rpe"
                    oninput="calcUpdate(${w})" placeholder="0">
                </td>
                <td style="text-align:right">
                  <span class="calc-ua" id="ua-${w}-${i}">0</span>
                </td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `).join('');

    calcDataInitialized = true;
  }

  // Mettre à jour les totaux / synthèse
  for(let w = 0; w < 4; w++) calcUpdate(w);
}

function calcUpdate(week){
  let totalSem = 0;
  for(let d = 0; d < 7; d++){
    const dureeEl = document.querySelector(`.calc-input[data-week="${week}"][data-day="${d}"][data-field="duree"]`);
    const rpeEl   = document.querySelector(`.calc-input[data-week="${week}"][data-day="${d}"][data-field="rpe"]`);
    const uaEl    = document.getElementById(`ua-${week}-${d}`);
    if(!dureeEl || !rpeEl || !uaEl) continue;
    const duree = parseFloat(dureeEl.value) || 0;
    const rpe   = parseFloat(rpeEl.value) || 0;
    const ua = Math.round(duree * rpe);
    uaEl.textContent = ua || 0;
    uaEl.style.color = ua > 0 ? 'var(--ab-navy)' : 'var(--muted)';
    totalSem += ua;
  }
  const totalEl = document.getElementById(`total-w${week}`);
  const badgeEl = document.getElementById(`badge-w${week}`);
  if(totalEl){
    totalEl.textContent = totalSem + ' UA';
  }
  if(badgeEl){
    const seuils = (typeof chargeHebdoSeuils !== 'undefined' && chargeHebdoSeuils.length)
      ? chargeHebdoSeuils
      : [
          { max:400, label:'Très légère', couleur:'#2E8B3E' },
          { max:600, label:'Débutant',    couleur:'#5FAD4E' },
          { max:800, label:'Intermédiaire',couleur:'#3A7BBF' },
          { max:1050,label:'Chargée',     couleur:'#E67E22' },
          { max:9999,label:'Surcharge',   couleur:'#C0392B' }
        ];
    if(totalSem === 0){
      badgeEl.textContent = '—';
      badgeEl.style.background = 'rgba(255,255,255,.2)';
    } else {
      const niv = seuils.find(s => totalSem <= s.max) || seuils[seuils.length-1];
      badgeEl.textContent = niv.label;
      badgeEl.style.background = niv.couleur;
    }
  }
  renderBlocSummary();
}

function renderBlocSummary(){
  const el = document.getElementById('calc-bloc-summary');
  if(!el) return;

  const totals = [0,1,2,3].map(w => {
    const t = document.getElementById(`total-w${w}`);
    if(!t) return 0;
    return parseInt(t.textContent) || 0;
  });
  const [s1, s2, s3, s4] = totals;

  const progS1S3 = s1 > 0 ? Math.round((s3 - s1) / s1 * 100) : null;
  const ratioS4  = s3 > 0 ? Math.round(s4 / s3 * 100) : null;

  // Analyse progression
  let progAnalyse = 'En attente';
  let progColor = 'rgba(255,255,255,.7)';
  if(progS1S3 !== null){
    if(progS1S3 < 10)       { progAnalyse = 'Trop faible — manque de stimulus'; progColor = '#FFD580'; }
    else if(progS1S3 <= 25) { progAnalyse = '✓ Progression idéale'; progColor = '#9DE0AD'; }
    else                    { progAnalyse = 'Trop forte — risque de surcharge'; progColor = '#FFB1A8'; }
  }

  let ratioAnalyse = 'En attente';
  let ratioColor = 'rgba(255,255,255,.7)';
  if(ratioS4 !== null){
    if(ratioS4 < 50)        { ratioAnalyse = 'Décharge un peu forte'; ratioColor = '#9DE0AD'; }
    else if(ratioS4 <= 70)  { ratioAnalyse = '✓ Décharge idéale (55-65%)'; ratioColor = '#9DE0AD'; }
    else                    { ratioAnalyse = 'Récupération insuffisante'; ratioColor = '#FFB1A8'; }
  }

  const totalBloc = s1 + s2 + s3 + s4;

  el.innerHTML = `
    <h3>📈 Synthèse de ton bloc</h3>
    <p style="color:rgba(255,255,255,.85);font-size:.88rem;line-height:1.7;margin-bottom:.8rem">
      Voilà l'analyse de ton bloc de 4 semaines. Les cibles idéales : progression S1→S3 entre <strong>+20 et +25%</strong>, et ratio S4/S3 entre <strong>55 et 65%</strong> pour une bonne récupération.
    </p>
    <div class="calc-bloc-stats">
      <div class="calc-bloc-stat">
        <div class="calc-bloc-stat-label">Total Bloc</div>
        <div class="calc-bloc-stat-value">${totalBloc}</div>
        <div class="calc-bloc-stat-desc">UA cumulées sur 4 semaines</div>
      </div>
      <div class="calc-bloc-stat">
        <div class="calc-bloc-stat-label">Progression S1→S3</div>
        <div class="calc-bloc-stat-value">${progS1S3 !== null ? (progS1S3 >= 0 ? '+' : '') + progS1S3 + '%' : '—'}</div>
        <div class="calc-bloc-stat-desc" style="color:${progColor}">${progAnalyse}</div>
      </div>
      <div class="calc-bloc-stat">
        <div class="calc-bloc-stat-label">Ratio récup S4/S3</div>
        <div class="calc-bloc-stat-value">${ratioS4 !== null ? ratioS4 + '%' : '—'}</div>
        <div class="calc-bloc-stat-desc" style="color:${ratioColor}">${ratioAnalyse}</div>
      </div>
    </div>
  `;
}

// ══════════════════════════════════════════════════════════════
// TERRAINS — page avec cartes
// ══════════════════════════════════════════════════════════════
function renderTerrains(){
  const el = document.getElementById('terrainsGrid');
  if(!el || typeof terrainLabel === 'undefined') return;
  const descs = {
    halage:     "Chemin de halage le long de la Nive — plat, 8km jusqu'à l'étanche. Idéal pour séances d'allure régulière, fractionné tempo, longues sorties.",
    floride:    "Côte La Floride — montée régulière ~400m. Parfaite pour les efforts courts 30s à 1min. Début de saison et entretien.",
    voulgre:    "Côte Voulgre — montée exigeante ~600m. Idéale pour les efforts 1min30 à 2min en force. Accessible depuis centre.",
    vw:         "Côte VW — référence pour le fractionné long en côte. Longueur et pente idéales pour les efforts de 1 à 1min30.",
    douves:     "Les Douves / remparts de Bayonne — terrain varié, circuit urbain. Fartlek naturel, déplacements techniques.",
    intramuros: "Bayonne intra-muros — rues pavées, petites montées, ambiance. Footings souples, retours calme, social runs.",
    stades:     "Tour des stades de rugby — parcours urbain plat et sécurisé. Idéal pour footings simples et découverte.",
    coteanglet: "Côte d'Anglet — front de mer, chemin côtier. Variété de terrains, vues imprenables.",
    girouettes: "Parc Les Girouettes à Anglet — circuit nature avec montées. Séances côtes courtes récurrentes.",
    chiberta:   "Forêt de Chiberta — sentiers ombragés, terrain souple. Parfait pour sorties longues et récupération.",
    plage:      "Plage + forêt de Chiberta — combiné sable / sentiers. Travail spécifique résistance + technique.",
    escaliers:  "Escaliers de Biarritz — travail excentrique pour les descentes, renforcement quadriceps. Côte des Basques, Grande Plage.",
    montagne:   "Ursuya / Mondarrain — massifs basques. Sorties longues trail, D+ important, préparation montagne.",
    vvf:        "Côte du VVF à Anglet — côte longue pour pyramides (20s à 1min). Terrain spécifique côtes multi-durées."
  };
  const zones = {
    halage:'Bayonne', floride:'Bayonne', voulgre:'Bayonne', vw:'Bayonne',
    douves:'Bayonne', intramuros:'Bayonne', stades:'Bayonne',
    coteanglet:'Anglet', girouettes:'Anglet', chiberta:'Anglet',
    plage:'Anglet', vvf:'Anglet',
    escaliers:'Biarritz',
    montagne:'Pays Basque intérieur'
  };
  el.innerHTML = Object.entries(terrainLabel).map(([key, t]) => `
    <div class="terrain-card">
      <div class="terrain-card-icon">${t.icon}</div>
      <div class="terrain-card-name">${t.label}</div>
      <div class="terrain-card-loc">${zones[key] || ''}</div>
      <div class="terrain-card-desc">${descs[key] || ''}</div>
    </div>
  `).join('');
}

// ══════════════════════════════════════════════════════════════
// INIT
// ══════════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  renderInfosClub();
  renderTerrains();
  // renderCalculateur n'est appelé que quand l'utilisateur ouvre la page
});
// Appel direct au cas où DOMContentLoaded déjà passé
if(document.readyState !== 'loading'){
  renderInfosClub();
  renderTerrains();
}
