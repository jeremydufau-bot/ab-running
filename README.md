# AB Running Loisir — v4

## Architecture

4 fichiers, ~2000 lignes au total :

| Fichier | Lignes | Rôle |
|---------|--------|------|
| `data.js` | 562 | Bibliothèque 80 séances, programme 52 sem (compact), objectifs, seuils, calendrier, circuits PPG |
| `index.html` | 726 | Interface publique (CSS + HTML + JS fusionné) : accueil, programme, calculateur, renforcement |
| `admin.html` | 701 | Interface coach : édition programme/séances/calendrier/infos, publication GitHub |
| `logo_ab.avif` | — | Logo Aviron Bayonnais |

## Format compact data.js

Chaque séance : `{l:label, c:cat, rpe:display, rn:numeric, d:durée_min, lieu, r:route, p:piste, t:trail, v:volume, n:notes}`

Programme : `{s:sem, p:phase, m:mardi_key, j:jeudi_key, wr:we_route_key, wt:we_trail_key, ua, d:décharge, n:notes}`

Tout est dérivé des clés — pas de duplication titre/terrain/label.

## Principes

- RPE individualise l'effort (échelle 1-10)
- UA = RPE × durée (min) — mesure la charge
- 3 variantes terrain par séance (route/piste/trail)
- Modulation volume : reprise / standard / forme
- PPG exclusivement en côtes (physiologique)
- Δ% inter-semaines pour gérer la charge progressive

## Déploiement

Fichiers statiques. GitHub Pages. L'admin publie data.js modifié via l'API GitHub.
