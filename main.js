// ══════════════════════════════════════════════════
// AB Running — main.js
// All app logic, loaded after data.js
// ══════════════════════════════════════════════════

// ── HELPERS ──
const S1 = new Date(2026,7,31); // lundi 31 août 2026
const MOIS = ['Janv','Févr','Mars','Avr','Mai','Juin','Juil','Août','Sept','Oct','Nov','Déc'];

function semDate(n){ return new Date(+S1 + (n-1)*7*864e5); }
function semMois(n){ return MOIS[semDate(n).getMonth()]; }
function sd(k){ return (k && k!=='—' && seancesData[k]) || null; }
function phCls(p){ const m = phaseMap[p]; return m ? 'ph-'+m.c : 'ph-base'; }
function phLabel(p){ const m = phaseMap[p]; return m ? m.l : p; }
function tTag(lieu){
  const t = terrainLabel[lieu];
  if(!t) return '';
  return `<span class="tag ${t.cls}">${t.icon} ${t.label}</span>`;
}
function objForSem(n){
  const o = objectifs.find(x=>x.s===n);
  return o ? `🏆 ${o.nom}` : '';
}

function getCurrentSem(){
  const today = new Date(); today.setHours(0,0,0,0);
  const yr = today.getFullYear();
  const saisonAnnee = today.getMonth() >= 8 ? yr : yr-1;
  const sep1 = new Date(saisonAnnee,8,1);
  const j = sep1.getDay();
  const lundiS1 = new Date(saisonAnnee,8,1+(j===0?-6:1-j));
  const ja = today.getDay();
  const lundiAuj = new Date(today.getFullYear(),today.getMonth(),today.getDate()+(ja===0?-6:1-ja));
  return { num: Math.floor(Math.round((lundiAuj-lundiS1)/864e5)/7)+1, lundi: lundiAuj };
}

function fmtRange(lundi){
  const dim = new Date(+lundi+6*864e5);
  const o = {day:'numeric',month:'short'};
  return lundi.toLocaleDateString('fr-FR',o)+' – '+dim.toLocaleDateString('fr-FR',o);
}

// ── STATE ──
let curWE = 0;
let curPhase = '';
let curTerrain = 0;

// ── MODAL ──
function closeModal(){ document.getElementById('overlay').classList.remove('open'); document.body.style.overflow=''; }
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

function switchT(t){
  curTerrain = t;
  document.querySelectorAll('.terrain-tab').forEach(b=>b.classList.toggle('active',+b.dataset.t===t));
  document.querySelectorAll('.terrain-content').forEach(b=>{b.classList.toggle('active',+b.dataset.t===t)});
}

// ══════════════════════════════════════════════════
// ACCUEIL
// ══════════════════════════════════════════════════
function renderInfosClub(){
  const el = document.getElementById('infosClubZone');
  if(!el || !infosClub || !infosClub.length) return;
  const today = new Date(); today.setHours(0,0,0,0);
  const actifs = infosClub.filter(m=>{
    if(!m.dateFin) return true;
    return new Date(m.dateFin+'T23:59:59')>=today;
  });
  el.innerHTML = actifs.map(m=>`<div class="infos-club-card type-${m.type||'info'}">
    <div style="display:flex;justify-content:space-between;align-items:center">
      <div class="ic-title">${m.titre||''}</div>
      ${m.dateFin?`<span class="ic-date-tag">Jusqu'au ${new Date(m.dateFin+'T12:00:00').toLocaleDateString('fr-FR',{day:'numeric',month:'short'})}</span>`:''}
    </div>
    <div class="ic-text">${m.texte||''}</div>
  </div>`).join('');
}

function renderAccueil(){
  const {num,lundi} = getCurrentSem();
  const wkLabels = ['Cette semaine','Semaine prochaine','Dans 2 semaines'];
  const grid = document.getElementById('acc-grid');
  if(!grid) return;
  grid.innerHTML = '';

  for(let i=0;i<3;i++){
    const sn = num+i;
    const w = programme.find(x=>x.s===sn);
    const lundiSem = new Date(+lundi+i*7*864e5);
    const isCur = i===0;

    if(!w || sn<1 || sn>52){
      grid.innerHTML += `<div class="acc-card" style="opacity:.4"><div class="acc-hdr"><span>${wkLabels[i]} · S${sn} — Hors saison</span></div></div>`;
      continue;
    }

    const mData = sd(w.m), jData = sd(w.j);
    const mRpe = mData?mData.rpe:'', jRpe = jData?jData.rpe:'';
    const mLieu = mData?mData.lieu:'halage', jLieu = jData?jData.lieu:'halage';
    const weKey = curWE===1?w.wt:w.wr;
    const weData = sd(weKey);
    const weLbl = weData?weData.l:(weKey==='—'?'—':weKey);
    const obj = objForSem(sn);
    const marFmt = new Date(+lundiSem+864e5).toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'long'});
    const jeuFmt = new Date(+lundiSem+3*864e5).toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'long'});

    grid.innerHTML += `
    <div class="acc-card ${isCur?'current':''}">
      <div class="acc-hdr ${isCur?'cur':''}">
        <div style="display:flex;align-items:center">
          <span class="snum" style="color:${isCur?'var(--sky)':'var(--navy)'}">S${sn}</span>
          <div>
            <div style="font-size:.55rem;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:${isCur?'rgba(255,255,255,.5)':'var(--muted)'}">${wkLabels[i]}</div>
            <div style="font-size:.68rem;font-weight:600;color:${isCur?'rgba(255,255,255,.88)':'var(--text)'}">${fmtRange(lundiSem)}</div>
          </div>
        </div>
        <div style="display:flex;gap:.3rem;align-items:center;flex-wrap:wrap">
          <span class="ph ${phCls(w.p)}">${phLabel(w.p)}</span>
          ${w.d?'<span class="dech">🌙 Décharge</span>':''}
          ${obj?`<span style="font-size:.6rem;font-weight:700;color:${isCur?'#FFD700':'var(--gold)'}">${obj}</span>`:''}
        </div>
      </div>
      <div class="acc-body">
        <div class="acc-day">
          <div class="acc-day-label mar">📅 ${marFmt}</div>
          <div class="s-titre">${mData?mData.l:'—'}</div>
          ${tTag(mLieu)} ${mRpe?`<span class="rpe-pill">RPE ${mRpe}</span>`:''}
          ${mData&&mData.n?`<div style="font-size:.68rem;color:var(--muted);font-style:italic;margin-top:.3rem">💡 ${mData.n}</div>`:''}
        </div>
        <div class="acc-day">
          <div class="acc-day-label jeu">📅 ${jeuFmt}</div>
          <div class="s-titre">${jData?jData.l:'—'}</div>
          ${tTag(jLieu)} ${jRpe?`<span class="rpe-pill">RPE ${jRpe}</span>`:''}
          ${jData&&jData.n?`<div style="font-size:.68rem;color:var(--muted);font-style:italic;margin-top:.3rem">💡 ${jData.n}</div>`:''}
        </div>
      </div>
      <div class="acc-foot">
        <span style="font-size:.72rem;color:#6B7A9A">🏃 WE ${['Route','Trail'][curWE]} — ${weLbl} · <span class="ua-badge" style="color:#1A2540;font-weight:700">${w.ua} UA</span></span>
        <button class="detail-btn" onclick="openDetail(${sn})">Détail →</button>
      </div>
    </div>`;
  }
  renderObjectifs();
}

function renderObjectifs(){
  const el = document.getElementById('acc-objectifs');
  if(!el) return;
  const today = new Date(); today.setHours(0,0,0,0);
  el.innerHTML = objectifs.map(o=>{
    const d = new Date(o.date+'T12:00:00');
    const passe = d<today;
    const dLeft = Math.round((d-today)/864e5);
    const dLbl = passe?'Passé':(dLeft===0?"Aujourd'hui":dLeft===1?'Demain':`J-${dLeft}`);
    const tc = {route:'var(--blue)',trail:'var(--mousse)',cross:'var(--rouge)'}[o.type]||'var(--blue)';
    return `<div class="obj-card ${passe?'past':''}">
      <div class="obj-icon">🏆</div>
      <div class="obj-info">
        <div class="obj-nom">S${o.s} — ${o.nom}</div>
        <div class="obj-date">${d.toLocaleDateString('fr-FR',{weekday:'short',day:'numeric',month:'long',year:'numeric'})}</div>
      </div>
      <div class="obj-countdown" style="color:${passe?'var(--muted)':tc}">${dLbl}<div style="font-size:.55rem;color:var(--muted);text-transform:uppercase;letter-spacing:.1em">${o.type}</div></div>
    </div>`;
  }).join('');
}

// ══════════════════════════════════════════════════
// SHARED CONTROLS
// ══════════════════════════════════════════════════
function setWE(v,btn){
  curWE=v;
  document.querySelectorAll('.ctrl-bar .btn').forEach(b=>{
    if(b.parentElement===btn.parentElement) b.classList.toggle('active',b===btn);
  });
  const lbl = document.getElementById('col-we');
  if(lbl) lbl.textContent = ['Weekend · Route','Weekend · Trail'][v];
  if(document.getElementById('progBody')) buildProg();
  if(document.getElementById('acc-grid')) renderAccueil();
}

function setPhase(ph,btn){
  curPhase=ph;
  btn.parentElement.querySelectorAll('.btn').forEach(b=>b.classList.toggle('active',b===btn));
  buildProg();
}

// ══════════════════════════════════════════════════
// PROGRAMME TABLE
// ══════════════════════════════════════════════════
function buildProg(){
  const tbody = document.getElementById('progBody');
  if(!tbody) return;
  const rows = programme.filter(w=>{
    if(!curPhase) return true;
    const m = phaseMap[w.p];
    return m && m.c === curPhase;
  });

  tbody.innerHTML = rows.map((w,i)=>{
    const mData = sd(w.m), jData = sd(w.j);
    const weKey = curWE===1?w.wt:w.wr;
    const weData = sd(weKey);
    const weLbl = weData?weData.l:(weKey==='—'?'—':weKey);
    const obj = objForSem(w.s);

    const prev = programme.find(x=>x.s===w.s-1);
    let delta = '';
    if(prev && prev.ua>0){
      const d = Math.round((w.ua-prev.ua)/prev.ua*100);
      const col = d>15?'#C04040':d>10?'#D4893A':d>5?'#2A5DA0':d<-5?'#4A8A5A':'#6B7A9A';
      const arr = d>5?'↑':d<-5?'↓':'=';
      delta = `<span style="color:${col};font-weight:700">${arr}${d>0?'+':''}${d}%</span>`;
    }

    return `<tr class="${w.d?'dec':''} ${obj?'has-obj':''}" onclick="openDetail(${w.s})" style="cursor:pointer">
      <td><div class="sem-num">S${w.s}</div><div class="mois-lbl">${semMois(w.s)}</div></td>
      <td>
        <span class="ph ${phCls(w.p)}">${phLabel(w.p)}</span>
        ${w.d?'<span class="dech">🌙</span>':''}
        ${obj?`<div class="obj-lbl">${obj}</div>`:''}
      </td>
      <td>
        <div class="s-titre">${mData?mData.l:'—'}</div>
        <div class="s-meta">${mData?tTag(mData.lieu):''} ${mData?`<span class="rpe-pill">RPE ${mData.rpe}</span>`:''}</div>
      </td>
      <td>
        <div class="s-titre">${jData?jData.l:'—'}</div>
        <div class="s-meta">${jData?tTag(jData.lieu):''} ${jData?`<span class="rpe-pill">RPE ${jData.rpe}</span>`:''}</div>
      </td>
      <td style="font-size:.76rem;color:var(--muted)">${weLbl}</td>
      <td style="text-align:center"><span class="ua-badge" style="color:#1A2540;font-weight:700">${w.ua}</span></td>
      <td style="text-align:center;font-size:.72rem">${delta||'<span style="color:#6B7A9A">—</span>'}</td>
    </tr>`;
  }).join('');
}

// ══════════════════════════════════════════════════
// DETAIL MODAL
// ══════════════════════════════════════════════════
function openDetail(sn){
  const w = programme.find(x=>x.s===sn);
  if(!w) return;
  const mData = sd(w.m), jData = sd(w.j);
  const obj = objForSem(sn);

  function seanceBlock(data){
    if(!data) return '<p style="color:var(--muted)">Repos / Pas de séance</p>';
    const fields = ['r','p','t'], labels = ['🛣️ Route','🏟️ Piste','🌲 Trail'];
    return `
      <div style="display:flex;gap:.4rem;align-items:center;flex-wrap:wrap;margin-bottom:.4rem">
        ${tTag(data.lieu)} <span class="rpe-pill">RPE ${data.rpe}</span> <span style="font-size:.68rem;color:var(--muted)">${data.c}</span>
      </div>
      <div class="terrain-tabs">
        ${[0,1,2].map(i=>`<button class="terrain-tab ${i===curTerrain?'active':''}" data-t="${i}" onclick="switchT(${i})">${labels[i]}</button>`).join('')}
      </div>
      ${[0,1,2].map(i=>{
        const v = data[fields[i]];
        const avail = v && v!=='—';
        return `<div class="terrain-content ${i===curTerrain?'active':''}" data-t="${i}">
          ${avail?v:`${labels[i]} : pas de variante pour cette séance`}
        </div>`;
      }).join('')}
      <div class="vol-box"><div class="vol-title">📊 Volume / Modulation</div><div class="vol-text">${data.v}</div></div>
      ${data.n?`<div style="font-size:.74rem;color:var(--muted);font-style:italic;margin-top:.4rem">💡 ${data.n}</div>`:''}
    `;
  }

  document.getElementById('mTitle').textContent = `Semaine ${sn} — ${semMois(sn)} · ${w.p}`;
  const weR = sd(w.wr), weT = sd(w.wt);

  document.getElementById('mBody').innerHTML = `
    ${obj?`<div class="info-box gold">${obj}</div>`:''}
    ${w.d?'<div class="info-box green">🌙 Semaine de décharge — volume réduit.</div>':''}
    ${w.n?`<div class="info-box blue">${w.n}</div>`:''}
    <div style="display:flex;justify-content:space-between;align-items:center">
      <h4>📅 Mardi — ${mData?mData.l:'Repos'}</h4>
      <div style="display:flex;gap:.5rem;align-items:center">
        <span class="ua-badge" style="color:#1A2540;font-weight:700">UA semaine : ${w.ua}</span>
      </div>
    </div>
    <div style="background:rgba(27,58,107,.04);border-radius:6px;padding:.4rem .6rem;margin-bottom:.6rem;font-size:.68rem;color:#6B7A9A">
      ℹ️ Ce total inclut le socle hebdomadaire (renfo lundi + footing mercredi + sortie WE).
    </div>
    ${seanceBlock(mData)}
    <h4>📅 Jeudi — ${jData?jData.l:'Repos'}</h4>
    ${seanceBlock(jData)}
    <h4>🏃 Sortie weekend</h4>
    <div style="display:flex;gap:.5rem;flex-wrap:wrap;margin-top:.3rem">
      <div style="flex:1;min-width:180px;padding:.6rem .8rem;background:${curWE===0?'rgba(27,58,107,.06)':'rgba(0,0,0,.02)'};border:1px solid ${curWE===0?'var(--blue)':'var(--border)'};border-radius:6px">
        <div style="font-size:.58rem;font-weight:700;text-transform:uppercase;color:var(--blue);margin-bottom:.2rem">🛣️ Route</div>
        <div style="font-size:.78rem;font-weight:600">${weR?weR.l:'—'}</div>
      </div>
      <div style="flex:1;min-width:180px;padding:.6rem .8rem;background:${curWE===1?'rgba(74,138,90,.08)':'rgba(0,0,0,.02)'};border:1px solid ${curWE===1?'var(--mousse)':'var(--border)'};border-radius:6px">
        <div style="font-size:.58rem;font-weight:700;text-transform:uppercase;color:var(--mousse);margin-bottom:.2rem">🌲 Trail</div>
        <div style="font-size:.78rem;font-weight:600">${weT?weT.l:'—'}</div>
      </div>
    </div>
  `;
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow='hidden';
}

// ══════════════════════════════════════════════════
// RENFORCEMENT
// ══════════════════════════════════════════════════
let curMusPhase = 'fondamental';
let curMusEquip = 'corpo';
let curExoFilter = 'all';

function setPhaseMuscu(p,btn){
  curMusPhase=p;
  btn.parentElement.querySelectorAll('.btn').forEach(b=>b.classList.toggle('active',b===btn));
  renderMuscu();
}
function setMusEquip(e,btn){
  curMusEquip=e;
  btn.parentElement.querySelectorAll('.btn').forEach(b=>b.classList.toggle('active',b===btn));
  renderMuscu();
}

function renderMuscu(){
  const pd = typeof phaseMusculaireDesc!=='undefined' ? phaseMusculaireDesc[curMusPhase] : null;
  const phEl = document.getElementById('phaseMusculaire');
  if(phEl && pd){
    phEl.innerHTML = `<strong style="color:var(--navy)">${pd.titre}</strong>
      <span style="display:inline-block;margin-left:.8rem;font-size:.72rem;color:var(--blue)">⏱ ${pd.duree}</span>
      <span style="display:inline-block;margin-left:.5rem;font-size:.72rem;color:var(--mousse)">📅 ${pd.freq}</span>
      <br><span style="font-size:.82rem;color:var(--muted)">${pd.desc}</span>`;
  }
  const container = document.getElementById('circuitDisplay');
  if(!container || typeof circuits==='undefined') return;
  const circuit = circuits[curMusPhase] && circuits[curMusPhase][curMusEquip];
  if(!circuit){ container.innerHTML='<p style="color:var(--muted)">Pas de circuit pour cette combinaison.</p>'; return; }

  container.innerHTML = circuit.map(bloc=>`
    <div class="circuit-block">
      <div class="circuit-block-head"><h3>${bloc.bloc}</h3><span class="meta">${bloc.exos.length} exercices</span></div>
      ${bloc.exos.map(e=>{
        const ex = typeof exos!=='undefined' ? exos[e.id] : null;
        if(!ex) return '';
        const eqLabels = {corpo:'🤸 Corps',elastiques:'🔴 Élastiques',salle:'🏋️ Salle'};
        return `<div class="circuit-exo" onclick="openExoModal('${e.id}')">
          <div><div class="circuit-exo-name">${ex.emoji} ${ex.nom}</div><div class="circuit-exo-sub">${ex.muscles}</div></div>
          <div style="text-align:right"><div class="circuit-exo-dose">${e.dose}</div><span class="eq-tag eq-${ex.equips[0]}">${eqLabels[ex.equips[0]]||''}</span></div>
        </div>`;
      }).join('')}
    </div>`).join('');
}

function filterExoCat(cat,btn){
  curExoFilter=cat;
  btn.parentElement.querySelectorAll('.btn').forEach(b=>b.classList.toggle('active',b===btn));
  renderExoLibrary();
}

function renderExoLibrary(){
  const grid = document.getElementById('exoGrid');
  if(!grid || typeof exos==='undefined') return;
  const catBg = {jambes:'rgba(27,58,107,.12)',fessiers:'rgba(196,90,74,.12)',gainage:'rgba(74,138,90,.12)',mollets:'rgba(74,122,204,.12)',pliometrie:'rgba(122,106,154,.12)',etirements:'rgba(74,138,90,.1)'};
  const catCol = {jambes:'var(--light)',fessiers:'#E08070',gainage:'var(--mousse)',mollets:'var(--sky)',pliometrie:'#B8A8D4',etirements:'var(--mousse)'};
  const catLbl = {jambes:'🦵 Jambes',fessiers:'🍑 Fessiers',gainage:'🧱 Gainage',mollets:'👟 Mollets',pliometrie:'⚡ Pliométrie',etirements:'🌿 Étirements'};
  const eqIcons = {corpo:'🤸',elastiques:'🔴',salle:'🏋️'};
  const filtered = Object.entries(exos).filter(([id,ex])=>curExoFilter==='all'||ex.cat===curExoFilter);

  grid.innerHTML = filtered.map(([id,ex])=>`
    <div class="lib-card" onclick="openExoModal('${id}')">
      <div class="lib-card-cat" style="background:${catBg[ex.cat]||'var(--border)'};color:${catCol[ex.cat]||'var(--muted)'}">${catLbl[ex.cat]||ex.cat}</div>
      <div class="lib-card-name">${ex.emoji} ${ex.nom}</div>
      <div class="lib-card-desc">${ex.muscles}</div>
      <div class="lib-card-equips">${ex.equips.map(e=>`<span class="eq-tag eq-${e}">${eqIcons[e]||''} ${e==='corpo'?'Corps':e==='elastiques'?'Élastiques':'Salle'}</span>`).join('')}</div>
    </div>`).join('');
}

function openExoModal(id){
  const ex = typeof exos!=='undefined' ? exos[id] : null;
  if(!ex) return;
  const eqFull = {corpo:'🤸 Poids du corps',elastiques:'🔴 Élastiques / kettlebell',salle:'🏋️ Salle avec barres'};
  document.getElementById('mTitle').textContent = `${ex.emoji} ${ex.nom}`;
  document.getElementById('mBody').innerHTML = `
    <h4>Muscles ciblés</h4><p>${ex.muscles}</p>
    <h4>Équipement</h4><p>${ex.equips.map(e=>eqFull[e]||e).join('<br>')}</p>
    <h4>Description technique</h4><p style="line-height:1.7">${ex.description}</p>
    <h4>Erreurs à éviter</h4><p style="color:var(--rouge)">${ex.erreurs}</p>
    <h4>Progression</h4><ul style="padding-left:1.2rem">${ex.progressions.map(p=>`<li style="margin-bottom:.2rem">${p}</li>`).join('')}</ul>`;
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow='hidden';
}

// ══════════════════════════════════════════════════
// ROUTINES MATIN
// ══════════════════════════════════════════════════
let curReveilEquip = 'corpo';

function setReveilEquip(eq,btn){
  curReveilEquip=eq;
  btn.parentElement.querySelectorAll('.btn').forEach(b=>b.classList.toggle('active',b===btn));
  renderRoutines();
}

function renderRoutines(){
  const grid = document.getElementById('routinesGrid');
  if(!grid || typeof routinesReveil==='undefined') return;
  const routines = routinesReveil[curReveilEquip];
  if(!routines){ grid.innerHTML='<p style="color:var(--muted)">Pas de routine pour cet équipement.</p>'; return; }

  grid.innerHTML = joursReveil.map((jour,i)=>{
    const exos = routines[i];
    if(!exos) return '';
    return `<div class="routine-card">
      <div class="routine-hdr">
        <span style="font-size:1.5rem">${joursEmoji[i]}</span>
        <div>
          <div style="font-size:.85rem;font-weight:800;color:var(--navy)">${jour}</div>
          <div style="font-size:.68rem;color:var(--muted)">${joursFocus[i]}</div>
        </div>
        <span style="margin-left:auto;font-size:.65rem;color:var(--muted)">${exos.length} exercices · ~12 min</span>
      </div>
      ${exos.map((ex,j)=>`<div class="routine-exo" onclick="openRoutineExo(${i},${j})">
        <div class="routine-exo-nom">${ex.nom}</div>
        <div class="routine-exo-dose">${ex.dose}</div>
      </div>`).join('')}
    </div>`;
  }).join('');
}

function openRoutineExo(jourIdx,exIdx){
  const routines = routinesReveil[curReveilEquip];
  if(!routines || !routines[jourIdx]) return;
  const ex = routines[jourIdx][exIdx];
  if(!ex) return;
  document.getElementById('mTitle').textContent = `${joursEmoji[jourIdx]} ${ex.nom}`;
  document.getElementById('mBody').innerHTML = `
    <div style="display:inline-block;background:rgba(27,58,107,.1);border:1px solid rgba(27,58,107,.25);border-radius:4px;padding:.2rem .7rem;font-size:.72rem;font-weight:700;color:var(--light);margin-bottom:1rem">${joursReveil[jourIdx]} · ${joursFocus[jourIdx]}</div>
    <h4>Dosage</h4><p>${ex.dose}</p>
    <h4>Comment faire</h4><p style="line-height:1.7">${ex.desc}</p>`;
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow='hidden';
}

// ══════════════════════════════════════════════════
// FOSTER (Méthode Foster page)
// ══════════════════════════════════════════════════
function fosterTab(id,btn){
  document.querySelectorAll('.foster-panel').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.foster-tab').forEach(b=>b.classList.remove('active'));
  document.getElementById('fp-'+id).classList.add('active');
  btn.classList.add('active');
}

const fosterZones={
  1:'Très facile — récupération active',2:'Très facile — récupération active',
  3:'Facile — endurance, conversation fluide',4:'Facile — endurance, conversation fluide',
  5:'Modéré — allure marathon',6:'Modéré — allure marathon',
  7:'Difficile — allure semi / 10km',8:'Difficile — allure semi / 10km',
  9:'Très difficile — allure 5km / sprint',10:'Très difficile — on donne tout'
};

function fosterCalc(){
  const rpe=+document.getElementById('f-rpe-slider').value;
  const dur=+document.getElementById('f-dur-slider').value;
  const ua=rpe*dur;
  document.getElementById('f-rpe-v').textContent=rpe;
  document.getElementById('f-dur-v').textContent=dur;
  document.getElementById('fc-rpe').textContent=rpe;
  document.getElementById('fc-dur').textContent=dur;
  document.getElementById('fc-ua').textContent=ua;
  document.getElementById('f-rpe-zone').textContent=fosterZones[rpe]||'';
  document.getElementById('fc-easy').textContent=Math.round(ua/3)+' min';
  document.getElementById('fc-hard').textContent=Math.round(ua/10)+' min';
}

const fosterPresets={
  normal:[0,420,0,380,0,0,300],
  decharge:[0,240,0,200,0,0,180],
  overload:[0,520,200,480,0,250,400]
};

function fosterDayColor(v){
  if(v===0) return {bg:'var(--surface)',c:'var(--muted)'};
  if(v<200) return {bg:'rgba(74,138,90,.12)',c:'var(--mousse)'};
  if(v<350) return {bg:'rgba(122,174,224,.15)',c:'var(--blue)'};
  if(v<450) return {bg:'rgba(212,137,58,.12)',c:'#8a5010'};
  return {bg:'rgba(192,64,64,.12)',c:'var(--rouge)'};
}

function fosterWeek(key){
  const days=fosterPresets[key];
  const total=days.reduce((a,b)=>a+b,0);
  const mean=total/7;
  const sd2=Math.sqrt(days.reduce((s,d)=>s+Math.pow(d-mean,2),0)/7);
  const mono=sd2>0?(mean/sd2):0;
  const strain=Math.round(total*mono);

  let html='<div class="foster-week"><span class="foster-week-label">UA</span>';
  days.forEach(d=>{
    const col=fosterDayColor(d);
    html+=`<div class="foster-day" style="background:${col.bg};color:${col.c}">${d||'—'}</div>`;
  });
  html+=`<div class="foster-week-total">${total}</div></div>`;
  document.getElementById('f-week-display').innerHTML=html;

  const monoColor=mono>2?'var(--rouge)':'var(--sky)';
  const strainColor=strain>3000?'var(--rouge)':'var(--sky)';
  document.getElementById('f-week-metrics').innerHTML=`
    <div class="foster-metric"><div class="foster-metric-name">Charge totale</div><div class="foster-metric-val">${total}</div></div>
    <div class="foster-metric"><div class="foster-metric-name">Monotonie</div><div class="foster-metric-val" style="color:${monoColor}">${mono.toFixed(1)}</div></div>
    <div class="foster-metric"><div class="foster-metric-name">Strain</div><div class="foster-metric-val" style="color:${strainColor}">${strain}</div></div>`;

  let insight='';
  if(mono>2) insight='<div class="foster-insight danger">⚠️ Monotonie > 2.0 — les séances se ressemblent trop. Il faut varier l\'intensité (jours faciles vs jours durs) pour réduire le risque de surentraînement et de maladie.</div>';
  else if(total>1050) insight='<div class="foster-insight warning">⚠️ Charge totale élevée (> 1050 UA). Surveiller les signaux de fatigue — la semaine suivante devrait être une décharge.</div>';
  else if(mono<1) insight='<div class="foster-insight success">✅ Bonne variation entre jours d\'effort et jours de repos. Le corps récupère et s\'adapte. C\'est exactement ce qu\'on vise.</div>';
  else insight='<div class="foster-insight">✅ Monotonie correcte. Le ratio jours intenses / jours de repos est équilibré.</div>';
  document.getElementById('f-week-insight').innerHTML=insight;
}

function fosterACWR(){
  const acute=+document.getElementById('f-acute-slider').value;
  const chronic=+document.getElementById('f-chronic-slider').value;
  const ratio=chronic>0?(acute/chronic):0;
  document.getElementById('f-acute-v').textContent=acute;
  document.getElementById('f-chronic-v').textContent=chronic;
  document.getElementById('fa-acute').textContent=acute;
  document.getElementById('fa-chronic').textContent=chronic;
  document.getElementById('fa-ratio').textContent=ratio.toFixed(2);

  const pct=Math.min(Math.max((ratio-0.4)/1.6*100,0),100);
  document.getElementById('f-acwr-marker').style.left='calc('+pct+'% - 2px)';

  const el=document.getElementById('f-acwr-insight');
  if(ratio<0.8){
    el.className='foster-insight';
    el.innerHTML='🔵 Zone de désentraînement — la charge est trop faible par rapport à l\'habitude. Risque de perte de condition.';
  } else if(ratio<=1.3){
    el.className='foster-insight success';
    el.innerHTML='✅ Zone optimale — progression maîtrisée, risque de blessure faible.';
  } else if(ratio<=1.5){
    el.className='foster-insight warning';
    el.innerHTML='⚠️ Attention — augmentation rapide de la charge. Ne pas dépasser +15% par semaine.';
  } else {
    el.className='foster-insight danger';
    el.innerHTML='🔴 Danger — pic de charge brutal. Risque de blessure multiplié. Réduire immédiatement.';
  }
}

// ══════════════════════════════════════════════════
// INIT — auto-render based on which page is loaded
// ══════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', function(){
  if(document.getElementById('infosClubZone')) renderInfosClub();
  if(document.getElementById('acc-grid')) renderAccueil();
  if(document.getElementById('progBody')) buildProg();
  if(document.getElementById('phaseMusculaire')){ renderMuscu(); renderExoLibrary(); }
  if(document.getElementById('routinesGrid')) renderRoutines();
  if(document.getElementById('f-week-display')) fosterWeek('normal');
  if(document.getElementById('f-acwr-marker')) fosterACWR();
});
